import { useCallback, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type {
  MuscleColorModel,
  MuscleGroup,
  MuscleMapRegion,
  MuscleMapSex,
  MuscleMapValue,
  MuscleMapValues,
  MuscleMapView,
} from "@musclemap/core";
import { getVisibleMuscleGroups } from "@musclemap/core";
import { getBodyDiagram } from "@musclemap/assets";
import type { BodyView } from "@musclemap/assets";
import { BodyFigure } from "./BodyFigure.js";
import type { PartValues } from "./BodyFigure.js";
import { MuscleMapLegend } from "./MuscleMapLegend.js";

/** Fields that can be shown in the hover/tap tooltip. */
export type TooltipField = "group" | "score" | "trend" | "volumeKg" | "sets" | "sessions";

export const DEFAULT_TOOLTIP_FIELDS: TooltipField[] = ["group", "score"];

export type MuscleMapProps = {
  values: MuscleMapValues;
  /** Optional per-surface overrides (keyed by path id, e.g. "TRAPEZIUS_LEFT"). */
  partValues?: PartValues;
  sex?: MuscleMapSex;
  view?: MuscleMapView;
  region?: MuscleMapRegion;
  colorModel?: MuscleColorModel;
  /**
   * Single-color override in #RGB or #RRGGBB format. When set, the body is tinted
   * with a grey→`monochromeColor` scale and `colorModel` is ignored.
   */
  monochromeColor?: string;
  /** Base color at score 0 for the monochrome scale (defaults to a neutral grey). */
  monochromeBaseColor?: string;
  glow?: boolean;
  showLegend?: boolean;
  legendMinLabel?: string;
  legendMaxLabel?: string;
  /** Which fields the tooltip shows. Default: muscle group (enum) + score. */
  tooltipFields?: TooltipField[];
  /**
   * Optional localized labels for the tooltip's "group" field.
   * When omitted, the raw English enum value is shown (e.g. "BACK_UPPER").
   */
  labels?: Partial<Record<MuscleGroup, string>>;
  /** Per-figure SVG width in px. */
  figureWidth?: number;
  /** Zoom the figure to the selected `region` (upper/lower/core view) instead of showing the full body. */
  cropToRegion?: boolean;
  /** Optional decorative background image behind the front figure. */
  backgroundImageFront?: string;
  /** Optional decorative background image behind the back figure. */
  backgroundImageBack?: string;
  /** Opacity for the background images (0..1). */
  backgroundOpacity?: number;
  /** Desaturate the background images to neutral grey (keeps shading). */
  backgroundGrayscale?: boolean;
  /** Brightness multiplier for the background images (1 = original). */
  backgroundBrightness?: number;
  /** Fired on tap/click. `partId` is the specific surface (if any); `value` is the resolved surface/group value. */
  onSelectMuscle?: (selection: {
    group: MuscleGroup;
    partId?: string | undefined;
    value?: MuscleMapValue | undefined;
  }) => void;
  className?: string;
  style?: CSSProperties;
};

const TREND_GLYPH = { UP: "↗", DOWN: "↘", STABLE: "→" } as const;

function viewsFor(view: MuscleMapView): BodyView[] {
  if (view === "FRONT") return ["FRONT"];
  if (view === "BACK") return ["BACK"];
  return ["FRONT", "BACK"];
}

export function MuscleMap({
  values,
  partValues,
  sex = "MALE",
  view = "BOTH",
  region = "FULL_BODY",
  colorModel = "LOAD",
  monochromeColor,
  monochromeBaseColor,
  glow = true,
  showLegend = true,
  legendMinLabel,
  legendMaxLabel,
  tooltipFields = DEFAULT_TOOLTIP_FIELDS,
  labels,
  figureWidth = 200,
  cropToRegion = false,
  backgroundImageFront,
  backgroundImageBack,
  backgroundOpacity = 1,
  backgroundGrayscale = false,
  backgroundBrightness = 1,
  onSelectMuscle,
  className,
  style,
}: MuscleMapProps) {
  type Selection = { group: MuscleGroup; partId?: string | undefined };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<Selection | null>(null);
  const [pinned, setPinned] = useState<Selection | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const active = pinned ?? hovered;
  const figures = viewsFor(view);

  const resolveValue = (group: MuscleGroup, partId?: string): MuscleMapValue | undefined =>
    (partId ? partValues?.[partId] : undefined) ?? values[group];

  const handleHover = useCallback((group: MuscleGroup | null, partId?: string) => {
    setHovered(group ? { group, partId } : null);
  }, []);

  const visibleByView = useMemo(() => {
    const map = new Map<BodyView, Set<MuscleGroup>>();
    for (const v of figures) {
      map.set(v, new Set(getVisibleMuscleGroups(v, region)));
    }
    return map;
  }, [figures, region]);

  const handleSelect = useCallback(
    (group: MuscleGroup, partId?: string) => {
      setPinned((prev) =>
        prev && prev.group === group && prev.partId === partId ? null : { group, partId },
      );
      const value = (partId ? partValues?.[partId] : undefined) ?? values[group];
      onSelectMuscle?.({ group, partId, value });
    },
    [onSelectMuscle, values, partValues],
  );

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activeValue = active ? resolveValue(active.group, active.partId) : undefined;

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    color: "#e2e8f0",
    ...style,
  };

  const showField = (field: TooltipField) => tooltipFields.includes(field);

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovered(null)}
    >
      <div style={{ display: "flex", gap: 18, justifyContent: "center", width: "100%" }}>
        {figures.map((v) => {
          const diagram = getBodyDiagram(sex, v);
          const cropViewBox =
            cropToRegion && region !== "FULL_BODY" ? diagram.regionBox?.[region] : undefined;
          return (
          <BodyFigure
            key={v}
            diagram={diagram}
            {...(cropViewBox ? { cropViewBox } : {})}
            values={values}
            {...(partValues ? { partValues } : {})}
            colorModel={colorModel}
            {...(monochromeColor ? { monochromeColor } : {})}
            {...(monochromeBaseColor ? { monochromeBaseColor } : {})}
            visibleGroups={visibleByView.get(v)!}
            activeGroup={active?.group ?? null}
            glow={glow}
            idPrefix={`mm-${sex}-${v}`.toLowerCase()}
            width={figureWidth}
            backgroundOpacity={backgroundOpacity}
            backgroundGrayscale={backgroundGrayscale}
            backgroundBrightness={backgroundBrightness}
            {...(v === "FRONT" && backgroundImageFront ? { backgroundImage: backgroundImageFront } : {})}
            {...(v === "BACK" && backgroundImageBack ? { backgroundImage: backgroundImageBack } : {})}
            onHover={handleHover}
            onSelect={handleSelect}
          />
          );
        })}
      </div>

      {showLegend && (
        <MuscleMapLegend
          colorModel={colorModel}
          {...(monochromeColor ? { monochromeColor } : {})}
          {...(monochromeBaseColor ? { monochromeBaseColor } : {})}
          {...(legendMinLabel !== undefined ? { minLabel: legendMinLabel } : {})}
          {...(legendMaxLabel !== undefined ? { maxLabel: legendMaxLabel } : {})}
          style={{ width: "min(100%, 320px)" }}
        />
      )}

      {active && tooltipFields.length > 0 && (
        <div
          role="status"
          style={{
            position: "absolute",
            left: Math.max(8, Math.min(pos.x + 14, (containerRef.current?.clientWidth ?? 320) - 8)),
            top: Math.max(8, pos.y - 12),
            transform: "translateY(-100%)",
            pointerEvents: "none",
            background: "rgba(10, 14, 22, 0.96)",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            borderRadius: 12,
            padding: "9px 11px",
            minWidth: 92,
            backdropFilter: "blur(8px)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
            zIndex: 20,
          }}
        >
          {showField("group") && (
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.02em" }}>
              {labels?.[active.group] ?? active.group}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 12, color: "#cbd5e1", marginTop: showField("group") ? 4 : 0 }}>
            {showField("score") && (
              <span>
                Score:{" "}
                <strong style={{ color: "#f8fafc" }}>
                  {activeValue ? Math.round(activeValue.score) : "—"}
                </strong>
                {showField("trend") && activeValue?.trend ? ` ${TREND_GLYPH[activeValue.trend]}` : ""}
              </span>
            )}
            {showField("trend") && !showField("score") && activeValue?.trend && (
              <span>Trend: {TREND_GLYPH[activeValue.trend]}</span>
            )}
            {showField("volumeKg") && activeValue?.volumeKg !== undefined && (
              <span>{activeValue.volumeKg.toLocaleString()} kg</span>
            )}
            {showField("sets") && activeValue?.sets !== undefined && <span>{activeValue.sets} sets</span>}
            {showField("sessions") && activeValue?.sessions !== undefined && (
              <span>{activeValue.sessions} sessions</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
