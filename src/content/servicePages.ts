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
      "Carga aérea desde USA, China y Panamá a Nicaragua. La vía más rápida para tus compras, con tu casillero en Miami y entrega a domicilio incluida.",
    hero: "La vía más rápida para traer tus compras a Nicaragua.",
    intro:
      "El envío aéreo es ideal cuando necesitás tu mercancía pronto. Comprás en cualquier tienda, la enviás a tu casillero en Miami y nosotros la traemos por avión a Nicaragua, gestionamos la nacionalización y te la entregamos a domicilio.",
    bullets: [
      { title: "Rápido", text: "Tiempos de tránsito optimizados para que recibás en pocos días una vez tu paquete llega a Miami." },
      { title: "Cobro por libra", text: "Pagás según el peso de tu paquete. Te ayudamos a estimar el costo antes de comprar." },
      { title: "Entrega incluida", text: "La entrega nacional a tu domicilio ya está incluida en el flete. No es un costo extra." },
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
      "Carga marítima desde USA, China y Panamá a Nicaragua. La opción económica para mercancía pesada o voluminosa, con nacionalización y entrega.",
    hero: "La opción económica para carga pesada o voluminosa.",
    intro:
      "El envío marítimo conviene cuando tu mercancía es grande, pesada o no tenés prisa. Consolidamos tu carga, la traemos por barco y nos encargamos de la nacionalización y la entrega final en Nicaragua.",
    bullets: [
      { title: "Económico", text: "El costo por volumen lo hace ideal para inventarios y pedidos de gran escala." },
      { title: "Para volumen", text: "Pensado para muebles, repuestos, maquinaria y compras grandes." },
      { title: "Entrega incluida", text: "La entrega nacional a domicilio está incluida en el flete." },
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
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
