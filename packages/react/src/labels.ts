import type { MuscleColorModel, MuscleGroup } from "@musclemap/core";

/** Fallback English labels derived from the enum, e.g. BACK_UPPER -> "Back Upper". */
export function humanizeMuscleGroup(group: MuscleGroup): string {
  return group
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Default min/max legend captions per color model. */
export const DEFAULT_LEGEND_LABELS: Record<MuscleColorModel, { min: string; max: string }> = {
  LOAD: { min: "Low", max: "High" },
  FREQUENCY: { min: "Rare", max: "Frequent" },
  BALANCE: { min: "Under", max: "Over" },
  RECOVERY_RISK: { min: "Ready", max: "Risk" },
};
