# Hit Cargo Web v1.2

Sitio público de [HIT CARGO Nicaragua](https://hit-cargo.com), construido con Astro 6 + Preact y desplegado en Cloudflare Pages.

> Para contexto completo del proyecto (negocio, equipo, decisiones técnicas, restricciones), abrir [CLAUDE.md](CLAUDE.md).
>
> Si trabajás dentro del workspace `hit/` (sitio + worker `hit-ever2` + otros), el mapa de prioridades y enlaces vive un nivel arriba en [`../CLAUDE.md`](../CLAUDE.md).

## Stack

| | |
|---|---|
| Framework | Astro 6.1 |
| UI interactiva | Preact 10 vía `@astrojs/preact` |
| Estilos | Tailwind CSS 3.4 |
| Bundler | Vite 8 |
| Tests | Vitest 4 |
| Hosting | Cloudflare Pages |
| Analítica | GTM (`GTM-K55VC9JZ`) + Cloudflare Web Analytics |

## Arrancar

```bash
pnpm install
pnpm dev           # http://localhost:4321 — sin CSP enforcement
pnpm build         # genera dist/
pnpm preview       # astro preview de dist/ — sigue sin _headers
pnpm test
```

Para validar el CSP igual que producción (con `public/_headers` aplicado):

```bash
pnpm build
wrangler pages dev dist --compatibility-date=2026-04-28
```

## Estructura corta

- `src/components/` — `*.astro` por defecto (zero-JS), `*.tsx` solo si necesita estado o interacción.
- `src/layouts/Layout.astro` — `<head>` global, snippet GTM, CSP coordinado.
- `src/pages/` — routing basado en archivos (`index.astro`, `track.astro`).
- `public/` — estáticos + `_headers` + `_redirects` que Cloudflare Pages aplica directo.
- `docs/` — documentación organizada por dominio: `business/`, `operations/`, `guides/`, `marketing/`, `history/`. Detalle del índice en [CLAUDE.md](CLAUDE.md).

## Por qué este stack

- **Astro:** el sitio es 90% contenido estático. Servir HTML puro baja TTI dramáticamente en 3G/LTE, que es lo que tienen muchos usuarios reales en Nicaragua.
- **Island architecture:** solo el `<Header>`, el tracking portal y la FAQ cargan JS. El resto es HTML puro.
- **Preact:** misma API que React con 3 kB de runtime. La parte interactiva es chica y no se justifica el peso de React.

## Convenciones rápidas

- Por defecto `.astro`. Solo `.tsx` Preact si hay estado o evento.
- Tailwind utilities; CSS custom solo cuando lo que ofrece Tailwind no alcanza.
- Imports con alias `@/` apuntando a `src/`.
- **Evitar atributos `style="..."` inline** — el CSP basado en hashes los bloquea. Usar clases.

## Deploy

Push a `master` → Cloudflare Pages dispara build automático y promueve a producción. Branches feature obtienen un preview en `<branch>.<project>.pages.dev`. No hay configuración adicional, está conectado vía GitHub.

## Documentación viva

| Tema | Archivo |
|---|---|
| Contexto completo del proyecto | [CLAUDE.md](CLAUDE.md) |
| Cambios por versión | [CHANGELOG.md](CHANGELOG.md) |
| Modelo de negocio | [docs/business/company-overview.md](docs/business/company-overview.md) |
| Roadmap maestro | [docs/business/master-plan-2024-2026.md](docs/business/master-plan-2024-2026.md) |
| Seguridad y deploy | [docs/operations/security-deployment-guide.md](docs/operations/security-deployment-guide.md) |
| Auditoría SEO y copy | [docs/marketing/copy-seo-audit.md](docs/marketing/copy-seo-audit.md) |
| Tutorial GitFlow | [docs/guides/gitflow-tutorial.md](docs/guides/gitflow-tutorial.md) |
