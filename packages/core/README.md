# @musclemap/core

[![npm version](https://img.shields.io/npm/v/@musclemap/core.svg)](https://www.npmjs.com/package/@musclemap/core)
[![npm downloads](https://img.shields.io/npm/dm/@musclemap/core.svg)](https://www.npmjs.com/package/@musclemap/core)

**Headless core for [MuscleMap](https://github.com/Jsplice/MuscleMap).** Muscle-group
types, color scales and region/visibility rules — **zero UI**, usable from any
framework. The React component ([`@musclemap/react`](https://www.npmjs.com/package/@musclemap/react))
is built on top of this.

## Install

```bash
pnpm add @musclemap/core
```

## What's inside

Feed a normalized `score` (0–100) per muscle; the core turns it into colors and
tells you which groups belong to a given view/region.

```ts
import {
  getMuscleHeatColor,
  getColorScaleCss,
  getVisibleMuscleGroups,
} from "@musclemap/core";
import type { MuscleMapValues } from "@musclemap/core";

// Continuous heatmap color for a score (drives the body fills).
getMuscleHeatColor(72, "LOAD");        // "#f9a..." smooth interpolation

// Matching CSS gradient for a legend (same stops → never drifts apart).
getColorScaleCss("LOAD", "90deg");     // "linear-gradient(90deg, …)"

// Which muscle groups to render for a view + region.
getVisibleMuscleGroups("FRONT", "UPPER_BODY"); // ["CHEST", "SHOULDERS_FRONT", …]
```

### Color models

`LOAD` · `FREQUENCY` · `BALANCE` · `RECOVERY_RISK` — each a continuous scale via
`getMuscleHeatColor` / `getColorScaleStops`, with a stepped variant
`getMuscleColor` for discrete buckets.

### Monochrome scale

Use a single brand color from a neutral base at score 0 to the full color at
score 100. Colors accept `#RGB` or `#RRGGBB`.

```ts
import {
  DEFAULT_MONOCHROME_BASE,
  getMonochromeColor,
  getMonochromeScaleCss,
  getMonochromeScaleStops,
} from "@musclemap/core";

getMonochromeColor(50, "#2f7bff");
getMonochromeScaleCss("#2f7bff");
getMonochromeScaleStops("#2f7bff", DEFAULT_MONOCHROME_BASE);
```

### Key exports

- `getMuscleHeatColor`, `getColorScaleCss`, `getColorScaleStops`, `getMuscleColor`
- `getMonochromeColor`, `getMonochromeScaleCss`, `getMonochromeScaleStops`,
  `DEFAULT_MONOCHROME_BASE`
- `getVisibleMuscleGroups`, `MUSCLE_GROUP_META`, `ALL_MUSCLE_GROUPS`
- Types: `MuscleGroup`, `MuscleMapValue`, `MuscleMapValues`, `MuscleColorModel`,
  `MuscleMapView`, `MuscleMapRegion`, `MuscleMapSex`, …

Full docs: **https://github.com/Jsplice/MuscleMap**

## License

MIT
