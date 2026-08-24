// render-rana.mjs — exporta el promo del juego Rana Leopardo (silent + música caribeña).
// Fuente: rana-leopardo-game/.promo/raw.webm + capture-meta.json (capture-rana.mjs).
// Salidas: rana-leopardo-game/dist-promo/rana-leopardo-promo-{silent,music}.mp4
//
// Uso:   node render-rana.mjs [--music <archivo.mp3>]
// Música por defecto: FreePD "Reggae Remix A" (dominio público) descargada en .promo/assets/.

import { readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const RANA_DIR = path.resolve(SCRIPT_DIR, "../../../../rana-leopardo-game");
const PROMO = path.join(RANA_DIR, ".promo");
const OUT_DIR = path.join(RANA_DIR, "dist-promo");
mkdirSync(OUT_DIR, { recursive: true });
const RAW = path.join(PROMO, "raw.webm");
const META = path.join(PROMO, "capture-meta.json");
const MUSIC = process.argv.includes("--music")
  ? path.resolve(process.argv[process.argv.indexOf("--music") + 1])
  : path.join(PROMO, "assets", "Reggae_Remix_A.mp3");

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

if (!existsSync(RAW)) {
  console.error("Falta el raw:", RAW, "— corré primero: node capture-rana.mjs");
  process.exit(1);
}
const meta = JSON.parse(readFileSync(META, "utf8"));
const probe = (f) => JSON.parse(run(ffprobe, ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", f]));
const info = probe(RAW);
const totalSec = parseFloat(info.format.duration);

const START = meta.leadInSec + 0.25;
const DUR = Math.min(meta.sceneSec, totalSec - START - 0.3);
console.log(`raw: ${totalSec.toFixed(2)}s | lead-in ${meta.leadInSec.toFixed(2)}s | cut [${START.toFixed(2)} → +${DUR.toFixed(2)}s]`);
if (DUR > 10.5) console.warn(`⚠ duración ${DUR.toFixed(1)}s > target 5-10s`);
if (DUR < 5) console.warn(`⚠ duración ${DUR.toFixed(1)}s < target 5-10s`);

const VF = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p";
const VENC = ["-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30"];

const silent = path.join(OUT_DIR, "rana-leopardo-promo-silent.mp4");
console.log("render silent →", silent);
run(ffmpeg, ["-y", "-ss", String(START), "-i", RAW, "-t", String(DUR), "-vf", VF, ...VENC, "-an", silent]);

const music = path.join(OUT_DIR, "rana-leopardo-promo-music.mp4");
const fadeIn = 0.4;
const fadeOut = 2.0;
const fadeOutStart = Math.max(0, DUR - fadeOut);
console.log("render music →", music, "(track:", path.basename(MUSIC), ")");
run(ffmpeg, [
  "-y", "-i", silent, "-i", MUSIC, "-map", "0:v:0", "-map", "1:a:0",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
  "-t", String(DUR),
  "-af", `afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${fadeOutStart.toFixed(2)}:d=${fadeOut}`,
  music,
]);

for (const f of [silent, music]) {
  const p = probe(f);
  const vs = p.streams.find((s) => s.codec_type === "video");
  const as = p.streams.find((s) => s.codec_type === "audio");
  console.log(`\n== ${path.basename(f)} ==`);
  console.log(`  duración: ${parseFloat(p.format.duration).toFixed(2)}s`);
  console.log(`  video: ${vs?.width}x${vs?.height} ${vs?.codec_name} @ ${vs?.avg_frame_rate ?? "-"}`);
  console.log(`  audio: ${as ? `${as.codec_name} ${as.channels}ch` : "NINGUNO (silent)"}`);
  console.log(`  tamaño: ${(parseFloat(p.format.size) / 1e6).toFixed(1)} MB`);
}
console.log("\nlisto →", silent);
console.log("listo →", music);
