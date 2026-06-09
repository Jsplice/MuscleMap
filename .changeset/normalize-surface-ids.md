---
"@musclemap/assets": minor
"@musclemap/core": minor
"@musclemap/react": minor
---

Normalize all per-surface `id`s to a consistent `<MuscleGroup>_<SIDE>` scheme so
`partValues` keys are predictable across every body. Fixes several buggy ids in
the traced assets:

- `LATISIMUS_LETF` (female back) → `LATS_LEFT` — typo broke per-surface coloring.
- `BIZEPS_RIGHT` (female front) → `BICEPS_RIGHT` — German label.
- `SHOULDER_SITE_*` (male front) → `SHOULDERS_SIDE_*`.
- `QUADRICEPS_*` / `KNEE_*` → `QUADS_*`; `ADDUKTOR`/`ABDUKTOR` → `ADDUCTORS`/`ABDUCTORS`.
- `CORE_SIDE_*` / `SIDE_CORE_*` (obliques) → `OBLIQUES_*`.

`getMuscleSurfaceIds(diagram)` now de-duplicates (a few surfaces share an id,
e.g. knee + quad → `QUADS_LEFT`).

**Migration:** if you keyed `partValues` by an old raw id, switch to
`<MuscleGroup>_LEFT` / `_RIGHT` (use `getMuscleSurfaceIds` to discover them).
