# Migration Plan: Hit Cargo Web 2.0

## Status: Completed

### Technical Rationale
The original React SPA architecture served its purpose for the MVP but presented several bottlenecks for the growth plans in Nicaragua:
1.  **Bundle Size:** React + ReactDOM + Lucide-React added ~150KB of JS before the first paint.
2.  **SEO:** Content was indexed less effectively due to client-side rendering.
3.  **Connectivity:** In regions with intermittent 3G/LTE, the SPA "blank screen" during initial load was a high bounce-rate risk.

### Changes Implemented
1.  **Framework Shift:** Migrated from Vite + React SPA to **Astro 5**.
2.  **Interactivity with Preact:** Replaced React with **Preact 10** for interactive components (Tracking, FAQ, Menu). This reduced the JS framework weight by ~90%.
3.  **Package Management:** Standardized on **pnpm** for deterministic builds and faster CI/CD.
4.  **Static first:** Components like Hero, Footer, and Services are now 0-JS Astro components.
5.  **Clean URLs:** Navigation changed from hash-based (`/#/track`) to native paths (`/track`).

### Verification Steps
- Unit tests for tracking number validation are passing (`pnpm test`).
- Production build is stable (`pnpm build`).
- Dark mode state is preserved via inline scripts in the Layout.
