// Validates/normalizes the number the customer enters to track a shipment.
// Accepts the waybill number (almacén id, e.g. "926791") or the carrier tracking (e.g. "1Z...").
// Must match the worker's validation (hit-ever2): [\w-]+, max 64.

export function normalizeQuery(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidQuery(value: string): boolean {
  const v = value.trim();
  return v.length > 0 && v.length <= 64 && /^[\w-]+$/.test(v);
}
