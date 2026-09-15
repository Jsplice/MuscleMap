---
"@musclemap/core": patch
"@musclemap/assets": patch
"@musclemap/react": patch
---

Review fixes:

- Unique SVG def ids per `<MuscleMap />` instance (`useId`) — multiple maps on
  one page no longer share gradients / filters / clipPaths and show wrong colors.
- `TRICEPS` is visible from both sides; the traced front triceps are now colored
  and interactive in the `FRONT` view.
- Muscle surfaces get a localized accessible name from `labels` (plus side,
  e.g. "Brust (left)") instead of the raw surface id; the id is exposed as
  `data-part-id`.
- Package `exports` gained a `default` condition.
