# @musclemap/assets

## 1.0.1

### Patch Changes

- 65b4943: Post-1.0 review fixes:

  - `PartValues` keys now **autocomplete** to the bundled `MusclePartId`s while
    still accepting arbitrary strings (custom bodies keep working).
  - Fixed a stale pinned/hover tooltip surviving `sex` / `view` / `region`
    changes — the selection now resets when the displayed body changes.
  - Fixed `visibleByView` memoization (it was recomputed on every render because
    of an unstable dependency).
  - Removed the stale `@experimental … before 1.0` note on `BodyFigureProps`;
    it is a stable, low-level public API.
  - Hardened the release script to run the full quality gate
    (lint, build, package-consumer verify, typecheck, tests) before publishing.
  - Docs: `npm install` examples next to `pnpm add`; an explicit note that
    `HIP_FLEXORS` / legacy `BACK_UPPER` have no traced surface yet.

- Updated dependencies [65b4943]
  - @musclemap/core@1.0.1

## 1.0.0

First stable release.

### Breaking Changes

- Per-surface ids unified to one anatomical `<MUSCLE>_<SIDE>` scheme — e.g.
  `LATISSIMUS_LEFT`, `QUADRICEPS_RIGHT`, `OBLIQUE_LEFT`, `ADDUCTOR_LEFT` — fixing
  the inconsistent traced labels. `partValues` keys change accordingly.
- New typed source for those keys: `MUSCLE_PART_IDS` (readonly tuple),
  `MusclePartId` (union), and `MUSCLE_GROUP_PARTS`
  (`Record<MuscleGroup, MusclePartId[]>`). `getMuscleSurfaceIds()` now returns
  `MusclePartId[]` (de-duplicated).

### Added

- `MALE_BACK` adductors and extended hamstrings — full male/female and
  front/back surface parity.

## 0.4.0

### Minor Changes

- c1eb025: Harden the public package contracts:

  - emit Node-compatible ESM with explicit `.js` relative specifiers;
  - add TypeScript declarations for bundled `.webp` asset imports;
  - validate monochrome colors as `#RGB` or `#RRGGBB` and support short hex;
  - remove the unused `MuscleMapMode` type;
  - document all `MuscleMap` props and mark `BodyFigure` as experimental.

### Patch Changes

- Updated dependencies [c1eb025]
  - @musclemap/core@0.4.0

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
