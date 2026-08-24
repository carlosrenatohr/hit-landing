// capture-orbit-b2b.mjs — graba el video B2B de Orbit (index-b2b.html).
// Compone hit-panel/orbit-hitcargo-video/index-b2b.html (HTML/CSS/vanilla JS, timeline rAF).
//
// Uso:
//   node capture-orbit-b2b.mjs            → variante CON CTA (30s)
//   node capture-orbit-b2b.mjs --no-cta   → variante SIN CTA (~27s)
//
// Salida: hit-panel/orbit-hitcargo-video/.orbit-out/raw-b2b-{tag}.webm + capture-meta-b2b-{tag}.json

import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ORBIT_DIR = path.resolve(SCRIPT_DIR, "../../../hit-panel/orbit-hitcargo-video");
const OUT_DIR = path.join(ORBIT_DIR, ".orbit-out");
mkdirSync(OUT_DIR, { recursive: true });

const noCta = process.argv.includes("--no-cta");
const DURATION = noCta ? 25 : 29; // 25s without CTA, 29s with CTA
const TAG = noCta ? "no-cta" : "cta";

// For no-cta: copy with body.no-cta class (hides scene-cta via CSS)
// IMPORTANT: write tmp in ORBIT_DIR (same dir as index), NOT in OUT_DIR (.orbit-out/)
// so relative asset paths (assets/orbit-logo.png, assets/hit-cargo-mark.png) resolve.
let url = `file://${path.join(ORBIT_DIR, "index-b2b.html")}`;
if (noCta) {
  const tmp = path.join(ORBIT_DIR, ".orbit-b2b-no-cta.html");
  const html = readFileSync(path.join(ORBIT_DIR, "index-b2b.html"), "utf8")
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
console.log(`orbit-b2b ${noCta ? `no-cta (${DURATION}s)` : `cta (${DURATION}s)`} — esperando timeline`);

// Wait for the full duration + generous buffer for video finalization
await page.waitForTimeout(DURATION * 1000 + 2000);

const vp = page.video();
const videoPath = vp ? await vp.path() : null;
await context.close();
await browser.close();
if (noCta) rmSync(path.join(ORBIT_DIR, ".orbit-b2b-no-cta.html"), { force: true });

const RAW = path.join(OUT_DIR, `raw-b2b-${TAG}.webm`);
if (videoPath) copyFileSync(videoPath, RAW);

// leadIn: composition starts at load; video starts ~1s before context creation
writeFileSync(
  path.join(OUT_DIR, `capture-meta-b2b-${TAG}.json`),
  JSON.stringify({ leadInSec: 1.0, sceneSec: DURATION, base: url }, null, 2)
);
console.log(`raw → ${RAW} (escenas ${DURATION}s)`);
