import { describe, expect, it } from "vitest";
import { getMuscleColor } from "./color-scales";

const HEX = /^#[0-9a-f]{6}$/i;

describe("getMuscleColor (discrete buckets)", () => {
  it("returns a valid hex for any input", () => {
    for (const s of [-1, 0, 10, 50, 90, 100, 999, Number.NaN]) {
      expect(getMuscleColor(s, "LOAD")).toMatch(HEX);
    }
  });

  it("maps LOAD score buckets to the documented colors", () => {
    expect(getMuscleColor(90, "LOAD")).toBe("#ef4444"); // very high
    expect(getMuscleColor(75, "LOAD")).toBe("#f97316"); // high
    expect(getMuscleColor(5, "LOAD")).toBe("#334155"); // none/very low
  });

  it("treats non-finite as 0 (lowest bucket)", () => {
    expect(getMuscleColor(Number.NaN, "LOAD")).toBe(getMuscleColor(0, "LOAD"));
  });

  it("defaults to LOAD", () => {
    expect(getMuscleColor(40)).toBe(getMuscleColor(40, "LOAD"));
  });
});
