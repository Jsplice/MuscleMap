# @musclemap/react

**Premium, data-driven muscle heatmaps for React.** Render the human body and
color each muscle group by a 0–100 score — as a clean flat-vector figure **or**
layered over a photorealistic body.

<p align="center">
  <img src="https://raw.githubusercontent.com/Jsplice/MuscleMap/main/docs/media/hero-front.png" alt="Male front muscle heatmap" width="220" />
  <img src="https://raw.githubusercontent.com/Jsplice/MuscleMap/main/docs/media/hero-back.png" alt="Male back muscle heatmap" width="220" />
  <img src="https://raw.githubusercontent.com/Jsplice/MuscleMap/main/docs/media/hero-female-front.png" alt="Female front muscle heatmap" width="220" />
</p>

Part of [MuscleMap](https://github.com/Jsplice/MuscleMap) — see the repo for the
full documentation, asset workflow and screenshots.

## Install

```bash
pnpm add @musclemap/react @musclemap/core @musclemap/assets react react-dom
```

`@musclemap/core` and `@musclemap/assets` are dependencies; `react` /
`react-dom` are peers (`^18 || ^19`).

## Quick start

Feed `values` keyed by `MuscleGroup`, each with a `score` from 0–100. That's the
whole contract — your app owns aggregation, MuscleMap just renders.

```tsx
import { MuscleMap } from "@musclemap/react";
import type { MuscleMapValues } from "@musclemap/core";

const values: MuscleMapValues = {
  CHEST:     { score: 88, volumeKg: 7200, sets: 24, trend: "UP" },
  TRAPEZIUS: { score: 90 },
  LATS:      { score: 84 },
  QUADS:     { score: 66 },
  CALVES:    { score: 26, trend: "DOWN" },
};

export function Analytics() {
  return (
    <MuscleMap
      values={values}
      view="BOTH"          // FRONT | BACK | BOTH
      colorModel="LOAD"    // LOAD | FREQUENCY | BALANCE | RECOVERY_RISK
    />
  );
}
```

## Per-surface (left/right) addressing

Color a whole group via `values`, or override an individual surface via
`partValues` (keyed by the path's `id`, e.g. `HAMSTRINGS_LEFT`). The selection
callback reports the surface too — `partId` is `undefined` for a bundled path.

```tsx
<MuscleMap
  values={{ HAMSTRINGS: { score: 70 } }}
  partValues={{
    HAMSTRINGS_LEFT:  { score: 90 },
    HAMSTRINGS_RIGHT: { score: 50 },
  }}
  onSelectMuscle={({ group, partId, value }) => {
    console.log(group, partId, value?.score); // "HAMSTRINGS" "HAMSTRINGS_LEFT" 90
  }}
/>
```

## Photoreal hybrid

Pass a body photo as the background; it's clipped to the silhouette and
(optionally) desaturated, with the colored muscles on top — pixel-aligned
because both come from the same trace. Four ready-to-use photos ship with
[`@musclemap/assets`](https://www.npmjs.com/package/@musclemap/assets), or pass
any URL of your own.

```tsx
import maleFront from "@musclemap/assets/bodies/male-front.webp";
import maleBack  from "@musclemap/assets/bodies/male-back.webp";

<MuscleMap
  values={values}
  backgroundImageFront={maleFront}
  backgroundImageBack={maleBack}
  backgroundGrayscale
  backgroundBrightness={1.2}
  backgroundOpacity={0.45}
/>
```

## Region views

Set `region` and `cropToRegion` for a real cropped view (not just a zoom):

```tsx
<MuscleMap values={values} view="FRONT" region="UPPER_BODY" cropToRegion />
<MuscleMap values={values} view="FRONT" region="LOWER_BODY" cropToRegion />
```

## Exports

`MuscleMap`, `MuscleMapLegend`, `BodyFigure`, `humanizeMuscleGroup`,
`DEFAULT_LEGEND_LABELS`, `DEFAULT_TOOLTIP_FIELDS`, and the
`MuscleMapProps` / `BodyFigureProps` / `PartValues` / `TooltipField` types.

Full prop table and docs: **https://github.com/Jsplice/MuscleMap**

## License

MIT
