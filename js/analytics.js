/* ============================================================
   SEGUIMIENTO — Google Analytics 4 y Meta Pixel
   ============================================================
   Estos códigos SOLO se activan cuando el visitante acepta las
   cookies (cumplimiento de privacidad).

   PASOS PARA ACTIVAR:
   1. Google Analytics 4: cree la propiedad en
      https://analytics.google.com y reemplace G-XXXXXXXXXX
      por su ID de medición.
   2. Meta Pixel: cree el píxel en
      https://business.facebook.com/events_manager y reemplace
      000000000000000 por su ID de píxel.
   3. Google Search Console: verifique la propiedad en
      https://search.google.com/search-console — la etiqueta
      <meta name="google-site-verification"> está en el <head>
      de index.html, reemplace el contenido por su código.
   ============================================================ */

const GA_ID = "G-XXXXXXXXXX";        // ← Reemplazar con el ID real de GA4
const META_PIXEL_ID = "000000000000000"; // ← Reemplazar con el ID real del píxel

let seguimientoActivo = false;

function activarSeguimiento() {
  if (seguimientoActivo) return;
  seguimientoActivo = true;

  // No cargar nada si los IDs siguen siendo los de ejemplo
  const gaConfigurado = GA_ID !== "G-XXXXXXXXXX";
  const pixelConfigurado = META_PIXEL_ID !== "000000000000000";

  if (gaConfigurado) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  if (pixelConfigurado) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", META_PIXEL_ID);
    fbq("track", "PageView");
  }
}
