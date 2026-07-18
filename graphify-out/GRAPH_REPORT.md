# Graph Report - .  (2026-07-17)

## Corpus Check
- 90 files · ~200,508 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 356 nodes · 374 edges · 60 communities (33 shown, 27 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.81)
- Token cost: 336,246 input · 0 output

## Community Hubs (Navigation)
- Business & strategy docs
- Astro/Preact dependencies
- Brand book & marketing
- Site config & layout
- Tracking portal (Preact island)
- Dev dependencies & tooling
- Delivery harness & CI/CD
- Home page sections
- Package scripts & metadata
- Hero & testimonials sections
- Legacy Vercel config
- Security audit & headers
- TypeScript config
- Legacy Everest scraper plan
- Cloudflare Pages deployment
- Brand logo assets
- Footer & content config
- Phase-1 quick wins (WhatsApp/GMB)
- Anniversary raffle T&C
- Community 19
- Analytics & conversion events
- Community 21
- Community 22
- Community 23
- Button component
- Services content
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 33
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 51
- Community 52
- Community 54
- Community 55

## God Nodes (most connected - your core abstractions)
1. `../layouts/Layout.astro` - 17 edges
2. `HIT CARGO Brand Book (Manual de marca)` - 13 edges
3. `Copy, SEO & Conversion Audit v3.0` - 11 edges
4. `../components/home/HeroSection.astro` - 10 edges
5. `siteConfig` - 10 edges
6. `Hit Cargo Web technical guide (CLAUDE.md)` - 10 edges
7. `scripts` - 9 edges
8. `Delivery Harness (gates before/during/after deploy)` - 8 edges
9. `../components/layout/Footer.astro` - 7 edges
10. `useTracking()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Everest scraper plan v3 (Cloudflare all-in)` --semantically_similar_to--> `Real tracking portal wired to hit-ever2`  [INFERRED] [semantically similar]
  docs/business/everest-scraper-plan.md → CHANGELOG.md
- `Deprecated Netlify/Vercel configs` --semantically_similar_to--> `Hosting consolidated to Cloudflare Pages`  [INFERRED] [semantically similar]
  docs/history/deprecated-hosting/README.md → CHANGELOG.md
- `React SPA -> Astro migration plan` --semantically_similar_to--> `Astro 6 + Preact island stack`  [INFERRED] [semantically similar]
  docs/history/migration-plan.md → CLAUDE.md
- `Cloudflare Pages auto-deploy on master` --conceptually_related_to--> `CI merge gate (pnpm check)`  [INFERRED]
  docs/guides/gitflow-tutorial.md → .github/workflows/ci.yml
- `Hit Cargo Web technical guide (CLAUDE.md)` --references--> `v2.3.0 MVP release`  [EXTRACTED]
  CLAUDE.md → CHANGELOG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Tracking system across plan and implementation** — changelog_real_tracking_portal, docs_business_everest_scraper_plan_hono_api, docs_business_master_plan_2024_2026_tracking_mvp [INFERRED 0.75]
- **Analytics & conversion measurement stack** — docs_marketing_launch_plan_meta_pixel, docs_marketing_launch_plan_ga4, claude_gtm_container [INFERRED 0.75]
- **CSP hardening across headers, meta, and hosting configs** — claude_coordinated_csp, changelog_csp_hardening, docs_history_deprecated_hosting_readme_deprecated_configs [INFERRED 0.75]
- **Deploy pipeline & quality gates** — docs_operations_delivery_harness, docs_operations_ci_cd_flow, docs_operations_git_deployment_strategy [INFERRED 0.75]
- **Sistema cromatico 70/20/10** — docs_marketing_brand_color_system_naranja_hit, docs_marketing_brand_color_system_azul_navy, docs_marketing_brand_color_system_proporcion_70_20_10 [INFERRED 0.85]
- **Security headers posture (CSP/HSTS)** — docs_operations_security_audit_2026_07_csp_intersection, docs_operations_security_audit_2026_07_hsts_fix, docs_operations_security_deployment_guide_security_headers [INFERRED 0.75]
- **HIT Cargo brand asset set** — public_brand_logo_full_dark_lockup, public_brand_logo_full_lockup, public_brand_logo_mark_isotype, public_brand_logo_lockup_jpg, public_brand_mark_180_icon, public_brand_mark_32_favicon, public_brand_mark_512_icon [INFERRED 0.75]

## Communities (60 total, 27 thin omitted)

### Community 0 - "Business & strategy docs"
Cohesion: 0.08
Nodes (32): Hosting consolidated to Cloudflare Pages, Real tracking portal wired to hit-ever2, 4-milestone standardized journey modal, v2.3.0 MVP release, Astro 6 + Preact island stack, Mandatory Miami address flow, Hit Cargo Web technical guide (CLAUDE.md), Harness L1 (partial) (+24 more)

### Community 1 - "Astro/Preact dependencies"
Cohesion: 0.07
Nodes (27): astro, @astrojs/preact, @astrojs/rss, @astrojs/sitemap, @astrojs/tailwind, framer-motion, lucide-preact, dependencies (+19 more)

### Community 2 - "Brand book & marketing"
Cohesion: 0.09
Nodes (27): HIT CARGO Brand Book (Manual de marca), Kit de assets (HIT_CARGO_Assets.zip), Azul Navy #14213D (soporte estratégico), Data-driven content architecture (src/content, src/config), Estilo fotografico (dir. de arte, §07), Logotipo (4 versiones de uso), Naranja HIT #FF7A00 (protagonista), Proporcion 70/20/10 (+19 more)

### Community 3 - "Site config & layout"
Cohesion: 0.14
Nodes (14): ../components/layout/Header, ../components/preact/tracking/TrackingPortal, ../components/preact/WhatsappFab, ../config/site, ../content/meta, ../../content/servicePages, ../styles/global.css, ../components/seo/JSONLD.astro (+6 more)

### Community 4 - "Tracking portal (Preact island)"
Cohesion: 0.12
Nodes (17): TrackingForm(), envApiUrl, fmtDay(), milestoneDate(), MILESTONES, PublicEvent, PublicShipment, pushTrackEvent() (+9 more)

### Community 5 - "Dev dependencies & tooling"
Cohesion: 0.09
Nodes (23): autoprefixer, eslint-config-prettier, eslint-plugin-prettier, jsdom, devDependencies, autoprefixer, eslint-config-prettier, eslint-plugin-prettier (+15 more)

### Community 6 - "Delivery harness & CI/CD"
Cohesion: 0.11
Nodes (22): Technical & Process Audit (June 2026), GTM sin eventos de conversion, Falta de harness / red de seguridad automatizada, Brechas priorizadas P0-P2, Tracking 100% mock (luego resuelto), CI/CD Flow, Cloudflare Pages auto-deploy (push master), Rollback strategies (dashboard / git) (+14 more)

### Community 7 - "Home page sections"
Cohesion: 0.13
Nodes (12): ../components/home/FAQSection, ../config/seo, ../../content/cta, ../../content/howItWorks, ../../content/services, ../components/home/CTASection.astro, FAQItemProps, ../components/home/HowItWorksSection.astro (+4 more)

### Community 8 - "Package scripts & metadata"
Cohesion: 0.13
Nodes (14): name, packageManager, private, scripts, astro, build, check, dev (+6 more)

### Community 9 - "Hero & testimonials sections"
Cohesion: 0.22
Nodes (7): ../../assets/images/background.jpeg, ./TrackingForm, ../../content/home, ../../content/testimonials, ../components/home/HeroSection.astro, heroContent, testimonials

### Community 10 - "Legacy Vercel config"
Cohesion: 0.18
Nodes (10): maxDuration, buildCommand, framework, functions, api/*, headers, outputDirectory, redirects (+2 more)

### Community 11 - "Security audit & headers"
Cohesion: 0.24
Nodes (10): Security & Correctness Audit (July 2026), Cloudflare hardening (WAF, Bot Fight, Turnstile, Rate Limiting), CSP header ∩ meta intersection, HSTS fix (estaba faltando), Tracker abort/analytics ghost bug fix, Correccion de la afirmacion '0 vulnerabilidades', Security Deployment Guide, Dependency updates (Astro 6.1.9, Vite 8.0.9, Vitest 4.1.5) (+2 more)

### Community 12 - "TypeScript config"
Cohesion: 0.25
Nodes (7): astro/tsconfigs/strict, compilerOptions, baseUrl, jsx, jsxImportSource, paths, extends

### Community 13 - "Legacy Everest scraper plan"
Cohesion: 0.33
Nodes (7): Everest Scraper & API Plan v3 (Cloudflare All-in), AI parsing with GPT-4o-mini, Cloudflare Browser Rendering, Cookie Vault (Upstash Redis, ASPSESSIONID), Points/libras system (points_ledger), Silent background processing via Cron Triggers, Supabase persistence & Auth (legacy)

### Community 14 - "Cloudflare Pages deployment"
Cohesion: 0.33
Nodes (7): Cloudflare Pages Deployment Guide, Custom domain setup (hit-cargo.com), Env vars (PUBLIC_API_URL, PUBLIC_ prefix), Wrangler CLI deploy, Cloudflare Pages Static Setup, KV namespace collision (code 10014), Static mode vs SSR decision

### Community 15 - "Brand logo assets"
Cohesion: 0.29
Nodes (7): HIT Cargo full logo lockup (dark variant), HIT Cargo full logo lockup (globe + arrow isotype with HIT CARGO wordmark), HIT Cargo logo (JPG raster variant), HIT Cargo isotype mark (orange globe + upward arrow), HIT Cargo mark icon 180px (apple-touch), HIT Cargo mark icon 32px (favicon), HIT Cargo mark icon 512px (PWA/maskable)

### Community 16 - "Footer & content config"
Cohesion: 0.38
Nodes (5): ../components/layout/Footer.astro, currentYear, brands, services, footerContent

### Community 17 - "Phase-1 quick wins (WhatsApp/GMB)"
Cohesion: 0.50
Nodes (4): business.config.ts dynamic variables, Phase 1 quick wins, Google My Business profile, WhatsApp Business setup

### Community 18 - "Anniversary raffle T&C"
Cohesion: 0.50
Nodes (4): T&C Rifa de Aniversario HIT CARGO 2026, Elegibilidad y forma de participar, Independencia de Meta/Instagram/Facebook, Premio: 2 creditos de envio USD $15

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (3): CSP hardening (remove unsafe-inline), Coordinated CSP (header + meta hashes), GTM snippet SHA-256 hash-pinned

### Community 20 - "Analytics & conversion events"
Cohesion: 0.67
Nodes (3): Floating WhatsApp widget, track_search / whatsapp_click dataLayer events, GTM conversion events pending

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (3): Cookie vault (Upstash Redis, ASP session), Everest cargotrack (Classic ASP source), GPT-4o-mini HTML parsing

### Community 22 - "Community 22"
Cohesion: 0.67
Nodes (3): Marketing launch plan + raffle rescue, $20 Meta Ads engagement plan, Rifa aniversario rescue

### Community 23 - "Community 23"
Cohesion: 0.67
Nodes (3): Testimonial portrait 1 (stock/testimonial image), Testimonial portrait 2 (stock/testimonial image), Testimonial portrait 3 (stock/testimonial image)

## Knowledge Gaps
- **165 isolated node(s):** `buildCommand`, `outputDirectory`, `framework`, `headers`, `redirects` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `../components/home/HeroSection.astro` connect `Hero & testimonials sections` to `Site config & layout`, `Home page sections`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Astro/Preact dependencies` to `Package scripts & metadata`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `../layouts/Layout.astro` connect `Site config & layout` to `Footer & content config`, `Home page sections`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `HIT CARGO Brand Book (Manual de marca)` (e.g. with `Copy, SEO & Conversion Audit v3.0` and `Voz de marca / vos nicaraguense`) actually correct?**
  _`HIT CARGO Brand Book (Manual de marca)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Copy, SEO & Conversion Audit v3.0` (e.g. with `HIT CARGO Brand Book (Manual de marca)` and `Prueba social sin retratos de stock`) actually correct?**
  _`Copy, SEO & Conversion Audit v3.0` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `buildCommand`, `outputDirectory`, `framework` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Business & strategy docs` be split into smaller, more focused modules?**
  _Cohesion score 0.07661290322580645 - nodes in this community are weakly interconnected._