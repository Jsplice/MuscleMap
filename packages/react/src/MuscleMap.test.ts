import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getMuscleHeatColor } from "@musclemap/core";
import type { MuscleMapValues } from "@musclemap/core";
import { MuscleMap } from "./MuscleMap";

// SSR smoke tests — exercise the real component render path without a DOM.
// No JSX so this stays a `.test.ts` under the shared vitest glob.

const values: MuscleMapValues = {
  CHEST: { score: 90 },
  QUADS: { score: 40 },
  HAMSTRINGS: { score: 50 },
};

function render(props: Record<string, unknown>): string {
  return renderToStaticMarkup(createElement(MuscleMap, props as never));
}

describe("MuscleMap (SSR smoke)", () => {
  it("renders both figures with labelled, path-filled SVGs", () => {
    const html = render({ values, view: "BOTH", showLegend: true });
    expect(html).toContain("<svg");
    expect(html).toContain("MALE FRONT muscle map");
    expect(html).toContain("MALE BACK muscle map");
    expect(html).toContain("<path");
    // active surfaces are focusable buttons (keyboard a11y)
    expect(html).toContain('role="button"');
  });

  it("paints an active group in its heat color", () => {
    const html = render({ values, view: "FRONT", colorModel: "LOAD", glow: true });
    const chest = getMuscleHeatColor(90, "LOAD");
    expect(html).toContain(chest);
  });

  it("honors per-surface partValues (left/right) over the group value", () => {
    const leftColor = getMuscleHeatColor(95, "LOAD");
    const baseColor = getMuscleHeatColor(50, "LOAD");
    expect(leftColor).not.toBe(baseColor);
    const html = render({
      values,
      view: "BACK",
      partValues: { HAMSTRINGS_LEFT: { score: 95 } },
    });
    expect(html).toContain(leftColor); // overridden left surface
    expect(html).toContain(baseColor); // right surface still uses the group value
  });

  it("renders the female back diagram (full body) without throwing", () => {
    const html = render({ values, sex: "FEMALE", view: "BACK" });
    expect(html).toContain("FEMALE BACK muscle map");
    expect(html).toContain("<path");
  });
});
