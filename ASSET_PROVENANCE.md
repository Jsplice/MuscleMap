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

The greyscale "photoreal hybrid" look is backed by four reference photos:

```
apps/playground/public/bg-male-front.png
apps/playground/public/bg-male-back.png
apps/playground/public/bg-female-front.png
apps/playground/public/bg-female-back.png
```

These were **generated with OpenAI image tooling from the maintainer's own
prompts and then manually edited/traced over** to produce the muscle geometry
above.

- **License:** MIT — free to use, copy, modify and redistribute.
- **Where they live:** in the repository under `apps/playground/public/`. The
  playground itself is a private, unpublished demo, so the PNGs are not bundled
  into any npm tarball — but they are part of this MIT-licensed repo, so you can
  copy them straight from here if you want the same look.
- **Note on AI output:** under OpenAI's terms the maintainer owns the output to
  the extent permitted by law. Generated output is not guaranteed to be unique;
  as with any asset, satisfy yourself that it fits your use case before shipping.

## What this means for you

- **Using `@musclemap/react` / `@musclemap/core` / `@musclemap/assets`:** you
  get MIT-licensed code and MIT-licensed muscle path data — no caveats.
- **Want the photoreal hybrid look:** either copy the MIT-licensed reference
  photos from `apps/playground/public/`, or supply your own image via the
  `backgroundImageFront` / `backgroundImageBack` props (see the README).

## Summary

| Asset | Origin | License | In npm tarball? |
|---|---|---|---|
| Muscle SVG path data (`@musclemap/assets`) | Original, traced in Inkscape | MIT | ✅ yes (`dist` only) |
| Body reference photos (`bg-*.png`) | OpenAI-generated + manually edited | **MIT** | ❌ repo only (playground), still MIT |
| All source code | Original | MIT | ✅ yes |
