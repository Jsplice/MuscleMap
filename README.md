# MuscleMap

Zielbild

Die MuscleMap zeigt dem Mitglied und dem Trainer, welche Muskelgruppen in einem Zeitraum wie stark belastet wurden. Sie sitzt unter Analytics und beantwortet auf einen Blick:

„Was habe ich trainiert?“
„Was ist unterrepräsentiert?“
„Ist mein Training ausgewogen?“
„Welche Muskelgruppen wurden durch Krafttraining, Cardio oder Gesamtbelastung beansprucht?“
„Gibt es Links/Rechts-, Front/Back- oder Upper/Lower-Imbalancen?“

Der Endausbau sollte ungefähr so wirken wie in den Mockups: dunkler Premium-Look, anatomisch plausibel, farblich klar, interaktiv, nicht verspielt.

1. Fachliches Zielmodell
Ansichten

Die MuscleMap braucht mehrere Dimensionen:

Dimension	Werte
Körperansicht	FRONT, BACK, BOTH
Körperregion	FULL_BODY, UPPER_BODY, LOWER_BODY, CORE
Geschlecht / Darstellung	MALE, FEMALE, optional später NEUTRAL
Belastungstyp	OVERALL, STRENGTH, CARDIO, MOBILITY, später RECOVERY
Zeitraum	WEEK, MONTH, 12W, CUSTOM
Seitigkeit	BOTH, LEFT, RIGHT, später BALANCE
Score-Modell	LOAD_SCORE, FREQUENCY_SCORE, VOLUME_SCORE, BALANCE_SCORE, RECOVERY_RISK

Damit kannst du denselben SVG-Körper in verschiedenen Business-Kontexten nutzen.

2. Muskelgruppen: größer und sauberer als aktuell

Dein aktuelles Modell hat schon eine gute MVP-Basis:

CHEST
BACK_UPPER
BACK_LOWER
SHOULDERS_FRONT
SHOULDERS_SIDE
SHOULDERS_REAR
BICEPS
TRICEPS
FOREARMS
CORE
GLUTES
QUADS
HAMSTRINGS
CALVES
HIP_FLEXORS

Für eine professionelle MuscleMap würde ich es erweitern. Sonst bekommst du bei Studio-Geräten und Bein-/Hüfttraining sofort blinde Flecken.

Empfohlene Muskelgruppen für Endausbau
Gruppe	Warum wichtig
CHEST	Brustübungen, Push-Volumen
BACK_UPPER	Lat, Trapez, Rhomboiden, Rudern/Latzug
BACK_LOWER	Rückenstrecker, Hinge, Kreuzheben
SHOULDERS_FRONT	Push, Schulterdrücken, Frontheben
SHOULDERS_SIDE	Seitheben, Schulterbreite
SHOULDERS_REAR	Rear Delt, Face Pull, Rückenbalance
BICEPS	Zugübungen, Curls
TRICEPS	Pushübungen, Dips, Extensions
FOREARMS	Griffkraft, Hangs, Curls
CORE_ABS	Bauch/Rectus abdominis
CORE_OBLIQUES	Rotation/Seitstütz
CORE_DEEP	Plank, Stabilisation
GLUTES	Hip Thrust, Squat, Lunges
QUADS	Kniebeuge, Beinpresse, Beinstrecker
HAMSTRINGS	Beinbeuger, RDL, Hinge
CALVES	Wadenheben, Laufen, Stepper
HIP_FLEXORS	Beinheben, Mountain Climbers, Laufbewegungen
ADDUCTORS	Adduktorenmaschine, Squats, Lunges
ABDUCTORS	Abduktorenmaschine, Glute Medius, Stabilität
NECK_TRAPS	Shrugs, oberer Trapez, Haltung
MVP vs. Endausbau

Für den MVP reichen 15–17 Gruppen. Für den professionellen Endausbau würde ich mindestens 20 Gruppen modellieren.

Mein Vorschlag:

MVP+
enum MuscleGroup {
  CHEST
  BACK_UPPER
  BACK_LOWER
  SHOULDERS_FRONT
  SHOULDERS_SIDE
  SHOULDERS_REAR
  BICEPS
  TRICEPS
  FOREARMS
  CORE
  GLUTES
  QUADS
  HAMSTRINGS
  CALVES
  HIP_FLEXORS
  ADDUCTORS
  ABDUCTORS
}
Endausbau
enum MuscleGroup {
  CHEST
  BACK_UPPER
  BACK_LOWER
  SHOULDERS_FRONT
  SHOULDERS_SIDE
  SHOULDERS_REAR
  BICEPS
  TRICEPS
  FOREARMS
  CORE_ABS
  CORE_OBLIQUES
  CORE_DEEP
  GLUTES_MAX
  GLUTES_MED
  QUADS
  HAMSTRINGS
  CALVES_GASTROCNEMIUS
  CALVES_SOLEUS
  HIP_FLEXORS
  ADDUCTORS
  ABDUCTORS
  NECK_TRAPS
}

Für eure App würde ich aber nicht zu früh zu anatomisch werden. Nutzer denken nicht in Soleus, sondern in „Waden“. Also: intern optional detaillierter, UI gruppiert.

3. SVG-Anforderungen

Die MuscleMap darf nicht als PNG oder Canvas starten. Sie muss als segmentiertes SVG gebaut werden.

Warum SVG?
skalierbar ohne Qualitätsverlust
einzelne Muskelgruppen klickbar
Farben dynamisch per Score
Hover/Tap/Tooltip möglich
Front/Back/Male/Female getrennt steuerbar
gut für Next.js/React
kann später animiert werden
kein schweres 3D/WebGL nötig
Benötigte SVG-Assets

Mindestens:

muscle-map-male-front.svg
muscle-map-male-back.svg
muscle-map-female-front.svg
muscle-map-female-back.svg

Optional später:

muscle-map-neutral-front.svg
muscle-map-neutral-back.svg
Segmentierung

Jede sichtbare Fläche bekommt eine stabile ID.

Beispiel:

CHEST_LEFT
CHEST_RIGHT
BACK_UPPER_LEFT
BACK_UPPER_RIGHT
BACK_LOWER_LEFT
BACK_LOWER_RIGHT
SHOULDERS_FRONT_LEFT
SHOULDERS_FRONT_RIGHT
SHOULDERS_SIDE_LEFT
SHOULDERS_SIDE_RIGHT
SHOULDERS_REAR_LEFT
SHOULDERS_REAR_RIGHT
BICEPS_LEFT
BICEPS_RIGHT
TRICEPS_LEFT
TRICEPS_RIGHT
FOREARMS_LEFT
FOREARMS_RIGHT
CORE_ABS
CORE_OBLIQUES_LEFT
CORE_OBLIQUES_RIGHT
GLUTES_LEFT
GLUTES_RIGHT
QUADS_LEFT
QUADS_RIGHT
HAMSTRINGS_LEFT
HAMSTRINGS_RIGHT
CALVES_LEFT
CALVES_RIGHT
HIP_FLEXORS_LEFT
HIP_FLEXORS_RIGHT
ADDUCTORS_LEFT
ADDUCTORS_RIGHT
ABDUCTORS_LEFT
ABDUCTORS_RIGHT
NECK_TRAPS

Wichtig: Die IDs dürfen nicht nach Design-Laune benannt sein. Sie müssen direkt auf euer Datenmodell mappen.

4. Visueller Qualitätsstandard

Deine aktuelle Library hat drei Probleme:

zu flach
zu grob segmentiert
zu wenig Premium-Kontrast

Die neue MuscleMap sollte eine Art „technische Anatomie-Illustration“ sein, aber nicht medizinisch überladen.

Design-Richtung
Element	Empfehlung
Hintergrundkörper	dunkles Slate/Grau, leicht transparent
Muskelumrisse	dezente helle Linien, nicht weiß-knallig
aktive Muskelgruppen	Heatmap-Farben mit leichtem Glow
inaktive Muskelgruppen	dunkelgrau, aber sichtbar
Trennlinien	feine Stroke-Lines
Schatten	subtiler innerer Schatten/Glow
Animation	leichter Fade/Scale beim Wechsel, kein Spielkram
Label	nur bei Tap/Hover oder Detailansicht
Legende	kompakt, 0–100 oder Kategorien
Premium-Look

Der Körper sollte nicht wie eine medizinische Schulbuchgrafik aussehen, sondern wie ein Fitness-Analytics-Asset:

kräftige Silhouette
klare Muskelbereiche
gute Lesbarkeit auf Mobile
weniger anatomische Kleinteiligkeit
keine übertriebenen Adern/Fasern
klare Links/Rechts-Struktur
Front und Back visuell konsistent
5. Farbmodelle

Ja: Wir sollten mehrere Farbmodelle unterstützen. Nicht jede Analytics-Frage braucht dieselbe Farbskala.
