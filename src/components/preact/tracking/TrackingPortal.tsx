import { Package, Search } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { siteConfig } from "../../../config/site";
import { isValidQuery } from "../../../utils/tracking";

// Tracking worker URL (hit-ever2). Defaults to the live public worker so the page works even
// when PUBLIC_API_URL isn't injected at build time (e.g. Cloudflare Pages without the env var —
// .env is gitignored, so production builds otherwise had no URL and fell back to "coming soon").
// Override PUBLIC_API_URL to point at a staging worker or api.hit-cargo.com later; set it to an
// empty string to force the honest "coming soon" state during an outage.
const DEFAULT_API_URL = "https://hit-ever-scraper.honchkrow1995.workers.dev";
const envApiUrl = import.meta.env.PUBLIC_API_URL as string | undefined;
const API_URL = envApiUrl ?? DEFAULT_API_URL;
const WHATSAPP = siteConfig.social.whatsapp;

// 4-step progress bar (mirrors Everest's public tracking widget).
const STEPS = ["En bodega Miami", "En camino", "En Nicaragua", "Entregado"];

interface PublicEvent {
  date: string;
  description: string;
  office?: string;
}
interface PublicShipment {
  guia: string;
  status: string;
  statusLabel: string;
  step: number;
  serviceType?: "aereo" | "maritimo";
  weightLb?: number;
  pieces?: number;
  receivedAt?: string;
  lastEventAt?: string;
  events: PublicEvent[];
}

type View = "idle" | "loading" | "ok" | "notfound" | "error";

const ComingSoon = () => (
  <div className="max-w-2xl mx-auto text-center bg-white dark:bg-secondary-light p-10 rounded-lg shadow-lg border border-primary/10">
    <Package className="h-12 w-12 text-primary mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3">
      Rastreo en línea próximamente
    </h2>
    <p className="text-neutral-text dark:text-gray-300 mb-6">
      Estamos terminando de conectar el rastreo en tiempo real. Mientras tanto,
      escribinos por WhatsApp con tu número de guía y te decimos al instante dónde está tu paquete.
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
  const [view, setView] = useState<View>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState<PublicShipment | null>(null);

  const track = async (num: string) => {
    const value = num.trim();
    if (!isValidQuery(value)) {
      setError("Ingresá un número de guía válido (sin espacios ni símbolos)");
      return;
    }
    setError("");
    setView("loading");
    try {
      const res = await fetch(`${API_URL}/track/${encodeURIComponent(value)}`);
      if (res.status === 404) {
        setView("notfound");
        return;
      }
      if (!res.ok) {
        setView("error");
        return;
      }
      const json = (await res.json()) as { ok: boolean; data: PublicShipment };
      if (!json.ok || !json.data) {
        setView("notfound");
        return;
      }
      setData(json.data);
      setView("ok");
    } catch {
      setView("error");
    }
  };

  // Auto-search when the URL carries ?number=.
  useEffect(() => {
    if (!API_URL) return;
    const params = new URLSearchParams(window.location.search);
    const num = params.get("number");
    if (num) {
      setTrackingNumber(num);
      track(num);
    }
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    track(trackingNumber);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
          Rastreá tu Paquete
        </h1>
        <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
          Ingresá tu número de guía para ver el estado y la ubicación de tu envío.
        </p>
      </div>

      {!API_URL ? (
        <ComingSoon />
      ) : (
        <>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white dark:bg-secondary-light p-8 rounded-lg shadow-lg border border-primary/10">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingNumber}
                    onInput={(e: any) => setTrackingNumber(e.target.value)}
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
                  className="w-full mt-4 bg-accent-blue text-white py-4 text-lg rounded-md font-bold hover:bg-blue-600 transition-all disabled:opacity-60"
                >
                  {view === "loading" ? "Buscando…" : "Rastrear Paquete"}
                </button>
              </form>
            </div>
          </div>

          {view === "notfound" && (
            <div className="max-w-2xl mx-auto text-center text-neutral-text dark:text-gray-300">
              <p className="mb-4">No encontramos un envío con ese número. Verificá la guía o consultanos.</p>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="text-primary font-bold hover:underline">
                Consultar por WhatsApp
              </a>
            </div>
          )}

          {view === "error" && (
            <div className="max-w-2xl mx-auto text-center text-neutral-text dark:text-gray-300">
              <p className="mb-4">No pudimos consultar el estado en este momento. Probá de nuevo en un rato.</p>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="text-primary font-bold hover:underline">
                Consultar por WhatsApp
              </a>
            </div>
          )}

          {view === "ok" && data && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-white dark:bg-secondary-light p-8 rounded-lg shadow-lg mb-8 border border-primary/10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-1">
                      Guía: {data.guia}
                    </h2>
                    {data.serviceType && (
                      <p className="text-neutral-text dark:text-gray-300">
                        {data.serviceType === "aereo" ? "Envío aéreo" : "Envío marítimo"}
                        {data.weightLb ? ` · ${data.weightLb} lbs` : ""}
                      </p>
                    )}
                  </div>
                  <span className="mt-4 md:mt-0 inline-block bg-accent-yellow text-secondary font-bold px-4 py-2 rounded-full">
                    {data.statusLabel}
                  </span>
                </div>

                {data.step >= 1 && (
                  <div className="flex items-center gap-2 mb-8">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex-1 text-center">
                        <div
                          className={`h-2 rounded-full mb-2 ${
                            i < data.step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        ></div>
                        <span className="text-xs text-neutral-text dark:text-gray-400">{label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {data.events.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                      Historial de Rastreo
                    </h3>
                    <div className="space-y-4">
                      {data.events.map((ev, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-secondary flex items-center justify-center mr-4">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-secondary dark:text-white">{ev.description}</div>
                            <div className="text-sm text-neutral-text dark:text-gray-400">
                              {ev.date}{ev.office ? ` · ${ev.office}` : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackingPortal;
