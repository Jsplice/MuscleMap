# Contributing to MuscleMap

Thanks for your interest! MuscleMap is an early-stage (`0.1.0`) library — issues and PRs are welcome.

## Setup

```bash
pnpm install
pnpm build       # build packages (core → assets → react)
pnpm test        # run unit tests (vitest)
pnpm typecheck
pnpm dev         # run the playground for visual QA
```

Node ≥ 20, pnpm 10.

## Project layout

- `packages/core` — headless types, color scales, region rules. **No UI.**
- `packages/assets` — body diagrams (SVG path data). **No framework.**
- `packages/react` — the `<MuscleMap />` component.
- `apps/playground` — Vite demo (not published).

Respect those boundaries: core stays UI-free, assets stay framework-free, react stays backend-free.

## Adding / changing a body

Bodies are traced in Inkscape and imported as a `BodyDiagram` (see the README's *Assets* section). Each muscle surface gets a semantic label (`CHEST_LEFT`, …); the import flattens the paths and computes region viewBoxes. Make sure any reference art you trace over is yours to use.

## Pull requests

- Keep core UI-free and typed (the repo uses `strict` + `exactOptionalPropertyTypes`).
- Add/adjust tests for behavior changes (`packages/*/src/**/*.test.ts`).
- `pnpm build && pnpm typecheck && pnpm test` must pass — CI runs the same.
- Note any public API change in `CHANGELOG.md`.
