# Contributing to MuscleMap

Thanks for your interest! MuscleMap is an early-stage library — issues and PRs are welcome.

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
- `pnpm build && pnpm typecheck && pnpm test && pnpm lint` must pass — CI runs the same.
- For any change to a published package, **add a changeset** (see below).

## Releasing (Changesets)

Versioning and publishing are automated with
[Changesets](https://github.com/changesets/changesets). The three packages are a
**fixed group** — they always share one version and release together.

1. In your PR, run `pnpm changeset` and pick the bump (patch / minor / major) and
   write a short summary. Commit the generated file in `.changeset/`.
2. When the PR merges to `main`, the Release workflow opens (or updates) a
   **"Version Packages"** PR that applies the bumps and updates each package's
   `CHANGELOG.md`.
3. Merging that PR publishes the packages to npm (with provenance).

The root `CHANGELOG.md` is the human-facing overview; Changesets maintains the
per-package changelogs. Publishing needs an `NPM_TOKEN` repository secret; until
it's set, the workflow only manages the version PR and publishes nothing.
