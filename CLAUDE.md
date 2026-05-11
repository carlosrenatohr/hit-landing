# CLAUDE.md — Hit Cargo Web v1.2

Guía técnica del sitio público de HIT CARGO Nicaragua. Documento de referencia para cualquier persona —humana o agente IA— que vaya a trabajar sobre este repositorio.

> Este archivo cubre el **cómo** del sitio. El **qué/por qué** del negocio vive en [docs/business/company-overview.md](docs/business/company-overview.md) y el roadmap en [docs/business/master-plan-2024-2026.md](docs/business/master-plan-2024-2026.md).

---

## Sobre HIT CARGO

Empresa de logística internacional con sede en Nicaragua. Funciona como freight forwarder: el cliente compra en cualquier ecommerce, envía a la dirección de HIT CARGO en Miami, y HIT CARGO se encarga de traer la mercancía a Nicaragua —aéreo o marítimo, según urgencia y volumen— y gestionar nacionalización, aduana y entrega final.

**Lo que es:** intermediario logístico, asesor de compras internacionales, facilitador de importaciones US/China/Panamá → Nicaragua.

**Lo que no es:** tienda online, marketplace, distribuidor. No vende producto propio, no maneja inventario, no opera estilo Shein/Amazon. Este matiz es importante porque a veces aparece en copy o en propuestas de UX que confunden los dos modelos.

**Servicios:** envío aéreo (rápido, por libra), marítimo (consolidación, volumen), recepción en Miami, nacionalización aduanal, entrega a domicilio en Nicaragua, y asesoría de compras antes de ordenar (validación de links, recomendaciones, tips de ahorro). Entrega nacional es gratuita, no se trabaja domingos.

**B2B:** importación de maquinaria y repuestos, asesoría técnica, facturación formal, líneas de crédito a 7 o 15 días según volumen.

## Identidad visual

- Paleta: naranja + negro como base. Estética sobria, moderna, oscura sin ser pesada, con guiños cinematográficos (la referencia interna es la dirección de arte de GTA VI). Dark mode es default.
- Tipografía: Inter (Google Fonts).
- Tono de comunicación: cercano y profesional. Educativo cuando hace falta. Cero hype de marketing.

## Equipo y ritmo

| Persona | Rol | Foco |
|---|---|---|
| Renato | Desarrollo, infra, automatización | PRs, Cloudflare, integraciones, este repo |
| Mayqueline | Atención al cliente, branding, diseño | Copy de marca, fotos, comunicación con cliente |
| Abi | WhatsApp Business, redes, contenido | Plantillas, calendario, respuestas |

Tres personas part-time, ~10-15 h/semana en conjunto. No prometer fechas fijas al público que dependan de más de un sprint de una o dos semanas.

---

## Stack

| | |
|---|---|
| Framework | [Astro 6.1](https://astro.build/) — SSG por defecto, island architecture |
| UI interactiva | [Preact 10.29](https://preactjs.com/) vía `@astrojs/preact` 5.1 (3 kB de runtime vs 45 kB de React) |
| Estilos | Tailwind CSS 3.4 + Tailwind Animate |
| Bundler | Vite 8.0 |
| Tests | Vitest 4.1 |
| Hosting | Cloudflare Pages (producción), preview en `*.pages.dev` |
| Analítica | Google Tag Manager (`GTM-K55VC9JZ`) + Cloudflare Web Analytics |

Por qué Astro: el sitio es 90% contenido estático. Servir HTML puro y meter JS sólo donde hay interacción (header, tracking, FAQ) baja el TTI dramáticamente en 3G/LTE, que es el escenario real de muchos usuarios en Nicaragua.

Por qué Preact: misma API que React pero ~15× menos peso. La parte interactiva es chica, no se justifica el peso de React.

---

## Estructura del proyecto

```
hit-cargo-web-v-1.2/
├── src/
│   ├── components/
│   │   ├── home/        # Secciones de la landing
│   │   ├── layout/      # Header, Footer
│   │   ├── preact/      # Islands interactivos
│   │   ├── seo/         # JSON-LD y meta
│   │   └── ui/          # Reutilizables
│   ├── config/          # site.ts, seo.ts
│   ├── content/         # copy.ts, services.ts, meta.ts
│   ├── layouts/         # Layout.astro (head global, GTM, CSP)
│   ├── pages/           # index.astro, track.astro
│   ├── styles/          # global.css
│   └── utils/           # tracking.ts y helpers
├── public/              # estáticos + _headers, _redirects
└── docs/
    ├── business/        # plan maestro, company overview, scraper, image plan
    ├── operations/      # CSP, CI/CD, deploys, seguridad
    ├── guides/          # tutoriales para el equipo
    ├── marketing/       # SEO audit, copy, T&C de promos
    └── history/         # docs archivados / superseded
```

## Trabajar sobre el sitio

```bash
pnpm install
pnpm dev          # localhost:4321, sin CSP
pnpm build        # genera dist/
pnpm preview      # sirve dist/ con astro preview (sin _headers)
pnpm test         # vitest

# Para validar CSP localmente como Cloudflare Pages:
wrangler pages dev dist --compatibility-date=2026-04-28
```

Convenciones:

- Por defecto, componente `.astro`. Si necesita estado o evento de usuario, `.tsx` Preact.
- Tailwind utilities; CSS custom sólo si lo de Tailwind no alcanza.
- Imports con alias `@/` apuntando a `src/`.
- TypeScript en utils y componentes Preact.
- Tests `.test.ts` junto al utility cuando hay lógica no trivial.

---

## Decisiones técnicas que conviene conocer antes de tocar

### CSP coordinado (header + meta)

El sitio tiene dos políticas CSP que el navegador intersecta:

1. **Header CSP** (`public/_headers`, sirve Cloudflare Pages): permisivo en inline (`'unsafe-inline'`), restrictivo en dominios externos.
2. **Meta CSP** (auto-generado por Astro `security.csp` en `astro.config.mjs`): hashes específicos para cada `<script>`/`<style>` inline bundled por Astro + el snippet de GTM.

El meta es el cuello de botella: un script XSS inyectado no matchea ningún hash y queda bloqueado, aunque el header lo permitiera. Esto **preserva el endurecimiento** que se buscó en el commit `bca07d9` (quitar `unsafe-inline` general) sin romper la hidratación de Astro, que es lo que pasó originalmente cuando se hardenizó sin proveer hashes.

**Consecuencia para devs:** evitá atributos `style="..."` inline en componentes. CSP3 ignora `'unsafe-inline'` cuando hay hashes en la directiva, así que los atributos inline quedan bloqueados. Usá clases Tailwind.

### GTM hash pinneado a bytes exactos

El snippet de GTM en `Layout.astro` está pinneado por hash SHA-256 en `astro.config.mjs`. Cualquier reformateo de esa línea cambia el hash y rompe el CSP. Hay un `prettier-ignore` justo encima del `<script>` para evitar formatters agresivos. Si necesitás modificar el snippet (ej. para cambiar el ID), recalculá el hash:

```bash
printf %s "<contenido exacto del script>" | openssl dgst -sha256 -binary | openssl base64
```

### Dark mode inicializado antes del render

`/scripts/dark-mode-init.js` se carga en el `<head>` antes que cualquier otro JS para evitar el flash claro→oscuro. Sirve desde `public/`, no es bundled. Si lo movés o lo bundleás, el flash vuelve.

### Headers de cache agresivos

Assets con hash en el filename (`*.js`, `*.css`, `*.woff2`) tienen `max-age=31536000, immutable`. `index.html` tiene `no-cache`. Esto está en `public/_headers`.

---

## Reglas de negocio que afectan al código y al copy

Algunas decisiones del negocio aparecen disfrazadas como decisiones de UX. Listo las más comunes:

- **Dirección Miami obligatoria.** El cliente compra y envía a la dirección de Miami; nunca a Nicaragua directamente. El flujo es siempre `cliente → Miami → Nicaragua`. Esto debe quedar claro en el copy, en los pasos del "cómo funciona" y en cualquier tutorial.
- **No domingos.** No se trabaja domingos. El JSON-LD del Local Business lo refleja (`openingHoursSpecification` cubre Mon–Fri).
- **Entrega nacional gratis.** Está incluida en el flete. No es un upsell.
- **Crédito empresarial a 7/15 días.** Para B2B, depende del volumen. No publicar términos específicos; remitir a contacto.
- **No haul/unboxing.** El contenido de redes no debe imitar el estilo de creadores de ecommerce. La voz es logística profesional, no influencer.

## Estado actual

- ✅ Migración React SPA → Astro completada (ver `docs/history/migration-plan.md`).
- ✅ Tracking básico vía Preact.
- ✅ SEO base, JSON-LD de Local Business, sitemap automático.
- ✅ Dark mode persistente.
- ✅ Headers de seguridad (CSP, HSTS, X-Frame, etc.) — ver `docs/operations/security-deployment-guide.md`.
- ✅ Google Tag Manager integrado (mayo 2026).
- 🚧 Tracking conectado a la API real (`hit-ever2`) — en progreso.
- 📋 Portal de clientes con auth, dashboard admin, sistema de notificaciones — roadmap a 6-18 meses, ver plan maestro.

## Performance que queremos defender

- FCP < 1.5 s, TTI < 3 s, CLS < 0.1.
- Lighthouse mobile > 90.
- JS bundleado < 100 kB gzip, CSS < 50 kB gzip.

Si una feature nueva pasaría de esos números, replantear antes de mergear.

## Deploy

Push a `master` → Cloudflare Pages dispara build automático → si pasa, deploya a producción. Branches feature obtienen un preview en `<branch-hash>.<project>.pages.dev`. No hay configuración adicional, está conectado vía GitHub.

Build settings de referencia:

```yaml
Build command:    pnpm build
Output directory: dist
Node version:     20.x
```

---

## Documentos relacionados

**Negocio**
- [Company Overview](docs/business/company-overview.md) — modelo, identidad, servicios, restricciones
- [Plan Maestro 2024-2026](docs/business/master-plan-2024-2026.md) — canónico, roadmap, no-code
- [Image Plan](docs/business/image-plan.md) — banco visual y dirección de fotografía
- [Plan Scraper Everest](docs/business/everest-scraper-plan.md) — integración con hit-ever2

**Operaciones**
- [Security Deployment Guide](docs/operations/security-deployment-guide.md)
- [CI/CD Flow](docs/operations/ci-cd-flow.md)
- [Cloudflare Deployment](docs/operations/cloudflare-deployment.md)

**Marketing**
- [SEO + Copy Audit](docs/marketing/copy-seo-audit.md)
- [T&C Rifa Aniversario 2026](docs/marketing/terminos-condiciones-rifa-aniversario-2026.md)

**Equipo**
- [GitFlow Tutorial](docs/guides/gitflow-tutorial.md)

**Histórico**
- [CHANGELOG](CHANGELOG.md)
- [Migration Plan (Vite/React → Astro)](docs/history/migration-plan.md)
- [Plan Maestro 2025 (legado)](docs/history/master-plan-2025.md)

---

**Repositorio:** hit-cargo-web-v-1.2  ·  **Versión:** ver [CHANGELOG.md](CHANGELOG.md)  ·  **Última revisión:** mayo 2026
