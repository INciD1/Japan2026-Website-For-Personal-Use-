// budget.jsx — budget tracker

function BudgetBar({ spent, total }) {
  const pct = Math.min(100, Math.round((spent / total) * 100));
  const over = spent > total;
  return (
    <div style={{
      height: 6, background: "var(--line-2)",
      position: "relative", borderRadius: 0,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        width: `${pct}%`,
        background: over ? "var(--accent)" : "var(--ink)",
      }} />
    </div>
  );
}

function BudgetTab() {
  const b = window.BUDGET;
  const spentTotal = b.categories.reduce((s, c) => s + c.spent, 0);
  const totalBudget = b.categories.reduce((s, c) => s + c.total, 0);
  const remaining = totalBudget - spentTotal;
  const pct = Math.round((spentTotal / totalBudget) * 100);

  return (
    <div>
      <SectionHeader
        title="Budget"
        jp="予算"
        right="per person · THB"
      />

      {/* Top KPIs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        border: ".5px solid var(--line)",
        borderRight: 0, borderBottom: 0,
        marginBottom: 40,
      }}>
        {[
          { l: "Budget", v: `฿${b.budgetPerPerson.toLocaleString()}`, u: "per person" },
          { l: "Allocated", v: `฿${totalBudget.toLocaleString()}`, u: `across ${b.categories.length} categories` },
          { l: "Spent (booked)", v: `฿${spentTotal.toLocaleString()}`, u: `${pct}% of budget` },
          { l: "Remaining", v: `฿${remaining.toLocaleString()}`, u: "still to allocate" },
        ].map((k, i) => (
          <div key={i} style={{
            borderRight: ".5px solid var(--line)",
            borderBottom: ".5px solid var(--line)",
            padding: "22px 24px",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 8,
            }}>{k.l}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-.01em", lineHeight: 1 }}>
              {k.v}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", marginTop: 6 }}>
              {k.u}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 48,
      }}>
        {/* CATEGORIES */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            By category
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {b.categories.map(c => {
              const pct = Math.round((c.spent / c.total) * 100) || 0;
              return (
                <li key={c.key} style={{
                  padding: "16px 0",
                  borderTop: ".5px solid var(--line-2)",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr auto auto",
                    gap: 18,
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500 }}>
                      {c.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)" }}>
                      ฿{c.spent.toLocaleString()} <span style={{ color: "var(--ink-3)" }}>/ ฿{c.total.toLocaleString()}</span>
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 11,
                      color: pct >= 100 ? "var(--accent)" : "var(--ink-3)",
                      letterSpacing: ".06em",
                      minWidth: 38, textAlign: "right",
                    }}>
                      {pct}%
                    </span>
                  </div>
                  <BudgetBar spent={c.spent} total={c.total} />
                </li>
              );
            })}
          </ul>
        </div>

        {/* DAILY BURN */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Daily allocation
          </div>
          <div style={{
            padding: "20px 22px",
            border: ".5px solid var(--line)",
            background: "rgba(0,0,0,.012)",
          }}>
            {/* simple bar chart */}
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${window.DAYS.length}, 1fr)`,
              gap: 3,
              alignItems: "end",
              height: 160,
              marginBottom: 14,
            }}>
              {window.DAYS.map(d => {
                const max = Math.max(...window.DAYS.map(x => x.budget));
                const h = (d.budget / max) * 100;
                const big = d.budget > 10000;
                return (
                  <div key={d.n} title={`Day ${d.n} · ฿${d.budget}`} style={{ position: "relative" }}>
                    <div style={{
                      height: `${h}%`,
                      background: big ? "var(--accent)" : "var(--ink)",
                      opacity: big ? 1 : 0.8,
                    }} />
                  </div>
                );
              })}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${window.DAYS.length}, 1fr)`,
              gap: 3,
              fontFamily: "var(--font-mono)", fontSize: 9,
              color: "var(--ink-3)",
              textAlign: "center",
              letterSpacing: ".04em",
            }}>
              {window.DAYS.map(d => (
                <span key={d.n}>{String(d.n).padStart(2, "0")}</span>
              ))}
            </div>
            <div style={{
              marginTop: 18, paddingTop: 14,
              borderTop: ".5px solid var(--line-2)",
              fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5,
            }}>
              <strong>Peak days:</strong> DisneySea (D09, ฿14,500), USJ (D15, ฿14,200), the drive (D11, ฿11,200 incl. tolls + fuel split).
              The group fund covers shared meals; everyone keeps a personal tracker for shopping.
            </div>
          </div>

          {/* Group settlement */}
          <div style={{
            marginTop: 22,
            padding: "18px 22px",
            border: ".5px solid var(--line)",
            borderLeft: "2px solid var(--accent)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--accent)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 12,
            }}>
              Group ledger
            </div>
            {window.TRAVELERS.map(t => {
              const owed = (Math.sin(parseInt(t.id)) * 1200 + 800).toFixed(0);
              const owes = Math.random() > 0.5;
              return (
                <div key={t.id} style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto",
                  gap: 10, alignItems: "center",
                  padding: "8px 0",
                  borderTop: ".5px solid var(--line-2)",
                }}>
                  <Avatar traveler={t} size={26} />
                  <span style={{ fontSize: 13 }}>{t.nick}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12,
                    color: parseInt(t.id) % 2 ? "var(--green)" : "var(--accent)",
                  }}>
                    {parseInt(t.id) % 2 ? "+" : "−"}฿{Math.abs(parseInt(owed)).toLocaleString()}
                  </span>
                </div>
              );
            })}
            <div style={{
              marginTop: 12, paddingTop: 10,
              borderTop: ".5px solid var(--line-2)",
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: ".06em",
            }}>
              Settles weekly · PromptPay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.BudgetTab = BudgetTab;
