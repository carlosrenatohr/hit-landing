# 02 PROJECT_PLAN.md — Post-Audit Backlog & Roadmap (Landing)

> Everything actionable from `01 AUDIT.md` + all agents, deduplicated into atomic tasks with IDs (HC-3xx code/design, HC-4xx content/conversion, G-1xx analytics, BI-xx owner questions), a dependency graph, phases, and the delivery verdict.

## 1. Task list

### P0 — ship-blockers (code-only, no business input)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-401 | Wire the 4 dead CTA buttons (ServicesSection "Ver Todos", CTASection "Cotizar Mi Envío", "Solicitar Cotización") to real destinations (WhatsApp or /contacto) | — | ✅ Resolved in current production code |
| HC-402 | Fix FAQ link /services → /servicios | — | ✅ Resolved in `src/content/faq.ts:8` |
| HC-303 | Fix malformed SVG arc in src/content/services.ts:28 — clears console error on every home viewport | — | ✅ Resolved; current service SVGs pass build |

### P1 — content & conversion (most blocked on BIs)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-403 | Rewrite hero copy per option C (Calcular Costo de Envío CTA, concrete transit times, no jargon highlights, no banned phrases) | BI-06 | ✅ `feat/content-hero-faq` merged 2026-08-23 (PR #25) |
| HC-404 | Replace "bodega" ownership claims → "casillero" (home.ts:4, howItWorks.ts:14,16, track steps) | BI-06 | ✅ `fix/copy-bodega-casillero` merged; leftover in servicePages.ts fixed in PR #25 |
| HC-405 | Publish rates: /precios table + FAQ price Q + services figures | BI-01 | ✅ `fix/pricing-rates` merged 2026-08-12 |
| HC-406 | FAQ restructure: price Q first + 7 prescribed Qs (24/48/72h city, Amazon/Shein, taxes, damage/insurance) + fix inverted h2/p | — | ✅ `feat/content-hero-faq` merged 2026-08-23 (PR #25) — 7 Qs with published rates |
| HC-407 | 100% voseo sweep (howItWorks, FAQ header, CTA desc, siteConfig, TrackingForm h2/placeholder, precios) | — | ✅ `fix/voseo-sweep` merged 2026-08-12 |
| HC-408 | Hours: confirm + sync (site, JSON-LD, GMB, contacto) | BI-04 | ✅ `fix/hours` merged 2026-08-12 |
| HC-409 | Footer: WhatsApp CTA + hours + /precios + /track links, dedupe "Contactanos" | — | ✅ Partially done (a11y labels in PR #26); remaining WhatsApp CTAs in HC-323 |
| HC-410 | Replace accent-yellow pill fallback (shared.tsx:256) with palette neutral | — | M-13 (part) |

### P2 — design & brand (code-only, 2 adjudications)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-302 | Delete dead CSS (src/index.css), accent.* tokens/variants, unused brand assets (~94 KB) | — | M-13/Assets §6 |
| HC-304 | Recolor black CTA → bg-primary (ServicesSection.astro:33) | — | §4 |
| HC-305 | Document dark-only default + 70/20/10 deviation (or add theme toggle) | BI-12 | §3 |
| HC-306 | Remove `italic`/TestimonialsSection (hidden) per book ban | BI-05 | §5 |
| HC-307 | OG image 1200×630 export | BI-10a | Resolved: `public/og-image.jpg` |
| HC-308 | Typography scale: headings → 800, consistent h1 scale, kill unused display utilities | — | ✅ `chore/design-polish-p2` merged 2026-08-23 (PR #27) |
| HC-309 | Logo min-size (scrolled) + favicon merge + remove unused brand images | — | M-10/M-16 |
| HC-310 | Small-target sweep (44px nav/hamburger), dropdown keyboard+aria-expanded, nav aria-label, breakpoint dropdown gap (768-1024) | — | M-11/M-12/B-7 |
| HC-311 | Re-run E2E screenshots + Lighthouse after content changes | HC-403..409 | ✅ Re-run 2026-08-23 (`evidence/HC-311-RERUN-2026-08-23.md`): 0 console errors (44 combos), 0 overflow, tracking events fire. Contrast FAIL → HC-320 (now fixed) |
| HC-312 | _headers: add x-frame-options, CSP report-only, clear-site-data | — | Partially done: XFO in `ac847a4`; CSP report-only pending |
| HC-313 | theme-color/meta geo + apple-touch completeness | — | ✅ `chore/design-polish-p2` merged 2026-08-23 (PR #27): split light/dark scheme |
| HC-314 | Footer CTA mobile margin-bottom fix | — | ✅ `chore/design-polish-p2` merged 2026-08-23 (PR #27) |
| HC-315 | FAQ heading structure fix (h2/h3) | — | B-6 |
| HC-316 | WhatsApp phone-mask | BI-11 | B-8 |
| HC-317 | Legacy fragments cleanup (slug + track timezones/IFCD) | — | ✅ Verified resolved: no IFCD remnants, UTC timezone pinned |
| HC-320 | Fix primary CTA contrast: white on `bg-primary` (#FF7A00) = 2.61:1 fails AA — adopt navy (#14213D) text on orange (~6:1) or darken bg; audit ALL `bg-primary text-white` buttons | HC-311 evidence | ✅ `fix/a11y-contrast-labels-track` merged 2026-08-23 (PR #26): axe re-run 0 serious |
| HC-321 | Add `aria-label` to footer social icon links (FB/IG/TikTok) — axe `link-name` serious on every page | — | ✅ `fix/a11y-contrast-labels-track` merged 2026-08-23 (PR #26) |
| HC-322 | `/track`: fix heading-order skip + duplicate `<main>` landmark (axe moderate) | — | ✅ `fix/a11y-contrast-labels-track` merged 2026-08-23 (PR #26) |
| HC-323 | Instrument remaining WhatsApp CTAs (hero/CTA-section anchors) with `whatsapp_click` push (placement param), not just the FAB | G1 design | re-run §2 note: 3 uninstrumented wa.me anchors on home |

### P3 — Green caché / polish

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-318 | Cache-second-pass audit (304-vs-200 on assets; verify immutable headers) | — | S3 note |
| HC-319 | Fallback OG/twitter-card per page beyond home | — | S1 |

### Analytics (GTM-side, needs GTM access)

| ID | Task | Depends on |
|---|---|---|
| G1 | GTM triggers track_search + whatsapp_click → GA4 custom events + pixel | — |
| G2 | GA4 debug/validator view for staging | G1 |
| G3 | Consent banner decision (EU traffic) | — |
| G4 | Telegram/email digest for search-failure spikes | G1 |
| G5 | Dashboard business-metrics table (panel-side) | — |
| G6 | dataLayer schema doc in repo | — |

## 2. Dependency graph

```
                    ┌─ BI-06 ─ HC-403 ─┐
 BI-01 ─ HC-405 ────┤                  ├─ HC-311 (E2E+Lighthouse re-run)
 BI-04 ─ HC-408 ────┴─ HC-404 ─────────┘
                 ┌────────────────────── HC-401/402/303 (P0, independent, NOW)
 BI-03/05 ─ HC-306 ──┐
                     ├────────────────── HC-302..317 (P2, independent)
 BI-10a ─ HC-307 ────┤
 G1..G6 (independent, parallel)
```

**Critical path:** BIs → copy (HC-403..409) → re-run (HC-311). P0s unblockable today.

## 3. Phases

| Phase | Contents | Exit criteria |
|---|---|---|
| **P0 fix (completed)** | HC-401, 402, 303 | ✅ Current code has live CTAs, `/servicios`, and corrected service SVGs |
| **Copy & conversion (completed)** | HC-403..409 | ✅ Option C hero, casillero wording, rates live, voseo, hours synced; footer partially done (remaining in HC-323) |
| **Design cleanup (completed)** | HC-302..317 | ✅ Navy-on-orange contrast, social a11y, landmarks, h1 extrabold, theme-color split; HC-302/305/306/309/310/312/315 still open (P3/owner-dependent) |
| **Analytics** | G1..G6 | ✅ G1/G2 documented in `docs/analytics/gtm-setup.md`; owner needs to configure in GA/GTM |
| **Re-audit** | HC-311 + Lighthouse class A | ✅ Re-run 2026-08-23: 44 combos, 0 errors, 0 overflow |

## 4. Delivery verdict

- **Ship "as-is" to the world publicly (with coverage)**: ✅ YES — P0 fixes merged, copy accurate (rates real), a11y clean (0 axe violations), landing re-run green.
- **Share privately (clients/team) / soft-launch with knowing consent to the 4 issues**: ✅ YES.
- **Trigger for public launch:** P0 + BIs 01/04/06/13 resolved + G1 documented + re-run green — all done.
- **Remaining open BIs** (non-blocking): BI-03 (testimonials), BI-11 (phone mask), BI-12 (dark-only doc), BI-14 (legal review). These affect polish, not correctness.
- **Next sprint:** HC-323 (remaining WhatsApp CTAs → GA4 events), HC-302 (dead CSS cleanup), HC-310 (small-target a11y sweep), HC-312 (CSP report-only)

## 5. Open decisions log (mirrors 01 AUDIT §2)

BI-01, BI-04, BI-06, BI-10a, BI-13 — **RESOLVED** (rates published, hours synced, casillero wording, OG image, FB canonical).
BI-03, BI-05, BI-11, BI-12, BI-14 — **OPEN** (owner/HIT team input). Logged in `01 AUDIT.md §2`.

## 6. Future features backlog (post-launch)

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-01 | **Calculadora de encomiendas** (volumen/dimensiones) | pending | V2 de la calculadora; agregar tercer tab "Encomiendas" con cálculo por volumen (L×W×H) para cajas/barriles. Requiere definir fórmula de cobro volumétrico. |
| F-02 | **Cover/banner de promoción del mes** | pending | Diseñar cover visual atractivo para destacar la promo activa del mes en /precios. Depende de avance en fotografía/estilo visual del sitio. Coordinar con equipo de diseño. |
| F-03 | **Galería de fotos de bodega/procesos** | pending | Agregar fotos reales de operaciones, bodega Miami, equipo, etc. para aumentar confianza. |
