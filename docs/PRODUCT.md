# MuscleMap Product Documentation

## Product idea

MuscleMap is a standalone analytics component for fitness products. It visualizes which muscle groups were trained, how strongly they were loaded, and whether the user's training distribution is balanced.

The feature should sit inside an analytics screen and work as a signature visual element. It must look premium, data-driven, and app-ready.

## Core jobs

MuscleMap helps users and trainers answer:

- What did I train this week or month?
- Which muscle groups are undertrained?
- Which muscle groups are heavily loaded?
- Is my training balanced between push, pull, legs, and core?
- Did strength or cardio create the load?
- Which muscles contributed to the current score?

## Supported dimensions

- Sex: male, female
- View: front, back, both
- Region: full body, upper body, lower body, core
- Mode: overall, strength, cardio, mobility
- Color model: load, frequency, balance, recovery risk
- Score: normalized 0-100 per muscle group

## Muscle groups

The `MuscleGroup` enum (in `@musclemap/core`):

- CHEST
- BACK_UPPER *(legacy — superseded by TRAPEZIUS / RHOMBOIDS / LATS; no path)*
- BACK_LOWER
- TRAPEZIUS
- RHOMBOIDS
- LATS
- SHOULDERS_FRONT
- SHOULDERS_SIDE
- SHOULDERS_REAR
- BICEPS
- TRICEPS
- FOREARMS
- CORE
- OBLIQUES
- GLUTES
- QUADS
- HAMSTRINGS
- CALVES
- HIP_FLEXORS *(no traced path yet)*
- ADDUCTORS
- ABDUCTORS

Per-surface ids follow an anatomical `<MUSCLE>_<SIDE>` scheme (e.g.
`LATISSIMUS_LEFT`); see `MUSCLE_GROUP_PARTS` / `MUSCLE_PART_IDS` in
`@musclemap/assets`.

## Color models

### LOAD

For normalized training load.

- 0-10: no or very low load
- 11-30: low
- 31-50: moderate
- 51-70: strong
- 71-85: high
- 86-100: very high

### FREQUENCY

For how often a muscle group was trained in a period.

- 0: never
- 1-30: low frequency
- 31-60: target range
- 61-85: high frequency
- 86-100: overload risk

### BALANCE

For underrepresented versus overrepresented muscle groups.

- 0-30: underrepresented
- 31-45: slightly low
- 46-60: balanced
- 61-80: elevated
- 81-100: strongly overrepresented

### RECOVERY_RISK

For short-term fatigue or repeated loading.

- 0-25: ready
- 26-50: moderate
- 51-75: high
- 76-100: risky

## Implementation principle

The package receives scores. The host app calculates scores.

Correct flow:

```txt
Host app sessions and sets
-> host app analytics aggregation
-> MuscleMap score object
-> MuscleMap React component
```

Wrong flow:

```txt
MuscleMap package
-> direct database query
```
