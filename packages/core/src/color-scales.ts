import type { MuscleColorModel } from "./types";

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

export function getMuscleColor(score: number, model: MuscleColorModel = "LOAD"): string {
  const value = clampScore(score);

  if (model === "LOAD") {
    if (value >= 86) return "#ef4444";
    if (value >= 71) return "#f97316";
    if (value >= 51) return "#facc15";
    if (value >= 31) return "#22c55e";
    if (value >= 11) return "#0ea5e9";
    return "#334155";
  }

  if (model === "FREQUENCY") {
    if (value >= 86) return "#ef4444";
    if (value >= 61) return "#f97316";
    if (value >= 31) return "#22c55e";
    if (value >= 1) return "#0ea5e9";
    return "#334155";
  }

  if (model === "BALANCE") {
    if (value >= 81) return "#ef4444";
    if (value >= 61) return "#f97316";
    if (value >= 46) return "#22c55e";
    if (value >= 31) return "#38bdf8";
    return "#8b5cf6";
  }

  if (model === "RECOVERY_RISK") {
    if (value >= 76) return "#ef4444";
    if (value >= 51) return "#f97316";
    if (value >= 26) return "#facc15";
    return "#22c55e";
  }

  return "#334155";
}
