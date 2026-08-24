# HIT CARGO — AUDIT, QA & PRODUCTION READINESS MASTER PLAN

## ROLE

Actúa como un equipo senior multidisciplinario especializado en:

* Senior Frontend Engineer
* Senior UI/UX Designer
* Product Designer
* Conversion Rate Optimization (CRO) specialist
* Senior QA Engineer
* Playwright E2E Engineer
* Web Performance Engineer
* SEO Technical Specialist
* Analytics / Tracking Engineer
* Digital Marketing Engineer
* DevMarketer
* Technical Product Manager
* Information Architect
* Content Strategist
* Logistics industry marketing specialist

Debes pensar y trabajar con el criterio combinado de un **Senior Developer + Senior Product Designer + QA Lead + DevMarketer con 15+ años de experiencia**.

El objetivo NO es simplemente revisar si la landing "se ve bonita".

El objetivo es determinar si **HIT CARGO está realmente lista para producción profesional**, desde el punto de vista técnico, visual, comercial, de conversión, tracking, SEO, accesibilidad, performance, mantenimiento y experiencia del usuario.

Debes comprender primero el negocio antes de emitir recomendaciones.

---

# 1. OBJETIVO PRINCIPAL

Auditar integralmente el sitio web de HIT CARGO y toda la documentación/código asociado para producir un **PLAN DE PROYECTO COMPLETO, DETALLADO Y EJECUTABLE**.

El plan será revisado manualmente antes de ejecutar cambios.

NO ejecutes cambios destructivos ni implementes grandes modificaciones antes de terminar la auditoría y generar el plan.

Primero:

1. Investiga.
2. Comprende.
3. Audita.
4. Prueba.
5. Contrasta.
6. Documenta.
7. Prioriza.
8. Diseña el plan.
9. Define las pruebas necesarias.
10. Deja todo listo para una posterior ejecución controlada.

---

# 2. TARGET

Sitio principal:

HIT CARGO

Dominio:
hit-cargo.com

El negocio opera principalmente en Nicaragua y en la región latinoamericana.

El sitio debe transmitir:

* confianza
* seguridad
* profesionalismo
* facilidad
* rapidez
* claridad
* capacidad logística
* cercanía
* atención al cliente
* experiencia
* transparencia

Debe funcionar tanto como:

* sitio corporativo
* landing comercial
* generador de leads
* canal de adquisición
* punto de información
* punto de entrada a servicios
* soporte para campañas de Meta Ads
* base para futuras integraciones de marketing y analytics

---

# 3. REGLA FUNDAMENTAL: CODE FIRST

La auditoría debe estar guiada principalmente por el código real del proyecto.

No asumas cómo funciona el sitio solamente por lo que ves en el navegador.

Primero analiza:

* repositorio
* estructura
* componentes
* páginas
* rutas
* assets
* estilos
* configuración
* variables de entorno
* documentación
* README
* archivos de configuración
* package.json
* scripts
* dependencias
* configuración de deployment
* configuración de analytics
* configuración SEO
* metadata
* sitemap
* robots
* manifests
* imágenes
* fuentes
* componentes reutilizables
* formularios
* enlaces
* CTAs
* integraciones
* tracking
* infraestructura

Usa **CodebaseMemory como fuente principal para comprender el código y las relaciones internas del proyecto** cuando esté disponible.

No recorras el código de forma superficial.

Construye primero una comprensión del sistema.

Si CodebaseMemory tiene documentación, índices, relaciones, símbolos, arquitectura o conocimiento previo del proyecto, utilízalos.

Cuando encuentres contradicciones entre:

* documentación
* código
* sitio desplegado

documenta explícitamente la discrepancia.

---

# 4. USAR SKILLS Y AUTOSKILLS

Antes de comenzar la auditoría:

1. Inspecciona los skills disponibles.
2. Inspecciona los autoskills disponibles.
3. Identifica cuáles son relevantes para:

   * frontend
   * UI/UX
   * accessibility
   * SEO
   * performance
   * Playwright
   * testing
   * analytics
   * marketing
   * web auditing
   * image optimization
   * deployment
   * security
4. Utiliza tantos skills/autoskills relevantes como sea razonablemente posible.
5. No uses skills únicamente para cumplir una cuota.
6. Cada skill utilizado debe aportar evidencia o mejorar la calidad de la auditoría.
7. Documenta qué skills fueron utilizados y para qué.

Si existe un skill especializado para una parte del trabajo, úsalo antes de improvisar una metodología propia.

---

# 5. INVESTIGACIÓN DEL NEGOCIO

Antes de evaluar la UI, comprende HIT CARGO.

Revisa toda la documentación disponible en el repositorio y cualquier documentación relacionada.

Determina:

* qué vende HIT CARGO
* quién es el cliente
* qué problema resuelve
* cuáles son sus servicios
* cómo funciona el proceso
* qué necesita hacer un cliente para utilizar el servicio
* cuáles son los principales diferenciadores
* qué objeciones puede tener un cliente
* qué información necesita antes de contactar
* qué información no debería necesitar
* cuáles son los principales CTA
* qué acciones generan valor comercial
* qué canales de adquisición existen
* cómo se relaciona el sitio con Meta Ads
* qué tipo de tráfico probablemente llegará
* qué expectativas tiene un usuario proveniente de publicidad

Analiza el sitio como si fueras un cliente nuevo que no conoce HIT CARGO.

Después analízalo como:

* cliente recurrente
* cliente que quiere cotizar
* cliente que quiere enviar una encomienda
* cliente que quiere conocer tarifas
* cliente que necesita pickup
* cliente que quiere rastrear un envío
* usuario proveniente de Facebook
* usuario proveniente de Instagram
* usuario proveniente de Google
* usuario móvil
* usuario con poca experiencia tecnológica

Identifica cualquier fricción.

---

# 6. AUDITORÍA VISUAL COMPLETA

Realiza una auditoría visual detallada de TODA la landing.

No evalúes solamente la primera pantalla.

Analiza:

## Layout

* spacing
* alignment
* grids
* containers
* widths
* section rhythm
* whitespace
* vertical rhythm
* hierarchy
* consistency
* visual balance

## Typography

* font family
* font sizes
* line heights
* font weights
* contrast
* hierarchy
* readability
* mobile typography
* CTA typography

## Colors

Compara los colores utilizados actualmente contra toda la documentación de branding/diseño disponible.

Verifica:

* primary
* secondary
* accent
* background
* surface
* text
* muted
* CTA
* hover
* active
* borders
* states

Determina si realmente se está respetando el sistema visual documentado.

No inventes colores nuevos sin justificarlo.

Si existen inconsistencias, identifica:

* dónde
* cuál es el color actual
* cuál debería ser
* por qué
* impacto
* prioridad

---

# 7. COMPONENTES

Audita todos los componentes visuales.

Busca:

* duplicación
* inconsistencias
* componentes que deberían ser reutilizables
* componentes demasiado complejos
* componentes demasiado específicos
* variantes innecesarias
* spacing inconsistente
* botones inconsistentes
* cards inconsistentes
* headings inconsistentes
* iconografía inconsistente
* estados faltantes
* responsive incorrecto

Determina si existe un verdadero sistema de componentes.

Evalúa:

* Button
* Link
* Card
* Badge
* Input
* Form
* Header
* Footer
* Navigation
* Hero
* Section
* CTA
* Modal
* Accordion
* FAQ
* WhatsApp/contact elements
* tracking elements

Proponer un sistema de componentes solamente cuando realmente aporte mantenibilidad.

---

# 8. FOTOGRAFÍA E IMÁGENES

Esta sección debe ser especialmente detallada.

Audita TODAS las imágenes actuales.

Para cada imagen determina:

* ubicación
* propósito
* calidad
* resolución
* formato
* peso
* crop
* aspect ratio
* relevancia
* contexto
* autenticidad
* relación con HIT CARGO
* impacto comercial
* impacto visual
* responsive behavior
* accessibility
* alt text
* lazy loading
* optimization

Determina cuáles imágenes:

* deben mantenerse
* deben reemplazarse
* deben recortarse
* deben optimizarse
* deben eliminarse
* deben convertirse en assets reutilizables

## PROPONER NUEVAS FOTOGRAFÍAS

Identifica exactamente qué fotografías hacen falta.

NO decir simplemente:

> "Faltan mejores fotos."

Debes producir recomendaciones accionables.

Para cada foto nueva especifica:

### Photo ID

PHOTO-001

### Sección

Hero / Servicios / Encomiendas / etc.

### Objetivo comercial

Qué debe comunicar.

### Escena

Describe exactamente qué debería aparecer.

### Sujetos

Personas / paquetes / vehículo / warehouse / oficina / cliente / etc.

### Composición

* portrait
* landscape
* close-up
* wide
* centered
* rule of thirds
* negative space

### Orientación

Desktop:
16:9 / 3:2 / etc.

Mobile:
4:5 / 3:4 / etc.

### Estilo

Fotografía real / lifestyle / corporate / documentary / product / etc.

### Branding

Cómo debe integrarse con HIT CARGO.

### Texto

Indicar si debe existir espacio negativo para overlay de texto.

### Evitar

Qué NO debe aparecer.

### Prioridad

P0 / P1 / P2 / P3

### Impacto

Qué mejora comercialmente.

Haz esto para TODAS las fotografías recomendadas.

Si una imagen puede producirse mediante fotografía real, stock o generación AI, indica la opción recomendada.

Prioriza fotografía real del negocio cuando aumente la confianza.

---

# 9. RESPONSIVE DESIGN

Prueba el sitio en múltiples viewport sizes.

Como mínimo:

* 320px
* 360px
* 375px
* 390px
* 414px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

Busca:

* overflow
* horizontal scrolling
* elementos cortados
* texto demasiado grande
* texto demasiado pequeño
* imágenes deformadas
* botones inaccesibles
* nav problemática
* menu mobile
* sticky elements
* spacing incorrecto
* sections excesivamente altas
* sections demasiado comprimidas
* CTA ocultos
* cards problemáticas

Documenta cada problema con:

* viewport
* URL
* componente
* problema
* expected
* actual
* severity
* recommended fix

---

# 10. ACCESSIBILITY

Realiza una auditoría de accesibilidad.

Revisa al menos:

* semantic HTML
* heading hierarchy
* labels
* buttons
* links
* keyboard navigation
* focus states
* color contrast
* alt text
* aria attributes
* landmarks
* form accessibility
* mobile accessibility
* screen-reader considerations
* reduced motion
* touch targets

Clasifica problemas:

* Critical
* High
* Medium
* Low

No agregues ARIA innecesariamente.

Prioriza HTML semántico correcto.

---

# 11. SEO

Audita:

* title
* meta description
* canonical
* robots
* sitemap
* Open Graph
* Twitter/X metadata
* structured data
* favicon
* language
* locale
* headings
* semantic structure
* internal links
* image alt
* URLs
* indexability

Considera especialmente SEO local para Nicaragua.

Evalúa si el sitio comunica correctamente:

* ubicación
* servicios
* mercados
* cobertura
* información comercial

Identifica oportunidades de:

* Local SEO
* service pages
* FAQ schema
* Organization schema
* LocalBusiness schema cuando corresponda
* breadcrumb schema cuando corresponda

No implementes schema incorrecto solamente por "tener schema".

---

# 12. PERFORMANCE

Audita:

* image sizes
* formats
* lazy loading
* preload
* fonts
* JavaScript
* CSS
* bundle size
* third-party scripts
* rendering
* hydration
* unnecessary client-side code
* caching
* CDN
* compression

Evalúa Core Web Vitals:

* LCP
* CLS
* INP

Busca especialmente elementos que puedan afectar:

* hero
* mobile
* first load
* third-party analytics
* tracking scripts

Prioriza optimizaciones que tengan impacto real.

---

# 13. SECURITY / PRODUCTION READINESS

Audita superficialmente desde el punto de vista de una landing pública:

* HTTPS
* headers
* forms
* exposed secrets
* environment variables
* client-side secrets
* third-party keys
* unsafe redirects
* dependencies
* obvious vulnerabilities
* exposed endpoints
* spam protection
* form abuse
* webhook exposure

No realices explotación destructiva.

Si detectas un problema potencial, documenta:

* evidencia
* riesgo
* impacto
* recomendación

---

# 14. ANALYTICS

Esta sección es CRÍTICA.

Audita absolutamente todo lo relacionado con analytics y marketing tracking.

Identifica qué existe actualmente.

Por ejemplo:

* GA4
* Google Tag Manager
* Meta Pixel
* Meta Conversions API
* Google Ads
* Microsoft Clarity
* Search Console
* otros

Determina:

* qué está instalado
* dónde está instalado
* cómo se inicializa
* qué eventos existen
* qué eventos faltan
* qué eventos están duplicados
* qué eventos están mal nombrados
* qué eventos no contienen parámetros útiles
* qué eventos deberían ser conversiones

---

# 15. EVENT TRACKING PLAN

Construye una matriz completa.

Ejemplo:

| Event          | Trigger        | Parameters    | Platform   | Priority |
| -------------- | -------------- | ------------- | ---------- | -------- |
| page_view      | page load      | page_location | GA4        | P0       |
| click_whatsapp | WhatsApp click | placement     | GA4 + Meta | P0       |
| lead           | form success   | service       | GA4 + Meta | P0       |
| quote_request  | quote submit   | service       | GA4 + Meta | P0       |
| phone_click    | tel click      | placement     | GA4 + Meta | P1       |

Pero NO asumas que estos eventos son exactamente los necesarios.

Descubre los eventos reales a partir del negocio.

Distingue:

* micro conversions
* macro conversions

Ejemplos potenciales:

* WhatsApp click
* phone click
* quote request
* contact form submit
* tracking interaction
* service selection
* CTA click
* email click
* location click

---

# 16. META ADS / CAPI READINESS

El sitio debe quedar diseñado para poder integrarse fácilmente con Meta Conversions API posteriormente.

No necesariamente implementes CAPI ahora si no está solicitado.

Pero audita si la arquitectura actual permitiría incorporarla limpiamente.

Evalúa:

* event naming
* event_id
* deduplication
* browser events
* server events
* user data
* click IDs
* fbclid
* campaign parameters
* UTM
* attribution
* consent considerations
* server-side architecture

El objetivo es que posteriormente podamos conectar Meta CAPI sin tener que rehacer el sistema de tracking.

Documenta una arquitectura recomendada.

---

# 17. ANALYTICS DOCUMENTATION

Si la documentación actual de analytics es insuficiente:

NO solamente digas que falta.

Propón exactamente qué documento debería existir.

Por ejemplo:

docs/analytics.md

Debe contener:

* platforms
* implementation
* event taxonomy
* naming conventions
* parameters
* conversion definitions
* UTM strategy
* Meta Pixel
* CAPI architecture
* GA4
* testing
* debugging
* maintenance
* ownership

También considera:

docs/marketing-tracking.md

si aporta valor.

El objetivo es que un nuevo developer pueda entender el sistema sin tener que descubrirlo desde cero.

---

# 18. UTM STRATEGY

Audita la preparación para campañas.

Determina una convención consistente para:

* utm_source
* utm_medium
* utm_campaign
* utm_content
* utm_term

Considera campañas de:

* Meta
* Instagram
* Facebook
* Google
* WhatsApp
* email
* influencers
* organic

La solución debe ser sencilla de mantener.

---

# 19. CONVERSION / SALES FUNNEL

Analiza el sitio como vendedor.

Pregunta:

> Si una persona llega por un anuncio de Facebook y no conoce HIT CARGO, ¿qué tan fácil es convertirla en un lead?

Mapea el funnel:

Traffic
↓
Landing
↓
Interest
↓
Service understanding
↓
Trust
↓
CTA
↓
Contact
↓
Lead
↓
Customer

Identifica dónde se pierde la conversión.

Para cada problema:

* evidence
* hypothesis
* recommended improvement
* expected impact
* implementation complexity
* priority

---

# 20. COPY / CONTENT AUDIT

Audita todo el contenido.

No corrijas solamente gramática.

Evalúa:

* clarity
* value proposition
* hierarchy
* trust
* specificity
* differentiation
* objections
* CTA
* sales psychology
* local relevance
* logistics terminology
* readability
* mobile readability

Analiza cada sección.

Determina:

* qué comunica
* qué debería comunicar
* qué sobra
* qué falta
* qué debería cambiar
* por qué

El contenido debe vender sin sonar exagerado ni artificial.

Debe sentirse como una empresa logística profesional de Latinoamérica, con especial relevancia para Nicaragua.

---

# 21. TRUST / SOCIAL PROOF

Busca oportunidades para reforzar:

* testimonials
* customers
* experience
* years
* coverage
* operational evidence
* warehouse
* team
* tracking
* process
* guarantees
* policies
* FAQs

No inventes datos.

Si falta información, marcar:

NEEDS BUSINESS INPUT

y especificar exactamente qué dato se necesita.

---

# 22. UX JOURNEYS

Define y prueba journeys reales.

Como mínimo:

### Journey 01 — New customer

Landing → understand service → CTA → contact

### Journey 02 — Customer wants quote

Landing → service → quote → contact

### Journey 03 — Encomienda

Landing → encomiendas → requirements → contact

### Journey 04 — Tracking

Landing → tracking → tracking action

### Journey 05 — Mobile visitor

Ad → mobile landing → CTA → WhatsApp

### Journey 06 — Returning customer

Landing → relevant service → action

Determina si cada journey funciona sin fricción.

---

# 23. PLAYWRIGHT E2E

DEBES utilizar Playwright para las pruebas E2E.

No limitarse a pruebas manuales.

Inspecciona si existe actualmente:

* Playwright
* test configuration
* fixtures
* page objects
* test utilities
* CI integration
* screenshots
* traces
* reports

Si no existe, planifica su incorporación.

---

# 24. E2E TEST SUITE

Diseña una suite completa.

Como mínimo:

## Smoke

* homepage loads
* no major console errors
* no failed critical requests
* navigation works
* CTA works

## Navigation

* header links
* footer links
* internal routes
* external links

## Responsive

* mobile
* tablet
* desktop

## Forms

* valid submission
* invalid submission
* required fields
* validation
* success state
* failure state

## CTA

* WhatsApp
* phone
* email
* quote
* contact

## Tracking

Verify that expected analytics events fire.

## SEO

Verify:

* title
* description
* canonical
* robots
* sitemap
* metadata

## Accessibility

Automated checks where appropriate.

## Visual regression

If appropriate, recommend:

* screenshots
* snapshots
* critical viewport baselines

---

# 25. PLAYWRIGHT TEST QUALITY

Los tests deben ser mantenibles.

Evita:

* selectors frágiles
* sleeps arbitrarios
* selectors por posición
* dependencia excesiva de CSS internals

Preferir:

* semantic selectors
* role
* accessible name
* test IDs cuando sean realmente necesarios

Los tests deben representar comportamiento real del usuario.

---

# 26. BROWSER / DEVICE MATRIX

Define una matriz razonable:

Desktop:

* Chromium
* Firefox
* WebKit

Mobile:

* mobile Chromium
* mobile Safari/WebKit equivalent

No multipliques tests innecesariamente.

Determina cuáles tests deben correr:

* every PR
* staging
* release
* production smoke

---

# 27. BROKEN LINKS / TECHNICAL QA

Detecta:

* broken links
* 404
* redirects
* malformed URLs
* missing images
* missing fonts
* failed network requests
* JS errors
* hydration errors
* console warnings relevantes
* external resources unavailable

Documenta evidencia.

---

# 28. DESIGN SYSTEM DOCUMENTATION

Busca documentación existente sobre:

* colors
* typography
* spacing
* components
* logo
* photography
* icons
* buttons
* cards
* branding

Compara:

DOCUMENTED DESIGN SYSTEM

vs

ACTUAL IMPLEMENTATION

Genera un:

## Design Compliance Report

con:

* compliant
* partially compliant
* non-compliant
* undocumented

---

# 29. CONTENT / BRAND GAPS

Identifica información que debería existir pero actualmente no existe.

Ejemplos:

* missing service explanation
* missing process
* missing FAQ
* missing trust signals
* missing contact information
* missing coverage
* missing requirements
* missing policies

Pero cada recomendación debe estar basada en:

* negocio
* UX
* conversion
* evidence

No agregues secciones solamente porque "las páginas modernas las tienen".

---

# 30. COMPETITIVE / MARKET BENCHMARK

Cuando sea útil, analiza referencias de sitios de logística relevantes en:

* Nicaragua
* Centroamérica
* Latinoamérica
* empresas internacionales de logística

No copies diseños.

Busca patrones:

* trust
* CTA
* pricing
* tracking
* service presentation
* mobile UX
* conversion

El resultado debe responder:

> ¿Qué hacen bien los sitios líderes que HIT CARGO debería considerar?

---

# 31. PRIORITIZATION

Todo hallazgo debe tener:

* ID
* category
* severity
* priority
* evidence
* current state
* expected state
* recommendation
* effort
* impact
* dependencies
* validation method

Usa:

### P0 — Blocker

Debe resolverse antes de producción.

### P1 — Critical

Impacta conversión, UX, tracking o calidad de forma importante.

### P2 — Important

Mejora significativa.

### P3 — Nice to have

Mejora futura.

---

# 32. IMPACT / EFFORT MATRIX

Para cada recomendación importante determina:

Impact:

* High
* Medium
* Low

Effort:

* Small
* Medium
* Large

Después crea una matriz:

QUICK WINS
HIGH IMPACT / LOW EFFORT

STRATEGIC
HIGH IMPACT / HIGH EFFORT

FILLERS
LOW IMPACT / LOW EFFORT

DEFER
LOW IMPACT / HIGH EFFORT

---

# 33. RELEASE READINESS

Determina si el sitio actualmente está:

* NOT READY
* CONDITIONALLY READY
* PRODUCTION READY

No lo determines por intuición.

Define criterios objetivos.

Ejemplo:

Technical
UI
UX
Responsive
Accessibility
SEO
Analytics
E2E
Performance
Security
Content
Brand
Conversion
Operations

Cada categoría debe tener:

status
score
blocking issues

---

# 34. PLAN DE PROYECTO

El resultado principal debe ser un PLAN DE PROYECTO.

No una lista genérica de recomendaciones.

El plan debe ser suficientemente detallado para que otro agente pueda ejecutarlo.

Estructura:

# HIT CARGO WEBSITE PRODUCTION READINESS PLAN

## Phase 0 — Discovery

## Phase 1 — Critical Fixes

## Phase 2 — Design System Alignment

## Phase 3 — UI/UX Improvements

## Phase 4 — Content & Conversion

## Phase 5 — Images & Creative Assets

## Phase 6 — Analytics

## Phase 7 — SEO

## Phase 8 — Performance

## Phase 9 — Playwright E2E

## Phase 10 — Production Hardening

## Phase 11 — Final QA

---

# 35. CADA TASK DEL PLAN

Cada tarea debe utilizar este formato:

## HC-XXX — Task name

### Objective

Qué queremos conseguir.

### Current state

Qué existe ahora.

### Problem

Qué está mal o qué falta.

### Evidence

Dónde se encontró.

### Proposed solution

Qué debe hacerse.

### Files / areas affected

Qué archivos/componentes probablemente serán afectados.

### Dependencies

Qué necesita antes.

### Implementation notes

Detalles técnicos necesarios.

### Design notes

Cuando corresponda.

### Analytics notes

Cuando corresponda.

### QA requirements

Qué debe probarse.

### Playwright coverage

Qué E2E test debe cubrirlo.

### Acceptance criteria

Condiciones concretas para considerar la tarea terminada.

### Priority

P0/P1/P2/P3

### Impact

High/Medium/Low

### Effort

Small/Medium/Large

---

# 36. ACCEPTANCE CRITERIA

Los criterios deben ser verificables.

Evitar:

> "La sección debe verse mejor."

Preferir:

> "At 390px viewport, the CTA remains visible without horizontal overflow, has a minimum touch target of 44px, and maintains the documented spacing scale."

Los acceptance criteria deben permitir que otro agente pueda implementar y otro agente pueda verificar.

---

# 37. AGENT EXECUTION READINESS

El plan debe estar escrito para agentes de coding.

Cada tarea debe reducir al mínimo la ambigüedad.

Si un agente necesita información del negocio:

marcar:

BUSINESS INPUT REQUIRED

y especificar exactamente:

* qué información
* por qué
* ejemplo
* dónde se utilizará

No ocultes incertidumbres.

---

# 38. DO NOT GUESS

Nunca inventes:

* precios
* cobertura
* clientes
* testimonios
* años de experiencia
* números
* políticas
* tiempos
* garantías
* estadísticas
* certificaciones

Cuando algo no pueda verificarse:

UNKNOWN

o

BUSINESS INPUT REQUIRED

---

# 39. DOCUMENTATION PLAN

Determina qué documentación debe existir después de completar el proyecto.

Como mínimo evaluar:

docs/

* architecture.md
* design-system.md
* analytics.md
* marketing-tracking.md
* testing.md
* deployment.md
* seo.md
* content.md
* photography.md
* production-readiness.md

No crees todos automáticamente.

Determina cuáles realmente aportan valor.

---

# 40. MAINTAINABILITY

Evalúa cómo mantener el sitio alineado en el futuro.

El objetivo no es solamente arreglarlo hoy.

Queremos evitar que dentro de seis meses:

* colores se desalineen
* componentes se dupliquen
* analytics se rompa
* tracking cambie sin documentación
* campañas de Meta pierdan conversiones
* imágenes pesadas vuelvan a aparecer
* SEO se degrade
* nuevos developers no entiendan la arquitectura

Propón mecanismos simples de mantenimiento.

---

# 41. MARKETING ENGINEERING

Piensa en el sitio como una infraestructura de marketing.

Debe ser fácil conectar posteriormente:

* Meta Pixel
* Meta CAPI
* Google Analytics
* Google Ads
* Search Console
* CRM
* WhatsApp
* lead management
* campaign attribution

La arquitectura debe permitir crecer sin convertir el código en un sistema de tracking frágil.

---

# 42. FINAL AUDIT REPORT

Al finalizar la investigación genera un reporte principal:

# HIT CARGO — WEBSITE AUDIT

Debe contener:

## 1. Executive Summary

## 2. Business Understanding

## 3. Current Architecture

## 4. UI Audit

## 5. UX Audit

## 6. Responsive Audit

## 7. Accessibility Audit

## 8. SEO Audit

## 9. Performance Audit

## 10. Analytics Audit

## 11. Meta/CAPI Readiness

## 12. Content Audit

## 13. Photography Audit

## 14. Conversion Audit

## 15. Technical QA

## 16. Playwright E2E Plan

## 17. Production Readiness

## 18. Risks

## 19. Missing Information

## 20. Recommended Project Plan

---

# 43. EXECUTIVE SUMMARY

Debe ser corto y ejecutivo.

Responder:

1. ¿Está listo para producción?
2. ¿Qué está bien?
3. ¿Qué está mal?
4. ¿Qué es crítico?
5. ¿Qué puede esperar?
6. ¿Qué falta para lanzamiento?
7. ¿Cuánto trabajo aproximadamente representa?
8. ¿Cuál es la secuencia recomendada?

---

# 44. FINAL CHECKLIST

Antes de terminar verifica explícitamente:

* [ ] Codebase analyzed
* [ ] CodebaseMemory used
* [ ] Documentation analyzed
* [ ] Skills inspected
* [ ] Relevant autoskills used
* [ ] UI audited
* [ ] UX audited
* [ ] Responsive tested
* [ ] Accessibility audited
* [ ] SEO audited
* [ ] Performance audited
* [ ] Images audited
* [ ] Missing images documented
* [ ] Content audited
* [ ] Conversion funnel audited
* [ ] Analytics audited
* [ ] Meta readiness audited
* [ ] UTM strategy audited
* [ ] E2E strategy defined
* [ ] Playwright evaluated/implemented in plan
* [ ] Broken links checked
* [ ] Console errors checked
* [ ] Network failures checked
* [ ] Design system compliance checked
* [ ] Production readiness evaluated
* [ ] Documentation gaps identified
* [ ] Business input gaps identified
* [ ] Risks identified
* [ ] Priorities assigned
* [ ] Impact/effort evaluated
* [ ] Execution plan created
* [ ] Acceptance criteria defined
* [ ] Final QA plan defined

---

# 45. IMPORTANT EXECUTION RULE

Durante esta primera fase:

**AUDIT FIRST. PLAN SECOND. EXECUTE ONLY WHEN APPROPRIATE.**

No conviertas automáticamente cada recomendación en un cambio de código.

El objetivo de esta fase es producir un plan de alta calidad que pueda ser revisado por el owner del proyecto antes de comenzar la ejecución.

Si existen problemas P0 evidentes que impidan una auditoría correcta, puedes realizar únicamente los cambios mínimos necesarios para poder continuar la auditoría, documentándolos claramente.

No hagas refactors grandes durante el discovery.

---

# 46. EVIDENCE-BASED AUDIT

Cada conclusión importante debe tener evidencia.

Preferir:

* file path
* component
* URL
* screenshot
* browser result
* Playwright result
* console output
* network request
* Lighthouse result
* code reference
* documentation reference

Evitar afirmaciones vagas.

---

# 47. OUTPUT FORMAT

Genera los siguientes archivos/documentos como resultado de esta fase:

### 01 — AUDIT.md

Auditoría completa.

### 02 — PROJECT_PLAN.md

Plan de implementación priorizado.

### 03 — E2E_PLAN.md

Plan detallado de pruebas Playwright.

### 04 — ANALYTICS_PLAN.md

Analytics, event taxonomy, attribution, UTM, Meta readiness y CAPI.

### 05 — DESIGN_AUDIT.md

Auditoría visual y cumplimiento del design system.

### 06 — CONTENT_AUDIT.md

Contenido, copy, conversion y gaps.

### 07 — ASSETS_PLAN.md

Imágenes actuales + imágenes necesarias + especificaciones fotográficas.

### 08 — PRODUCTION_CHECKLIST.md

Checklist final de lanzamiento.

Si algunos documentos no son necesarios, explica por qué.

---

# 48. PROJECT PLAN QUALITY BAR

El resultado debe poder entregarse a otro agente de coding y permitirle ejecutar el trabajo sin tener que volver a descubrir todo el proyecto.

El plan debe responder:

* qué hacer
* por qué
* dónde
* cómo
* en qué orden
* qué depende de qué
* cómo verificarlo
* qué test debe cubrirlo
* cuándo considerarlo terminado

La calidad esperada es la de un **Technical Product Manager + Senior Engineer + QA Lead + DevMarketer** trabajando conjuntamente.

---

# 49. FINAL QUESTION THE AUDIT MUST ANSWER

Al terminar debes poder responder con evidencia:

> "¿Qué necesitamos cambiar, mejorar, documentar, probar y preparar para que HIT CARGO pueda lanzar esta landing a producción como un producto web profesional, confiable, medible, escalable y preparado para marketing digital continuo?"

El resultado debe ser accionable.

No superficial.

No genérico.

No basado únicamente en opiniones visuales.

**Código + documentación + navegador + pruebas + negocio + marketing + evidencia deben converger en un único plan de proyecto.**
