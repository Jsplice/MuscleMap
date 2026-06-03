# MuscleMap

Standalone TypeScript/React muscle analytics component for fitness products.

MuscleMap renders premium SVG-based body heatmaps for training analytics. It is designed for TrainPilot/RepMap, but the core package stays independent from any app, database, ORM, or authentication layer.

## Product idea

MuscleMap shows which muscle groups were trained, how strongly they were loaded, and where imbalances exist.

Supported analytics modes:

- `OVERALL`: combined training load
- `STRENGTH`: strength-training load from sets, reps, weight, and exercise-to-muscle weights
- `CARDIO`: cardio contribution from activity profile, duration, and intensity
- `MOBILITY`: reserved for later mobility and recovery work

Required UI capabilities:

- male and female body maps
- front, back, and combined views
- full body, upper body, lower body, and core focus
- color models for load, frequency, balance, and recovery risk
- hover and tap states
- tooltip and detail cards
- dark-mode optimized premium visuals

## Architecture

```txt
Host app training data
-> host app aggregation/API
-> normalized MuscleMap scores
-> @musclemap/core
-> @musclemap/react
-> SVG heatmap
```

MuscleMap does not query databases. It receives normalized scores and renders them.

## Monorepo structure

```txt
packages/core       Headless types, visibility rules, color scales, scoring helpers
packages/assets     SVG assets and path metadata
packages/react      React components
apps/playground     Vite playground for visual QA and demos
docs/               Product, implementation, and asset documentation
```

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm dev
```

## Asset note

Production SVGs must be professionally designed, segmented, licensed, and cleaned. Do not ship copied anatomy graphics without a license that allows commercial software use and modification.
