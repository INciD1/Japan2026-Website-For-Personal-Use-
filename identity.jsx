// identity.jsx — sign-in by student ID, persisted to localStorage
// Used so each friend can have their own personal notes when the site is
// hosted (e.g. on Render). No server — purely client-side identity.

const IdentityContext = React.createContext({ user: null, signIn: () => {}, signOut: () => {} });

function useIdentity() {
  return React.useContext(IdentityContext);
}

function IdentityProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    try {
      const code = localStorage.getItem("japan26_identity");
      if (!code) return null;
      return window.TRAVELERS.find(t => t.code === code) || null;
    } catch { return null; }
  });

  function signIn(traveler) {
    try { localStorage.setItem("japan26_identity", traveler.code); } catch {}
    setUser(traveler);
  }
  function signOut() {
    try { localStorage.removeItem("japan26_identity"); } catch {}
    setUser(null);
  }

  return (
    <IdentityContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </IdentityContext.Provider>
  );
}

// localStorage-backed per-user state hook.
// key is scoped per identity automatically.
function usePersonal(key, fallback) {
  const { user } = useIdentity();
  const fullKey = user ? `japan26_${key}_${user.code}` : null;

  const [value, setValue] = React.useState(() => {
    if (!fullKey) return fallback;
    try {
      const raw = localStorage.getItem(fullKey);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  });

  // Re-read when identity changes
  React.useEffect(() => {
    if (!fullKey) { setValue(fallback); return; }
    try {
      const raw = localStorage.getItem(fullKey);
      setValue(raw == null ? fallback : JSON.parse(raw));
    } catch { setValue(fallback); }
    // eslint-disable-next-line
  }, [fullKey]);

  function update(next) {
    setValue(prev => {
      const v = typeof next === "function" ? next(prev) : next;
      if (fullKey) {
        try { localStorage.setItem(fullKey, JSON.stringify(v)); } catch {}
      }
      return v;
    });
  }

  return [value, update];
}

// ─── SIGN-IN GATE ────────────────────────────────────────────────────
function SignInGate({ children }) {
  const { user, signIn } = useIdentity();
  if (user) return children;
  return <SignInScreen onSignIn={signIn} />;
}

function SignInScreen({ onSignIn }) {
  const [selected, setSelected] = React.useState(null);
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState("");

  function tryConfirm() {
    if (!selected) return;
    if (code.trim() !== selected.code) {
      setErr("That code doesn't match. Check your student ID.");
      return;
    }
    onSignIn(selected);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "40px 24px",
      background: "var(--paper)",
      position: "relative",
    }}>
      {/* Paper grain stays via body::before */}
      <div style={{
        width: "100%", maxWidth: 720,
        position: "relative",
      }}>
        {/* Brand */}
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 48, paddingBottom: 16,
          borderBottom: ".5px solid var(--line)",
        }}>
          <span style={{
            fontFamily: "var(--font-jp)", fontSize: 20, fontWeight: 600,
            color: "var(--accent)", letterSpacing: ".05em",
          }}>
            <span style={{
              display: "inline-block", border: "1.5px solid var(--accent)",
              padding: "3px 7px 2px", borderRadius: 3, marginRight: 8,
              fontSize: 14, verticalAlign: 2,
            }}>朱</span>
            JAPAN ’26
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase",
          }}>
            Sign in · サインイン
          </span>
        </div>

        {/* Hero */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: ".14em", textTransform: "uppercase",
          color: "var(--ink-3)", marginBottom: 12,
        }}>
          Who are you?
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: 56, fontWeight: 500, lineHeight: 0.96,
          letterSpacing: "-.02em", margin: "0 0 14px",
        }}>
          Pick your name,<br/>
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--accent)" }}>
            then enter your student code.
          </em>
        </h1>
        <p style={{
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 17, color: "var(--ink-2)", maxWidth: "52ch",
          margin: "0 0 36px",
        }}>
          So your personal notes and check-marks stay tied to you when we
          share this link around the group.
        </p>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10,
          marginBottom: 28,
        }}>
          {window.TRAVELERS.map(t => {
            const on = selected?.id === t.id;
            return (
              <button key={t.id}
                onClick={() => { setSelected(t); setCode(""); setErr(""); }}
                style={{
                  appearance: "none",
                  border: `.5px solid ${on ? "var(--accent)" : "var(--line)"}`,
                  background: on ? "rgba(196,66,42,.06)" : "var(--paper)",
                  padding: "20px 16px 18px",
                  cursor: "default",
                  textAlign: "left",
                  transition: "all 120ms ease",
                  borderRadius: 2,
                }}
                onMouseEnter={e => { if (!on) e.currentTarget.style.background = "rgba(0,0,0,.03)"; }}
                onMouseLeave={e => { if (!on) e.currentTarget.style.background = "var(--paper)"; }}
              >
                <Avatar traveler={t} size={36} />
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500,
                  marginTop: 12, lineHeight: 1.1,
                }}>
                  {t.nick}
                </div>
                <div style={{
                  fontSize: 11, color: "var(--ink-3)",
                  marginTop: 2, lineHeight: 1.3,
                }}>
                  {t.name.split(" ")[1]}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 9.5,
                  color: on ? "var(--accent)" : "var(--ink-3)",
                  letterSpacing: ".04em", marginTop: 10,
                }}>
                  {t.code}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirm input */}
        <div style={{
          padding: "20px 24px",
          border: `.5px solid ${selected ? "var(--accent)" : "var(--line)"}`,
          background: selected ? "rgba(196,66,42,.03)" : "transparent",
          opacity: selected ? 1 : 0.55,
          transition: "all 200ms ease",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--ink-3)", letterSpacing: ".14em", textTransform: "uppercase",
            marginBottom: 10,
          }}>
            Confirm your student code{selected ? ` · ${selected.nick}` : ""}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
            <input
              type="text"
              value={code}
              disabled={!selected}
              placeholder="6630611___"
              onChange={e => { setCode(e.target.value); setErr(""); }}
              onKeyDown={e => { if (e.key === "Enter") tryConfirm(); }}
              style={{
                flex: 1,
                padding: "14px 18px",
                border: ".5px solid var(--line)",
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                letterSpacing: ".06em",
                outline: "none",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--line)"; }}
            />
            <button
              onClick={tryConfirm}
              disabled={!selected || !code}
              style={{
                appearance: "none",
                border: 0,
                padding: "0 28px",
                background: (!selected || !code) ? "var(--ink-3)" : "var(--accent)",
                color: "var(--paper)",
                fontFamily: "var(--font-mono)", fontSize: 12,
                letterSpacing: ".12em", textTransform: "uppercase",
                cursor: "default",
                opacity: (!selected || !code) ? 0.6 : 1,
              }}>
              Enter →
            </button>
          </div>
          {err && (
            <div style={{
              marginTop: 10,
              fontFamily: "var(--font-mono)", fontSize: 11,
              color: "var(--accent)", letterSpacing: ".04em",
            }}>
              ✕ {err}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 24,
          fontFamily: "var(--font-mono)", fontSize: 10.5,
          color: "var(--ink-3)", letterSpacing: ".06em",
          lineHeight: 1.6,
        }}>
          Identity is stored in your browser only — nothing leaves your device.<br/>
          Open the site on a new device or browser to sign in again.
        </div>
      </div>
    </div>
  );
}

// Identity badge for topbar
function IdentityBadge() {
  const { user, signOut } = useIdentity();
  if (!user) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "4px 10px 4px 4px",
      border: ".5px solid var(--line)",
      borderRadius: 999,
    }}>
      <Avatar traveler={user} size={24} />
      <span style={{ fontSize: 12, color: "var(--ink-2)", fontWeight: 500 }}>
        {user.nick}
      </span>
      <button
        onClick={signOut}
        title="Sign out"
        style={{
          appearance: "none", border: 0, background: "none",
          color: "var(--ink-3)", cursor: "default",
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: ".08em", textTransform: "uppercase",
          padding: "2px 6px",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-3)"; }}
      >
        sign out
      </button>
    </div>
  );
}

window.IdentityProvider = IdentityProvider;
window.SignInGate = SignInGate;
window.IdentityBadge = IdentityBadge;
window.useIdentity = useIdentity;
window.usePersonal = usePersonal;
