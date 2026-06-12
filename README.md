# Sitio web — PC Y ASOCIADOS

Sitio estático (HTML + CSS + JavaScript, sin frameworks) para PC y Asociados:
venta de equipo de cómputo nuevo y seminuevo en Coyoacán, CDMX.

## Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal: hero, catálogo con filtros, promociones, servicios, nosotros, FAQ, contacto con formulario y mapa |
| `blog.html` | Listado de artículos del blog |
| `blog-*.html` | Artículos individuales del blog |
| `aviso-privacidad.html` | Aviso de privacidad (revisar con asesor legal) |
| `politicas.html` | Garantía, devoluciones, entrega y formas de pago |
| `css/styles.css` | Estilos. Colores de marca: `#0B2E59` (primario) y `#00B8D9` (secundario) sobre blanco |
| `js/productos.js` | **Catálogo editable**: productos y promociones |
| `js/main.js` | Lógica: filtros, formulario→WhatsApp, cookies, menú móvil |
| `js/analytics.js` | Google Analytics 4 y Meta Pixel (se activan solo si el visitante acepta cookies) |
| `robots.txt` / `sitemap.xml` | SEO |
| `img/` | Fotos de productos y logo |

## Cómo editar el catálogo (sin saber programar)

Abrir `js/productos.js` y editar la lista `PRODUCTOS`. Cada producto tiene
nombre, descripción, precio, condición (Nuevo/Seminuevo), imagen y categoría
(`laptops`, `escritorio`, `monitores`, `accesorios`).

- Para **ocultar** un producto sin borrarlo: `disponible: false`
- Para **destacarlo** al inicio: `destacado: true`
- Las **promociones** se editan en la lista `PROMOCIONES` del mismo archivo.

Para usar fotos reales: guardar la imagen en `img/productos/` y poner la ruta
en el campo `imagen`, por ejemplo `"img/productos/laptop-hp.jpg"`.

## Cómo agregar una entrada al blog

1. Duplicar cualquier archivo `blog-*.html` y editar título, meta description y contenido.
2. Agregar la tarjeta correspondiente en `blog.html` (hay un comentario que indica dónde).
3. Agregar la URL nueva en `sitemap.xml`.

## Pendientes antes de publicar

1. **Dominio**: el sitio asume `https://www.pcyasociados.com.mx/`. Si el dominio
   final es otro, reemplazarlo en todos los `canonical`, Open Graph, `robots.txt`
   y `sitemap.xml` (buscar y reemplazar global).
2. **Google Analytics 4**: crear propiedad en analytics.google.com y poner el ID
   en `js/analytics.js` (variable `GA_ID`).
3. **Meta Pixel**: crear píxel en el Administrador de Eventos de Meta y poner el ID
   en `js/analytics.js` (variable `META_PIXEL_ID`).
4. **Google Search Console**: verificar la propiedad y reemplazar el contenido de
   la etiqueta `google-site-verification` en `index.html`. Después, enviar `sitemap.xml`.
5. **Google Business Profile**: crearlo en business.google.com — es gratis y es lo
   más importante para aparecer en búsquedas "cerca de mí" y en Google Maps.
6. **Logo real**: cuando tengan el PNG transparente del logo, guardarlo como
   `img/logo.png` y reemplazar el SVG provisional en el encabezado de cada página.
7. **Fotos reales**: agregar fotos de productos en `img/productos/` y una imagen
   `img/og-portada.jpg` (1200×630 px) para que se vea bien al compartir en WhatsApp/Facebook.
8. **Precios y productos de ejemplo**: el catálogo trae productos de muestra;
   actualizar con inventario y precios reales en `js/productos.js`.
9. **Aviso de privacidad**: revisarlo con un asesor legal.

## Cómo ver el sitio en local

Abrir `index.html` directamente en el navegador, o servirlo con:

```bash
python3 -m http.server 8080
```

y visitar http://localhost:8080

## Hosting recomendado

Por ser un sitio estático puede publicarse gratis o muy barato en
Netlify, Vercel, Cloudflare Pages o GitHub Pages, conectando el dominio propio.
