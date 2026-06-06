import type { CSSProperties } from "react";
import type { MuscleColorModel } from "@musclemap/core";
import { getColorScaleCss, getMonochromeScaleCss } from "@musclemap/core";
import { DEFAULT_LEGEND_LABELS } from "./labels.js";

/** Props for the standalone legend component. */
export type MuscleMapLegendProps = {
  colorModel?: MuscleColorModel;
  /** When set, the bar shows the grey→`monochromeColor` scale instead of `colorModel`. */
  monochromeColor?: string;
  /** Base color at score 0 for the monochrome scale. */
  monochromeBaseColor?: string;
  minLabel?: string;
  maxLabel?: string;
  /** "horizontal" (default) renders a wide bar; "vertical" a tall one. */
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: CSSProperties;
};

export function MuscleMapLegend({
  colorModel = "LOAD",
  monochromeColor,
  monochromeBaseColor,
  minLabel,
  maxLabel,
  orientation = "horizontal",
  className,
  style,
}: MuscleMapLegendProps) {
  const defaults = DEFAULT_LEGEND_LABELS[colorModel];
  const min = minLabel ?? defaults.min;
  const max = maxLabel ?? defaults.max;
  const vertical = orientation === "vertical";

  const angle = vertical ? "0deg" : "90deg";
  const gradient = monochromeColor
    ? getMonochromeScaleCss(monochromeColor, angle, monochromeBaseColor)
    : getColorScaleCss(colorModel, angle);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: vertical ? "column-reverse" : "row",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#94a3b8",
    ...style,
  };

  const barStyle: CSSProperties = {
    background: gradient,
    borderRadius: 999,
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
    ...(vertical
      ? { width: 8, height: 140 }
      : { height: 8, flex: 1, minWidth: 120 }),
  };

  return (
    <div className={className} style={containerStyle}>
      <span style={{ whiteSpace: "nowrap" }}>{min}</span>
      <div style={barStyle} aria-hidden />
      <span style={{ whiteSpace: "nowrap" }}>{max}</span>
    </div>
  );
}
