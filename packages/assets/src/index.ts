import type { MuscleMapSex } from "@musclemap/core";
import { MALE_FRONT } from "./male-front.js";
import { MALE_BACK } from "./male-back.js";
import { FEMALE_FRONT } from "./female-front.js";
import { FEMALE_BACK } from "./female-back.js";
import type { BodyDiagram, BodyView } from "./types.js";

export * from "./types.js";
export { MALE_FRONT } from "./male-front.js";
export { MALE_BACK } from "./male-back.js";
export { FEMALE_FRONT } from "./female-front.js";
export { FEMALE_BACK } from "./female-back.js";

const DIAGRAMS: Record<MuscleMapSex, Record<BodyView, BodyDiagram>> = {
  MALE: { FRONT: MALE_FRONT, BACK: MALE_BACK },
  FEMALE: { FRONT: FEMALE_FRONT, BACK: FEMALE_BACK },
};

/** Returns the body diagram for a sex + view combination. */
export function getBodyDiagram(sex: MuscleMapSex, view: BodyView): BodyDiagram {
  return DIAGRAMS[sex][view];
}

/**
 * The addressable surface ids of a diagram (a muscle path's `id`). Ids follow a
 * consistent `<MuscleGroup>_<SIDE>` scheme, e.g. "TRAPEZIUS_LEFT", "QUADS_RIGHT".
 * Use these as keys for `partValues`. A few surfaces share one id (e.g. the knee
 * and quad are both `QUADS_LEFT`), so the list is de-duplicated.
 */
export function getMuscleSurfaceIds(diagram: BodyDiagram): string[] {
  const ids = diagram.muscles
    .map((m) => m.id)
    .filter((id): id is string => typeof id === "string");
  return [...new Set(ids)];
}
