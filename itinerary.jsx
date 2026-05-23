// itinerary.jsx — editable day-by-day timeline (per user)

function CityChip({ cityKey }) {
  const city = window.CITIES[cityKey];
  if (!city) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: "var(--font-jp)", color: "var(--accent)" }}>{city.kanji}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em", textTransform: "uppercase" }}>
        {city.name}
      </span>
    </span>
  );
}

const CITY_OPTIONS = Object.entries(window.CITIES).map(([k, v]) => ({
  value: k, label: `${v.kanji}  ${v.name}`,
}));

function DayPicker({ days, selected, onSelect }) {
  return (
    <div className="daypicker" style={{
      display: "grid",
      gridTemplateColumns: `repeat(${days.length}, minmax(56px, 1fr))`,
      borderTop: ".5px solid var(--line)",
      borderBottom: ".5px solid var(--line)",
      marginBottom: 32,
      overflowX: "auto",
      scrollSnapType: "x proximity",
    }}>
      {days.map(d => {
        const on = d.n === selected;
        return (
          <button key={d.n}
            onClick={() => onSelect(d.n)}
            data-on={on}
            style={{
              appearance: "none", background: on ? "rgba(196,66,42,.06)" : "transparent",
              border: 0, borderRight: ".5px solid var(--line-2)",
              padding: "12px 6px 14px",
              cursor: "default",
              color: on ? "var(--ink)" : "var(--ink-3)",
              position: "relative",
              textAlign: "center",
            }}>
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

function TimelineBlock({ b, onChange, onRemove, last }) {
  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "92px 36px 1fr 24px",
      gap: 0,
      position: "relative",
      paddingBottom: last ? 0 : "var(--block-py, 14px)",
    }}>
      {/* Time */}
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--ink-2)",
        paddingTop: 2,
        paddingRight: 8,
      }}>
        <EditableText
          value={b.t}
          onChange={v => onChange({ t: v })}
          placeholder="HH:MM"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, textAlign: "right" }}
        />
      </div>
      {/* Rail */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute",
          left: 13, top: 0,
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
          <EditableText
            value={b.tag}
            onChange={v => onChange({ tag: v })}
            placeholder="·"
            style={{ fontSize: 13, textAlign: "center", padding: 0 }}
          />
        </div>
      </div>
      {/* Content */}
      <div style={{ paddingLeft: 8, paddingTop: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 14.5, fontWeight: 500,
          color: "var(--ink)",
        }}>
          <EditableText
            value={b.label}
            onChange={v => onChange({ label: v })}
            placeholder="What's happening"
            style={{ fontWeight: 500 }}
          />
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2, lineHeight: 1.45 }}>
          <EditableText
            value={b.note}
            onChange={v => onChange({ note: v })}
            placeholder="add a note…"
            style={{ fontSize: 12.5, color: "var(--ink-3)" }}
          />
        </div>
      </div>
      {/* Remove */}
      <div style={{ paddingTop: 4 }}>
        <button
          onClick={onRemove}
          title="Remove"
          style={{
            appearance: "none", border: 0, background: "none",
            color: "var(--ink-3)", cursor: "default",
            fontSize: 15, lineHeight: 1, padding: "2px 4px",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-3)"; }}
        >×</button>
      </div>
    </li>
  );
}

function DayView({ day, onUpdate, onRemoveBlock, onAddBlock, onChangeCity }) {
  const city = window.CITIES[day.city] || window.CITIES.tokyo;
  const endCity = day.endCity ? window.CITIES[day.endCity] : null;
  const weather = window.WEATHER[day.city];

  return (
    <article>
      <div className="day-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 48,
        alignItems: "start",
      }}>
        <div>
          {/* meta row */}
          <div style={{
            display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap",
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            <span style={{ color: "var(--accent)" }}>Day {String(day.n).padStart(2, "0")} / {(day.totalDays || 17)}</span>
            <span>·</span>
            <span>{day.dow}, {shortDate(day.date)}</span>
            <span>·</span>
            <EditableSelect
              value={day.city}
              options={CITY_OPTIONS}
              onChange={v => onChangeCity(v)}
              style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--accent)" }}
            />
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 44, fontWeight: 500,
            lineHeight: 1.05, letterSpacing: "-.01em",
            margin: "0 0 14px",
          }}>
            <EditableText
              value={day.title}
              onChange={v => onUpdate({ title: v })}
              placeholder="Day title"
              style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, letterSpacing: "-.01em", lineHeight: 1.05 }}
            />
          </h2>

          <p style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 17, color: "var(--ink-2)",
            margin: "0 0 26px",
          }}>
            <EditableText
              value={day.summary}
              onChange={v => onUpdate({ summary: v })}
              placeholder="What's the day about?"
              multiline
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.4 }}
            />
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30, alignItems: "center" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px",
              border: ".5px solid var(--line)",
              borderRadius: 999,
              fontFamily: "var(--font-mono)", fontSize: 10.5,
              letterSpacing: ".04em", color: "var(--ink-2)",
            }}>
              <span style={{ width: 6, height: 6, background: "var(--ink)", borderRadius: "50%" }} />
              Base:&nbsp;
              <EditableText
                value={day.base}
                onChange={v => onUpdate({ base: v })}
                placeholder="hotel / area"
                style={{ fontFamily: "var(--font-mono)", fontSize: 10.5 }}
              />
            </span>
            {weather && (
              <Pill tone="gold">
                {weather.icon} {weather.hi}° / {weather.lo}°
              </Pill>
            )}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px",
              border: ".5px solid var(--line)",
              borderRadius: 999,
              fontFamily: "var(--font-mono)", fontSize: 10.5,
              letterSpacing: ".04em", color: "var(--ink-2)",
            }}>
              <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%" }} />
              <EditableNumber
                value={day.budget}
                onChange={v => onUpdate({ budget: v })}
                prefix="฿"
                suffix=" / pax"
                style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, textAlign: "left" }}
              />
            </span>
          </div>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {day.blocks.map((b, i) => (
              <TimelineBlock
                key={i}
                b={b}
                last={i === day.blocks.length - 1}
                onChange={patch => {
                  const newBlocks = day.blocks.map((x, j) => j === i ? { ...x, ...patch } : x);
                  onUpdate({ blocks: newBlocks });
                }}
                onRemove={() => onRemoveBlock(i)}
              />
            ))}
          </ol>

          {/* Add block */}
          <button
            onClick={onAddBlock}
            style={{
              appearance: "none", border: 0,
              marginTop: 14,
              padding: "10px 14px",
              background: "rgba(196,66,42,.04)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)", fontSize: 11,
              letterSpacing: ".1em", textTransform: "uppercase",
              cursor: "default",
              borderLeft: "2px solid var(--accent)",
            }}>
            + เพิ่มกิจกรรม
          </button>
        </div>

        <aside style={{ position: "sticky", top: 20 }}>
          <HeroPhoto
            id={day.hero}
            ratio="4/5"
            kanji={city.kanji}
            caption={`day ${String(day.n).padStart(2, "0")} · ${city.name.toLowerCase()}`}
          />
          <div style={{
            marginTop: 18,
            padding: "14px 18px",
            border: ".5px solid var(--line)",
            background: "rgba(0,0,0,.012)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 6,
            }}>
              Tip
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
              Tap any text, time, emoji, or number to edit. Press <kbd style={{
                fontFamily: "var(--font-mono)", fontSize: 10.5, padding: "1px 6px",
                border: ".5px solid var(--line)", borderRadius: 3,
              }}>Enter</kbd> to save, <kbd style={{
                fontFamily: "var(--font-mono)", fontSize: 10.5, padding: "1px 6px",
                border: ".5px solid var(--line)", borderRadius: 3,
              }}>Esc</kbd> to cancel.
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function ListView({ days }) {
  return (
    <div>
      {days.map(d => {
        const city = window.CITIES[d.city] || window.CITIES.tokyo;
        return (
          <article key={d.n} className="list-row" style={{
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
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", marginTop: 4 }}>
                {d.dow}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                <CityChip cityKey={d.city} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 6 }}>
                {d.title}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-3)", maxWidth: "60ch" }}>
                {d.summary}
              </div>
              <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
                {d.blocks.length} activities · base {d.base}
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
  const [days, setDays] = usePersonal("itinerary_v1", window.DAYS);
  const day = days.find(d => d.n === selectedDay) || days[0];

  function updateDay(n, patch) {
    setDays(ds => ds.map(d => d.n === n ? { ...d, ...patch } : d));
  }
  function changeCity(n, cityKey) {
    updateDay(n, { city: cityKey });
  }
  function removeBlock(n, blockIdx) {
    setDays(ds => ds.map(d => d.n !== n ? d : {
      ...d, blocks: d.blocks.filter((_, i) => i !== blockIdx),
    }));
  }
  function addBlock(n) {
    setDays(ds => ds.map(d => d.n !== n ? d : {
      ...d,
      blocks: [...d.blocks, { t: "12:00", tag: "📌", label: "New activity", note: "" }],
    }));
  }
  function addDay() {
    setDays(ds => {
      const last = ds[ds.length - 1];
      const lastDate = new Date(last.date + "T00:00:00");
      const next = new Date(lastDate.getTime() + 86400000);
      const iso = next.toISOString().slice(0, 10);
      const dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][next.getDay()];
      return [...ds, {
        n: last.n + 1, date: iso, dow, city: last.city, base: last.base,
        title: "New day",
        summary: "What's happening on this day?",
        hero: "expressway",
        blocks: [{ t: "10:00", tag: "📍", label: "First activity", note: "" }],
        budget: 3000,
      }];
    });
  }
  function removeDay(n) {
    if (!confirm("ลบวันนี้ออกจากแผน?")) return;
    setDays(ds => ds.filter(d => d.n !== n));
    if (selectedDay === n && days.length > 1) {
      const next = days.find(d => d.n !== n);
      if (next) setSelectedDay(next.n);
    }
  }
  function resetAll() {
    if (!confirm("รีเซ็ตแผนทั้งหมดกลับเป็นค่าตั้งต้น?")) return;
    setDays(window.DAYS);
  }

  return (
    <div>
      <SectionHeader
        title="Itinerary"
        jp="旅程"
        right={
          <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
            <span>{days.length} days</span>
            <button className="link-btn" onClick={addDay}>+ วัน</button>
            {day && days.length > 1 && (
              <button className="link-btn" onClick={() => removeDay(day.n)}>× ลบวันนี้</button>
            )}
            <button className="link-btn" onClick={resetAll}>↺ reset</button>
          </span>
        }
      />

      {view === "day" ? (
        <>
          <DayPicker days={days} selected={selectedDay} onSelect={setSelectedDay} />
          {day && (
            <DayView
              day={{ ...day, totalDays: days.length }}
              onUpdate={patch => updateDay(day.n, patch)}
              onChangeCity={city => changeCity(day.n, city)}
              onAddBlock={() => addBlock(day.n)}
              onRemoveBlock={i => removeBlock(day.n, i)}
            />
          )}
        </>
      ) : (
        <ListView days={days} />
      )}
    </div>
  );
}

window.Itinerary = Itinerary;
