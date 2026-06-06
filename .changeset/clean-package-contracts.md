---
"@musclemap/assets": minor
"@musclemap/core": minor
"@musclemap/react": minor
---

Harden the public package contracts:

- emit Node-compatible ESM with explicit `.js` relative specifiers;
- add TypeScript declarations for bundled `.webp` asset imports;
- validate monochrome colors as `#RGB` or `#RRGGBB` and support short hex;
- remove the unused `MuscleMapMode` type;
- document all `MuscleMap` props and mark `BodyFigure` as experimental.
