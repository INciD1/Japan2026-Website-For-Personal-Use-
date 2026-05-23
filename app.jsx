// app.jsx — top-level app with tabs + tweaks panel

const TABS = [
  { key: "overview",     label: "Overview",     jp: "概要" },
  { key: "itinerary",    label: "Itinerary",    jp: "旅程" },
  { key: "map",          label: "Map",          jp: "地図" },
  { key: "budget",       label: "Budget",       jp: "予算" },
  { key: "reservations", label: "Reservations", jp: "予約" },
  { key: "notes",        label: "Notes",        jp: "メモ" },
];

const TYPE_OPTIONS = [
  { value: "mincho-manrope", label: "Mincho × Manrope" },
  { value: "inter-mincho",   label: "Mincho × Inter"   },
  { value: "serif-serif",    label: "All serif"        },
  { value: "sans-only",      label: "All sans"         },
];

const PALETTES = [
  ["#f6efe3", "#181513", "#c4422a"],   // paper + sumi + vermilion (default)
  ["#f1ece2", "#1a1a1a", "#0a5c4a"],   // matcha
  ["#efe9e3", "#1a1815", "#1e3a8a"],   // indigo
  ["#1a1612", "#f6efe3", "#e26045"],   // dark paper (used w/ dark mode)
];

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS__);
  const [selectedCity, setSelectedCity] = React.useState("tokyo");

  const tabKey = TABS[t.tabIndex || 0]?.key || "overview";

  // Apply palette + dark to CSS variables on the root
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.density = t.density;
    root.dataset.dark = t.dark ? "true" : "false";
    root.dataset.type = t.typePair;

    // Override accent if palette is customized
    if (t.palette && t.palette.length >= 3) {
      if (t.dark) {
        // dark mode: invert paper/ink, keep accent
        root.style.setProperty("--accent", t.palette[2]);
      } else {
        root.style.setProperty("--paper", t.palette[0]);
        root.style.setProperty("--ink", t.palette[1]);
        root.style.setProperty("--accent", t.palette[2]);
      }
    }
  }, [t.palette, t.density, t.dark, t.typePair]);

  function setTab(key) {
    const idx = TABS.findIndex(x => x.key === key);
    if (idx >= 0) setTweak("tabIndex", idx);
  }

  function setSelectedDay(n) {
    setTweak("selectedDay", n);
  }

  return (
    <div className="shell">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <span className="stamp">朱</span>JAPAN ’26
          </span>
        </div>
        <div className="topbar-right">
          <IdentityBadge />
          <AvatarRow travelers={window.TRAVELERS} />
          <span className="topbar-meta">JUL 29 — AUG 14 · 17 D</span>
        </div>
      </header>

      {/* TABS */}
      <nav className="tabs" role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            className="tab"
            data-on={tabKey === tab.key}
            onClick={() => setTweak("tabIndex", i)}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <main style={{ paddingBottom: 80 }}>
        {tabKey === "overview" && <Overview setTab={setTab} setSelectedDay={setSelectedDay} />}
        {tabKey === "itinerary" && (
          <Itinerary
            view={t.view}
            selectedDay={t.selectedDay}
            setSelectedDay={setSelectedDay}
          />
        )}
        {tabKey === "map" && (
          <MapTab
            mapStyle={t.mapStyle}
            setMapStyle={v => setTweak("mapStyle", v)}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        )}
        {tabKey === "budget" && <BudgetTab />}
        {tabKey === "reservations" && <ReservationsTab />}
        {tabKey === "notes" && <NotesTab />}
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: ".5px solid var(--line)",
        padding: "30px 0 50px",
        marginTop: 60,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--ink-3)",
        letterSpacing: ".08em",
        textTransform: "uppercase",
      }}>
        <span>JAPAN ’26 · KKU 6630 cohort</span>
        <span>Crafted with restraint · #KKU旅</span>
        <span>v0.1 — pre-trip planning</span>
      </footer>

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor
          label="Palette"
          value={t.palette}
          options={PALETTES}
          onChange={v => setTweak("palette", v)}
        />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={v => setTweak("dark", v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Pairing"
          value={t.typePair}
          options={TYPE_OPTIONS}
          onChange={v => setTweak("typePair", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={v => setTweak("density", v)}
        />
        <TweakRadio
          label="Itinerary"
          value={t.view}
          options={["day", "list"]}
          onChange={v => setTweak("view", v)}
        />

        <TweakSection label="Map" />
        <TweakRadio
          label="Style"
          value={t.mapStyle}
          options={["illustrated", "minimal"]}
          onChange={v => setTweak("mapStyle", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <IdentityProvider>
    <SignInGate>
      <App />
    </SignInGate>
  </IdentityProvider>
);
