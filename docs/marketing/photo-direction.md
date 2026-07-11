# HIT CARGO — Dirección de fotografía y guía de reemplazo (landing)

> **Estado:** preparación. Este documento decide **qué foto va en cada lugar y cómo debe verse**, para
> que cuando lleguen los assets nuevos el reemplazo y la optimización sean mecánicos.
> **Fuente de verdad de estilo:** brand book §07 ([brand-color-system.md](./brand-color-system.md)).
> **Complementa** el plan estratégico y de sprints en [image-plan.md](../business/image-plan.md).
> **Owner de captura/curaduría:** Maya · **Owner de optimización/integración:** Renato.

La meta: que el sitio se vea como el de un **operador logístico serio a nivel mundial** (piensa Maersk,
DHL, Flexport, Kuehne+Nagel) — operación real, gente real, escala y movimiento — no como un catálogo de
stock frío. La foto es prueba y conversión, no decoración.

---

## 1. Estado actual (inventario a reemplazar)

| Slot | Archivo hoy | Problema | Acción |
|---|---|---|---|
| Hero | `/images/background.jpeg` | Pesado, genérico, no dice "US/China/Panamá → Nicaragua" | Reemplazar + optimizar |
| Testimonios | `/images/testimonial1-3.webp` | Retratos de stock (no clientes reales); sección oculta | No usar retrato falso — ver §3 prueba social |
| OG / social | `public/og-image.png` | Plantilla genérica sin marca | Reemplazar por OG con logo + claim |
| Servicios / Cómo funciona / CTA | Solo SVG inline | Páginas planas, sin prueba real | Añadir 1 foto real por bloque |

El logo ya está resuelto y optimizado en `public/brand/` (mismo set en web y panel).

---

## 2. Principios de dirección de arte (§07)

**Buscamos** — momentos genuinos · luz cálida y natural · contexto logístico real (cajas, cinta, etiquetas,
oficina, entrega en puerta) · gente real (recibir un paquete, el equipo trabajando) · composición limpia
con **aire para el texto**.

**Evitamos** — stock frío o poses forzadas · manos corporativas sobre teclados · aviones/mapas genéricos
sin relación · sobre-edición · colores fuera de marca que compitan con el naranja.

**Grado de color (para coherencia de marca):** sombras hacia negro/navy, luces cálidas, y dejar que el
**Naranja HIT `#FF7A00`** aparezca de forma natural en la escena (cinta, chaleco, caja, señalética) o como
acento gráfico encima — nunca teñir toda la foto de naranja.

---

## 3. Qué usar por sección (shot list)

1. **Hero** — una escena de movimiento con profundidad: entrega real en una casa nicaragüense, o carga en
   proceso, con espacio a un lado para el titular. Alternativa sin depender de foto de bodega: **mapa de
   rutas** ilustrado (US/China/Panamá → NI) sobre base oscura. Debe cargar rápido (es el LCP).
2. **Servicios · Aéreo** — carga/avión real o caja etiquetada "aéreo"; sensación de rapidez.
3. **Servicios · Marítimo** — contenedor/puerto; sensación de volumen y economía.
4. **Cómo funciona** — 3–4 fotos secuenciales del **proceso real en Nicaragua**: recibido en oficina →
   empacado → entrega en puerta. Es la prueba más fuerte del sitio.
5. **Prueba social** — **no** usar retratos de stock con nombres inventados. Usar: cifras agregadas
   verificables + **banda de logos de tiendas** (Amazon, Shein, AliExpress, Walmart, eBay). Foto real de
   cliente solo si es real y con permiso.
6. **OG / redes** (1200×630) — logo + claim ("Importaciones a Nicaragua desde EE. UU., China y Panamá") +
   WhatsApp, sobre base navy/negro. Lo ve todo el que comparte el link.

---

## 4. Jerarquía de fuentes

1. **Foto propia (preferida, no negociable para credibilidad).** Sesión de medio día con móvil moderno +
   luz natural, guiada por este shot list. Equipo/oficina Managua, proceso, entrega en puerta.
2. **Stock curado que parezca real** (puente mientras no haya foto propia). Criterio: gente y logística
   reales, luz cálida, sin estética "corporativa de banco". Fuentes: Unsplash, Pexels (gratis, revisar
   licencia); Getty/Adobe Stock si hay presupuesto. Siempre pasar por el grado de color de §2.
3. **Ilustración / gráfico** donde la foto no aporta: mapa de rutas, comparativa aéreo vs marítimo,
   iconografía unificada. Sustituye la necesidad de fotografiar bodegas internacionales.

---

## 5. La vara "logística top mundial"

Qué hacen los grandes y debemos imitar en espíritu: **operación real a escala** (no clip-art), **personas**
en el centro (el humano que recibe/entrega), **movimiento** (nada estático), y **contención** — una imagen
fuerte por sección, mucho aire, el color de marca como acento puntual. Menos, pero real y bien iluminado,
vence a mucho stock genérico.

---

## 6. Especificaciones técnicas (para cuando lleguen los assets)

| Slot | Dimensión objetivo | Formato | Peso máx |
|---|---|---|---|
| Hero | 1920×1080 (+ 1280, 768 responsive) | AVIF + WebP, fallback | ≤ 200 KB (LCP) |
| Servicios / bloques | 800×600 | WebP | ≤ 90 KB |
| Cómo funciona (secuencia) | 640×640 | WebP | ≤ 60 KB c/u |
| OG | 1200×630 | PNG/WebP | ≤ 150 KB |
| Logos tiendas (banda) | alto ~40 px | SVG > PNG | mínimo |

- **Optimización:** procesar con `astro:assets` (mueve las fotos a `src/assets/` para que Astro genere
  `srcset` + AVIF/WebP + LQIP automáticamente) o, para las de `public/`, un paso con `sharp` como el que ya
  usamos para los logos. **No** subir JPG de cámara sin comprimir.
- **Responsive:** 3 anchos por foto grande; `loading="lazy"` salvo el hero; `width`/`height` siempre (CLS 0).
- **SEO:** `alt` descriptivo y honesto en español; nombres de archivo con palabras clave
  (`entrega-paquete-managua.webp`, no `IMG_2931.jpg`).
- **Presupuesto de performance del sitio:** FCP < 1.5 s, LCP < 2.5 s mobile, Lighthouse > 90. El hero es el
  riesgo #1 — de ahí el tope de ≤ 200 KB.

---

## 7. Flujo cuando lleguen las fotos nuevas (orquestación)

1. Recibir originales (máxima resolución) en una carpeta temporal.
2. Recortar al aspecto del slot (§6) y aplicar grado de color de §2.
3. Generar variantes optimizadas (AVIF/WebP + responsive) con `astro:assets` o `sharp`.
4. Colocar en `src/assets/images/` (procesadas por Astro) o `public/images/` (estáticas) según el uso.
5. Actualizar referencias en componentes + `alt` + `width/height`.
6. Verificar Lighthouse (LCP/CLS) y previsualizar antes de mergear.

*Renato orquesta este flujo cuando Maya entregue los assets. Este doc es la preparación; no se cambian
fotos todavía.*

---

## 8. Checklist de reemplazo

- [ ] Hero: foto real o mapa de rutas, optimizado (≤ 200 KB), reemplaza `background.jpeg`.
- [ ] OG branded 1200×630 reemplaza `public/og-image.png`.
- [ ] 1 foto real por bloque de Servicios (aéreo, marítimo).
- [ ] Secuencia "Cómo funciona" (3–4 fotos reales del proceso en Nicaragua).
- [ ] Prueba social: cifras verificables + banda de logos de tiendas (sin retratos de stock).
- [ ] Eliminar del DOM `TestimonialsSection` con retratos falsos (hoy solo `hidden`) si no hay reales.
- [ ] Todas las fotos: AVIF/WebP, responsive, `alt`, `width/height`, dentro del presupuesto de performance.
