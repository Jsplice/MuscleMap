---
"@musclemap/assets": minor
"@musclemap/core": minor
"@musclemap/react": minor
---

Shrink the bundled body photos ~96%: converted `bodies/*.png` (≈6.2 MB total) to
`bodies/*.webp` (≈258 KB total, ~64 KB each) at visually lossless quality. The
`@musclemap/assets` tarball drops from ~5.6 MB to well under 1 MB.

**Note:** the import paths change extension — use
`@musclemap/assets/bodies/{male,female}-{front,back}.webp` (was `.png`). WebP is
supported by all current browsers.
