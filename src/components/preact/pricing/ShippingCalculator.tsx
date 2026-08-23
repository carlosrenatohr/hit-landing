import { useState } from "preact/hooks";
import { Plane, Ship } from "lucide-preact";

interface Props {
  aereo: number;
  maritimo: number;
}

type ShippingType = "aereo" | "maritimo";

export const ShippingCalculator = ({ aereo, maritimo }: Props) => {
  const rates = { aereo, maritimo };
  const [shippingType, setShippingType] = useState<ShippingType>("aereo");
  const [weight, setWeight] = useState<string>("1");

  const numericWeight = Math.max(parseFloat(weight) || 0, 1);
  const rate = rates[shippingType];
  const total = numericWeight * rate;

  return (
    <div className="space-y-8">
      {/* Type selector */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShippingType("aereo")}
          className={`relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
            shippingType === "aereo"
              ? "border-primary bg-primary/10 shadow-lg"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary hover:border-primary/50"
          }`}
        >
          <Plane
            className={`w-10 h-10 mb-3 ${
              shippingType === "aereo" ? "text-primary" : "text-gray-400 dark:text-gray-500"
            }`}
          />
          <span
            className={`font-bold text-lg ${
              shippingType === "aereo" ? "text-primary" : "text-secondary dark:text-white"
            }`}
          >
            Aéreo
          </span>
          <span className="text-sm text-neutral-text dark:text-gray-400 mt-1">
            ${rates.aereo}/lb
          </span>
          {shippingType === "aereo" && (
            <div className="absolute -top-2 -right-2 bg-primary text-navy text-xs font-bold px-2 py-1 rounded-full">
              Rápido
            </div>
          )}
        </button>

        <button
          onClick={() => setShippingType("maritimo")}
          className={`relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
            shippingType === "maritimo"
              ? "border-navy bg-navy/10 shadow-lg dark:border-primary dark:bg-primary/10"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary hover:border-navy/50 dark:hover:border-primary/50"
          }`}
        >
          <Ship
            className={`w-10 h-10 mb-3 ${
              shippingType === "maritimo"
                ? "text-navy dark:text-primary"
                : "text-gray-400 dark:text-gray-500"
            }`}
          />
          <span
            className={`font-bold text-lg ${
              shippingType === "maritimo"
                ? "text-navy dark:text-primary"
                : "text-secondary dark:text-white"
            }`}
          >
            Marítimo
          </span>
          <span className="text-sm text-neutral-text dark:text-gray-400 mt-1">
            ${rates.maritimo}/lb
          </span>
          {shippingType === "maritimo" && (
            <div className="absolute -top-2 -right-2 bg-navy dark:bg-primary text-white dark:text-navy text-xs font-bold px-2 py-1 rounded-full">
              Económico
            </div>
          )}
        </button>
      </div>

      {/* Weight input */}
      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-semibold text-secondary dark:text-white mb-2"
        >
          Peso (libras)
        </label>
        <div className="relative">
          <input
            id="weight"
            type="number"
            min="0.1"
            step="0.1"
            value={weight}
            onInput={(e) => setWeight((e.target as HTMLInputElement).value)}
            className="w-full text-2xl font-bold px-6 py-4 pr-20 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-secondary text-secondary dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold text-neutral-text dark:text-gray-400">
            lb
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="bg-secondary dark:bg-secondary-light rounded-xl p-6 text-center">
        <p className="text-sm text-gray-300 mb-1">Costo estimado de envío</p>
        <p className="text-5xl font-bold text-primary">
          ${total.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {numericWeight} lb × ${rate}/lb = ${total.toFixed(2)}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
          * No incluye costo de entrega nacional (varía según ubicación)
        </p>
      </div>
    </div>
  );
};

export default ShippingCalculator;
