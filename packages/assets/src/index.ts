import type { MuscleMapSex } from "@musclemap/core";
import { MALE_FRONT } from "./male-front";
import { MALE_BACK } from "./male-back";
import type { BodyDiagram, BodyView } from "./types";

export * from "./types";
export { MALE_FRONT } from "./male-front";
export { MALE_BACK } from "./male-back";

/**
 * Female diagrams are placeholders that currently reuse the male geometry.
 * Replace with dedicated, licensed female anatomy assets before production.
 */
export const FEMALE_FRONT: BodyDiagram = { ...MALE_FRONT, id: "female-front", sex: "FEMALE" };
export const FEMALE_BACK: BodyDiagram = { ...MALE_BACK, id: "female-back", sex: "FEMALE" };

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
