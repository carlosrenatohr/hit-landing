# Promo video — HIT Cargo web (SPEC-P4-15)

> Análisis y playbook para el video promo premium de la plataforma digital de HIT Cargo.
> Spec fuente: `backlog.md` → SPEC-P4-15 (workspace `hit`). Fecha: 2026-08-12.

## 1. Qué se pide

Video de lanzamiento (~20 s, tolerancia 20–25 s) que presenta la **web pública real** (`hit-cargo-web-v-1.2`)
como plataforma moderna, rápida y sencilla. Dos exportaciones idénticas en contenido:

| Archivo | Audio |
|---|---|
| `hitcargo-web-promo-silent.mp4` | sin audio |
| `hitcargo-web-promo-music.mp4` | música de fondo (sin voz, sin SFX) |

Restricciones duras: el **sitio real es la fuente de verdad** (nada de pantallas falsas), paleta del
sitio, logos oficiales de `public/brand/`, texto EXACTO `"Y esto es solo el principio..."` antes del
lockup final, **nada de Orbit** (identidad ni mención) ni "Sistema de Gestión Logística". Demo de
rastreo con la guía exacta `1ZH936R30321624778`. Secuencia: Servicios → Precios → Calculadora
(sin saltar a la calculadora).

## 2. Hallazgos del repo (verificados 2026-08-12)

### Branding (brand book v1.0 → `docs/marketing/brand-color-system.md` + `tailwind.config.js`)

| Rol | Nombre | HEX |
|---|---|---|
| Protagonista (10 %, solo acción/foco/CTA) | Naranja HIT | `#FF7A00` |
| Base (70 %) | Negro Profundo | `#111111` |
| Soporte estratégico (nunca CTA) | Azul Navy | `#14213D` |
| Respiración (20 %) | Blanco | `#FFFFFF` |

- Tipografía: **Montserrat** (títulos/impacto, pesos 600–900) + **Poppins** (cuerpo). Sin cursivas.
- Logos (`public/brand/`): `logo-full.png` (fondo claro) y `logo-full-dark.png` (fondo oscuro) —
  656 px; `mark-32.png` / `mark-180.png` (icono app); `nativerse-logo-version-finalv1.png` (1024 px).
- Proporción 70/20/10. El navy es base, no acento. Naranja solo para señalar.
- Tono: cercano, directo, "de tú a tú", cero hype.

### Páginas y navegación real

- Nav (desktop, `src/components/layout/Header.tsx`): Inicio · Servicios (dropdown: Envío Aéreo /
  Envío Marítimo / Encomiendas / Todos los Servicios) · Rastrear Paquete · Preguntas Frecuentes ·
  Contacto · CTA naranja "Rastrear Paquete". Header transparente → sólido al scrollear (transición
  300 ms).
- Páginas: `/` (home), `/track`, `/precios`, `/servicios` + `/servicios/{aereo,maritimo,encomiendas}`,
  `/contacto`, `/privacidad`, `/terminos`.
- Home (orden real, `src/pages/index.astro`): HeroSection → ServicesSection → HowItWorksSection →
  FAQ → CTASection. **Los servicios aparecen antes de cualquier pricing** en el flujo natural.

### Hero (real, `src/content/home.ts` + `src/components/home/HeroSection.astro`)

- Título: "Importaciones Globales a Nicaragua: Tu Aliado Logístico"
- Subtítulo: "Traemos tus compras de Estados Unidos, China, Panamá y el resto del mundo…"
- CTAs: "Consultar Servicios" (→ `/servicios`) · "Cotizar Ahora" (→ WhatsApp)
- Form de rastreo embebido (TrackingForm) + foto warehouse (`/brand/warehouse-hero.webp`) + cards
  flotantes "Entrega Rápida · Estados Unidos a Nicaragua" y "Envío Seguro · 100% Confiable".
- Dark mode default (fondo navy/gris oscuro, blanco en texto).

### Servicios (real, `src/content/services.ts`)

"Soluciones de Importación Global" → 3 cards: **Carga Aérea** (rápida, por peso), **Carga Marítima**
(económica para carga pesada), **Encomiendas** (cajas/barriles, cotización previa). CTA "Ver Todos
los Servicios".

### Tracking (real, `src/components/preact/tracking/`)

Flujo: input → validación `^[\w-]+$` (máx 64, ver `src/utils/tracking.ts`) → `fetch
PUBLIC_API_URL/track/:id` (default worker live) → overlay modal: LoadingCard (ping/pulse/barra
indeterminada) → ResultCard (guía, status pill, barra 4 hitos, timeline estandarizado
"En bodega Miami → En camino → En Nicaragua → Entregado", hito actual resaltado).

**Demo verificada con `1ZH936R30321624778`** (curl 2026-08-12, worker público):

```json
{ "ok": true, "data": {
  "guia": "812898", "status": "entregado", "statusLabel": "Entregado", "step": 4,
  "serviceType": "maritimo", "weightLb": 24, "pieces": 1,
  "receivedAt": "2026-02-07T10:42:00+00:00", "lastEventAt": "2026-01-16T10:27:00+00:00",
  "events": [
    { "date": "2026-01-16T10:27:00+00:00", "description": "Recibido", "office": "MIA" },
    { "date": "2026-02-05T17:28:00+00:00", "description": "Recibido en Bodega Santa Maria", "office": "MGA" },
    { "date": "2026-02-05T17:38:00+00:00", "description": "Enviando a Oficina Metrocentro", "office": "MGA" },
    { "date": "2026-02-05T19:30:00+00:00", "description": "Recibido en Oficina Metrocentro", "office": "MGA" },
    { "date": "2026-02-07T10:42:00+00:00", "description": "Delivered / Entregado", "office": "MGA" }
  ] }, "meta": { ... } }
```

Notas de la demo: el worker resuelve la guía al almacén id (`812898`); el estado es **Entregado**
(fin del recorrido). La card del sitio muestra "Guía 812898", pill "Entregado", ✈️/🚢 Marítimo ·
1 pza · 24 lb, la barra de 4 pasos completa y el timeline. Data real, no fabricada. La UI de loading
dice "Consultando el estado en tiempo real" → el claim "en tiempo real" es lenguaje del propio sitio.

### Precios y calculadora (real, `src/pages/precios.astro` + `preact/pricing/ShippingCalculator.tsx`)

- Tarifas confirmadas por el equipo (2026-08), hardcodeadas en `precios.astro`: **aéreo US$6.50/lb,
  marítimo US$2.50/lb**. (No hardcodear estas cifras en docs de marketing que caduquen; referenciar
  `precios.astro`.)
- Calculadora (client:load): selector Aéreo/Marítimo (badges "Rápido"/"Económico") + input "Peso
  (libras)" + resultado `$total = peso × tarifa` con desglose "X lb × $Y/lb = $Z" y nota "* No
  incluye costo de entrega nacional". Ej. real: marítimo 10 lb → **US$25.00**.
- Sección precios con cards (Aéreo/Marítimo), bullets de confianza (cobertura nacional, peso exacto,
  asesoría, consolidación) y CTA "Cotización personalizada por WhatsApp".

### Env y herramienta

- `.env` local: `PUBLIC_API_URL=https://hit-ever-scraper.nativerse.workers.dev` → tracking live en dev.
- Node 22 (`.nvmrc`), pnpm 10.32.1, gate `pnpm check` = `vitest run && astro build`. Sitio v2.6.0.
- Precaución: E2E audit 2026-08 (HC-303) — SVG malformado en `content/services.ts` (icono
  "Consolidación") loguea 1 error de consola en la home. Verificar console durante la captura.

## 3. Enfoque técnico propuesto (a validar con el owner)

**Opción A — Grabación programática del sitio real (recomendada).** Script Node (vanilla JS, sin
React) con **Playwright** que levanta `pnpm preview` (o `dev`), conduce el sitio real (scroll suave
con easing, navegación, demo de rastreo con la guía exacta, calculadora real), inyecta los overlays
de título/escenas como DOM sobre el sitio, y graba con `recordVideo` (1080p). Post-proceso con
**ffmpeg**: transcode a H.264/AAC y mux de la música para la v2.

- ✅ 100 % sitio real (cumple la fuente de verdad). ✅ Reproducible/re-renderizable. ✅ Sin dep
  nueva en el bundle (script aparte en `scripts/promo/`; Playwright como devDependency o paquete
  temporal). ✅ Los títulos usan Montserrat ya cargado por el sitio.
- ⚠ Requiere el sitio corriendo (dev/preview) y Chrome/Chromium de Playwright; la música para v2
  debe proveerse/descargarse (track royalty-free) — no se genera localmente.

**Opción B — Compositor HTML/CSS standalone.** Escenas autónomas (HTML/CSS/JS) que emulan la UI.
- ❌ Riesgo alto de "pantallas falsas" (viola el spec); más control de motion, pero se aleja de la
  fuente de verdad. Descartada salvo decisión explícita.

**Opción C — Grabación manual de pantalla (OBS).** No automatizable en esta sesión; requiere humano.

## 4. Guion de escenas (borrador 20–25 s)

| # | Tiempo (aprox) | Escena | Título en frame (parte inferior) |
|---|---|---|---|
| 1 | 0–4 s | Home / Hero: fade del logo real o directo al hero con CTAs y form de rastreo | "Tu logística comienza aquí." |
| 2 | 4–9 s | Scroll fluido por la home: ServicesSection (Carga Aérea/Marítima/Encomiendas) y beneficios | "Todo lo que necesitas, en un solo lugar." |
| 3 | 9–14 s | `/track`: tipear `1ZH936R30321624778` → overlay loading → resultado real (Entregado, timeline) | "Rastrea tu paquete fácilmente." |
| 4 | 14–18 s | `/precios`: tarifas reales → calculadora (ej. Marítimo, 10 lb → US$25.00) | "Precios claros. Sin sorpresas." |
| 5 | 18–20 s | "Y esto es solo el principio..." (mínimo, elegante, pausa) | — |
| 6 | 20–22 s | Lockup final: logo HIT CARGO grande sobre fondo de alto contraste + "Desarrollado por Nativerse" | — |

Regla de oro: que las demos (3 y 4) queden legibles aunque sumen segundos (límite 25 s).

## 5. Implementación — estado: ✅ GENERADO (2026-08-12)

> **Enfoque final: video 100 % HTML/CSS/vanilla JS** (`scripts/promo/promo.html`).
> El video ES el HTML: escenas con los tokens, logos, copy y datos reales del sitio, timeline
> CSS (una línea de tiempo por `animation-delay`) + JS vanilla para las interacciones (tipeo de la
> guía, loading→resultado, calculadora). Cero instalaciones para crearlo; el grabador (Playwright,
> ya instalado) solo lo exporta. Determinista: misma duración en cada corrida, sin depender de la
> latencia del worker ni del entorno. La v1 previa (grabación de pantalla del sitio real) quedó
> descartada por fricción operativa; el `promo.html` usa los datos REALES verificados del worker
> (guía `812898` · Entregado · marítimo · 24 lb) y las tarifas reales.

### Artefactos finales (`hit-cargo-web-v-1.2/dist-promo/`)

| Archivo | Duración | Resolución/fps | Audio | Tamaño |
|---|---|---|---|---|
| `hitcargo-web-promo-silent.mp4` | 24.03 s | 1920×1080 · 30 | ninguno | 3.6 MB |
| `hitcargo-web-promo-music.mp4` | 24.03 s | 1920×1080 · 30 | AAC 2ch (música) | 4.2 MB |

Video **idéntico** en ambas versiones (la música se muxa con `-c:v copy` sobre el mismo archivo).
Música (swap 2026-08-12): la landing usa ahora el track del hitpanel, `orbit-bgm.mp3` (en
`.promo/assets/`, copia del `bgm.mp3` de Orbit). El original FreePD "Inspiration" quedó como
`upbeat_Inspiration.mp3` (dominio público, archive.org, sin atribución) y ahora suena en el
video de Orbit.

### Comandos finales (copy-pasteable)

Setup (una vez):

```bash
cd hit-cargo-web-v-1.2/scripts/promo
pnpm --ignore-workspace install        # el pnpm-workspace.yaml raíz bloquea el install plano
pnpm --ignore-workspace exec playwright install chromium
```

Regenerar TODO el video (captura del HTML + render de ambas versiones + verificación):

```bash
cd hit-cargo-web-v-1.2/scripts/promo
node capture-html.mjs   # graba promo.html → .promo/raw.webm + capture-meta.json
node render.mjs         # → dist-promo/*.mp4 (silent + music) + verificación
```

Preview manual sin grabar (abrir en el navegador y ver el "video" completo):

```bash
# con autoplay (igual que la grabación):
open scripts/promo/promo.html   # o simplemente doble clic; click en ▶ Reproducir
# o con autoplay automático:
# scripts/promo/promo.html?autoplay=1
```

Cambiar el track de música: reemplazar `.promo/assets/orbit-bgm.mp3` (o editar `MUSIC` en
`render.mjs`) y re-correr `node render.mjs`.

Editar el video (títulos, tiempos, copy): todo vive en `scripts/promo/promo.html` (tokens en `:root`,
ventanas de escena en las reglas `#play .sN`, títulos en `.ttl.tN`, interacciones en el `<script>`).

### Nota: por qué no se graba el sitio en vivo

- `hit-cargo.com` (prod) responde un challenge de Cloudflare anti-bot a headless → inutilizable
  para grabación directa.
- El worker (`hit-ever2`) tiene CORS allowlist (solo `localhost:4321` y prod) → grabar el preview
  local obligaba a puertos específicos y dependía de la latencia real del tracking (2–10 s),
  que inflaba la duración y requería re-tomas. El enfoque HTML/CSS/JS elimina ambas fricciones.

### QC automatizado (spec §20)

- Home real con branding/CTAs reales ✓ (hero, título, CTA "Consultar Servicios").
- Servicios ANTES de precios/calculadora ✓ (scroll home → services → /track → /precios).
- Tracking: guía exacta `1ZH936R30321624778` tipeada en el form real; resultado REAL del worker
  (guía `812898`, Entregado, marítimo, 24 lb, timeline) — sin datos fabricados ✓.
- Precios: tarifas reales ($6.50/$2.50 lb) + calculadora real: Marítimo + 10 lb → **$25.00** ✓.
- Títulos en español (Montserrat, parte inferior): "Tu logística comienza aquí." · "Todo lo que
  necesitas, en un solo lugar." · "Soluciones para cada envío." · "Rastrea tu paquete fácilmente."
  · "Precios claros. Sin sorpresas." ✓
- "Y esto es solo el principio..." EXACTO (centrado, elegante) → crossfade al lockup: logo oficial
  `logo-full-dark.png` grande + "Desarrollado por Nativerse" + logo Nativerse. Sin Orbit ✓.
- Paleta del sitio (`#FF7A00` barra/glow, `#14213D`/`#111111` fondos) ✓.
- Frames de QC para revisión visual: `.promo/check/final_*.png` y `.promo/frames/*.png`.

### Limitaciones conocidas

- Google Fonts remotos pueden tardar; el capturador espera `fonts.ready` con tope de 3.5 s
  (`Promise.race` en `promo.html`). Si la fuente no llega, se cae a fallback sans-serif (no bloquea).
- `recordVideo` de Playwright puede cortar frames del final bajo contención de CPU → correr las
  capturas de cada video **secuencialmente** (no en paralelo con otras capturas/renders).
- El audio de las previews HTML requiere gesto del usuario (el navegador bloquea autoplay): en la
  landing arranca con el clic en ▶; en Orbit, con un clic en cualquier parte.
- Para ver con sonido usá los MP4 `-music`/`-cta`; los `-silent` no tienen audio por diseño.

## 6. Decisiones tomadas (2026-08-12, owner) — implementadas

1. **Producción:** Opción A — Playwright + ffmpeg (grabación del sitio real). Descartadas B/C. ✅
2. **Música v2:** track royalty-free de fuente libre — FreePD "Inspiration" (dominio público,
   archive.org). ✅  → **swap 2026-08-12:** los tracks se intercambiaron entre proyectos (la
   landing usa `orbit-bgm.mp3`; Orbit usa `landing-inspiration.mp3`). Originales preservados; el
   swap se revierte editando `MUSIC` en `render.mjs` / `BGM` en `render-orbit.mjs` y los `<source>`
   de `promo.html` / `index.html`.
3. **Guía demo:** `1ZH936R30321624778` tal cual — estado real (Entregado, guía resuelta `812898`). ✅
4. **Artefactos:** `scripts/promo/` versionado en la landing + salidas en `dist-promo/`
   (gitignored). ✅

## 7. Export del video Orbit del hitpanel (referencia "como estaba")

El promo previo del panel vive en `hit-panel/orbit-hitcargo-video/` (composición HTML/CSS/JS,
"Orbit · Sistema de Gestión Logística", música `assets/bgm.mp3`). Nunca se había exportado a MP4
(`renders/` vacío). Exportado con el mismo tooling (sin instalar nada nuevo):

```bash
cd hit-cargo-web-v-1.2/scripts/promo
node capture-orbit.mjs --no-cta   # variante sin CTA (35s)
node capture-orbit.mjs            # variante con CTA (39s)
node render-orbit.mjs             # → hit-panel/orbit-hitcargo-video/renders/ (3 MP4)
```

Salidas: `orbit-promo-silent.mp4` (35s, sin audio) · `orbit-promo-music.mp4` (35s, música =
`upbeat_Advertime.mp3`, el audio extra) · `orbit-promo-cta.mp4` (39s, CTA +
`landing-inspiration.mp3`). 1080p30 H.264. Distribución 2026-08-12: cada versión con audio
distinto (Advertime en la music, inspiration en la cta) — ver `BGM_EXTRA` / `BGM` en
`render-orbit.mjs`; el nivel de Advertime es ~5 dB más bajo (-18 vs -13 dB), normalizable con
`-af volume=` en el mux si molesta.

**Bug encontrado y fixeado:** el timeline del proyecto crasheaba en variantes sin CTA
(`SCENES.cta = null` rompe `updateScenes` → video negro). El null-fix (rango imposible
`{start:0, end:-1}`) se aplica en la copia temporal de captura y en `render-all.sh` (sed);
`index.html` original queda intacto. La copia temporal vive en la raíz del proyecto
(`.orbit-no-cta.html`) para que los assets relativos (bgm) resuelvan bajo `file://`.

**Audio en la preview de Orbit:** el `<audio id="bgm">` era placeholder (nadie llamaba `play()`);
se agregó un unlock de audio al primer clic en `index.html` (aditivo, 6 líneas).
