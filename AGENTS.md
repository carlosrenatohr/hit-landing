# AGENTS.md — Hit Cargo Web v1.2

## Workspace context

This sub-repo (`hit-cargo-web-v-1.2`) is one of five in the workspace. The **canonical** AGENTS.md lives at the workspace root (`/hit/AGENTS.md`) and covers cross-repo architecture, coding standards, CI/deploy, security, and agent workflow. This file only adds repo-specific context for working on the public site.

This repo is **indexed in Codebase Memory** (knowledge graph de código). **Preferir MCP tools sobre grep/glob/read:**

1. **`search_graph`** — encontrar funciones/componentes/routes por patrón (BM25 o regex)
2. **`trace_path`** — ver quién llama una función antes de tocarla (impact analysis)
3. **`get_code_snippet`** — leer código de un símbolo exacto (no archivos enteros)
4. **`detect_changes`** — antes de refactor significativo, cuantificar blast radius
5. **`get_code_snippet` solo** para el símbolo exacto necesario

**Nunca leer un archivo entero si no es el que estás editando.** Para strings literales/configs usar `grep` con `include` filter.

### Standards (mirror del workspace AGENTS.md)
- **Stack:** Astro 6 (SSG) + Preact 10 para islas; `.astro` por defecto, `.tsx` solo con state/evento.
- **.nvmrc:** Node 22. **packageManager:** pnpm@10.32.1.
- **Gate:** `pnpm check` = `vitest run && astro build`.
- **Tailwind utilities** — sin `style=""` inline (CSP3 bloquea).
- **GTM hash pinneado** — no reformatear el snippet en Layout.astro (rompe CSP).
- **Dark mode init** en `<head>` antes de cualquier JS (public/scripts/dark-mode-init.js).
- **Env:** `.env` con `PUBLIC_API_URL` (worker). Si vacío → falling stone page; el coming-soon solo con valor `""`.
- **Commits:** Conventional Commits en inglés, atómicos. Author: `Renato <honchkrow1995@gmail.com>`.

### Local dev
```bash
pnpm install
pnpm dev          # localhost:4321, sin CSP
pnpm build        # genera dist/
pnpm preview      # sirve dist/ (sin _headers)
pnpm test         # vitest
```

### Brand book
Fuente de verdad: `docs/marketing/brand-color-system.md`; `tailwind.config.js` lo implementa.
- Paleta: Naranja HIT `#FF7A00` + navy `#14213D` + negro `#111111`; proporción 70/20/10. Dark mode default.
- Tipografía: Montserrat (títulos) + Poppins (cuerpo), Google Fonts.
