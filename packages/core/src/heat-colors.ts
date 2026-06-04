import type { MuscleColorModel } from "./types";

export type ColorStop = {
  /** Position on the 0..1 scale. */
  offset: number;
  /** Hex color, e.g. "#22c55e". */
  color: string;
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

/**
 * Continuous color ramps, one per color model. These drive the smooth heatmap
 * fills and the legend gradients so both always stay in sync.
 *
 * - LOAD / FREQUENCY: turbo-style blue -> cyan -> green -> yellow -> orange -> red.
 * - BALANCE: under-represented (violet/blue) -> balanced (green) -> over (red).
 * - RECOVERY_RISK: ready (green) -> risky (red).
 */
const SCALES: Record<MuscleColorModel, ColorStop[]> = {
  LOAD: [
    { offset: 0.0, color: "#1e293b" },
    { offset: 0.12, color: "#0ea5e9" },
    { offset: 0.34, color: "#22d3ee" },
    { offset: 0.52, color: "#22c55e" },
    { offset: 0.68, color: "#facc15" },
    { offset: 0.84, color: "#f97316" },
    { offset: 1.0, color: "#ef4444" },
  ],
  FREQUENCY: [
    { offset: 0.0, color: "#1e293b" },
    { offset: 0.18, color: "#0ea5e9" },
    { offset: 0.45, color: "#22c55e" },
    { offset: 0.72, color: "#f97316" },
    { offset: 1.0, color: "#ef4444" },
  ],
  BALANCE: [
    { offset: 0.0, color: "#8b5cf6" },
    { offset: 0.32, color: "#38bdf8" },
    { offset: 0.52, color: "#22c55e" },
    { offset: 0.74, color: "#f97316" },
    { offset: 1.0, color: "#ef4444" },
  ],
  RECOVERY_RISK: [
    { offset: 0.0, color: "#22c55e" },
    { offset: 0.4, color: "#facc15" },
    { offset: 0.7, color: "#f97316" },
    { offset: 1.0, color: "#ef4444" },
  ],
};

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return [r, g, b];
}

function toHex(channel: number): string {
  return Math.round(clamp01(channel / 255) * 255)
    .toString(16)
    .padStart(2, "0");
}

function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = ar + (br - ar) * t;
  const g = ag + (bg - ag) * t;
  const bl = ab + (bb - ab) * t;
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

/** Returns the gradient stops for a color model, useful for legends/defs. */
export function getColorScaleStops(model: MuscleColorModel = "LOAD"): ColorStop[] {
  return SCALES[model] ?? SCALES.LOAD;
}

/**
 * Smoothly interpolated heatmap color for a 0..100 score.
 *
 * Unlike {@link getMuscleColor} (which returns discrete category buckets used
 * for badges and labels), this produces the continuous fill color shown on the
 * body, matching the premium heatmap look.
 */
export function getMuscleHeatColor(score: number, model: MuscleColorModel = "LOAD"): string {
  const t = clampScore(score) / 100;
  const stops = getColorScaleStops(model);

  if (t <= stops[0]!.offset) return stops[0]!.color;
  const last = stops[stops.length - 1]!;
  if (t >= last.offset) return last.color;

  for (let i = 0; i < stops.length - 1; i++) {
    const current = stops[i]!;
    const next = stops[i + 1]!;
    if (t >= current.offset && t <= next.offset) {
      const span = next.offset - current.offset || 1;
      const local = (t - current.offset) / span;
      return mix(current.color, next.color, local);
    }
  }

  return last.color;
}

/** CSS `linear-gradient(...)` string for a model, for legend bars in any framework. */
export function getColorScaleCss(model: MuscleColorModel = "LOAD", angle = "90deg"): string {
  const stops = getColorScaleStops(model)
    .map((stop) => `${stop.color} ${Math.round(stop.offset * 100)}%`)
    .join(", ");
  return `linear-gradient(${angle}, ${stops})`;
}
