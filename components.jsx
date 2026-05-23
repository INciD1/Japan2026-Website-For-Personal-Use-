// components.jsx — shared UI primitives

function Avatar({ traveler, size = 28 }) {
  const initials = traveler.nick.slice(0, 2).toUpperCase();
  return (
    <div className="av" style={{
      width: size, height: size,
      borderRadius: "50%",
      background: `oklch(0.62 0.13 ${traveler.hue})`,
      fontSize: Math.max(9, size * 0.36),
    }} title={`${traveler.name} · ${traveler.code}`}>
      {initials}
    </div>
  );
}

function AvatarRow({ travelers, size = 28 }) {
  return (
    <div className="dot-row">
      {travelers.map(t => <Avatar key={t.id} traveler={t} size={size} />)}
    </div>
  );
}

// "Photo" placeholder — paints a gradient block keyed to a hero id,
// with a kanji watermark and a typed caption. We never hand-draw scenes.
function HeroPhoto({ id, label, ratio = "16/10", caption, kanji }) {
  const grad = window.HERO_GRADIENTS[id] || ["#2a2a2a", "#5a5a5a", "#cfcfcf"];
  return (
    <div className="photo" style={{ aspectRatio: ratio }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(155deg, ${grad[0]} 0%, ${grad[1]} 55%, ${grad[2]} 100%)`,
      }} />
      <div className="stripes" />
      {kanji && (
        <div style={{
          position: "absolute", right: 14, top: 10,
          fontFamily: 'var(--font-jp)',
          fontSize: 56, fontWeight: 700,
          color: "rgba(255,255,255,.22)",
          letterSpacing: ".04em",
          lineHeight: 1,
          mixBlendMode: "overlay",
        }}>{kanji}</div>
      )}
      {caption && (
        <div style={{
          position: "absolute", left: 14, top: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(255,255,255,.78)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
        }}>{caption}</div>
      )}
      <div className="label">
        <span className="arrow">▸ </span>
        {label || `photo · ${id}`}
      </div>
    </div>
  );
}

function Pill({ tone, children }) {
  return (
    <span className="pill" data-tone={tone}>
      <span className="dot" />
      {children}
    </span>
  );
}

function SectionHeader({ title, jp, right }) {
  return (
    <div className="section-h">
      <h2>{title}{jp && <span className="jp">{jp}</span>}</h2>
      {right && <div className="right">{right}</div>}
    </div>
  );
}

// Pretty THB formatter
function fmtTHB(n) {
  return "฿" + n.toLocaleString();
}
function fmtJPY(n) {
  return "¥" + n.toLocaleString();
}

// ─── EDITABLE CELLS (tap to edit, blur to commit) ─────────────────
// All accept: value, onChange, placeholder, style, displayClass
// style is applied to BOTH the display button and the input so they
// look identical between idle and edit modes.

function EditableText({ value, onChange, placeholder = "—", style = {}, multiline = false, prefix = "", suffix = "" }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  React.useEffect(() => { setDraft(value); }, [value]);

  function commit() {
    onChange((draft || "").trim());
    setEditing(false);
  }

  const base = {
    appearance: "none",
    border: 0, background: "none",
    padding: "2px 4px",
    color: "var(--ink)",
    width: "100%",
    textAlign: "left",
    outline: "none",
    cursor: "text",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    boxSizing: "border-box",
    ...style,
  };

  if (editing) {
    const InputEl = multiline ? "textarea" : "input";
    return (
      <InputEl
        autoFocus
        value={draft || ""}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === "Enter" && !multiline) e.target.blur();
          if (e.key === "Escape") { setDraft(value); setEditing(false); }
        }}
        placeholder={placeholder}
        style={{
          ...base,
          border: ".5px solid var(--accent)",
          background: "var(--paper)",
          minHeight: multiline ? 80 : "auto",
          resize: multiline ? "vertical" : "none",
        }}
        {...(multiline ? {} : { type: "text" })}
      />
    );
  }
  const shown = (value === "" || value == null) ? placeholder : value;
  const isPlaceholder = (value === "" || value == null);
  return (
    <button
      onClick={() => setEditing(true)}
      style={{
        ...base,
        cursor: "text",
        color: isPlaceholder ? "var(--ink-3)" : base.color,
        borderBottom: ".5px dashed transparent",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; }}
    >
      {prefix}{shown}{suffix}
    </button>
  );
}

function EditableNumber({ value, onChange, prefix = "", suffix = "", style = {} }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(String(value || 0));
  React.useEffect(() => { setDraft(String(value || 0)); }, [value]);

  function commit() {
    const n = parseInt(String(draft).replace(/[^\d-]/g, ""), 10);
    onChange(isNaN(n) ? 0 : Math.max(0, n));
    setEditing(false);
  }

  const base = {
    appearance: "none",
    border: 0, background: "none",
    padding: "2px 4px",
    color: "var(--ink)",
    textAlign: "right",
    outline: "none",
    cursor: "text",
    fontFamily: "var(--font-mono)",
    fontSize: "inherit",
    boxSizing: "border-box",
    ...style,
  };

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
        style={{ ...base, border: ".5px solid var(--accent)", background: "var(--paper)" }}
      />
    );
  }
  return (
    <button
      onClick={() => setEditing(true)}
      style={{ ...base, borderBottom: ".5px dashed transparent" }}
      onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; }}
    >
      {prefix}{(value || 0).toLocaleString()}{suffix}
    </button>
  );
}

function EditableSelect({ value, options, onChange, style = {} }) {
  // options can be array of strings, or [{value, label}]
  const opts = options.map(o => typeof o === "string" ? { value: o, label: o } : o);
  const current = opts.find(o => o.value === value) || opts[0];
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        appearance: "none",
        border: ".5px dashed transparent",
        background: "var(--paper)",
        padding: "2px 18px 2px 6px",
        fontFamily: "var(--font-mono)", fontSize: "inherit",
        color: "var(--ink)",
        cursor: "default",
        backgroundImage: "linear-gradient(45deg, transparent 50%, var(--ink-3) 50%), linear-gradient(135deg, var(--ink-3) 50%, transparent 50%)",
        backgroundPosition: "calc(100% - 9px) 52%, calc(100% - 5px) 52%",
        backgroundSize: "4px 4px",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
      onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
      onBlur={e => { e.currentTarget.style.borderColor = "transparent"; }}
    >
      {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function EditableDate({ value, onChange, style = {} }) {
  return (
    <input
      type="date"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      style={{
        appearance: "none",
        border: ".5px dashed transparent",
        background: "transparent",
        padding: "2px 4px",
        fontFamily: "var(--font-mono)", fontSize: "inherit",
        color: "var(--ink)",
        cursor: "text",
        outline: "none",
        ...style,
      }}
      onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
      onBlur={e => { e.currentTarget.style.borderColor = "transparent"; }}
    />
  );
}

// Date helpers
function shortDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function dayOfWeekJP(dow) {
  const map = { Mon: "月", Tue: "火", Wed: "水", Thu: "木", Fri: "金", Sat: "土", Sun: "日" };
  return map[dow] || dow;
}

Object.assign(window, {
  Avatar, AvatarRow, HeroPhoto, Pill, SectionHeader,
  fmtTHB, fmtJPY, shortDate, dayOfWeekJP,
  EditableText, EditableNumber, EditableSelect, EditableDate,
});
