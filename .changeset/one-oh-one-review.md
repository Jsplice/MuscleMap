---
"@musclemap/react": patch
"@musclemap/core": patch
"@musclemap/assets": patch
---

Post-1.0 review fixes:

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
