import { describe, expect, it } from "vitest";
import { MUSCLE_GROUP_META } from "@musclemap/core";
import {
  FEMALE_BACK,
  FEMALE_FRONT,
  MALE_BACK,
  MALE_FRONT,
  MUSCLE_GROUP_PARTS,
  MUSCLE_PART_IDS,
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

  it("every surface id belongs to its group in MUSCLE_GROUP_PARTS", () => {
    for (const m of diagram.muscles) {
      if (m.id === undefined) continue;
      expect(MUSCLE_GROUP_PARTS[m.group]).toContain(m.id);
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

  it("uses anatomical ids — no German, typo or naming-variant labels", () => {
    // Each of these previously had a buggy id (see CHANGELOG).
    expect(getMuscleSurfaceIds(FEMALE_BACK)).toContain("LATISSIMUS_LEFT"); // was LATISIMUS_LETF
    expect(getMuscleSurfaceIds(FEMALE_FRONT)).toContain("BICEPS_RIGHT"); // was BIZEPS_RIGHT
    expect(getMuscleSurfaceIds(MALE_FRONT)).toContain("SHOULDER_SIDE_LEFT"); // was SHOULDER_SITE
    expect(getMuscleSurfaceIds(MALE_FRONT)).toContain("QUADRICEPS_LEFT"); // was QUADRICEPS/QUADS mix
    expect(getMuscleSurfaceIds(MALE_BACK)).toContain("OBLIQUE_LEFT"); // was SIDE_CORE

    const bad = /ADDUKTOR|ABDUKTOR|BIZEPS|SITE|SIDE_CORE|CORE_SIDE|LATISIMUS|LETF|KNEE|QUADS/;
    for (const d of [MALE_FRONT, MALE_BACK, FEMALE_FRONT, FEMALE_BACK]) {
      const ids = getMuscleSurfaceIds(d);
      expect(new Set(ids).size).toBe(ids.length); // de-duplicated
      expect(ids.filter((id) => bad.test(id))).toEqual([]);
    }
  });
});

describe("MUSCLE_PART_IDS / MUSCLE_GROUP_PARTS (typed source)", () => {
  it("MUSCLE_GROUP_PARTS values are all in MUSCLE_PART_IDS", () => {
    for (const parts of Object.values(MUSCLE_GROUP_PARTS)) {
      for (const id of parts) expect(MUSCLE_PART_IDS).toContain(id);
    }
  });

  it("covers exactly the ids that appear across the diagrams", () => {
    const fromDiagrams = new Set(
      [MALE_FRONT, MALE_BACK, FEMALE_FRONT, FEMALE_BACK].flatMap(getMuscleSurfaceIds),
    );
    expect(new Set(MUSCLE_PART_IDS)).toEqual(fromDiagrams);
  });

  it("path-less enum groups map to an empty list", () => {
    expect(MUSCLE_GROUP_PARTS.BACK_UPPER).toEqual([]);
    expect(MUSCLE_GROUP_PARTS.HIP_FLEXORS).toEqual([]);
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
