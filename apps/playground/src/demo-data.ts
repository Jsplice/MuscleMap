import type { MuscleGroup, MuscleMapValues } from "@musclemap/core";

export type DemoMode = "OVERALL" | "STRENGTH" | "CARDIO" | "MOBILITY";

export const MUSCLE_LABELS_DE: Record<MuscleGroup, string> = {
  CHEST: "Brust",
  BACK_UPPER: "Oberer Rücken",
  BACK_LOWER: "Unterer Rücken",
  TRAPEZIUS: "Trapez",
  RHOMBOIDS: "Rhomboiden",
  LATS: "Latissimus",
  SHOULDERS_FRONT: "Vordere Schulter",
  SHOULDERS_SIDE: "Seitliche Schulter",
  SHOULDERS_REAR: "Hintere Schulter",
  BICEPS: "Bizeps",
  TRICEPS: "Trizeps",
  FOREARMS: "Unterarme",
  CORE: "Core",
  OBLIQUES: "Seitl. Bauch",
  GLUTES: "Gesäß",
  QUADS: "Quadrizeps",
  HAMSTRINGS: "Beinbeuger",
  CALVES: "Waden",
  HIP_FLEXORS: "Hüftbeuger",
  ADDUCTORS: "Adduktoren",
  ABDUCTORS: "Abduktoren",
};

function v(score: number, volumeKg: number, sets: number, trend: "UP" | "DOWN" | "STABLE") {
  return { score, volumeKg, sets, trend } as const;
}

/** Overall training load — back/chest dominant, calves under-trained (cf. reference). */
const OVERALL: MuscleMapValues = {
  CHEST: v(88, 7200, 24, "UP"),
  BACK_UPPER: v(94, 8600, 28, "UP"),
  BACK_LOWER: v(72, 4100, 14, "STABLE"),
  TRAPEZIUS: v(90, 7800, 22, "UP"),
  RHOMBOIDS: v(76, 4600, 16, "STABLE"),
  LATS: v(84, 6900, 20, "UP"),
  SHOULDERS_FRONT: v(64, 3400, 16, "STABLE"),
  SHOULDERS_SIDE: v(58, 2900, 14, "UP"),
  SHOULDERS_REAR: v(54, 2400, 12, "STABLE"),
  BICEPS: v(70, 3200, 18, "UP"),
  TRICEPS: v(62, 2800, 16, "STABLE"),
  FOREARMS: v(40, 1500, 8, "DOWN"),
  CORE: v(46, 1900, 12, "STABLE"),
  OBLIQUES: v(54, 2200, 12, "STABLE"),
  GLUTES: v(78, 5200, 16, "UP"),
  QUADS: v(66, 6100, 18, "STABLE"),
  HAMSTRINGS: v(60, 4800, 14, "STABLE"),
  CALVES: v(26, 900, 6, "DOWN"),
  HIP_FLEXORS: v(34, 700, 6, "STABLE"),
  ADDUCTORS: v(38, 1100, 7, "STABLE"),
  ABDUCTORS: v(36, 1000, 7, "STABLE"),
};

/** Strength focus — push/pull heavy, legs lighter. */
const STRENGTH: MuscleMapValues = {
  CHEST: v(82, 6800, 22, "UP"),
  BACK_UPPER: v(92, 8200, 26, "UP"),
  BACK_LOWER: v(64, 3200, 12, "STABLE"),
  TRAPEZIUS: v(88, 7400, 20, "UP"),
  RHOMBOIDS: v(72, 4200, 14, "STABLE"),
  LATS: v(86, 7000, 22, "UP"),
  OBLIQUES: v(48, 1700, 10, "STABLE"),
  SHOULDERS_FRONT: v(70, 3600, 16, "UP"),
  SHOULDERS_SIDE: v(60, 3000, 14, "STABLE"),
  SHOULDERS_REAR: v(56, 2500, 12, "STABLE"),
  BICEPS: v(74, 3400, 20, "UP"),
  TRICEPS: v(68, 3000, 18, "UP"),
  FOREARMS: v(44, 1600, 9, "STABLE"),
  CORE: v(40, 1500, 10, "DOWN"),
  GLUTES: v(72, 4800, 14, "STABLE"),
  QUADS: v(58, 5400, 16, "STABLE"),
  HAMSTRINGS: v(50, 3800, 12, "DOWN"),
  CALVES: v(28, 950, 6, "DOWN"),
  HIP_FLEXORS: v(30, 600, 5, "STABLE"),
  ADDUCTORS: v(34, 950, 6, "STABLE"),
  ABDUCTORS: v(32, 900, 6, "STABLE"),
};

/** Cardio — lower body and core driven. */
const CARDIO: MuscleMapValues = {
  CHEST: v(20, 0, 0, "STABLE"),
  BACK_UPPER: v(46, 0, 0, "UP"),
  BACK_LOWER: v(58, 0, 0, "UP"),
  TRAPEZIUS: v(42, 0, 0, "STABLE"),
  RHOMBOIDS: v(38, 0, 0, "STABLE"),
  LATS: v(44, 0, 0, "UP"),
  OBLIQUES: v(62, 0, 0, "UP"),
  SHOULDERS_FRONT: v(18, 0, 0, "STABLE"),
  SHOULDERS_SIDE: v(22, 0, 0, "STABLE"),
  SHOULDERS_REAR: v(30, 0, 0, "STABLE"),
  BICEPS: v(16, 0, 0, "STABLE"),
  TRICEPS: v(18, 0, 0, "STABLE"),
  FOREARMS: v(34, 0, 0, "STABLE"),
  CORE: v(74, 0, 0, "UP"),
  GLUTES: v(82, 0, 0, "UP"),
  QUADS: v(88, 0, 0, "UP"),
  HAMSTRINGS: v(80, 0, 0, "UP"),
  CALVES: v(92, 0, 0, "UP"),
  HIP_FLEXORS: v(66, 0, 0, "UP"),
  ADDUCTORS: v(58, 0, 0, "STABLE"),
  ABDUCTORS: v(60, 0, 0, "STABLE"),
};

const MOBILITY: MuscleMapValues = {
  CORE: v(52, 0, 0, "UP"),
  OBLIQUES: v(58, 0, 0, "UP"),
  TRAPEZIUS: v(46, 0, 0, "STABLE"),
  LATS: v(50, 0, 0, "UP"),
  HIP_FLEXORS: v(64, 0, 0, "UP"),
  ADDUCTORS: v(58, 0, 0, "UP"),
  ABDUCTORS: v(56, 0, 0, "UP"),
  HAMSTRINGS: v(60, 0, 0, "UP"),
  GLUTES: v(48, 0, 0, "STABLE"),
  BACK_LOWER: v(54, 0, 0, "UP"),
  SHOULDERS_REAR: v(44, 0, 0, "STABLE"),
};

export const DEMO_BY_MODE: Record<DemoMode, MuscleMapValues> = {
  OVERALL,
  STRENGTH,
  CARDIO,
  MOBILITY,
};
