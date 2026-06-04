import type { MuscleGroup, MuscleMapRegion, MuscleMapView } from "./types";

/**
 * Which body view(s) a muscle group is visible in.
 * Some groups (side delts, forearms, calves) are visible from both sides.
 */
export type MuscleVisibility = "FRONT" | "BACK" | "BOTH";

export type MuscleGroupMeta = {
  group: MuscleGroup;
  /** Region bucket used by the UPPER/LOWER/CORE region filter. */
  region: Exclude<MuscleMapRegion, "FULL_BODY">;
  /** Where the muscle is anatomically rendered. */
  visibility: MuscleVisibility;
  /** Whether the group is drawn as a left/right pair or a single centered path. */
  bilateral: boolean;
};

/**
 * Single source of truth for how every muscle group maps to a region and view.
 * Headless data only — no UI, no copy. Host apps own localized labels.
 */
export const MUSCLE_GROUP_META: Record<MuscleGroup, MuscleGroupMeta> = {
  CHEST: { group: "CHEST", region: "UPPER_BODY", visibility: "FRONT", bilateral: true },
  BACK_UPPER: { group: "BACK_UPPER", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  BACK_LOWER: { group: "BACK_LOWER", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  TRAPEZIUS: { group: "TRAPEZIUS", region: "UPPER_BODY", visibility: "BOTH", bilateral: true },
  RHOMBOIDS: { group: "RHOMBOIDS", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  LATS: { group: "LATS", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  SHOULDERS_FRONT: { group: "SHOULDERS_FRONT", region: "UPPER_BODY", visibility: "FRONT", bilateral: true },
  SHOULDERS_SIDE: { group: "SHOULDERS_SIDE", region: "UPPER_BODY", visibility: "BOTH", bilateral: true },
  SHOULDERS_REAR: { group: "SHOULDERS_REAR", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  BICEPS: { group: "BICEPS", region: "UPPER_BODY", visibility: "FRONT", bilateral: true },
  TRICEPS: { group: "TRICEPS", region: "UPPER_BODY", visibility: "BACK", bilateral: true },
  FOREARMS: { group: "FOREARMS", region: "UPPER_BODY", visibility: "BOTH", bilateral: true },
  CORE: { group: "CORE", region: "UPPER_BODY", visibility: "FRONT", bilateral: false },
  OBLIQUES: { group: "OBLIQUES", region: "UPPER_BODY", visibility: "BOTH", bilateral: true },
  GLUTES: { group: "GLUTES", region: "LOWER_BODY", visibility: "BACK", bilateral: true },
  QUADS: { group: "QUADS", region: "LOWER_BODY", visibility: "FRONT", bilateral: true },
  HAMSTRINGS: { group: "HAMSTRINGS", region: "LOWER_BODY", visibility: "BACK", bilateral: true },
  CALVES: { group: "CALVES", region: "LOWER_BODY", visibility: "BOTH", bilateral: true },
  HIP_FLEXORS: { group: "HIP_FLEXORS", region: "LOWER_BODY", visibility: "FRONT", bilateral: true },
  ADDUCTORS: { group: "ADDUCTORS", region: "LOWER_BODY", visibility: "BOTH", bilateral: true },
  ABDUCTORS: { group: "ABDUCTORS", region: "LOWER_BODY", visibility: "BOTH", bilateral: true },
};

export const ALL_MUSCLE_GROUPS: MuscleGroup[] = Object.keys(MUSCLE_GROUP_META) as MuscleGroup[];

function matchesView(visibility: MuscleVisibility, view: MuscleMapView): boolean {
  if (view === "BOTH") return true;
  if (visibility === "BOTH") return true;
  return visibility === view;
}

function matchesRegion(region: MuscleGroupMeta["region"], filter: MuscleMapRegion): boolean {
  return filter === "FULL_BODY" || region === filter;
}

/**
 * Returns the muscle groups that should be rendered for a given view and region.
 *
 * - `view` decides which anatomical side is shown (FRONT / BACK / BOTH).
 * - `region` narrows the set to upper body, lower body, or core.
 *
 * The result is stable-ordered following {@link ALL_MUSCLE_GROUPS}.
 */
export function getVisibleMuscleGroups(
  view: MuscleMapView,
  region: MuscleMapRegion = "FULL_BODY",
): MuscleGroup[] {
  return ALL_MUSCLE_GROUPS.filter((group) => {
    const meta = MUSCLE_GROUP_META[group];
    return matchesView(meta.visibility, view) && matchesRegion(meta.region, region);
  });
}
