import { Search } from "lucide-preact";
import { useState } from "preact/hooks";
import { API_URL, TrackingOverlay, useTracking } from "../preact/tracking/shared";

export const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trap, setTrap] = useState(""); // honeypot
  const { view, data, error, setError, track, close } = useTracking();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const value = trackingNumber.trim();
    if (!value) {
      setError("Por favor ingresá un número de rastreo.");
      return;
    }
    // If the API is explicitly disabled, fall back to the dedicated page (which shows "coming soon").
    if (!API_URL) {
      window.location.href = `/track?number=${encodeURIComponent(value)}`;
      return;
    }
    // Otherwise resolve it right here — the result opens in a modal, no page change.
    track(value, { trap });
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">Rastrea tu Paquete</h2>
      <form onSubmit={handleSubmit} className="relative">
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
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={trackingNumber}
            onInput={(e: any) => {
              setTrackingNumber(e.target.value);
              if (error) setError("");
            }}
            placeholder="Ingresa tu número de rastreo"
            className={`pl-12 pr-4 py-4 w-full border-2 ${
              error ? "border-red-500" : "border-primary/30 dark:border-gray-600"
            } rounded-md bg-white dark:bg-secondary text-secondary dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2 animate-in fade-in slide-in-from-top-1">{error}</p>}
        <button
          type="submit"
          disabled={view === "loading"}
          className="w-full mt-4 bg-primary text-white py-4 text-lg rounded-md font-bold transition-all duration-300 shadow-lg hover:bg-primary-dark disabled:opacity-60"
        >
          {view === "loading" ? "Buscando…" : "Rastrear Paquete"}
        </button>
      </form>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-10 blur-xl pointer-events-none" />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-navy rounded-full opacity-10 blur-xl pointer-events-none" />

      <TrackingOverlay view={view} data={data} onClose={close} />
    </div>
  );
};

export default TrackingForm;
