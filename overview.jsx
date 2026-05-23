// overview.jsx — overview / dashboard tab

function Overview({ setTab, setSelectedDay }) {
  const today = "2026-07-20"; // pretend it's planning week
  const daysUntil = Math.max(0, Math.round(
    (new Date(window.TRIP.startDate) - new Date(today)) / 86400000
  ));

  const upcoming = window.RESERVATIONS.slice(0, 4);
  const openTodos = window.TODOS.filter(t => !t.done);

  // Cities visited rollup
  const cityList = [
    { key: "tokyo", days: 10 },
    { key: "fuji",  days: 1 },
    { key: "osaka", days: 6 },
    { key: "kyoto", days: 1 },
    { key: "nara",  days: 1 },
    { key: "kobe",  days: 1 },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-side">
          <div className="hero-eyebrow">
            Tokyo <span className="sep">/</span> Kawaguchiko <span className="sep">/</span> Osaka <span className="sep">/</span> Kyoto
          </div>
          <h1 className="hero-title">
            Japan,<br/>
            <em>seventeen<br/>days.</em>
          </h1>
          <div className="hero-sub">
            A summer trip with five friends — eleven days in Tokyo, a long highway drive across Honshū, then Kansai by way of Kyoto and Nara.
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-l">Depart</div>
              <div className="stat-v">Jul 29 <span className="u">2026</span></div>
            </div>
            <div className="stat">
              <div className="stat-l">Return</div>
              <div className="stat-v">Aug 14 <span className="u">2026</span></div>
            </div>
            <div className="stat">
              <div className="stat-l">Travelers</div>
              <div className="stat-v">5 <span className="u">friends</span></div>
            </div>
            <div className="stat">
              <div className="stat-l">Cities</div>
              <div className="stat-v">8 <span className="u">stops</span></div>
            </div>
          </div>
        </div>

        <div className="hero-side" style={{ position: "relative" }}>
          <HeroPhoto id="fuji-pagoda" ratio="4/5" kanji="日本" caption="cover · fuji + chureito" label="drop a hero photo here" />
          <div style={{
            position: "absolute", left: -22, top: 30,
            transform: "rotate(-6deg)",
            background: "var(--accent)", color: "#fff",
            fontFamily: "var(--font-jp)", fontSize: 18, fontWeight: 600,
            padding: "10px 14px", letterSpacing: ".08em",
            boxShadow: "0 6px 18px rgba(196,66,42,.35)",
          }}>
            出発まで {-1 + Math.max(1, Math.round((new Date(window.TRIP.startDate) - new Date("2026-05-24")) / 86400000))} 日
          </div>
        </div>
      </section>

      {/* WHO'S GOING */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader title="The five" jp="メンバー" right="6630 cohort" />
        <div className="row-5" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 18,
        }}>
          {window.TRAVELERS.map(t => (
            <div key={t.id} style={{
              padding: "20px 18px",
              border: ".5px solid var(--line)",
              borderRadius: 4,
              background: "rgba(0,0,0,.012)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Avatar traveler={t} size={40} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500 }}>
                    {t.nick}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em" }}>
                    {t.code}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.4 }}>
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE-UP: Route · Next up · Open todos */}
      <section className="row-3" style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr 1fr",
        gap: 36,
        marginBottom: 56,
      }}>
        {/* Route */}
        <div>
          <SectionHeader title="The route" jp="行程" />
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cityList.map((c, i) => {
              const city = window.CITIES[c.key];
              return (
                <li key={c.key} style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto",
                  alignItems: "baseline",
                  padding: "14px 0",
                  borderBottom: ".5px solid var(--line-2)",
                  gap: 14,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    color: "var(--accent)", letterSpacing: ".06em",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 500 }}>
                      {city.name}
                    </span>
                    <span style={{ fontFamily: "var(--font-jp)", color: "var(--ink-3)", marginLeft: 10, fontSize: 14 }}>
                      {city.kanji}
                    </span>
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
                    {c.days} {c.days === 1 ? "day" : "days"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Next up — reservations */}
        <div>
          <SectionHeader title="Next up" jp="次の予約" />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {upcoming.map((r, i) => (
              <li key={i} style={{
                padding: "12px 0",
                borderBottom: ".5px solid var(--line-2)",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  marginBottom: 4,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    color: "var(--ink-3)", letterSpacing: ".04em",
                  }}>
                    {shortDate(r.date)} · {r.time}
                  </span>
                  <Pill tone={r.status === "confirmed" ? "green" : "gold"}>
                    {r.status}
                  </Pill>
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 500 }}>
                  {r.what}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>
                  {r.ref}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Open todos */}
        <div>
          <SectionHeader title="To do" jp="やること" right={`${openTodos.length} open`} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {openTodos.slice(0, 6).map(t => (
              <li key={t.id} style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr auto",
                gap: 10, alignItems: "baseline",
                padding: "10px 0",
                borderBottom: ".5px solid var(--line-2)",
              }}>
                <span style={{
                  width: 12, height: 12, border: "1.2px solid var(--ink-3)",
                  display: "inline-block", borderRadius: 2, marginTop: 4,
                }} />
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{t.text}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em" }}>
                  {t.who}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured day — the big drive */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader
          title="The big drive"
          jp="大移動 · day 11"
          right={<button className="link-btn" onClick={() => { setTab("itinerary"); setSelectedDay(11); }}>
            see full day →
          </button>}
        />
        <div className="row-2" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 32,
          alignItems: "stretch",
        }}>
          <HeroPhoto id="expressway" ratio="4/3" kanji="高速" caption="aug 8 · tomei expressway" />
          <div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              color: "var(--accent)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 10,
            }}>
              Aug 8 · Sat · 11 hours · 515 km
            </div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 500,
              lineHeight: 1.1, letterSpacing: "-.01em", marginBottom: 14,
            }}>
              Tokyo → Osaka,<br/>
              <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>by road.</em>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 14.5, maxWidth: "44ch", marginBottom: 22 }}>
              Out of Kanda at 10:30, the Tomei to Ebina SA for melon-pan and coffee, a stroll across
              Mishima Skywalk, dinner at EXPASA Hamanako with the lake at sunset, then a long final
              push into Namba. Phum drives the first leg.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <Pill tone="ink">8-seater · Times</Pill>
              <Pill tone="gold">ETC card ¥12,400</Pill>
              <Pill tone="green">Two SA stops</Pill>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Overview = Overview;
