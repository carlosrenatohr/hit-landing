// capture-html.mjs — graba promo.html (video 100% HTML/CSS/vanilla JS, SPEC-P4-15).
// El HTML ES el video: no hay latencia de red ni re-tomas; la duración es fija.
// Escribe .promo/raw.webm + .promo/capture-meta.json (mismo shape que render.mjs espera).
//
// Uso: node capture-html.mjs [--url <file:// o http://.../promo.html?autoplay=1>]

import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROMO = path.resolve(SCRIPT_DIR, "../..", ".promo");
mkdirSync(PROMO, { recursive: true });

const arg = (name, def) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const URL = arg("--url", `file://${path.join(SCRIPT_DIR, "promo.html")}?autoplay=1`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: PROMO, size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error") console.log("[console.error]", m.text().slice(0, 130));
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 130)));

await page.goto(URL, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

// Espera el fin del timeline (el HTML reporta cuándo terminó y cuánto duró).
const meta = await page
  .evaluate(
    () =>
      new Promise((res) => {
        const check = () => {
          if (window.__promoDone) res({ sceneSec: window.__promoDuration, leadInSec: (window.__promoStart ?? 1000) / 1000 });
          else setTimeout(check, 200);
        };
        check();
      })
  )
  .catch(() => ({ sceneSec: 22.8, leadInSec: 1.0 }));

await page.waitForTimeout(600); // cola del lockup
const vp = page.video();
const videoPath = vp ? await vp.path() : null;
await context.close();
await browser.close();

const RAW = path.join(PROMO, "raw.webm");
if (videoPath) copyFileSync(videoPath, RAW);
writeFileSync(
  path.join(PROMO, "capture-meta.json"),
  JSON.stringify({ leadInSec: Number(meta.leadInSec) + 0.25, sceneSec: Number(meta.sceneSec), base: URL, tracking: "1ZH936R30321624778" }, null, 2)
);
console.log(`raw → ${RAW}`);
console.log(`meta → leadIn ${(Number(meta.leadInSec) + 0.25).toFixed(2)}s · escenas ${Number(meta.sceneSec).toFixed(2)}s`);
