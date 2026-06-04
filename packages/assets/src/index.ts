import type { MuscleMapSex } from "@musclemap/core";
import { MALE_FRONT } from "./male-front";
import { MALE_BACK } from "./male-back";
import { FEMALE_FRONT } from "./female-front";
import { FEMALE_BACK } from "./female-back";
import type { BodyDiagram, BodyView } from "./types";

export * from "./types";
export { MALE_FRONT } from "./male-front";
export { MALE_BACK } from "./male-back";
export { FEMALE_FRONT } from "./female-front";
export { FEMALE_BACK } from "./female-back";

const DIAGRAMS: Record<MuscleMapSex, Record<BodyView, BodyDiagram>> = {
  MALE: { FRONT: MALE_FRONT, BACK: MALE_BACK },
  FEMALE: { FRONT: FEMALE_FRONT, BACK: FEMALE_BACK },
};

/** Returns the body diagram for a sex + view combination. */
export function getBodyDiagram(sex: MuscleMapSex, view: BodyView): BodyDiagram {
  return DIAGRAMS[sex][view];
}

/**
 * The addressable surface ids of a diagram (a muscle path's `id`, e.g.
 * "TRAPEZIUS_LEFT"). Use these as keys for `partValues`. Surfaces are
 * data-driven (they come from the traced labels), so this is a runtime list
 * rather than a fixed type.
 */
export function getMuscleSurfaceIds(diagram: BodyDiagram): string[] {
  return diagram.muscles
    .map((m) => m.id)
    .filter((id): id is string => typeof id === "string");
}
