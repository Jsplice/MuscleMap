---
"@musclemap/assets": minor
"@musclemap/core": minor
"@musclemap/react": minor
---

**Unified, typed per-surface ids.** All surface `id`s now use one consistent,
anatomically-correct English scheme `<MUSCLE>_<SIDE>`, fixing the inconsistent
traced labels that broke `partValues` targeting:

- `LATISIMUS_LETF` → `LATISSIMUS_LEFT` (typo); `LATISIMUS` → `LATISSIMUS`
- `BIZEPS_RIGHT` → `BICEPS_RIGHT`
- `SHOULDER_SITE_*` → `SHOULDER_SIDE_*`
- `QUADRICEPS_*` / `QUADS_*` → `QUADRICEPS_*`
- `ADDUKTOR`/`ABDUKTOR` → `ADDUCTOR`/`ABDUCTOR`
- `CORE_SIDE_*` / `SIDE_CORE_*` → `OBLIQUE_*`

**New typed source (`@musclemap/assets`)** so consumers stop scraping ids from the
compiled SVG/JS:

- `MUSCLE_PART_IDS` — readonly tuple of every surface id.
- `MusclePartId` — union type of those ids.
- `MUSCLE_GROUP_PARTS` — `Record<MuscleGroup, MusclePartId[]>` (group → its
  surfaces). Path-less enum groups map to `[]`.
- `getMuscleSurfaceIds(diagram)` now returns `MusclePartId[]` (de-duplicated).

**Migration:** if you keyed `partValues` by an old raw id, switch to the new
anatomical ids — import `MUSCLE_GROUP_PARTS` / `MusclePartId` and let the compiler
check them.

**Coverage:** added the missing **adductor** surfaces to `MALE_BACK`
(`ADDUCTOR_LEFT` / `ADDUCTOR_RIGHT`), so male/female and front/back are now at
parity for every group that has any path.

**Notes:**
- `BACK_UPPER` and `HIP_FLEXORS` remain in the `MuscleGroup` enum but have no
  traced path yet (`MUSCLE_GROUP_PARTS` lists them as `[]`).
