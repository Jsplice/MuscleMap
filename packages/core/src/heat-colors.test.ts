import { describe, expect, it } from "vitest";
import {
  DEFAULT_MONOCHROME_BASE,
  getColorScaleCss,
  getColorScaleStops,
  getMonochromeColor,
  getMonochromeScaleCss,
  getMonochromeScaleStops,
  getMuscleHeatColor,
} from "./heat-colors";

const HEX = /^#[0-9a-f]{6}$/i;

describe("getMuscleHeatColor", () => {
  it("always returns a valid hex color", () => {
    for (const s of [-50, 0, 1, 33, 50, 72, 99, 100, 250, Number.NaN, Infinity]) {
      expect(getMuscleHeatColor(s, "LOAD")).toMatch(HEX);
    }
  });

  it("clamps out-of-range and non-finite scores to the endpoints", () => {
    const stops = getColorScaleStops("LOAD");
    const first = stops[0]!.color;
    const last = stops[stops.length - 1]!.color;
    expect(getMuscleHeatColor(0, "LOAD")).toBe(first);
    expect(getMuscleHeatColor(-10, "LOAD")).toBe(first);
    expect(getMuscleHeatColor(Number.NaN, "LOAD")).toBe(first);
    expect(getMuscleHeatColor(100, "LOAD")).toBe(last);
    expect(getMuscleHeatColor(999, "LOAD")).toBe(last);
  });

  it("interpolates between stops (mid value is neither endpoint)", () => {
    const mid = getMuscleHeatColor(50, "LOAD");
    expect(mid).toMatch(HEX);
    expect(mid).not.toBe(getMuscleHeatColor(0, "LOAD"));
    expect(mid).not.toBe(getMuscleHeatColor(100, "LOAD"));
  });

  it("defaults to the LOAD model", () => {
    expect(getMuscleHeatColor(60)).toBe(getMuscleHeatColor(60, "LOAD"));
  });

  it("supports every model", () => {
    for (const m of ["LOAD", "FREQUENCY", "BALANCE", "RECOVERY_RISK"] as const) {
      expect(getMuscleHeatColor(55, m)).toMatch(HEX);
    }
  });
});

describe("getColorScaleStops / getColorScaleCss", () => {
  it("returns ordered stops within 0..1", () => {
    const stops = getColorScaleStops("BALANCE");
    expect(stops.length).toBeGreaterThan(1);
    expect(stops[0]!.offset).toBe(0);
    expect(stops[stops.length - 1]!.offset).toBe(1);
    for (let i = 1; i < stops.length; i++) {
      expect(stops[i]!.offset).toBeGreaterThan(stops[i - 1]!.offset);
    }
  });

  it("builds a CSS gradient string from the same stops", () => {
    const css = getColorScaleCss("LOAD", "90deg");
    expect(css.startsWith("linear-gradient(90deg,")).toBe(true);
    expect(css).toContain(getColorScaleStops("LOAD")[0]!.color);
  });
});

describe("getMonochromeColor", () => {
  const BLUE = "#2f7bff";

  it("returns the base grey at 0 and the full color at 100", () => {
    expect(getMonochromeColor(0, BLUE)).toBe(DEFAULT_MONOCHROME_BASE);
    expect(getMonochromeColor(100, BLUE)).toBe(BLUE);
  });

  it("clamps out-of-range and non-finite scores to the endpoints", () => {
    expect(getMonochromeColor(-20, BLUE)).toBe(DEFAULT_MONOCHROME_BASE);
    expect(getMonochromeColor(Number.NaN, BLUE)).toBe(DEFAULT_MONOCHROME_BASE);
    expect(getMonochromeColor(999, BLUE)).toBe(BLUE);
  });

  it("blends toward the color for mid scores (valid hex, not an endpoint)", () => {
    const mid = getMonochromeColor(50, BLUE);
    expect(mid).toMatch(HEX);
    expect(mid).not.toBe(DEFAULT_MONOCHROME_BASE);
    expect(mid).not.toBe(BLUE);
  });

  it("accepts a custom base color", () => {
    expect(getMonochromeColor(0, BLUE, "#ffffff")).toBe("#ffffff");
    expect(getMonochromeColor(100, BLUE, "#ffffff")).toBe(BLUE);
  });

  it("expands three-digit hex colors", () => {
    expect(getMonochromeColor(100, "#09f")).toBe("#0099ff");
    expect(getMonochromeColor(0, "#09f", "#fff")).toBe("#ffffff");
  });

  it("rejects unsupported CSS color formats instead of producing corrupt colors", () => {
    expect(() => getMonochromeColor(50, "blue")).toThrow(TypeError);
    expect(() => getMonochromeColor(50, "#12")).toThrow(TypeError);
    expect(() => getMonochromeScaleStops("rgb(0 0 255)")).toThrow(TypeError);
  });

  it("builds a base→color CSS gradient", () => {
    const css = getMonochromeScaleCss(BLUE, "90deg");
    expect(css.startsWith("linear-gradient(90deg,")).toBe(true);
    expect(css).toContain(DEFAULT_MONOCHROME_BASE);
    expect(css).toContain(BLUE);
  });
});
