# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing/catalog site for **PC y Asociados** — sale of new and used computer equipment in Coyoacán, CDMX. Plain HTML + CSS + vanilla JavaScript, **no framework, no build step, no package manager, no tests**. All user-facing copy is in Spanish (`es-MX`) and should stay in Spanish.

## Running locally

No build. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

Deployment is static hosting (Netlify / Vercel / Cloudflare Pages / GitHub Pages) — just publish the repo root.

## Architecture

The site is a set of standalone HTML pages that share `css/styles.css` and the JS in `js/`. There is no templating, so the header/footer markup is **duplicated in every `.html` file** — a change to nav, logo, or footer must be repeated across all pages.

- `index.html` — single-page main site (hero, catalog, promos, services, about, FAQ, contact). Contains SEO `<head>`: canonical, Open Graph, and a `ComputerStore` JSON-LD block with the business's real address/phone/hours.
- `blog.html` + `blog-*.html` — blog index and individual articles (hand-authored).
- `aviso-privacidad.html`, `politicas.html` — legal/policy pages.

### JS layering (load order matters)
The three scripts are independent globals, loaded in this order on pages that use them:
1. `js/productos.js` — data only: the `PRODUCTOS` and `PROMOCIONES` arrays. This is the **editable catalog**; no logic.
2. `js/main.js` — all behavior. On `DOMContentLoaded` it renders the catalog into `#grid-productos` and promos into `#grid-promos`, wires category filter buttons (`.filtro[data-categoria]`), the contact form, mobile menu, cookie banner, and footer year.
3. `js/analytics.js` — defines `activarSeguimiento()` (GA4 + Meta Pixel). **Tracking only fires after cookie consent**: `main.js`'s cookie banner calls `activarSeguimiento()` when the user accepts (stored in `localStorage` key `cookies-pcy`). The function also no-ops while the IDs are still placeholders.

### Key conventions
- **Contact has no backend.** Both the contact form and per-product "Preguntar por WhatsApp" buttons build a prefilled message and open `https://wa.me/<number>`. The WhatsApp number is the constant `WHATSAPP` in `js/main.js`.
- **Catalog editing** = edit the `PRODUCTOS` array in `js/productos.js` only (categories: `laptops`, `escritorio`, `monitores`, `accesorios`). `disponible: false` hides an item; `destacado: true` sorts it first. Empty `imagen: ""` falls back to a category SVG icon defined in `js/main.js` (`ICONOS_CATEGORIA`); real photos go in `img/productos/` and are referenced by path.
- **Brand colors** are CSS variables in `:root` of `css/styles.css`: `--azul #0B2E59`, `--cian #00B8D9` on white. Use these vars, don't hardcode hex.

## Placeholders to be aware of

These values are intentionally fake until the client provides real ones — don't treat them as configured:
- `GA_ID` (`G-XXXXXXXXXX`) and `META_PIXEL_ID` in `js/analytics.js`
- `google-site-verification` meta content in `index.html`
- The domain `https://www.pcyasociados.com.mx/` is assumed throughout `canonical`/OG tags, `robots.txt`, and `sitemap.xml`; if it changes, find-and-replace globally.
- Sample products/prices in `js/productos.js`.

## Adding content

- **New product/promo:** edit arrays in `js/productos.js`.
- **New blog post:** duplicate a `blog-*.html`, edit title/meta/content, add a card in `blog.html`, and add the URL to `sitemap.xml`.

## Client review

`REVISION-CLIENTE.md` is a section-by-section checklist for client sign-off (✅ keep / ❌ remove / ✏️ change), not developer docs — useful for understanding which elements are still provisional.
