# @musclemap/assets

**Body diagrams for [MuscleMap](https://github.com/Jsplice/MuscleMap).** Segmented
muscle **SVG path data** with semantic IDs and precomputed region viewBoxes —
**framework-free**. Consumed by [`@musclemap/react`](https://www.npmjs.com/package/@musclemap/react),
but usable on its own to render bodies in any stack.

## Install

```bash
pnpm add @musclemap/assets @musclemap/core
```

## Usage

```ts
import { getBodyDiagram, getMuscleSurfaceIds } from "@musclemap/assets";

// Per-sex, per-view diagram.
const diagram = getBodyDiagram("MALE", "FRONT");

diagram.viewBox;     // "0 0 1024 1536"
diagram.muscles;     // [{ group, side, id?, d }, …] — SVG path data
diagram.outline;     // body silhouette path(s)
diagram.regionBox;   // { UPPER_BODY, LOWER_BODY, CORE } cropped viewBoxes

// Every individually addressable surface id (e.g. "TRAPEZIUS_LEFT").
getMuscleSurfaceIds(diagram);
```

Direct diagram exports are also available: `MALE_FRONT`, `MALE_BACK`,
`FEMALE_FRONT`, `FEMALE_BACK`.

## What ships

Only compiled path data (the package's `files` field is `["dist"]`). The path
data is **original work**, hand-traced in Inkscape. The reference body photos used
for the photoreal-hybrid look are **not** part of this package — see
[ASSET_PROVENANCE.md](https://github.com/Jsplice/MuscleMap/blob/main/ASSET_PROVENANCE.md).

Full docs and the trace/import workflow: **https://github.com/Jsplice/MuscleMap**

## License

MIT
