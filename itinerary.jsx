// itinerary.jsx — day-by-day timeline with day picker

function CityChip({ cityKey }) {
  const city = window.CITIES[cityKey];
  if (!city) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontFamily: "var(--font-jp)", color: "var(--accent)" }}>{city.kanji}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em", textTransform: "uppercase" }}>
        {city.name}
      </span>
    </span>
  );
}

function DayPicker({ days, selected, onSelect }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
      borderTop: ".5px solid var(--line)",
      borderBottom: ".5px solid var(--line)",
      marginBottom: 32,
    }}>
      {days.map(d => {
        const on = d.n === selected;
        const city = window.CITIES[d.city];
        return (
          <button
            key={d.n}
            onClick={() => onSelect(d.n)}
            data-on={on}
            style={{
              appearance: "none", background: "none",
              border: 0, borderRight: ".5px solid var(--line-2)",
              padding: "12px 6px 14px",
              cursor: "default",
              color: on ? "var(--ink)" : "var(--ink-3)",
              position: "relative",
              textAlign: "center",
              transition: "background 120ms ease",
              background: on ? "rgba(196,66,42,.06)" : "transparent",
            }}
            onMouseEnter={e => { if (!on) e.currentTarget.style.background = "rgba(0,0,0,.03)"; }}
            onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9.5,
              letterSpacing: ".08em", textTransform: "uppercase",
              color: on ? "var(--accent)" : "var(--ink-3)",
              marginBottom: 4,
            }}>
              D{String(d.n).padStart(2, "0")}
            </div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500,
              lineHeight: 1, color: on ? "var(--ink)" : "var(--ink-2)",
            }}>
              {shortDate(d.date).split(" ")[1]}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-3)",
              marginTop: 4, letterSpacing: ".04em",
            }}>
              {d.dow.toLowerCase()}
            </div>
            {on && (
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: -1,
                height: 2, background: "var(--accent)",
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function TimelineBlock({ b, idx, last }) {
  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "92px 36px 1fr",
      gap: 0,
      position: "relative",
      paddingBottom: last ? 0 : "var(--block-py, 14px)",
    }}>
      {/* Time */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--ink-2)",
        letterSpacing: ".02em",
        paddingTop: 2,
        textAlign: "right",
        paddingRight: 18,
      }}>
        {b.t}
      </div>
      {/* Rail */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute",
          left: 13, top: 0, bottom: last ? "auto" : -2,
          height: last ? 12 : "calc(100% + 4px)",
          width: 1,
          background: "var(--line)",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          width: 28, height: 28,
          borderRadius: "50%",
          background: "var(--paper)",
          border: ".5px solid var(--line)",
          display: "grid", placeItems: "center",
          fontSize: 13,
        }}>
          {b.tag}
        </div>
      </div>
      {/* Content */}
      <div style={{ paddingLeft: 8, paddingTop: 1 }}>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 14.5, fontWeight: 500,
          color: "var(--ink)",
        }}>
          {b.label}
        </div>
        {b.note && (
          <div style={{
            fontSize: 12.5, color: "var(--ink-3)",
            marginTop: 2, lineHeight: 1.45,
          }}>
            {b.note}
          </div>
        )}
      </div>
    </li>
  );
}

function DayView({ day }) {
  const city = window.CITIES[day.city];
  const endCity = day.endCity ? window.CITIES[day.endCity] : null;
  const weather = window.WEATHER[day.city];

  return (
    <article>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 48,
        alignItems: "start",
      }}>
        {/* Left: heading + timeline */}
        <div>
          <div style={{
            display: "flex", gap: 14, alignItems: "baseline",
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            <span style={{ color: "var(--accent)" }}>Day {String(day.n).padStart(2, "0")} / 17</span>
            <span>·</span>
            <span>{day.dow}, {shortDate(day.date)}</span>
            <span>·</span>
            <CityChip cityKey={day.city} />
            {endCity && (<>
              <span style={{ color: "var(--accent)" }}>→</span>
              <CityChip cityKey={day.endCity} />
            </>)}
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 44, fontWeight: 500,
            lineHeight: 1.05, letterSpacing: "-.01em",
            margin: "0 0 14px",
          }}>
            {day.title}
          </h2>

          <p style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 17, color: "var(--ink-2)",
            maxWidth: "44ch", margin: "0 0 26px",
          }}>
            {day.summary}
          </p>

          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30,
          }}>
            <Pill tone="ink">Base: {day.base}</Pill>
            {weather && (
              <Pill tone="gold">
                {weather.icon} {weather.hi}° / {weather.lo}° · {weather.note}
              </Pill>
            )}
            <Pill tone="green">฿{day.budget.toLocaleString()} / pax</Pill>
          </div>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {day.blocks.map((b, i) => (
              <TimelineBlock key={i} b={b} idx={i} last={i === day.blocks.length - 1} />
            ))}
          </ol>
        </div>

        {/* Right: photo + sidebar */}
        <aside style={{ position: "sticky", top: 20 }}>
          <HeroPhoto
            id={day.hero}
            ratio="4/5"
            kanji={city.kanji}
            caption={`day ${String(day.n).padStart(2, "0")} · ${city.name.toLowerCase()}`}
          />
          {/* Notes block */}
          <div style={{
            marginTop: 22,
            padding: "18px 20px",
            border: ".5px solid var(--line)",
            background: "rgba(176,133,64,.06)",
            borderLeft: "2px solid var(--gold)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--gold)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Group note
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
              {day.n === 11
                ? "Phum drives Tokyo → Mishima. Top takes the wheel after Hamanako. Everyone naps in shifts. ETC card is in the glovebox."
                : day.n === 1
                ? "Bags through customs in ~25 min on arrival cards. Don't lose the entry stub — needed for tax-free shopping."
                : day.n === 9
                ? "Hydrate. Charge phones in queue. Single-rider line is your friend for the big mountain coasters."
                : day.n === 17
                ? "Last konbini run, then return the car with a full tank. Don't forget the ETC card from the glovebox."
                : "Group chat for coordination — drop pins, share photos, call the slow walker."}
            </div>
          </div>

          {/* Mini-list of reservations on this day */}
          {window.RESERVATIONS.filter(r => r.date === day.date).length > 0 && (
            <div style={{
              marginTop: 18,
              padding: "16px 20px",
              border: ".5px solid var(--line)",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Bookings · {day.date}
              </div>
              {window.RESERVATIONS.filter(r => r.date === day.date).map((r, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 12.5, padding: "6px 0",
                  borderTop: i === 0 ? 0 : ".5px solid var(--line-2)",
                }}>
                  <span style={{ color: "var(--ink-2)" }}>{r.what}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{r.time}</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Footer prev/next */}
      <div style={{
        marginTop: 60, paddingTop: 22,
        borderTop: ".5px solid var(--line)",
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--ink-3)", letterSpacing: ".06em", textTransform: "uppercase",
      }}>
        <span>↑ scroll to switch day</span>
        <span>{String(day.n).padStart(2, "0")} / 17</span>
      </div>
    </article>
  );
}

function ListView({ days }) {
  return (
    <div>
      {days.map(d => {
        const city = window.CITIES[d.city];
        return (
          <article key={d.n} style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 200px",
            gap: 28,
            padding: "26px 0",
            borderTop: ".5px solid var(--line-2)",
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--accent)", letterSpacing: ".12em",
                marginBottom: 6,
              }}>
                DAY {String(d.n).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, lineHeight: 1 }}>
                {shortDate(d.date)}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", marginTop: 4, letterSpacing: ".04em" }}>
                {d.dow} · {dayOfWeekJP(d.dow)}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                <CityChip cityKey={d.city} />
                {d.endCity && <><span style={{ color: "var(--accent)" }}>→</span><CityChip cityKey={d.endCity} /></>}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 6 }}>
                {d.title}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-3)", maxWidth: "60ch" }}>
                {d.summary}
              </div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {d.blocks.slice(0, 5).map((b, i) => (
                  <span key={i} style={{
                    fontFamily: "var(--font-mono)", fontSize: 10.5,
                    color: "var(--ink-3)", padding: "3px 8px",
                    border: ".5px solid var(--line)",
                    borderRadius: 999,
                  }}>
                    {b.tag} {b.label.split("·")[0].slice(0, 24)}
                  </span>
                ))}
                {d.blocks.length > 5 && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10.5,
                    color: "var(--ink-3)", padding: "3px 8px",
                  }}>
                    +{d.blocks.length - 5} more
                  </span>
                )}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--ink-3)", letterSpacing: ".1em",
                marginBottom: 4, textTransform: "uppercase",
              }}>
                Per person
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>
                ฿{d.budget.toLocaleString()}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Itinerary({ view, selectedDay, setSelectedDay }) {
  const day = window.DAYS.find(d => d.n === selectedDay) || window.DAYS[0];

  return (
    <div>
      <SectionHeader
        title="Itinerary"
        jp="旅程"
        right={`${window.TRIP.totalDays} days · ${window.DAYS.length} entries`}
      />

      {view === "day" ? (
        <>
          <DayPicker days={window.DAYS} selected={selectedDay} onSelect={setSelectedDay} />
          <DayView day={day} />
        </>
      ) : (
        <ListView days={window.DAYS} />
      )}
    </div>
  );
}

window.Itinerary = Itinerary;
