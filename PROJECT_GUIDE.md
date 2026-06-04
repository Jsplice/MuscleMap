# MuscleMap Claude Code Guide

## Mission

Build a standalone TypeScript and React package for premium muscle analytics visualization.

The project must be usable by TrainPilot or RepMap, but it must not depend on either application.

## Non-negotiable rules

- No Prisma imports.
- No database access.
- No authentication logic.
- No Next.js dependency in core packages.
- Core package must be UI-free.
- React package must be backend-free.
- SVG assets must use semantic muscle IDs.
- Production SVGs must be licensed and editable.

## Packages

Create this structure:

```txt
packages/core
packages/assets
packages/react
apps/playground
```

## Core domain types

Implement these types first:

```ts
export type MuscleGroup =
  | "CHEST"
  | "BACK_UPPER"
  | "BACK_LOWER"
  | "SHOULDERS_FRONT"
  | "SHOULDERS_SIDE"
  | "SHOULDERS_REAR"
  | "BICEPS"
  | "TRICEPS"
  | "FOREARMS"
  | "CORE"
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
```

## First implementation slice

1. Create package manifests for core, assets, react, and playground.
2. Implement core types.
3. Implement `getMuscleColor(score, model)`.
4. Implement `getVisibleMuscleGroups(view, region)`.
5. Create placeholder SVG components for male front and male back.
6. Build `MuscleMap` React component.
7. Build `MuscleMapLegend` and minimal tooltip behavior.
8. Render demo data in playground.

## Visual target

The final component must feel like a premium mobile analytics feature, not a generic body highlighter. Placeholder SVGs are acceptable only for implementation. Final assets must be professionally designed.
