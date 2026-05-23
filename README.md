# ☕ Menú Enlace — Digital Café Menu

A static website for **Café Enlace**, displaying a live digital menu loaded from Google Sheets. Includes a sidebar category navigator, responsive mobile layout, and a print-to-PDF feature that generates a formatted A4 menu.

**Stack:** HTML · CSS · Vanilla JS · jQuery 3.7.1
**Data source:** Google Sheets via [sheet2api.com](https://sheet2api.com)

---

## ✨ Features

- **Live menu data** — fetched from Google Sheets on load; no backend required
- **Category sidebar** — auto-generated from sheet data; active category highlighted
- **Responsive** — hamburger drawer on screens ≤ 900px; sidebar slides in/out
- **Print layout** — `Ctrl+P` triggers a formatted print view: cover page with logo, 2-column menu grid, fixed footer and price disclaimer on every page
- **Custom fonts** — Abraham Lincoln (item titles), Futura Cyrillic (descriptions), Lobster (category nav)

---

## 📁 Structure

```
├── index.html          ← Main page and print logic
├── js-menu/
│   ├── menu.js         ← Data fetch, menu rendering, print data export
│   └── jquery-3.7.1.min.js
└── styles/
    ├── main.css        ← All layout, typography, responsive and print styles
    └── img/
        ├── pattern2.svg   ← Header/footer background pattern
        └── id2try.svg     ← Café logo (used in footer and print cover)
```

---

## 🗂 Data format

Menu items are read from the Google Sheets endpoint. Each row should have:

| Column | Description |
|--------|-------------|
| `menu` | Category name (e.g. "Bebidas", "Postres") |
| `title` | Item name |
| `desc` | Short description (optional) |
| `price` | Price in CUP (optional) |

---

## 🖨 Print / PDF

Press `Ctrl+P` to open the browser print dialog with a custom print stylesheet:

- A4 portrait, 10mm margins
- Cover page (logo centred, full height)
- 2-column menu grid with item name and price on each row
- Price disclaimer and footer fixed at the bottom of every page
- All non-print UI hidden automatically

To change the data source, update the `fetch` URL in `js-menu/menu.js`.

---

## 🚀 Usage

No build step required — open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
# → http://localhost:3000
```
