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
});
