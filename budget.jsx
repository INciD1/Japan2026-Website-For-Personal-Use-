// budget.jsx — flexible / editable budget tracker
// Each user has their own working copy in localStorage so they can plan freely.

function NumberCell({ value, onChange, max }) {
  // tap-to-edit number cell — shows formatted on idle, input on focus
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(String(value));
  React.useEffect(() => { setDraft(String(value)); }, [value]);

  function commit() {
    const n = parseInt(draft.replace(/[^\d-]/g, ""), 10);
    onChange(isNaN(n) ? 0 : Math.max(0, n));
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        type="text"
        inputMode="numeric"
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === "Enter") e.target.blur(); if (e.key === "Escape") { setDraft(String(value)); setEditing(false); } }}
        style={{
          width: "100%",
          padding: "4px 8px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          border: ".5px solid var(--accent)",
          background: "var(--paper)",
          color: "var(--ink)",
          outline: "none",
          textAlign: "right",
        }}
      />
    );
  }
  return (
    <button
      onClick={() => setEditing(true)}
      style={{
        appearance: "none", border: 0, background: "none",
        padding: "4px 8px",
        fontFamily: "var(--font-mono)", fontSize: 12,
        color: "var(--ink)",
        cursor: "default",
        textAlign: "right",
        width: "100%",
        borderBottom: ".5px dashed transparent",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; }}
    >
      ฿{value.toLocaleString()}
    </button>
  );
}

function TextCell({ value, onChange, placeholder }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  React.useEffect(() => { setDraft(value); }, [value]);

  if (editing) {
    return (
      <input
        type="text"
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={() => { onChange(draft.trim() || placeholder); setEditing(false); }}
        onKeyDown={e => { if (e.key === "Enter") e.target.blur(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "4px 8px",
          fontFamily: "var(--font-display)",
          fontSize: 17, fontWeight: 500,
          border: ".5px solid var(--accent)",
          background: "var(--paper)",
          color: "var(--ink)",
          outline: "none",
        }}
      />
    );
  }
  return (
    <button
      onClick={() => setEditing(true)}
      style={{
        appearance: "none", border: 0, background: "none",
        padding: "4px 8px",
        fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500,
        color: "var(--ink)",
        cursor: "default",
        textAlign: "left",
        borderBottom: ".5px dashed transparent",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; }}
    >
      {value}
    </button>
  );
}

function BudgetBar({ spent, total }) {
  const pct = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;
  const over = total > 0 && spent > total;
  return (
    <div style={{ height: 6, background: "var(--line-2)", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        width: `${pct}%`,
        background: over ? "var(--accent)" : "var(--ink)",
      }} />
    </div>
  );
}

function BudgetTab() {
  // Per-user editable budget; falls back to data.jsx defaults
  const [personalBudget, setPersonalBudget] = usePersonal("budget_v1", {
    perPerson: window.BUDGET.budgetPerPerson,
    categories: window.BUDGET.categories,
  });

  const cats = personalBudget.categories || [];
  const perPerson = personalBudget.perPerson || 0;

  const spentTotal     = cats.reduce((s, c) => s + (c.spent || 0), 0);
  const allocatedTotal = cats.reduce((s, c) => s + (c.total || 0), 0);
  const remaining      = perPerson - spentTotal;
  const pct            = perPerson > 0 ? Math.round((spentTotal / perPerson) * 100) : 0;

  function updateCat(key, patch) {
    setPersonalBudget(b => ({
      ...b,
      categories: b.categories.map(c => c.key === key ? { ...c, ...patch } : c),
    }));
  }
  function removeCat(key) {
    setPersonalBudget(b => ({ ...b, categories: b.categories.filter(c => c.key !== key) }));
  }
  function addCat() {
    const key = `c${Date.now()}`;
    setPersonalBudget(b => ({
      ...b,
      categories: [...b.categories, { key, label: "หมวดใหม่", spent: 0, total: 1000 }],
    }));
  }
  function resetAll() {
    if (!confirm("รีเซ็ตงบกลับเป็นค่าตั้งต้น?")) return;
    setPersonalBudget({
      perPerson: window.BUDGET.budgetPerPerson,
      categories: window.BUDGET.categories,
    });
  }

  return (
    <div>
      <SectionHeader
        title="Budget"
        jp="予算"
        right={<button className="link-btn" onClick={resetAll}>↺ reset</button>}
      />

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-cell">
          <div className="kpi-l">Budget per person</div>
          <div className="kpi-edit">
            <span className="kpi-currency">฿</span>
            <NumberCell
              value={perPerson}
              onChange={v => setPersonalBudget(b => ({ ...b, perPerson: v }))}
            />
          </div>
          <div className="kpi-u">tap to edit</div>
        </div>
        <div className="kpi-cell">
          <div className="kpi-l">Allocated</div>
          <div className="kpi-v">฿{allocatedTotal.toLocaleString()}</div>
          <div className="kpi-u">{cats.length} categories</div>
        </div>
        <div className="kpi-cell">
          <div className="kpi-l">Spent / booked</div>
          <div className="kpi-v" style={{ color: spentTotal > perPerson ? "var(--accent)" : undefined }}>
            ฿{spentTotal.toLocaleString()}
          </div>
          <div className="kpi-u">{pct}% of budget</div>
        </div>
        <div className="kpi-cell">
          <div className="kpi-l">Remaining</div>
          <div className="kpi-v" style={{ color: remaining < 0 ? "var(--accent)" : "var(--green)" }}>
            {remaining < 0 ? "−" : ""}฿{Math.abs(remaining).toLocaleString()}
          </div>
          <div className="kpi-u">{remaining < 0 ? "over budget" : "available"}</div>
        </div>
      </div>

      <div className="budget-cols">
        {/* CATEGORIES */}
        <div>
          <div className="col-h">
            <span>By category · {cats.length}</span>
            <button onClick={addCat} className="link-btn">+ เพิ่มหมวด</button>
          </div>

          <ul className="cat-list">
            {cats.map(c => {
              const pct = c.total > 0 ? Math.round((c.spent / c.total) * 100) : 0;
              return (
                <li key={c.key} className="cat-row">
                  <div className="cat-row-top">
                    <div className="cat-label">
                      <TextCell
                        value={c.label}
                        onChange={v => updateCat(c.key, { label: v })}
                        placeholder="หมวดใหม่"
                      />
                    </div>
                    <div className="cat-nums">
                      <NumberCell value={c.spent} onChange={v => updateCat(c.key, { spent: v })} />
                      <span className="cat-sep">/</span>
                      <NumberCell value={c.total} onChange={v => updateCat(c.key, { total: v })} />
                      <span className="cat-pct" style={{ color: pct >= 100 ? "var(--accent)" : "var(--ink-3)" }}>
                        {pct}%
                      </span>
                      <button
                        onClick={() => removeCat(c.key)}
                        title="Remove"
                        className="cat-remove"
                      >×</button>
                    </div>
                  </div>
                  <BudgetBar spent={c.spent} total={c.total} />
                </li>
              );
            })}
          </ul>
        </div>

        {/* DAILY + GROUP */}
        <div>
          <div className="col-h">
            <span>Daily allocation</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>
              {window.DAYS.length} days
            </span>
          </div>

          <div className="daily-card">
            <div className="daily-chart">
              {window.DAYS.map(d => {
                const max = Math.max(...window.DAYS.map(x => x.budget));
                const h = (d.budget / max) * 100;
                const big = d.budget > 10000;
                return (
                  <div key={d.n} title={`Day ${d.n} · ฿${d.budget}`} className="daily-bar-wrap">
                    <div className="daily-bar" style={{
                      height: `${h}%`,
                      background: big ? "var(--accent)" : "var(--ink)",
                      opacity: big ? 1 : 0.85,
                    }} />
                  </div>
                );
              })}
            </div>
            <div className="daily-labels">
              {window.DAYS.map(d => (
                <span key={d.n}>{String(d.n).padStart(2, "0")}</span>
              ))}
            </div>
            <p className="daily-note">
              <strong>Peak days:</strong> Disney (D09), the drive (D11), USJ (D15).
              Tap a category on the left to adjust your share — values save to your browser.
            </p>
          </div>

          {/* Group ledger */}
          <div className="ledger">
            <div className="ledger-h">Group ledger · per friend</div>
            {window.TRAVELERS.map(t => {
              const pos = parseInt(t.id) % 2 === 1;
              const owed = Math.abs(Math.round(Math.sin(parseInt(t.id)) * 1200 + 800));
              return (
                <div key={t.id} className="ledger-row">
                  <Avatar traveler={t} size={26} />
                  <span className="ledger-nick">{t.nick}</span>
                  <span className="ledger-amt" style={{ color: pos ? "var(--green)" : "var(--accent)" }}>
                    {pos ? "+" : "−"}฿{owed.toLocaleString()}
                  </span>
                </div>
              );
            })}
            <div className="ledger-foot">Settles weekly · PromptPay</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.BudgetTab = BudgetTab;
