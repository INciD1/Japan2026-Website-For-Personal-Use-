// reservations.jsx — editable bookings log (per user)

const TYPE_META = {
  flight:  { icon: "✈️", label: "Flight"     },
  hotel:   { icon: "🏨", label: "Lodging"    },
  ticket:  { icon: "🎫", label: "Ticket"     },
  transit: { icon: "🚆", label: "Transit"    },
  car:     { icon: "🚗", label: "Car rental" },
  dining:  { icon: "🍽️", label: "Dining"     },
  other:   { icon: "📌", label: "Other"      },
};

const TYPE_OPTIONS = Object.entries(TYPE_META).map(([k, v]) => ({
  value: k, label: `${v.icon}  ${v.label}`,
}));

const STATUS_OPTIONS = ["confirmed", "pending", "cancelled"];

function ReservationsTab() {
  const [items, setItems] = usePersonal("reservations_v1", window.RESERVATIONS);
  const [filter, setFilter] = React.useState("all");

  const visible = filter === "all" ? items : items.filter(r => r.type === filter);
  const totalCost = items.reduce((s, r) => s + (r.cost || 0), 0);

  function updateRow(i, patch) {
    setItems(rs => rs.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  }
  function removeRow(i) {
    setItems(rs => rs.filter((_, idx) => idx !== i));
  }
  function addRow() {
    const blank = {
      date: window.TRIP.startDate,
      time: "12:00",
      type: "other",
      what: "New reservation",
      ref: "",
      who: "All 5",
      status: "pending",
      cost: 0,
    };
    setItems(rs => [...rs, blank]);
  }
  function resetAll() {
    if (!confirm("รีเซ็ตรายการจองทั้งหมด?")) return;
    setItems(window.RESERVATIONS);
  }
  function sortByDate() {
    setItems(rs => [...rs].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)));
  }

  return (
    <div>
      <SectionHeader
        title="Reservations"
        jp="予約"
        right={
          <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
            <span>{items.length} entries · ฿{totalCost.toLocaleString()}</span>
            <button className="link-btn" onClick={sortByDate}>↓ sort</button>
            <button className="link-btn" onClick={resetAll}>↺ reset</button>
          </span>
        }
      />

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
        {[
          { k: "all", l: "All" },
          ...Object.entries(TYPE_META).map(([k, v]) => ({ k, l: `${v.icon} ${v.label}` })),
        ].map(f => {
          const on = filter === f.k;
          return (
            <button key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                appearance: "none",
                border: `.5px solid ${on ? "var(--ink)" : "var(--line)"}`,
                background: on ? "var(--ink)" : "transparent",
                color: on ? "var(--paper)" : "var(--ink-2)",
                padding: "6px 12px",
                fontFamily: "var(--font-mono)", fontSize: 10.5,
                letterSpacing: ".06em", textTransform: "uppercase",
                cursor: "default",
                borderRadius: 999,
              }}>
              {f.l}
            </button>
          );
        })}
      </div>

      {/* TABLE — desktop */}
      <div className="res-scroll" style={{ overflowX: "auto" }}>
      <div className="res-table" style={{
        border: ".5px solid var(--line)",
        minWidth: 880,
      }}>
        {/* Head */}
        <div className="res-head" style={{
          display: "grid",
          gridTemplateColumns: "130px 32px 1.4fr 1fr 0.9fr 100px 110px 30px",
          gap: 14,
          padding: "12px 22px",
          borderBottom: ".5px solid var(--line)",
          background: "rgba(0,0,0,.018)",
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase",
        }}>
          <span>When</span>
          <span></span>
          <span>What</span>
          <span>Confirmation</span>
          <span>Holder</span>
          <span style={{ textAlign: "right" }}>Cost</span>
          <span style={{ textAlign: "right" }}>Status</span>
          <span></span>
        </div>

        {visible.map((r) => {
          // find original index in items for updating
          const i = items.indexOf(r);
          const meta = TYPE_META[r.type] || TYPE_META.other;
          return (
            <div key={i} className="res-row" style={{
              display: "grid",
              gridTemplateColumns: "130px 32px 1.4fr 1fr 0.9fr 100px 110px 30px",
              gap: 14,
              padding: "14px 22px",
              borderBottom: ".5px solid var(--line-2)",
              alignItems: "center",
            }}>
              {/* Date + time */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-2)" }}>
                <EditableDate value={r.date} onChange={v => updateRow(i, { date: v })} />
                <div style={{ marginTop: 2 }}>
                  <EditableText
                    value={r.time}
                    onChange={v => updateRow(i, { time: v })}
                    placeholder="HH:MM"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)" }}
                  />
                </div>
              </div>
              {/* Type icon (select hidden behind emoji) */}
              <div style={{ fontSize: 18 }}>
                <EditableSelect
                  value={r.type}
                  options={TYPE_OPTIONS}
                  onChange={v => updateRow(i, { type: v })}
                  style={{ fontSize: 16, padding: "2px 16px 2px 4px", width: 50 }}
                />
              </div>
              {/* What */}
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>
                  <EditableText value={r.what} onChange={v => updateRow(i, { what: v })} placeholder="Description" />
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
                  letterSpacing: ".06em", textTransform: "uppercase", marginTop: 2,
                }}>
                  {meta.label}
                </div>
              </div>
              {/* Ref */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-2)" }}>
                <EditableText value={r.ref} onChange={v => updateRow(i, { ref: v })} placeholder="—" />
              </div>
              {/* Who */}
              <div style={{ fontSize: 12, color: "var(--ink-2)" }}>
                <EditableText value={r.who} onChange={v => updateRow(i, { who: v })} placeholder="—" />
              </div>
              {/* Cost */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--ink)", textAlign: "right" }}>
                <EditableNumber value={r.cost} onChange={v => updateRow(i, { cost: v })} prefix="฿" />
              </div>
              {/* Status */}
              <div style={{ textAlign: "right" }}>
                <EditableSelect
                  value={r.status}
                  options={STATUS_OPTIONS}
                  onChange={v => updateRow(i, { status: v })}
                  style={{
                    fontSize: 10.5,
                    color: r.status === "confirmed" ? "var(--green)" :
                           r.status === "pending" ? "var(--gold)" : "var(--accent)",
                    textTransform: "uppercase", letterSpacing: ".06em",
                  }}
                />
              </div>
              {/* Remove */}
              <div>
                <button
                  onClick={() => removeRow(i)}
                  title="Remove"
                  style={{
                    appearance: "none", border: 0, background: "none",
                    color: "var(--ink-3)", cursor: "default",
                    fontSize: 15, lineHeight: 1, padding: "4px 6px",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-3)"; }}
                >×</button>
              </div>
            </div>
          );
        })}

        {/* Add row */}
        <button
          onClick={addRow}
          style={{
            appearance: "none", border: 0,
            width: "100%",
            padding: "14px 22px",
            background: "rgba(196,66,42,.04)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)", fontSize: 11.5,
            letterSpacing: ".12em", textTransform: "uppercase",
            textAlign: "left",
            cursor: "default",
            borderTop: ".5px dashed var(--accent)",
          }}>
          + เพิ่มรายการจอง
        </button>
      </div>
      </div>

      <div style={{
        marginTop: 16,
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        color: "var(--ink-3)", letterSpacing: ".06em",
        lineHeight: 1.6,
      }}>
        Tap any field to edit · changes save to your browser instantly · costs are the group total
      </div>
    </div>
  );
}

window.ReservationsTab = ReservationsTab;
