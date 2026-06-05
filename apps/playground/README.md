# MuscleMap Playground

A private Vite demo for visual QA of the MuscleMap component. **Not published** to
npm (`"private": true`).

```bash
pnpm install
pnpm dev        # start the playground (Vite)
```

The control panel exercises the public `<MuscleMap />` props live:

- **sex** — male / female
- **view** — front / back / both
- **region** + `cropToRegion` — full / upper / lower body
- **colorModel** — load / frequency / balance / recovery risk
- **monochromeColor** — single-color (grey → color) scale
- **tooltipFields** — which fields the hover/tap tooltip shows
- **background image** — reference photo, grayscale, opacity, brightness

Everything here maps to a prop on the published component — the playground adds no
behavior of its own beyond demo chrome and localized (German) legend captions
passed via `legendMinLabel` / `legendMaxLabel`.
