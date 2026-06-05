---
"@musclemap/core": minor
"@musclemap/react": minor
"@musclemap/assets": minor
---

Add a single-color (monochrome) scale: tint the whole body in one brand color
from grey (score 0) to that color (score 100).

- Core: `getMonochromeColor(score, color, baseColor?)`,
  `getMonochromeScaleCss(color, angle?, baseColor?)`,
  `getMonochromeScaleStops`, and `DEFAULT_MONOCHROME_BASE`.
- React: new `monochromeColor` (and optional `monochromeBaseColor`) props on
  `<MuscleMap />` / `<MuscleMapLegend />` / `<BodyFigure />`. When set, body fills
  and the legend use the grey→color scale and `colorModel` is ignored.
