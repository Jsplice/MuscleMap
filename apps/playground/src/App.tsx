import { useMemo, useState } from "react";
import type {
  MuscleColorModel,
  MuscleMapMode,
  MuscleMapRegion,
  MuscleMapSex,
  MuscleMapView,
} from "@musclemap/core";
import { getMuscleHeatColor, getVisibleMuscleGroups } from "@musclemap/core";
import { MuscleMap } from "@musclemap/react";
import type { TooltipField } from "@musclemap/react";
// Bundled photoreal body photos, imported straight from the package (dogfoods the ./bodies export).
import maleFront from "@musclemap/assets/bodies/male-front.png";
import maleBack from "@musclemap/assets/bodies/male-back.png";
import femaleFront from "@musclemap/assets/bodies/female-front.png";
import femaleBack from "@musclemap/assets/bodies/female-back.png";
import { DEMO_BY_MODE, MUSCLE_LABELS_DE } from "./demo-data";

const BODY_PHOTOS: Record<MuscleMapSex, { front: string; back: string }> = {
  MALE: { front: maleFront, back: maleBack },
  FEMALE: { front: femaleFront, back: femaleBack },
};
import {
  IconAnalytics,
  IconCalendar,
  IconCardio,
  IconChevron,
  IconHome,
  IconInfo,
  IconMobility,
  IconOverall,
  IconPlan,
  IconProfile,
  IconStrength,
} from "./icons";

const MODES: { id: MuscleMapMode; label: string; Icon: typeof IconOverall }[] = [
  { id: "OVERALL", label: "Gesamt", Icon: IconOverall },
  { id: "STRENGTH", label: "Kraft", Icon: IconStrength },
  { id: "CARDIO", label: "Cardio", Icon: IconCardio },
  { id: "MOBILITY", label: "Mobilität", Icon: IconMobility },
];

const PERIODS = ["Woche", "Monat", "12W"] as const;

const VIEWS: { id: MuscleMapView; label: string }[] = [
  { id: "FRONT", label: "Vorne" },
  { id: "BACK", label: "Hinten" },
  { id: "BOTH", label: "Beide" },
];

const REGIONS: { id: MuscleMapRegion; label: string }[] = [
  { id: "FULL_BODY", label: "Ganzkörper" },
  { id: "UPPER_BODY", label: "Oberkörper" },
  { id: "LOWER_BODY", label: "Unterkörper" },
];

const SEXES: { id: MuscleMapSex; label: string }[] = [
  { id: "MALE", label: "Mann" },
  { id: "FEMALE", label: "Frau" },
];

const COLOR_MODELS: { id: MuscleColorModel; label: string }[] = [
  { id: "LOAD", label: "Belastung" },
  { id: "FREQUENCY", label: "Häufigkeit" },
  { id: "BALANCE", label: "Balance" },
  { id: "RECOVERY_RISK", label: "Erholungsrisiko" },
];

const TOOLTIP_OPTIONS: { id: TooltipField; label: string }[] = [
  { id: "group", label: "Bezeichnung (ENUM)" },
  { id: "score", label: "Score" },
  { id: "trend", label: "Trend" },
  { id: "volumeKg", label: "Volumen (kg)" },
  { id: "sets", label: "Sätze" },
];

const DEFAULT_MODEL: Record<MuscleMapMode, MuscleColorModel> = {
  OVERALL: "LOAD",
  STRENGTH: "BALANCE",
  CARDIO: "LOAD",
  MOBILITY: "FREQUENCY",
};

const LEGEND_LABELS: Record<MuscleColorModel, { min: string; max: string }> = {
  LOAD: { min: "wenig", max: "viel" },
  FREQUENCY: { min: "selten", max: "oft" },
  BALANCE: { min: "zu wenig", max: "zu viel" },
  RECOVERY_RISK: { min: "erholt", max: "Risiko" },
};

function formatVolume(kg: number): string {
  if (kg >= 1000) return `${(kg / 1000).toLocaleString("de-DE", { maximumFractionDigits: 1 })}k`;
  return kg.toLocaleString("de-DE");
}

function intensity(score: number): { label: string; color: string } {
  if (score >= 70) return { label: "Hoch", color: "#fb923c" };
  if (score >= 45) return { label: "Mittel", color: "#facc15" };
  return { label: "Niedrig", color: "#2dd4bf" };
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button
          key={o.id}
          className={o.id === value ? "seg-btn active" : "seg-btn"}
          onClick={() => onChange(o.id)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function App() {
  const [mode, setMode] = useState<MuscleMapMode>("OVERALL");
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Woche");
  const [view, setView] = useState<MuscleMapView>("BOTH");
  const [region, setRegion] = useState<MuscleMapRegion>("FULL_BODY");
  const [sex, setSex] = useState<MuscleMapSex>("MALE");
  const [modelOverride, setModelOverride] = useState<MuscleColorModel | null>(null);
  const [tooltipFields, setTooltipFields] = useState<TooltipField[]>(["group", "score"]);
  const [showBackground, setShowBackground] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0.45);
  const [bgGray, setBgGray] = useState(true);
  const [bgBright, setBgBright] = useState(1.2);

  const values = DEMO_BY_MODE[mode];
  const colorModel = modelOverride ?? DEFAULT_MODEL[mode];
  const legend = LEGEND_LABELS[colorModel];

  const ranked = useMemo(() => {
    const visible = new Set(
      view === "BOTH"
        ? [...getVisibleMuscleGroups("FRONT", region), ...getVisibleMuscleGroups("BACK", region)]
        : getVisibleMuscleGroups(view, region),
    );
    return Object.entries(values)
      .filter(([group]) => visible.has(group as never))
      .map(([group, value]) => ({ group: group as keyof typeof MUSCLE_LABELS_DE, ...value }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [values, view, region]);

  const toggleField = (field: TooltipField) =>
    setTooltipFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );

  return (
    <div className="page">
      <div className="phone">
        <div className="phone-inner">
          <header className="topbar">
            <div className="brand">
              <span className="brand-logo">MM</span>
              <span className="brand-name">MuscleMap</span>
            </div>
            <IconCalendar className="muted-icon" />
          </header>

          <h1 className="screen-title">Analytics</h1>

          <div className="period">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                className={p === period ? "period-btn active" : "period-btn"}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="chips">
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={id === mode ? "chip active" : "chip"}
                onClick={() => setMode(id)}
              >
                <Icon width={15} height={15} />
                {label}
              </button>
            ))}
          </div>

          <section className="card">
            <div className="card-head">
              <div className="card-title-wrap">
                <h2>Muskelmap</h2>
                <IconInfo className="muted-icon" />
              </div>
              <button type="button" className="link-btn">
                Details <IconChevron />
              </button>
            </div>
            <p className="sub">Dein Trainingsvolumen im Vergleich</p>

            <MuscleMap
              values={values}
              sex={sex}
              view={view}
              region={region}
              colorModel={colorModel}
              cropToRegion
              tooltipFields={tooltipFields}
              legendMinLabel={legend.min}
              legendMaxLabel={legend.max}
              figureWidth={view === "BOTH" ? 158 : 210}
              backgroundOpacity={bgOpacity}
              backgroundGrayscale={bgGray}
              backgroundBrightness={bgBright}
              {...(showBackground
                ? {
                    backgroundImageFront: BODY_PHOTOS[sex].front,
                    backgroundImageBack: BODY_PHOTOS[sex].back,
                  }
                : {})}
            />
          </section>

          <section className="card">
            <div className="card-head">
              <div className="card-title-wrap">
                <h2>Trainingsfokus {period === "Woche" ? "diese Woche" : ""}</h2>
                <IconInfo className="muted-icon" />
              </div>
              <button type="button" className="link-btn">
                Mehr <IconChevron />
              </button>
            </div>
            <ul className="focus">
              {ranked.map((row, i) => {
                const tag = intensity(row.score);
                return (
                  <li key={row.group}>
                    <span className="focus-rank">{i + 1}</span>
                    <span
                      className="focus-dot"
                      style={{ background: getMuscleHeatColor(row.score, colorModel) }}
                    />
                    <span className="focus-name">{MUSCLE_LABELS_DE[row.group]}</span>
                    <span className="focus-bar">
                      <span
                        className="focus-bar-fill"
                        style={{
                          width: `${row.score}%`,
                          background: getMuscleHeatColor(row.score, colorModel),
                        }}
                      />
                    </span>
                    <span className="focus-val">
                      {row.volumeKg ? formatVolume(row.volumeKg) : Math.round(row.score)}
                    </span>
                    <span className="focus-tag" style={{ color: tag.color }}>
                      {tag.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="card">
            <div className="card-head">
              <div className="card-title-wrap">
                <h2>Links / Rechts Balance</h2>
                <IconInfo className="muted-icon" />
              </div>
              <button type="button" className="link-btn">
                Details <IconChevron />
              </button>
            </div>
            <BalanceRow label="Oberkörper" left={49} />
            <BalanceRow label="Unterkörper" left={50} />
          </section>
        </div>

        <nav className="bottom-nav">
          <NavItem Icon={IconHome} label="Dashboard" />
          <NavItem Icon={IconPlan} label="Plan" />
          <NavItem Icon={IconStrength} label="Training" />
          <NavItem Icon={IconAnalytics} label="Analytics" active />
          <NavItem Icon={IconProfile} label="Profil" />
        </nav>
      </div>

      <aside className="controls">
        <h3>Playground</h3>
        <label>Geschlecht</label>
        <Segmented options={SEXES} value={sex} onChange={setSex} />
        <label>Ansicht</label>
        <Segmented options={VIEWS} value={view} onChange={setView} />
        <label>Fokus</label>
        <Segmented options={REGIONS} value={region} onChange={setRegion} />
        <label>Farbmodell</label>
        <Segmented options={COLOR_MODELS} value={colorModel} onChange={(m) => setModelOverride(m)} />
        <button className="reset" type="button" onClick={() => setModelOverride(null)}>
          Farbmodell zurücksetzen
        </button>

        <label>Hover-Inhalt</label>
        <div className="checks">
          {TOOLTIP_OPTIONS.map((o) => (
            <label key={o.id} className="check">
              <input
                type="checkbox"
                checked={tooltipFields.includes(o.id)}
                onChange={() => toggleField(o.id)}
              />
              {o.label}
            </label>
          ))}
        </div>

        <label>Hintergrundbild</label>
        <div className="checks">
          <label className="check">
            <input
              type="checkbox"
              checked={showBackground}
              onChange={() => setShowBackground((v) => !v)}
            />
            Referenzbild anzeigen
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={bgGray}
              onChange={() => setBgGray((v) => !v)}
              disabled={!showBackground}
            />
            Graustufen (Farben entfernen)
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={bgOpacity}
            onChange={(e) => setBgOpacity(Number(e.target.value))}
            disabled={!showBackground}
            style={{ width: "100%" }}
          />
          <span style={{ fontSize: 12, color: "#6b7686" }}>
            Deckkraft {Math.round(bgOpacity * 100)}%
          </span>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.1}
            value={bgBright}
            onChange={(e) => setBgBright(Number(e.target.value))}
            disabled={!showBackground}
            style={{ width: "100%", marginTop: 8 }}
          />
          <span style={{ fontSize: 12, color: "#6b7686" }}>
            Helligkeit {bgBright.toFixed(1)}×
          </span>
        </div>
      </aside>
    </div>
  );
}

function BalanceRow({ label, left }: { label: string; left: number }) {
  return (
    <div className="balance">
      <span className="balance-label">{label}</span>
      <span className="balance-pct">{left}%</span>
      <span className="balance-bar">
        <span className="balance-fill-l" style={{ width: `${left}%` }} />
        <span className="balance-marker" />
      </span>
      <span className="balance-pct right">{100 - left}%</span>
    </div>
  );
}

function NavItem({
  Icon,
  label,
  active,
}: {
  Icon: typeof IconHome;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={active ? "nav-item active" : "nav-item"}>
      <Icon width={20} height={20} />
      <span>{label}</span>
    </div>
  );
}
