/* ============================================================
   PC Y ASOCIADOS — CRUD de productos (panel /adminPC)
   ============================================================ */

const ETIQUETA_CATEGORIA = {
  computadoras: "Computadoras",
  laptops: "Laptops",
  "all-in-one": "All in One",
  monitores: "Monitores",
  servidores: "Servidores",
  accesorios: "Accesorios"
};

const form = document.getElementById("form-producto");
const mensaje = document.getElementById("form-mensaje");
const btnGuardar = document.getElementById("btn-guardar");
const btnNuevo = document.getElementById("btn-nuevo");
const formTitulo = document.getElementById("form-titulo");
const inputImagen = document.getElementById("prod-imagen");
const previewZona = document.getElementById("preview-zona");
const previewImg = document.getElementById("preview-img");
const lista = document.getElementById("lista-productos");
const conteo = document.getElementById("conteo");

let productosCache = [];

/* ---------- Utilidades ---------- */
function escapar(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatearPrecio(n) {
  if (!n || n <= 0) return "Consultar precio";
  return "$" + Number(n).toLocaleString("es-MX") + " MXN";
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "admin-mensaje" + (tipo ? " admin-mensaje--" + tipo : "");
}

/* ---------- Cargar y pintar la lista ---------- */
async function cargarProductos() {
  try {
    const resp = await fetch("/api/productos");
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    productosCache = data.productos || [];
    pintarLista();
  } catch (err) {
    lista.innerHTML = '<p class="lista-vacia">No se pudo cargar la lista.</p>';
  }
}

function pintarLista() {
  conteo.textContent = productosCache.length;
  if (!productosCache.length) {
    lista.innerHTML = '<p class="lista-vacia">Aún no hay productos.</p>';
    return;
  }
  lista.innerHTML = productosCache
    .map((p) => {
      const media = p.imagen
        ? '<img src="/' + encodeURI(p.imagen) + '" alt="" loading="lazy">'
        : '<span class="sin-foto">Sin foto</span>';
      const badges =
        (p.destacado ? '<span class="mini-badge mini-badge--destacado">Destacado</span>' : "") +
        (p.disponible
          ? ""
          : '<span class="mini-badge mini-badge--oculto">Oculto</span>');
      return (
        '<article class="item-prod' + (p.disponible ? "" : " item-prod--oculto") + '">' +
        '<div class="item-prod__foto">' + media + "</div>" +
        '<div class="item-prod__info">' +
        "<h3>" + escapar(p.nombre) + "</h3>" +
        '<p class="item-prod__meta">' +
        (ETIQUETA_CATEGORIA[p.categoria] || p.categoria) + " · " + escapar(p.condicion) +
        " · " + formatearPrecio(p.precio) + "</p>" +
        '<div class="item-prod__badges">' + badges + "</div>" +
        "</div>" +
        '<div class="item-prod__acciones">' +
        '<button class="mini-btn" data-editar="' + p.id + '">Editar</button>' +
        '<button class="mini-btn mini-btn--peligro" data-eliminar="' + p.id + '">Eliminar</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

/* ---------- Vista previa de imagen ---------- */
inputImagen.addEventListener("change", () => {
  const archivo = inputImagen.files[0];
  if (!archivo) return;
  previewImg.src = URL.createObjectURL(archivo);
  previewZona.hidden = false;
});

/* ---------- Editar ---------- */
function editarProducto(id) {
  const p = productosCache.find((x) => x.id === id);
  if (!p) return;
  form["id"].value = p.id;
  form["imagenActual"].value = p.imagen || "";
  form["categoria"].value = p.categoria;
  form["nombre"].value = p.nombre;
  form["descripcion"].value = p.descripcion;
  form["precio"].value = p.precio;
  form["condicion"].value = p.condicion;
  form["disponible"].checked = !!p.disponible;
  form["destacado"].checked = !!p.destacado;
  inputImagen.value = "";
  if (p.imagen) {
    previewImg.src = "/" + encodeURI(p.imagen);
    previewZona.hidden = false;
  } else {
    previewZona.hidden = true;
  }
  formTitulo.textContent = "Editar producto";
  btnGuardar.textContent = "Guardar cambios";
  mostrarMensaje("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Eliminar ---------- */
async function eliminarProducto(id) {
  const p = productosCache.find((x) => x.id === id);
  if (!p) return;
  if (!confirm('¿Eliminar "' + p.nombre + '"? Esta acción no se puede deshacer.')) return;
  try {
    const resp = await fetch("/api/productos/" + id, { method: "DELETE" });
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    if (data.ok) {
      await cargarProductos();
      if (Number(form["id"].value) === id) reiniciarFormulario();
    } else {
      alert(data.error || "No se pudo eliminar.");
    }
  } catch (err) {
    alert("Error de conexión.");
  }
}

/* ---------- Reiniciar formulario ---------- */
function reiniciarFormulario() {
  form.reset();
  form["id"].value = "";
  form["imagenActual"].value = "";
  inputImagen.value = "";
  previewZona.hidden = true;
  previewImg.src = "";
  form["disponible"].checked = true;
  formTitulo.textContent = "Nuevo producto";
  btnGuardar.textContent = "Guardar producto";
  mostrarMensaje("");
}

/* ---------- Guardar (crear o editar) ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrarMensaje("");
  btnGuardar.disabled = true;
  const etiquetaOriginal = btnGuardar.textContent;
  btnGuardar.textContent = "Guardando…";

  const datos = new FormData();
  // Campos de texto primero (para que el servidor nombre bien la imagen)
  datos.append("id", form["id"].value);
  datos.append("imagenActual", form["imagenActual"].value);
  datos.append("categoria", form["categoria"].value);
  datos.append("nombre", form["nombre"].value);
  datos.append("descripcion", form["descripcion"].value);
  datos.append("precio", form["precio"].value);
  datos.append("condicion", form["condicion"].value);
  datos.append("disponible", form["disponible"].checked ? "true" : "false");
  datos.append("destacado", form["destacado"].checked ? "true" : "false");
  if (inputImagen.files[0]) datos.append("imagen", inputImagen.files[0]);

  try {
    const resp = await fetch("/api/productos", { method: "POST", body: datos });
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    if (data.ok) {
      await cargarProductos();
      reiniciarFormulario();
      mostrarMensaje("Producto guardado correctamente.", "ok");
    } else {
      mostrarMensaje(data.error || "No se pudo guardar.", "error");
    }
  } catch (err) {
    mostrarMensaje("Error de conexión con el servidor.", "error");
  }
  btnGuardar.disabled = false;
  btnGuardar.textContent = etiquetaOriginal;
});

/* ---------- Delegación de clics en la lista ---------- */
lista.addEventListener("click", (e) => {
  const editar = e.target.closest("[data-editar]");
  const eliminar = e.target.closest("[data-eliminar]");
  if (editar) editarProducto(Number(editar.dataset.editar));
  if (eliminar) eliminarProducto(Number(eliminar.dataset.eliminar));
});

btnNuevo.addEventListener("click", reiniciarFormulario);

/* ---------- Inicio ---------- */
cargarProductos();
