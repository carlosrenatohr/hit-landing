// Service page copy (Spanish, customer-facing). Editable by Abi/Maya.
// Business rules (CLAUDE.md): client → Miami → Nicaragua flow; free national delivery;
// closed on Sundays; B2B 7/15-day credit WITHOUT publishing terms (refer to contact);
// never invent prices.

export interface ServicePage {
  slug: string;
  nav: string;
  title: string;
  metaDescription: string;
  hero: string;
  intro: string;
  bullets: { title: string; text: string }[];
  steps: string[];
  closing: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: "aereo",
    nav: "Envío Aéreo",
    title: "Envío Aéreo a Nicaragua",
    metaDescription:
      "Carga aérea desde USA, China y Panamá a Nicaragua. La vía más rápida para tus compras, con tu casillero en Miami y cobertura de entrega a nivel nacional.",
    hero: "La vía más rápida para traer tus compras a Nicaragua.",
    intro:
      "El envío aéreo es ideal cuando necesitás tu mercancía pronto. Comprás en cualquier tienda, la enviás a tu casillero en Miami y nosotros la traemos por avión a Nicaragua, gestionamos la nacionalización y te la entregamos a domicilio.",
    bullets: [
      { title: "Rápido", text: "Tiempos de tránsito optimizados para que recibás en pocos días una vez tu paquete llega a Miami." },
      { title: "Cobro por libra", text: "Pagás según el peso de tu paquete. Te ayudamos a estimar el costo antes de comprar." },
      { title: "Cobertura nacional", text: "Llegamos a todo Nicaragua. El costo de entrega varía según tu ubicación, pero no te vas a quedar sin tu paquete hasta tenerlo en tus manos." },
    ],
    steps: [
      "Comprás en Amazon, Shein, eBay o cualquier tienda.",
      "Enviás a tu dirección de casillero en Miami.",
      "Lo traemos por avión y gestionamos aduana.",
      "Te lo entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Tenés dudas sobre un envío aéreo? Escribinos por WhatsApp y te asesoramos antes de comprar.",
  },
  {
    slug: "maritimo",
    nav: "Envío Marítimo",
    title: "Envío Marítimo a Nicaragua",
    metaDescription:
      "Carga marítima desde USA, China y Panamá a Nicaragua. La opción económica para mercancía pesada o voluminosa, con nacionalización y cobertura nacional.",
    hero: "La opción económica para carga pesada o voluminosa.",
    intro:
      "El envío marítimo conviene cuando tu mercancía es grande, pesada o no tenés prisa. Consolidamos tu carga, la traemos por barco y nos encargamos de la nacionalización y la entrega final en Nicaragua.",
    bullets: [
      { title: "Económico", text: "El costo por volumen lo hace ideal para inventarios y pedidos de gran escala." },
      { title: "Para volumen", text: "Pensado para muebles, repuestos, maquinaria y compras grandes." },
      { title: "Cobertura nacional", text: "Llegamos a todo Nicaragua. El costo de entrega varía según tu ubicación, pero no te vas a quedar sin tu paquete hasta tenerlo en tus manos." },
    ],
    steps: [
      "Comprás o consolidás tu mercancía.",
      "La enviás a tu casillero en Miami.",
      "La traemos por vía marítima y gestionamos aduana.",
      "Te la entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Vas a importar volumen? Escribinos por WhatsApp y armamos juntos la mejor ruta para tu carga.",
  },
  {
    slug: "consolidacion",
    nav: "Consolidación",
    title: "Consolidación de Envíos a Nicaragua",
    metaDescription:
      "Agrupamos tus compras de distintas tiendas en un solo envío a Nicaragua para reducir costos de importación. Asesoría de compras incluida.",
    hero: "Agrupá varias compras en un solo envío y pagá menos.",
    intro:
      "Si comprás en varias tiendas, podemos recibir todos tus paquetes en tu casillero en Miami y agruparlos en un solo envío. Así reducís el costo de importación y simplificás la gestión aduanera. También te asesoramos antes de comprar: validamos links y te damos tips de ahorro.",
    bullets: [
      { title: "Menos costo", text: "Un solo envío consolidado suele salir más barato que varios por separado." },
      { title: "Asesoría de compras", text: "Validamos tus links y te recomendamos cómo comprar mejor antes de ordenar." },
      { title: "Una sola gestión", text: "Nosotros coordinamos la consolidación, la aduana y la entrega." },
    ],
    steps: [
      "Comprás en varias tiendas a tu casillero en Miami.",
      "Recibimos y agrupamos tus paquetes.",
      "Enviamos todo junto y gestionamos aduana.",
      "Te entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Querés consolidar tus compras? Escribinos por WhatsApp y te explicamos cómo funciona.",
  },
  {
    slug: "encomiendas",
    nav: "Encomiendas",
    title: "Encomiendas a Nicaragua",
    metaDescription:
      "Envío de cajas y barriles por volumen y dimensiones. Ideal para cargas pesadas con restricciones. Cotización previa según tamaño.",
    hero: "Envío de cajas y barriles por volumen y dimensiones.",
    intro:
      "Las encomiendas son para cargas pesadas o voluminosas que no entran en el servicio regular de paquetería. Cobramos por volumen y dimensiones (largo × ancho × alto), no por peso. Ideal para cajas grandes, barriles, o cargas con restricciones especiales. Cotización previa según las medidas exactas.",
    bullets: [
      { title: "Cobro por volumen", text: "Pagás según las dimensiones de la caja o barril, no por peso." },
      { title: "Cargas pesadas", text: "Ideal para cajas grandes, barriles, o mercancía con restricciones." },
      { title: "Cotización previa", text: "Te damos el costo exacto según las medidas antes de enviar." },
    ],
    steps: [
      "Medís tu caja o barril (largo × ancho × alto).",
      "Escribinos con las medidas para cotización.",
      "Te damos el costo por volumen y coordinamos el envío.",
      "Lo traemos y te lo entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Tenés una carga pesada o voluminosa? Escribinos con las medidas y te cotizamos al instante.",
  },
  {
    slug: "importacion-china",
    nav: "Importación China",
    title: "Importación Comercial desde China",
    metaDescription:
      "Importación de carga comercial desde China por CBM (metro cúbico). Cotización previa según volumen y tipo de carga. Nacionalización incluida.",
    hero: "Importación de carga comercial desde China por CBM.",
    intro:
      "Importamos carga comercial directamente desde China a Nicaragua. Cobramos por metro cúbico (CBM) según el volumen de tu carga. Cotización previa según el tipo de mercancía, volumen y peso. Gestionamos toda la nacionalización y entrega.",
    bullets: [
      { title: "Cobro por CBM", text: "Pagás por metro cúbico de volumen, ideal para carga comercial." },
      { title: "Cotización previa", text: "Te damos el costo exacto según tipo de carga, volumen y peso." },
      { title: "Nacionalización incluida", text: "Gestionamos aduana y trámites, te entregamos a domicilio." },
    ],
    steps: [
      "Nos enviás los detalles de tu carga (tipo, volumen, peso).",
      "Te cotizamos por CBM antes de embarcar.",
      "La traemos desde China y gestionamos aduana.",
      "Te entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Querés importar desde China? Escribinos con los detalles de tu carga y te cotizamos.",
  },
  {
    slug: "importacion-panama",
    nav: "Importación Panamá",
    title: "Importación Comercial desde Panamá",
    metaDescription:
      "Importación de carga comercial desde Panamá por CBM. Zona libre de Colón, cotización previa según volumen. Nacionalización y entrega incluidas.",
    hero: "Importación de carga comercial desde Panamá por CBM.",
    intro:
      "Importamos carga comercial desde la Zona Libre de Colón, Panamá a Nicaragua. Cobramos por metro cúbico (CBM). Cotización previa según el volumen y tipo de mercancía. Ideal para compras al por mayor en la Zona Libre.",
    bullets: [
      { title: "Zona Libre de Colón", text: "Importamos directamente desde el hub comercial de Panamá." },
      { title: "Cobro por CBM", text: "Pagás por metro cúbico de volumen." },
      { title: "Cotización previa", text: "Te damos el costo exacto antes de embarcar." },
    ],
    steps: [
      "Comprás o consolidás tu carga en la Zona Libre de Colón.",
      "Nos enviás los detalles para cotización por CBM.",
      "La traemos desde Panamá y gestionamos aduana.",
      "Te entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Comprás en la Zona Libre de Colón? Escribinos y te cotizamos el envío a Nicaragua.",
  },
  {
    slug: "importacion-usa",
    nav: "Importación USA",
    title: "Importación Comercial desde Estados Unidos",
    metaDescription:
      "Importación de pallets, cargas grandes industriales y contenedores desde USA. Cotización previa según peso y volumen. Nacionalización incluida.",
    hero: "Pallets, cargas grandes y contenedores desde USA.",
    intro:
      "Importamos carga comercial completa desde Estados Unidos: pallets, maquinaria industrial, contenedores completos o cargas de gran tamaño. Cotización previa según peso, volumen y tipo de carga. Gestionamos toda la logística y nacionalización.",
    bullets: [
      { title: "Cargas grandes", text: "Pallets, maquinaria, contenedores completos o cargas industriales." },
      { title: "Cotización previa", text: "Te damos el costo exacto según peso, volumen y tipo." },
      { title: "Logística completa", text: "Coordinamos transporte, aduana y entrega a domicilio." },
    ],
    steps: [
      "Nos enviás los detalles de tu carga (tipo, peso, volumen).",
      "Te cotizamos según las características específicas.",
      "Coordinamos el transporte y gestionamos aduana.",
      "Te entregamos a domicilio o bodega en Nicaragua.",
    ],
    closing:
      "¿Necesitás importar carga grande desde USA? Escribinos con los detalles y te cotizamos.",
  },
  {
    slug: "importacion-global",
    nav: "Importación Global",
    title: "Importación desde Cualquier Parte del Mundo",
    metaDescription:
      "Importación desde cualquier país con nuestros proveedores aliados. Cotización previa según origen y tipo de carga. Nacionalización y entrega incluidas.",
    hero: "Importación desde cualquier parte del mundo.",
    intro:
      "Trabajamos con proveedores aliados en todo el mundo. Si necesitás importar desde un país que no está en nuestra lista regular, podemos coordinar la logística. Cotización previa según origen, tipo de carga, volumen y peso. Gestionamos toda la nacionalización y entrega.",
    bullets: [
      { title: "Alcance global", text: "Importamos desde cualquier país con nuestros proveedores aliados." },
      { title: "Cotización previa", text: "Te damos el costo según origen, tipo y volumen de carga." },
      { title: "Logística completa", text: "Coordinamos transporte internacional, aduana y entrega." },
    ],
    steps: [
      "Nos decís desde dónde necesitás importar.",
      "Coordinamos con nuestros proveedores aliados.",
      "Te cotizamos según origen y características de la carga.",
      "La traemos y te la entregamos a domicilio en Nicaragua.",
    ],
    closing:
      "¿Necesitás importar desde un país específico? Escribinos y vemos si podemos ayudarte.",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
