# Playbook de feature — roles, orden y handoff

> Guion para abordar cualquier feature con agentes (humanos o IA), uno por rol, en orden, con el estado en un artefacto compartido.
> Plantilla portable. Pieza ejecutable: `scripts/feature.sh` (bootstrap) + `/feature` (driver). Marco conceptual: [../guides/ai-agent-workflow.md](../guides/ai-agent-workflow.md). Gate de calidad: [../operations/delivery-harness.md](../operations/delivery-harness.md).

## La idea en una frase

Una feature es una secuencia de **fases**; cada fase la ejecuta un **rol** angosto con contexto fresco; el **estado pasa por un archivo**, no por la memoria de un agente.

Por qué importa: si el estado vive en un artefacto (`.feature/<slug>.md`), cualquier agente —u otra persona, u otro modelo— puede tomar la fase siguiente leyendo el archivo. Ningún agente es punto único de fallo. Es la misma lógica del harness: la confianza vive en lo verificable (el artefacto, el gate), no en quién hizo el trabajo.

## Las fases y sus roles

Cada fila es un agente distinto, invocado en orden. Un agente hace **una** fase y para.

| # | Fase | Rol | Lee | Produce (escribe al artefacto) | Gate de salida |
|---|---|---|---|---|---|
| 1 | Explore | Explorador (solo lectura) | repo, CLAUDE.md | mapa de archivos, riesgos, decisiones previas | — |
| 2 | Plan | Planificador | salida de Explore | plan revisable, archivos a tocar | aprobación humana |
| 3 | Build | Constructor | plan aprobado | cambios atómicos | — |
| 4 | Verify | (el harness, no un agente) | el diff | resultado del gate | **`pnpm check` verde** |
| 5 | Review | Revisor adversarial | el diff | hallazgos severidad-tagged | sin findings Alta abiertos |
| 6 | Ship | Encargado de entrega | rama verde | PR, CI, merge, smoke | CI verde + smoke OK |

Regla de oro: **no se salta el paso 4.** Build sin Verify es "creo que funciona"; con Verify es "el gate confirma".

## El loop

```
scripts/feature.sh <slug>      # bootstrap: crea artefacto + dice qué sigue
   └─> /feature <slug>         # driver: ejecuta la fase actual con su rol
          └─> actualiza .feature/<slug>.md, avanza la fase
                 └─> /feature <slug>   # otra vez, fase siguiente
                        └─> ... hasta Ship
```

Cada `/feature <slug>` ejecuta **una sola fase** (un rol) y deja el estado escrito. Eso es "levantar de a poco cada rol": no se hace todo de un saque, se avanza fase por fase, cada una con su agente.

## Por qué un agente nuevo por fase (y no uno que lo haga todo)

- **Contexto limpio** = mejores resultados. Un explorador no necesita saber cómo se revisa; un revisor no necesita el ruido de la exploración.
- **Rol angosto** = menos margen de error. Cada agente tiene un solo objetivo y un solo criterio de éxito.
- **Intercambiable** = robusto. Si una fase falla, se reintenta esa fase sola, leyendo el mismo artefacto. No se pierde el trabajo de las otras.
- **Paralelizable cuando aplica** — si dos features son independientes, dos loops corren a la vez sin pisarse (cada uno su artefacto).

## Reglas

- Una invocación de `/feature` = una fase. No encadenar fases en una sola corrida.
- El artefacto `.feature/<slug>.md` es la fuente de verdad de la feature. La memoria del agente no.
- Explore es solo lectura: no toca código.
- Plan se aprueba antes de Build. Plan barato evita Build caro y equivocado.
- Verify (gate) no es opcional ni se marca verde en rojo.
- Commits atómicos, sujeto de una línea (convención del repo).

## Cómo practicar

1. `scripts/feature.sh gtm-eventos "eventos de conversión en GTM"` → crea `.feature/gtm-eventos.md` y te dice qué sigue.
2. En Claude Code: `/feature gtm-eventos` → corre Explore, escribe hallazgos, marca la fase.
3. Repetí `/feature gtm-eventos` → Plan. Aprobás.
4. Repetí → Build. Luego Verify (gate). Luego Review. Luego Ship.

Mirás el artefacto entre pasos para ver cómo el estado se acumula en el archivo. Ahí se entiende el patrón.

## Nivel 2 (cuando ya lo domines)

- Definir cada rol como **subagente** dedicado en `.claude/agents/` (sistema-prompt propio por rol) en vez de delegar inline.
- Hacer que `scripts/feature.sh` cree la rama y abra el PR borrador automáticamente.
- Correr Explore en fan-out: varios exploradores en paralelo sobre subsistemas distintos.
