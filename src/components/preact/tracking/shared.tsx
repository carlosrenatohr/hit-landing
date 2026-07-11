import { Package, X } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { siteConfig } from "../../../config/site";
import { isValidQuery } from "../../../utils/tracking";

// Tracking worker URL (hit-ever2). Defaults to the live public worker so the page works even when
// PUBLIC_API_URL isn't injected at build time. Set PUBLIC_API_URL to "" to force "coming soon".
const DEFAULT_API_URL = "https://hit-ever-scraper.honchkrow1995.workers.dev";
const envApiUrl = import.meta.env.PUBLIC_API_URL as string | undefined;
export const API_URL = envApiUrl ?? DEFAULT_API_URL;
export const WHATSAPP = siteConfig.social.whatsapp;

// Abort the request after this long so a hung/blocked worker never traps the visitor.
const TRACK_TIMEOUT_MS = 12000;
// Client-side anti-abuse (first line; the worker also rate-limits per IP server-side).
const MIN_INTERVAL_MS = 1500; // ignore rapid double-submits / key-mashing
const MAX_PER_MINUTE = 10; // rolling cap before a cooldown message

// 4-step progress bar (mirrors Everest's public tracking widget).
export const STEPS = ["En bodega Miami", "En camino", "En Nicaragua", "Entregado"];

// Status pill color by state — see docs/marketing/brand-color-system.md (§3).
export const STATUS_PILL: Record<string, string> = {
  entregado: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  en_destino: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
  en_transito: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  parcial: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  en_almacen: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  excepcion: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  desconocido: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

// Standardized 4-milestone journey — we do NOT show raw provider logs (they differ between Everest
// and Global Connection). See brand-color-system.md §4.
export const MILESTONES: { step: number; label: string; desc: string }[] = [
  { step: 1, label: "En bodega Miami", desc: "Tu paquete llegó a nuestra bodega en Miami." },
  { step: 2, label: "En camino", desc: "Tu paquete va en camino a Nicaragua." },
  { step: 3, label: "En Nicaragua", desc: "Llegó a Nicaragua y está en proceso de entrega." },
  { step: 4, label: "Entregado", desc: "¡Listo! Tu paquete fue entregado." },
];

export interface PublicEvent {
  date: string;
  description: string;
  office?: string;
}
export interface PublicShipment {
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

export type View = "idle" | "loading" | "ok" | "notfound" | "error";

// Cargotrack timestamps are the original wall-clock stored as UTC; render in UTC (no tz shift).
export function fmtDay(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(+d)
    ? iso
    : d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

// Dates attributed to a milestone ONLY from data we can trust — no invented middle dates.
export function milestoneDate(step: number, data: PublicShipment): string | undefined {
  const evs = data.events ?? [];
  if (step === 1) return data.receivedAt ?? evs[0]?.date;
  if (step === 3) return evs.find((e) => (e.office ?? "").toUpperCase().includes("MGA"))?.date;
  if (step === 4) return data.step >= 4 ? data.lastEventAt ?? evs[evs.length - 1]?.date : undefined;
  return undefined;
}

// Fire a GTM/dataLayer event so pixels and Google Analytics can build conversions off tracking.
function pushTrackEvent(query: string, result: "found" | "notfound" | "error" | "timeout", status?: string) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "track_search",
    track_query: query,
    track_result: result,
    track_status: status ?? null,
  });
}

/**
 * Shared tracking state machine used by both the /track page and the home hero form.
 *  - `view`  drives the overlay (loading / ok / notfound / error). `idle` = no overlay.
 *  - `error` is the inline validation message shown under the input (does not open the overlay).
 *  - `track` aborts any in-flight request, times out after TRACK_TIMEOUT_MS, and emits a
 *    `track_search` dataLayer event on every outcome.
 */
export function useTracking() {
  const [view, setView] = useState<View>("idle");
  const [data, setData] = useState<PublicShipment | null>(null);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const lastAtRef = useRef(0);
  const stampsRef = useRef<number[]>([]);

  // opts.trap = honeypot value: bots that auto-fill hidden fields get silently dropped.
  const track = async (raw: string, opts?: { trap?: string }) => {
    if (opts?.trap) return; // honeypot filled → almost certainly a bot; do nothing.

    const value = raw.trim();
    if (!isValidQuery(value)) {
      setError("Ingresá un número de guía válido (sin espacios ni símbolos).");
      return;
    }

    // Throttle: ignore rapid re-submits, and cap searches per minute to blunt mass/bot abuse.
    const now = Date.now();
    if (now - lastAtRef.current < MIN_INTERVAL_MS) return;
    stampsRef.current = stampsRef.current.filter((t) => now - t < 60000);
    if (stampsRef.current.length >= MAX_PER_MINUTE) {
      setError("Hiciste muchas búsquedas seguidas. Esperá un momento e intentá de nuevo.");
      return;
    }
    lastAtRef.current = now;
    stampsRef.current.push(now);

    setError("");
    setData(null);
    setView("loading");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      ac.abort();
    }, TRACK_TIMEOUT_MS);

    try {
      const res = await fetch(`${API_URL}/track/${encodeURIComponent(value)}`, { signal: ac.signal });
      clearTimeout(timer);
      if (res.status === 404) {
        setView("notfound");
        pushTrackEvent(value, "notfound");
        return;
      }
      if (!res.ok) {
        setView("error");
        pushTrackEvent(value, "error");
        return;
      }
      const json = (await res.json()) as { ok: boolean; data: PublicShipment };
      if (!json.ok || !json.data) {
        setView("notfound");
        pushTrackEvent(value, "notfound");
        return;
      }
      setData(json.data);
      setView("ok");
      pushTrackEvent(value, "found", json.data.status);
    } catch {
      clearTimeout(timer);
      // Ignore aborts that aren't our timeout: a superseding search or the user closing the overlay
      // aborts the in-flight request, and its catch runs async AFTER state was reset — without these
      // guards it would re-open a spurious error and push a phantom analytics event.
      if (ac !== abortRef.current) return; // superseded by a newer search, or closed
      if (ac.signal.aborted && !timedOut) return; // aborted by the user, not the timeout
      setView("error");
      pushTrackEvent(value, timedOut ? "timeout" : "error");
    }
  };

  const close = () => {
    abortRef.current?.abort();
    abortRef.current = null; // so the aborted request's catch recognizes it was dismissed
    setView("idle");
    setData(null);
  };

  return { view, data, error, setError, track, close };
}

// ─── Overlay (loading / result modal / not-found / error) ──────────────────────────────────────

function OverlayShell({ children, onClose, label }: { children: any; onClose: () => void; label: string }) {
  // Escape + body scroll lock while the overlay is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300 dark:bg-secondary-light sm:max-w-lg sm:rounded-2xl sm:zoom-in-95"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
      {/* Branded animated mark */}
      <div className="relative mb-6 h-20 w-20">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20"></span>
        <span className="absolute inset-2 animate-pulse rounded-full bg-primary/10"></span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Package className="h-9 w-9 animate-bounce text-primary" />
        </span>
      </div>
      <h2 className="text-lg font-bold text-secondary dark:text-white">Buscando tu paquete…</h2>
      <p className="mt-1 text-sm text-neutral-text dark:text-gray-300">Consultando el estado en tiempo real.</p>
      {/* Indeterminate brand progress bar */}
      <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
        <div className="h-full w-1/2 animate-[loadingBar_1.1s_ease-in-out_infinite] rounded-full bg-primary"></div>
      </div>
    </div>
  );
}

function ResultCard({ data }: { data: PublicShipment }) {
  return (
    <>
      {/* Header: guía, estado destacado y servicio */}
      <div className="border-b border-gray-100 p-6 pr-14 dark:border-gray-700 md:p-7 md:pr-14">
        <div className="text-xs font-medium uppercase tracking-wide text-gray-400">Guía</div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">{data.guia}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${STATUS_PILL[data.status] ?? "bg-accent-yellow text-secondary"}`}>
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
        <div className="mt-5 flex items-end gap-1.5">
          {STEPS.map((label, i) => {
            const done = i < data.step;
            return (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full ${done ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"}`}></div>
                <div className={`mt-1.5 text-[11px] leading-tight ${done ? "font-medium text-secondary dark:text-white" : "text-gray-400"}`}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Journey estandarizado, del más reciente al primero. El hito ACTUAL se resalta. */}
      <div className="overflow-y-auto p-6 md:p-7">
        {data.step < 1 ? (
          <div className="rounded-lg bg-slate-50 p-4 text-sm text-neutral-text dark:bg-white/5 dark:text-gray-300">
            {data.status === "excepcion"
              ? "Tu paquete está retenido. Escribinos por WhatsApp con tu guía y lo revisamos al instante."
              : "Todavía no tenemos el estado detallado de esta guía. Escribinos por WhatsApp y te ayudamos."}
          </div>
        ) : (
          <ol className="relative">
            {[...MILESTONES].reverse().map((m, idx, arr) => {
              const done = m.step < data.step;
              const current = m.step === data.step;
              const pending = m.step > data.step;
              const isLast = idx === arr.length - 1;
              const date = milestoneDate(m.step, data);
              return (
                <li key={m.step} className={`relative pl-8 ${isLast ? "pb-0" : "pb-6"}`}>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[6px] top-4 h-full w-0.5 ${done || current ? "bg-green-400 dark:bg-green-600" : "bg-gray-200 dark:bg-gray-700"}`}
                    ></span>
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 flex items-center justify-center rounded-full ring-4 ring-white dark:ring-secondary-light ${
                      current ? "h-4 w-4 -left-0.5 bg-primary" : done ? "h-3.5 w-3.5 bg-green-500" : "h-3.5 w-3.5 bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    {current && <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary opacity-70"></span>}
                  </span>
                  {current ? (
                    <div className="-ml-2 rounded-lg border-l-4 border-primary bg-primary/5 py-2 pl-3 pr-2 dark:bg-primary/10">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-secondary dark:text-white">{m.label}</span>
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Estado actual
                        </span>
                      </div>
                      <div className="text-sm font-medium text-secondary dark:text-gray-100">{m.desc}</div>
                      {date && <div className="mt-0.5 text-xs capitalize text-gray-500 dark:text-gray-400">{fmtDay(date)}</div>}
                    </div>
                  ) : (
                    <>
                      <div className={done ? "font-medium text-secondary dark:text-white" : "text-gray-400"}>{m.label}</div>
                      <div className={`text-sm ${pending ? "text-gray-400" : "text-neutral-text dark:text-gray-300"}`}>{m.desc}</div>
                      {date && <div className="mt-0.5 text-xs capitalize text-gray-400">{fmtDay(date)}</div>}
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-5 dark:border-gray-700">
        <a href={WHATSAPP} target="_blank" rel="noopener" className="text-sm text-neutral-text hover:underline dark:text-gray-300">
          ¿Dudas? Escribinos por WhatsApp
        </a>
      </div>
    </>
  );
}

function MessageCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-8 py-12 text-center">
      <Package className="mx-auto mb-4 h-10 w-10 text-primary" />
      <h2 className="text-lg font-bold text-secondary dark:text-white">{title}</h2>
      <p className="mt-2 text-sm text-neutral-text dark:text-gray-300">{body}</p>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener"
        className="mt-5 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Consultar por WhatsApp
      </a>
    </div>
  );
}

/** The overlay shown for a tracking action. Renders nothing while idle. */
export function TrackingOverlay({ view, data, onClose }: { view: View; data: PublicShipment | null; onClose: () => void }) {
  if (view === "idle") return null;
  return (
    <OverlayShell onClose={onClose} label="Resultado de rastreo">
      {view === "loading" && <LoadingCard />}
      {view === "ok" && data && <ResultCard data={data} />}
      {view === "notfound" && (
        <MessageCard title="No encontramos ese paquete" body="Verificá el número de guía o consultanos y lo buscamos por vos." />
      )}
      {view === "error" && (
        <MessageCard title="No pudimos consultar el estado" body="Puede ser algo momentáneo. Probá de nuevo en un rato o escribinos por WhatsApp." />
      )}
    </OverlayShell>
  );
}
