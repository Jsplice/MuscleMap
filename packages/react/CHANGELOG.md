# @musclemap/react

## 0.3.0

### Minor Changes

- 5332b0e: Shrink the bundled body photos ~96%: converted `bodies/*.png` (≈6.2 MB total) to
  `bodies/*.webp` (≈258 KB total, ~64 KB each) at visually lossless quality. The
  `@musclemap/assets` tarball drops from ~5.6 MB to well under 1 MB.

  **Note:** the import paths change extension — use
  `@musclemap/assets/bodies/{male,female}-{front,back}.webp` (was `.png`). WebP is
  supported by all current browsers.

### Patch Changes

- Updated dependencies [5332b0e]
  - @musclemap/assets@0.3.0
  - @musclemap/core@0.3.0

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

### Patch Changes

- Updated dependencies [4453a23]
- Updated dependencies [712909d]
  - @musclemap/core@0.2.0
  - @musclemap/assets@0.2.0
