# Sistema de color de marca — HIT CARGO

> Documento de marca. Owner: **Mayqueline** (branding) con soporte de Renato (implementación).
> Rol de quien escribe esto: *brand/marketing lead*. Define **qué** color usar y **por qué**; los
> tokens técnicos viven en `tailwind.config.js`. Si cambian los valores acá, actualizar ambos.

## 1. Personalidad de marca (por qué esta paleta)

HIT CARGO mueve paquetes de EE.UU./China/Panamá a Nicaragua. La marca tiene que transmitir tres
cosas a la vez: **energía y velocidad** (el envío llega), **confianza y seriedad** (tu plata y tu
mercancía están seguras) y un aire **premium/cinematográfico** (la referencia interna es la dirección
de arte de GTA VI: negros profundos, un acento cálido que resalta). Dark mode es el default, no un
extra.

De ahí la fórmula: **negro base + un acento cálido de alta energía (rojo-naranja) + neutrales
legibles + colores semánticos sobrios para estados.** El acento se usa poco y con intención — cuando
todo es "urgente", nada lo es.

## 2. Paleta base

| Rol | Nombre | HEX | Uso |
|-----|--------|-----|-----|
| **Primario** | Rojo-Naranja HIT | `#FF3B3F` | CTAs, marca, estado actual, foco. El color que "acciona". |
| Primario (hover) | HIT oscuro | `#D92E31` | hover/active del primario. |
| **Secundario** | Negro HIT | `#111111` | fondo dark-mode, texto sobre claro, superficies. |
| Secundario claro | Grafito | `#2D2D2D` | tarjetas/superficies en dark. |
| Acento cálido | Ámbar | `#FFD700` | realces puntuales, badges "en movimiento". Nunca como CTA. |
| Acento frío | Azul HIT | `#00A8E8` | enlaces informativos, datos. **No** para el CTA principal. |
| Neutral texto | Gris texto | `#4A4A4A` | cuerpo sobre fondo claro. |
| Neutral fondo | Casi blanco | `#F8F9FA` | fondo light-mode. |

**Regla de oro del CTA:** el botón de acción principal (Rastrear, Cotizar, WhatsApp) va en
**Primario**, nunca en Azul. El azul es para información, no para "hacé clic acá".

## 3. Colores semánticos del tracker (estados del paquete)

El rastreo es la cara pública del producto. Cada estado necesita un color propio, **sobrio**
(fondo suave + texto oscuro), legible en light y dark, y coherente con la marca. El Primario se
reserva para **el paso actual** (el punto/ًícono activo del journey), no para pintar cada estado.

| Estado (interno) | Etiqueta pública | Familia de color | Idea |
|---|---|---|---|
| `en_almacen` | En bodega Miami | **Slate** (gris azulado) | "ya está en nuestras manos" |
| `parcial` | En preparación | **Ámbar** | "procesándose" |
| `en_transito` | En camino | **Ámbar** | "en movimiento" |
| `en_destino` | En Nicaragua | **Cian/Teal** | "casi en casa" |
| `entregado` | Entregado | **Verde** | éxito, cierre |
| `excepcion` | Retenido | **Rojo alerta** | necesita atención (distinto del Primario por contexto) |
| `desconocido` | Sin información | **Slate tenue** | neutro |

Valores de referencia (Tailwind, light / dark):

- Slate: `bg-slate-100 text-slate-700` · dark `bg-slate-800 text-slate-200`
- Ámbar: `bg-amber-100 text-amber-800` · dark `bg-amber-900/40 text-amber-200`
- Cian: `bg-cyan-100 text-cyan-800` · dark `bg-cyan-900/40 text-cyan-200`
- Verde: `bg-green-100 text-green-800` · dark `bg-green-900/40 text-green-200`
- Rojo: `bg-red-100 text-red-800` · dark `bg-red-900/40 text-red-200`

**Punto/hito actual del journey:** Primario `#FF3B3F` (relleno) con anillo del color de fondo de la
tarjeta. Hitos completados: verde tenue con check. Hitos pendientes: gris.

## 4. Journey estandarizado (no logs crudos)

Cada proveedor (Everest, Global Connection) emite eventos con textos distintos ("Recibido en Bodega
Santa Maria", "Enviando a Oficina Metrocentro", etc.). **No los mostramos crudos al cliente** — se
estandariza a los 4 hitos de la marca, siempre los mismos, con el hito actual en **negrita**:

1. **En bodega Miami** — "Tu paquete llegó a nuestra bodega en Miami."
2. **En camino** — "Tu paquete va en camino a Nicaragua."
3. **En Nicaragua** — "Llegó a Nicaragua y está en proceso de entrega."
4. **Entregado** — "¡Listo! Tu paquete fue entregado."

Las fechas se toman de datos confiables (recepción en Miami, llegada a Nicaragua por oficina MGA,
entrega) — no se inventan fechas para hitos intermedios que no podemos atribuir con certeza.

## 5. Accesibilidad

- Contraste mínimo AA (4.5:1) para texto. Los pares fondo-suave/texto-oscuro de arriba lo cumplen.
- Nunca comunicar estado **solo** por color: siempre acompañar con etiqueta de texto (y check/●).
- Primario sobre blanco pasa AA para texto grande/botones; para texto chico usar el gris texto.

## 6. Qué NO hacer

- ❌ CTA en azul (el azul es informativo).
- ❌ Pintar todos los estados con el Primario (satura y pierde jerarquía).
- ❌ Mostrar los logs literales del proveedor al cliente.
- ❌ Inventar fechas para hitos que no podemos atribuir.
- ❌ Rojo semántico (retenido) y Primario juntos compitiendo en la misma vista.
