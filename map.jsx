// map.jsx — interactive SVG map of Japan with city pins
// Two styles: "illustrated" (sumi-ink hand-drawn feel) and "minimal" (hairline outline)

// Simplified path of Honshū / Shikoku / Kyushu / Hokkaido (stylized, not survey-accurate).
// Designed to read at ~880w viewport.
const JAPAN_PATHS = {
  hokkaido: "M780,180 C820,170 870,180 900,210 C920,240 910,290 880,310 C840,330 800,320 770,300 C740,280 730,240 750,210 C760,195 765,185 780,180 Z",
  honshu:   "M760,360 C770,345 800,338 830,345 L860,360 L870,395 L855,420 L820,445 L770,465 L710,485 L650,500 L590,515 L530,530 L470,545 L420,555 L380,560 L355,555 L335,545 L320,530 L308,510 L300,490 L295,470 L300,452 L320,440 L355,432 L395,430 L440,432 L490,440 L545,452 L600,465 L650,475 L690,478 L720,470 L740,455 L750,430 L755,400 L760,380 Z",
  shikoku:  "M385,595 C415,585 460,585 485,600 C505,615 500,635 470,645 C440,655 400,650 380,635 C370,620 372,605 385,595 Z",
  kyushu:   "M255,575 C280,565 310,565 330,580 C345,595 345,625 330,650 C310,680 275,690 250,675 C230,660 225,635 230,610 C235,595 245,580 255,575 Z",
};

function MapPin({ city, style, onClick, selected }) {
  // Pin style varies by mapStyle.
  if (style === "minimal") {
    return (
      <g transform={`translate(${city.x}, ${city.y})`} style={{ cursor: "default" }} onClick={onClick}>
        <circle r={selected ? 7 : 4} fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" />
        <text
          x={10} y={4}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="var(--ink-2)"
          letterSpacing=".06em"
          style={{ textTransform: "uppercase" }}
        >
          {city.name}
        </text>
      </g>
    );
  }
  // Illustrated: tear-drop pin with kanji bubble
  return (
    <g transform={`translate(${city.x}, ${city.y})`} style={{ cursor: "default" }} onClick={onClick}>
      {/* Drop shadow */}
      <ellipse cx="0" cy="3" rx={selected ? 8 : 5} ry="1.5" fill="rgba(0,0,0,.15)" />
      {/* Pin shape */}
      <path
        d="M0,-22 C8,-22 12,-14 12,-8 C12,-2 7,3 0,2 C-7,3 -12,-2 -12,-8 C-12,-14 -8,-22 0,-22 Z"
        fill={selected ? "var(--accent-2)" : "var(--accent)"}
        stroke="var(--paper)"
        strokeWidth="1.5"
      />
      <circle cx="0" cy="-10" r="3" fill="var(--paper)" />
      {/* Kanji bubble */}
      <g transform="translate(14, -8)">
        <text
          fontFamily="var(--font-jp)"
          fontSize="13"
          fontWeight="600"
          fill="var(--ink)"
        >
          {city.kanji}
        </text>
        <text
          y="13"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="var(--ink-3)"
          letterSpacing=".06em"
          style={{ textTransform: "uppercase" }}
        >
          {city.name}
        </text>
      </g>
    </g>
  );
}

function RouteLine({ style }) {
  // Order of travel
  const route = [
    "tokyo", "kamakura", "fuji", "tokyo", "mishima", "hamana", "osaka",
    "kyoto", "nara", "kobe", "himeji", "osaka",
  ];
  const points = route.map(k => window.CITIES[k]).filter(Boolean);
  const path = points.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");

  if (style === "minimal") {
    return (
      <path d={path}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.8"
        strokeDasharray="3 4"
        opacity=".6"
      />
    );
  }

  return (
    <path d={path}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.6"
      strokeDasharray="2 6"
      strokeLinecap="round"
      opacity=".75"
    />
  );
}

function MapTab({ mapStyle, setMapStyle, selectedCity, setSelectedCity }) {
  const cityKey = selectedCity || "tokyo";
  const city = window.CITIES[cityKey];

  // Days for the selected city
  const cityDays = window.DAYS.filter(d => d.city === cityKey || d.endCity === cityKey);

  return (
    <div>
      <SectionHeader
        title="Map"
        jp="地図"
        right={`${Object.keys(window.CITIES).length} pins · 1 long road`}
      />

      <div className="map-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 36,
        alignItems: "start",
      }}>
        {/* MAP */}
        <div style={{
          background: mapStyle === "minimal" ? "var(--paper)" : "var(--paper-2)",
          border: ".5px solid var(--line)",
          padding: "24px 20px",
          position: "relative",
        }}>
          {/* Style switcher */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            display: "flex", gap: 0,
            border: ".5px solid var(--line)",
            background: "var(--paper)",
            zIndex: 2,
          }}>
            {["illustrated", "minimal"].map(s => (
              <button key={s}
                onClick={() => setMapStyle(s)}
                style={{
                  appearance: "none", border: 0,
                  padding: "6px 12px",
                  background: mapStyle === s ? "var(--ink)" : "transparent",
                  color: mapStyle === s ? "var(--paper)" : "var(--ink-3)",
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  letterSpacing: ".08em", textTransform: "uppercase",
                  cursor: "default",
                }}>
                {s}
              </button>
            ))}
          </div>

          {/* Compass + scale */}
          <div style={{
            position: "absolute", left: 24, top: 24,
            display: "flex", flexDirection: "column", gap: 6,
            fontFamily: "var(--font-mono)", fontSize: 9,
            color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase",
            zIndex: 2,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>N</span>
              <svg width="14" height="20" viewBox="0 0 14 20">
                <path d="M7,2 L11,17 L7,14 L3,17 Z" fill="var(--accent)" />
              </svg>
            </div>
            <div>1 : 8M</div>
          </div>

          {/* SVG MAP */}
          <svg
            viewBox="200 150 720 560"
            width="100%"
            style={{ display: "block", maxHeight: 640 }}
          >
            {/* Sea texture */}
            {mapStyle === "illustrated" && (
              <g opacity=".4">
                {Array.from({ length: 14 }).map((_, i) => (
                  <line
                    key={i}
                    x1={210} y1={170 + i * 38}
                    x2={910} y2={170 + i * 38}
                    stroke="var(--ink-3)" strokeWidth="0.35"
                    strokeDasharray="1 6"
                  />
                ))}
              </g>
            )}

            {/* Landmasses */}
            <g>
              {Object.entries(JAPAN_PATHS).map(([k, d]) => (
                <path
                  key={k}
                  d={d}
                  fill={mapStyle === "minimal" ? "var(--paper-2)" : "rgba(176,133,64,.18)"}
                  stroke="var(--ink)"
                  strokeWidth={mapStyle === "minimal" ? 0.6 : 1}
                  strokeLinejoin="round"
                />
              ))}
            </g>

            {/* Honshū inner texture (subtle landscape) */}
            {mapStyle === "illustrated" && (
              <g opacity=".25" stroke="var(--ink-2)" strokeWidth="0.4" fill="none">
                <path d="M380,470 Q500,440 620,450 T800,440" />
                <path d="M360,490 Q480,460 600,470 T780,460" />
                <path d="M340,510 Q470,480 590,490 T760,480" />
              </g>
            )}

            {/* Route */}
            <RouteLine style={mapStyle} />

            {/* Tokyo→Osaka highway emphasized */}
            <g>
              <path
                d={`M${window.CITIES.tokyo.x},${window.CITIES.tokyo.y}
                    L${window.CITIES.mishima.x},${window.CITIES.mishima.y}
                    L${window.CITIES.hamana.x},${window.CITIES.hamana.y}
                    L${window.CITIES.osaka.x},${window.CITIES.osaka.y}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity=".85"
              />
            </g>

            {/* Pins */}
            {Object.entries(window.CITIES).map(([k, c]) => (
              <MapPin
                key={k}
                city={c}
                style={mapStyle}
                selected={k === cityKey}
                onClick={() => setSelectedCity(k)}
              />
            ))}

            {/* Kanji watermark */}
            {mapStyle === "illustrated" && (
              <text
                x="880" y="690"
                textAnchor="end"
                fontFamily="var(--font-jp)"
                fontSize="56"
                fontWeight="700"
                fill="var(--ink)"
                opacity=".06"
                letterSpacing=".05em"
              >
                日本列島
              </text>
            )}
          </svg>

          {/* Legend */}
          <div style={{
            display: "flex", gap: 22, marginTop: 8,
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".08em",
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 24, height: 2, background: "var(--accent)" }} />
              ROAD TRIP · AUG 8
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 24, height: 1, background: "var(--accent)", borderTop: "1px dashed" }} />
              FULL ROUTE
            </span>
          </div>
        </div>

        {/* CITY DETAIL */}
        <div style={{
          padding: "24px 24px",
          border: ".5px solid var(--line)",
          background: "rgba(0,0,0,.012)",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--accent)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Selected pin
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 42, fontWeight: 500, letterSpacing: "-.01em",
            }}>
              {city.name}
            </h3>
            <span style={{ fontFamily: "var(--font-jp)", fontSize: 28, color: "var(--accent)" }}>
              {city.kanji}
            </span>
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 11.5,
            color: "var(--ink-3)", letterSpacing: ".04em",
            marginTop: 4, marginBottom: 22,
          }}>
            {city.days}
          </div>

          {window.WEATHER[cityKey] && (
            <div style={{
              padding: "14px 16px", border: ".5px solid var(--line)",
              background: "var(--paper)", marginBottom: 18,
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
                letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6,
              }}>
                Forecast (avg)
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 22 }}>
                  {window.WEATHER[cityKey].icon}
                  <span style={{ fontFamily: "var(--font-display)", marginLeft: 10, fontWeight: 500 }}>
                    {window.WEATHER[cityKey].hi}° / {window.WEATHER[cityKey].lo}°
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", maxWidth: "16ch", textAlign: "right" }}>
                  {window.WEATHER[cityKey].note}
                </div>
              </div>
            </div>
          )}

          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase",
            marginBottom: 10,
          }}>
            Days here · {cityDays.length}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cityDays.map(d => (
              <li key={d.n} style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 12,
                padding: "10px 0",
                borderTop: ".5px solid var(--line-2)",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  color: "var(--accent)", letterSpacing: ".06em",
                }}>
                  D{String(d.n).padStart(2, "0")}
                </span>
                <span>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{shortDate(d.date)} · {d.dow}</div>
                </span>
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: 22, paddingTop: 18, borderTop: ".5px solid var(--line)",
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase",
          }}>
            ↓ click any pin to change the selection
          </div>
        </div>
      </div>
    </div>
  );
}

window.MapTab = MapTab;
