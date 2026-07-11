 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.6.0] — 2026-07-11

Landing polish: redesigned contact page, a prominent scroll-shrinking logo, an embedded map, and a floating WhatsApp widget.

### Added
- **Floating WhatsApp button** on every page (bottom-right): periodic bounce + pulse ring and an invite label; opens `wa.me` (the app on mobile, web on desktop) with a short prefilled greeting. Emits a `whatsapp_click` dataLayer event (`location: floating_widget`) so a GTM pixel / GA conversion can be wired with no code change.
- **Google Maps embed** on the contact page, pinned to the HIT CARGO Business Profile.

### Changed
- **Contact page redesigned** — per-field orange icon chips, real brand social icons (Facebook/Instagram/TikTok), and a two-column layout with an orange WhatsApp card and a navy "Cómo llegar" card. The address row was de-duplicated (it lives in the map/directions card) and the hours trimmed to Mon–Fri.
- **Header logo** enlarged to `h-16` at the top of the page and shrinks to `h-11` on scroll, transitioning in sync with the fixed header.

### Security
- CSP `frame-src` extended to allow `www.google.com` / `maps.google.com` for the contact map embed.

## [2.5.0] — 2026-07-10

Landing rebrand to brand book v1.0: the Naranja HIT palette and new typography.

### Changed
- **Brand palette** — the protagonist color moves from red `#FF3B3F` to **Naranja HIT `#FF7A00`**
  (with a 50–800 scale for states/hovers), and **Azul Navy `#14213D`** joins as strategic support;
  the browser `theme-color` is navy. CTAs and focus states re-hue to orange through the `primary`
  token.
- **Typography** — from Inter to **Montserrat** (headings/impact) + **Poppins** (body).
- **Header logo** — now the full logo (isotype + wordmark) with light/dark variants, replacing the
  isotype-plus-text lockup.
- The old amber accent is retired from the landing (icon chips and stars → orange; decorative blobs
  → navy) so orange stays scarce per the 70/20/10 proportion.

### Performance
- **Logo assets re-optimized** (~370 KB saved): `logo-mark` 244K→28K, `mark-512` 113K→27K,
  `mark-180` 25K→5K, master JPG 147K→35K; the oversized 928px mark is capped at 512px.

### Docs
- Brand book v1.0 (palette, typography, logo, asset kit), with the content-architecture path
  corrected (`src/content` + `src/config`, not `src/data`).
- New `docs/marketing/photo-direction.md` — photo preparation and replacement guide.
- `CLAUDE.md` identity section updated to the new brand.

## [2.4.0] — 2026-07-10

Tracking UX, anti-abuse and the full brand logo, on top of the v2.3.0 MVP.

### Added
- **Inline tracking from the home hero.** The hero form resolves the waybill in place and opens the
  result **modal** (shared with `/track`) — no page navigation. The result view is shared between
  both entry points.
- **Branded loading state** (animated mark + indeterminate bar) so the search action is obvious.
- **Request timeout** — a 12s `AbortController` cutoff so a hung/blocked worker never traps the
  visitor; the overlay stays closable (Escape / backdrop / close button).
- **Journey redesign** — rendered latest-first, with the current milestone pulled out into a
  highlighted "Estado actual" card above the rest.
- **`track_search` dataLayer event** on every outcome (found / notfound / error / timeout) for GTM →
  pixels / Google Analytics conversions.
- **Full brand logo assets** — the master `public/brand/logo.jpg` plus two web-optimized transparent
  variants (~43 KB): `logo-full.png` (light backgrounds) and `logo-full-dark.png` (dark). The full
  lockup is used in the site footer; the horizontal header/nav keep the mark + text.

### Security
- **Client-side anti-abuse** on the tracking forms — a minimum interval between submits, a
  per-minute cap, and a honeypot field to blunt mass/bot submissions, on top of the worker's per-IP
  rate limit.

### Changed
- CTAs recolored to the brand Primary and hovers tokenized (from the brand-palette pass).

## [2.3.0] — 2026-07-10

MVP release: the missing site pages, a real package-tracking portal wired to the
`hit-ever2` worker, and a first pass of the brand color system. Everything below shipped to
production on Cloudflare Pages.

### Added
- **Real tracking portal.** `TrackingPortal.tsx` now fetches live shipment data from the
  `hit-ever2` worker (`GET /track/:id`, primary by waybill/guía, fallback by carrier tracking
  number) and replaces the previous mock. States: loading / ok / not-found / error, plus an
  honest "coming soon" fallback only when the API URL is explicitly disabled.
- **Result modal with a standardized journey.** The result opens in a modal (Escape /
  click-outside / close button, body-scroll locked) instead of reloading the page. Provider event
  logs — which differ between Everest and Global Connection — are no longer shown raw; they are
  mapped to a fixed 4-milestone journey (In Miami warehouse → In transit → In Nicaragua →
  Delivered) with the current milestone **bolded** and dated only where the date is reliable
  (Miami reception, Nicaragua arrival by MGA office, delivery).
- **URL auto-search.** `/track/?number=XXXX` searches automatically on load (shareable links).
- **Brand color system.** `docs/marketing/brand-color-system.md` — palette tokens, tracker status
  colors, usage rules and accessibility, written from a marketing-lead perspective. Applied to the
  tracker: the primary CTA is now the brand Primary (was blue) and status pills use the semantic
  ramp.
- **Missing pages.** Services (air / ocean / consolidation), pricing, contact, terms and privacy.
- **Real logo assets.** Favicon, `favicon.ico`, apple-touch-icon and header/footer marks now use
  the real HIT Cargo logo instead of the scaffold placeholder and generic icons.
- **Delivery harness.** `pnpm check` (Vitest + `astro build`) and a GitHub Actions CI workflow as
  the merge gate.
- Google Tag Manager (`GTM-K55VC9JZ`) with hash-based CSP via Astro `security.csp`; Cloudflare Web
  Analytics allowed through CSP alongside GA4.
- `docs/business/company-overview.md` and a reorganized `docs/{business,operations,guides,marketing,history}/` tree.

### Changed
- **Hosting consolidated to Cloudflare Pages**; Netlify and Vercel config files removed (leftover
  GitHub App checks are disconnected separately from the dashboards).
- **Node 22 required** — Astro 6 dropped Node 20 support, which was silently failing the CI build.
- The tracking portal defaults to the live public worker URL, so it works even when
  `PUBLIC_API_URL` is not injected at build time; the env var still overrides it.
- Coordinated header CSP + auto-generated meta CSP unblock Astro island hydration while preserving
  the v2.2.0 hardening.
- Refactored inline `style="..."` attributes to Tailwind classes (required for hash-based CSP3).

### Fixed
- SEO hardening; corrected contact data (phone/domain); removed the invented rating and stock
  testimonials (Google policy risk).
- Astro island hydration silently broken since v2.2.0 CSP hardening.

## [2.2.0] — 2026-04-23

### Security
- Resolved all 3 known dependency vulnerabilities (0 remaining).
- Added comprehensive HTTP security headers: CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy, X-XSS-Protection.
- Hardened CSP by removing `'unsafe-inline'` from `script-src` (later required follow-up in [Unreleased] to repair Astro hydration).

### Changed
- Astro 5.18.1 → 6.1.9 (XSS fix `GHSA-j687-52p2-xcff`).
- Vite 7.3.2 → 8.0.9 (path traversal fix `GHSA-4w7w-66w2-5vf9`).
- Vitest 2.1.9 → 4.1.5.
- `@astrojs/preact` 4.1.3 → 5.1.2.

### Added
- Multi-platform deployment config: Cloudflare Pages (`public/_headers`, `public/_redirects`), Vercel (`vercel.json`), Netlify (`netlify.toml`).
- Automatic CI/CD via Cloudflare Pages on push to `master`.
- Initial docs set (now under `docs/operations/` and `docs/guides/`).

[Unreleased]: https://github.com/carlosrenatohr/hit-landing/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/carlosrenatohr/hit-landing/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/carlosrenatohr/hit-landing/compare/v2.4.0...v2.5.0
[2.2.0]: https://github.com/carlosrenatohr/hit-landing/compare/v2.1.1...v2.2.0
