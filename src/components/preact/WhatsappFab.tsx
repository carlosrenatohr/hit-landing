import { siteConfig } from "../../config/site";

// wa.me opens the WhatsApp app on mobile and web.whatsapp.com on desktop automatically.
// A short prefilled greeting lifts reply rate; it still just opens the chat with our number.
const WA_URL = `${siteConfig.social.whatsapp}?text=${encodeURIComponent(
  "Hola HIT CARGO, quiero más información sobre mis envíos."
)}`;

export const WhatsappFab = () => {
  // GTM/dataLayer event so a pixel or Google Analytics conversion can be wired later with no code change.
  const onClick = () => {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "whatsapp_click", location: "floating_widget" });
  };

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Escribinos por WhatsApp"
      class="group fixed bottom-5 right-5 z-40 flex items-center gap-3 md:bottom-6 md:right-6"
    >
      <span class="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-lg ring-1 ring-black/5 md:block dark:bg-secondary-light dark:text-white">
        ¿Dudas? Escribinos
      </span>
      <span class="relative flex h-14 w-14 animate-wa-bounce items-center justify-center motion-reduce:animate-none">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden"></span>
        <span class="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </span>
      </span>
    </a>
  );
};

export default WhatsappFab;
