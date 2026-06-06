# @musclemap/assets

[![npm version](https://img.shields.io/npm/v/@musclemap/assets.svg)](https://www.npmjs.com/package/@musclemap/assets)
[![npm downloads](https://img.shields.io/npm/dm/@musclemap/assets.svg)](https://www.npmjs.com/package/@musclemap/assets)

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

## Body photos (photoreal hybrid)

This package also **bundles four reference body photos** for the photoreal-hybrid
look, importable as asset URLs (your bundler fingerprints/serves them):

```ts
import maleFront   from "@musclemap/assets/bodies/male-front.webp";
import maleBack    from "@musclemap/assets/bodies/male-back.webp";
import femaleFront from "@musclemap/assets/bodies/female-front.webp";
import femaleBack  from "@musclemap/assets/bodies/female-back.webp";

// then, with @musclemap/react:
// <MuscleMap backgroundImageFront={maleFront} backgroundImageBack={maleBack} … />
```

The package includes TypeScript declarations for these `.webp` subpath imports.

> These photos are **AI-generated demo bodies** (MIT-licensed) — great to get the
> look running immediately. For production/marketing you may want to swap in your
> own branded imagery; `backgroundImage*` takes any URL.

## What ships

Compiled path data (`dist`) **and** the four body photos (`bodies/*.webp`, ~64 KB
each). The
path data is **original work**, hand-traced in Inkscape; the photos are
AI-generated and manually edited. Both are MIT. See
[ASSET_PROVENANCE.md](https://github.com/Jsplice/MuscleMap/blob/main/ASSET_PROVENANCE.md).

Full docs and the trace/import workflow: **https://github.com/Jsplice/MuscleMap**

## License

MIT
