// probe.mjs — sanity check del sitio local antes de la captura (SPEC-P4-15).
// Verifica: dark mode por defecto, demo de rastreo con la guía real, y calculadora.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const TRACKING = "1ZH936R30321624778";
const FRAMES = path.resolve(process.cwd(), ".promo/probe");
mkdirSync(FRAMES, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("console", (m) => {
  if (m.type() === "error") console.log("[console.error]", m.text().slice(0, 140));
});

// 1) Home + dark mode
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
console.log("dark mode:", dark);
await page.screenshot({ path: `${FRAMES}/1-home.png` });

// 2) Tracking e2e real
await page.goto(`${BASE}/track`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const input = page.locator('input[placeholder*="guía"]');
console.log("track input found:", await input.count());
await input.click();
await input.pressSequentially(TRACKING, { delay: 30 });
await page.locator('form button[type="submit"]').click(); // acotado al form (el header tiene otro CTA)
await page.waitForTimeout(500);
await page.screenshot({ path: `${FRAMES}/2-track-loading.png` });
// esperar resultado (hasta 15 s)
const pill = page.locator('span:has-text("Entregado")').first();
try {
  await pill.waitFor({ state: "visible", timeout: 15000 });
  console.log("tracking result: FOUND (Entregado)");
} catch {
  console.log("tracking result: NOT FOUND in 15s");
}
await page.waitForTimeout(800);
await page.screenshot({ path: `${FRAMES}/3-track-result.png` });
const guia = await page.locator('h2:has-text("812898")').count();
console.log("guia 812898 shown:", guia > 0);

// 3) Calculadora
await page.goto(`${BASE}/precios`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
await page.getByText("Calculá tu envío").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: `${FRAMES}/4-precios.png` });
await page.getByRole("button", { name: /Marítimo/ }).click();
const weight = page.locator('input[id="weight"]');
await weight.click();
await weight.fill("");
await weight.pressSequentially("10", { delay: 120 });
await page.waitForTimeout(600);
const total = await page.locator('text="US$25.00"').count().catch(() => 0);
const totalTxt = await page.locator("text=$25.00").count().catch(() => 0);
console.log("calculator $25.00 shown:", total > 0 || totalTxt > 0);
await page.screenshot({ path: `${FRAMES}/5-calculator.png` });

await browser.close();
console.log("probe done");
