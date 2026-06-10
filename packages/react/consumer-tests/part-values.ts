// Type-level consumer test: `PartValues` keys autocomplete to the bundled
// `MusclePartId`s, but arbitrary strings stay allowed for custom bodies.
import type { PartValues } from "@musclemap/react";
import type { MusclePartId } from "@musclemap/assets";
import { MUSCLE_GROUP_PARTS } from "@musclemap/assets";

// Bundled anatomical ids — should compile and be assignable as MusclePartId.
const bundled: PartValues = {
  LATISSIMUS_LEFT: { score: 90 },
  QUADRICEPS_RIGHT: { score: 40 },
};
const typedKey: MusclePartId = "LATISSIMUS_LEFT";

// Custom (bring-your-own body) ids — must also compile.
const custom: PartValues = {
  MY_CUSTOM_SURFACE: { score: 10 },
};

// The group→parts map stays the discovery source for valid keys.
const latsKeys: MusclePartId[] = MUSCLE_GROUP_PARTS.LATS;

export { bundled, custom, typedKey, latsKeys };
