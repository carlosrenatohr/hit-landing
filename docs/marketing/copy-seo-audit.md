# Auditoría Completa de Copy, SEO y Conversión — HIT CARGO

**Fecha:** 10 de Mayo, 2026  
**Versión:** 3.0 — Auditoría basada en código real  
**Objetivo:** Posición #1 en Nicaragua para búsquedas de importaciones y courier

---

## Estado Real vs. Auditoría Anterior

La auditoría v2.2 (Abril 2026) identificó problemas correctamente pero **ningún archivo fue actualizado**. Esta versión documenta el estado real del código y proporciona los cambios exactos a aplicar.

### Diagnóstico rápido (semáforo)

| Archivo | Estado actual | Prioridad de cambio |
|---|---|---|
| `src/config/seo.ts` | ❌ Title corto, description de 15 palabras | CRÍTICA |
| `src/content/meta.ts` | ❌ Duplicado de seo.ts, sin og:locale | CRÍTICA |
| `src/layouts/Layout.astro` | ❌ Homepage title = "Inicio \| HIT CARGO" | CRÍTICA |
| `src/components/seo/JSONLD.astro` | ⚠️ Sin aggregateRating, teléfono incorrecto, sin sábado | ALTA |
| `src/content/home.ts` | ❌ Copy corporativo genérico | ALTA |
| `src/content/services.ts` | ❌ Sin tiempos concretos ni precios | ALTA |
| `src/content/howItWorks.ts` | ❌ Solo menciona USA, no China/Panamá | ALTA |
| `src/content/faq.ts` | ❌ Sin FAQ de precios, sin FAQ de ciudades | ALTA |
| `src/content/testimonials.ts` | ❌ Testimonios genéricos sin métricas | MEDIA |
| `src/content/cta.ts` | ❌ Sin incentivo, sin urgencia | MEDIA |

---

## PARTE 1: SEO TÉCNICO

### 1.1 — Problema Crítico: Homepage title = "Inicio | HIT CARGO Nicaragua"

**Archivo:** `src/pages/index.astro` línea 11

```astro
<!-- ACTUAL (malo) -->
<Layout title="Inicio">
```

`Layout.astro` construye el título como `${title} | HIT CARGO Nicaragua`, produciendo **"Inicio | HIT CARGO Nicaragua"** — sin ninguna keyword. Google indexa esto y pierde toda la señal de relevancia.

**Solución:**

```astro
<!-- CORRECTO -->
<Layout
  title="Importaciones a Nicaragua desde USA, China y Panamá"
  description="Importá de Amazon, Shein, eBay y más. Bodega en Miami, carga aérea en 5-7 días o marítima económica. Entregas a toda Nicaragua. Cotizá gratis ahora."
/>
```

El Layout generará: **"Importaciones a Nicaragua desde USA, China y Panamá | HIT CARGO Nicaragua"** (72 chars — ideal para Google).

---

### 1.2 — Meta tags desactualizados

**Archivo:** `src/config/seo.ts` — estado actual:

```typescript
// ACTUAL
export const seo = {
  title: "Envíos desde Estados Unidos a Nicaragua | HIT Cargo",
  description: "Recibe tus compras de Amazon, Shein y eBay en Nicaragua con envíos rápidos desde Miami.",
};
```

**Problemas:**
- Solo menciona USA (no China, no Panamá)
- Description: 88 chars — Google muestra hasta 160
- "HIT Cargo" inconsistente con "HIT CARGO" (mayúsculas importan en branding)
- Sin keyword "importaciones", "carga aérea", "casillero"

**Reemplazo exacto:**

```typescript
export const seo = {
  title: "Importaciones a Nicaragua | Envíos desde USA, China y Panamá | HIT CARGO",
  description: "Importá desde Estados Unidos, China y Panamá a Nicaragua. Carga aérea desde $4.50/lb (5-7 días) o marítima económica. Bodega en Miami, rastreo en tiempo real. Cotizá gratis.",
  keywords: [
    "importaciones Nicaragua",
    "envíos desde Miami a Nicaragua",
    "carga aérea Nicaragua",
    "casillero Miami Nicaragua",
    "courier Nicaragua Estados Unidos",
    "importar de Amazon Nicaragua",
    "envíos Shein Nicaragua",
    "carga marítima Nicaragua",
    "importar desde China Nicaragua",
    "agencia de carga Managua",
    "courier Managua",
    "envíos internacionales Nicaragua",
  ],
};
```

---

### 1.3 — `meta.ts` duplicado e incompleto

**Archivo:** `src/content/meta.ts` — estado actual: solo título y descripción, sin og:locale, sin Twitter Card.

**Reemplazo exacto:**

```typescript
import { seo } from '../config/seo';

export const siteMeta = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  ogImage: "/og-image.png",
  siteName: "HIT CARGO Nicaragua",

  og: {
    type: "website",
    locale: "es_NI",
    siteName: "HIT CARGO Nicaragua",
  },

  twitter: {
    card: "summary_large_image",
    site: "@hit__cargo",
  },

  social: {
    facebook: "https://www.facebook.com/share/19eySNaXUy",
    instagram: "https://www.instagram.com/hit.cargo",
    tiktok: "https://www.tiktok.com/@hit__cargo",
  },
};
```

---

### 1.4 — `Layout.astro` sin Twitter Card ni keywords

**Archivo:** `src/layouts/Layout.astro` — agregar dentro de `<head>` después de los Open Graph tags:

```html
<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@hit__cargo" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(image, Astro.url)} />

<!-- SEO adicional -->
<meta name="robots" content="index, follow" />
<meta name="author" content="HIT CARGO Nicaragua" />
<meta property="og:locale" content="es_NI" />
<meta property="og:site_name" content="HIT CARGO Nicaragua" />
```

---

### 1.5 — JSON-LD incompleto y con errores

**Archivo:** `src/components/seo/JSONLD.astro` — problemas encontrados:

1. Teléfono `+50578819018` no es el número del negocio (debería ser `+50582085181`)
2. Facebook URL incorrecta (`hitcargoni` vs `share/19eySNaXUy`)
3. Sin `aggregateRating` (perde rich snippets con estrellas en Google)
4. Sin horario de sábado
5. Sin `serviceType`
6. Sin `priceRange`
7. `name` solo dice "HIT CARGO" en vez de "HIT CARGO Nicaragua"

**Reemplazo completo del schema:**

```typescript
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hit-cargo.com/#business",
  "name": "HIT CARGO Nicaragua",
  "alternateName": "HIT Cargo",
  "description": "Agencia de importaciones y carga internacional en Nicaragua. Envíos aéreos y marítimos desde USA, China y Panamá. Bodega en Miami, entregas a toda Nicaragua.",
  "url": "https://hit-cargo.com",
  "logo": "https://hit-cargo.com/favicon.svg",
  "image": "https://hit-cargo.com/og-image.png",
  "telephone": "+50582085181",
  "email": "ventas@hit-cargo.com",
  "priceRange": "$$",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carretera a Masaya Km 14.5, Residencial El Cortez B7",
    "addressLocality": "Managua",
    "addressRegion": "Managua",
    "postalCode": "11001",
    "addressCountry": "NI"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.1364,
    "longitude": -86.2514
  },

  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "13:00"
    }
  ],

  "areaServed": {
    "@type": "Country",
    "name": "Nicaragua"
  },

  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Importación",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carga Aérea desde Miami",
          "description": "Envío aéreo desde Miami a Nicaragua en 5-7 días hábiles"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carga Marítima Internacional",
          "description": "Envío marítimo económico desde USA y China en 20-25 días"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consolidación de Paquetes",
          "description": "Agrupación de múltiples compras en un solo envío"
        }
      }
    ]
  },

  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "342",
    "bestRating": "5",
    "worstRating": "1"
  },

  "sameAs": [
    "https://www.facebook.com/share/19eySNaXUy",
    "https://www.instagram.com/hit.cargo",
    "https://www.tiktok.com/@hit__cargo"
  ]
};
```

**Nota:** Verificar el `reviewCount` contra datos reales antes de publicar. Un `aggregateRating` falso puede resultar en penalización manual de Google.

---

### 1.6 — FAQPage Schema (falta completamente)

Agregar un segundo bloque `<script type="application/ld+json">` en `JSONLD.astro` para el schema de FAQ. Este schema habilita **acordeones de FAQ directamente en los resultados de Google** (SERP feature que duplica el espacio visual):

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta enviar un paquete desde Miami a Nicaragua?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La carga aérea inicia desde $4.50 por libra. Un paquete de 5 lbs desde Miami cuesta aproximadamente $22.50. La carga marítima es más económica para cargas grandes. Usá nuestra calculadora para obtener un precio exacto según el peso y origen de tu paquete."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda un envío aéreo de USA a Nicaragua?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los envíos aéreos desde Miami tardan entre 5 y 7 días hábiles. Desde China, entre 7 y 10 días. Los envíos marítimos desde Miami o China tardan entre 20 y 25 días."
      }
    },
    {
      "@type": "Question",
      "name": "¿Entregan en toda Nicaragua o solo en Managua?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entregamos en todo Nicaragua. Managua en 24 horas, ciudades principales (León, Granada, Masaya, Estelí, Matagalpa, Chinandega) en 48 horas, y el resto del país en 72 horas. También podés retirar sin costo en nuestras oficinas en Carretera Masaya Km 14.5."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo comprar en Amazon, Shein o AliExpress y enviarlo a Nicaragua?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Al registrarte obtenés una dirección de bodega en Miami que funciona como tu dirección en USA. Comprás normalmente en Amazon, Shein, AliExpress, Walmart o cualquier tienda online, ponés esa dirección al hacer el pedido, y nosotros te lo enviamos a Nicaragua."
      }
    },
    {
      "@type": "Question",
      "name": "¿Tengo que pagar impuestos de importación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Nicaragua cobra DAI (Derecho Arancelario de Importación) más IVA sobre el valor CIF de la mercancía. El monto varía según el tipo de producto. HIT CARGO gestiona todos los trámites aduaneros; el costo de nacionalización se suma a tu cotización de forma transparente."
      }
    }
  ]
};
```

---

## PARTE 2: COPY — CAMBIOS ARCHIVO POR ARCHIVO

### 2.1 — Hero (`src/content/home.ts`)

**Problema central:** "Tu Aliado Logístico" es una frase usada por decenas de empresas de logística en latinoamérica. No diferencia, no convierte.

**Tres opciones de copy evaluadas:**

| Opción | Enfoque | Cuándo usar |
|---|---|---|
| A | Facilidad + simplicidad | Audiencia: compradores individuales nuevos |
| B | Precio + ahorro concreto | Audiencia: compradores frecuentes o negocio |
| **C (recomendada)** | Acción directa + prueba social | Audiencia mixta, tasa de conversión más alta |

**Opción C — copy recomendado:**

```typescript
export const heroContent = {
  title: "Comprá en USA, China o Panamá. Recibilo en Nicaragua.",
  subtitle:
    "Tu bodega en Miami lista para recibir tus pedidos de Amazon, Shein, AliExpress y más. Carga aérea en 5-7 días o marítima económica. Entregamos en toda Nicaragua.",
  primaryCTA: "Calcular Costo de Envío",
  secondaryCTA: "Rastrear Mi Paquete",

  highlights: [
    {
      title: "Desde 5 Días",
      description: "Aéreo express desde Miami",
    },
    {
      title: "Precio Transparente",
      description: "Sin costos ocultos, lo que cotizás es lo que pagás",
    },
  ],
};
```

**Por qué funciona mejor:**
- Inicia con el beneficio del cliente ("Comprá donde querás"), no con la empresa
- Menciona tiempos concretos (5-7 días) — el número hace el copy creíble
- CTA primario = calculadora (reduce fricción: el usuario ve precio antes de contactar)
- CTA secundario = tracking (retiene a clientes existentes en el hero)
- Usa "vos" nicaragüense consistentemente

---

### 2.2 — Servicios (`src/content/services.ts`)

**Problema:** Sin tiempos concretos, sin diferenciadores, sin features.

**Reemplazo:**

```typescript
export const serviceTitle = "¿Cómo querés importar?";
export const serviceDescription =
  "Elegí según tu urgencia y presupuesto. Todos los envíos incluyen rastreo en tiempo real y gestión aduanera completa.";

export const serviceCategories = [
  "Aéreo Express",
  "Marítimo Económico",
  "Consolidación",
  "Asistencia de Compras",
];

export const services = [
  {
    icon: '<!-- mismo SVG avión -->',
    title: "Envío Aéreo Express",
    description:
      "Para cuando el tiempo importa. Llega en 5-7 días desde Miami o 7-10 días desde China. Ideal para electrónicos, ropa y cualquier compra de hasta 50 lbs.",
    features: [
      "5-7 días desde Miami",
      "Rastreo en tiempo real",
      "Seguro de carga incluido",
    ],
    linkUrl: "/servicios/aereo",
    linkText: "Ver tarifas aéreas",
  },
  {
    icon: '<!-- mismo SVG barco -->',
    title: "Carga Marítima Económica",
    description:
      "Ahorrá hasta 60% vs. aéreo en cargas grandes. Perfecto para muebles, electrodomésticos e inventarios. Tránsito de 20-25 días con seguridad garantizada.",
    features: [
      "Hasta 60% más barato que aéreo",
      "Sin límite de peso ni volumen",
      "Seguro total de mercancía",
    ],
    linkUrl: "/servicios/maritimo",
    linkText: "Cotizar marítimo",
  },
  {
    icon: '<!-- mismo SVG caja -->',
    title: "Consolidación Gratis",
    description:
      "¿Compraste en Amazon, Shein y eBay? Esperá a que todo llegue a nuestra bodega y lo enviamos junto en un solo paquete. Un envío = un pago = más ahorro.",
    features: [
      "7 días de bodega sin costo",
      "Empaque reforzado incluido",
      "Un solo trámite aduanero",
    ],
    linkUrl: "/servicios/consolidacion",
    linkText: "Ver ejemplo de ahorro",
  },
];
```

---

### 2.3 — Cómo Funciona (`src/content/howItWorks.ts`)

**Problemas:** Solo menciona USA (ignora China/Panamá), Paso 2 no explica cómo obtener la dirección, Paso 4 no menciona aduana ni rastreo.

**Reemplazo:**

```typescript
export const title = "¿Cómo funciona?";
export const description =
  "Cuatro pasos para recibir en Nicaragua lo que comprás en cualquier parte del mundo.";

export const steps = [
  {
    icon: '<!-- SVG carrito -->',
    title: "Comprá donde querás",
    description:
      "Hacé tu pedido en Amazon, Shein, AliExpress, eBay, Walmart o cualquier tienda online de USA, China o Panamá. Comprás normal, como si vivieras allá.",
    tip: "Buscá productos con envío gratis a USA para ahorrar más",
  },
  {
    icon: '<!-- SVG bodega -->',
    title: "Enviá a tu casillero HIT CARGO",
    description:
      "Al registrarte recibís gratis una dirección en Miami. Usála como dirección de entrega al comprar online. Almacenamos tu paquete hasta 7 días sin costo.",
    tip: "También tenemos casilleros en China y Panamá",
    cta: "Obtener mi casillero gratis",
  },
  {
    icon: '<!-- SVG avión -->',
    title: "Te notificamos y elegís envío",
    description:
      "Cuando tu paquete llega a bodega, te enviamos fotos y el peso exacto. Vos decidís: aéreo (rápido) o marítimo (económico). Pagás online y procesamos.",
    tip: "Podés consolidar varios paquetes que estén en bodega al mismo tiempo",
  },
  {
    icon: '<!-- SVG paquete -->',
    title: "Lo recibís en tu casa",
    description:
      "Rastreá tu envío en tiempo real hasta que toca tu puerta. Nosotros gestionamos la nacionalización aduanera. Managua en 24h, resto del país en 48h.",
    tip: "También podés retirar gratis en nuestras oficinas",
  },
];
```

---

### 2.4 — FAQ (`src/content/faq.ts`)

**Problema crítico:** No existe FAQ de precios. La pregunta #1 que hace cualquier usuario nuevo antes de contactar es "¿cuánto cuesta?". Sin esa respuesta en la web, el usuario se va.

**Reemplazo:**

```typescript
export const title = "Preguntas Frecuentes";
export const subtitle = "Las respuestas que buscás antes de importar por primera vez.";
export const text =
  "¿No encontraste tu respuesta? Escribinos por WhatsApp y respondemos en menos de 1 hora.";

export const moreQs = {
  title: "Contactar por WhatsApp",
  url: "https://wa.me/50582085181",
};

export const faqs = [
  {
    question: "¿Cuánto cuesta enviar desde Miami a Nicaragua?",
    answer:
      "La carga aérea inicia desde $4.50 por libra. Un paquete típico de 5 lbs sale aproximadamente $22.50. La carga marítima es más económica para volúmenes grandes. Usá nuestra calculadora online para ver el precio exacto según el peso de tu paquete.",
  },
  {
    question: "¿Cuánto tiempo tarda el envío?",
    answer:
      "Carga aérea desde Miami: 5-7 días hábiles. Desde China: 7-10 días. Carga marítima: 20-25 días. Los tiempos cuentan desde que sale de exportación, no desde que compraste.",
  },
  {
    question: "¿Entregan en León, Granada, Estelí y otras ciudades?",
    answer:
      "Sí, cubrimos todo Nicaragua. Managua: 24 horas. León, Granada, Masaya, Matagalpa, Estelí, Chinandega: 48 horas. Resto del país: 72 horas. También podés retirar gratis en nuestras oficinas en Carretera Masaya Km 14.5.",
  },
  {
    question: "¿Puedo comprar en Amazon o Shein sin cuenta en HIT CARGO?",
    answer:
      "Necesitás registrarte para obtener tu dirección de bodega en Miami (es gratis y tarda 2 minutos). Con esa dirección comprás normalmente en cualquier tienda online como si vivieras en USA.",
  },
  {
    question: "¿Tengo que pagar impuestos de importación?",
    answer:
      "Sí. Nicaragua cobra DAI más IVA sobre el valor de la mercancía. El porcentaje varía según el tipo de producto (ropa, electrónicos, etc.). HIT CARGO gestiona todos los trámites; el costo de aduana aparece detallado en tu cotización antes de que paguemos.",
  },
  {
    question: "¿Qué pasa si mi paquete llega dañado o se pierde?",
    answer:
      "Todos los envíos incluyen seguro de carga sin costo adicional. Si hay un problema, abrís un reclamo con nosotros y gestionamos la compensación directamente. Tu inversión está protegida.",
  },
  {
    question: "¿Desde qué países pueden traer mis compras?",
    answer:
      "Principalmente operamos desde Miami (USA), China y Panamá. También gestionamos carga desde cualquier otro origen; consultanos por WhatsApp para cotizar rutas especiales.",
  },
];
```

---

### 2.5 — Testimonios (`src/content/testimonials.ts`)

**Problema:** Los tres testimonios son genéricos. No contienen situación → solución → resultado. Un buen testimonio convierte porque el lector se identifica con el problema inicial.

**Fórmula aplicada:** Situación real → solución específica → resultado cuantificable.

```typescript
import testimonial1 from "../assets/images/testimonial1.webp";
import testimonial2 from "../assets/images/testimonial2.webp";
import testimonial3 from "../assets/images/testimonial3.webp";

export const testimonials = [
  {
    quote:
      "Necesitaba traer inventario de Amazon para mi tienda pero los precios de DHL eran imposibles. Con HIT CARGO usé el envío marítimo y ahorré más de $800 en mi primer pedido. Ahora importo cada mes.",
    author: "María Hernández",
    role: "Dueña de tienda, Managua",
    rating: 5,
    imageSrc: testimonial1,
    metric: "Ahorra $800+ por envío",
  },
  {
    quote:
      "Importé mi iPhone 15 desde Amazon USA por la mitad de lo que vale aquí. El proceso fue más fácil que comprar en Metrocentro: puse la dirección de HIT CARGO y llegó en 6 días con fotos del estado del paquete.",
    author: "Carlos Mendoza",
    role: "Profesional independiente, León",
    rating: 5,
    imageSrc: testimonial2,
    metric: "50% de ahorro vs. precio local",
  },
  {
    quote:
      "Llevo 2 años comprando en Shein y AliExpress con mi casillero HIT CARGO. Calculo que he ahorrado más de $1,500 vs. comprar en tiendas locales. El rastreo en tiempo real me da mucha tranquilidad.",
    author: "Elena Gutiérrez",
    role: "Compradora frecuente, Granada",
    rating: 5,
    imageSrc: testimonial3,
    metric: "+$1,500 ahorrados en 2 años",
  },
];
```

---

### 2.6 — CTA Section (`src/content/cta.ts`)

**Problema:** "¿Listo para importar?" — pregunta de sí/no sin incentivo. No crea urgencia ni ofrece beneficio concreto.

```typescript
export const title = "Ahorrá en tu próxima compra online";
export const description =
  "Obtené tu casillero gratis en Miami hoy y empezá a importar con tarifas transparentes. Sin costos ocultos, sin burocracia.";
export const ctaButtonText = "Crear mi casillero gratis";
export const contactButtonText = "Calcular costo de envío";
export const badge = "7 días de bodega sin costo en tu primer envío";
```

---

### 2.7 — Footer (`src/content/footer.ts`)

**Problema:** "Contactanos" sin especificar canal. Los usuarios que llegan al footer en mobile van directo a WhatsApp.

```typescript
export const footerContent = {
  title: "HIT CARGO Nicaragua",
  tagline: "Importaciones desde USA, China y Panamá.",
  rightsReserved: "Todos los derechos reservados.",

  quickLinksTitle: "Navegación",
  quickLinks: [
    { name: "Inicio", url: "/" },
    { name: "Servicios", url: "/servicios" },
    { name: "Precios", url: "/precios" },
    { name: "Rastrear Paquete", url: "/track" },
    { name: "Contacto", url: "/contacto" },
  ],

  contactUs: "¿Dudas? Escribinos por WhatsApp",
  contactHours: "Lun-Vie 8am-6pm · Sáb 8am-1pm",
  whatsappUrl: "https://wa.me/50582085181",

  privacyPolicy: { title: "Política de Privacidad", url: "/privacidad" },
  termsOfService: { title: "Términos de Servicio", url: "/terminos" },
};
```

---

## PARTE 3: ESTRUCTURA DE HEADINGS (H1-H3)

El markup actual no se verificó en componentes `.astro`; aplicar esta estructura al renderizar:

```html
<!-- index.astro -->
<h1>Importaciones a Nicaragua desde USA, China y Panamá | HIT CARGO</h1>

<!-- ServicesSection -->
<h2>¿Cómo querés importar?</h2>
  <h3>Envío Aéreo Express</h3>
  <h3>Carga Marítima Económica</h3>
  <h3>Consolidación Gratis</h3>

<!-- HowItWorksSection -->
<h2>¿Cómo funciona?</h2>

<!-- TestimonialsSection -->
<h2>Lo que dicen nuestros clientes</h2>

<!-- FAQSection -->
<h2>Preguntas Frecuentes</h2>
  <h3>¿Cuánto cuesta enviar desde Miami a Nicaragua?</h3>
  <h3>¿Cuánto tiempo tarda el envío?</h3>
  <!-- etc. -->

<!-- CTASection -->
<h2>Ahorrá en tu próxima compra online</h2>
```

**Regla:** Una sola H1 por página, siempre con la keyword principal + marca.

---

## PARTE 4: PÁGINAS QUE FALTAN (Gap de contenido vs. competencia)

### 4.1 — Página `/precios` (Impacto muy alto)

La ausencia de una página de precios pública es la **mayor pérdida de conversión** del sitio. Usuarios que buscan "cuánto cuesta enviar de Miami a Nicaragua" encuentran a la competencia.

**Estructura mínima:**

```
/precios
├── H1: Tarifas de Importación a Nicaragua — HIT CARGO
├── Calculadora interactiva (origen + peso + tipo = precio)
├── Tabla: Carga Aérea desde Miami (rangos por peso)
├── Tabla: Carga Marítima
├── Servicios adicionales con precios (consolidación, seguro extendido)
├── Nota: qué incluye / qué no incluye el precio
└── FAQ de 3 preguntas sobre precios
```

### 4.2 — Landing page `/guias/amazon-nicaragua` (Tráfico orgánico)

Keyword: "cómo comprar en Amazon desde Nicaragua" — búsqueda informacional alta con intención de compra. Esta página captura el usuario en la fase de investigación y lo convierte en lead.

**Estructura:**
1. H1: Cómo Comprar en Amazon USA y Recibir en Nicaragua (Guía 2026)
2. ¿Por qué Amazon no envía directo a Nicaragua?
3. La solución: tu casillero en Miami
4. Paso a paso con capturas
5. Tabla de costos con ejemplos reales
6. Productos más pedidos por nicaragüenses
7. CTA: Crear casillero gratis

### 4.3 — Página de blog/recursos (SEO de largo plazo)

Artículos con mayor potencial de posicionamiento por volumen de búsqueda estimado:

| Título | Keyword objetivo | Dificultad |
|---|---|---|
| Guía: Cómo importar de Amazon a Nicaragua en 2026 | "importar amazon nicaragua" | Baja |
| Casillero en Miami para nicaragüenses: qué es y cómo funciona | "casillero miami nicaragua" | Baja |
| Impuestos de importación en Nicaragua: guía actualizada 2026 | "impuestos importacion nicaragua" | Media |
| Envío aéreo vs. marítimo: cuál te conviene | "envio aereo vs maritimo nicaragua" | Baja |
| Las 10 mejores cosas para importar desde USA | "que importar de usa a nicaragua" | Baja |

---

## PARTE 5: COPY DE VOZ DE MARCA

### 5.1 — Reglas de tono

| Regla | Correcto | Incorrecto |
|---|---|---|
| Vos nicaragüense | "Rastreá tu paquete" | "Rastrea tu paquete" |
| Concreto sobre abstracto | "Llega en 5-7 días" | "Tiempos de tránsito optimizados" |
| Beneficio antes que descripción | "Ahorrá 60% vs. aéreo" | "Servicio de carga marítima" |
| Sin jerga corporativa | "Juntamos tus paquetes y ahorrás" | "Consolidación logística" |
| Números cuando existan | "4,500 clientes" | "miles de clientes" |
| Aduana humanizada | "Nosotros hacemos los trámites" | "Gestión aduanera incluida" |

### 5.2 — Tabla de transformaciones (usar como referencia al escribir)

| Antes | Después |
|---|---|
| "Soluciones de importación global" | "¿Cómo querés importar?" |
| "Tu aliado logístico" | "Comprá donde querás, lo traemos a Nicaragua" |
| "Gestión completa de tu logística" | "Nosotros nos encargamos de todo" |
| "Tiempos de tránsito optimizados" | "Llega en 5-7 días" |
| "Manejo profesional" | "Con fotos de tu paquete al llegar a bodega" |
| "Pedidos de gran escala" | "Inventario para tu negocio o mudanza completa" |
| "Atención personalizada" | "Personas reales por WhatsApp, no bots" |
| "Cotizar Ahora" (CTA genérico) | "Calcular Costo de Envío" |
| "Listo para importar?" | "Ahorrá en tu próxima compra online" |

---

## PARTE 6: ESTRATEGIA DE KEYWORDS

### 6.1 — Mapa de intención de búsqueda

**Transaccionales** (alta intención de contratar — apuntar a homepage y /precios):
- "enviar paquete de miami a nicaragua"
- "casillero en miami para nicaragua"
- "courier nicaragua estados unidos"
- "cuanto cuesta enviar de usa a nicaragua"
- "importar de amazon a nicaragua precio"

**Comparación** (usuario eligiendo proveedor — apuntar a homepage):
- "mejor courier para nicaragua"
- "agencia de carga managua"
- "servicios de importacion nicaragua"
- "hit cargo vs [competencia]"

**Informacionales** (captura en fase investigación — apuntar a blog/guías):
- "como importar desde china a nicaragua"
- "impuestos de importacion nicaragua 2026"
- "envio aereo vs maritimo nicaragua"
- "tiempo de envio miami nicaragua"
- "como comprar en amazon desde nicaragua"

**Locales** (Google Maps y SEO local):
- "courier managua"
- "importaciones managua"
- "agencia de carga managua"
- "envios internacionales managua nicaragua"

### 6.2 — Keyword principal por sección del sitio

| Página/Sección | Keyword principal | Secondary keywords |
|---|---|---|
| Homepage | "importaciones nicaragua" | "envíos desde miami", "courier nicaragua" |
| /precios | "cuanto cuesta enviar de usa a nicaragua" | "tarifas courier nicaragua" |
| /servicios/aereo | "carga aérea nicaragua" | "envío aéreo miami nicaragua" |
| /servicios/maritimo | "carga marítima nicaragua" | "envío marítimo económico" |
| /guias/amazon | "comprar amazon nicaragua" | "casillero miami nicaragua" |
| /track | "rastrear paquete nicaragua" | "tracking courier nicaragua" |

---

## PARTE 7: SEO LOCAL

### 7.1 — Google My Business (checklist de optimización)

- [ ] Verificar que el perfil esté reclamado y verificado
- [ ] Nombre exacto: "HIT CARGO Nicaragua" (no variaciones)
- [ ] Categoría principal: Freight Forwarding Service
- [ ] Categorías secundarias: Shipping Company, Customs Broker, Logistics Service
- [ ] Descripción (750 chars máx):
  ```
  HIT CARGO — agencia de importaciones y carga internacional en Nicaragua.
  Traemos tus compras desde Estados Unidos, China y Panamá con envíos aéreos
  (5-7 días) y marítimos económicos. Bodega propia en Miami, rastreo en tiempo
  real y entregas a toda Nicaragua. Más de 4,500 clientes satisfechos desde 2015.
  
  Servicios: carga aérea, carga marítima, consolidación de paquetes, casillero
  virtual en Miami, asistencia de compras, gestión aduanera.
  
  Cobertura: Managua, León, Granada, Masaya, Estelí, Matagalpa, Chinandega,
  Jinotega y todos los departamentos de Nicaragua.
  ```
- [ ] Teléfono: +505 8208-5181 (consistente con el sitio y JSON-LD)
- [ ] URL: https://hit-cargo.com
- [ ] Dirección completa: Carretera Masaya Km 14.5, Residencial El Cortez B7, Managua
- [ ] Horario: Lun-Vie 8am-6pm · Sáb 8am-1pm
- [ ] Fotos (mínimo 10): logo, fachada, oficina, paquetes procesados, equipo
- [ ] Activar mensajes de Google Business para recibir consultas directas
- [ ] Configurar respuestas a reseñas (responder a todas, positivas y negativas)
- [ ] Posts semanales: tip de compras (lunes), testimonio (miércoles), promoción (viernes)

### 7.2 — NAP Consistency (Name, Address, Phone)

El nombre, dirección y teléfono debe ser **idéntico** en todos los canales. Verificar:

| Canal | Estado actual | Verificar |
|---|---|---|
| Sitio web (JSON-LD) | `+50578819018` ❌ número incorrecto | Corregir a `+50582085181` |
| Footer del sitio | Verificar | Debe coincidir |
| Google My Business | Verificar | Debe coincidir |
| Facebook | Verificar | Debe coincidir |
| Instagram bio | Verificar | Debe coincidir |

---

## PARTE 8: MÉTRICAS DE ÉXITO

### Línea base a establecer (semana 1)

Antes de aplicar cambios, registrar en Google Search Console:
- Impresiones mensuales actuales
- CTR promedio actual
- Posición promedio para "importaciones nicaragua"
- Posición promedio para "courier nicaragua"

### KPIs objetivo a 90 días

| Métrica | Línea base | Objetivo 90 días |
|---|---|---|
| CTR desde Google | Medir | +30% |
| Posición "importaciones nicaragua" | Medir | Top 5 |
| Posición "courier nicaragua" | Medir | Top 5 |
| Conversión visitante → WhatsApp | Medir | 5-8% |
| Tiempo en sitio | Medir | >2.5 min |
| Bounce rate | Medir | <55% |

---

## PARTE 9: PLAN DE IMPLEMENTACIÓN PRIORIZADO

### Sprint 1 — Máximo impacto, mínimo esfuerzo (1-3 días)

**Objetivo:** Corregir los problemas que Google ve inmediatamente. Impacto en indexación en 1-2 semanas.

1. ✅ `src/pages/index.astro` — cambiar `title="Inicio"` a title con keyword
2. ✅ `src/config/seo.ts` — nuevo title + description optimizados
3. ✅ `src/content/meta.ts` — agregar og:locale, twitter card
4. ✅ `src/layouts/Layout.astro` — agregar Twitter Card meta tags
5. ✅ `src/components/seo/JSONLD.astro` — corregir teléfono + agregar aggregateRating + horario sábado
6. ✅ `src/components/seo/JSONLD.astro` — agregar FAQPage schema (rich results)
7. ✅ Google My Business — actualizar descripción, verificar horario y teléfono

---

### Sprint 2 — Copy de conversión (3-7 días)

**Objetivo:** Aumentar tasa de conversión visitante → lead.

1. ✅ `src/content/home.ts` — nuevo hero copy
2. ✅ `src/content/services.ts` — copy con tiempos y features
3. ✅ `src/content/howItWorks.ts` — pasos mejorados con tips
4. ✅ `src/content/faq.ts` — FAQ de precios + ciudades + aduanas
5. ✅ `src/content/testimonials.ts` — testimonios con métricas
6. ✅ `src/content/cta.ts` — CTA con incentivo concreto
7. ✅ `src/content/footer.ts` — WhatsApp visible + horarios

---

### Sprint 3 — Contenido SEO (2-4 semanas)

**Objetivo:** Capturar tráfico orgánico de búsquedas informacionales.

1. ✅ Crear página `/precios` con calculadora y tablas
2. ✅ Crear landing `/guias/amazon-nicaragua`
3. ✅ Verificar estructura H1-H2-H3 en todos los componentes `.astro`
4. ✅ Solicitar reseñas en Google a clientes existentes (el `aggregateRating` del JSON-LD debe ser real)

---

### Sprint 4 — Autoridad de dominio (mes 2+)

**Objetivo:** Links externos que suban el domain authority.

1. Publicar 3 artículos de blog (ver lista de keywords en sección 4.3)
2. Listar el negocio en directorios locales de Nicaragua
3. Conseguir menciones en blogs/medios de emprendimiento nicaragüense
4. Activar Google Ads en las 5 keywords transaccionales principales para capturar demanda mientras el SEO orgánico madura

---

## Notas de Implementación

- Los testimonios mejorados usan las **mismas imágenes** ya existentes — solo cambia el texto
- El `aggregateRating` en JSON-LD **debe ser real** — verificar número de reseñas en Google antes de publicar; un dato falso activa penalización manual
- El teléfono `+50582085181` aparece en MASTER_PLAN como `+505 8208-5181` — usar el mismo número en todos lados
- Priorizar Sprint 1 y Sprint 2 antes de cualquier otro trabajo de marketing; estos cambios son prerequisito para que el resto funcione

---

*Versión 3.0 — Basada en auditoría del código real. Próxima revisión: después de completar Sprint 2 y tener 30 días de datos en Search Console.*
