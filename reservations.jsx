// reservations.jsx — bookings log

const TYPE_META = {
  flight:  { icon: "✈️", label: "Flight",      hue: "var(--ink)" },
  hotel:   { icon: "🏨", label: "Lodging",     hue: "var(--green)" },
  ticket:  { icon: "🎫", label: "Ticket",      hue: "var(--accent)" },
  transit: { icon: "🚆", label: "Transit",     hue: "var(--ink)" },
  car:     { icon: "🚗", label: "Car rental",  hue: "var(--gold)" },
  dining:  { icon: "🍽️", label: "Dining",      hue: "var(--accent)" },
};

function ReservationsTab() {
  const [filter, setFilter] = React.useState("all");
  const items = filter === "all"
    ? window.RESERVATIONS
    : window.RESERVATIONS.filter(r => r.type === filter);

  const total = window.RESERVATIONS.reduce((s, r) => s + r.cost, 0);

  return (
    <div>
      <SectionHeader
        title="Reservations"
        jp="予約"
        right={`${window.RESERVATIONS.length} entries · ฿${total.toLocaleString()} pre-paid`}
      />

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
        {[
          { k: "all",    l: "All"     },
          { k: "flight", l: "Flights" },
          { k: "hotel",  l: "Lodging" },
          { k: "ticket", l: "Tickets" },
          { k: "transit",l: "Transit" },
          { k: "car",    l: "Car"     },
          { k: "dining", l: "Dining"  },
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

      {/* TABLE */}
      <div style={{
        border: ".5px solid var(--line)",
      }}>
        {/* Head */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "120px 32px 1fr 1fr 0.9fr 110px 100px",
          gap: 18,
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
        </div>

        {items.map((r, i) => {
          const meta = TYPE_META[r.type];
          return (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "120px 32px 1fr 1fr 0.9fr 110px 100px",
              gap: 18,
              padding: "16px 22px",
              borderBottom: i === items.length - 1 ? 0 : ".5px solid var(--line-2)",
              alignItems: "center",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)" }}>
                <div>{shortDate(r.date)}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{r.time}</div>
              </div>
              <div style={{ fontSize: 18 }}>{meta.icon}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.what}</div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
                  letterSpacing: ".06em", textTransform: "uppercase", marginTop: 2,
                }}>
                  {meta.label}
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-2)" }}>
                {r.ref}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-2)" }}>
                {r.who}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--ink)", textAlign: "right" }}>
                {r.cost > 0 ? `฿${r.cost.toLocaleString()}` : <span style={{ color: "var(--ink-3)" }}>—</span>}
              </div>
              <div style={{ textAlign: "right" }}>
                <Pill tone={r.status === "confirmed" ? "green" : "gold"}>
                  {r.status}
                </Pill>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 20,
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        color: "var(--ink-3)", letterSpacing: ".06em",
      }}>
        Costs are the group total. Per-person share split 5 ways unless noted.
      </div>
    </div>
  );
}

window.ReservationsTab = ReservationsTab;
