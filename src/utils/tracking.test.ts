import { describe, expect, it } from "vitest";
import { validateTrackingNumber } from "./tracking";

describe("Tracking Utils", () => {
  it("should validate correct tracking numbers", () => {
    expect(validateTrackingNumber("HIT20240720-001")).toBe(true);
  });

  it("should invalidate incorrect tracking numbers", () => {
    expect(validateTrackingNumber("INVALID-123")).toBe(false);
    expect(validateTrackingNumber("")).toBe(false);
  });
});
