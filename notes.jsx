// notes.jsx — to-dos + free notes (per-signed-in-user)

function NotesTab() {
  const { user } = useIdentity();
  // Group todos: shared completion state (per device) — separate from personal
  const [groupTodos, setGroupTodos] = usePersonal("group_todos", window.TODOS);
  // Personal scratch note
  const [personalNote, setPersonalNote] = usePersonal("personal_note", "");
  // Personal todos — your own checklist nobody else sees
  const [personalTodos, setPersonalTodos] = usePersonal("personal_todos", [
    { id: "p1", text: "Pack travel adapter (Type A)", done: false },
    { id: "p2", text: "Set up Suica in Apple Wallet", done: false },
  ]);
  const [newPersonal, setNewPersonal] = React.useState("");

  function toggleGroup(id) {
    setGroupTodos(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function togglePersonal(id) {
    setPersonalTodos(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function addPersonal() {
    const txt = newPersonal.trim();
    if (!txt) return;
    setPersonalTodos(ts => [...ts, { id: `p${Date.now()}`, text: txt, done: false }]);
    setNewPersonal("");
  }
  function removePersonal(id) {
    setPersonalTodos(ts => ts.filter(t => t.id !== id));
  }

  // Filter group todos by the signed-in user's responsibilities
  const myGroupTodos = groupTodos.filter(t => t.who === user.nick || t.who === "All");
  const otherTodos = groupTodos.filter(t => t.who !== user.nick && t.who !== "All");

  const PHRASES = [
    { jp: "すみません",       romaji: "sumimasen",        en: "Excuse me / Sorry" },
    { jp: "ありがとうございます", romaji: "arigatō gozaimasu", en: "Thank you" },
    { jp: "お会計お願いします",  romaji: "o-kaikei onegai shimasu", en: "Check, please" },
    { jp: "英語のメニューありますか", romaji: "eigo no menyū arimasu ka", en: "English menu?" },
    { jp: "写真撮ってもいいですか", romaji: "shashin totte mo ii desu ka", en: "Can I take a photo?" },
    { jp: "辛くないで",        romaji: "karakunai de",     en: "Not spicy, please" },
  ];

  return (
    <div>
      {/* Greeting strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "16px 20px",
        border: ".5px solid var(--line)",
        background: "rgba(196,66,42,.04)",
        borderLeft: "2px solid var(--accent)",
        marginBottom: 28,
      }}>
        <Avatar traveler={user} size={40} />
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--accent)", letterSpacing: ".14em", textTransform: "uppercase",
          }}>
            Signed in as
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, lineHeight: 1.2 }}>
            {user.nick} <span style={{ color: "var(--ink-3)", fontStyle: "italic", fontSize: 14 }}>· {user.name}</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em" }}>
          Personal notes save to this device
        </div>
      </div>

      <SectionHeader
        title="Notes & to-dos"
        jp="メモ"
        right={`Hi ${user.nick} — your own corner`}
      />

      {/* Three columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 36,
      }}>
        {/* COL 1 — YOUR TODOS */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 14, display: "flex", justifyContent: "space-between",
          }}>
            <span>Your to-dos · 個人</span>
            <span style={{ color: "var(--accent)" }}>{personalTodos.filter(t => !t.done).length} open</span>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {personalTodos.map(t => (
              <li key={t.id} style={{
                display: "grid",
                gridTemplateColumns: "22px 1fr 18px",
                gap: 10, alignItems: "center",
                padding: "12px 0",
                borderTop: ".5px solid var(--line-2)",
              }}>
                <button
                  onClick={() => togglePersonal(t.id)}
                  style={{
                    appearance: "none", border: 0, padding: 0, background: "none",
                    width: 18, height: 18, cursor: "default",
                  }}>
                  <div style={{
                    width: 16, height: 16,
                    border: `1.5px solid ${t.done ? "var(--accent)" : "var(--ink-3)"}`,
                    background: t.done ? "var(--accent)" : "transparent",
                    display: "grid", placeItems: "center",
                    color: "var(--paper)", fontSize: 12, fontWeight: 700, lineHeight: 1,
                  }}>
                    {t.done && "✓"}
                  </div>
                </button>
                <span style={{
                  fontSize: 13.5,
                  color: t.done ? "var(--ink-3)" : "var(--ink)",
                  textDecoration: t.done ? "line-through" : "none",
                  textDecorationColor: "var(--accent)",
                }}>
                  {t.text}
                </span>
                <button
                  onClick={() => removePersonal(t.id)}
                  title="Remove"
                  style={{
                    appearance: "none", border: 0, background: "none",
                    color: "var(--ink-3)", cursor: "default",
                    fontFamily: "var(--font-mono)", fontSize: 12,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-3)"; }}>
                  ×
                </button>
              </li>
            ))}
          </ul>
          {/* Add row */}
          <div style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 8,
          }}>
            <input
              value={newPersonal}
              onChange={e => setNewPersonal(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") addPersonal(); }}
              placeholder="+ add a personal to-do"
              style={{
                padding: "10px 14px",
                border: ".5px solid var(--line)",
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                outline: "none",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--line)"; }}
            />
            <button
              onClick={addPersonal}
              style={{
                appearance: "none", border: 0,
                padding: "0 16px",
                background: "var(--ink)", color: "var(--paper)",
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: ".08em", textTransform: "uppercase",
                cursor: "default",
              }}>
              Add
            </button>
          </div>

          {/* Personal note */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 10,
            }}>
              Personal notebook
            </div>
            <textarea
              value={personalNote}
              onChange={e => setPersonalNote(e.target.value)}
              placeholder={`Hi ${user.nick} — drop anything private here. Restaurant wishlist, packing reminders, things you want to do that the others don't…`}
              style={{
                width: "100%",
                minHeight: 180,
                padding: "16px 18px",
                border: ".5px solid var(--line)",
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 14.5,
                lineHeight: 1.6,
                resize: "vertical",
                outline: "none",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--line)"; }}
            />
            <div style={{
              marginTop: 6,
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--ink-3)", letterSpacing: ".06em",
              display: "flex", justifyContent: "space-between",
            }}>
              <span>{personalNote.length} chars</span>
              <span>saved · this browser only</span>
            </div>
          </div>
        </div>

        {/* COL 2 — GROUP CHECKLIST (yours + others) */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 14, display: "flex", justifyContent: "space-between",
          }}>
            <span>Group checklist · 共有</span>
            <span>{groupTodos.filter(t => !t.done).length} open</span>
          </div>

          {/* yours */}
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase",
            marginBottom: 6,
          }}>
            ★ Yours / shared
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
            {myGroupTodos.map(t => (
              <li key={t.id} style={{
                display: "grid",
                gridTemplateColumns: "22px 1fr auto",
                gap: 10, alignItems: "center",
                padding: "10px 0",
                borderTop: ".5px solid var(--line-2)",
              }}>
                <button
                  onClick={() => toggleGroup(t.id)}
                  style={{
                    appearance: "none", border: 0, padding: 0, background: "none",
                    cursor: "default",
                  }}>
                  <div style={{
                    width: 16, height: 16,
                    border: `1.5px solid ${t.done ? "var(--accent)" : "var(--ink-3)"}`,
                    background: t.done ? "var(--accent)" : "transparent",
                    display: "grid", placeItems: "center",
                    color: "var(--paper)", fontSize: 12, fontWeight: 700, lineHeight: 1,
                  }}>
                    {t.done && "✓"}
                  </div>
                </button>
                <span style={{
                  fontSize: 13,
                  color: t.done ? "var(--ink-3)" : "var(--ink)",
                  textDecoration: t.done ? "line-through" : "none",
                  textDecorationColor: "var(--accent)",
                }}>
                  {t.text}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: "var(--ink-3)", letterSpacing: ".06em",
                  textTransform: "uppercase",
                }}>
                  {t.who}
                </span>
              </li>
            ))}
          </ul>

          {/* others */}
          {otherTodos.length > 0 && (
            <>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase",
                marginBottom: 6,
              }}>
                Others
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, opacity: 0.7 }}>
                {otherTodos.map(t => (
                  <li key={t.id} style={{
                    display: "grid",
                    gridTemplateColumns: "22px 1fr auto",
                    gap: 10, alignItems: "center",
                    padding: "8px 0",
                    borderTop: ".5px solid var(--line-2)",
                  }}>
                    <div style={{
                      width: 16, height: 16,
                      border: "1.5px solid var(--ink-3)",
                      background: t.done ? "var(--ink-3)" : "transparent",
                      display: "grid", placeItems: "center",
                      color: "var(--paper)", fontSize: 11, lineHeight: 1,
                    }}>
                      {t.done && "✓"}
                    </div>
                    <span style={{
                      fontSize: 12.5, color: "var(--ink-3)",
                      textDecoration: t.done ? "line-through" : "none",
                    }}>
                      {t.text}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      color: "var(--ink-3)", letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}>
                      {t.who}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* COL 3 — PHRASEBOOK + EMERGENCY */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Phrasebook · お役立ち
          </div>
          <div style={{
            border: ".5px solid var(--line)",
            background: "rgba(0,0,0,.012)",
          }}>
            {PHRASES.map((p, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.85fr",
                gap: 12,
                padding: "12px 16px",
                borderBottom: i === PHRASES.length - 1 ? 0 : ".5px solid var(--line-2)",
                alignItems: "baseline",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-jp)", fontSize: 16, fontWeight: 500 }}>
                    {p.jp}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: "var(--ink-3)", letterSpacing: ".04em", marginTop: 2,
                    fontStyle: "italic",
                  }}>
                    {p.romaji}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-2)" }}>
                  {p.en}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 22,
            padding: "18px 20px",
            border: ".5px solid var(--accent)",
            background: "rgba(196,66,42,.04)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--accent)", letterSpacing: ".14em", textTransform: "uppercase",
              marginBottom: 10,
            }}>
              In case of · 緊急
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Police</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--ink)" }}>110</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Ambulance / fire</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--ink)" }}>119</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Thai embassy Tokyo</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink)" }}>+81 3-5789-2433</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Travel insurance</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink)" }}>AIG · 88-227-4901</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NotesTab = NotesTab;
