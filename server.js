/* ============================================================
   PC Y ASOCIADOS — Servidor
   ------------------------------------------------------------
   - Sirve el sitio público estático (index.html, css, js, img,
     blogs) tal como antes.
   - Agrega el panel de administración en /adminPC con login por
     una sola contraseña compartida (validada aquí en el servidor,
     nunca enviada al navegador).

   Para correr:
       npm install        (una sola vez)
       npm start          (o: node server.js)
   Luego abrir:
       http://localhost:8080            -> sitio público
       http://localhost:8080/adminPC    -> panel de administración
   ============================================================ */

const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
const ROOT = __dirname;
const PORT = process.env.PORT || 8080;

/* ===== Configuración de administración =====
   Cambie la contraseña aquí, o defínala en el entorno con
   ADMIN_PASSWORD para no dejarla escrita en el código.
   La contraseña vive SOLO en el servidor: nunca se envía al
   navegador ni aparece en el JavaScript público.            */
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "pcyasociados2026";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "cambie-esta-clave-secreta-por-una-larga-y-aleatoria";

/* ===== Middleware base ===== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "pcy.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8 // 8 horas
    }
  })
);

/* ===== Bloqueo de archivos sensibles =====
   Evita que el servidor estático entregue las plantillas del
   panel, el código del servidor o las dependencias.          */
const RUTAS_BLOQUEADAS = ["/server.js", "/package.json", "/package-lock.json", "/blog-posts.json"];
app.use((req, res, next) => {
  if (
    req.path.startsWith("/admin-views") ||
    req.path.startsWith("/node_modules") ||
    RUTAS_BLOQUEADAS.includes(req.path)
  ) {
    return res.status(403).send("Acceso no autorizado.");
  }
  next();
});

/* ===== Guard de autenticación ===== */
function requiereLogin(req, res, next) {
  if (req.session && req.session.autenticado) return next();
  if (req.path.startsWith("/api/")) {
    return res.status(401).json({ ok: false, error: "Sesión expirada. Inicie sesión de nuevo." });
  }
  return res.redirect("/adminPC");
}

/* ============================================================
   RUTAS DEL PANEL  /adminPC
   ============================================================ */

// Página de login (o salta al panel si ya hay sesión)
app.get("/adminPC", (req, res) => {
  if (req.session && req.session.autenticado) return res.redirect("/adminPC/panel");
  res.sendFile(path.join(ROOT, "admin-views", "login.html"));
});

// Validación de la contraseña
app.post("/adminPC/login", (req, res) => {
  const password = (req.body && req.body.password) || "";
  if (password === ADMIN_PASSWORD) {
    req.session.autenticado = true;
    return res.json({ ok: true, redirect: "/adminPC/panel" });
  }
  return res.status(401).json({ ok: false, error: "Contraseña incorrecta." });
});

// Cerrar sesión
app.post("/adminPC/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true, redirect: "/adminPC" }));
});

// Panel principal (protegido)
app.get("/adminPC/panel", requiereLogin, (req, res) => {
  res.sendFile(path.join(ROOT, "admin-views", "panel.html"));
});

/* ============================================================
   CATÁLOGO DE PRODUCTOS  (lee y escribe js/productos.js)
   ============================================================ */
const ARCHIVO_PRODUCTOS = path.join(ROOT, "js", "productos.js");
const DIR_PRODUCTOS_IMG = path.join(ROOT, "img", "productos");
const CATEGORIAS_VALIDAS = [
  "computadoras", "laptops", "all-in-one", "monitores", "servidores", "accesorios"
];

// Lee las listas globales PRODUCTOS y PROMOCIONES del archivo .js
function cargarCatalogo() {
  const code = fs.readFileSync(ARCHIVO_PRODUCTOS, "utf8");
  const fn = new Function(code + "\nreturn { PRODUCTOS, PROMOCIONES };");
  const data = fn();
  return {
    productos: asegurarIds(Array.isArray(data.PRODUCTOS) ? data.PRODUCTOS : []),
    promociones: Array.isArray(data.PROMOCIONES) ? data.PROMOCIONES : []
  };
}

// Garantiza que cada producto tenga un id numérico único
function asegurarIds(lista) {
  let max = lista.reduce((m, p) => (typeof p.id === "number" && p.id > m ? p.id : m), 0);
  return lista.map((p) => {
    if (typeof p.id === "number") return p;
    max += 1;
    return { id: max, ...p };
  });
}

// Reescribe js/productos.js conservando ambas listas y el formato JSON
function guardarCatalogo(productos, promociones) {
  const cabecera =
    "/* ============================================================\n" +
    "   CATÁLOGO — PC Y ASOCIADOS\n" +
    "   ------------------------------------------------------------\n" +
    "   Este archivo lo administra el panel /adminPC/productos, pero\n" +
    "   también puede editarse a mano. Define dos listas globales:\n" +
    "   PRODUCTOS y PROMOCIONES.\n\n" +
    "   Campos de cada producto:\n" +
    "   - id:         número único (lo asigna el panel; no lo repita)\n" +
    "   - categoria:  " + CATEGORIAS_VALIDAS.map((c) => '"' + c + '"').join(" | ") + "\n" +
    "   - nombre, descripcion, condicion: texto\n" +
    "   - precio:     número en MXN (0 = \"Consultar precio\")\n" +
    "   - imagen:     ruta dentro de img/productos/ (o \"\" para ícono)\n" +
    "   - destacado:  true para mostrarlo primero\n" +
    "   - disponible: false para ocultarlo sin borrarlo\n" +
    "   ============================================================ */\n\n";
  const cuerpo =
    "const PRODUCTOS = " + JSON.stringify(productos, null, 2) + ";\n\n" +
    "const PROMOCIONES = " + JSON.stringify(promociones, null, 2) + ";\n";
  fs.writeFileSync(ARCHIVO_PRODUCTOS, cabecera + cuerpo, "utf8");
}

// Normaliza los datos del formulario a la forma del producto
function normalizarProducto(p, id) {
  const esVerdadero = (v) => v === true || v === "true" || v === "on" || v === "1";
  let categoria = String(p.categoria || "").trim();
  if (!CATEGORIAS_VALIDAS.includes(categoria)) categoria = "accesorios";
  return {
    id: id,
    categoria: categoria,
    nombre: String(p.nombre || "").trim(),
    descripcion: String(p.descripcion || "").trim(),
    precio: Math.max(0, Number(p.precio) || 0),
    condicion: String(p.condicion || "Seminuevo").trim(),
    imagen: String(p.imagen || "").trim(),
    destacado: esVerdadero(p.destacado),
    disponible: esVerdadero(p.disponible)
  };
}

// Crea un nombre de archivo seguro a partir del nombre del producto
function slug(texto) {
  return String(texto)
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 40);
}

// Borra una imagen de img/productos/ solo si ya no la usa ningún producto
function borrarImagenSiHuerfana(ruta, productosRestantes) {
  if (!ruta || !ruta.startsWith("img/productos/")) return;
  if (productosRestantes.some((p) => p.imagen === ruta)) return;
  fs.promises.unlink(path.join(ROOT, ruta)).catch(() => {});
}

// Subida de imágenes a img/productos/
const subirImagen = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, DIR_PRODUCTOS_IMG),
    filename: (req, file, cb) => {
      const ext = (path.extname(file.originalname) || ".jpg").toLowerCase();
      const base = slug(req.body.nombre) || slug(path.basename(file.originalname, ext)) || "producto";
      cb(null, base + "-" + Date.now() + ext);
    }
  }),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6 MB
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) return cb(null, true);
    cb(new Error("El archivo debe ser una imagen (JPG, PNG, WebP…)."));
  }
});

// Página del CRUD de productos (protegida)
app.get("/adminPC/productos", requiereLogin, (req, res) => {
  res.sendFile(path.join(ROOT, "admin-views", "productos.html"));
});

// API: leer productos
app.get("/api/productos", requiereLogin, (req, res) => {
  try {
    const { productos } = cargarCatalogo();
    res.json({ ok: true, productos: productos, categorias: CATEGORIAS_VALIDAS });
  } catch (e) {
    res.status(500).json({ ok: false, error: "No se pudo leer el catálogo." });
  }
});

// API: crear o actualizar un producto (multipart: campos + imagen opcional)
app.post("/api/productos", requiereLogin, (req, res) => {
  subirImagen.single("imagen")(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message });
    try {
      const { productos, promociones } = cargarCatalogo();
      const id = req.body.id ? Number(req.body.id) : null;

      // Imagen: nueva subida tiene prioridad; si no, se conserva la actual
      let imagen = req.body.imagenActual || "";
      if (req.file) imagen = "img/productos/" + req.file.filename;

      if (id) {
        const idx = productos.findIndex((p) => p.id === id);
        if (idx === -1) return res.status(404).json({ ok: false, error: "Producto no encontrado." });
        const anterior = productos[idx].imagen;
        productos[idx] = normalizarProducto({ ...req.body, imagen }, id);
        guardarCatalogo(productos, promociones);
        if (req.file && anterior && anterior !== imagen) borrarImagenSiHuerfana(anterior, productos);
        return res.json({ ok: true, producto: productos[idx] });
      }

      const nuevoId = productos.reduce((m, p) => Math.max(m, p.id || 0), 0) + 1;
      const nuevo = normalizarProducto({ ...req.body, imagen }, nuevoId);
      productos.push(nuevo);
      guardarCatalogo(productos, promociones);
      res.json({ ok: true, producto: nuevo });
    } catch (e) {
      res.status(500).json({ ok: false, error: "No se pudo guardar el producto." });
    }
  });
});

// API: eliminar un producto
app.delete("/api/productos/:id", requiereLogin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const { productos, promociones } = cargarCatalogo();
    const idx = productos.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Producto no encontrado." });
    const [borrado] = productos.splice(idx, 1);
    guardarCatalogo(productos, promociones);
    borrarImagenSiHuerfana(borrado.imagen, productos);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: "No se pudo eliminar el producto." });
  }
});

/* ============================================================
   BLOG  (genera blog-<slug>.html, tarjeta en blog.html y sitemap)
   ============================================================ */
const DOMINIO = (process.env.DOMINIO || "https://www.pcyasociados.com.mx").replace(/\/$/, "");
const ARCHIVO_BLOG_INDEX = path.join(ROOT, "blog.html");
const ARCHIVO_SITEMAP = path.join(ROOT, "sitemap.xml");
const ARCHIVO_MANIFIESTO = path.join(ROOT, "blog-posts.json");
const DIR_BLOG_IMG = path.join(ROOT, "img", "blog");
const MARCADOR_INI = "<!-- POSTS-PANEL:INICIO";
const MARCADOR_FIN = "<!-- POSTS-PANEL:FIN -->";

fs.mkdirSync(DIR_BLOG_IMG, { recursive: true });

function escaparHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Manifiesto de posts creados desde el panel
function cargarPosts() {
  try {
    return JSON.parse(fs.readFileSync(ARCHIVO_MANIFIESTO, "utf8"));
  } catch (e) {
    return [];
  }
}
function guardarPosts(posts) {
  fs.writeFileSync(ARCHIVO_MANIFIESTO, JSON.stringify(posts, null, 2), "utf8");
}

// Convierte el cuerpo (texto con párrafos separados por línea en blanco) a HTML
function cuerpoAHtml(cuerpo) {
  return String(cuerpo || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => "      <p>" + escaparHtml(p).replace(/\n/g, "<br>") + "</p>")
    .join("\n\n");
}

// Plantilla del artículo, con el mismo encabezado/pie del sitio
function generarHtmlArticulo(post) {
  const desc = escaparHtml(post.resumen).slice(0, 155);
  const portada = post.imagen
    ? '\n      <img src="' + encodeURI(post.imagen) + '" alt="' + escaparHtml(post.titulo) +
      '" style="width:100%;border-radius:12px;margin:0 0 1.4rem;">'
    : "";
  const meta = escaparHtml(post.fecha) + (post.etiqueta ? " · " + escaparHtml(post.etiqueta) : "");
  return `<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escaparHtml(post.titulo)} | PC y Asociados</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${DOMINIO}/${post.archivo}">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <header class="header">
    <div class="contenedor header__inner">
      <a class="logo" href="index.html" aria-label="PC y Asociados — inicio">
        <img class="logo__icono" src="img/LogoPcYasociados.png" alt="PC y Asociados — venta de equipo de cómputo" width="46" height="46">
        <span class="logo__texto">PC Y ASOCIADOS<span>Tu mejor opción</span></span>
      </a>
      <button class="nav-toggle" aria-label="Abrir menú">☰</button>
      <nav class="nav">
        <a href="index.html#catalogo">Catálogo</a>
        <a href="blog.html">Blog</a>
        <a href="index.html#contacto" class="nav__cta">Contacto</a>
      </nav>
    </div>
  </header>

  <main class="contenedor">
    <article class="articulo">
      <span class="post-card__fecha">${meta}</span>
      <h1>${escaparHtml(post.titulo)}</h1>${portada}

${cuerpoAHtml(post.cuerpo)}

      <p><a href="blog.html">← Volver al blog</a></p>
    </article>
  </main>

  <footer class="footer">
    <div class="contenedor footer__grid">
      <div>
        <h4>PC Y ASOCIADOS</h4>
        <p class="footer__eslogan">"PC y Asociados, tu mejor opción"</p>
      </div>
      <div>
        <h4>Secciones</h4>
        <ul>
          <li><a href="index.html#catalogo">Catálogo</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4>Información</h4>
        <ul>
          <li><a href="aviso-privacidad.html">Aviso de privacidad</a></li>
          <li><a href="politicas.html">Garantía y devoluciones</a></li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a href="https://wa.me/525549329345?text=hola%20me%20gustaria%20adquirir%20un%20equipo%20de%20computo" target="_blank" rel="noopener">WhatsApp: 55 4932 9345</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">© <span id="anio"></span> PC y Asociados. Todos los derechos reservados.</div>
  </footer>

  <a class="wa-flotante" href="https://wa.me/525549329345?text=hola%20me%20gustaria%20adquirir%20un%20equipo%20de%20computo" target="_blank" rel="noopener" aria-label="Chatear por WhatsApp">
    <svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.35A10 10 0 1 0 12 2zm5.46 14.1c-.23.65-1.35 1.24-1.86 1.28-.5.05-.97.23-3.27-.68-2.77-1.1-4.53-3.93-4.67-4.11-.13-.18-1.11-1.48-1.11-2.83s.7-2 .96-2.28c.25-.27.55-.34.73-.34l.53.01c.17.01.4-.06.62.48.23.55.78 1.9.85 2.04.07.14.11.3.02.48-.09.18-.13.3-.27.46l-.4.47c-.13.13-.27.28-.12.54.16.27.7 1.16 1.5 1.87 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.6.75 1.87.89.27.14.45.2.52.32.06.11.06.66-.17 1.3z"/></svg>
  </a>

  <script src="js/analytics.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
`;
}

// Tarjeta para el índice blog.html
function generarTarjeta(post) {
  return (
    "        <article class=\"post-card\">\n" +
    "          <div class=\"post-card__banda\"></div>\n" +
    "          <div class=\"post-card__cuerpo\">\n" +
    "            <span class=\"post-card__fecha\">" + escaparHtml(post.fecha) + "</span>\n" +
    "            <h3>" + escaparHtml(post.titulo) + "</h3>\n" +
    "            <p>" + escaparHtml(post.resumen) + "</p>\n" +
    "            <a href=\"" + post.archivo + "\">Leer artículo →</a>\n" +
    "          </div>\n" +
    "        </article>"
  );
}

// Reconstruye el bloque de tarjetas en blog.html (más recientes primero)
function reconstruirIndice(posts) {
  const ordenados = posts.slice().sort((a, b) => (b.creado || 0) - (a.creado || 0));
  const bloque = ordenados.map(generarTarjeta).join("\n\n");
  const texto = fs.readFileSync(ARCHIVO_BLOG_INDEX, "utf8");
  const re = /(<!-- POSTS-PANEL:INICIO[^>]*-->)([\s\S]*?)(<!-- POSTS-PANEL:FIN -->)/;
  const reemplazo = "$1\n" + (bloque ? bloque + "\n        " : "        ") + "$3";
  fs.writeFileSync(ARCHIVO_BLOG_INDEX, texto.replace(re, reemplazo), "utf8");
}

// Reconstruye las URLs del sitemap (bloque del panel)
function reconstruirSitemap(posts) {
  const bloque = posts
    .map(
      (p) =>
        "  <url>\n    <loc>" + DOMINIO + "/" + p.archivo + "</loc>\n" +
        "    <changefreq>yearly</changefreq>\n    <priority>0.6</priority>\n  </url>"
    )
    .join("\n");
  const texto = fs.readFileSync(ARCHIVO_SITEMAP, "utf8");
  const re = /(<!-- POSTS-PANEL:INICIO[^>]*-->)([\s\S]*?)(<!-- POSTS-PANEL:FIN -->)/;
  const reemplazo = "$1\n" + (bloque ? bloque + "\n  " : "  ") + "$3";
  fs.writeFileSync(ARCHIVO_SITEMAP, texto.replace(re, reemplazo), "utf8");
}

function slugUnico(titulo, existentes) {
  let base = slug(titulo) || "articulo";
  let s = base;
  let n = 2;
  while (existentes.includes("blog-" + s + ".html")) {
    s = base + "-" + n++;
  }
  return s;
}

// Subida de portada del blog a img/blog/
const subirPortada = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, DIR_BLOG_IMG),
    filename: (req, file, cb) => {
      const ext = (path.extname(file.originalname) || ".jpg").toLowerCase();
      const base = slug(req.body.titulo) || "portada";
      cb(null, base + "-" + Date.now() + ext);
    }
  }),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) return cb(null, true);
    cb(new Error("El archivo debe ser una imagen."));
  }
});

// Aplica todos los cambios derivados del manifiesto
function regenerarBlog(posts) {
  reconstruirIndice(posts);
  reconstruirSitemap(posts);
}

// Página del CRUD de blog (protegida)
app.get("/adminPC/blog", requiereLogin, (req, res) => {
  res.sendFile(path.join(ROOT, "admin-views", "blog.html"));
});

// API: listar posts del panel
app.get("/api/blog", requiereLogin, (req, res) => {
  res.json({ ok: true, posts: cargarPosts() });
});

// API: crear o actualizar un post
app.post("/api/blog", requiereLogin, (req, res) => {
  subirPortada.single("portada")(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message });
    try {
      const posts = cargarPosts();
      const titulo = String(req.body.titulo || "").trim();
      const fecha = String(req.body.fecha || "").trim();
      const cuerpo = String(req.body.cuerpo || "").trim();
      if (!titulo || !cuerpo) {
        return res.status(400).json({ ok: false, error: "El título y el contenido son obligatorios." });
      }

      const slugEditar = String(req.body.slug || "").trim();
      let post;

      if (slugEditar) {
        post = posts.find((p) => p.slug === slugEditar);
        if (!post) return res.status(404).json({ ok: false, error: "Artículo no encontrado." });
      } else {
        const archivos = posts.map((p) => p.archivo);
        const s = slugUnico(titulo, archivos);
        post = { slug: s, archivo: "blog-" + s + ".html", creado: Date.now() };
        posts.push(post);
      }

      post.titulo = titulo;
      post.fecha = fecha || new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long" });
      post.etiqueta = String(req.body.etiqueta || "").trim();
      post.resumen = String(req.body.resumen || "").trim();
      post.cuerpo = cuerpo;
      if (req.file) {
        // borra la portada anterior si se reemplaza
        if (post.imagen && post.imagen.startsWith("img/blog/")) {
          fs.promises.unlink(path.join(ROOT, post.imagen)).catch(() => {});
        }
        post.imagen = "img/blog/" + req.file.filename;
      } else if (req.body.quitarImagen === "true") {
        if (post.imagen && post.imagen.startsWith("img/blog/")) {
          fs.promises.unlink(path.join(ROOT, post.imagen)).catch(() => {});
        }
        post.imagen = "";
      }

      // Escribe el archivo del artículo y actualiza índice + sitemap
      fs.writeFileSync(path.join(ROOT, post.archivo), generarHtmlArticulo(post), "utf8");
      guardarPosts(posts);
      regenerarBlog(posts);

      res.json({ ok: true, post: post });
    } catch (e) {
      res.status(500).json({ ok: false, error: "No se pudo guardar el artículo." });
    }
  });
});

// API: eliminar un post
app.delete("/api/blog/:slug", requiereLogin, (req, res) => {
  try {
    const posts = cargarPosts();
    const idx = posts.findIndex((p) => p.slug === req.params.slug);
    if (idx === -1) return res.status(404).json({ ok: false, error: "Artículo no encontrado." });
    const [borrado] = posts.splice(idx, 1);
    fs.promises.unlink(path.join(ROOT, borrado.archivo)).catch(() => {});
    if (borrado.imagen && borrado.imagen.startsWith("img/blog/")) {
      fs.promises.unlink(path.join(ROOT, borrado.imagen)).catch(() => {});
    }
    guardarPosts(posts);
    regenerarBlog(posts);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: "No se pudo eliminar el artículo." });
  }
});

/* ===== Sitio público estático ===== */
app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log(`PC y Asociados en  http://localhost:${PORT}`);
  console.log(`Panel admin en     http://localhost:${PORT}/adminPC`);
});
