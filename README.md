# Japan '26 Itinerary

เว็บไซต์ itinerary ทริปญี่ปุ่น 29 Jul – 14 Aug 2026 (5 คน, KKU 6630 cohort)
สร้างด้วย React + Babel แบบ client-side ล้วน ไม่มี build step

---

## โครงสร้างไฟล์

```
├── index.html          # entry point — โหลด React, Babel, และไฟล์ .jsx ทั้งหมด
├── styles.css          # ตัวแปร CSS + theme + density + dark mode
├── data.jsx            # ข้อมูลทริป (วัน, เมือง, จองที่พัก, งบ, todos)
├── app.jsx             # root component + tab nav + tweaks
├── identity.jsx        # ระบบ sign-in ด้วยรหัสนักศึกษา (localStorage)
├── overview.jsx        # tab 1 — overview
├── itinerary.jsx       # tab 2 — day-by-day
├── map.jsx             # tab 3 — แผนที่ SVG ของญี่ปุ่น
├── budget.jsx          # tab 4 — งบ
├── reservations.jsx    # tab 5 — รายการจอง
├── notes.jsx           # tab 6 — notes ส่วนตัว (per-user)
├── components.jsx      # UI primitives ใช้ร่วม
├── tweaks-panel.jsx    # tweaks panel (theme/font/density)
└── render.yaml         # คอนฟิก deploy บน Render
```

---

## ขั้นตอนทำงานใน VS Code

### 1. เปิดโปรเจกต์
- แตก zip
- VS Code → **File → Open Folder** → เลือกโฟลเดอร์โปรเจกต์

### 2. รัน local server (จำเป็น!)

เปิด `index.html` ตรงๆ ด้วย `file://` **จะไม่ work** เพราะ browser block การโหลด `.jsx` ข้าม file scheme — ต้องเปิดผ่าน local server

**ทางเลือกที่ 1 — VS Code Live Server (แนะนำที่สุด)**
1. ไปที่ Extensions (Ctrl+Shift+X) → ค้น **"Live Server"** ของ Ritwick Dey → Install
2. คลิกขวาที่ `index.html` → **Open with Live Server**
3. เว็บเปิดที่ `http://127.0.0.1:5500` อัตโนมัติ แก้ไฟล์ปุ๊บ refresh ปั๊บ

**ทางเลือกที่ 2 — Python (ติดมากับ Mac/Linux)**
```bash
python3 -m http.server 8080
# เปิด browser → http://localhost:8080
```

**ทางเลือกที่ 3 — Node**
```bash
npx serve .
# หรือ
npx http-server -p 8080
```

### 3. แก้ไขโค้ด

- เปลี่ยน itinerary → แก้ `data.jsx`
- เปลี่ยนรูปลักษณ์/สี → แก้ตัวแปรใน `styles.css` (`:root { --paper: ... }`)
- เพิ่ม tab ใหม่ → แก้ array `TABS` ใน `app.jsx`

VS Code extension แนะนำ:
- **Live Server** — auto-reload
- **Babel JavaScript** หรือ **ES7+ React/Redux/React-Native snippets** — syntax highlight ของ JSX
- **Prettier** — auto-format

### 4. Push ขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/japan-26.git
git push -u origin main
```

> **Tip:** สร้างไฟล์ `.gitignore` กันไฟล์ขยะ:
> ```
> .DS_Store
> node_modules/
> .vscode/
> *.log
> ```

### 5. Deploy บน Render

1. Render Dashboard → **New +** → **Blueprint**
2. เลือก repo ของคุณ
3. Render อ่าน `render.yaml` แล้ว provision ให้อัตโนมัติ
4. ได้ URL `https://japan-26-itinerary.onrender.com`

Static site ของ Render **ฟรี ไม่ sleep** — ใช้ได้ตลอดเวลา

---

## ระบบ Sign-in (per-user notes)

แต่ละคนเข้ามาที่เว็บต้อง:
1. คลิกการ์ดของชื่อตัวเอง
2. พิมพ์รหัสนักศึกษาให้ตรง (`6630611xxx`)
3. กด Enter

ข้อมูลส่วนตัว (personal todos, personal note) เก็บใน `localStorage` ของ browser ตัวเอง คีย์เป็น `japan26_<feature>_<student_code>`

> หมายเหตุ: ถ้าใช้คนละ browser/device จะต้อง sign in ใหม่และข้อมูลส่วนตัวจะแยกกัน — ไม่ sync ข้าม device

---

## รหัสนักศึกษาที่ใช้

| รหัส | ชื่อเล่น | ชื่อ-นามสกุล |
|---|---|---|
| 6630611007 | Phum | Phumipat Buaphet |
| 6630611012 | Dech | Dechnarin Prabpala |
| 6630611030 | Non  | Nonpawit Denyuk |
| 6630611033 | Au   | Auchukorn Veschapun |
| 6630611043 | Top  | Worathep Panton |

---

良い旅を 🌸
