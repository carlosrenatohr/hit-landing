// WhatsApp deep links with prefilled messages. Each link carries the page/action
// context so the WhatsApp bot can route replies by origin (see docs/whatsapp-bot-origins.md).
import { siteConfig } from '../config/site';

export function waUrl(message: string): string {
  return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  home: 'Hola HIT CARGO 👋 Quiero cotizar un envío.',
  servicesIndex: 'Hola HIT CARGO 👋 Vi sus servicios y quiero que me asesoren sobre cuál me conviene.',
  pricingPromos: 'Hola HIT CARGO 👋 Quiero saber las promociones del mes.',
  pricingEntrepreneur: 'Hola HIT CARGO 👋 Quiero información sobre los precios de emprendedor.',
  pricingQuote: 'Hola HIT CARGO 👋 Necesito una cotización personalizada.',
  contact: 'Hola HIT CARGO 👋 Quiero hacer una consulta.',
  tracking: 'Hola HIT CARGO 👋 Necesito ayuda con el rastreo de mi envío.',
  generic: 'Hola HIT CARGO 👋 Quiero más información sobre sus servicios.',
};

// Route map used by the floating widget (renders on every page) so the prefilled
// message always matches the page the visitor came from.
const PATH_MESSAGES: [RegExp, string][] = [
  [/^\/servicios\/aereo/, 'Hola HIT CARGO 👋 Vengo de la página de Envío Aéreo y tengo una duda.'],
  [/^\/servicios\/maritimo/, 'Hola HIT CARGO 👋 Vengo de la página de Envío Marítimo y quiero una cotización.'],
  [/^\/servicios\/consolidacion/, 'Hola HIT CARGO 👋 Quiero consolidar mis compras en un solo envío.'],
  [/^\/servicios\/encomiendas/, 'Hola HIT CARGO 👋 Tengo una carga pesada o voluminosa y quiero una cotización.'],
  [/^\/servicios\/importacion-china/, 'Hola HIT CARGO 👋 Quiero importar carga desde China, ¿me cotizan?'],
  [/^\/servicios\/importacion-panama/, 'Hola HIT CARGO 👋 Compro en la Zona Libre de Colón y quiero cotizar el envío.'],
  [/^\/servicios\/importacion-usa/, 'Hola HIT CARGO 👋 Quiero importar carga grande desde USA.'],
  [/^\/servicios\/importacion-global/, 'Hola HIT CARGO 👋 Quiero importar desde otro país, ¿me ayudan?'],
  [/^\/servicios/, WA_MESSAGES.servicesIndex],
  [/^\/precios/, WA_MESSAGES.pricingQuote],
  [/^\/track/, WA_MESSAGES.tracking],
  [/^\/contacto/, WA_MESSAGES.contact],
];

export function waUrlForPath(pathname: string): string {
  for (const [pattern, message] of PATH_MESSAGES) {
    if (pattern.test(pathname)) return waUrl(message);
  }
  return waUrl(WA_MESSAGES.generic);
}
