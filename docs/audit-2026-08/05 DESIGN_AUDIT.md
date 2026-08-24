# 05 DESIGN_AUDIT.md — Design Compliance Report

- **Scope:** brand book v1.0 (`docs/marketing/brand-color-system.md`) vs `tailwind.config.js` + rendered components + `dist/`.
- **Method:** code-first comparison (token-by-token), class-usage sweeps, browser screenshots (68 combos, `docs/audit-2026-08/evidence/`).
- **Status:** 3 compliant areas, 10 partial, 2 non-compliant, 1 undocumented. Dark-mode proportion is the biggest deliberate deviation to adjudicate with the owner.

## 1. Compliance summary

| Area | Status | Key evidence |
|---|---|---|
| Core palette tokens (orange scale, black, navy) | **compliant** | `tailwind.config.js:9-18,23,27` = book §03 |
| Font families (Montserrat/Poppins) | **compliant** | `Layout.astro:75`, `global.css:20,24-26`, config:40-45 |
| Dark mode strategy (class + default dark, head init) | **compliant** | config:4, `public/scripts/dark-mode-init.js`, Layout.astro:71 |
| Logo version selection (dark/light swap, footer) | **compliant** | Header.tsx:34-47, Footer.astro:14 |
| Inline styles / CSP | **compliant** | zero `style=""` in `src/**` (sweep) |
| Off-book tokens (`accent.*`, `secondary.light`, `navy.light`, `neutral.*`) | **partial → non-compliant for `accent.*`** | config:19,24,28,31-38; live usage `shared.tsx:256` |
| WhatsApp green `bg-[#25D366]` (single arbitrary value) | **partial** | `WhatsappFab.tsx:30-31` |
| Status colors (shipment pills, milestone green, validation red) | **sanctioned-status-colors** | shared.tsx:24-31,285,303,309; TrackingForm.tsx:54,58 |
| Gray neutrals outside book palette (17 files) | **partial (undocumented extension)** | heaviest: shared.tsx, Footer.astro, precios.astro |
| 70/20/10 proportion | **partial** — dark default measures ~90/5/5 | Hero:12, Services:5, HowItWorks:5, FAQ:49, CTA:5, Footer:9 |
| CTA color rule (orange = action) | **partial** — one black CTA | ServicesSection.astro:33 |
| Typography weights/scale | **partial** — everything `font-bold` (700), no Black 900/ExtraBold 800; h1 inconsistent across pages; italic in unused section | 60× `font-bold`; TestimonialsSection.astro:33 (hidden); Hero:20 vs contacto:50 vs terminos:16 |
| Logo min-size rule (≥120 px) | **partial** — scrolled header h-11 ≈ 43 px, default h-16 ≈ 62 px | Header.tsx:39,46; book line 131 |
| Dead code | **non-compliant (hygiene)** | `src/index.css` unimported; `accent-blue` unused; hidden TestimonialsSection |

## 2. Tokens vs book (detail)

| Token | Value | Book | Status | Evidence |
|---|---|---|---|---|
| `primary.50…800` | #FFF3E6→#803E00 | exact scale | ✅ | config:9-18 |
| `primary.dark` | #E56E00 | = 600 alias | ✅ | config:19 |
| `secondary` | #111111 | Negro Profundo | ✅ | config:23 |
| `secondary.light` | #2D2D2D | (no black scale in book) | ⚠️ off-book extension | config:24 |
| `navy` | #14213D | Azul Navy | ✅ | config:27 |
| `navy.light` | #1E2E4F | (no navy scale) | ⚠️ off-book | config:28 |
| `accent.yellow` #FFD700 / `accent.blue` #00A8E8 | — | book: "Nada fuera de la paleta" | ❌ non-compliant | config:31-34; live: shared.tsx:256 (yellow pill fallback) |
| `neutral.text` #4A4A4A / `neutral.bg` #F8F9FA | — | undocumented de-facto neutrals | ⚠️ | config:35-38 |

Same values duplicated in CSS vars `global.css:5-15` (incl. off-book accents :11-12).

**Dead CSS:** `src/index.css` is not imported anywhere (Layout imports `global.css`); it redefines `.bg-grid-pattern` differently and uses `dark:bg-gray-900` — delete.

## 3. Proportion (70/20/10)

- Dark (default for visitors): every section near-black → measured ~90/5/5 (orange only in CTAs/badges/step circles/focus rings — orange discipline itself is good).
- Light mode ≈ closer to book intent, but NOT the default.
- **Decision needed (BI-12):** "dark-only by design"? No user-facing theme toggle exists (init reads `localStorage.theme`, no component writes it) → new visitors always see dark. If dark-only is intentional, document the proportion deviation; if book's 70/20/10 must hold, light-mode default or a toggle is required.

## 4. Role violations & deviations

- `ServicesSection.astro:33` — black `bg-secondary` "Ver Todos los Servicios" button. Book: action buttons use Naranja HIT; navy is support, never CTA. → recolor to `bg-primary`.
- `CTASection.astro:21` — white-outline secondary button on black (acceptable as secondary, borderline).
- `shared.tsx:256` — status pill fallback `bg-accent-yellow text-secondary` (off-book token in production path) → replace with a neutral-from-palette pill.
- `global.css:29` — `.dark body { @apply text-gray-300 }` off-palette gray for dark body text (adjudicate: keep as functional neutral or map to a documented token).

## 5. Typography detail

- Loading: Google Fonts Montserrat 600/700/800/900 + Poppins 400/500/600 (Layout.astro:75). Families enforced via element selectors (global.css:20,24-26) — `font-display`/`font-heading` utilities never used (dead utilities).
- Book asks Display=900, Título=800; site uses 700 everywhere → hierarchy reads lighter than spec. Recommend: map headings to 800 for h1-h2.
- Book bans italics; `TestimonialsSection.astro:33` uses `italic` — section unused/hidden, delete with it.
- h1 scale inconsistent: home text-5xl/6xl (Hero:20); inner pages text-3xl/5xl (contacto:50, servicios:15, precios:18, slug:20); terminos/privacidad text-3xl/4xl — align to one scale.
- FAQ question h3 `text-lg font-medium` (FAQSection.tsx:19) lighter than sibling h3s.

## 6. Dark mode

- Implementation correct (class strategy, head init — no flash, dark default). No toggle (see §3). Redundant no-op variants (Footer.astro:9, TestimonialsSection.astro:6, [slug].astro:48) — cleanup.
- No component breaks dark mode (all `text-neutral-text`/`text-secondary` carry `dark:` pairs).

## 7. Logo

- Version selection correct; favicons OK (`/brand/favicon.ico`, mark-32/180). Min-size risk in scrolled header (~43 px vs 120 px book minimum). Unused assets in `public/brand/` shipped to dist: `logo-mark.png`, `mark-512.png`, `logo.jpg` (~94 KB noise).

## 8. Top design actions (feed PROJECT_PLAN HC-3xx)

1. Delete `src/index.css` + `accent.*` tokens/variants (HC-302).
2. Recolor black CTA → `bg-primary` (HC-304).
3. Decide dark-only vs toggle + document proportion (BI-12, HC-305).
4. Heading weight/scale alignment (HC-308).
5. Fix malformed SVG icon in `services.ts:28` (console error on every home load) (HC-303).
6. Replace accent-yellow pill fallback (HC-306).
7. Logo min-size + unused brand assets (HC-309).