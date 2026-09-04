# Japan '26 Itinerary

Itinerary website for a Japan trip, 29 Jul – 14 Aug 2026 (5 people, KKU 6630 cohort).
Built with React + Babel, entirely client-side — no build step.

---

## File Structure

```
├── index.html          # entry point — loads React, Babel, and all .jsx files
├── styles.css           # CSS variables + theme + density + dark mode
├── data.jsx             # trip data (days, cities, bookings, budget, todos)
├── app.jsx              # root component + tab nav + tweaks
├── identity.jsx          # sign-in system using student codes (localStorage)
├── overview.jsx          # tab 1 — overview
├── itinerary.jsx          # tab 2 — day-by-day
├── map.jsx               # tab 3 — illustrated SVG map of Japan
├── budget.jsx             # tab 4 — budget
├── reservations.jsx        # tab 5 — bookings log
├── notes.jsx               # tab 6 — personal notes (per-user)
├── components.jsx          # shared UI primitives
├── tweaks-panel.jsx        # tweaks panel (theme/font/density)
└── render.yaml             # Render deployment config
```

---

## Working in VS Code

### 1. Open the project
- Unzip
- VS Code → **File → Open Folder** → select the project folder

### 2. Run a local server (required!)

Opening `index.html` directly via `file://` **will not work** — browsers block loading `.jsx` files across the file scheme. You must serve it through a local server.

**Option 1 — VS Code Live Server (most recommended)**
1. Go to Extensions (Ctrl+Shift+X) → search **"Live Server"** by Ritwick Dey → Install
2. Right-click `index.html` → **Open with Live Server**
3. The site opens at `http://127.0.0.1:5500` automatically — edits refresh live

**Option 2 — Python (built into Mac/Linux)**
```bash
python3 -m http.server 8080
# open browser → http://localhost:8080
```

**Option 3 — Node**
```bash
npx serve .
# or
npx http-server -p 8080
```

### 3. Editing

- Change the itinerary → edit `data.jsx`
- Change the look/colors → edit variables in `styles.css` (`:root { --paper: ... }`)
- Add a new tab → edit the `TABS` array in `app.jsx`

Recommended VS Code extensions:
- **Live Server** — auto-reload
- **Babel JavaScript** or **ES7+ React/Redux/React-Native snippets** — JSX syntax highlighting
- **Prettier** — auto-format

### 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/japan-26.git
git push -u origin main
```

> **Tip:** create a `.gitignore` to keep out junk files:
> ```
> .DS_Store
> node_modules/
> .vscode/
> *.log
> ```

### 5. Deploy on Render

1. Render Dashboard → **New +** → **Blueprint**
2. Select your repo
3. Render reads `render.yaml` and provisions the site automatically
4. You get a URL like `https://japan-26-itinerary.onrender.com`

Render's static sites are **free and don't sleep** — always available.

---

## Sign-in System (per-user notes)

To use the site, each person:
1. Clicks their own name card
2. Types their matching student code (`6630611xxx`)
3. Presses Enter

Personal data (personal todos, personal notes) is stored in that browser's own `localStorage`, keyed as `japan26_<feature>_<student_code>`.

> Note: switching browsers/devices requires signing in again, and personal data doesn't sync across devices.

> ⚠️ **This is not real authentication.** The student code only scopes which `localStorage` key personal notes are saved under — it doesn't gate access to any content, and both `data.jsx` and this README list every valid code in plain text. Treat this repo as containing personal information for 5 people, not just yourself, and keep it **private**.

---

良い旅を 🌸
