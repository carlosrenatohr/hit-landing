# 01 AUDIT.md — SITE AUDIT 2026-08 (Landing v1.2)

> **Hub document.** Detail lives in: `02 PROJECT_PLAN.md` (backlog + roadmap), `03 E2E_AUDIT.md` (browser/QA), `04 ANALYTICS_AUDIT.md`, `05 DESIGN_AUDIT.md`, `06 CONTENT_AUDIT.md`, `07 ASSETS_AUDIT.md`. QA runs + evidence: `evidence/`.
>
> **One-line verdict: The landing site is in strong technical shape (SEO/APIs/perf/security green) but ships with 4 dead CTAs, a broken FAQ→services link, a malformed SVG throwing console errors on the home page, off-book brand colors, and 0 analytics consumption of the two conversion events it emits. Fix those, then the copy/design deltas, and it converts.**

## 0. What was audited

| # | Area | Verdict |
|---|---|---|
| S1 | SEO & Structured Data | ✅ **Pass** |
| S2 | APIs & Microservices | ✅ **Pass** (envelope, PII, errors, rate limiting) |
| S3 | Performance & Web Vitals | ✅ **Pass** with 1 P2 note |
| S4 | Security & Privacy | ✅ **Pass** |
| S5 | Accessibility (a11y) | ⚠️ **Fail** (ARIA + mobile targets) |
| S6 | Full-Stack E2E | ✅ **Pass** (0 overflows, 0 nav errors, tracking healthy) |
| S7 | Design / Brand | ⚠️ **Partial** (2 off-book colors, dark-mode ratio, font scale) |
| S8 | Content / Copy | ❌ **Fail** (4 dead CTAs + copy non-compliance; blocked by business inputs) |
| S9 | Assets | ✅ **Pass** with hygiene (94 KB unused) |
| S10 | Analytics | ⚠️ **Partial** (events fire, nothing consumes them) |
| S11 | Architecture / Infra | ✅ **Pass** (worker/Site/InsForge boundaries respected) |
| S12 | Worker (cross) | ✅ **Pass** (no regressions from site side) |

## 1. All findings by severity (complete list)

### Alta (7)

| ID | Finding | Evidence | Fix (task) |
|---|---|---|---|
| A-01 | 4 CTA buttons do nothing on click on prod build | ServicesSection.astro:33-35, CTASection.astro:18-23 | HC-401 (P0) |
| A-02 | FAQ "Ver todos los servicios" → `/services` = 404 (route is `/servicios`) | faq.ts:8 → FAQSection.tsx:75 | HC-402 (P0) |
| A-03 | Malformed SVG arc throws console error on every home viewport | src/content/services.ts:28 (`a2 0 0 0-2 0l-7 4`) | HC-303 (P0) |
| A-04 | Home page console → SVG error + 12/68 combos with issues (single root cause: A-03) | E2E §5 | HC-303 |
| A-05 | Hero copy non-compliant with prescribed option C: banned phrase "Tu Aliado Logístico", CTAs "Consultar Servicios"/"Cotizar Ahora" (should be "Calcular Costo de Envío"), no concrete transit times, jargon highlights | home.ts:2-16 | HC-403 (needs BI-06) |
| A-06 | "Bodega estratégica en Miami" ownership claim vs reality (reseller casillero) | home.ts:4, howItWorks.ts:14,16 | HC-404 (BI-06) |
| A-07 | Analytics gap: GA4 custom events `track_search`/`whatsapp_click` emitted but **no GTM tags mapped** → conversion events go to void | lib/tracking.ts, WhatsappFab.tsx (live dataLayer verified) | G1, G2, G6 |

### Media (14)

| ID | Finding | Evidence | Fix |
|---|---|---|---|
| M-1 | FAQ non-compliant: no price question (prescribed FIRST question), missing 4 of 7 Qs (24/48/72h city, Amazon, taxes, insurance) | faq.ts:11-37 | HC-406 |
| M-2 | Services cards all-jargon, no concrete figures | services.ts | HC-405 (needs BI-01) |
| M-3 | HowItWorks 100% tuteo vs voseo guide (C10) | howItWorks.ts | HC-407 |
| M-4 | Hours conflict — site Mon–Fri 8-5 vs prescription/GMB Sat 8-1 | contacto.astro:30, JSONLD.astro:30-41 | HC-408 (BI-04) |
| M-5 | Testimonials = 3 generic quotes + stock webp, section `hidden`; do NOT unhide | TestimonialsSection.astro | dec.4/G7 (BI-03/BI-05) |
| M-6 | OG image is 1.4:1 (1000×700) not 1.91:1 → hidden on some cards | — | HC-307 (BI-10a) |
| M-7 | No privilege escalation from missing consent setup (compliance risk for EU traffic via GA4) | 04 ANALYTICS §3 | G3 |
| M-8 | `font-bold` everywhere (60×) vs spec 900/800 display; unused display utilities built but never used | global.css, components | HC-308 |
| M-9 | h1 scale inconsistent across pages (text-6xl home vs 4xl pages) | Hero:20, contacto:50, terminos:16 | HC-308 |
| M-10 | Scrolled-header logo 43px < 120px book minimum | Header.tsx:39,46 | HC-309 |
| M-11 | Naval dropdown hover-only + unkeyed aria-expanded on related header items | Header.tsx:59-88 | HC-310 |
| M-12 | Breakpoint gap: 768 no dropdown but 320-414 hamburger → 1024 no dropdown (only 1440-1920) | Header.tsx, Footer.astro | HC-310 |
| M-13 | Dead code: src/index.css unimported + accent-blue unused; accent-yellow pill fallback | config, shared.tsx:256 | HC-302 |
| M-14 | 0 GA4 custom event consumption + no validator (see A-07) | — | G1 |
| M-15 | NAP/sameAs/geo mismatches (FB URL, street, geo circle 10 km from map pin) | JSONLD.astro:19,43; site.ts:9,14; contacto.astro:10 | BI-10/BI-13 |
| M-16 | No `mask-icon`/`apple-touch-icon` completeness for Safari pinned tabs; unused index.css | public/ | HC-309 |

### Baja (9)

| ID | Finding | Fix |
|---|---|---|
| B-1 | CSP regression risk: `style-src` includes `unsafe-inline` in prod Pages `_headers` + assets (`style-src unsafe-inline 'self' data: blob:`…) — with hash-driven meta present; linear | HC-312 |
| B-2 | `x-frame-options` & `content-security-policy-report-only` not set in Pages `_headers` | HC-312 |
| B-3 | Header `clear-site-data` (all) missing | HC-312 |
| B-4 | No language centering/meta `geo` tags (duplicated). Missing `theme-color`/apple-touch (siteScheme) vs book | HC-313 |
| B-5 | Footer CTA margin-bottom collapse on mobile-only (visual, `mb-10` claim) | HC-314 |
| B-6 | FAQ h2/h3 inverted (subtitle as h2, title as p) | HC-315 |
| B-7 | `nav` has no aria-label; hamburger+href for mobile nav unclear semantics | HC-310 |
| B-8 | No WhatsApp phone-mask; uses direct number | HC-316 (BI-11) |
| B-9 | Local dev timezones / legacy IFCD text remnants (slug + track) | HC-317 |

## 2. Business inputs required to unblock (the REAL decision points)

| BI | Question | Owner | Blocks |
|---|---|---|---|
| BI-01 | **Rates** — air $/lb + sea $/lb. Docs have 3 conflicting cards ($4.50/$2.50 · $6.25/$2.90 · $5.50). Nothing publishes a number until confirmed. | HIT | M-2, HC-405 |
| BI-03 | Real client testimonials + consent? (current: generic + stock) | HIT | M-5 |
| BI-04 | Confirm hours (Sat 8-1 conflict) | HIT | M-4, HC-408 |
| BI-05 | Testimonial section: remove/replace vs keep hidden | HIT | M-5, dec.4 |
| BI-06 | "Casillero / Tu dirección en Miami" wording sign-off (replaces all "bodega" claims) | HIT | A-06, A-05 |
| BI-10 | **OG 1200×630 export + geo accuracy** (BI-10a: OG format) | HIT | M-6 | 
| BI-11 | WhatsApp phone-mask (585… vs raw) | HIT | B-8 |
| BI-13 | Facebook canonical URL (config vs JSON-LD) | HIT | M-15 |
| BI-14 | Legal review sign-off (terminos/privacidad) | HIT | legal pages |

**Decisions made (no owner needed):** 12-Jun "Black for walls" (dark), 23-Jun "BR CB" keywords, 4-Jul "HIT orange". → Reconcile with BI-06, then mark the site "acceptable for share" gated on A-01/A-02/A-03.

## 3. Headline SaaS/Business (SaaS-facing)

Landing = fully static Shopify-like bundling; no app backend. Conversions = WhatsApp/CTA clicks (`whatsapp_click` event, GA4). Small SAAS/VA opportunities: telemeter the WhatsApp FAB (click → GA4 → G4 digest).

## 4. Hard evidence appendix

- **Perf:** TTFB 9–15 ms (worker/prod edge); LCP (main) 1.2 s via Lighthouse CD; class ratings: A/B/A home-section, A/C/A precios, A/A/A faq; site bundle JS gzip ≈ 28 KB; CSS gzip ≈ 13.5 KB (metadata).
- **Bundle deltas:** per-sitio 282 KB / per-worker 52 KB over 14 batches (baseline matching). No site bundle regression.
- **Browser:** 68 combos evidence (screenshots + console). 0 overflow, 0 navErr, 0 badresp; 1 console error × 12 combos (all home, A-03 root cause); small targets 24 px (6 labels) × all mobile viewports; sticky header 0 fails.
- **Repo:** `pnpm check` = vitest + astro build green at audit time on latest commit.

## 5. What is GOOD (keep as-is)

- SEO/SSG integrations (meta engine, JSON-LD, opengraph, ILS-ready, sitemap, canonical, hreflang dual-es) — top-tier.
- API envelope + `toPublicShipment()` PII-allowlist + 404 + rate-limit — spec-exact.
- Security stack (GTM-hash-pinned, CSP header+meta dual, dark-mode head init, headers hooks) — clean; no inline styles.
- Performance: sub-1.5s FCP; aggressive cache headers; asset discipline (only 3 class-1 images, web-p optimized).
- Dark-mode default UX (no flash) + light-scheme variants; logo theming correct.
- Tracking integration (single-request, worker prod, error/empty states clear).
- Worker/prod boundary: site never touches InsForge directly; scraper stays in worker. Clean contract.

## 6. Escalation & next steps

1. **Re-run E2E §9 + Lighthouse** (HC-311) against the current 15-page build; the historical evidence predates the new service routes.
2. **G1 (GTM mapping)** — needs a GTM edit (user with GTM access), not code; events already emit from the site.
3. **Ask the remaining BIs** — rates, hours, testimonials, phone masking, and local SEO coordinates still affect conversion/trust.
4. **Resolve remaining code-only SEO/accessibility items** — OG is now 1200×630, JSON-LD points to real assets, and header/FAQ semantics are updated.
5. Full backlog + dependency graph + roadmap: see `02 PROJECT_PLAN.md`.
