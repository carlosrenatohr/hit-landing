// capture-rana.mjs — promo del juego "Rana Leopardo — Aventura en Corn Island" (5-10s).
// Graba GAMEPLAY REAL con Playwright: menú → nivel 1 → arrastre de la resortera → lanzamiento,
// con overlays de títulos en español y lockup final (frog + Nativerse).
// Servidor estático propio (el juego carga niveles por fetch; file:// lo bloquearía).
//
// Uso:   node capture-rana.mjs [--probe]
// Salida: rana-leopardo-game/.promo/raw.webm + capture-meta.json

import { chromium } from "playwright";
import { mkdirSync, copyFileSync, writeFileSync, existsSync, statSync, createReadStream } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const RANA_DIR = path.resolve(SCRIPT_DIR, "../../../../rana-leopardo-game");
const OUT_DIR = path.join(RANA_DIR, ".promo");
mkdirSync(OUT_DIR, { recursive: true });

const PROBE = process.argv.includes("--probe");
const W = 1920, H = 1080;

// ── servidor estático del juego (necesario: level-loader usa fetch) ──
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon", ".mp3": "audio/mpeg" };
function serve(port) {
  const server = http.createServer((req, res) => {
    let p;
    try { p = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { p = "/"; }
    if (p.endsWith("/")) p += "index.html";
    const f = path.join(RANA_DIR, p);
    if (!f.startsWith(RANA_DIR) || !existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); res.end("nf"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
    createReadStream(f).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

// ── overlays (títulos + lockup) ──
const CSS = `
.promo-ov{position:fixed;z-index:2147483000;pointer-events:none;font-family:system-ui,'Segoe UI',sans-serif}
#po-title{left:64px;bottom:92px;opacity:0}
#po-title .l1{font-weight:900;font-size:64px;line-height:1.02;color:#1f7a3d;text-shadow:0 3px 0 #ffffff,0 6px 26px rgba(255,255,255,.95);letter-spacing:-1px}
#po-title .l2{font-weight:600;font-size:26px;color:#4b5a52;text-shadow:0 2px 0 #fff;margin-top:6px}
#po-title.po-show,#po-lock.po-show{animation:poFade .45s ease-out forwards}
#po-title.po-hide{animation:poHide .35s ease-in forwards}
@keyframes poFade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes poHide{from{opacity:1}to{opacity:0}}
#po-lock{inset:0;opacity:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#ecfbf1 0%,#d6f3e2 55%,#a9e4ca 100%)}
#po-lock .inner{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}
#po-lock img.frog{height:150px;filter:drop-shadow(0 12px 24px rgba(47,124,71,.35))}
#po-lock .t1{font-weight:900;font-size:92px;letter-spacing:-2px;color:#1f7a3d;line-height:1;text-shadow:0 4px 0 rgba(255,255,255,.85)}
#po-lock .t2{font-weight:600;font-size:30px;color:#5b6a62}
#po-lock .div{width:120px;height:3px;border-radius:2px;background:linear-gradient(90deg,#ffb03a,#f26a75,#7fc8ee)}
#po-lock .nat{display:flex;align-items:center;gap:10px;color:#54625a;font-size:20px;font-weight:600}
#po-lock .nat img{height:44px}
`;

const T1 = ["¡Rana Leopardo!", "Aventura en Corn Island"];
const T2 = ["¡Lanza a Nati!", "Apunta… y dispara"];
const T3 = ["Descubre los tesoros de Nicaragua", "¡Cuidado con los cangris! 🦀"];

async function injectOverlays(page) {
  await page.evaluate(({ CSS, T1, T2, T3 }) => {
    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
    const title = document.createElement("div");
    title.id = "po-title"; title.className = "promo-ov";
    title.innerHTML = `<div class="l1"></div><div class="l2"></div>`;
    document.body.appendChild(title);
    const lock = document.createElement("div");
    lock.id = "po-lock"; lock.className = "promo-ov";
    lock.innerHTML = `<div class="inner">
      <img class="frog" src="/assets/icons/favicon.svg" alt="">
      <div class="t1">Rana Leopardo</div>
      <div class="t2">Aventura en Corn Island</div>
      <div class="div"></div>
      <div class="nat"><img src="/.promo/nativerse-logo.png" alt="Nativerse">Powered by Nativerse</div>
    </div>`;
    document.body.appendChild(lock);
    window.__po = { title, lock, T1, T2, T3 };
    window.__poTitle = (i, show) => {
      const [l1, l2] = window.__po.title.children;
      l1.textContent = show ? window.__po[`T${i}`][0] : "";
      l2.textContent = show ? window.__po[`T${i}`][1] : "";
      window.__po.title.classList.toggle("po-show", show);
      window.__po.title.classList.toggle("po-hide", !show);
    };
    window.__poLock = (show) => window.__po.lock.classList.toggle("po-show", show);
  }, { CSS, T1, T2, T3 });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);

async function main() {
  const server = await serve(8012);
  const browser = await chromium.launch({ headless: true });
  const ctxOpts = { viewport: { width: W, height: H } };
  if (!PROBE) ctxOpts.recordVideo = { dir: OUT_DIR, size: { width: W, height: H } };
  const context = await browser.newContext(ctxOpts);
  const page = await context.newPage();
  page.on("pageerror", (e) => log("[pageerror]", String(e).slice(0, 120)));
  page.on("console", (m) => { if (m.type() === "error") log("[console.error]", m.text().slice(0, 120)); });

  const created = Date.now();
  await page.goto("http://127.0.0.1:8012/index.html", { waitUntil: "load" });

  // esperar el menú (el splash se oculta al arrancar el motor)
  await page.waitForSelector("#btn-play", { timeout: 10000 });
  await sleep(350);
  const sceneStart = Date.now();
  const leadIn = (sceneStart - created) / 1000;

  await injectOverlays(page);

  // WebAudio cuelga intermitentemente el main thread en headless (resume/osciladores
  // en el primer gesto → el drag llama audio.play('stretch') en cada move). Para la
  // captura el audio lo pone el mux (música), no la página → se anula el audio del juego.
  await page.evaluate(() => {
    const e = FrogGame.EngineInstance;
    if (e && e.audio) { e.audio.play = function () {}; e.audio.unlock = function () {}; }
  });

  // estado del motor para calibrar el arrastre
  const probe = await page.evaluate(() => {
    const e = window.FrogGame && FrogGame.EngineInstance;
    if (!e) return { err: "no engine" };
    const sc = e.scene || {};
    const cam = e.camera || {};
    const sl = sc.slingshot || {};
    return {
      hasScene: !!e.scene, hasLevel: !!e.currentLevel, hasSlingshot: !!sc.slingshot,
      entities: Array.isArray(sc.entities) ? sc.entities.length : -1,
      slingshot: sl, camX: cam.x, camY: cam.y, scale: cam.scale, zoom: cam.zoom,
      keys: Object.keys(sc).slice(0, 20),
    };
  });
  log("[probe-inicial]", JSON.stringify(probe));

  const show = (i, on) => page.evaluate(([i, on]) => window.__poTitle(i, on), [i, on]);
  const lock = (on) => page.evaluate((on) => window.__poLock(on), on);
  const drag = async (ax, ay) => {
    // Tiro a MÁXIMA potencia (pull ~173 → clamp 150 → ~1440 px/s): la rana llega
    // hasta las torres de cangris (x≈1150) y el impacto es visible.
    const tx = ax - 217, ty = ay + 142;
    const t0 = Date.now();
    log("[drag]", JSON.stringify({ ax, ay, tx, ty }));
    await page.mouse.move(ax, ay);
    await sleep(120);
    await page.mouse.down();
    await sleep(80);
    for (let i = 1; i <= 9; i++) {
      const k = i / 9;
      await page.mouse.move(ax + (tx - ax) * k, ay + (ty - ay) * k);
      await sleep(42);
    }
    await sleep(430);                              // preview de trayectoria visible
    if (PROBE) {
      const mid = await page.evaluate(() => {
        const e = FrogGame.EngineInstance;
        return { dragging: e.dragging, pull: e.pull ? { x: e.pull.x, y: e.pull.y } : null, previewT: e.previewT, held: !!e.heldFrog, state: e.state, inputOn: e.input ? e.input.enabled : null };
      });
      log("[drag-mid]", JSON.stringify(mid));
    }
    await page.mouse.up();
    log("[lanzado]", ((Date.now() - t0) / 1000).toFixed(2), "s");
  };

  // ── secuencia del promo (determinista) ──
  const seq0 = Date.now();
  const elapsed = (l) => log("[t]", ((Date.now() - seq0) / 1000).toFixed(2), "s —", l);
  show(1, true);                                   // título 1 (menú)
  await sleep(1250);
  show(1, false);
  // Entrar al nivel: llamada directa al motor (page.click espera actionability y
  // puede tardar segundos por la animación del menú). startLevel hace exactamente
  // lo mismo que el botón #btn-play.
  await page.evaluate(() => { FrogGame.EngineInstance.startLevel(1); });
  elapsed("startLevel llamado");
  await page.waitForFunction(() => {
    const e = window.FrogGame && FrogGame.EngineInstance;
    return e && e.state === "PLAYING" && (e.entities || []).length > 0 && !!e.heldFrog;
  }, { timeout: 8000 });
  elapsed("nivel listo");
  show(2, true);                                   // título 2 durante el flyover
  await sleep(1050);                               // flyover de cámara (paneo sobre los cangris)
  await page.evaluate(() => { FrogGame.EngineInstance._skipPreview(); });
  await sleep(420);                                // la cámara vuelve a la resortera
  elapsed("cámara lista");

  const frogScreen = () =>
    page.evaluate(() => {
      const e = FrogGame.EngineInstance;
      const f = e.heldFrog;
      const c = f.position || f.getWorldCenter();
      const s = e.camera.scale * e.camera.zoom;
      return { ax: (c.x - e.camera.x) * s, ay: (c.y - e.camera.y) * s, camX: e.camera.x };
    });
  const launched = async () =>
    page.evaluate(() => {
      const e = FrogGame.EngineInstance;
      return e.camera.x > 50 || !e.heldFrog;       // cámara siguiendo al vuelo o rana consumida
    });

  let pt = await frogScreen();
  log("[frog-pos]", JSON.stringify(pt));
  await drag(pt.ax, pt.ay - 22);                   // lanzamiento (cancela el flyover restante)
  elapsed("drag completo");
  // verificar que despegó; si no, reintento con la rana siguiente (ya rearmada)
  await sleep(700);
  if (!(await launched())) {
    log("[retry] primer tiro no despegó — reintento");
    pt = await frogScreen();
    await drag(pt.ax, pt.ay - 22);
    await sleep(700);
  }
  log("[despegue]", (await launched()).toString());
  await sleep(1000);                               // vuelo + impacto + partículas
  elapsed("vuelo");
  show(2, false);
  show(3, true);                                   // título 3
  await sleep(1300);
  show(3, false);
  await sleep(120);
  lock(true);                                      // lockup final (frog + Nativerse)
  await sleep(1450);
  const seqEnd = Date.now();
  const sceneSec = (seqEnd - seq0) / 1000;
  await page.evaluate(() => { window.__promoDone = true; });

  if (PROBE) {
    await sleep(300);
    const after = await page.evaluate(() => {
      const e = FrogGame.EngineInstance;
      const vel = e.heldFrog ? (e.heldFrog.body ? e.heldFrog.body.velocity : null) : null;
      return { camX: e.camera.x, heldFrog: !!e.heldFrog, vel: vel ? { x: vel.x, y: vel.y } : null, nEntities: (e.entities || []).length, state: e.state };
    });
    log("[probe-despues]", JSON.stringify(after));
    log(`probe ok (lead-in ${leadIn.toFixed(2)}s, escenas ${sceneSec.toFixed(2)}s)`);
  } else {
    await sleep(400);
  }

  const vp = page.video();
  const videoPath = vp ? await vp.path() : null;
  await context.close();
  await browser.close();
  server.close();

  if (!PROBE && videoPath) {
    const RAW = path.join(OUT_DIR, "raw.webm");
    copyFileSync(videoPath, RAW);
    writeFileSync(path.join(OUT_DIR, "capture-meta.json"), JSON.stringify({ leadInSec: leadIn, sceneSec, base: "http://127.0.0.1:8012/index.html" }, null, 2));
    log(`raw → ${RAW} | lead-in ${leadIn.toFixed(2)}s | escenas ${sceneSec.toFixed(2)}s`);
  } else {
    log(`probe ok (lead-in ${leadIn.toFixed(2)}s)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
