# Backlog y mapa de progreso

> Fuente de verdad operativa, versionada en git. Ventana de 2 semanas, alineada al [plan maestro 2024-2026](business/master-plan-2024-2026.md) (el *qué/por qué* estratégico) y al [delivery-harness](operations/delivery-harness.md) (el *cómo* entregar).
> Última actualización: **16 de junio de 2026**. Mantener esta fecha al editar.

## Cómo se usa

- **Estados**: `Backlog` → `En progreso` → `En revisión` → `Hecho`.
- **Un owner por tarea.** Nada de "todos y nadie". Si nadie es owner, no está en progreso.
- La verdad está aquí, en git. El plan maestro fija dirección y fases; este archivo fija qué se toca *ahora*.
- Se revisa en la reunión quincenal. Lo que sale de la ventana de 2 semanas vuelve a `Backlog`.
- Cada tarea de código cierra solo cuando pasa el harness (gate verde), no cuando "parece hecho".

## Estado actual verificado (2026-06-16)

Verificado contra el código y contra el worker en vivo, no contra lo que dice la doc.

| Capacidad | Estado real | Nota |
|---|---|---|
| Migración React → Astro 6 | ✅ Hecho | Confirmado en `package.json` e historial |
| SEO base + JSON-LD LocalBusiness + sitemap | ✅ Hecho | Horario Lun–Vie correcto (sin domingos) |
| Dark mode persistente sin flash | ✅ Hecho | `dark-mode-init.js` en `<head>` |
| Headers de seguridad + CSP endurecido | ✅ Hecho | Header + meta coordinados, hash GTM pinneado |
| GTM container instalado | ✅ Hecho | `GTM-K55VC9JZ`, pinneado por hash |
| GTM — eventos de conversión | ⚠️ **No iniciado** | Cero `dataLayer.push` en `src/`. Pageviews sí, eventos no. |
| Tracking — UI | ✅ Hecho | `TrackingPortal.tsx` funcional |
| Tracking — integración API real (`hit-ever2`) | ✅ Hecho | `fetch` real a `/track/:guia` + `PUBLIC_API_URL`, estados loading/ok/notfound/error. Worker en prod con datos reales (verificado e2e). Falta fijar `PUBLIC_API_URL` en Cloudflare Pages. |
| CI / gates de entrega | ⚠️ **Parcial** | `ci.yml` corre `pnpm check` en PR (ambos repos). Falta: protección de rama y `typecheck`+`lint` en el gate. Nivel ~L1. |
| Backlog vivo | ✅ Hecho | Este archivo |

## En progreso

| Tarea | Owner | Rama | Estado | Bloqueante |
|---|---|---|---|---|
| Páginas MVP + conectar tracking al worker + harness | Renato | `feat/mvp-pages-tracker` | En revisión | Sin mergear a `master`: falta abrir PR + protección de rama |
| Plan de marketing (versionar y reubicar) | Abi | `feat/gtm-tracking` | En progreso | `MARKETING_LAUNCH_PLAN.md` untracked, mover a `docs/marketing/` |

## Pendiente priorizado

Mapeado a las fases del plan maestro. Prioridad hereda de la [auditoría](operations/audit-2026-06.md).

### P0 — fundación (cierra brechas de auditoría #1, #2, #4)

- [~] **Harness L1 (parcial)**: `ci.yml` + `pnpm check` ya existen en ambos repos. **Falta**: añadir `typecheck`+`lint` al gate (`check` hoy solo corre tests+build) y **protección de rama** en `master`/`main`. (Renato) → harness F0–F3
- [x] **Corregir doc de estado**: hecho (corte 2026-06-16) — CLAUDE.md/backlog/README de ever2 alineados a que tracking está conectado, no stub. (Renato)
- [x] **`.env.example`**: hecho — documenta `PUBLIC_API_URL` (worker). (Renato)

### P1 — medir y conectar (Fase 1–2 del plan maestro)

- [ ] **Eventos GTM de conversión**: `dataLayer.push` en submit de formulario, click a WhatsApp, búsqueda de tracking. Sin esto el objetivo 1 no es medible. (Renato/Abi)
- [x] **Integración tracking → `hit-ever2`**: hecho — `fetch` real, env vars (`PUBLIC_API_URL`), estados error/loading/notfound. **Pendiente operativo**: fijar `PUBLIC_API_URL` en Cloudflare Pages (prod) para que `/track` no muestre *coming-soon*. (Renato) → Fase 4 plan maestro
- [ ] **Smoke test post-deploy**: script que valide prod 200 + headers + JSON-LD tras el deploy. (Renato) → harness F5
- [ ] **Subir cobertura de tests**: empezar por utils y lógica de tracking; umbral en CI. (Renato) → harness L2

### P2 — higiene y profundidad

- [ ] **Podar ramas muertas**: `feature/astro-migration`, `fix/redirects-cloudflare`, `feat/web-sec-launch`, `improve/seo-audit-copy`, `version/1_0-bolt`, `staging` (revisar cuáles ya mergeadas). (Renato)
- [ ] **Docs faltantes**: onboarding/setup, testing strategy, troubleshooting, ADRs (CSP dual, dark-mode-init), integración `hit-ever2`. (Renato)
- [ ] **Lighthouse CI + presupuesto de bundle** en PR. (Renato) → harness L2
- [ ] **Monitoreo continuo**: Dependabot/Renovate + uptime. (Renato) → harness L3/F6

## Historial → planning (mapa de progreso)

Línea de tiempo del repo alineada a la versión de planning vigente. Confirma de dónde viene cada capacidad.

| Hito | Commit(s) | Versión planning |
|---|---|---|
| Migración a Astro 5 + Preact (v2.0) | `bb2693a` | inicio post-migración (ver [migration-plan](history/migration-plan.md)) |
| SEO: sitemap, robots, meta | `be13af4`, `1b9a08c` | base SEO |
| Contenido + JSON-LD + scraper plan inicial | `a1aad93`, `28c16d0` | — |
| Headers de seguridad + 0 vulnerabilidades | `4cd4435` | endurecimiento |
| Fix `_redirects` Cloudflare | `30791f7` | — |
| Endurecer CSP (quitar `unsafe-inline`) | `bca07d9` | seguridad |
| Integrar GTM con CSP estricto | `6da33c6` | analítica (container) |
| Company overview | `a5ebedb` | doc de negocio |
| Fix CSP para Cloudflare Web Analytics | `aede281` | analítica |
| Reorg de docs por dominio | `1354d16` | doc (vigente) |
| **Este corte**: auditoría + harness + workflow IA + backlog | _por commitear_ | **planning vigente: plan maestro 2024-2026** |

Documento rector de negocio: [master-plan-2024-2026.md](business/master-plan-2024-2026.md). El [master-plan-2025](history/master-plan-2025.md) está superado; no usarlo para fechas.

## Relación con otros documentos

- **Qué/por qué** → [plan maestro 2024-2026](business/master-plan-2024-2026.md)
- **Por qué falta** → [auditoría junio 2026](operations/audit-2026-06.md)
- **Cómo entregar con red** → [delivery harness](operations/delivery-harness.md)
- **Cómo trabajar con IA dentro del harness** → [ai-agent-workflow](guides/ai-agent-workflow.md)
