import { describe, expect, it } from "vitest";
import { ALL_MUSCLE_GROUPS, MUSCLE_GROUP_META, getVisibleMuscleGroups } from "./muscle-meta";

describe("MUSCLE_GROUP_META", () => {
  it("is self-consistent (key === group, regions non-empty)", () => {
    for (const [key, meta] of Object.entries(MUSCLE_GROUP_META)) {
      expect(meta.group).toBe(key);
      expect(meta.regions.length).toBeGreaterThan(0);
    }
  });
});

describe("getVisibleMuscleGroups", () => {
  it("returns everything for BOTH + FULL_BODY", () => {
    expect(getVisibleMuscleGroups("BOTH", "FULL_BODY").sort()).toEqual([...ALL_MUSCLE_GROUPS].sort());
  });

  it("filters by view", () => {
    const front = getVisibleMuscleGroups("FRONT");
    expect(front).toContain("CHEST");
    expect(front).toContain("BICEPS");
    expect(front).not.toContain("LATS"); // back-only
    expect(front).not.toContain("RHOMBOIDS");

    const back = getVisibleMuscleGroups("BACK");
    expect(back).toContain("LATS");
    expect(back).toContain("TRAPEZIUS");
    expect(back).not.toContain("CHEST");
    expect(back).not.toContain("BICEPS");
  });

  it("UPPER_BODY includes the core but not legs", () => {
    const upper = getVisibleMuscleGroups("FRONT", "UPPER_BODY");
    expect(upper).toContain("CHEST");
    expect(upper).toContain("CORE");
    expect(upper).toContain("OBLIQUES");
    expect(upper).not.toContain("QUADS");
    expect(upper).not.toContain("CALVES");
  });

  it("LOWER_BODY includes legs but not torso", () => {
    const lower = getVisibleMuscleGroups("FRONT", "LOWER_BODY");
    expect(lower).toContain("QUADS");
    expect(lower).toContain("CALVES");
    expect(lower).not.toContain("CHEST");
    expect(lower).not.toContain("CORE");
  });

  it("CORE region is non-empty (regression: must not return [])", () => {
    expect(getVisibleMuscleGroups("FRONT", "CORE")).toContain("CORE");
    expect(getVisibleMuscleGroups("FRONT", "CORE")).toContain("OBLIQUES");
    expect(getVisibleMuscleGroups("BACK", "CORE")).toContain("BACK_LOWER");
    expect(getVisibleMuscleGroups("BOTH", "CORE").length).toBeGreaterThan(0);
  });

  it("preserves the stable ALL_MUSCLE_GROUPS order", () => {
    const result = getVisibleMuscleGroups("BOTH", "FULL_BODY");
    const order = ALL_MUSCLE_GROUPS.filter((g) => result.includes(g));
    expect(result).toEqual(order);
  });
});
