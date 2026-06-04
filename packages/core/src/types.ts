export type MuscleGroup =
  | "CHEST"
  | "BACK_UPPER"
  | "BACK_LOWER"
  | "TRAPEZIUS"
  | "RHOMBOIDS"
  | "LATS"
  | "SHOULDERS_FRONT"
  | "SHOULDERS_SIDE"
  | "SHOULDERS_REAR"
  | "BICEPS"
  | "TRICEPS"
  | "FOREARMS"
  | "CORE"
  | "OBLIQUES"
  | "GLUTES"
  | "QUADS"
  | "HAMSTRINGS"
  | "CALVES"
  | "HIP_FLEXORS"
  | "ADDUCTORS"
  | "ABDUCTORS";

export type MuscleMapSex = "MALE" | "FEMALE";
export type MuscleMapView = "FRONT" | "BACK" | "BOTH";
export type MuscleMapRegion = "FULL_BODY" | "UPPER_BODY" | "LOWER_BODY" | "CORE";
export type MuscleMapMode = "OVERALL" | "STRENGTH" | "CARDIO" | "MOBILITY";
export type MuscleColorModel = "LOAD" | "FREQUENCY" | "BALANCE" | "RECOVERY_RISK";
export type MuscleTrend = "UP" | "DOWN" | "STABLE";

export type MuscleMapValue = {
  score: number;
  volumeKg?: number;
  sets?: number;
  sessions?: number;
  trend?: MuscleTrend;
};

export type MuscleMapValues = Partial<Record<MuscleGroup, MuscleMapValue>>;
