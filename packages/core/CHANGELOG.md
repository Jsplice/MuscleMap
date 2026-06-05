# @musclemap/core

## 0.2.0

### Minor Changes

- 4453a23: Add a single-color (monochrome) scale: tint the whole body in one brand color
  from grey (score 0) to that color (score 100).

  - Core: `getMonochromeColor(score, color, baseColor?)`,
    `getMonochromeScaleCss(color, angle?, baseColor?)`,
    `getMonochromeScaleStops`, and `DEFAULT_MONOCHROME_BASE`.
  - React: new `monochromeColor` (and optional `monochromeBaseColor`) props on
    `<MuscleMap />` / `<MuscleMapLegend />` / `<BodyFigure />`. When set, body fills
    and the legend use the grey→color scale and `colorModel` is ignored.

- 712909d: Bundle the four photoreal body photos in `@musclemap/assets`, importable as
  asset URLs via `@musclemap/assets/bodies/{male,female}-{front,back}.png` (new
  `./bodies/*` export). Pass them to `<MuscleMap backgroundImage* />` for the
  photoreal-hybrid look without supplying your own image. They are MIT-licensed,
  AI-generated demo bodies.

  Also adds per-package README files so the npm package pages render documentation.
