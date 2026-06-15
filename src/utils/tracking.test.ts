import { describe, expect, it } from "vitest";
import { isValidQuery, normalizeQuery } from "./tracking";

describe("Tracking query validation", () => {
  it("accepts waybill number and carrier tracking", () => {
    expect(isValidQuery("926791")).toBe(true);
    expect(isValidQuery("1Z2V8757YW0098887142")).toBe(true);
    expect(isValidQuery("HIT20240720-001")).toBe(true);
  });

  it("rejects empty, invalid characters, and too long", () => {
    expect(isValidQuery("")).toBe(false);
    expect(isValidQuery("with space")).toBe(false);
    expect(isValidQuery("a".repeat(65))).toBe(false);
  });

  it("uppercases and trims surrounding spaces", () => {
    expect(normalizeQuery("  1z2v  ")).toBe("1Z2V");
  });
});
