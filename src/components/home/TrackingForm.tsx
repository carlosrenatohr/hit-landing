import { Search } from "lucide-preact";
import { useState } from "preact/hooks";

export const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setError("Por favor ingresa un número de rastreo");
      return;
    }

    setError("");
    // Direct navigation for now
    window.location.href = `/track?number=${trackingNumber}`;
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">
        Rastrea tu Paquete
      </h2>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={trackingNumber}
            onInput={(e: any) => setTrackingNumber(e.target.value)}
            placeholder="Ingresa tu número de rastreo"
            className={`pl-12 pr-4 py-4 w-full border-2 ${
              error
                ? "border-red-500"
                : "border-accent-blue/30 dark:border-gray-600"
            } rounded-xl bg-white dark:bg-secondary text-secondary dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300 shadow-sm`}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-accent-blue text-white py-4 text-lg rounded-xl font-bold transform hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg hover:bg-blue-600"
        >
          Rastrear Paquete
        </button>
      </form>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-10 blur-xl pointer-events-none" />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent-blue rounded-full opacity-10 blur-xl pointer-events-none" />
    </div>
  );
};

export default TrackingForm;
