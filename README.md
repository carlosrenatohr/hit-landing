# Hit Cargo Web v2.0

Modern web architecture for Hit Cargo Nicaragua, built with Astro 5 and Preact.

## Why this stack?
We migrated from a traditional React SPA to **Astro + Preact** to achieve:
- **Zero-JS by Default:** Sections like Hero, Services, and Footer are rendered as pure HTML, drastically reducing Time to Interactive (TTI) on mobile devices with limited connectivity.
- **Island Architecture:** Only interactive components (Tracking Portal) load JS, isolated from the rest of the static page.
- **MPA Architecture:** Native browser routing improves SEO and link sharing compared to hash-based routing.
- **Preact Integration:** Optimized bundle size (3KB) while maintaining a familiar component-based development workflow.

## Stack
- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation by default)
- **UI Library:** [Preact](https://preactjs.com/) (Used for interactive islands)
- **Styling:** Tailwind CSS + Tailwind Animate
- **Package Manager:** pnpm
- **Icons:** Lucide Preact
- **Testing:** Vitest

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Development server:**
   ```bash
   pnpm dev
   ```
   Access at `http://localhost:4321`

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Testing:**
   ```bash
   pnpm test
   ```

## Project Structure
- `src/layouts/`: Base HTML templates and global styles.
- `src/pages/`: File-based routing (each `.astro` file is a route).
- `src/components/`:
  - `*.astro`: Static components (Header, Footer, Hero) - 0KB JS sent to browser.
  - `*.tsx`: Preact components for interactivity (Forms, Portals). Use `client:load` or `client:visible` directives in `.astro` files to hydrate.
- `src/utils/`: Shared logic and helper functions.

## Development Guidelines
- **Performance first:** Keep components as `.astro` whenever possible. Only use `.tsx` (Preact) if you need state or user interaction.
- **Styling:** Use Tailwind utility classes. Avoid custom CSS unless necessary (global variables are in `src/styles/global.css`).
- **Tests:** Every new utility or complex logic in `src/utils/` should have a corresponding `.test.ts` file.
- **Imports:** Use `@/` alias for absolute paths from `src/`.

## Deployment
Optimized for deployment on **Cloudflare Pages**, **Vercel**, or **Netlify**. Astro detects the environment and builds accordingly.
