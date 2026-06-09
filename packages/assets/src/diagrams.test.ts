import { describe, expect, it } from "vitest";
import { MUSCLE_GROUP_META } from "@musclemap/core";
import {
  FEMALE_BACK,
  FEMALE_FRONT,
  MALE_BACK,
  MALE_FRONT,
  getBodyDiagram,
  getMuscleSurfaceIds,
} from "./index";

const DIAGRAMS = { MALE_FRONT, MALE_BACK, FEMALE_FRONT, FEMALE_BACK };

describe.each(Object.entries(DIAGRAMS))("%s diagram", (_name, diagram) => {
  it("uses a 1024x1536 viewBox", () => {
    expect(diagram.viewBox).toBe("0 0 1024 1536");
  });

  it("references only known muscle groups", () => {
    for (const m of diagram.muscles) {
      expect(MUSCLE_GROUP_META[m.group]).toBeDefined();
    }
  });

  it("has muscle paths and a body outline", () => {
    expect(diagram.muscles.length).toBeGreaterThan(0);
    expect(diagram.outline.length).toBeGreaterThan(0);
    for (const m of diagram.muscles) expect(m.d.length).toBeGreaterThan(0);
  });

  it("ships region viewBoxes for cropping", () => {
    expect(diagram.regionBox?.UPPER_BODY).toBeTruthy();
    expect(diagram.regionBox?.LOWER_BODY).toBeTruthy();
    expect(diagram.regionBox?.CORE).toBeTruthy();
  });

  it("surface ids follow the `<group>_<SIDE>` scheme", () => {
    for (const m of diagram.muscles) {
      if (m.id === undefined) continue;
      expect([m.group, `${m.group}_LEFT`, `${m.group}_RIGHT`]).toContain(m.id);
    }
  });
});

describe("getMuscleSurfaceIds", () => {
  it("returns addressable surface ids", () => {
    expect(getMuscleSurfaceIds(MALE_FRONT)).toContain("CHEST_LEFT");
    expect(getMuscleSurfaceIds(MALE_BACK)).toContain("TRAPEZIUS_LEFT");
    expect(getMuscleSurfaceIds(FEMALE_FRONT).length).toBeGreaterThan(0);
    expect(getMuscleSurfaceIds(FEMALE_BACK)).toContain("TRAPEZIUS_LEFT");
  });

  it("uses normalized ids — no German, typo or naming-variant labels", () => {
    // Each of these previously had a buggy id (see CHANGELOG).
    expect(getMuscleSurfaceIds(FEMALE_BACK)).toContain("LATS_LEFT"); // was LATISIMUS_LETF
    expect(getMuscleSurfaceIds(FEMALE_FRONT)).toContain("BICEPS_RIGHT"); // was BIZEPS_RIGHT
    expect(getMuscleSurfaceIds(MALE_FRONT)).toContain("SHOULDERS_SIDE_LEFT"); // was SHOULDER_SITE
    expect(getMuscleSurfaceIds(MALE_FRONT)).toContain("QUADS_LEFT"); // was QUADRICEPS
    expect(getMuscleSurfaceIds(MALE_BACK)).toContain("OBLIQUES_LEFT"); // was SIDE_CORE

    const bad = /ADDUKTOR|ABDUKTOR|BIZEPS|QUADRICEPS|SITE|SIDE_CORE|CORE_SIDE|LATISIMUS|LETF|KNEE/;
    for (const d of [MALE_FRONT, MALE_BACK, FEMALE_FRONT, FEMALE_BACK]) {
      const ids = getMuscleSurfaceIds(d);
      expect(new Set(ids).size).toBe(ids.length); // de-duplicated
      expect(ids.filter((id) => bad.test(id))).toEqual([]);
    }
  });
});

describe("getBodyDiagram", () => {
  it("resolves every sex + view", () => {
    expect(getBodyDiagram("MALE", "FRONT")).toBe(MALE_FRONT);
    expect(getBodyDiagram("MALE", "BACK")).toBe(MALE_BACK);
    expect(getBodyDiagram("FEMALE", "FRONT")).toBe(FEMALE_FRONT);
    expect(getBodyDiagram("FEMALE", "BACK")).toBe(FEMALE_BACK);
  });

  it("female has its own geometry (not a male reuse)", () => {
    expect(FEMALE_FRONT.sex).toBe("FEMALE");
    expect(FEMALE_FRONT.muscles).not.toBe(MALE_FRONT.muscles);
    expect(FEMALE_FRONT.outline[0]!.d).not.toBe(MALE_FRONT.outline[0]!.d);
  });
});
