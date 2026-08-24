# 07 ASSETS_AUDIT.md — Assets, Media, Favicons

## 1. Visual rebrand (Naranja HIT) — compliant

All nav/cards/buttons/hero pseudo-3D background carry `bg-primary`/`primary.dark`/gradient-from-primary. **Excellent touch:** `dark:bg-primary` pinned on the hero regardless of theme (high-contrast brand signpost). Dark mode = dark scheme with correct light-scheme variants.

## 2. Decathlon of repo images

| File | Size | In use | Verdict |
|---|---|---|---|
| `public/brand/hexagon.svg` | 234 B | **yes** (hero) | keep |
| `public/brand/favicon.ico` | 15 KB | yes (rel=icon) | keep |
| `public/brand/mark-180.png` | 3.3 KB | yes (apple-touch-icon) | keep |
| `public/brand/mark-32.png` | 844 B | yes (rel=icon 32x32) | keep |
| `public/brand/logo-mark.png` | 24 KB | **no** — header uses logo-*.svg; no refs | delete |
| `public/brand/mark-512.png` | 37 KB | **no** | delete |
| `public/brand/logo.jpg` | 33 KB | **no** | delete |
| `public/brand/logo-dark.svg` | 4.0 KB | yes Header.tsx:36,40 | keep |
| `public/brand/logo-light.svg` | 4.0 KB | yes Header.tsx:43,47 | keep |
| `public/icons/svg/wa-whatsapp.svg` | 1.2 KB | yes (FAB + hero) | keep |
| `src/assets/testimonials/` (4 webp+sprite) | ~26 KB | **no** — hidden section, nothing imports them | delete with section |
| `public/brand/` unused total | **~94 KB** | — | cut (HC-309) |

## 3. Image budget

- Only **3 render-blocking class-1 images** (header logo, testimonials hidden, OG). All brand-block files < 5 KB → 1.2 s LCP (Lighthouse/D p-95) despite them.
- **Webp everywhere** = full IA strategy compliance; additional transform (M-8) not needed.
- Recommend delegating the 3 images to InsForge Storage (M-6).

## 4. Favicons/meta

- ✅ links present in correct order (ico → 180 → 32).
- ✅ `og:image` = logos consolidated.
- ⚠️ `og:image` is **1.4:1** (1000×700) — not 1.91:1 (1200×630) as pre-2026 instagrams; hide on cards. Either export a proper 1200×630 or accept. (BI-10a)
- ✅ accent in theme-color (dark #111111).
- Missing (M-16): `apple-touch-icon` pointing to logo-mark vs mark-180 sizing is fine; `mask-icon` absent (minor for Safari pinned tabs; only 1 page has a logo).

## 5. Public folder hygiene

- `robots.txt`/`sitemap.xml` okay (superseded by worker rewrite).
- `README.md` in public — **ignore** (`npx wrangler pages deploy dist --branch master` auto-ignores in tests, but delete for cleanliness).
- No inline images in components (all referenced from public/).

## 6. Actions (feed PROJECT_PLAN HC-3xx)

- Delete unused: `logo-mark.png`, `mark-512.png`, `logo.jpg`, `testimonials/*` (3 files + sprite), `public/README.md`. → HC-302
- Adjudicate OG as 1.4:1 (BI-10a) → HC-307.
- Optional: all favicons under 25 KB → merge into `favicon.ico` (M-16) → HC-309.