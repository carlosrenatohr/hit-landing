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

// Friendly office labels (Cargotrack uses IATA-ish codes).
const OFFICE_LABEL: Record<string, string> = { MIA: "Miami, US", MGA: "Managua, NI" };
function officeLabel(o?: string): string {
  if (!o) return "";
  return OFFICE_LABEL[o.toUpperCase()] ?? o;
}

// Status pill color by state.
const STATUS_PILL: Record<string, string> = {
  entregado: "bg-green-100 text-green-800",
  en_destino: "bg-purple-100 text-purple-800",
  en_transito: "bg-blue-100 text-blue-800",
  parcial: "bg-amber-100 text-amber-800",
  en_almacen: "bg-gray-100 text-gray-800",
  excepcion: "bg-red-100 text-red-800",
};

// Cargotrack timestamps are stored as the original wall-clock in UTC; render in UTC so we show
// exactly what the provider recorded, with no timezone shift.
function fmtDay(iso: string): string {
  const d = new Date(iso);
  return isNaN(+d)
    ? iso
    : d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}
function fmtTime(iso: string): string {
  const d = new Date(iso);
  return isNaN(+d) ? "" : d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}
function dayKey(iso: string): string {
  const d = new Date(iso);
  return isNaN(+d) ? iso : d.toISOString().slice(0, 10);
}
// Reverse-chronological day groups (latest first, Amazon-style) for the vertical journey.
function buildTimeline(events: PublicEvent[]): { key: string; label: string; items: PublicEvent[] }[] {
  const groups: { key: string; label: string; items: PublicEvent[] }[] = [];
  const byKey = new Map<string, { key: string; label: string; items: PublicEvent[] }>();
  for (const ev of [...events].reverse()) {
    const k = dayKey(ev.date);
    let g = byKey.get(k);
    if (!g) {
      g = { key: k, label: fmtDay(ev.date), items: [] };
      byKey.set(k, g);
      groups.push(g);
    }
    g.items.push(ev);
  }
  return groups;
}

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
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-white dark:bg-secondary-light rounded-xl shadow-lg border border-primary/10 overflow-hidden">
                {/* Header: guía, servicio y estado destacado */}
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Guía</div>
                      <h2 className="text-2xl font-bold text-secondary dark:text-white">{data.guia}</h2>
                      {(data.serviceType || data.weightLb || data.pieces) && (
                        <p className="mt-1 text-sm text-neutral-text dark:text-gray-300">
                          {data.serviceType ? (data.serviceType === "aereo" ? "✈️ Aéreo" : "🚢 Marítimo") : ""}
                          {data.pieces ? ` · ${data.pieces} pzs` : ""}
                          {data.weightLb ? ` · ${data.weightLb} lb` : ""}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold ${
                        STATUS_PILL[data.status] ?? "bg-accent-yellow text-secondary"
                      }`}
                    >
                      {data.statusLabel}
                    </span>
                  </div>

                  {/* Barra de 4 pasos */}
                  <div className="mt-6 flex items-end gap-1.5">
                    {STEPS.map((label, i) => {
                      const done = i < data.step;
                      return (
                        <div key={label} className="flex-1">
                          <div
                            className={`h-1.5 rounded-full ${done ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"}`}
                          ></div>
                          <div
                            className={`mt-1.5 text-[11px] leading-tight ${
                              done ? "font-medium text-secondary dark:text-white" : "text-gray-400"
                            }`}
                          >
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Journey vertical (estilo Amazon): agrupado por día, más reciente arriba */}
                <div className="p-6 md:p-8">
                  {data.events.length === 0 ? (
                    <p className="text-sm text-gray-400">Todavía no hay eventos registrados para esta guía.</p>
                  ) : (
                    <div className="space-y-6">
                      {buildTimeline(data.events).map((group) => (
                        <div key={group.key}>
                          <div className="mb-3 text-sm font-bold capitalize text-secondary dark:text-white">
                            {group.label}
                          </div>
                          <ol className="ml-1 space-y-5 border-l-2 border-gray-200 dark:border-gray-700 pl-5">
                            {group.items.map((ev, i) => {
                              const isLatest = ev === data.events[data.events.length - 1];
                              return (
                                <li key={i} className="relative">
                                  <span
                                    className={`absolute -left-[27px] top-0.5 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-secondary-light ${
                                      isLatest ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                                    aria-hidden="true"
                                  ></span>
                                  <div className="flex flex-col sm:flex-row sm:gap-4">
                                    <div className="w-24 shrink-0 text-xs text-gray-400">{fmtTime(ev.date)}</div>
                                    <div>
                                      <div
                                        className={`text-sm ${
                                          isLatest
                                            ? "font-semibold text-secondary dark:text-white"
                                            : "text-neutral-text dark:text-gray-200"
                                        }`}
                                      >
                                        {ev.description}
                                      </div>
                                      {ev.office && (
                                        <div className="text-xs italic text-gray-400">{officeLabel(ev.office)}</div>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setView("idle");
                    setData(null);
                    setTrackingNumber("");
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Rastrear otro paquete
                </button>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="text-neutral-text dark:text-gray-300 hover:underline">
                  ¿Dudas? Escribinos por WhatsApp
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackingPortal;
