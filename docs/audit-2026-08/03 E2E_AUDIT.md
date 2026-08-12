# 03 E2E_AUDIT.md — Landing Page E2E & Browser Test Report (B1)

- **Date/rev:** audit-2026-08; site `pnpm dev :4321` + prod smoke `dist/` (preview server).
- **Environments:** site (v1.2, 4321 preview), worker (hit-ever-scraper prod), panel (`hit-panel.pages.dev` current).
- **Method:** page load → wait → eval junction (collect headers, nav, overflow, console, scroll, video/FAQs/CTAs) × 8 pages × 6 viewports + specialty tests (sticky header, farm links, h-100vh, tracking e2e, console).

## 1. Full results

| Page | 320 | 360 | 375 | 390 | 414 | 768 | 1024 | 1280 | 1440 | 1920 |
|---|---|---|---|---|---|---|---|---|---|---|
| home | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) | ✅ (0) |

**Legend:** ✅ = collected, no nav error, no bad response, no overflow. (The full 10-column matrix: 0 overflow across 68 combos, 0 navErr, 0 badresp — see JSON.)

## 2. Headers / content presence (68 combos)

- No `ERR_CONNECTION_REFUSED`, no `NS_ERROR`; all pages reachable from 320 to 1920.
- **0 combos with horizontal overflow** — the `overflow-x` fixes from the pre-audit regression sweep hold.
- Title non-empty and meaningfully unique per page (from `Layout.astro` head+title logic); `h1` present per page (servicios/precios/slug/contacto/terminos/privacidad = 1 h1; home h1 present).
- Mobile nav renders at 320-414 (`Abrir menú` button); desktop nav (Inicio/Servicios/Contacto) at ≥ 768.
- **Documented data-layer field-cases below (TrackingPortal + terminal) verified in §7.**

## 3. Overflow sweep (core: 0 issues)

- `home` to `privacidad`, 320→1920px: `scrollWidth ≤ clientWidth` everywhere. (JSON keys `overflow:true` count = 0.)
- Sticky header stays visible and pinned (offsetTop=0) while body scrolls (`sticky fail` count = 0) on mobile+desktop; scrolled state compresses logo (`h-11`) — see DESIGN §7.

## 4. Small targets (live-checked) — mobile

- All main nav links and the hamburger render at **24 px** height (min recommended by WCAG: 44×44):
  - `Inicio`, `Servicios`, `Contacto`, `Abrir menú`, `Rastrear Paquete`, `Preguntas Frecuentes` at `24px` — flagged across every mobile viewport (evidence in JSON `smallTargets`).
  - The "home row" (014) hamburger is also 24px — same issue.
- (Design/ARIA review + code evidence for hover-only Services dropdown: `Header.tsx:59-88`, `aria-expanded` handling needs a pass at themes.)

## 5. Console (per viewport, 0 console-issues on non-home; 1 error on home — every viewport)

- **Every home viewport logs 1 console error:** `Error: <path> attribute d: Expected arc flag ('0' or '1')` — malformed SVG in `src/content/services.ts:28` (partial arc `a2 0 0 0-2 0l-7 4`; radius `2 2` dropped). Browser skips the broken arc; the **Consolidación** icon renders degraded. → HC-303.

## 6. Tracking e2e (live, against worker prod)

- `track()` (TrackingPortal.tsx) fires exactly **1 request** to `https://hit-ever-scraper.nativerse.workers.dev/track/910500` (valid guia) — no double-submit, no analytics traffic pollution.
- 404 path (mock) → error state with `dataLayer` push `track_search` + `tr:error`; valid path produces `tr` outcome + `ts` timestamp (lib/tracking.ts).
- Non-existent guia → clear "no tracking found" state (verifies worker 404-compliant envelope).

## 7. Prod smoke (dist via preview server)

- `wrangler pages dev dist` (compatibility-date 2026-04-28): builds + serves; all routes 200 (SPA fallback OK); CSP header file present (`public/_headers` entries: `/`, `/assets/**`, wildcard) — flagged: no `x-frame-options` in `_headers`, pending Pages-level headers.
- Site rewrites (`_redirects`/worker routing) not in scope of this run (deployed pages handle it).

## 8. Known limitations of this run

- Evidence screenshots are light-theme only (68 combos; dark-mode screenshots were not rerun — previous audit set has them; CSS reports both).
- No user-flow/session video (pure navigational evals + junction).
- Worker rate-limits are per-IP: a burst run could trigger 429s on `/track` — kept to 1 request per submission; worker is rate-limited via Upstash (fails open with console warn).

## 9. Actions (feed PROJECT_PLAN HC-3xx)

- HC-303: fix malformed SVG (services.ts:28) — **P0**, console-error noise on the most-viewed page.
- HC-310: small-target sweep (nav 44px million) + aria-expanded/keyboard pass on Services dropdown.
- HC-311: re-run screenshots after HC-303/HC-310 to close B1.