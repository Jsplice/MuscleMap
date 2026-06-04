# Asset provenance

MuscleMap ships two distinct classes of assets with different origins. This
document records where each comes from so the licensing story is unambiguous.

## 1. Muscle path data — original, MIT

The `BodyDiagram`s in **`@musclemap/assets`** (the `*.ts` files: `male-front`,
`male-back`, `female-front`, `female-back`) are **original vector work authored
for this project**. Each muscle surface was hand-traced in
[Inkscape](https://inkscape.org) and exported as plain SVG path data with
semantic IDs (`CHEST_LEFT`, `TRAPEZIUS_LEFT`, `BODY`, …).

- **License:** MIT (same as the code).
- **What ships:** only compiled path data. The package's `files` field is
  `["dist"]`, so the published tarball contains JavaScript and type
  declarations — **no images**.

These are the assets a consumer actually depends on, and they are fully free.

## 2. Reference body photographs — OpenAI-generated, demo-only

The greyscale "photoreal hybrid" look in the playground is backed by four
reference photos:

```
apps/playground/public/bg-male-front.png
apps/playground/public/bg-male-back.png
apps/playground/public/bg-female-front.png
apps/playground/public/bg-female-back.png
```

These were **generated with OpenAI image tooling from the maintainer's own
prompts and then manually edited/traced over** to produce the muscle geometry
above.

- **Scope:** used **only** by `apps/playground`, which is a private,
  unpublished demo (`"private": true`, not part of any npm package).
- **Not redistributed:** no published package includes these PNGs. They exist
  in the repository purely to drive the visual demo and the README screenshots.
- **Why demo-only:** under OpenAI's terms the maintainer owns the output to the
  extent permitted by law, but generated output is not guaranteed to be unique
  and the user remains responsible for the content. Rather than make claims we
  can't fully guarantee for downstream redistribution, these images are kept
  out of the published packages.

## What this means for you

- **Using `@musclemap/react` / `@musclemap/core` / `@musclemap/assets`:** you
  get MIT-licensed code and MIT-licensed muscle path data. Nothing here carries
  an image-provenance caveat.
- **Want the photoreal hybrid look in production:** supply **your own** body
  image via the `backgroundImageFront` / `backgroundImageBack` props (see the
  README). Make sure any reference art you trace over, or any photo you ship,
  is yours to use.

## Summary

| Asset | Origin | License | Published? |
|---|---|---|---|
| Muscle SVG path data (`@musclemap/assets`) | Original, traced in Inkscape | MIT | ✅ yes (`dist` only) |
| Body reference photos (`bg-*.png`) | OpenAI-generated + manually edited | Demo-only, not redistributed | ❌ playground only |
| All source code | Original | MIT | ✅ yes |
