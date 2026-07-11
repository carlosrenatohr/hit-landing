# HIT CARGO — Manual de marca

**Brand Book · Fundamentos** · Versión 1.0 · 2026 · Mercado: Nicaragua / EE. UU. · Interno · Confidencial

> *Envíos que conectan.*
>
> Documento maestro de marca. Define **qué** usar y **por qué**. Los tokens técnicos viven en
> `tailwind.config.js`; si cambian los valores acá, actualizar ambos. Incluye, además de los
> fundamentos de marca (01–10), un **anexo de recursos del sitio web** (A–C) con el research y las
> decisiones técnicas usadas hasta ahora.

## Índice

**Fundamentos de marca**

01. ADN de marca — propósito y valores
02. Voz y tono — cómo hablamos
03. Paleta de colores — sistema cromático
04. Tipografía — jerarquía y voz visual
05. Logotipo — versiones y uso correcto
06. Elementos visuales — lenguaje gráfico y tratamiento
07. Estilo fotográfico — dirección de arte
08. Sistema de contenidos — formatos y tono por pieza
09. Calendario de marca — plantillas por temporada
10. Manifiesto y contacto

**Anexo · Recursos del sitio**

- A. Stack y arquitectura — Astro + Preact
- B. Archivos de datos — contenido y tokens
- C. Extensión y tracker — roadmap de contenido

---

## 01 · ADN de marca

HIT CARGO existe para acortar distancias. Movemos paquetes entre Estados Unidos y Nicaragua, pero lo
que entregamos es **certeza**: la tranquilidad de saber que lo que importa va a llegar.

Nuestra identidad une la **eficiencia de la logística moderna** con el calor de la **cercanía latina**.
Somos una marca en movimiento: directa, confiable y humana. Ese equilibrio —lo técnico sostenido por
lo emocional— es lo que nos hace reconocibles y lo que guía cada decisión de este manual.

**Nuestro propósito.** Conectar personas, negocios y oportunidades a ambos lados de la frontera — con
la seguridad y la calidez de quien entiende lo que hay dentro de cada caja.

**Pilares de marca**

- **Cercanía humana** — Hablamos claro y tratamos cada envío como si fuera nuestro.
- **Rapidez eficiente** — Procesos ágiles, sin fricción ni esperas innecesarias.
- **Confianza segura** — Transparencia y cuidado en cada etapa del trayecto.
- **Conexión que une** — Un puente real entre quienes están lejos.
- **Movimiento siempre** — La marca respira dinamismo: nunca se detiene.

## 02 · Voz y tono

Hablamos como una persona cercana y capaz — no como una corporación. Cálidos con energía latina,
pero siempre profesionales.

**Principios de voz**

- **Claro** antes que elaborado — frases cortas, sin tecnicismos ni relleno.
- **Humano** antes que corporativo — nos dirigimos de tú a tú, con calidez.
- **Seguro** antes que exagerado — prometemos lo que cumplimos, sin inflar.
- **En movimiento** — verbos activos; la marca siempre avanza y conecta.

**Cómo suena**

| Así hablamos | Así no |
|---|---|
| "Tu paquete ya está en camino a Nicaragua." | "Su envío ha sido despachado exitosamente conforme al proceso logístico." |
| "Elige aéreo o marítimo, tú decides." | "Seleccione la modalidad de transporte de su preferencia." |
| "Lo cuidamos como si fuera nuestro." | "Garantizamos el 100% de satisfacción asegurada." |

## 03 · Paleta de colores

El color es el 10% que lo cambia todo. Sobre una base sobria de negro y navy, el **Naranja HIT**
aparece con intención: no decora, señala.

| Rol | Nombre | HEX | RGB |
|-----|--------|-----|-----|
| **Protagonista** | Naranja HIT | `#FF7A00` | rgb(255,122,0) |
| **Base** | Negro Profundo | `#111111` | rgb(17,17,17) |
| **Soporte estratégico** | Azul Navy | `#14213D` | rgb(20,33,61) |
| **Respiración** | Blanco | `#FFFFFF` | rgb(255,255,255) |

**Escala del protagonista** (para estados, hovers y degradados):
`50 #FFF3E6` · `100 #FFDCB3` · `300 #FFB870` · `400 #FF9433` · **`500 #FF7A00`** · `600 #E56E00` ·
`700 #B35600` · `800 #803E00`

**Proporción 70 / 20 / 10:** 70% colores oscuros (base) · 20% blanco (respiración) · 10% Naranja HIT
(protagonista).

**Azul Navy = soporte estratégico.** Refuerza confianza y profesionalismo; es base, nunca acento ni
CTA. **Accesibilidad:** blanco sobre negro/navy cumple AAA; el naranja rinde en acentos, botones y
texto grande — para párrafos pequeños sobre blanco, preferir el negro.

**En la web, estos son los únicos colores.** El sitio y todas las piezas digitales deben implementar
exactamente estos tokens: naranja para acción/foco, negro/navy como base, blanco para respirar. Nada
fuera de la paleta.

## 04 · Tipografía

Dos familias, una sola voz. **Sin cursivas ni scripts** — la consistencia se logra por peso, no por
mezcla de fuentes.

- **Montserrat** — títulos, etiquetas e impacto. Toda la jerarquía fuerte se construye con sus pesos:
  Black/ExtraBold para titulares, Bold/SemiBold para etiquetas y UI.
- **Sans de lectura estilo Amazon (Poppins)** — cuerpos de texto, párrafos y descripciones. Limpia,
  moderna y cercana. Montserrat Regular/Medium sirve como alternativa de lectura.

**Escala tipográfica:** Display (Montserrat Black) → Título (Montserrat ExtraBold) → Etiqueta
(Montserrat Bold, mayúsculas espaciadas) → Cuerpo (Poppins).

## 05 · Logotipo

Un solo símbolo, cuatro maneras de aparecer. Elegir la versión que garantice contraste y respeto por
el espacio.

- **Versión principal** — globo/flecha en naranja + "HIT CARGO" en negro, sobre fondo claro.
- **Versión en blanco** — sobre fondos oscuros.
- **Versión en azul** — sobre navy `#14213D`.
- **Versión en negro** — sobre fondos claros.

*(El isologo suelto se descartó; no se usa como logo. El favicon/avatar sí emplean el globo/flecha,
pero como icono de app, no como logo.)*

**Especificaciones**

- **Área de protección:** reservar alrededor del logo un margen igual a la altura de la letra "H".
- **Tamaño mínimo:** 24 mm de ancho en impresión · 120 px en digital. Mantener siempre legible
  "HIT CARGO".
- **Fondo:** preferir fondos oscuros o con overlay; sobre foto, siempre garantizar contraste.

**Aplicaciones correctas:** buen contraste y legibilidad · mantener el área de protección · usar
sobre fondos oscuros o con overlay.

**Usos incorrectos:** ❌ cambiar los colores · ❌ deformar o alterar proporciones · ❌ usar sobre
fondos sin contraste · ❌ agregar efectos no permitidos.

## 06 · Elementos visuales y tratamiento

Un kit gráfico coherente que traduce el movimiento y la conexión en formas.

**Elementos:** rutas punteadas · aviones · cajas · flechas de movimiento · mapas · glow naranja ·
curvas dinámicas · tracking visual · partículas suaves · sombras modernas · iconografía lineal ·
energía en movimiento.

**Tratamiento visual:** alto contraste (impacto inmediato) · glow naranja (energía y enfoque) ·
degradados oscuros (profundidad) · movimiento (siempre presente) · iconografía lineal (consistente y
moderna).

## 07 · Estilo fotográfico

Imágenes **reales, cálidas y dinámicas**. La marca se cuenta con gente y con carga de verdad
moviéndose — nunca con stock frío o genérico.

**Atmósfera:** humana (personas reales, la emoción de recibir) · en movimiento (aviones, cajas,
oficinas activas) · cálida (luz natural, tonos tierra, acentos de naranja).

**Buscamos:** momentos genuinos · luz cálida y contexto real de logística · composición limpia con
espacio para el mensaje.

**Evitamos:** stock frío o poses forzadas · sobre-edición y colores fuera de marca · imágenes
saturadas que compiten con el texto.

## 08 · Sistema de contenidos

Cinco formatos, un mismo ADN. Cada pieza tiene propósito y tono claros.

1. **Comunicados** — serio · claro · oficial. Anuncios y avisos importantes.
2. **Promociones** — dinámico · impactante. Ofertas y campañas de temporada.
3. **Educativos** — útil · profesional. Cómo funciona, guías y tips.
4. **Carruseles** — informativo · claro. Paso a paso y comparativas.
5. **Stories** — rápido · visual · directo. Novedades del día a día.

**Ejemplos de aplicación:** promo "¡Envíamos tu amor!" (Día de la Madre) con tarifas Aéreo
**US$6.25/lb** y Marítimo **US$2.90/lb**; educativo "¿Cómo funciona tu envío?"; carrusel "01 · Elige
tu tipo de envío: Aéreo o Marítimo"; story "Tu carga segura, nosotros la llevamos".

**Regla transversal:** el **Naranja HIT** marca lo importante (precios, CTA, palabra clave); el resto
vive sobre base oscura con blanco para respirar. Toda la tipografía es Montserrat (+ Poppins para
leer); sin cursivas.

## 09 · Calendario de marca

| Mes / temporada | Ocasión | Frase |
|---|---|---|
| Enero | Regreso a clases | ¡Listos para un nuevo comienzo! |
| Febrero | San Valentín | Enviamos tu amor |
| Marzo | Día de la Mujer | Fuerza que nos mueve |
| Mayo | Día de las Madres | Para mamá, sin fronteras |
| Junio | Día del Padre | Papá merece lo mejor |
| Agosto | Fiestas Agostinas | Celebramos nuestras raíces |
| Septiembre | Fiestas Patrias | ¡Viva Nicaragua! |
| Prime Day | Ofertas | Ofertas que no puedes dejar pasar |
| Black Friday | Noviembre | Grandes ofertas, envíos que llegan |
| Navidad | Diciembre | Lo mejor de la Navidad, lo llevamos a ti |

Todas las frases van en **Montserrat** (las emocionales pueden ir en naranja para distinguirlas). Sin
cursivas. Naranja solo en el foco del mensaje.

## 10 · Manifiesto y contacto

> *HIT CARGO no diseña flyers, diseña marca.*

**Siempre presentes:** en cada envío · en cada historia · en cada conexión. *Envíos que conectan.*

**Contacto:** WhatsApp `8208-5181` · Instagram `@hit.cargo` · Web `HITCARGO.COM`

---

# Anexo — Recursos del sitio web (research)

> La misma marca, expresada en código. Consolidación del research y decisiones técnicas usadas hasta
> ahora, alineadas a la marca correcta (naranja `#FF7A00`, navy de soporte, contacto real). Los
> valores marcados `<confirmar>` se validan con operaciones antes de publicar.

## A · Stack y arquitectura

El sitio está construido con **Astro + Preact**.

- **Astro** para el render de la landing: HTML estático/SSR con cero JS por defecto — performance y
  SEO de primera. Los tokens de marca viven en `tailwind.config.js`.
- **Preact** para las *islas* interactivas (tracker, FAQ, CTA de WhatsApp, formularios). Mismo modelo
  que React pero mucho más liviano; hidratación selectiva por isla.

**Arquitectura de contenido (data-driven).** El contenido está separado de la presentación: vive en
TypeScript bajo `src/content/` (y `src/config/` para los globales), importado por los componentes. El
equipo cambia textos, precios y servicios sin tocar el markup.

```
src/
  config/
    site.ts          → nombre, contacto, redes, horarios (global)
    seo.ts           → metadatos y SEO
  content/
    home.ts          → hero: título, subtítulo, CTAs
    services.ts      → Aéreo / Marítimo (icono, título, tarifa)
    howItWorks.ts    → pasos del proceso
    testimonials.ts  → reseñas de clientes
    faq.ts           → preguntas y respuestas
    copy.ts          → copy transversal
```

**Regla:** un dato que se repite (WhatsApp, Instagram, web) vive en un solo lugar (`src/config/site.ts`)
y se importa donde haga falta.

## B · Archivos de datos

### `src/config/site.ts` — datos globales (de la guía)

```ts
export const site = {
  name: "HIT CARGO",
  tagline: "Envíos que conectan.",
  whatsapp: "https://wa.me/50582085181",   // 8208-5181
  instagram: "https://instagram.com/hit.cargo",
  web: "https://hitcargo.com",
  email: "<confirmar>",                     // no figura en la guía
  address: "Nicaragua",
};
```

### `theme` — tokens de marca

```ts
export const brand = {
  orange: "#FF7A00",   // protagonista · 10% · CTAs
  black:  "#111111",   // base · 70%
  navy:   "#14213D",   // soporte estratégico
  white:  "#FFFFFF",   // respiración · 20%
};
```

> **CTA y color:** el botón de acción (Rastrear, Cotizar, WhatsApp) usa el **Naranja HIT `#FF7A00`**.
> El navy es soporte, nunca el CTA.

### `services.ts` — tipos de envío (validar tarifas base)

```ts
export const services = [
  { icon: "plane", title: "Envío Aéreo",    price: "US$6.25/lb" },  // promo Día de la Madre
  { icon: "ship",  title: "Envío Marítimo", price: "US$2.90/lb" },  // promo Día de la Madre
];
```

Nota: los precios provienen de la plantilla de promo **Día de la Madre** — referencia promocional, no
tarifas base confirmadas.

## C · Extensión y tracker

**Cómo extender.** Cuando el contenido crezca (blog, guías, página por servicio), migrar a **Content
Collections** de Astro con Markdown/MDX y validación de schemas con **Zod**:

```
src/
  content/
    config.ts
    blog/
      como-usar-casillero.md
      guia-amazon-nicaragua.md
    services/
      envio-aereo.md
      envio-maritimo.md
```

**Camino a CMS:** si el contenido se edita desde un CMS (Storyblok, Contentful), sólo se reemplazan
los imports de `src/content/*` (y `src/config/*`) por llamadas al CMS — el markup no cambia.

**Tracker y proveedores.** El rastreo consume eventos de **Everest** y **Global Connection**, con
textos distintos. La isla de Preact los estandariza y estiliza según esta guía:

- No mostrar logs crudos: estandarizar a hitos claros (recibido → en camino → en Nicaragua →
  entregado).
- Estilizar con la paleta: **Naranja HIT** solo para el paso actual; navy/negro para superficies;
  blanco para respiración.
- No inventar fechas para hitos que no se puedan atribuir con certeza.

## D · Kit de assets

Todo lo necesario para lanzar el sitio y el resto de piezas, entregado como
`HIT_CARGO_Assets.zip`. PNG con fondo transparente en alta resolución (~2400 px de ancho).

**Logotipos** (`/logo`)

- `logo-principal.png` — globo/flecha naranja + HIT CARGO en negro (fondo claro)
- `logo-blanco.png` — logo completo en blanco (fondos oscuros)
- `logo-negro.png` — logo completo en negro (fondos claros)
- `logo-naranja.png` — logo completo en naranja (monocromático)

*(El isologo suelto se descartó.)*

**Favicon y web** (`/favicon`)

- `favicon.ico` original (16/32/48/64, globo de línea transparente) · `favicon-16/32/48/64.png`
- `apple-touch-icon.png` (180) · `android-chrome-192/512.png` · `site.webmanifest`
- `site.webmanifest`

**Social / anuncios** (`/social`)

- `og-image-1200x630.png` — preview de enlaces y banner de anuncios
- `profile-navy-1000.png` / `profile-negro-1000.png` — avatares de redes

**Favicon.** Se mantiene el **favicon original** — globo/flecha naranja de línea sobre transparente,
tal cual. Los avatares de redes sí van sobre fondo sólido (navy/negro) porque las plataformas rellenan
el fondo. El `README.md` del kit incluye el snippet completo del `<head>`.

**Snippet del `<head>`:**

```html
<link rel="icon" href="/favicon/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
<link rel="manifest" href="/favicon/site.webmanifest">
<meta name="theme-color" content="#14213D">
<meta property="og:image" content="/social/og-image-1200x630.png">
<meta name="twitter:card" content="summary_large_image">
```

**Follow-up.** Para nitidez infinita y menor peso en web, exportar los logos en **SVG** desde el
archivo de diseño original — el master disponible es raster (PNG 8000 px), y un autotrace no iguala
un vector nativo.
