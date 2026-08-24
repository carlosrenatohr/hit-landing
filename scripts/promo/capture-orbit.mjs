// capture-orbit.mjs — graba el video Orbit del hitpanel (SPEC: guardar referencia "como estaba").
// Compone hit-panel/orbit-hitcargo-video/index.html (HTML/CSS/vanilla JS, timeline rAF en loop).
//
// Uso:
//   node capture-orbit.mjs            → variante CON CTA (39s)
//   node capture-orbit.mjs --no-cta   → variante SIN CTA (35s)
//
// Salida: hit-panel/orbit-hitcargo-video/.orbit-out/raw.webm + capture-meta.json
// (mismo shape que espera render.mjs; los MP4 finales van a renders/).

import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ORBIT_DIR = path.resolve(SCRIPT_DIR, "../../../hit-panel/orbit-hitcargo-video");
const OUT_DIR = path.join(ORBIT_DIR, ".orbit-out");
mkdirSync(OUT_DIR, { recursive: true });

const noCta = process.argv.includes("--no-cta");
const DURATION = noCta ? 35 : 39;
const TAG = noCta ? "no-cta" : "cta";

// Sin CTA: mismo truco que render-all.sh — copia con clase "no-cta" en <body> (baked, antes del script).
// Además parchea el bug del timeline: SCENES.cta = null rompe updateScenes (s.start) → video negro.
// Se le da un rango imposible {start:0, end:-1} en la COPIA temporal; index.html original intacto.
let url = `file://${path.join(ORBIT_DIR, "index.html")}`;
if (noCta) {
  // En la RAÍZ del proyecto (no .orbit-out/): los assets relativos (assets/bgm.mp3, logos) resuelven.
  const tmp = path.join(ORBIT_DIR, ".orbit-no-cta.html");
  const html = readFileSync(path.join(ORBIT_DIR, "index.html"), "utf8")
    .replace("<body>", '<body class="no-cta">')
    .replace(/cta:\s*hasCTA \? CTA_TIMING : null/, "cta: hasCTA ? CTA_TIMING : { start: 0, end: -1 }");
  if (html.includes("{ start: 0, end: -1 }")) console.log("[patch] SCENES.cta null-fix aplicado (no-cta safe)");
  writeFileSync(tmp, html);
  url = `file://${tmp}`;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 130)));
page.on("console", (m) => { if (m.type() === "error") console.log("[console.error]", m.text().slice(0, 130)); });

await page.goto(url, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready).catch(() => {});
console.log(`orbit ${noCta ? "no-cta (35s)" : "cta (39s)"} — esperando timeline + cola`);
await page.waitForTimeout(DURATION * 1000 + 1500); // cola generosa: recordVideo puede tardar en finalizar

const vp = page.video();
const videoPath = vp ? await vp.path() : null;
await context.close();
await browser.close();
if (noCta) rmSync(path.join(ORBIT_DIR, ".orbit-no-cta.html"), { force: true }); // temp de captura

const RAW = path.join(OUT_DIR, `raw-${TAG}.webm`);
if (videoPath) copyFileSync(videoPath, RAW);
// leadIn: la composición arranca al load; el video empieza en la creación del context (~1s antes).
writeFileSync(path.join(OUT_DIR, `capture-meta-${TAG}.json`), JSON.stringify({ leadInSec: 1.0, sceneSec: DURATION, base: url }, null, 2));
console.log(`raw → ${RAW} (escenas ${DURATION}s)`);
