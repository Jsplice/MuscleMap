import { describe, expect, it } from "vitest";
import { MUSCLE_GROUP_META } from "@musclemap/core";
import { MALE_BACK, MALE_FRONT, getBodyDiagram, getMuscleSurfaceIds } from "./index";

const DIAGRAMS = { MALE_FRONT, MALE_BACK };

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
});

describe("getMuscleSurfaceIds", () => {
  it("returns addressable surface ids", () => {
    const ids = getMuscleSurfaceIds(MALE_FRONT);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toContain("CHEST_LEFT");
    expect(getMuscleSurfaceIds(MALE_BACK)).toContain("TRAPEZIUS_LEFT");
  });
});

describe("getBodyDiagram", () => {
  it("resolves sex + view", () => {
    expect(getBodyDiagram("MALE", "FRONT")).toBe(MALE_FRONT);
    expect(getBodyDiagram("MALE", "BACK")).toBe(MALE_BACK);
  });

  it("female falls back to male geometry (documented placeholder)", () => {
    const ff = getBodyDiagram("FEMALE", "FRONT");
    expect(ff.sex).toBe("FEMALE");
    expect(ff.muscles).toEqual(MALE_FRONT.muscles);
  });
});
