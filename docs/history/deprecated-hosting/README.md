# Configs de hosting deprecadas

Archivados el 2026-06 durante la consolidación de hosting (plan MVP, fase A0).

El sitio se despliega **exclusivamente en Cloudflare Pages** (ver `CLAUDE.md` → Deploy y
`public/_headers` / `public/_redirects`). Estos dos archivos eran configuraciones alternativas
para Netlify y Vercel que ya no se usan y generaban ambigüedad en la raíz del repo.

Además quedaron **inconsistentes**: su `script-src 'self'` (sin `'unsafe-inline'` ni el dominio de
GTM) rompería Google Tag Manager y la hidratación de Astro si alguna de esas plataformas estuviera
activa. La política CSP vigente y correcta vive en `public/_headers` (header) + `astro.config.mjs`
(`security.csp`, meta con hashes).

Si en el futuro se evalúa migrar de hosting, estos archivos sirven de punto de partida pero deben
revisarse contra la CSP actual antes de reutilizarse.

- `netlify.toml`
- `vercel.json`
