import { Package, Search } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { API_URL, TrackingOverlay, useTracking, WHATSAPP } from "./shared";

const ComingSoon = () => (
  <div className="max-w-2xl mx-auto text-center bg-white dark:bg-secondary-light p-10 rounded-lg shadow-lg border border-primary/10">
    <Package className="h-12 w-12 text-primary mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3">Rastreo en línea próximamente</h2>
    <p className="text-neutral-text dark:text-gray-300 mb-6">
      Estamos terminando de conectar el rastreo en tiempo real. Mientras tanto, escribinos por WhatsApp con tu número de
      guía y te decimos al instante dónde está tu paquete.
    </p>
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      className="inline-block bg-primary text-white py-3 px-8 rounded-md font-bold hover:bg-primary-dark transition-all"
    >
      Consultar por WhatsApp
    </a>
  </div>
);

export const TrackingPortal = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trap, setTrap] = useState(""); // honeypot
  const { view, data, error, setError, track, close } = useTracking();

  // Auto-search when the URL carries ?number=.
  useEffect(() => {
    if (!API_URL) return;
    const num = new URLSearchParams(window.location.search).get("number");
    if (num) {
      setTrackingNumber(num);
      track(num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    track(trackingNumber, { trap });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">Rastreá tu Paquete</h1>
        <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
          Ingresá tu número de guía para ver el estado y la ubicación de tu envío.
        </p>
      </div>

      {!API_URL ? (
        <ComingSoon />
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-secondary-light p-8 rounded-lg shadow-lg border border-primary/10">
            <form onSubmit={handleSubmit}>
              {/* Honeypot: hidden from real users; bots that auto-fill it are dropped. */}
              <input
                type="text"
                name="company"
                value={trap}
                onInput={(e: any) => setTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={trackingNumber}
                  onInput={(e: any) => {
                    setTrackingNumber(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Número de guía (ej. 926791)"
                  className={`pl-10 pr-4 py-4 w-full border-2 ${
                    error ? "border-red-500" : "border-accent-blue/30 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue text-lg bg-white dark:bg-secondary text-secondary dark:text-white`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={view === "loading"}
                className="w-full mt-4 bg-primary text-white py-4 text-lg rounded-md font-bold hover:bg-primary-dark transition-all disabled:opacity-60"
              >
                {view === "loading" ? "Buscando…" : "Rastrear Paquete"}
              </button>
            </form>
          </div>
        </div>
      )}

      <TrackingOverlay view={view} data={data} onClose={close} />
    </div>
  );
};

export default TrackingPortal;
