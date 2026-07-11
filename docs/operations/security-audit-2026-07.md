# Security & correctness audit — hit-cargo-web (julio 2026)

Auditoría del sitio público (Astro SSG + Preact, Cloudflare Pages). **Sin vulnerabilidad crítica/alta
explotable:** la intersección CSP header+meta bloquea scripts inline inyectados (verificado: el meta
`script-src` no tiene `'unsafe-inline'`, solo hashes), input validado+encodeado, salida escapada, sin
secretos commiteados. Los items abajo son endurecimiento y un bug de UX real en el tracker.

## Arreglado en esta PR

| Sev | Qué | Fix |
|-----|-----|-----|
| MED | **Faltaba HSTS** en `public/_headers` (la doc afirmaba que estaba). Cloudflare Pages no lo agrega solo. | `Strict-Transport-Security: max-age=31536000; includeSubDomains`. |
| MED | **Tracker: error/analytics fantasma al abortar.** El `catch` trataba TODO abort como fallo; cerrar el overlay o una búsqueda que reemplaza a otra reabría "No pudimos consultar" y empujaba un `track_search`/`timeout` falso a GTM. | Flag `timedOut` explícito + guardas en `catch` (ignora superseded/close); `close()` limpia `abortRef`. |
| LOW | CSP `img-src` tenía `https:` comodín (canal de exfil residual). | Se quitó; quedan solo los hosts de analytics enumerados. |
| LOW | Meta CSP solo llevaba `script-src`/`style-src`; sin `object-src`/`base-uri` (se pierden fuera de Cloudflare, ej. `astro preview`). | `directives: ["object-src 'none'","base-uri 'self'"]` en `astro.config.mjs`. |
| LOW | Links sociales del footer con `target="_blank"` sin `rel` (reverse tabnabbing). | `rel="noopener noreferrer"`. |
| LOW | A11y: toggle móvil sin label; dropdown "Servicios" sin `aria-haspopup`. | `aria-label`/`aria-expanded` en el toggle; `aria-haspopup` en Servicios. |
| INFO | 28 archivos `*:Zone.Identifier` (cruft de Windows) trackeados. | `git rm` + `.gitignore`. |

Gate `pnpm check` (vitest + astro build) verde. Meta CSP verificado en `dist/` (ahora con object-src/base-uri); HSTS e img-src verificados en `_headers`.

## Recomendado (no en esta PR)

- **[LOW→MED] Dependencias con advisories.** `pnpm audit` reporta ~22 hallazgos (Astro: XSS por slot/atributos, SSRF Host-header en error page prerender; vite/undici/esbuild dev-only). **Exposición real baja** (SSG puro, sin SSR/slots dinámicos), pero conviene `pnpm update astro vite @astrojs/preact @astrojs/rss` y re-auditar en su propia PR (update de Astro puede cambiar comportamiento → verificar aparte). **Corregir también la afirmación "0 vulnerabilidades / 8.5-9/10" de `security-deployment-guide.md`** (ya no es cierta).
- **[LOW] A11y completa:** hacer el dropdown "Servicios" operable por teclado (abrir con foco/click + `aria-expanded` con estado), y mover/atrapar/restaurar foco en el modal de resultado del tracker.
- **[INFO] Restos del SPA React** (`src/App.tsx`, `src/main.tsx`, `HomePage.tsx`…) — huérfanos de la migración; borrarlos tras confirmar que el build Astro no los referencia.
- **`security-deployment-guide.md`** dice HSTS "con preload": esta PR agrega HSTS **sin** `preload` (compromiso difícil de revertir). Agregá `preload` + registrá en hstspreload.org **solo** cuando confirmes que todos los subdominios son HTTPS.

## Cloudflare — endurecer al 100% (lo que querés aprender)

Ya está bien: CSP hash-based (bloquea inline inyectado), headers de seguridad completos (`frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`), `connect-src` scopeado, CI que corre el gate. Siguiente nivel:

1. **HSTS preload** (ver arriba) una vez confirmado todo-HTTPS → máxima protección contra downgrade.
2. **WAF Managed Rules** (gratis en el plan) + **Bot Fight Mode**: bloquean patrones de ataque y bots antes de llegar al sitio.
3. **Rate Limiting Rules** a nivel edge para `/track` y cualquier form, como capa extra a la del Worker.
4. **Turnstile** (CAPTCHA sin fricción de Cloudflare) en formularios si aparece spam — ya tenés el skill para integrarlo.
5. **Cloudflare Web Analytics** (sin cookies) ya está; revisar que GTM no cargue tags de terceros no auditados (cada tag corre con los permisos del CSP).
6. **TLS "Full (strict)"** + **Always Use HTTPS** + **Automatic HTTPS Rewrites** en el dashboard.

## Verificado como correcto

- CSP header∩meta bloquea `<script>` inyectado (meta sin `'unsafe-inline'`, solo hashes); hash de GTM válido.
- Sin secretos commiteados (`.env` gitignored, solo `PUBLIC_API_URL`).
- Input del tracker validado (`^[\w-]+$`, ≤64) + `encodeURIComponent`; sin SSRF/path-traversal; sin open-redirect (`?number=` validado, ruta relativa fija).
- Sin XSS del JSON del worker (todo escapado por Preact); `set:html` solo en contenido estático (JSON-LD, SVG hardcodeados).
- Anti-abuso: honeypot + throttle cliente + timeout `AbortController`; timezone del tracker intencional (`UTC`, documentado).
