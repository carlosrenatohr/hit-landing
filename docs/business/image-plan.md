# Plan de Imágenes — Landing Page HIT CARGO

**Fecha:** 2026-05-11
**Estado:** Borrador para revisión
**Complementa:** [copy-seo-audit.md](../marketing/copy-seo-audit.md) v3.0

## Contexto

La auditoría SEO+copy (`docs/marketing/copy-seo-audit.md` v3.0) propone reescribir todo el copy, pero el banco visual es **insuficiente para sostener ese copy**. Inventario actual:

| Activo | Estado | Problema |
|---|---|---|
| `src/assets/images/background.jpeg` (2.9 MB, 4118×2694) | Foto única de hero | Pesa demasiado, no transmite "Nicaragua + USA/China/Panamá", no hay variantes responsive |
| `src/assets/images/testimonial1-3.webp` (3 retratos) | Stock genérico | No son clientes reales — riesgo de credibilidad cuando el copy nuevo dice "María Hernández, Managua" con métricas concretas. Además la sección está oculta (`hidden`) |
| `public/og-image.png` (640×640) | Plantilla genérica sin marca | Cualquier compartido en WhatsApp/Facebook no comunica HIT CARGO |
| `public/favicon.svg` | OK | — |
| Services / HowItWorks / CTA | Solo SVG inline | Sin foto = páginas planas, sin prueba real de bodega/paquetes/equipo |
| Logo de marca | **No existe archivo en repo** | Footer usa SVG genérico + texto (existe master fuera del repo) |

El copy nuevo promete "fotos de tu paquete al llegar a bodega", "casillero en Miami", "+4,500 clientes", "personas reales por WhatsApp". Sin imágenes que respalden esas promesas, el copy suena inflado. Las imágenes son tanto **SEO** (alt text, image search, OG/Twitter Card, rich results) como **conversión** (prueba, confianza, diferenciación).

---

## Recomendación: tres tipos de activos visuales

### A. Fotografía propia (no-negociable para credibilidad)

Lo que **debe** ser real, no generado ni stock:

1. **Equipo y oficina Managua** — Renato, Maya, Abi, espacio en Carretera Masaya Km 14.5. Para "Sobre nosotros", footer, GMB, hero secundario.
2. **Proceso real visible en Nicaragua**: paquete recibido en oficina Managua → empaquetado → entrega a domicilio. 4-6 fotos secuenciales para "Cómo Funciona".
3. **Entrega en puerta** — repartidor con caja HIT CARGO en una casa de Managua/León. Una sola foto bien hecha.

**Nota sobre la bodega Miami** (ver decisión 3 más abajo): el servicio es reventa de un agente mayor. No se fotografía bodega en este plan; se sustituye con mapa de rutas SVG e iconografía de "casillero virtual".

**Costo realista part-time:** una sesión de medio día con cámara de móvil moderno + luz natural. No requiere fotógrafo profesional si se sigue una guía de encuadres. Maya (identidad visual) es la owner natural.

### B. Identidad visual base (debe existir antes de cualquier otra foto)

1. **Logo oficial** en SVG + PNG (versiones: completo, isotipo, monocromo, fondo oscuro). Existe master fuera del repo — tarea es exportar y subir.
2. **Paleta y tipografía documentadas** en `docs/brand.md` (1 página) — para que cualquier foto/gráfico mantenga coherencia.
3. **OG image branded** 1200×630 con logo + claim ("Importaciones a Nicaragua desde USA, China y Panamá") + número WhatsApp. Reemplaza `public/og-image.png`.
4. **Favicon mejorado** — versiones 32, 192, 512 + `apple-touch-icon`.
5. **Plantilla de "foto de paquete recibido"** — overlay con logo HIT CARGO + timestamp. Esta plantilla se usa decenas de veces por semana al notificar al cliente; convertirla en activo de marca refuerza la marca en cada notificación.

### C. Ilustraciones / gráficos generados (donde la foto no aporta)

1. **Mapa de rutas** USA/China/Panamá → Nicaragua, con líneas y tiempos. SVG editable. Para hero o sección "Cómo Funciona". Mucho más comunicativo que una foto de avión genérica, y **sustituye** la necesidad de fotografiar bodegas internacionales.
2. **Iconografía consistente** para Services/HowItWorks/FAQ — los SVG inline actuales son funcionales pero dispares; unificarlos en un set coherente (mismo trazo, mismo radio, mismo color system).
3. **Diagramas de costo aéreo vs marítimo** — gráfico de barras simple, exportado SVG, para `/precios` y la futura guía Amazon.
4. **Hero illustration** — ilustración vectorial (avión + barco + caja + bandera NI + mapa) que sostiene el hero sin depender de foto de bodega.
5. **Banda de logos de tiendas** (Amazon, Shein, AliExpress, Walmart, eBay) como **prueba social indirecta** que sustituye los testimonios mientras no haya clientes reales que firmen.

Las ilustraciones se pueden generar con IA + retoque (Figma/Affinity) o encargar a un freelance nicaragüense una sola vez.

---

## Priorización por sprints (alineada con SEO audit)

### Sprint visual 1 — Bloqueantes (semana 1)

Sin esto, los Sprints 1-2 del SEO audit no se pueden publicar con honestidad:

- [ ] **Exportar variantes del logo** desde el master → `src/assets/brand/` (SVG completo, isotipo, monocromo, fondo oscuro, PNG 512/1024).
- [ ] **OG image branded** 1200×630 → reemplaza `public/og-image.png`. Crítico: lo ve cualquiera que comparta el sitio.
- [ ] **Favicon set** completo (32, 192, 512, apple-touch).
- [ ] **Patch al copy-seo-audit.md**: eliminar "bodega propia en Miami" y `aggregateRating` 4.9/342 (ver decisiones 3 y 4).
- [ ] **Eliminar `TestimonialsSection` del DOM** (hoy solo `hidden`) o sustituirla por bloque de cifras agregadas + banda de logos de tiendas.

### Sprint visual 2 — Hero y prueba (semanas 2-3)

- [ ] **Sesión de fotos** medio día con móvil: equipo, oficina Managua, entrega, paquete-en-oficina. Guiada por `docs/photo-shotlist.md` (a crear).
- [ ] **Optimización del hero**: comprimir `background.jpeg` (4118×2694 → 1920×1280 webp ≤ 250 KB, generar 3 tamaños responsive con `astro:assets`). Hoy mandar 2.9 MB en el LCP penaliza Core Web Vitals y por tanto el SEO.
- [ ] **Mapa de rutas SVG** (USA/China/Panamá → NI) como activo del hero o sección dedicada.
- [ ] **Bloque de prueba social sin testimonios**: cifras agregadas verificables + banda de logos de tiendas.

### Sprint visual 3 — Páginas nuevas del SEO audit (semanas 4-6)

Alineado con Sprint 3 del audit (`/precios` y `/guias/amazon-nicaragua`):

- [ ] Gráficos de comparación de costos para `/precios`.
- [ ] Capturas de Amazon paso-a-paso (con overlay HIT CARGO) para la guía Amazon.
- [ ] Foto "paquete real recibido en Managua" con etiquetado HIT CARGO visible.
- [ ] Banco de 6-8 fotos para futuras entradas de blog del Sprint 4.

### Sprint visual 4 — Mantenimiento (continuo)

- [ ] Una foto/semana publicada en GMB (Sprint 4 del SEO audit lo pide en cadencia).
- [ ] Banco de plantillas (Canva/Figma) para piezas sociales con la misma paleta.

---

## Activos a producir (resumen ejecutable)

| # | Activo | Tipo | Owner | Bloquea |
|---|---|---|---|---|
| 1 | Logo SVG + variantes (exportar de master) | Marca | Maya | Todo |
| 2 | OG image 1200×630 | Marca | Maya | Sprint 1 SEO |
| 3 | Favicon set | Marca | Renato (técnico) | — |
| 4 | Hero comprimido + responsive | Optim. | Renato | Core Web Vitals |
| 5 | Mapa rutas SVG | Ilustr. | Freelance/IA | Hero nuevo |
| 6 | Bloque cifras agregadas + logos tiendas | Marca/Copy | Maya + Renato | Sustituir testimonios |
| 7 | Sesión equipo/oficina Managua (móvil) | Foto | Maya | Sobre nosotros, GMB |
| 8 | Plantilla "paquete recibido" con overlay | Marca | Maya | Notificaciones clientes |
| 9 | Set iconográfico unificado | Ilustr. | Maya/freelance | Coherencia Services/HowItWorks |
| 10 | Gráfico aéreo vs marítimo | Gráfico | Renato (datos) + Maya | `/precios` |
| 11 | Shot list para sesión móvil | Doc | Renato | Sprint visual 2 |

---

## Archivos críticos a modificar (cuando se ejecute)

- `public/og-image.png` → reemplazar
- `public/favicon.svg` + nuevos `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`
- `src/assets/images/background.jpeg` → versión optimizada `hero.webp` + variantes responsive
- `src/assets/images/testimonial[1-3].webp` → eliminar (no se reemplazan a corto plazo)
- `src/assets/brand/` (nueva carpeta) → logo, paleta
- `src/content/testimonials.ts` → eliminar o reescribir como cifras agregadas
- `src/components/home/TestimonialsSection.astro` → eliminar del DOM o reemplazar por `SocialProofSection`
- `src/components/home/HeroSection.astro` → incorporar mapa SVG o ilustración
- `src/components/seo/JSONLD.astro` → **quitar `aggregateRating`** (riesgo de penalización manual de Google si es falso)
- `docs/marketing/copy-seo-audit.md` → patch propagando decisiones 3 y 4

---

## Verificación end-to-end

1. **Lighthouse / PageSpeed**: LCP < 2.5 s en mobile tras optimizar hero. Hoy el JPEG de 2.9 MB lo hace imposible.
2. **OG debugger** (Facebook Sharing Debugger, Twitter Card Validator): compartir la home en WhatsApp y verificar preview con logo + claim.
3. **Search Console** → Mejoras → Logos / Sitelinks search box: la imagen estructurada debe ser detectada.
4. **Inspección visual**: ningún testimonio con foto stock + nombre inventado. Si no hay real, sección eliminada (no solo oculta).
5. **GMB**: 10 fotos mínimo subidas en categorías correctas (interior, equipo, productos/paquetes, exterior).
6. **JSON-LD validator** (schema.org/validator, Rich Results Test): verificar que el schema pasa sin `aggregateRating` y sin warnings.

---

## Decisiones tomadas con el usuario (2026-05-11)

1. **Logo**: existe archivo de marca → tarea es **exportar variantes** (SVG completo, isotipo, monocromo, fondo oscuro, PNG 512/1024) y subirlas a `src/assets/brand/`. No requiere diseño nuevo. Maya entrega el master.
2. **Fotografía propia**: móvil del equipo + guía de encuadres. Maya dirige la sesión; preparar un **shot list** de 12-15 encuadres con luz natural, ángulos, props y ejemplos de referencia antes de la sesión (`docs/photo-shotlist.md`).
3. **Bodega Miami — cambio estructural importante**: el servicio es **reventa de un agente mayor**, HIT CARGO no opera bodega propia en Miami. Hay "un par de fotos de la agencia grande" disponibles, pero **no se quiere transmitir al cliente que es reventa**. Implicaciones:
   - **Mapa de rutas SVG** y "casillero en Miami" sustituyen cualquier promesa visual de "nuestra bodega".
   - El **copy del SEO audit** debe ajustarse: cambiar "Bodega propia en Miami" / "bodega propia" por **"Casillero en Miami"** o **"Tu dirección en Miami"** (neutro, real, sin mentir). Específicamente en: `seo.ts` description, `home.ts` subtitle, `services.ts` (servicio aéreo), GMB descripción.
   - Las fotos de la agencia grande **no se usan** en el sitio público (riesgo de descubrimiento por parte del cliente o del agente). Quedan solo como referencia interna.
   - Esta decisión hay que **propagarla al `copy-seo-audit.md`** antes de aplicar Sprint 1 del audit.
4. **Testimonios reales no viables a corto plazo**:
   - **Eliminar del DOM** (no solo ocultar con `hidden`) para no dejar markup muerto.
   - **Quitar `aggregateRating` del JSON-LD** — riesgo de penalización manual de Google si es falso. Sustituir con campos verificables.
   - Sustituir la "prueba social" por **cifras agregadas verificables**: años de operación, países de origen cubiertos, frecuencia de envíos. Ej.: "Operando desde 2015 · Envíos cada semana desde 3 países · Cobertura en los 15 departamentos". Verificable sin nombres.
   - **Banda de logos de tiendas** (Amazon, Shein, AliExpress, Walmart, eBay) como prueba indirecta — estándar en sitios courier y no compromete a ningún cliente.

---

## Tareas añadidas tras las decisiones

- [ ] **Patch al copy-seo-audit.md** — eliminar referencias a "bodega propia en Miami" y al `aggregateRating` 4.9/342. Bloquea Sprint 1 SEO.
- [ ] **Shot list** detallado para la sesión móvil → `docs/photo-shotlist.md`.
- [ ] **Diseño del bloque "Prueba social sin testimonios"** — cifras agregadas + banda de logos de tiendas, sustituyendo `TestimonialsSection`.
- [ ] **Export de variantes del logo** desde el master que entregue Maya.

---

*Plan vive en `hit-cargo-web-v-1.2/docs/business/image-plan.md`. Próxima revisión: tras aprobación del usuario, antes de iniciar Sprint visual 1.*
