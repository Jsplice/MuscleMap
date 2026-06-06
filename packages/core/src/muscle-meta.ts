import type { MuscleGroup, MuscleMapRegion, MuscleMapView } from "./types.js";

/**
 * Which body view(s) a muscle group is visible in.
 * Some groups (side delts, forearms, calves) are visible from both sides.
 */
export type MuscleVisibility = "FRONT" | "BACK" | "BOTH";

export type RegionTag = Exclude<MuscleMapRegion, "FULL_BODY">;

export type MuscleGroupMeta = {
  group: MuscleGroup;
  /**
   * Region buckets this group belongs to. A group can belong to several — e.g.
   * the abs are part of both `UPPER_BODY` and `CORE` — so `UPPER_BODY` views
   * include the core while a `CORE` view can still isolate it.
   */
  regions: RegionTag[];
  /** Where the muscle is anatomically rendered. */
  visibility: MuscleVisibility;
  /** Whether the group is drawn as a left/right pair or a single centered path. */
  bilateral: boolean;
};

/**
 * Single source of truth for how every muscle group maps to regions and views.
 * Headless data only — no UI, no copy. Host apps own localized labels.
 */
export const MUSCLE_GROUP_META: Record<MuscleGroup, MuscleGroupMeta> = {
  CHEST: { group: "CHEST", regions: ["UPPER_BODY"], visibility: "FRONT", bilateral: true },
  BACK_UPPER: { group: "BACK_UPPER", regions: ["UPPER_BODY"], visibility: "BACK", bilateral: true },
  BACK_LOWER: { group: "BACK_LOWER", regions: ["UPPER_BODY", "CORE"], visibility: "BACK", bilateral: true },
  TRAPEZIUS: { group: "TRAPEZIUS", regions: ["UPPER_BODY"], visibility: "BOTH", bilateral: true },
  RHOMBOIDS: { group: "RHOMBOIDS", regions: ["UPPER_BODY"], visibility: "BACK", bilateral: true },
  LATS: { group: "LATS", regions: ["UPPER_BODY"], visibility: "BACK", bilateral: true },
  SHOULDERS_FRONT: { group: "SHOULDERS_FRONT", regions: ["UPPER_BODY"], visibility: "FRONT", bilateral: true },
  SHOULDERS_SIDE: { group: "SHOULDERS_SIDE", regions: ["UPPER_BODY"], visibility: "BOTH", bilateral: true },
  SHOULDERS_REAR: { group: "SHOULDERS_REAR", regions: ["UPPER_BODY"], visibility: "BACK", bilateral: true },
  BICEPS: { group: "BICEPS", regions: ["UPPER_BODY"], visibility: "FRONT", bilateral: true },
  TRICEPS: { group: "TRICEPS", regions: ["UPPER_BODY"], visibility: "BACK", bilateral: true },
  FOREARMS: { group: "FOREARMS", regions: ["UPPER_BODY"], visibility: "BOTH", bilateral: true },
  CORE: { group: "CORE", regions: ["UPPER_BODY", "CORE"], visibility: "FRONT", bilateral: false },
  OBLIQUES: { group: "OBLIQUES", regions: ["UPPER_BODY", "CORE"], visibility: "BOTH", bilateral: true },
  GLUTES: { group: "GLUTES", regions: ["LOWER_BODY"], visibility: "BACK", bilateral: true },
  QUADS: { group: "QUADS", regions: ["LOWER_BODY"], visibility: "FRONT", bilateral: true },
  HAMSTRINGS: { group: "HAMSTRINGS", regions: ["LOWER_BODY"], visibility: "BACK", bilateral: true },
  CALVES: { group: "CALVES", regions: ["LOWER_BODY"], visibility: "BOTH", bilateral: true },
  HIP_FLEXORS: { group: "HIP_FLEXORS", regions: ["LOWER_BODY"], visibility: "FRONT", bilateral: true },
  ADDUCTORS: { group: "ADDUCTORS", regions: ["LOWER_BODY"], visibility: "BOTH", bilateral: true },
  ABDUCTORS: { group: "ABDUCTORS", regions: ["LOWER_BODY"], visibility: "BOTH", bilateral: true },
};

export const ALL_MUSCLE_GROUPS: MuscleGroup[] = Object.keys(MUSCLE_GROUP_META) as MuscleGroup[];

function matchesView(visibility: MuscleVisibility, view: MuscleMapView): boolean {
  if (view === "BOTH") return true;
  if (visibility === "BOTH") return true;
  return visibility === view;
}

function matchesRegion(regions: RegionTag[], filter: MuscleMapRegion): boolean {
  return filter === "FULL_BODY" || regions.includes(filter);
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
    return matchesView(meta.visibility, view) && matchesRegion(meta.regions, region);
  });
}
