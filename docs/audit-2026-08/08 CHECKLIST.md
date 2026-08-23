# 08 CHECKLIST.md — Launch & Quality Checklist (Landing)

> How to use: exhaustive pre-launch/quality checklist for the landing site. Every item has: status (◻ pending / ✅ done), evidence (file:line or test name), and an owner where needed. Keep it current — re-run at each ship.

## A. Blockers (P0) — must be done before ANY share

| # | Check | Status | Evidence |
|---|---|---|---|
| A-01 | CTA buttons wired to real actions | ✅ | ServicesSection.astro:33-35, CTASection.astro:19-23 |
| A-02 | FAQ → `/servicios` fixed | ✅ | faq.ts:8 |
| A-03 | Home service SVGs parse without the audited malformed arc | ✅ | services.ts + `pnpm check` |
| A-04 | `pnpm check` green after P0 fixes | ✅ | `pnpm check` (3 tests, Astro build 15 pages) |

## B. Quality gates (every commit / pre-merge)

| # | Check | Status | Command/evidence |
|---|---|---|---|
| B-01 | vitest run passes | ✅ | `pnpm test` (green @ audit) |
| B-02 | astro build passes | ✅ | `pnpm build` (green @ audit) |
| B-03 | No `style=""` inline attributes | ✅ | sweep `style="` in src = 0 |
| B-04 | No overflow-x on any page (320-1920) | ✅ | E2E B1 sweep (0/68) + re-run 2026-08-23 (0/44) |
| B-05 | No console errors (home + others) | ✅ | Re-run 2026-08-23: 0 errors in 44 combos (`evidence/HC-311-RERUN-2026-08-23.md`) |
| B-06 | GTM snippet byte-identical (hash CSP) | ✅ | Layout.astro + astro.config integrity |
| B-07 | dark-mode init before any JS in head | ✅ | public/scripts/dark-mode-init.js |

## C. Accessibility (S5)

| # | Check | Status | Evidence |
|---|---|---|---|
| C-01 | Header interactive targets ≥ 44×44 CSS px | ✅ | Header.tsx:53-137, mobile links |
| C-02 | Services dropdown keyboard-focusable + aria-expanded | ✅ | Header.tsx:60-96 |
| C-03 | Desktop/mobile `<nav>` has aria-label | ✅ | Header.tsx:52, 142 |
| C-04 | Heading hierarchy per page (h1→h2→h3, no inversion) | ✅ | FAQSection.tsx:52-60 |
| C-05 | Color-contrast AA on orange/navy mixes (dark mode) | ✅ | PR #26 (`fix/a11y-contrast-labels-track`): navy-on-orange ~6:1; axe re-run 0 serious |
| C-06 | Social icon links have accessible names (aria-label) | ✅ | PR #26: Footer FB/IG/TikTok `aria-label` added |

## D. Analytics (S10)

| # | Check | Status | Evidence |
|---|---|---|---|
| D-01 | GTM triggers exist for track_search + whatsapp_click → GA4/pixel | ◻ | G1 — owner GTM container config needed (`docs/analytics/gtm-setup.md`) |
| D-02 | dataLayer schema documented in repo | ✅ | `docs/analytics/gtm-setup.md` §1 |
| D-03 | Consent banner decision (EU traffic) | ◻ | G3 |

## E. Content & conversion (S8) — most blocked on BIs

| # | Check | Status | Evidence |
|---|---|---|---|
| E-01 | Hero = option C copy (Calcular Costo de Envío, times, no jargon) | ✅ | PR #25 (`feat/content-hero-faq`): `src/content/home.ts:18-19` |
| E-02 | All "bodega" claims → "casillero" | ✅ | PR #25: `servicePages.ts:193` (last leftover) fixed |
| E-03 | FAQ: price Q first + 7 Qs | ✅ | PR #25: `src/content/faq.ts` restructured |
| E-04 | Rates visible (precios + FAQ) | ✅ | `src/pages/precios.astro` + `faq.ts` — $6.50 aereo / $2.50 maritimo published |
| E-05 | Services cards: concrete figures + links | ✅ | `src/pages/servicios/index.astro` — links to /precios calculator |
| E-06 | 100% voseo sweep | ✅ | `fix/voseo-sweep` merged |
| E-07 | Hours match confirmed source (Sat) | ✅ | `fix/hours` merged: L-V 9:30-18:00, S 9:30-17:00 |
| E-08 | Testimonials real or removed | ◻ | dec.4 (BI-03/05) — owner decision |
| E-09 | Footer: WhatsApp CTA + hours + semua links | ✅ | PR #26 + PR #27 (remaining WhatsApp CTA in HC-323) |

## F. Design & brand (S7)

| # | Check | Status | Evidence |
|---|---|---|---|
| F-01 | accent.* tokens deleted; accent-yellow pill replaced | ◻ | HC-302/306 |
| F-02 | Black CTA → bg-primary | ◻ | HC-304 |
| F-03 | Dark-only decision documented (70/20/10 deviation) | ◻ | HC-305 (BI-12) |
| F-04 | Heading weights/scale aligned (800/900) | ✅ | PR #27 (`chore/design-polish-p2`): all h1 → `font-extrabold` |
| F-05 | Unused assets deleted (94 KB + testimonials) | ◻ | HC-302/309 |
| F-06 | src/index.css deleted | ◻ | HC-302 |

## G. SEO (S1) — verify after content changes

| # | Check | Status | Evidence |
|---|---|---|---|
| G-01 | Title/description per page ≥ 50 chars & ≤ 160 | ✅ | meta engine |
| G-02 | Canonical + hreflang dual-es present on every page | ✅ | Layout meta |
| G-03 | OG image 1200×630 | ✅ | `public/og-image.jpg` (93 KB) |
| G-04 | JSON-LD matches config (FB / street / geo) | ✅ | siteConfig (BI-13) |
| G-05 | robots/sitemap served (worker rewrite) | ✅ | public + rewrite |
| G-06 | Sitemap includes new pages (15 URLs: /servicios, /servicios/*, /precios) | ✅ | dist/sitemap-0.xml |

## G2. SEO — new pages (added 2026-08 audit batch 2)

| # | Check | Status | Evidence |
|---|---|---|---|
| G2-01 | `/servicios/index.astro` has title + description | ✅ | servicios/index.astro:16-18 |
| G2-02 | `/servicios/[slug].astro` uses `service.metaDescription` per service | ✅ | [slug].astro:18 |
| G2-03 | `/precios` has title + description (calculator page) | ✅ | precios.astro:19 |
| G2-04 | Breadcrumbs component on all service pages + /servicios + /precios | ✅ | Breadcrumbs.astro |
| G2-05 | Related-service chips navigate correctly on service pages | ✅ | [slug].astro chips |
| G2-06 | JSON-LD (Organization + LocalBusiness) matches updated FB URL | ✅ | JSONLD.astro (BI-13) |
| G2-07 | Keyword map updated for new pages in copy-seo-audit | ✅ | §4.1, §4.2, keyword table |

## H. Post-deploy smoke (run each prod deploy)

```bash
curl -sI https://hit-cargo.com/ | grep -E 'HTTP/|content-security-policy|strict-transport-security|x-frame-options'
curl -s "https://hit-ever-scraper.nativerse.workers.dev/track/910500?pretty=1" | grep -E '"ok":|"guia":'
```

| # | Check | Status | Evidence |
|---|---|---|---|
| H-01 | hit-cargo.com 200 + CSP/HSTS/XFO headers | ✅ @audit | — |
| H-02 | worker /track 200 envelope | ✅ @re-run 2026-08-23 | curl ok:true |
| H-03 | Search + WhatsApp events appear in GA4 (after D-01) | ◻ | events verified firing in dataLayer 2026-08-23; GTM consumption still pending (D-01) |

---

## I. HC-311 re-run log

- **2026-08-23** post-merge `6a9e1c6` (PR #20/#22/#23): E2E sweep + tracking assertions + axe scan. Full results: `evidence/HC-311-RERUN-2026-08-23.md`. B-05 closed; C-05 failed with evidence; new C-06. No P0/P1 regressions.
- **2026-08-23** post-merge `02997a3` (PR #25/#26/#27/#28): hero option C, FAQ restructure, contrast/navy fix, social a11y, landmarks, theme-color, h1 extrabold, GTM docs. C-05/C-06/E-01/E-02/E-03/E-04/E-05/E-06/E-07/E-09/F-04/D-02 now ✅. axe re-run 0 serious violations. Remaining open: E-08 (owner), D-01 (owner GTM), F-01/F-03/F-05/F-06 (owner-design).

_Last updated: 2026-08-23 post-merge sweep. Owner: none (shared). Keep in sync with PROJECT_PLAN HC-3xx/4xx._
