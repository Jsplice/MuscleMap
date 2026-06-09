# Asset provenance

MuscleMap ships two classes of assets with different origins. **Everything in
this repository is licensed under MIT** — code, traced muscle path data, and the
body photographs alike, all free to use, modify and redistribute. This document
records where each comes from so the provenance is transparent.

## 1. Muscle path data — original, MIT

The `BodyDiagram`s in **`@musclemap/assets`** (the `*.ts` files: `male-front`,
`male-back`, `female-front`, `female-back`) are **original vector work authored
for this project**. Each muscle surface was hand-traced in
[Inkscape](https://inkscape.org) and exported as plain SVG path data with
semantic IDs (`CHEST_LEFT`, `TRAPEZIUS_LEFT`, `BODY`, …).

- **License:** MIT (same as the code).
- **What ships:** only compiled path data. The package's `files` field is
  `["dist"]`, so the published tarball contains JavaScript and type
  declarations — no images. (The photos below are not *needed* by the package;
  they're still MIT and free to grab from the repo.)

## 2. Reference body photographs — OpenAI-generated, MIT

The grayscale "photoreal hybrid" look is backed by four reference photos. They
are **bundled in the published `@musclemap/assets` package** and importable as
asset URLs:

```
@musclemap/assets/bodies/male-front.webp
@musclemap/assets/bodies/male-back.webp
@musclemap/assets/bodies/female-front.webp
@musclemap/assets/bodies/female-back.webp
```

(Source of truth in the repo: `packages/assets/bodies/`. The playground imports
them straight from the package.)

These were **generated with OpenAI image tooling from the maintainer's own
prompts and then manually edited/traced over** to produce the muscle geometry
above.

- **License:** MIT — free to use, copy, modify and redistribute.
- **Shipped:** yes — they are part of the `@musclemap/assets` npm tarball
  (`files` includes `bodies`). Importing one gives your bundler a fingerprinted
  asset URL to pass to `backgroundImage*`.
- **Note on AI output:** under OpenAI's terms the maintainer owns the output to
  the extent permitted by law. Generated output is not guaranteed to be unique.
  They are **demo bodies** — for production/marketing, consider swapping in your
  own branded imagery; `backgroundImage*` accepts any URL.

## What this means for you

- **Using `@musclemap/react` / `@musclemap/core` / `@musclemap/assets`:** you
  get MIT-licensed code, muscle path data, **and** four ready-to-use body photos.
- **Want the photoreal hybrid look:** import a photo from
  `@musclemap/assets/bodies/*.webp` (or supply your own image) and pass it to the
  `backgroundImageFront` / `backgroundImageBack` props.

## Summary

| Asset | Origin | License | In npm tarball? |
|---|---|---|---|
| Muscle SVG path data (`@musclemap/assets`) | Original, traced in Inkscape | MIT | ✅ yes (`dist`) |
| Body reference photos (`bodies/*.webp`) | OpenAI-generated + manually edited | **MIT** | ✅ yes (`@musclemap/assets`) |
| All source code | Original | MIT | ✅ yes |
