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
- [`ASSET_PROVENANCE.md`](ASSET_PROVENANCE.md) documenting asset origins:
  original MIT-licensed muscle path data vs. OpenAI-generated, demo-only body
  photos that ship with no published package.
- README status/CI/license badges.

### Fixed
- `CORE` region no longer returns an empty set (muscles can belong to multiple
  regions; abs are both `UPPER_BODY` and `CORE`).
- Tap/click no longer double-toggles selection (single pointer-down path).
- `onSelectMuscle` and the tooltip now report the resolved **surface** value
  (respecting `partValues`), not just the group value. `onSelectMuscle` now
  receives `{ group, partId?, value? }`.

### Notes
- `0.1.0` is early / pre-release. The public API may change before `1.0`.
