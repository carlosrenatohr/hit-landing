import { Package, Search, X } from "lucide-preact";
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

// Status pill color by state — see docs/marketing/brand-color-system.md (§3). Sober bg + dark text,
// legible in light and dark; the brand Primary is reserved for the CTA and the CURRENT step, not
// for painting every status.
const STATUS_PILL: Record<string, string> = {
  entregado: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  en_destino: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
  en_transito: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  parcial: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  en_almacen: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  excepcion: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  desconocido: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

// Standardized 4-milestone journey (brand-consistent) — we do NOT show raw provider logs, which
// differ between Everest and Global Connection and confuse customers. Each package is mapped to
// these fixed milestones by its `step`; the current one is bolded. See brand-color-system.md §4.
const MILESTONES: { step: number; label: string; desc: string }[] = [
  { step: 1, label: "En bodega Miami", desc: "Tu paquete llegó a nuestra bodega en Miami." },
  { step: 2, label: "En camino", desc: "Tu paquete va en camino a Nicaragua." },
  { step: 3, label: "En Nicaragua", desc: "Llegó a Nicaragua y está en proceso de entrega." },
  { step: 4, label: "Entregado", desc: "¡Listo! Tu paquete fue entregado." },
];

// Cargotrack timestamps are stored as the original wall-clock in UTC; render in UTC so we show
// exactly what the provider recorded, with no timezone shift.
function fmtDay(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(+d)
    ? iso
    : d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

// Dates attributed to a milestone ONLY from data we can trust — no invented middle dates.
//   1 Miami   → recepción (primer evento)
//   3 Nicaragua → primer evento en oficina MGA
//   4 Entregado → último evento, si ya está entregado
// Step 2 (en camino) queda sin fecha porque no la podemos atribuir con certeza entre proveedores.
function milestoneDate(step: number, data: PublicShipment): string | undefined {
  const evs = data.events ?? [];
  if (step === 1) return data.receivedAt ?? evs[0]?.date;
  if (step === 3) return evs.find((e) => (e.office ?? "").toUpperCase().includes("MGA"))?.date;
  if (step === 4) return data.step >= 4 ? data.lastEventAt ?? evs[evs.length - 1]?.date : undefined;
  return undefined;
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

  // Result modal: close on Escape and lock body scroll while open.
  const closeResult = () => {
    setView("idle");
    setData(null);
  };
  useEffect(() => {
    if (view !== "ok") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeResult();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [view]);

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
                  className="w-full mt-4 bg-primary text-white py-4 text-lg rounded-md font-bold hover:bg-primary-dark transition-all disabled:opacity-60"
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
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`Rastreo de la guía ${data.guia}`}
              onClick={closeResult}
            >
              <div
                className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300 dark:bg-secondary-light sm:max-w-lg sm:rounded-2xl sm:zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeResult}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Header: guía, estado destacado y servicio */}
                <div className="border-b border-gray-100 p-6 pr-14 dark:border-gray-700 md:p-7 md:pr-14">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Guía</div>
                  <h2 className="text-2xl font-bold text-secondary dark:text-white">{data.guia}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                        STATUS_PILL[data.status] ?? "bg-accent-yellow text-secondary"
                      }`}
                    >
                      {data.statusLabel}
                    </span>
                    {(data.serviceType || data.pieces || data.weightLb) && (
                      <span className="text-sm text-neutral-text dark:text-gray-300">
                        {data.serviceType ? (data.serviceType === "aereo" ? "✈️ Aéreo" : "🚢 Marítimo") : ""}
                        {data.pieces ? ` · ${data.pieces} pzs` : ""}
                        {data.weightLb ? ` · ${data.weightLb} lb` : ""}
                      </span>
                    )}
                  </div>

                  {/* Barra de 4 pasos */}
                  <div className="mt-5 flex items-end gap-1.5">
                    {STEPS.map((label, i) => {
                      const done = i < data.step;
                      return (
                        <div key={label} className="flex-1">
                          <div className={`h-1.5 rounded-full ${done ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"}`}></div>
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

                {/* Journey estandarizado por hitos (no logs crudos). El hito actual va en negrita. */}
                <div className="overflow-y-auto p-6 md:p-7">
                  {data.step < 1 ? (
                    <div className="rounded-lg bg-slate-50 p-4 text-sm text-neutral-text dark:bg-white/5 dark:text-gray-300">
                      {data.status === "excepcion"
                        ? "Tu paquete está retenido. Escribinos por WhatsApp con tu guía y lo revisamos al instante."
                        : "Todavía no tenemos el estado detallado de esta guía. Escribinos por WhatsApp y te ayudamos."}
                    </div>
                  ) : (
                    <ol className="relative">
                      {MILESTONES.map((m, i) => {
                        const done = m.step < data.step;
                        const current = m.step === data.step;
                        const pending = m.step > data.step;
                        const isLast = i === MILESTONES.length - 1;
                        const date = milestoneDate(m.step, data);
                        return (
                          <li key={m.step} className="relative pl-8 pb-6 last:pb-0">
                            {!isLast && (
                              <span
                                aria-hidden="true"
                                className={`absolute left-[6px] top-4 h-full w-0.5 ${
                                  done ? "bg-green-400 dark:bg-green-600" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              ></span>
                            )}
                            <span
                              aria-hidden="true"
                              className={`absolute left-0 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-white dark:ring-secondary-light ${
                                done ? "bg-green-500" : current ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            >
                              {current && (
                                <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-primary opacity-60"></span>
                              )}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  current
                                    ? "font-bold text-secondary dark:text-white"
                                    : done
                                      ? "font-medium text-secondary dark:text-white"
                                      : "text-gray-400"
                                }
                              >
                                {m.label}
                              </span>
                              {current && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                                  Actual
                                </span>
                              )}
                            </div>
                            <div
                              className={`text-sm ${
                                pending ? "text-gray-400" : "text-neutral-text dark:text-gray-300"
                              }`}
                            >
                              {m.desc}
                            </div>
                            {date && <div className="mt-0.5 text-xs capitalize text-gray-400">{fmtDay(date)}</div>}
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>

                {/* Footer: acciones */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-5 dark:border-gray-700">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-neutral-text hover:underline dark:text-gray-300"
                  >
                    ¿Dudas? Escribinos por WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={closeResult}
                    className="rounded-md bg-primary px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                  >
                    Rastrear otro
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackingPortal;
