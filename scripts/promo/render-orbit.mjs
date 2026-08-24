// render-orbit.mjs — exporta las 3 versiones del video Orbit del hitpanel,
// siguiendo la convención de hit-panel/orbit-hitcargo-video/render-all.sh:
//
//   renders/orbit-promo-silent.mp4   — sin CTA (35s), SIN audio
//   renders/orbit-promo-music.mp4    — sin CTA (35s), + assets/bgm.mp3
//   renders/orbit-promo-cta.mp4      — con CTA (39s), + assets/bgm.mp3
//
// Fuente: .orbit-out/raw-{no-cta,cta}.webm + capture-meta-*.json (capture-orbit.mjs).
// Uso:   node render-orbit.mjs
// Salida: hit-panel/orbit-hitcargo-video/renders/

import { readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ORBIT_DIR = path.resolve(SCRIPT_DIR, "../../../hit-panel/orbit-hitcargo-video");
const OUT_DIR = path.join(ORBIT_DIR, "renders");
mkdirSync(OUT_DIR, { recursive: true });
const BGM = path.join(ORBIT_DIR, "assets", "landing-inspiration.mp3"); // swap 2026-08-12: ahora el track de la landing (Inspiration) suena en Orbit
const BGM_EXTRA = path.join(ORBIT_DIR, "assets", "upbeat_Advertime.mp3"); // audio extra (FreePD): se usa en la versión music (35s)

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

const probe = (file) =>
  JSON.parse(
    run(ffprobe, ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file])
  );

const loadVariant = (tag) => {
  const raw = path.join(ORBIT_DIR, ".orbit-out", `raw-${tag}.webm`);
  const meta = JSON.parse(
    readFileSync(path.join(ORBIT_DIR, ".orbit-out", `capture-meta-${tag}.json`), "utf8")
  );
  if (!existsSync(raw)) {
    console.error(`Falta ${raw} — corré primero: node capture-orbit.mjs${tag === "no-cta" ? " --no-cta" : ""}`);
    process.exit(1);
  }
  const info = probe(raw);
  const totalSec = parseFloat(info.format.duration);
  const START = meta.leadInSec + 0.25; // margen vs. offset del encoder
  const DUR = Math.min(meta.sceneSec, totalSec - START - 0.3);
  console.log(`  ${tag}: raw ${totalSec.toFixed(2)}s → cut [${START.toFixed(2)} → +${DUR.toFixed(2)}s]`);
  return { raw, START, DUR };
};

const VF = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p";
const VENC = ["-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30"];

const variants = { noCta: loadVariant("no-cta"), cta: loadVariant("cta") };

const render = (name, { raw, START, DUR }, { audio = false, music = BGM } = {}) => {
  const out = path.join(OUT_DIR, name);
  if (!audio) {
    console.log(`\nrender silent → ${out}`);
    run(ffmpeg, ["-y", "-ss", String(START), "-i", raw, "-t", String(DUR), "-vf", VF, ...VENC, "-an", out]);
  } else {
    const fadeOut = 2.0;
    const fadeOutStart = Math.max(0, DUR - fadeOut);
    console.log(`\nrender music → ${out} (track: ${path.basename(music)})`);
    run(ffmpeg, [
      "-y", "-ss", String(START), "-i", raw, "-i", music,
      "-map", "0:v:0", "-map", "1:a:0",
      "-t", String(DUR), "-vf", VF, ...VENC,
      "-c:a", "aac", "-b:a", "192k",
      "-af", `afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=${fadeOut}`,
      out,
    ]);
  }
  return out;
};

const out1 = render("orbit-promo-silent.mp4", variants.noCta, { audio: false });
const out2 = render("orbit-promo-music.mp4", variants.noCta, { audio: true, music: BGM_EXTRA }); // Advertime (audio extra)
const out3 = render("orbit-promo-cta.mp4", variants.cta, { audio: true });

// ── verificación ────────────────────────────────────────────────────────
console.log("\n=== verificación ===");
for (const f of [out1, out2, out3]) {
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
console.log("\nlisto →", out1);
console.log("listo →", out2);
console.log("listo →", out3);
