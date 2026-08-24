# HIT CARGO Landing — Production-Readiness Audit: Execution Plan

- **Purpose:** Ultra-detailed, executable plan that turns `260809_PROD_LAUNCH_AUDIT.md` (the 49-section source spec) into a traced audit workflow + implementation backlog for the public landing site.
- **Scope:** 100% the landing repo `hit-cargo-web-v-1.2` (Astro 6 + Preact 10 + Tailwind 3.4, Cloudflare Pages). The Worker and Panel are touched only as read-only dependencies (tracking API contract, env vars).
- **Status:** `APPROVED by owner 2026-08-11`. Execution starts at Phase A (§2). This file itself remains deliberately **untracked** until the owner decides its git fate.
- **Language:** English (owner decision) — this plan is consumed by humans and by the next workhorse coding agents. User-facing site copy stays Spanish (Nicaraguan voseo, per brand/copy docs).
- **Baseline evidence cut:** 2026-08-10.
- **Owner:** Renato / HIT Cargo team.

---

## 0. How to use this document

1. **Owner review:** read §1 (baseline), §12 (models), §9 (things only you can answer). Adjust anything.
2. **Approval gate:** when the owner says OK, agents execute audit phases A→G (§2). One orchestrator agent; subagents only for the parallel tracks marked in §2.
3. **Evidence discipline:** every finding lands in `docs/audit-2026-08/` (§4) with `file:line`, URL, screenshot, or console/network output. No prose-only conclusions (source spec §46).
4. **Deliverables review:** the 8 output documents (§4) are presented to the owner.
5. **Implementation phase:** the HC-XXX backlog (§5) becomes the execution project plan. Each HC task is a branch → `pnpm check` → PR → review → merge cycle, per AGENTS.md.
6. **Contract:** source spec §45 — AUDIT FIRST, PLAN SECOND, EXECUTE ONLY WHEN APPROPRIATE. Zero destructive changes during the audit; P0-blocker minimal fixes only, PRs + documented.

---

## 1. Verified baseline (evidence cut 2026-08-10)

> All claims below were verified by direct inspection on 2026-08-10. Contradictions between docs are flagged in §1.12 and must NOT be resolved by guessing (source spec §38).

### 1.1 Repo & stack

| Item | Fact | Evidence |
|---|---|---|
| Branch | `master` @ `58e015a` | `git log --oneline -5` |
| Stack | Astro 6.1, Preact 10, Tailwind 3.4, Vite 8, Vitest 4, Cloudflare Pages (SSG) | `package.json` |
| Site URL | `https://hit-cargo.com` | `astro.config.mjs:8` |
| Package manager | pnpm@10.32.1, Node 22 | `package.json:6`, `.nvmrc` |
| Gate | `pnpm check` = `vitest run && astro build` (no typecheck, no lint, no astro check) | `package.json:14` |
| CI | GitHub Actions, runs `pnpm check` on PRs | `.github/workflows/ci.yml` |

### 1.2 Pages & routes (8)

`/` (index), `/contacto`, `/precios`, `/servicios`, `/servicios/[slug]`, `/track`, `/terminos`, `/privacidad` — all present in `dist/` build output with `sitemap-0.xml` + `sitemap-index.xml`.

### 1.3 Components & hydration

- Layouts: `src/layouts/Layout.astro` (head, GTM, dark-mode init, JSON-LD slot).
- Preact islands (`client:*`): `Header.tsx`, `TrackingForm.tsx`, `FAQSection.tsx`, `WhatsappFab.tsx`, `TrackingPortal.tsx` (+ `shared.tsx`), `components/preact/tracking/`.
- Astro sections: `HeroSection`, `ServicesSection`, `HowItWorksSection`, `TestimonialsSection`, `CTASection`, `Footer`.
- UI primitives: `ui/Button.astro`, `ui/Link.astro`; SEO: `seo/JSONLD.astro`.
- Known leftover: React SPA remnants per prior audits (`src/App.tsx`, `src/main.tsx`, `HomePage.tsx` — verify existence) — backlog P1 pending.

### 1.4 Content layer

Centralized content in `src/content/*.ts` (`copy`, `home`, `services`, `servicePages`, `faq`, `testimonials`, `cta`, `howItWorks`, `meta`, `footer`) + `src/config/site.ts` + `src/config/seo.ts`. Testimonials: 3 entries with imported webp portraits (`src/content/testimonials.ts:1-3`).

### 1.5 Analytics / tracking

| What | State | Evidence |
|---|---|---|
| GTM container | `GTM-K55VC9JZ`, hash-pinned, in `<head>`; noscript iframe present | `src/layouts/Layout.astro:36,79`; hash in `astro.config.mjs:16` |
| `whatsapp_click` event | Pushed to dataLayer from floating widget | `src/components/preact/WhatsappFab.tsx:12-14` |
| `track_search` event | Pushed on every tracking outcome (included params: outcome, guia length) | `src/components/preact/tracking/shared.tsx:80-84` |
| GTM consumption | **NONE** — no triggers/tags wired; events go to the void | backlog P2 + SPEC-P4-03 |
| Meta Pixel / GA4 / Clarity direct code | **ABSENT** — not in repo | grep (no `fbq`, no gtag config) |
| GA4 ID, Meta Pixel ID, UTM conventions | Not documented anywhere | docs sweep |
| Validator | `src/utils/tracking.ts` + `tracking.test.ts` (the ONLY test file) | `find src -name "*.test.*"` |

### 1.6 SEO

- `robots.txt` OK with sitemap ref; `@astrojs/sitemap` active; OG image `public/og-image.png` (640×640 per image-plan).
- `JSONLD.astro`: Organization + sameAs (facebook) — verify LocalBusiness/FAQPage presence; copy-seo-audit v3.0 prescribes LocalBusiness (+offer catalog), FAQPage schema, `og:locale es_NI`, Twitter cards.
- Prior audit: homepage title was "Inicio | HIT CARGO" (CRÍTICA per copy-seo-audit) — verify current state.

### 1.7 Security / headers

- `public/_headers`: HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, CSP header (permissive inline, restrictive domains) + Astro meta CSP with SHA-256 hashes (GTM + CF insights). Cache headers aggressive for hashed assets; `index.html` no-cache.
- July 2026 security audit: no critical/high open; remaining: ~22 dependency advisories (`pnpm audit`), HSTS preload decision, React SPA leftovers deletion, keyboard a11y for Services dropdown, modal focus trap. Cloudflare hardening menu (WAF, Bot Fight Mode, edge rate limit, Turnstile, TLS Full strict) NOT enabled.

### 1.8 Harness gaps (block production-readiness claims)

Branch protection on `master` (none), typecheck/lint not in gate, pre-commit hooks (`lefthook.yaml` exists — check what it runs), no automated post-deploy smoke, only 1 unit test file, **no Playwright/E2E at all**, GTM consumption absent.

### 1.9 Images (current)

- `src/assets/images/background.jpeg` — hero, ~2.9 MB 4118×2694 (image-plan), no responsive variants — **known LCP risk #1**.
- `src/assets/images/testimonial1-3.webp` — stock portraits, testimonials section hidden but possibly in DOM (verify; photo-direction mandates removal talk).
- `public/brand/*` — logo set (rebranded v2.5.0, ~370 KB saved).
- `public/og-image.png` — 640×640, generic; brand kit prescribes 1200×630 branded.
- No route-map SVG, no store-logo band, no real process photos (photo-direction shot list pending).

### 1.10 Production smoke (2026-08-10)

`curl -I https://hit-cargo.com/` → **HTTP 403, `cf-mitigated: challenge`** (bot challenge from this environment). Response headers seen belong to the Cloudflare challenge page, not the site — **prod headers/CSP cannot be confirmed from this network via curl**. Protocol: real-browser evidence via Playwright MCP (may still be challenged) + local preview `wrangler pages dev dist --compatibility-date=2026-04-28` (CSP-true) as the reliable evidence target. Flag: whether the challenge also hits real Nicaraguan users (customers on Meta Ads clicks) is worth a lighthouse/HTTPS check from a normal browser.

### 1.11 Known open items already documented (no re-discovery needed)

- SPEC-P4-05: home tracking double-request flicker (acceptance: 1 request per load in prod).
- P2: GTM triggers for `track_search` / `whatsapp_click` → GA4 + pixel.
- SPEC-P4-03: analytics end-to-end (data-layer schema doc `docs/analytics/data-layer.md`, no duplicate events; open: GA4 ID, Pixel ID, cookie consent).
- SPEC-P4-10: previous landing UX audit deliverables location (docs/audits/landing-kimi.md).
- SPEC-P4-01/02/04/14: promo banner, social footer links, Ada chatbot, skeleton loading — parked features, out of audit scope unless owner adds.

### 1.12 Doc-vs-doc contradictions the audit must adjudicate (20 found)

Top items (full list in the docs sweep; these are the ones that will hit the site):

| # | Contradiction | Docs involved | Audit action |
|---|---|---|---|
| C1 | "Bodega propia en Miami" vs **reseller** — must say "Casillero/Tu dirección en Miami" | copy-seo-audit vs image-plan decisions | Verify every "bodega" mention on site + docs; fix copy |
| C2 | Fake `aggregateRating 4.9/342` prescribed then banned (Google penalty risk) | copy-seo-audit vs image-plan/CHANGELOG | Verify JSON-LD has no rating, no fake testimonials in DOM |
| C3 | Company age: "1 año" (May-2026) vs "desde 2015 / 4,500 clientes" | MARKETING_LAUNCH_PLAN vs copy-seo-audit | BUSINESS INPUT REQUIRED — nothing on site without verified source |
| C4 | Rates: aéreo $6.25/lb vs $4.50/lb; marítimo $2.90/lb vs $2.50/lb | brand book vs copy-seo-audit vs launch plan | BUSINESS INPUT REQUIRED — confirm base rates before any site number |
| C5 | Red `#FF3B3F` still in launch-plan templates vs rebrand `#FF7A00` | MARKETING_LAUNCH_PLAN vs brand book | Social templates out of repo scope; note only |
| C6 | Saturday hours: JSON-LD/GMB say Sat 8–13; contact page trimmed Mon–Fri (v2.6.0) | copy-seo-audit vs CHANGELOG | BUSINESS INPUT REQUIRED — hours truth |
| C7 | Domain: `hitcargo.com` (brand book) vs `hit-cargo.com` (rest) | brand book vs all | Verify canonical, og:url, redirects |
| C8 | Hero image spec: ≤250 KB 1920×1280 (image-plan) vs ≤200 KB 1920×1080 AVIF/WebP (photo-direction) | image-plan vs photo-direction | Adopt strictest as bar |
| C9 | Performance bar: Lighthouse >90 / FCP <1.5s / LCP <2.5s (AGENTS/photo-direction) vs PageSpeed >80 (launch plan) | multiple | Adopt strictest (§11) |
| C10 | Voseo ("Rastreá") vs tuteo ("Elige") in docs | copy-seo-audit vs brand book | Voseo wins (NI market, preferred by copy spec) |
| C11 | Stack docs stale: React/Vite/FastAPI/Supabase in company-overview vs actual Astro/CF/InsForge | company-overview vs repo | Docs cleanup task (HC backlog) |
| C12 | OG: brand kit `og-image-1200x630.png` vs current `og-image.png` 640×640 | brand book vs image-plan | Prescribed: branded 1200×630 |

### 1.13 Environment facts for the audit

- Codebase Memory index for this repo is fresh (`master` @ `58e015a`, 1051 nodes) — use MCP tools first.
- Playwright browsers cached in the environment (chromium 1208/1234 + ffmpeg) — Playwright MCP works without installs.
- Repo autoskills installed: accessibility, astro, seo, frontend-design, tailwind-css-patterns, vitest, vite, typescript-advanced-types, nodejs patterns — plus environment skills (codebase-memory, graphify, web-perf, reviewer/security-reviewer via Dredd).
- `prettier` format script only covers `src/**/*.ts(x)`.

---

## 2. Audit execution model — Phases A–G

> Mapping rule: every section of the source spec (1–49) is assigned to exactly one phase below; the traceability matrix (§3) proves nothing is orphaned.

### Phase A — Discovery & business understanding (source §1, §2, §3, §5, §38, §46)
- **Objective:** confirm the system model with code-first evidence; produce the business brief the rest of the audit tests against.
- **Steps:**
  1. `get_architecture` (once), `search_graph` for component/pages inventory, `trace_path` on `track()` flow and dataLayer pushes.
  2. Re-read §1 evidence items that need confirmation (React leftovers existence, TestimonialsSection DOM state, homepage title state, JSON-LD current fields).
  3. Business brief from `docs/business/company-overview.md` — services, process (7 steps), differentiators, target personas.
- **Output:** `docs/audit-2026-08/AUDIT.md` §"Business Understanding" + §"Current Architecture" (first drafts).
- **Effort:** 1 session (~2–3 h). **Parallelizable:** with Phase C.

### Phase B — Technical audit (source §9–13, §27)
Split into 4 parallel sub-tracks (one explore agent each):

| Track | Source | Checks | Tooling |
|---|---|---|---|
| B1 Responsive | §9, §27 | 10 viewports × 6 core pages; overflow, cut-offs, nav/menu, CTA visibility, sticky elements; broken links, 404s, missing assets, console errors, failed requests, hydration errors | Playwright MCP (§7 protocol) |
| B2 Accessibility | §10, §27 | Semantic HTML, heading hierarchy, labels, keyboard nav, focus states, contrast, alt, landmarks, reduced motion, touch targets (44px), no gratuitous ARIA | `accessibility` skill, axe-style code review, browser checks |
| B3 SEO | §11 | Title/description/canonical/robots/sitemap/OG/Twitter/locale per page, JSON-LD validity (LocalBusiness/FAQPage), indexability, local-SE (NAP, geo), hreflang need, internal links | `seo` skill; structured-data validator; Search Console access note |
| B4 Performance & Security | §12, §13 | Image sizes/formats, fonts loading, JS/CSS bundle weights (dist/), preload/lazy, third-party scripts, caching headers; CWV proxies via browser (LCP candidate, layout shifts); CSP headers (local preview), secrets in repo, form abuse guards, deps advisory scan (`pnpm audit` read-only) | `web-perf` if Chrome available; Playwright MCP; dist/ inspection |

- **Outputs:** per-track evidence files → `AUDIT.md` sections (UI/UX/Responsive/Accessibility/SEO/Performance/Technical QA + Security).
- **Effort:** 2–3 sessions total (tracks parallel). **Acceptance:** every viewport×page combination in the matrix has ≥1 screenshot + console/network note.

### Phase C — Design, content & photography audit (source §6–8, §20–21, §28–29)
- **Objective:** Design Compliance Report (compliant / partial / non-compliant / undocumented) between brand book v1.0 and `tailwind.config.js` + rendered site; full copy audit; full image audit; PHOTO-XXX spec sheet for missing imagery.
- **Steps:**
  1. Extract full brand spec from `docs/marketing/brand-color-system.md` (palette, scales 50–800, 70/20/10 proportion, typography scale, logo rules, tone) — compare against `tailwind.config.js` tokens and every component's classes.
  2. Copy audit per section vs `docs/marketing/copy-seo-audit.md` prescriptions: hero option C, services with concrete figures, howItWorks 4 steps, FAQ (price first), CTA incentive, footer WhatsApp+hours. Flag every claim needing verification (C1–C12).
  3. Image audit: every current image (provenance, size, format, relevance) + PHOTO-XXX specs (Photo ID, section, commercial goal, scene, subjects, composition, orientation desktop/mobile, style, branding, text space, avoid, priority P0–P3, impact, recommended source: real/stock/AI) per source §8 format.
  4. Trust/social-proof audit: testimonials policy (real vs aggregates+store logos — no fake people), trust signals inventory, gaps marked `BUSINESS INPUT REQUIRED`.
- **Outputs:** `DESIGN_AUDIT.md`, `CONTENT_AUDIT.md`, `ASSETS_PLAN.md` (PHOTO-XXX sheet).
- **Effort:** 2 sessions. **Parallelizable:** with Phase B.

### Phase D — Analytics & marketing engineering (source §14–18, §41)
- **Objective:** full tracking truth table; event taxonomy matrix; Meta CAPI readiness; UTM convention proposal; analytics documentation plan.
- **Steps:**
  1. Inventory what exists (§1.5) — installed, where, init, events, params, duplicates, missing.
  2. Event matrix from the business (page_view, whatsapp_click, social_click, track_search, lead/quote_request when forms exist, phone_click, email_click, map click) with trigger/params/platform/priority — marked `proposed, needs owner confirm` (no invented conversions).
  3. Meta/CAPI readiness: event naming, `event_id` + dedup design, fbclid capture, UTM capture, consent note, server-side architecture (current: Worker exists — CAPI endpoint could live there later; document, don't build).
  4. UTM convention (source, medium, campaign, content, term) per channel (Meta, IG, Google, WhatsApp, email, influencers, organic) — simple, documented table.
  5. Spec `docs/analytics.md` + `docs/marketing-tracking.md` contents (platforms, taxonomy, naming, parameters, conversions, UTM, pixel, CAPI, GA4, testing, maintenance, ownership) — decide which adds value.
- **Outputs:** `ANALYTICS_PLAN.md` (§47 output 04).
- **Effort:** 1 session.

### Phase E — Conversion, journeys & benchmark (source §19, §22, §30)
- **Objective:** funnel map with leak points (evidence + hypothesis + fix + expected impact + complexity + priority), 6 journeys tested in-browser, lightweight LATAM logistics benchmark (patterns only, no copying).
- **Steps:** walk 6 journeys (new customer, quote, encomienda, tracking, mobile-from-ad, returning) on mobile + desktop; for each record friction points with screenshot evidence; compare against 2–3 reference logistics sites (patterns: trust, CTA, pricing, tracking, mobile UX).
- **Outputs:** `CONTENT_AUDIT.md` §Conversion + journeys; findings stream into HC backlog.
- **Effort:** 1 session. Depends on: Phase B screenshots.

### Phase F — E2E strategy (source §23–26)
- **Objective:** author the Playwright suite design (NOT install anything).
- **Steps:** suite spec: smoke / navigation / responsive / forms (valid, invalid, required, success, failure) / CTA (WhatsApp, phone, email, quote, contact) / tracking events / SEO checks / a11y automated / visual regression recommendation. Device matrix (desktop: Chromium/Firefox/WebKit; mobile: Chromium + WebKit). Run cadence: every PR → subset; release → full; prod smoke → critical paths. Selector policy: roles/accessible names, test IDs only when needed, no sleeps, no position selectors.
- **Note:** installing `@playwright/test` + browser binaries is an **implementation-phase decision** (touches `package.json`, CI, budgets) — included as HC task, not done during audit.
- **Outputs:** `E2E_PLAN.md` (§47 output 03).
- **Effort:** 1 session.

### Phase G — Synthesis & project plan (source §31–37, §39–40, §42–44, §47–49)
- **Objective:** final verdict + implementation backlog + release-readiness scorecard.
- **Steps:**
  1. Merge all findings into HC-XXX tasks (§5), each with P0–P3, Impact/Effort, dependencies, acceptance criteria.
  2. Impact/Effort matrix (Quick Wins / Strategic / Fillers / Defer).
  3. Release readiness: NOT READY / CONDITIONALLY READY / PRODUCTION READY with objective scorecard per category (Technical, UI, UX, Responsive, Accessibility, SEO, Analytics, E2E, Performance, Security, Content, Brand, Conversion, Operations) — each with status, score, blocking issues.
  4. Phased project plan (Phase 0 Discovery … Phase 11 Final QA) with the HC-XXX tasks assigned.
  5. Executive summary (§43) + final checklist (§44) + documentation plan (§39) + maintainability mechanisms (§40) + risks (§9).
- **Outputs:** `PROJECT_PLAN.md`, `PRODUCTION_CHECKLIST.md`, final `AUDIT.md` completion, `EXECUTIVE summary` inside `AUDIT.md`.
- **Effort:** 1–2 sessions. **Strictly last** — single-threaded.

---

## 3. Traceability matrix (source spec → phase → deliverable)

| Source spec § | Phase | Lands in |
|---|---|---|
| 1–2, 3, 5, 38, 46 | A | AUDIT.md (Business/Architecture/Missing info) |
| 4 (skills) | all | Skills log in AUDIT.md §Method |
| 6–8 | C | DESIGN_AUDIT.md / ASSETS_PLAN.md |
| 9, 27 | B1 | AUDIT.md (Responsive/Technical QA) |
| 10 | B2 | AUDIT.md (Accessibility) |
| 11 | B3 | AUDIT.md (SEO) |
| 12–13 | B4 | AUDIT.md (Performance/Security) |
| 14–18, 41 | D | ANALYTICS_PLAN.md |
| 19, 22, 30 | E | CONTENT_AUDIT.md / AUDIT.md (Conversion) |
| 23–26 | F | E2E_PLAN.md |
| 20–21, 28–29 | C | CONTENT_AUDIT.md / DESIGN_AUDIT.md |
| 31–37, 39–40, 42–44, 47–49 | G | PROJECT_PLAN.md / PRODUCTION_CHECKLIST.md / AUDIT.md |

---

## 4. Deliverables (source spec §47)

Location: `docs/audit-2026-08/` (new folder; not committed until owner approves; kebab-case filenames):

| Doc | Content | Notes |
|---|---|---|
| `01 AUDIT.md` | Full audit: executive summary, business understanding, architecture, UI, UX, responsive, a11y, SEO, performance, analytics, content, photography, conversion, technical QA, risks, missing info | The centerpiece; others feed it |
| `02 PROJECT_PLAN.md` | Prioritized implementation plan: HC-XXX full tasks, phases 0–11, impact/effort matrix, release readiness scorecard | Execution source for workhorse agents |
| `03 E2E_PLAN.md` | Playwright suite spec, device matrix, cadence, selector policy | No install during audit |
| `04 ANALYTICS_PLAN.md` | Analytics, event taxonomy, attribution, UTM, Meta readiness, CAPI architecture | §17 proposed docs spec included |
| `05 DESIGN_AUDIT.md` | Visual audit + design compliance report (compliant/partial/non/undocumented) | vs brand book v1.0 |
| `06 CONTENT_AUDIT.md` | Copy, content, conversion, journeys, gaps | All claims marked verified/BUSINESS INPUT |
| `07 ASSETS_PLAN.md` | Current images + PHOTO-XXX specifications (full §8 format) + optimization targets | Source: photo-direction/image-plan |
| `08 PRODUCTION_CHECKLIST.md` | Final launch checklist (source §44) + smoke post-deploy protocols | Maps harness gaps |

Merge rationale (allowed by §47): none merged — all 8 add value; `ANALYTICS_PLAN.md` and `E2E_PLAN.md` stay separate because they will be consumed by different implementers at different times.

---

## 5. Finding & task format (HC-XXX)

Every finding becomes a task with this exact shape (source §35–36):

```markdown
## HC-XXX — task name
- **Objective:** what we want to achieve.
- **Current state:** what exists now (with evidence: file:line / URL / screenshot).
- **Problem:** what's wrong or missing.
- **Evidence:** where it was found.
- **Proposed solution:** concrete change (code, config, doc, asset).
- **Files/areas affected:** paths.
- **Dependencies:** what must land first (other HC-XXX).
- **Implementation notes:** technical details (Astro/Tailwind/Preact specifics).
- **Design notes:** when applicable (brand book references).
- **Analytics notes:** when applicable (dataLayer schema / UTM / GA4 naming).
- **QA requirements:** what must be tested.
- **Playwright coverage:** which E2E spec covers it.
- **Acceptance criteria:** verifiable (e.g., "At 390px the CTA is visible, ≥44px touch target, no horizontal overflow."). NEVER "should look better".
- **Priority:** P0 (blocker) / P1 (critical) / P2 (important) / P3 (nice-to-have).
- **Impact:** High / Medium / Low.
- **Effort:** Small / Medium / Large.
```

Numbering: `HC-001…` sequential per phase group (HC-1xx discovery, HC-2xx technical, HC-3xx design, HC-4xx content, HC-5xx analytics, HC-6xx assets, HC-7xx E2E, HC-8xx hardening).

---

## 6. Skills to use (source spec §4 — only those adding evidence)

| Skill | Phase | Contributes |
|---|---|---|
| codebase-memory (MCP: search_graph, trace_path, get_architecture) | A, all | Symbol/routes/impact discovery; architecture |
| graphify | A | Docs/content navigation (wiki, GRAPH_REPORT if needed) |
| accessibility (repo autoskill) | B2 | Checklist-driven a11y audit |
| seo (repo autoskill) | B3 | Meta/structured-data checklist |
| frontend-design (repo autoskill) | C | Design/UI critique baseline |
| tailwind-css-patterns (repo autoskill) | C, B4 | Token vs usage comparison; bundle review |
| astro (repo autoskill) | B, C | Astro-specific idioms (islands, CSP) |
| vitest (repo autoskill) | F | Test design quality |
| Playwright MCP tools (environment) | B1, B4, E | Browser evidence per §7 |
| web-perf (environment) | B4 | Only if a Chrome/DevTools channel is reachable; else CWV proxies via Playwright |
| reviewer / security-reviewer (Dredd) | G+ | Adversarial review of diffs before each HC merge |

Skipped deliberately: insforge/supabase skills (backend concerns; out of landing scope), nodejs skills (no backend here).

---

## 7. Browser evidence protocol

- **Targets (priority order):**
  1. Local preview with real CSP: `wrangler pages dev dist --compatibility-date=2026-04-28` — the reliable evidence target from this machine.
  2. Prod `https://hit-cargo.com` via Playwright MCP — attempt; a 403 challenge is expected from this network (§1.10); if challenged, record it as evidence and rely on local.
  3. `pnpm preview` (plain HTML, no headers) — fallback only.
- **Viewport matrix:** 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920.
- **Page coverage:** full matrix on `/`, `/servicios`, `/servicios/aereo`, `/track`, `/contacto`, `/precios`; spot-check (375, 768, 1440) on `/terminos`, `/privacidad`.
- **Per page × viewport capture:** screenshot, console messages (errors/warnings), failed network requests, horizontal-overflow check, CTA visibility at first viewport, sticky header behavior.
- **File naming:** `docs/audit-2026-08/evidence/<page>-<viewport>.png` + `…/evidence/console-<page>-<viewport>.txt`.
- **A11y sweep via browser:** tab order walk per core page, focus-visible states, heading outline, reduced-motion toggle, 44px touch targets.
- **Tracking verification:** in DevTools console, assert one `dataLayer` push per interaction on local preview (track_search on submit, whatsapp_click on FAB click); document SPEC-P4-05 double-request presence/absence.

---

## 8. Project rules inherited (non-negotiable)

1. **No commits, branches, or PRs without explicit owner instruction.** This plan stays untracked until the owner decides.
2. **Never reformat the GTM snippet** (`Layout.astro`) — hash-pinned in `astro.config.mjs`; on any edit, recalc: `printf %s "<script>" | openssl dgst -sha256 -binary | openssl base64`.
3. **No inline `style=""`** — CSP3 meta hashes block it; Tailwind classes only.
4. **Dark-mode init script** stays in `<head>`, served from `public/scripts/dark-mode-init.js` (not bundled).
5. **Brand tokens** come from `tailwind.config.js` per brand book; no invented colors.
6. **Gate:** `pnpm check` green before any PR; `pnpm audit` read-only findings included in AUDIT.md; ~22 advisories known.
7. **PII/contracts:** do not touch Worker envelope, `toPublicShipment` allowlist, or panel RPCs. Landing reads only.
8. **User-facing copy in Spanish (voseo); docs/plan in English** (per this plan).
9. **Never invent business data** (source §38): prices, coverage, years, clients, testimonials → `UNKNOWN` / `BUSINESS INPUT REQUIRED`.
10. **No destructive actions during audit** (source §45); minimal P0-unblocking fixes only, each documented + PR'd after approval.
11. Subagents in phases B/C only for evidence gathering; synthesis (G) is orchestrator-only.

---

## 9. Risks & BUSINESS INPUT REQUIRED seeds

Format per source §37: what info / why / example / where it will be used.

| ID | Data needed | Why | Example use |
|---|---|---|---|
| BI-01 | Verified base rates ($/lb air, $/lb sea) | Docs conflict: $4.50/$2.50 vs $6.25/$2.90 (C4) | Hero/pricing/FAQ copy; JSON-LD offers; CAPI events |
| BI-02 | Company age + volume facts (if any) | Docs conflict: "1 año" vs "desde 2015" (C3) | Trust section, JSON-LD, ads claims |
| BI-03 | Testimonials: real clients willing to appear? | Policy: no fake people (C2) | Testimonials section (else: aggregates + store logos) |
| BI-04 | Saturday hours (or not) | JSON-LD says Sat, contact page Mon–Fri (C6) | hours everywhere (site, JSON-LD, GMB) |
| BI-05 | Coverage specifics (cities/departments) | Company overview is silent; "cobertura nacional" only | Services copy, local SEO, FAQ |
| BI-06 | Miami arrangement wording approval | Reseller truth: "Casillero/Tu dirección en Miami" (C1) | Hero, services, FAQ copy |
| BI-07 | GA4 Measurement ID + Meta Pixel ID | None documented | GTM triggers, event matrix, CAPI planning |
| BI-08 | UTM convention sign-off | None exist | docs/analytics.md, campaign readiness |
| BI-09 | Photo session availability (owner+Maya) | photo-direction plan depends on it | ASSETS_PLAN priorities P0/P1 |
| BI-10 | GMB listing access | Local SEO depends on NAP consistency | SEO tasks, NAP table |
| BI-11 | Budget bar for performance (adopt strictest?) | C9: Lighthouse>90, LCP<2.5s vs PageSpeed>80 | ASSETS_PLAN/performance tasks |

Other risks: prod challenge may throttle real-browser evidence (mitigation §7); GO model catalog drift (§12 — re-verify at runtime); Docs state vs code drift (mitigated by baseline §1 and evidence rule).

---

## 10. Exit criteria — what "audit done" means

- [ ] All 49 source sections mapped (§3) and covered with evidence.
- [ ] 8 deliverables exist in `docs/audit-2026-08/` (§4).
- [ ] Every P0/P1 finding has a planned HC-XXX task with acceptance criteria (§5).
- [ ] Release-readiness verdict issued with objective scorecard (§2 G3) — NOT READY / CONDITIONALLY READY / PRODUCTION READY.
- [ ] Source §44 final checklist fully answered.
- [ ] BUSINESS INPUT seeds (§9) listed with exact ask, or resolved.
- [ ] Owner reviewed deliverables; implementation phase approved or adjusted.

---

## 11. Sequencing & estimation

```
A ──▶ B (4 parallel tracks) ──▶ E ──▶ G (synthesis)
 └──▶ C (parallel with B) ──▶ F (design only) ──▶ D
```

- Session estimates (2–4 h each): A:1 · B:2–3 (parallel) · C:2 · D:1 · E:1 · F:1 · G:1–2. Total ≈ 9–11 sessions.
- Subagent budget: B and C may fan out to 2 explore agents each; D/E single agent; G strict orchestrator.
- After approval of deliverables → implementation phases 0–11 (PROJECT_PLAN.md), each HC task = branch + `pnpm check` + PR + review (Dredd) + merge + deploy + smoke.

---

## 12. OpenCode GO — recommended model strategy (workhorse picks)

Verified against the OpenCode GO catalog (2026-08-09/10): $5 first month then **$10/month**, usage limits 5h/`$12` — week/`$30` — month/`$60` (dollar-value caps; request counts depend on model price), plus top-ups. Catalog is curated for agentic coding; IDs may drift — **re-run `/models` at start of each session.**

### Tier assignment (this plan's workload: Astro/Tailwind implementation + audits + E2E writing)

| Tier | Role in this project | Models (GO) | Why |
|---|---|---|---|
| **T1 — Synthesis & decisions** | Phase G, release verdicts, architecture calls, final reviews; subagents in A/C that read the whole spec | **Kimi K3** (`kimi-k3`) — reserve; ~110 req/5h | Strongest reasoning on 1M ctx; expensive ($3/$15) → <10% of request budget |
| **T2 — Implementation workhorse** | Phases B–F execution, HC-XXX fixes, Astro/Tailwind/SEO/a11y edits, E2E specs | **DeepSeek V4 Pro** (`deepseek-v4-pro`) — primary; **GPT-5.6 Luna** (`gpt-5.6-luna`) — value alt (2× usage promo now: 4,100 req/5h at $0.10/$0.60); **Kimi K2.7 Code** (`kimi-k2.7-code`) — pure-code alt (1,350 req/5h) | Best reasoning-per-dollar in mid tier; 1M ctx fits the whole repo + plan; code-specialized backup for refactors |
| **T3 — Bulk/mechanical** | Image optimization loops, formatting passes, sitemap/links verification, chatty evidence collection | **MiMo V2.5** (`mimo-v2.5`, ~30k req/5h) or **DeepSeek V4 Flash** (`deepseek-v4-flash`, ~31–63k req/5h) | Effectively unlimited; $0.14/$0.28; keep T1/T2 requests for real thinking |
| **T4 — Adversarial review** | Pre-merge diff review (already covered by workspace Dredd) | Dredd default `codex` (outside GO); if GO-only: T1 model on diffs | Second opinion on security/PII/CSP-sensitive diffs |

### Suggested default pairing (per session)

- Orchestrator (this role): T2-T1 (start T2, escalate to T1 for G).
- Subagents (phases B/C evidence): T3 for gathering + T2 for interpretation.
- E2E suite authoring: T2 (K2.7 Code if pure TypeScript-heavy).
- Rule of thumb: cap T1 usage at ~10–15% of monthly requests; if the $60/mo cap is hit, T3 absorbs overflow mechanically; top-up only when T2 queue genuinely grows.

### Caveats

- Prices/catalog verified 2026-08-10; model availability and the 2× promos change — confirm in `/models` before bulk commits.
- Cached-read prices make session-heavy loops cheap (reuse pinned AGENTS.md/plan in context on T2/T3).
- This plan's total estimated workload (~9–11 audit sessions + ~60–90 HC tasks) fits roughly **1–2 months of GO limits** at the T2/T3 mix; scale T1 usage accordingly.

---

*End of plan. Owner: review §1.12 (contradictions), §9 (business seeds), §12 (model picks) → approve or adjust → then Phase A begins.*