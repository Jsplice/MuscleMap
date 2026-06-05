import { memo } from "react";
import type { CSSProperties } from "react";
import type { MuscleColorModel, MuscleGroup, MuscleMapValue, MuscleMapValues } from "@musclemap/core";
import { getMonochromeColor, getMuscleHeatColor } from "@musclemap/core";
import type { BodyDiagram, MusclePath } from "@musclemap/assets";

const NEUTRAL_BASE = "#33405a";
const NEUTRAL_EDGE = "#212c40";
const MUSCLE_DIM = "#3a465e";
const STROKE = "rgba(6, 10, 18, 0.6)";

/** Per-surface values, keyed by a muscle path's `id` (e.g. "TRAPEZIUS_LEFT"). */
export type PartValues = Partial<Record<string, MuscleMapValue>>;

export type BodyFigureProps = {
  diagram: BodyDiagram;
  values: MuscleMapValues;
  /** Optional per-surface overrides (keyed by path id); take precedence over group values. */
  partValues?: PartValues;
  colorModel: MuscleColorModel;
  /** When set, ignore `colorModel` and tint with a single-color grey→`monochromeColor` scale. */
  monochromeColor?: string;
  /** Base color at score 0 for the monochrome scale (defaults to a neutral grey). */
  monochromeBaseColor?: string;
  visibleGroups: ReadonlySet<MuscleGroup>;
  activeGroup: MuscleGroup | null;
  glow: boolean;
  idPrefix: string;
  width?: number;
  /** Optional cropped viewBox ("x y w h") to zoom into a body region. */
  cropViewBox?: string;
  /** Optional decorative image rendered behind the body (no effect on coloring). */
  backgroundImage?: string;
  /** Opacity of the background image (0..1). */
  backgroundOpacity?: number;
  /** Desaturate the background image to a neutral grey (keeps shading/detail). */
  backgroundGrayscale?: boolean;
  /** Brightness multiplier for the background image (1 = original). */
  backgroundBrightness?: number;
  onHover: (group: MuscleGroup | null, partId?: string) => void;
  onSelect: (group: MuscleGroup, partId?: string) => void;
};

type RenderMuscle = {
  key: string;
  group: MuscleGroup;
  /** Surface id (e.g. "TRAPEZIUS_LEFT") for per-surface addressing, if provided. */
  partId: string | undefined;
  d: string;
  mirrored: boolean;
};

function expandMuscle(path: MusclePath, index: number): RenderMuscle[] {
  if (path.side === "CENTER") {
    return [{ key: `${path.group}-${index}-c`, group: path.group, partId: path.id, d: path.d, mirrored: false }];
  }
  const rightId = path.id ? path.id.replace(/_LEFT$/, "_RIGHT") : undefined;
  return [
    { key: `${path.group}-${index}-l`, group: path.group, partId: path.id, d: path.d, mirrored: false },
    { key: `${path.group}-${index}-r`, group: path.group, partId: rightId, d: path.d, mirrored: true },
  ];
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}
function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const mix = (c: number) => clamp(c + (t - c) * p);
  return `#${mix(r).toString(16).padStart(2, "0")}${mix(g).toString(16).padStart(2, "0")}${mix(b).toString(16).padStart(2, "0")}`;
}

function BodyFigureImpl({
  diagram,
  values,
  partValues,
  colorModel,
  monochromeColor,
  monochromeBaseColor,
  visibleGroups,
  activeGroup,
  glow,
  idPrefix,
  width = 200,
  cropViewBox,
  backgroundImage,
  backgroundOpacity = 1,
  backgroundGrayscale = false,
  backgroundBrightness = 1,
  onHover,
  onSelect,
}: BodyFigureProps) {
  const bgFilters: string[] = [];
  if (backgroundGrayscale) bgFilters.push("grayscale(1)");
  if (backgroundBrightness !== 1) bgFilters.push(`brightness(${backgroundBrightness})`);
  const bgFilter = bgFilters.length > 0 ? bgFilters.join(" ") : undefined;
  const mirror = `matrix(-1 0 0 1 ${2 * diagram.centerX} 0)`;
  const glowId = `${idPrefix}-glow`;
  const baseGradId = `${idPrefix}-base`;
  const clipId = `${idPrefix}-bodyclip`;
  const [vbX, vbY, vbW, vbH] = diagram.viewBox.split(/\s+/).map(Number);

  // Single-color scale (grey -> monochromeColor) when set, else the model heatmap.
  const colorForScore = (score: number): string =>
    monochromeColor
      ? getMonochromeColor(score, monochromeColor, monochromeBaseColor)
      : getMuscleHeatColor(score, colorModel);

  // Resolve each rendered surface to a value (per-surface override -> group value)
  // and a heatmap color. Visibility is decided by the coarse group.
  const resolved = diagram.muscles.flatMap(expandMuscle).map((m) => {
    const visible = visibleGroups.has(m.group);
    const value = (m.partId ? partValues?.[m.partId] : undefined) ?? values[m.group];
    const color = visible && value ? colorForScore(value.score) : null;
    return { ...m, visible, value, color };
  });

  // One gradient per distinct color (deduped) for cheap 3D shading.
  const colorList = [...new Set(resolved.map((r) => r.color).filter((c): c is string => !!c))];
  const gradIdOf = new Map(colorList.map((c, i) => [c, `${idPrefix}-g${i}`]));

  const fillFor = (color: string | null): string => {
    if (!color) return backgroundImage ? "transparent" : MUSCLE_DIM;
    return `url(#${gradIdOf.get(color)})`;
  };

  const glowMuscles = glow ? resolved.filter((r) => r.color) : [];

  return (
    <svg
      viewBox={cropViewBox ?? diagram.viewBox}
      width={width}
      role="img"
      aria-label={`${diagram.sex} ${diagram.view} muscle map`}
      style={{
        display: "block",
        overflow: cropViewBox ? "hidden" : "visible",
        touchAction: "manipulation",
      }}
    >
      <defs>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id={baseGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={NEUTRAL_BASE} />
          <stop offset="100%" stopColor={NEUTRAL_EDGE} />
        </linearGradient>
        {colorList.map((color) => (
          <linearGradient key={color} id={gradIdOf.get(color)} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={shade(color, 0.22)} />
            <stop offset="55%" stopColor={color} />
            <stop offset="100%" stopColor={shade(color, -0.28)} />
          </linearGradient>
        ))}
        {/* Clip the background image to the body silhouette (removes image bg) */}
        {backgroundImage && (
          <clipPath id={clipId}>
            {diagram.outline.map((part) => {
              const els = [<path key={part.id} d={part.d} />];
              if (part.side === "LEFT") {
                els.push(<path key={`${part.id}_R`} d={part.d} transform={mirror} />);
              }
              return els;
            })}
          </clipPath>
        )}
      </defs>

      {/* Optional decorative background image (no effect on muscle coloring) */}
      {backgroundImage && (
        <image
          href={backgroundImage}
          x={vbX}
          y={vbY}
          width={vbW}
          height={vbH}
          opacity={backgroundOpacity}
          preserveAspectRatio="none"
          clipPath={`url(#${clipId})`}
          style={bgFilter ? { filter: bgFilter } : undefined}
          aria-hidden
        />
      )}

      {/* Neutral silhouette — skipped when a background image provides the body */}
      {!backgroundImage && (
        <g>
          {diagram.outline.map((part) => {
            const els = [<path key={part.id} d={part.d} fill={`url(#${baseGradId})`} />];
            if (part.side === "LEFT") {
              els.push(
                <path key={`${part.id}_R`} d={part.d} fill={`url(#${baseGradId})`} transform={mirror} />,
              );
            }
            return els;
          })}
        </g>
      )}

      {/* Glow halo behind active surfaces */}
      {glowMuscles.length > 0 && (
        <g filter={`url(#${glowId})`} opacity={0.7} aria-hidden>
          {glowMuscles.map((m) => (
            <path
              key={`glow-${m.key}`}
              d={m.d}
              fill={m.color!}
              opacity={0.3 + Math.min(m.value!.score, 100) / 100 * 0.6}
              transform={m.mirrored ? mirror : undefined}
            />
          ))}
        </g>
      )}

      {/* Interactive muscle layer */}
      <g>
        {resolved.map((m) => {
          const interactive = m.visible;
          const isActive = activeGroup === m.group;
          const style: CSSProperties = {
            cursor: interactive ? "pointer" : "default",
            transition: "opacity 120ms ease, stroke-width 120ms ease",
            outline: "none",
          };
          if (!interactive) {
            return (
              <path
                key={m.key}
                d={m.d}
                fill={fillFor(m.color)}
                stroke={STROKE}
                strokeWidth={0.8}
                opacity={0.45}
                transform={m.mirrored ? mirror : undefined}
                style={style}
              />
            );
          }
          return (
            <path
              key={m.key}
              d={m.d}
              fill={fillFor(m.color)}
              stroke={isActive ? "#f1f5f9" : STROKE}
              strokeWidth={isActive ? 1.6 : 0.8}
              transform={m.mirrored ? mirror : undefined}
              style={style}
              // Single selection path (pointerdown) avoids the pointerdown+click double-toggle.
              onPointerDown={(e) => {
                e.preventDefault();
                onSelect(m.group, m.partId);
              }}
              onMouseEnter={() => onHover(m.group, m.partId)}
              onMouseLeave={() => onHover(null)}
              role="button"
              tabIndex={0}
              aria-label={m.partId ?? m.group}
              onFocus={() => onHover(m.group, m.partId)}
              onBlur={() => onHover(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(m.group, m.partId);
                }
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Memoised so tooltip pointer-tracking in MuscleMap doesn't re-render the figures. */
export const BodyFigure = memo(BodyFigureImpl);
