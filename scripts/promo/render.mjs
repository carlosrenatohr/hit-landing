// render.mjs — exporta los 2 MP4 del promo (SPEC-P4-15) desde el raw webm de capture.mjs.
//
// Uso:   node render.mjs [--music ../.promo/assets/upbeat_Inspiration.mp3]
// Salidas (landing/dist-promo/):
//   hitcargo-web-promo-silent.mp4   — H.264 1080p30, SIN audio
//   hitcargo-web-promo-music.mp4    — H.264 1080p30 + AAC (música de fondo, fade in/out)
//
// Los cortes (lead-in y tail) salen de .promo/capture-meta.json escrito por capture.mjs.

import { readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const LANDING = path.resolve(SCRIPT_DIR, "../..");
const PROMO = path.join(LANDING, ".promo");
const OUT_DIR = path.join(LANDING, "dist-promo");
mkdirSync(OUT_DIR, { recursive: true });
const RAW = path.join(PROMO, "raw.webm");
const META = path.join(PROMO, "capture-meta.json");
const MUSIC = path.join(PROMO, "assets", "orbit-bgm.mp3"); // swap 2026-08-12: ahora el track de Orbit (bgm) suena en la landing

const ffmpeg = (await import("ffmpeg-static")).default;
const { path: ffprobe } = await import("ffprobe-static");

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    console.error("FAIL:", cmd, args.join(" "));
    console.error(r.stderr.toString().slice(-1200));
    process.exit(1);
  }
  return r.stdout.toString();
};

// ── metadatos de captura ────────────────────────────────────────────────
if (!existsSync(RAW)) {
  console.error("Falta el raw:", RAW, "— corré primero capture.mjs (bash run.sh capture).");
  process.exit(1);
}
const meta = existsSync(META) ? JSON.parse(readFileSync(META, "utf8")) : { leadInSec: 2.6, sceneSec: 0 };

const probe = (file) =>
  JSON.parse(
    run(ffprobe, ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file])
  );
const info = probe(RAW);
const vStream = info.streams.find((s) => s.codec_type === "video");
const totalSec = parseFloat(info.format.duration);

const START = meta.leadInSec + 0.25; // margen de seguridad vs. offset del encoder
const DUR = Math.min(meta.sceneSec > 0 ? meta.sceneSec : totalSec - START - 0.5, totalSec - START - 0.4);
console.log(`raw: ${totalSec.toFixed(2)}s | lead-in ${meta.leadInSec.toFixed(2)}s | cut [${START.toFixed(2)} → +${DUR.toFixed(2)}s]`);
if (DUR > 25.5) console.warn(`⚠ duración ${DUR.toFixed(1)}s fuera de spec (target 20-25s): tracking lento? recapturá o revisá latencia del worker`);
if (DUR < 19) console.warn(`⚠ duración ${DUR.toFixed(1)}s por debajo del target 20-25s`);

const VF = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p";
const VENC = ["-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30"];

// ── VERSION 1 — silent ──────────────────────────────────────────────────
const silent = path.join(OUT_DIR, "hitcargo-web-promo-silent.mp4");
console.log("render silent →", silent);
run(ffmpeg, ["-y", "-ss", String(START), "-i", RAW, "-t", String(DUR), "-vf", VF, ...VENC, "-an", silent]);

// ── VERSION 2 — música de fondo (mux sobre la MISMA video silent → idénticas) ──
const music = path.join(OUT_DIR, "hitcargo-web-promo-music.mp4");
const fadeIn = 0.6;
const fadeOut = 2.2;
const fadeOutStart = Math.max(0, DUR - fadeOut);
console.log("render music →", music, "(track:", path.basename(MUSIC), ")");
run(ffmpeg, [
  "-y", "-i", silent, "-i", MUSIC, "-map", "0:v:0", "-map", "1:a:0",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
  "-t", String(DUR), // sin -shortest: -t fija la misma duración exacta que la versión silent
  "-af", `afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutStart.toFixed(2)}:d=${fadeOut}`,
  music,
]);

// ── verificación ────────────────────────────────────────────────────────
for (const f of [silent, music]) {
  const p = probe(f);
  const vs = p.streams.find((s) => s.codec_type === "video");
  const as = p.streams.find((s) => s.codec_type === "audio");
  const fps = vs?.avg_frame_rate ?? vs?.r_frame_rate ?? "-";
  console.log(`\n== ${path.basename(f)} ==`);
  console.log(`  duración: ${parseFloat(p.format.duration).toFixed(2)}s`);
  console.log(`  video: ${vs?.width}x${vs?.height} ${vs?.codec_name} @ ${fps}`);
  console.log(`  audio: ${as ? `${as.codec_name} ${as.channels}ch` : "NINGUNO (silent)"}`);
  console.log(`  tamaño: ${(parseFloat(p.format.size) / 1e6).toFixed(1)} MB`);
}
console.log("\nlisto →", silent);
console.log("listo →", music);
