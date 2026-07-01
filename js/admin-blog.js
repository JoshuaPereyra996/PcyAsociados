/* ============================================================
   PC Y ASOCIADOS — CRUD de blog (panel /adminPC)
   ============================================================ */

const form = document.getElementById("form-blog");
const mensaje = document.getElementById("form-mensaje");
const btnGuardar = document.getElementById("btn-guardar");
const btnNuevo = document.getElementById("btn-nuevo");
const formTitulo = document.getElementById("form-titulo");
const inputPortada = document.getElementById("blog-portada");
const previewZona = document.getElementById("preview-zona");
const previewImg = document.getElementById("preview-img");
const btnQuitarImg = document.getElementById("btn-quitar-img");
const lista = document.getElementById("lista-blog");
const conteo = document.getElementById("conteo");

let postsCache = [];

function escapar(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "admin-mensaje" + (tipo ? " admin-mensaje--" + tipo : "");
}

/* ---------- Lista ---------- */
async function cargarPosts() {
  try {
    const resp = await fetch("/api/blog");
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    postsCache = data.posts || [];
    pintarLista();
  } catch (err) {
    lista.innerHTML = '<p class="lista-vacia">No se pudo cargar la lista.</p>';
  }
}

function pintarLista() {
  conteo.textContent = postsCache.length;
  if (!postsCache.length) {
    lista.innerHTML = '<p class="lista-vacia">Aún no hay artículos creados desde el panel.</p>';
    return;
  }
  const ordenados = postsCache.slice().sort((a, b) => (b.creado || 0) - (a.creado || 0));
  lista.innerHTML = ordenados
    .map((p) => {
      const media = p.imagen
        ? '<img src="/' + encodeURI(p.imagen) + '" alt="" loading="lazy">'
        : '<span class="sin-foto">Sin portada</span>';
      return (
        '<article class="item-prod">' +
        '<div class="item-prod__foto">' + media + "</div>" +
        '<div class="item-prod__info">' +
        "<h3>" + escapar(p.titulo) + "</h3>" +
        '<p class="item-prod__meta">' + escapar(p.fecha) +
        (p.etiqueta ? " · " + escapar(p.etiqueta) : "") + "</p>" +
        '<div class="item-prod__badges">' +
        '<a class="mini-badge mini-badge--destacado" href="/' + p.archivo +
        '" target="_blank" rel="noopener" style="text-decoration:none">Ver ↗</a>' +
        "</div>" +
        "</div>" +
        '<div class="item-prod__acciones">' +
        '<button class="mini-btn" data-editar="' + p.slug + '">Editar</button>' +
        '<button class="mini-btn mini-btn--peligro" data-eliminar="' + p.slug + '">Eliminar</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

/* ---------- Vista previa de portada ---------- */
inputPortada.addEventListener("change", () => {
  const archivo = inputPortada.files[0];
  if (!archivo) return;
  previewImg.src = URL.createObjectURL(archivo);
  previewZona.hidden = false;
  form["quitarImagen"].value = "false";
});

btnQuitarImg.addEventListener("click", () => {
  inputPortada.value = "";
  previewImg.src = "";
  previewZona.hidden = true;
  form["quitarImagen"].value = "true";
});

/* ---------- Editar ---------- */
function editarPost(slug) {
  const p = postsCache.find((x) => x.slug === slug);
  if (!p) return;
  form["slug"].value = p.slug;
  form["titulo"].value = p.titulo;
  form["fecha"].value = p.fecha || "";
  form["etiqueta"].value = p.etiqueta || "";
  form["resumen"].value = p.resumen || "";
  form["cuerpo"].value = p.cuerpo || "";
  form["quitarImagen"].value = "false";
  inputPortada.value = "";
  if (p.imagen) {
    previewImg.src = "/" + encodeURI(p.imagen);
    previewZona.hidden = false;
  } else {
    previewImg.src = "";
    previewZona.hidden = true;
  }
  formTitulo.textContent = "Editar artículo";
  btnGuardar.textContent = "Guardar cambios";
  mostrarMensaje("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Eliminar ---------- */
async function eliminarPost(slug) {
  const p = postsCache.find((x) => x.slug === slug);
  if (!p) return;
  if (!confirm('¿Eliminar el artículo "' + p.titulo + '"? Se borrará su página del sitio.')) return;
  try {
    const resp = await fetch("/api/blog/" + encodeURIComponent(slug), { method: "DELETE" });
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    if (data.ok) {
      await cargarPosts();
      if (form["slug"].value === slug) reiniciarFormulario();
    } else {
      alert(data.error || "No se pudo eliminar.");
    }
  } catch (err) {
    alert("Error de conexión.");
  }
}

/* ---------- Reiniciar ---------- */
function reiniciarFormulario() {
  form.reset();
  form["slug"].value = "";
  form["quitarImagen"].value = "false";
  inputPortada.value = "";
  previewImg.src = "";
  previewZona.hidden = true;
  formTitulo.textContent = "Nuevo artículo";
  btnGuardar.textContent = "Publicar artículo";
  mostrarMensaje("");
}

/* ---------- Guardar ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrarMensaje("");
  btnGuardar.disabled = true;
  const etiquetaOriginal = btnGuardar.textContent;
  btnGuardar.textContent = "Guardando…";

  const datos = new FormData();
  datos.append("slug", form["slug"].value);
  datos.append("titulo", form["titulo"].value);
  datos.append("fecha", form["fecha"].value);
  datos.append("etiqueta", form["etiqueta"].value);
  datos.append("resumen", form["resumen"].value);
  datos.append("cuerpo", form["cuerpo"].value);
  datos.append("quitarImagen", form["quitarImagen"].value);
  if (inputPortada.files[0]) datos.append("portada", inputPortada.files[0]);

  try {
    const resp = await fetch("/api/blog", { method: "POST", body: datos });
    if (resp.status === 401) { window.location.href = "/adminPC"; return; }
    const data = await resp.json();
    if (data.ok) {
      await cargarPosts();
      reiniciarFormulario();
      mostrarMensaje("Artículo publicado correctamente.", "ok");
    } else {
      mostrarMensaje(data.error || "No se pudo guardar.", "error");
    }
  } catch (err) {
    mostrarMensaje("Error de conexión con el servidor.", "error");
  }
  btnGuardar.disabled = false;
  btnGuardar.textContent = etiquetaOriginal;
});

/* ---------- Delegación de clics ---------- */
lista.addEventListener("click", (e) => {
  const editar = e.target.closest("[data-editar]");
  const eliminar = e.target.closest("[data-eliminar]");
  if (editar) editarPost(editar.dataset.editar);
  if (eliminar) eliminarPost(eliminar.dataset.eliminar);
});

btnNuevo.addEventListener("click", reiniciarFormulario);

cargarPosts();
