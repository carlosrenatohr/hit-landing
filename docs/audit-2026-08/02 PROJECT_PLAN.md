# 02 PROJECT_PLAN.md — Post-Audit Backlog & Roadmap (Landing)

> Everything actionable from `01 AUDIT.md` + all agents, deduplicated into atomic tasks with IDs (HC-3xx code/design, HC-4xx content/conversion, G-1xx analytics, BI-xx owner questions), a dependency graph, phases, and the delivery verdict.

## 1. Task list

### P0 — ship-blockers (code-only, no business input)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-401 | Wire the 4 dead CTA buttons (ServicesSection "Ver Todos", CTASection "Cotizar Mi Envío", "Solicitar Cotización") to real destinations (WhatsApp or /contacto) | — | A-01 |
| HC-402 | Fix FAQ link /services → /servicios | — | A-02 |
| HC-303 | Fix malformed SVG arc in src/content/services.ts:28 (`a2 0 0 0-2 0l-7 4` → `a2 2 0 0 0-2 0l-7 4`) — clears console error on every home viewport | — | A-03/A-04 |

### P1 — content & conversion (most blocked on BIs)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-403 | Rewrite hero copy per option C (Calcular Costo de Envío CTA, concrete transit times, no jargon highlights, no banned phrases) | BI-06 | A-05 |
| HC-404 | Replace "bodega" ownership claims → "casillero" (home.ts:4, howItWorks.ts:14,16, track steps) | BI-06 | A-06 |
| HC-405 | Publish rates: /precios table + FAQ price Q + services figures | BI-01 | M-1/M-2 |
| HC-406 | FAQ restructure: price Q first + 7 prescribed Qs (24/48/72h city, Amazon/Shein, taxes, damage/insurance) + fix inverted h2/p | — | M-1/B-6 (part) |
| HC-407 | 100% voseo sweep (howItWorks, FAQ header, CTA desc, siteConfig, TrackingForm h2/placeholder, precios) | — | M-3 |
| HC-408 | Hours: confirm + sync (site, JSON-LD, GMB, contacto) | BI-04 | M-4 |
| HC-409 | Footer: WhatsApp CTA + hours + /precios + /track links, dedupe "Contactanos" | — | C-10 |
| HC-410 | Replace accent-yellow pill fallback (shared.tsx:256) with palette neutral | — | M-13 (part) |

### P2 — design & brand (code-only, 2 adjudications)

| ID | Task | Depends on | Evidence |
|---|---|---|---|
| HC-302 | Delete dead CSS (src/index.css), accent.* tokens/variants, unused brand assets (~94 KB) | — | M-13/Assets §6 |
| HC-304 | Recolor black CTA → bg-primary (ServicesSection.astro:33) | — | §4 |
| HC-305 | Document dark-only default + 70/20/10 deviation (or add theme toggle) | BI-12 | §3 |
| HC-306 | Remove `italic`/TestimonialsSection (hidden) per book ban | BI-05 | §5 |
| HC-307 | OG image 1200×630 export | BI-10a | M-6 |
| HC-308 | Typography scale: headings → 800, consistent h1 scale, kill unused display utilities | — | M-8/M-9 |
| HC-309 | Logo min-size (scrolled) + favicon merge + remove unused brand images | — | M-10/M-16 |
| HC-310 | Small-target sweep (44px nav/hamburger), dropdown keyboard+aria-expanded, nav aria-label, breakpoint dropdown gap (768-1024) | — | M-11/M-12/B-7 |
| HC-311 | Re-run E2E screenshots + Lighthouse after content changes | HC-403..409 | E2E §9 |
| HC-312 | _headers: add x-frame-options, CSP report-only, clear-site-data | — | B-1/B-2/B-3 |
| HC-313 | theme-color/meta geo + apple-touch completeness | — | B-4 |
| HC-314 | Footer CTA mobile margin-bottom fix | — | B-5 |
| HC-315 | FAQ heading structure fix (h2/h3) | — | B-6 |
| HC-316 | WhatsApp phone-mask | BI-11 | B-8 |
| HC-317 | Legacy fragments cleanup (slug + track timezones/IFCD) | — | B-9 |

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
| **P0 fix (this sprint)** | HC-401, 402, 303 | No dead CTAs; FAQ link works; console clean — re-verified B-05 |
| **Copy & conversion** | HC-403..409 | Option C hero, casillero wording, rates live, voseo, hours synced, footer complete (needs BIs) |
| **Design cleanup** | HC-302..317 | Book tokens only, dark decision documented, no dead assets, a11y targets |
| **Analytics** | G1..G6 | Events visible in GA4 + documented + validator |
| **Re-audit** | HC-311 + Lighthouse class A | Fresh evidence bundle appended to this folder |

## 4. Delivery verdict

- **Ship "as-is" to the world publicly (with coverage)**: NO — blockers A-01, A-02, A-03 (code-only; fix in days, no business input).
- **Share privately (clients/team) / soft-launch with knowing consent to the 4 issues**: YES — after BI-01 (rates) + BI-06 (casillero wording), the copy is accurate enough to not mislead; analytics gap does not block private share.
- **Trigger for public launch:** P0 fixes + BIs 01/06 + G1 (events measurable) + re-run E2E/Lighthouse green.
- **Estimated:** P0 = 1 session (few hours). Copy sprint = 1-2 sessions post-BIs. P2 pass = 1-2 sessions. Total ≤ 1 week part-time to "public-launch ready".

## 5. Open decisions log (mirrors 01 AUDIT §2)

BI-01, BI-03, BI-04, BI-05, BI-06, BI-10a, BI-11, BI-12 (dark-only), BI-13, BI-14 — status: all OPEN, waiting on HIT/owner. Logged in `01 AUDIT.md §2`.

## 6. Future features backlog (post-launch)

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-01 | **Calculadora de encomiendas** (volumen/dimensiones) | pending | V2 de la calculadora; agregar tercer tab "Encomiendas" con cálculo por volumen (L×W×H) para cajas/barriles. Requiere definir fórmula de cobro volumétrico. |
| F-02 | **Cover/banner de promoción del mes** | pending | Diseñar cover visual atractivo para destacar la promo activa del mes en /precios. Depende de avance en fotografía/estilo visual del sitio. Coordinar con equipo de diseño. |
| F-03 | **Galería de fotos de bodega/procesos** | pending | Agregar fotos reales de operaciones, bodega Miami, equipo, etc. para aumentar confianza. |