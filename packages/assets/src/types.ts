import type { MuscleGroup, MuscleMapRegion, MuscleMapSex } from "@musclemap/core";

export type BodySide = "LEFT" | "RIGHT" | "CENTER";

/**
 * A colorable muscle region. Authored once for the LEFT side (or CENTER for
 * midline groups); the RIGHT side is mirrored at render time across `centerX`.
 */
export type MusclePath = {
  group: MuscleGroup;
  side: Extract<BodySide, "LEFT" | "CENTER">;
  /** SVG path data (`d`). Neutral base color is applied unless a score exists. */
  d: string;
  /**
   * Unique surface ID (e.g. "TRAPEZIUS_LEFT"). Lets a single muscle surface be
   * addressed individually via `partValues`, in addition to its coarse `group`.
   */
  id?: string;
};

/**
 * Part of the neutral body silhouette (head, neck, torso, limbs, feet).
 * Never colored by data — provides the dark body shape behind the muscles.
 */
export type OutlinePath = {
  id: string;
  side: Extract<BodySide, "LEFT" | "CENTER">;
  d: string;
};

export type BodyView = "FRONT" | "BACK";

export type BodyDiagram = {
  id: string;
  sex: MuscleMapSex;
  view: BodyView;
  viewBox: string;
  /** Vertical mirror axis used to generate RIGHT-side paths from LEFT paths. */
  centerX: number;
  /**
   * Optional cropped viewBoxes per region ("x y w h"), used to render zoomed
   * upper-body / lower-body / core views.
   */
  regionBox?: Partial<Record<MuscleMapRegion, string>>;
  outline: OutlinePath[];
  muscles: MusclePath[];
};
