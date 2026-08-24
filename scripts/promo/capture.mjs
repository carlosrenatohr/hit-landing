// capture.mjs — graba el promo video de la web real de HIT Cargo (SPEC-P4-15).
//
// Uso:   node capture.mjs [--url http://localhost:4321] [--out .promo/raw.webm]
// Requiere el sitio corriendo (pnpm preview) y Playwright + chromium instalados.
//
// Enfoque: conduce el sitio REAL (fuente de verdad) — scroll fluido, navegación,
// demo de rastreo con la guía exacta, calculadora real — e inyecta overlays de
// título/escenas por CSSOM (CSP-safe: el meta CSP del sitio no permite estilos
// inline; la manipulación de CSSOM no está sujeta a CSP).
//
// La salida es un webm crudo; el corte (lead-in/tail) y la exportación MP4 se
// hacen en render.mjs con ffmpeg.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = (name, def) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
};

const BASE = arg("--url", process.env.BASE_URL ?? "http://localhost:4321");
const TRACKING = "1ZH936R30321624778"; // guía exacta del spec (resultado real: 812898 · Entregado)
const WORKER = "https://hit-ever-scraper.nativerse.workers.dev";
const OUT = path.resolve(SCRIPT_DIR, "../..", arg("--out", ".promo/raw.webm"));
const FRAMES = path.resolve(SCRIPT_DIR, "../..", ".promo/frames");
mkdirSync(path.dirname(OUT), { recursive: true });
mkdirSync(FRAMES, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t0 = Date.now();
const log = (...a) => console.log(`[t+${((Date.now() - t0) / 1000).toFixed(1)}s]`, ...a);

// Pre-warm best-effort del worker de tracking: el primer fetch desde el browser pega en cache.
// WORKER debe coincidir con el PUBLIC_API_URL horneado en el build (hoy: nativerse.workers.dev,
// ver .env). Si diverge, el pre-warm falla con WARN y el demo igual funciona (solo más lento).
try {
  const r = await fetch(`${WORKER}/track/${TRACKING}`);
  log("pre-warm tracking:", r.status, r.ok ? "OK" : "WARN");
} catch (e) {
  log("pre-warm WARN:", e.message.slice(0, 80));
}

// ─── UI inyectada (solo CSSOM — compatible con el meta CSP) ─────────────────────────────

async function injectUI(page) {
  await page.evaluate(() => {
    const el = (tag, styles = {}, text = "") => {
      const n = document.createElement(tag);
      for (const [k, v] of Object.entries(styles)) n.style[k] = v;
      if (text) n.textContent = text;
      return n;
    };
    // Limpieza visual de la grabación (solo para el promo, no altera el sitio).
    document.querySelectorAll('a[aria-label="Escribinos por WhatsApp"]').forEach((n) => (n.style.display = "none"));
    document.documentElement.style.scrollbarWidth = "none"; // Chromium 121+ honra scrollbar-width
    document.body.style.scrollbarWidth = "none";

    if (!document.getElementById("promo-wipe")) {
      const wipe = el("div", {
        position: "fixed", inset: "0", zIndex: "2147483646",
        background: "#0d0d0d", opacity: "0", pointerEvents: "none",
      });
      wipe.id = "promo-wipe";
      document.documentElement.appendChild(wipe);
    }

    if (!document.getElementById("promo-title")) {
      const root = el("div", {
        position: "fixed", left: "64px", bottom: "76px", right: "96px",
        zIndex: "2147483645", pointerEvents: "none", opacity: "0",
      });
      root.id = "promo-title";
      const row = el("div", { display: "flex", alignItems: "center", gap: "20px" });
      const bar = el("div", {
        flex: "0 0 auto", width: "10px", height: "64px", borderRadius: "5px", background: "#FF7A00",
      });
      const text = el("div", {
        fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
        fontWeight: "800", fontSize: "68px", lineHeight: "1.06", letterSpacing: "-0.5px",
        color: "#ffffff", maxWidth: "1150px", textShadow: "0 4px 28px rgba(0,0,0,0.55)",
      });
      text.id = "promo-title-text";
      row.appendChild(bar);
      row.appendChild(text);
      root.appendChild(row);
      document.documentElement.appendChild(root);
    }
  });
}

async function fadeIn(h, ms = 300) {
  await h.evaluate((n, ms) => { n.style.transition = `opacity ${ms}ms ease`; n.style.opacity = "1"; }, ms);
  await sleep(ms);
}
async function fadeOut(h, ms = 260) {
  await h.evaluate((n, ms) => { n.style.transition = `opacity ${ms}ms ease`; n.style.opacity = "0"; }, ms);
  await sleep(ms);
}
const titleEl = (page) => page.locator("#promo-title");

async function showTitle(page, text, holdMs) {
  await page.evaluate((t) => { const n = document.getElementById("promo-title-text"); if (n) n.textContent = t; }, text);
  await fadeIn(await titleEl(page).elementHandle(), 300);
  await sleep(holdMs);
  await fadeOut(await titleEl(page).elementHandle(), 260);
}

// Dip a negro, navegar, salir del dip (transición premium entre páginas).
async function wipeTo(page, url, label) {
  const wipe = await page.locator("#promo-wipe").elementHandle();
  await fadeIn(wipe, 220);
  log("→", label);
  await page.goto(`${BASE}${url}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await injectUI(page);
  await sleep(420);
  await fadeOut(await page.locator("#promo-wipe").elementHandle(), 300);
}

// Scroll suave con easing (cámara fluida sobre la página real).
async function smoothScroll(page, targetY, ms = 1800) {
  await page.evaluate(
    ({ y, ms }) =>
      new Promise((res) => {
        const start = window.scrollY;
        const delta = y - start;
        const t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const step = (now) => {
          const p = Math.min(1, (now - t0) / ms);
          window.scrollTo(0, start + delta * ease(p));
          if (p < 1) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      }),
    { y: targetY, ms }
  );
}
const box = async (loc) => (await loc.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };

// ─── escenas ───────────────────────────────────────────────────────────────────────────

async function sceneHero(page) {
  log("scene 1 — hero");
  await smoothScroll(page, 220, 1200); // cámara: leve descenso
  await showTitle(page, "Tu logística comienza aquí.", 1200);
  const cta = page.locator('a:has-text("Consultar Servicios")').first();
  const b = await box(cta);
  await page.mouse.move(b.x + b.width * 0.3, b.y + b.height / 2, { steps: 6 });
  await sleep(250);
  await page.screenshot({ path: `${FRAMES}/1-hero.png` });
}

async function sceneExplore(page) {
  log("scene 2 — explorar home");
  const sec = page.locator('section:has(h2:text("Soluciones de Importación Global"))');
  await smoothScroll(page, Math.max(0, (await box(sec)).y - 130), 1700);
  await sleep(150);
  await showTitle(page, "Todo lo que necesitas, en un solo lugar.", 1100);
  const card = page.locator("section div.group").first();
  if (await card.count()) {
    const cb = await box(card);
    await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2, { steps: 5 });
    await sleep(300);
  }
  await page.screenshot({ path: `${FRAMES}/2-services.png` });
}

async function sceneServicesFocus(page) {
  log("scene 3 — servicios");
  await smoothScroll(page, Math.max(0, (await box(page.locator("section div.group").first())).y - 300), 800);
  await showTitle(page, "Soluciones para cada envío.", 800);
  const card = page.locator("section div.group").nth(1);
  if (await card.count()) {
    const cb = await box(card);
    await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2, { steps: 5 });
    await sleep(250);
  }
}

async function sceneTracking(page) {
  log("scene 4 — tracking");
  await wipeTo(page, "/track", "track");
  const input = page.locator('input[placeholder*="guía"]');
  await input.click();
  await input.pressSequentially(TRACKING, { delay: 28 });
  await page.locator('form button[type="submit"]').click(); // acotado al form (el header tiene otro CTA)
  await showTitle(page, "Rastrea tu paquete fácilmente.", 2000);
  const pill = page.locator('span:has-text("Entregado")').first();
  try {
    await pill.waitFor({ state: "visible", timeout: 10000 });
    log("tracking OK — resultado real recibido");
  } catch {
    log("tracking WARN — sin resultado en 10 s");
  }
  await sleep(1000);
  await page.screenshot({ path: `${FRAMES}/5-track-result.png` });
}

async function scenePricing(page) {
  log("scene 5 — precios + calculadora");
  await wipeTo(page, "/precios", "precios");
  const calcTitle = page.getByText("Calculá tu envío");
  await smoothScroll(page, Math.max(0, (await box(calcTitle)).y - 180), 1100);
  await sleep(200);
  await showTitle(page, "Precios claros. Sin sorpresas.", 1200);
  await page.locator("button", { hasText: "Marítimo" }).click();
  const weight = page.locator('input[id="weight"]');
  await weight.click();
  await weight.fill("");
  await weight.pressSequentially("10", { delay: 80 });
  await sleep(700);
  const ok = await page.locator("text=$25.00").count();
  log("calculadora 10 lb marítimo → $25.00:", ok > 0);
}

async function sceneMystery(page) {
  log("scene 6 — Y esto es solo el principio...");
  await page.evaluate(() => {
    const el = (tag, styles = {}, text = "") => {
      const n = document.createElement(tag);
      for (const [k, v] of Object.entries(styles)) n.style[k] = v;
      if (text) n.textContent = text;
      return n;
    };
    const ov = el("div", {
      position: "fixed", inset: "0", zIndex: "2147483647", pointerEvents: "none", opacity: "0",
      background: "linear-gradient(160deg, #14213D 0%, #0B1526 45%, #111111 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    });
    ov.id = "promo-mystery";
    const glow = el("div", {
      position: "absolute", inset: "0",
      background: "radial-gradient(circle at 50% 42%, rgba(255,122,0,0.14), transparent 62%)",
    });
    const txt = el(
      "div",
      {
        position: "relative", fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
        fontWeight: "900", fontSize: "84px", letterSpacing: "1px", color: "#ffffff",
        textAlign: "center", maxWidth: "1400px", lineHeight: "1.1", textShadow: "0 6px 40px rgba(0,0,0,0.6)",
      },
      "Y esto es solo el principio..."
    );
    ov.appendChild(glow);
    ov.appendChild(txt);
    document.documentElement.appendChild(ov);
  });
  const o = await page.locator("#promo-mystery").elementHandle();
  await fadeIn(o, 350);
  await sleep(1000);
}

async function sceneLockup(page) {
  log("scene 7 — lockup final");
  // Crossfade dentro del overlay opaco: se desvanece el texto del misterio y entra el lockup.
  const ov = await page.locator("#promo-mystery").elementHandle();
  await ov.evaluate((n) => {
    const txt = n.querySelector("div:not(:first-child)"); // segundo hijo = texto
    if (txt) txt.style.transition = "opacity 220ms ease";
    if (txt) txt.style.opacity = "0";
  });
  await sleep(240);
  await page.evaluate(() => {
    const el = (tag, styles = {}, text = "") => {
      const n = document.createElement(tag);
      for (const [k, v] of Object.entries(styles)) n.style[k] = v;
      if (text) n.textContent = text;
      return n;
    };
    const ov = document.getElementById("promo-mystery");
    if (!ov) return;
    ov.style.background = "linear-gradient(165deg, #14213D 0%, #0E1930 40%, #111111 100%)";
    while (ov.firstChild) ov.removeChild(ov.firstChild);

    const glow = el("div", {
      position: "absolute", inset: "0",
      background: "radial-gradient(circle at 50% 38%, rgba(255,122,0,0.18), transparent 55%)",
    });
    const stack = el("div", { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "34px" });
    // Logo oficial HIT CARGO — versión para fondos oscuros (la que usa el sitio en dark mode).
    const logo = el("img", { width: "560px", height: "auto", transform: "scale(0.94)", transition: "transform 700ms cubic-bezier(.2,.8,.2,1)" });
    logo.src = "/brand/logo-full-dark.png";
    logo.alt = "HIT CARGO";

    const attribution = el("div", { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" });
    const nati = el("img", { width: "150px", height: "auto", opacity: "0.92" });
    nati.src = "/brand/nativerse-logo-version-finalv1.png";
    nati.alt = "Nativerse";
    const credit = el(
      "div",
      {
        fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif", fontWeight: "400",
        fontSize: "20px", letterSpacing: "3px", color: "rgba(255,255,255,0.72)",
      },
      "Desarrollado por Nativerse"
    );
    attribution.appendChild(nati);
    attribution.appendChild(credit);

    stack.appendChild(logo);
    stack.appendChild(attribution);
    stack.style.opacity = "0";
    stack.style.transition = "opacity 420ms ease";
    ov.appendChild(glow);
    ov.appendChild(stack);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      stack.style.opacity = "1";
      logo.style.transform = "scale(1)";
    }));
  });
  await sleep(1100);
  await page.screenshot({ path: `${FRAMES}/7-lockup.png` });
}

// ─── main ──────────────────────────────────────────────────────────────────────────────

const browser = await chromium.launch({ headless: true });
const contextCreatedAt = Date.now();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: path.dirname(OUT), size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("TagManager")) console.log("[console.error]", m.text().slice(0, 160));
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 160)));

log("load home");
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await injectUI(page);
await sleep(900);
log("dark mode:", await page.evaluate(() => document.documentElement.classList.contains("dark")));

// ── reloj de escenas (el lead-in se recorta en render.mjs) ──
t0 = Date.now();
const sceneStartAt = t0;
log("scene clock start");

await sceneHero(page);
await sceneExplore(page);
await sceneServicesFocus(page);
await sceneTracking(page);
await scenePricing(page);
await sceneMystery(page);
await sceneLockup(page);
await sleep(600);

const vp = page.video();
const videoPath = vp ? await vp.path() : null;
await context.close();
await browser.close();

const totalMs = Date.now() - t0;
if (videoPath) {
  const { copyFileSync, writeFileSync } = await import("node:fs");
  copyFileSync(videoPath, OUT);
  log("copied raw →", OUT);
  // Metadatos para cortes exactos en render.mjs (lead-in medido, no estimado).
  writeFileSync(
    path.resolve(SCRIPT_DIR, "../..", ".promo/capture-meta.json"),
    JSON.stringify(
      { leadInSec: (sceneStartAt - contextCreatedAt) / 1000, sceneSec: totalMs / 1000, base: BASE, tracking: TRACKING },
      null,
      2
    )
  );
  log("meta → .promo/capture-meta.json");
}

log("video:", videoPath);
log(`scene duration: ${(totalMs / 1000).toFixed(2)}s — output: ${OUT}`);
