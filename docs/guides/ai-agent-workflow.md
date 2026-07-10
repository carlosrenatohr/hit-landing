# Estilo de trabajo con agentes IA (multiagente)

> Diseño portable, alineado a la guía pública de Anthropic ("Building effective agents") y de OpenAI sobre agentes. Genérico primero; el [Apéndice A](#apéndice-a--este-repo) aterriza el caso de `hit-cargo-web`.
> Pieza complementaria del [delivery-harness.md](../operations/delivery-harness.md): el harness es el sistema de verificación; este documento es cómo se produce el trabajo que el harness verifica.

## La idea que ordena todo

Un agente IA no es de fiar por sí solo. Lo que lo vuelve confiable es el entorno donde opera: herramientas para actuar y un **bucle de feedback verificable** para corregirse. Por eso este documento y el harness son inseparables:

> El agente produce; el harness verifica. Multiagente acelera la producción; el gate garantiza la calidad.

No se mergea nada por venir de un agente capaz. Se mergea porque el gate está verde —exactamente igual que con código humano. Esto invierte la pregunta de "¿confío en este modelo?" a "¿mi harness atrapa los errores que cualquiera —humano o modelo— podría cometer?". La segunda es la pregunta correcta y es la que escala.

## Qué es un agente (modelo mental común a Anthropic y OpenAI)

Un agente es **un LLM + herramientas + un bucle**: el modelo decide una acción, la ejecuta con una herramienta, observa el resultado, y repite hasta cumplir un objetivo o alcanzar un límite. La diferencia con un workflow está en quién decide los pasos:

- **Workflow**: los pasos los fija el código (determinista, predecible). Preferir cuando la tarea es conocida.
- **Agente**: los pasos los decide el modelo (flexible, no determinista). Reservar para cuando el camino no se puede predibujar.

Regla de ambos vendors: **empezar por lo más simple que funcione**. Un prompt con buen contexto le gana a un agente; un agente le gana a una orquesta multiagente. Subir de complejidad solo cuando el resultado lo justifica, porque cada nivel agrega latencia, costo y modos de fallo.

## El ciclo de trabajo

Todo cambio —humano o asistido por IA— sigue el mismo ciclo. El harness aparece en el paso 4 y es no negociable.

1. **Explorar** — entender el código y las restricciones antes de tocar nada. (Agente de solo lectura / búsqueda.)
2. **Planear** — proponer un plan revisable *antes* de escribir. Para cambios no triviales, plan explícito que una persona aprueba.
3. **Implementar** — cambios pequeños y atómicos. Un commit = una idea.
4. **Verificar** — correr el harness local (`pnpm check`: tipos, lint, tests, build). El agente itera contra el gate hasta que está verde. **Acá es donde la IA se vuelve confiable: no entrega hasta que el check pasa.**
5. **Revisar** — diff revisado por una segunda mirada (persona o agente revisor adversarial). Severidad-tagged, sin elogios.
6. **Entregar** — PR → CI (F3 del harness) → merge → deploy → smoke (F5).

El paso 4 es la bisagra. Un agente sin gate produce código plausible-pero-roto; un agente con gate produce código que pasa el gate. El harness es lo que hace que "asistido por IA" no signifique "menos seguro".

## Cuándo usar multiagente (y cuándo no)

Multiagente vale la pena cuando el trabajo es **paralelizable e independiente**: tareas que no se pisan entre sí y cuyos resultados se juntan al final. No vale la pena para trabajo secuencial con dependencias fuertes, donde la coordinación cuesta más de lo que ahorra.

Patrones útiles, de menor a mayor:

- **Single agent + buen contexto** — el caso por defecto. La mayoría de las tareas.
- **Fan-out de lectura** — varios agentes de solo lectura mapean en paralelo distintas partes del repo (estructura, tests, deps). Devuelven hallazgos, tú sintetizas. Barato y de alto retorno; es lo que se usó para esta auditoría.
- **Orquestador + subagentes** — un hilo principal descompone, lanza subagentes especializados (explorar / planear / construir / revisar), integra. Para trabajo amplio que no cabe en un contexto.
- **Verificación adversarial** — generado el cambio, otro agente intenta *refutarlo* (encontrar el bug, romper el test). La diversidad de perspectiva atrapa lo que la redundancia no.

Anti-patrón: lanzar una orquesta multiagente para una tarea que un solo prompt resolvía. Costo y latencia sin ganancia.

## Roles de agente (mapeo a Claude Code)

| Rol | Para qué | En Claude Code |
|---|---|---|
| Explorador | Localizar código, mapear, "¿dónde está X?" | subagente `Explore` (solo lectura) |
| Planificador | Diseñar estrategia antes de codear | subagente `Plan` + plan mode |
| Constructor | Edición acotada de 1-2 archivos | subagente de edición |
| Revisor | Diff review severidad-tagged, adversarial | `/code-review`, subagente revisor |

Plan mode antes de cambios grandes; subagentes de solo lectura para investigar sin gastar contexto del hilo principal.

## Reglas del equipo

- **Nada se mergea sin gate verde**, lo haya escrito quien lo haya escrito. El harness no distingue autor.
- **No confiar en la memoria del modelo** sobre el estado del proyecto. La verdad vive en el repo, los tests y el [backlog](../backlog.md) versionado —no en lo que un agente "recuerda".
- **Plan antes de código** para cambios no triviales. Un plan barato evita una implementación cara y equivocada.
- **Commits atómicos**, sujeto de una línea (convención del repo). Facilita revisión y rollback.
- **Todo afirmable debe ser verificable.** Si un agente dice "los tests pasan", el gate lo confirma; no se toma su palabra.
- **Empezar simple.** Subir de single-agent a multiagente solo cuando la tarea lo pide.

## Portar a otro repo

El estilo es agnóstico del proyecto; lo que cambia es el harness al que apunta el paso 4. Para llevarlo a `hit-ever2` u otro:

1. Asegurar que el repo tiene su harness (al menos `pnpm check` equivalente). Sin gate, este flujo no aplica —volvés a confiar en el modelo.
2. Copiar este documento, ajustar el Apéndice A al contexto del repo.
3. Definir los scripts/comandos que el agente correrá para verificar (paso 4).
4. Mismas reglas de equipo: nada se mergea sin gate verde.

---

## Apéndice A — este repo

- Subagentes de solo lectura (`Explore`) sirven para investigar `src/` (52 archivos) sin saturar contexto.
- El paso 4 del ciclo hoy es débil: `pnpm check` aún no existe (ver [harness, Apéndice A](../operations/delivery-harness.md#apéndice-a--estado-en-hit-cargo-web-v-12)). Mientras tanto, el gate mínimo verificable es `pnpm test && pnpm build`. Cerrar esa brecha es lo que vuelve fiable el trabajo asistido por IA en este repo.
- Cuidado específico de este proyecto: el snippet de GTM está pinneado por hash SHA-256 en `astro.config.mjs`. Cualquier agente que reformatee esa línea rompe el CSP. Está protegido con `prettier-ignore`; un agente debe saberlo antes de tocar `Layout.astro` (ver CLAUDE.md, sección CSP).
- El workspace `hit` agrupa varios repos Git independientes. Un agente no debe asumir que un cambio en este repo aplica a `hit-ever2`; son despliegues separados.
