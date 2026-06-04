import type { MuscleColorModel } from "./types";

const NEUTRAL = "#334155";

/** A stepped color stop: the lowest score (inclusive) that maps to `color`. */
type ColorStop = { readonly min: number; readonly color: string };

/**
 * Stepped color scales per model, ordered high → low. The first stop whose
 * `min` the (clamped) score reaches wins; the trailing `min: 0` stop is the
 * model's base color. Data-driven so each model stays a flat table.
 */
const SCALE_STOPS: Record<MuscleColorModel, readonly ColorStop[]> = {
  LOAD: [
    { min: 86, color: "#ef4444" },
    { min: 71, color: "#f97316" },
    { min: 51, color: "#facc15" },
    { min: 31, color: "#22c55e" },
    { min: 11, color: "#0ea5e9" },
    { min: 0, color: NEUTRAL },
  ],
  FREQUENCY: [
    { min: 86, color: "#ef4444" },
    { min: 61, color: "#f97316" },
    { min: 31, color: "#22c55e" },
    { min: 1, color: "#0ea5e9" },
    { min: 0, color: NEUTRAL },
  ],
  BALANCE: [
    { min: 81, color: "#ef4444" },
    { min: 61, color: "#f97316" },
    { min: 46, color: "#22c55e" },
    { min: 31, color: "#38bdf8" },
    { min: 0, color: "#8b5cf6" },
  ],
  RECOVERY_RISK: [
    { min: 76, color: "#ef4444" },
    { min: 51, color: "#f97316" },
    { min: 26, color: "#facc15" },
    { min: 0, color: "#22c55e" },
  ],
};

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

export function getMuscleColor(score: number, model: MuscleColorModel = "LOAD"): string {
  const value = clampScore(score);
  const stops = SCALE_STOPS[model] ?? [];
  for (const stop of stops) {
    if (value >= stop.min) return stop.color;
  }
  return NEUTRAL;
}
