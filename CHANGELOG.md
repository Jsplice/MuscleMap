# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- **Female** front & back bodies (own traced geometry, not a male reuse).
- Per-surface addressing: `partValues` (keyed by path id, e.g. `TRAPEZIUS_LEFT`)
  and `getMuscleSurfaceIds(diagram)`.
- Cropped region views (`cropToRegion`) — full / upper / lower body.
- Photoreal hybrid: greyscale body photo background clipped to the silhouette
  (`backgroundImage*`, `backgroundGrayscale`, `backgroundBrightness`).
- Fine-grained back muscles: `TRAPEZIUS`, `RHOMBOIDS`, `LATS`, `OBLIQUES`.
- Keyboard accessibility for muscle selection (focusable paths, Enter/Space).
- Unit tests (vitest) and CI (build / typecheck / test / pack dry-run).
- React SSR render smoke tests (figures, heat color, `partValues` override,
  female back diagram).
- [`ASSET_PROVENANCE.md`](ASSET_PROVENANCE.md) documenting asset origins.
  **Everything is MIT** — original muscle path data and the OpenAI-generated,
  manually-edited body photos alike, all free to use and redistribute.
- README status/CI/license badges.
- **SonarQube/SonarJS linting** — ESLint flat config with `eslint-plugin-sonarjs`
  + `typescript-eslint`, enforced in CI (`pnpm lint`). Generated diagram data is
  excluded.
- Publish hardening: `publishConfig.access: "public"` on all packages; CI now
  packs the tarballs and fails if any ships an unresolved `workspace:` dependency.
- `.github/dependabot.yml` (weekly npm + github-actions updates) and a CI
  `pnpm audit --prod` gate.
- README: "Publishing" notes and an `onSelectMuscle` example.

### Changed
- Refactored `getMuscleColor` to a data-driven stepped-scale table (cognitive
  complexity 36 → within the SonarJS limit); behavior unchanged.
- Playground dev deps bumped: `vite` 6 → 8, `@vitejs/plugin-react` 4 → 6.
- CI Node 20 → 22 (matches `vite` 8's runtime requirement).
- Package `tsconfig`s also exclude `src/**/*.test.tsx` (preventive — keeps any
  future `.tsx` tests out of `dist`).

### Fixed (docs)
- README `onSelectMuscle` prop signature was stale (`(group, value) => void`);
  now documents the `{ group, partId?, value? }` selection object the code emits.

### Fixed
- `CORE` region no longer returns an empty set (muscles can belong to multiple
  regions; abs are both `UPPER_BODY` and `CORE`).
- Tap/click no longer double-toggles selection (single pointer-down path).
- `onSelectMuscle` and the tooltip now report the resolved **surface** value
  (respecting `partValues`), not just the group value. `onSelectMuscle` now
  receives `{ group, partId?, value? }`.

### Security
- Bumped `vitest` `^3.2.4` → `^4.1.8` to resolve GHSA-5xrq-8626-4rwp
  (Vitest UI server could read/execute arbitrary files; affected `< 4.1.0`).
  Dev-only dependency; all 41 tests pass on v4.

### Notes
- `0.1.0` is early / pre-release. The public API may change before `1.0`.
