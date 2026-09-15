---
"@musclemap/assets": minor
---

The male centre `TRAPEZIUS` surface (front and back) is split at the midline into
`TRAPEZIUS_LEFT` / `TRAPEZIUS_RIGHT`, matching the female bodies and enabling
left/right balance for the traps on every body. Geometry is otherwise unchanged.
`MUSCLE_PART_IDS` / `MusclePartId` drop `"TRAPEZIUS"` — consumers keying
`partValues` by that id must switch to the `_LEFT` / `_RIGHT` ids.
