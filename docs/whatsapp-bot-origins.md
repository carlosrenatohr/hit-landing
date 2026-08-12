# Origenes de WhatsApp — mapa de páginas y mensajes

> Documento de referencia para programar la respuesta automática del bot de WhatsApp: cada
> enlace de la web abre el chat con un **mensaje pre-escrito que identifica la página de origen**
> y la intención del usuario. El bot puede rastrear esa intención y responder en consecuencia.

## Convención

- Número: `wa.me/50582085181` (ver `src/config/site.ts`).
- Todos los enlaces usan `?text=<mensaje URL-encoded>`.
- Los mensajes están centralizados en **`src/lib/whatsapp.ts`** (`WA_MESSAGES` + `waUrlForPath`).
- El widget flotante (`WhatsappFab`) detecta la ruta actual (`window.location.pathname`) y
  elige el mensaje con `waUrlForPath()` — un solo componente sirve para todas las páginas.
- Los CTAs estáticos de cada página importan el mensaje explícito desde `WA_MESSAGES`.

## Mapa página → mensaje → intención

| Página / acción | Ruta | Mensaje pre-escrito | Intención detectada |
|---|---|---|---|
| Home — CTA "Cotizar Ahora" | `/` | `Hola HIT CARGO 👋 Quiero cotizar un envío.` | Cotización nueva |
| Home — CTA final | `/` | `Hola HIT CARGO 👋 Quiero más información sobre sus servicios.` | Información general |
| Servicios — índice | `/servicios` | `Hola HIT CARGO 👋 Vi sus servicios y quiero que me asesoren sobre cuál me conviene.` | Asesoría de elección |
| Envío Aéreo | `/servicios/aereo` | `Hola HIT CARGO 👋 Vengo de la página de Envío Aéreo y tengo una duda.` | Cotización/consulta aéreo |
| Envío Marítimo | `/servicios/maritimo` | `Hola HIT CARGO 👋 Vengo de la página de Envío Marítimo y quiero una cotización.` | Cotización marítimo |
| Consolidación | `/servicios/consolidacion` | `Hola HIT CARGO 👋 Quiero consolidar mis compras en un solo envío.` | Consolidación |
| Encomiendas | `/servicios/encomiendas` | `Hola HIT CARGO 👋 Tengo una carga pesada o voluminosa y quiero una cotización.` | Cotización encomienda |
| Importación China | `/servicios/importacion-china` | `Hola HIT CARGO 👋 Quiero importar carga desde China, ¿me cotizan?` | Importación comercial China |
| Importación Panamá | `/servicios/importacion-panama` | `Hola HIT CARGO 👋 Compro en la Zona Libre de Colón y quiero cotizar el envío.` | Importación Panamá / Zona Libre |
| Importación USA | `/servicios/importacion-usa` | `Hola HIT CARGO 👋 Quiero importar carga grande desde USA.` | Importación comercial USA |
| Importación Global | `/servicios/importacion-global` | `Hola HIT CARGO 👋 Quiero importar desde otro país, ¿me ayudan?` | Importación global |
| Precios — Promos del mes | `/precios` | `Hola HIT CARGO 👋 Quiero saber las promociones del mes.` | Promociones |
| Precios — Emprendedor | `/precios` | `Hola HIT CARGO 👋 Quiero información sobre los precios de emprendedor.` | Tarifa emprendedor |
| Precios — Cotización | `/precios` | `Hola HIT CARGO 👋 Necesito una cotización personalizada.` | Cotización personalizada |
| Rastreo (overlay del resultado / sin resultado) | `/track` | `Hola HIT CARGO 👋 Necesito ayuda con el rastreo de mi envío.` | Soporte rastreo |
| Contacto | `/contacto` | `Hola HIT CARGO 👋 Quiero hacer una consulta.` | Consulta general |
| Cualquier otra página | — | `Hola HIT CARGO 👋 Quiero más información sobre sus servicios.` | Fallback genérico |

## Cómo programar el bot

1. **Detectar intención** por keywords del primer mensaje:
   - `aéreo` / `aéreo` → flujo de envío aéreo (tarifa $6.50/lb, 5-7 días hábiles).
   - `marítimo` → flujo marítimo ($2.50/lb, consolidación, tiempos).
   - `consolidar` → explicar consolidación + un solo peso conjunto.
   - `voluminosa` / `pesada` / `barril` / `caja` → flujo encomiendas (cotizar por medidas: largo × ancho × alto, o galones).
   - `China` / `Zona Libre` / `Pallet`/`carga grande` → flujo importación comercial (cotización previa por CBM).
   - `promociones` → enviar promos del mes actual.
   - `emprendedor` → tarifas preferenciales para emprendedores.
   - `rastreo` → pedir número de guía y resolver (o derivar al tracker del sitio).
   - Fallback → saludo genérico + opciones de menú.
2. **Respuesta automática rápida**: como los mensajes ya vienen con contexto, el bot puede
   responder inmediatamente con la info correcta y pasar a humano si el caso lo amerita.

## Notas de mantenimiento

- Si se agrega una página nueva con CTA a WhatsApp, agregar su mensaje en
  `WA_MESSAGES` y (si aplica al widget flotante) una entrada en `PATH_MESSAGES` de `src/lib/whatsapp.ts`.
- Los textos se escriben en **español neutro con voseo**, tono cercano y cero hype (brand book).
- Los mensajes del widget flotante no cambian con el hash de la página; el matching es por
  prefijo de ruta (`^/servicios/...`).
