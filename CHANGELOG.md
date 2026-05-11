 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Google Tag Manager integration (container `GTM-K55VC9JZ`) with hash-based CSP via Astro `security.csp`.
- Cloudflare Web Analytics allowed through CSP (kept alongside GA4 for ad-blocker-resilient baseline).
- `docs/business/company-overview.md` — business context document.

### Fixed
- Astro island hydration silently broken since v2.2.0 hardening (CSP blocked Astro's inline hydration scripts). Now coordinated header CSP + auto-generated meta CSP unblock hydration while preserving the hardening.

### Changed
- Refactored two inline `style="..."` attributes to Tailwind classes (required for hash-based CSP3).
- Docs reorganised into `docs/{business,operations,guides,marketing,history}/`. Filenames standardised to kebab-case. `claude.md` → `CLAUDE.md`.
- `MIGRATION_PLAN.md` moved to `docs/history/migration-plan.md`.
- `RELEASE_NOTES_v2.2.0.md` consolidated into this CHANGELOG.

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

[Unreleased]: https://github.com/carlosrenatohr/hit-landing/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/carlosrenatohr/hit-landing/compare/v2.1.1...v2.2.0
