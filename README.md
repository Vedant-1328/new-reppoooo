# AttendQR – Attendance Management System

A clean, offline-ready QR code generator for classroom/lab attendance sessions.

## 📁 Project Structure

```
attendqr/
├── index.html   → Main HTML page
├── style.css    → All styles (dark theme, animations)
├── app.js       → QR generation, download, reset logic
└── README.md    → This file
```

## 🚀 Getting Started in VS Code

1. Open the `attendqr/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. The app opens in your browser at `http://127.0.0.1:5500`

> No build step or npm install needed — it's pure HTML/CSS/JS.

## ⚙️ Features

- Fill session details: subject, faculty, room, date/time, department, batch
- Generates a QR code encoding all session data as JSON
- Supports custom URL encoding (e.g. Google Form link)
- Unique Session ID per generation
- Download QR as a labelled PNG
- Fully responsive layout

## 🛠️ Dependencies (CDN, no install needed)

| Library     | Purpose              |
|-------------|----------------------|
| qrcodejs    | QR code generation   |
| Google Fonts| Space Mono + Syne    |

## 📌 Customisation Tips

- To change colors, edit the CSS variables in `:root` inside `style.css`
- To add more departments, add `<option>` tags inside the `#dept` select in `index.html`
- To encode a Google Form URL automatically, paste it in the **Custom URL** field

---
Made with ❤️ for academic attendance tracking.
