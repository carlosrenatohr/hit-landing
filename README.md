# HIT Cargo — Website (`hit-landing`)

Public site for [HIT Cargo Nicaragua](https://hit-cargo.com), a logistics business moving packages between the US and Nicaragua.

The architecture is driven by one fact about the real users: many of them are on 3G/LTE in Nicaragua. So the site is built on Astro with island architecture — it ships plain HTML for the 90% that's static content, and only the pieces that actually need it (the header, the tracking portal, the FAQ) load any JavaScript. Preact instead of React keeps that interactive slice at a ~3 kB runtime. The result is a fast time-to-interactive on slow networks, which for this audience is a product decision, not a micro-optimization.

**Live:** https://hit-cargo.com

---

## Stack

| | |
|---|---|
| Framework | Astro 6.1 |
| Interactive UI | Preact 10 via `@astrojs/preact` |
| Styles | Tailwind CSS 3.4 |
| Bundler | Vite 8 |
| Tests | Vitest 4 |
| Hosting | Cloudflare Pages |
| Analytics | Google Tag Manager + Cloudflare Web Analytics |

---

## Getting started

```bash
pnpm install
pnpm dev           # http://localhost:4321 — no CSP enforcement
pnpm build         # outputs dist/
pnpm preview       # astro preview of dist/ — still without _headers
pnpm test
```

To validate CSP the way production does (with `public/_headers` applied):

```bash
pnpm build
wrangler pages dev dist --compatibility-date=2026-04-28
```

---

## Structure

- `src/components/` — `*.astro` by default (zero-JS), `*.tsx` only when a component needs state or interaction.
- `src/layouts/Layout.astro` — global `<head>`, analytics snippet, CSP coordination.
- `src/pages/` — file-based routing (`index.astro`, `track.astro`).
- `public/` — static assets + `_headers` + `_redirects`, applied directly by Cloudflare Pages.

---

## Why this stack

- **Astro:** the site is 90% static content. Serving plain HTML drops time-to-interactive sharply on 3G/LTE, which is what many real users in Nicaragua are on.
- **Island architecture:** only the `<Header>`, the tracking portal, and the FAQ load JS. Everything else is plain HTML.
- **Preact:** same API as React at a ~3 kB runtime. The interactive surface is small and doesn't justify React's weight.

---

## Conventions

- `.astro` by default. `.tsx` (Preact) only when there's state or an event handler.
- Tailwind utilities; custom CSS only when Tailwind can't express it.
- Imports via the `@/` alias pointing at `src/`.
- **No inline `style="..."` attributes** — the strict CSP disallows inline styles, so use classes.

---

## Deploy

Push to `master` → Cloudflare Pages runs a build automatically and promotes to production. Feature branches get a preview at `<branch>.<project>.pages.dev`. No extra configuration — it's connected via GitHub.
