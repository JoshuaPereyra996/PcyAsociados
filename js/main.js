/* ============================================================
   PC Y ASOCIADOS — Lógica del sitio
   ============================================================ */

// Número principal de WhatsApp (formato internacional, sin "+")
const WHATSAPP = "525574073349";

const NOMBRES_CATEGORIA = {
  computadoras: "Computadoras",
  laptops: "Laptops",
  "all-in-one": "All in One",
  monitores: "Monitores",
  servidores: "Servidores",
  accesorios: "Accesorios"
};

const ICONOS_CATEGORIA = {
  laptops:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20" stroke="#00B8D9" stroke-width="2" stroke-linecap="round"/></svg>',
  computadoras:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="7" y="3" width="10" height="18" rx="1.5"/><circle cx="12" cy="17" r="1.2" fill="#00B8D9" stroke="none"/><path d="M10 6.5h4M10 9.5h4" stroke="#00B8D9"/></svg>',
  "all-in-one":
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4" stroke="#00B8D9" stroke-width="2" stroke-linecap="round"/></svg>',
  servidores:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><circle cx="8" cy="6.5" r="1" fill="#00B8D9" stroke="none"/><circle cx="8" cy="17.5" r="1" fill="#00B8D9" stroke="none"/></svg>',
  monitores:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4" stroke="#00B8D9" stroke-width="2" stroke-linecap="round"/></svg>',
  accesorios:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#0B2E59" stroke-width="1.5"><rect x="6" y="2.5" width="12" height="19" rx="6"/><path d="M12 6v3.5" stroke="#00B8D9" stroke-width="2" stroke-linecap="round"/></svg>'
};

function formatearPrecio(n) {
  if (!n || n <= 0) return "Consultar precio";
  return "$" + n.toLocaleString("es-MX") + " MXN";
}

function enlaceWhatsApp(mensaje) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje);
}

/* ---------- Catálogo ---------- */
function renderizarProductos(filtro) {
  const grid = document.getElementById("grid-productos");
  if (!grid || typeof PRODUCTOS === "undefined") return;

  const visibles = PRODUCTOS
    .filter((p) => p.disponible && (filtro === "todos" || p.categoria === filtro))
    .sort((a, b) => (b.destacado === true) - (a.destacado === true));

  grid.innerHTML = visibles
    .map((p) => {
      const claseCondicion =
        p.condicion === "Nuevo" ? "producto__condicion--nuevo" : "producto__condicion--seminuevo";
      const media = p.imagen
        ? '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy">'
        : ICONOS_CATEGORIA[p.categoria] || ICONOS_CATEGORIA.accesorios;
      const mensaje =
        p.precio > 0
          ? "Hola, me interesa: " + p.nombre + " (" + formatearPrecio(p.precio) +
            "). ¿Está disponible?"
          : "Hola, me interesa: " + p.nombre + ". ¿Cuál es el precio y está disponible?";
      return (
        '<article class="producto">' +
        '<div class="producto__media">' + media +
        '<span class="producto__condicion ' + claseCondicion + '">' + p.condicion + "</span>" +
        "</div>" +
        '<div class="producto__cuerpo">' +
        "<h3>" + p.nombre + "</h3>" +
        "<p>" + p.descripcion + "</p>" +
        '<div class="producto__precio">' + formatearPrecio(p.precio) + "</div>" +
        '<div class="producto__nota">Precio sujeto a cambio · Garantía 3 meses*</div>' +
        '<a class="producto__btn" target="_blank" rel="noopener" href="' +
        enlaceWhatsApp(mensaje) + '">Preguntar por WhatsApp</a>' +
        "</div></article>"
      );
    })
    .join("");
}

function inicializarFiltros() {
  const filtros = document.querySelectorAll(".filtro");
  filtros.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtros.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      renderizarProductos(btn.dataset.categoria);
    });
  });
}

/* ---------- Promociones ---------- */
function renderizarPromociones() {
  const grid = document.getElementById("grid-promos");
  if (!grid || typeof PROMOCIONES === "undefined") return;
  grid.innerHTML = PROMOCIONES
    .map(
      (p) =>
        '<article class="promo">' +
        '<span class="promo__etiqueta">' + p.etiqueta + "</span>" +
        "<h3>" + p.titulo + "</h3>" +
        "<p>" + p.detalle + "</p>" +
        "</article>"
    )
    .join("");
}

/* ---------- Formulario → WhatsApp ---------- */
function inicializarFormulario() {
  const form = document.getElementById("form-contacto");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const interes = form.interes.value;
    const mensaje = form.mensaje.value.trim();

    const texto =
      "Hola, soy " + nombre + ".\n" +
      "Teléfono: " + telefono + "\n" +
      "Me interesa: " + interes + "\n" +
      (mensaje ? "Mensaje: " + mensaje : "");

    window.open(enlaceWhatsApp(texto), "_blank", "noopener");
    form.reset();
  });
}

/* ---------- Menú móvil ---------- */
function inicializarMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("abierto"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("abierto"))
  );
}

/* ---------- Banner de cookies ---------- */
function inicializarCookies() {
  const banner = document.getElementById("banner-cookies");
  if (!banner) return;
  if (!localStorage.getItem("cookies-pcy")) banner.classList.add("visible");

  document.getElementById("cookies-aceptar").addEventListener("click", () => {
    localStorage.setItem("cookies-pcy", "aceptadas");
    banner.classList.remove("visible");
    // Aquí se activan Google Analytics y Meta Pixel tras el consentimiento.
    if (typeof activarSeguimiento === "function") activarSeguimiento();
  });

  document.getElementById("cookies-rechazar").addEventListener("click", () => {
    localStorage.setItem("cookies-pcy", "rechazadas");
    banner.classList.remove("visible");
  });

  // Si ya las había aceptado en una visita anterior
  if (localStorage.getItem("cookies-pcy") === "aceptadas") {
    if (typeof activarSeguimiento === "function") activarSeguimiento();
  }
}

/* ---------- Año del pie de página ---------- */
function inicializarAnio() {
  const el = document.getElementById("anio");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos("todos");
  inicializarFiltros();
  renderizarPromociones();
  inicializarFormulario();
  inicializarMenu();
  inicializarCookies();
  inicializarAnio();
});
