/* ============================================================
   CATÁLOGO EDITABLE — PC Y ASOCIADOS
   ============================================================
   Para agregar, quitar o modificar productos solo edite esta
   lista. No es necesario tocar el HTML.

   Campos de cada producto:
   - categoria: "laptops" | "escritorio" | "monitores" | "accesorios"
   - nombre:    nombre comercial del producto
   - descripcion: descripción corta
   - precio:    número en MXN (los precios pueden cambiar sin previo aviso)
   - condicion: "Nuevo" | "Seminuevo"
   - imagen:    ruta a la foto (carpeta img/productos/) o "" para
                usar el ícono de la categoría
   - destacado: true para mostrarlo primero
   - disponible: false para ocultarlo sin borrarlo
   ============================================================ */

const PRODUCTOS = [
  {
    categoria: "laptops",
    nombre: "Laptop HP EliteBook 840 G5",
    descripcion: 'Intel Core i5 8.ª gen · 8 GB RAM · SSD 256 GB · Pantalla 14"',
    precio: 5999,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "laptops",
    nombre: "Laptop Lenovo ThinkPad T480",
    descripcion: 'Intel Core i5 8.ª gen · 8 GB RAM · SSD 256 GB · Pantalla 14"',
    precio: 5499,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "laptops",
    nombre: "Laptop Dell Latitude 5410",
    descripcion: 'Intel Core i7 10.ª gen · 16 GB RAM · SSD 512 GB · Pantalla 14"',
    precio: 8999,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "laptops",
    nombre: "Laptop HP 250 G9 (Nueva)",
    descripcion: 'Intel Core i5 12.ª gen · 8 GB RAM · SSD 512 GB · Pantalla 15.6"',
    precio: 11999,
    condicion: "Nuevo",
    imagen: "",
    destacado: false,
    disponible: true
  },
  {
    categoria: "escritorio",
    nombre: "CPU Dell OptiPlex 7060 SFF",
    descripcion: "Intel Core i5 8.ª gen · 8 GB RAM · SSD 256 GB · Ideal para oficina",
    precio: 4499,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "escritorio",
    nombre: "CPU HP ProDesk 600 G4",
    descripcion: "Intel Core i5 8.ª gen · 16 GB RAM · SSD 512 GB",
    precio: 5299,
    condicion: "Seminuevo",
    imagen: "",
    destacado: false,
    disponible: true
  },
  {
    categoria: "escritorio",
    nombre: "Equipo completo para oficina",
    descripcion: 'CPU + monitor 22" + teclado y mouse · Listo para trabajar',
    precio: 6999,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "monitores",
    nombre: 'Monitor HP 22" Full HD',
    descripcion: "Panel IPS · HDMI y VGA · Ideal para oficina y hogar",
    precio: 1499,
    condicion: "Seminuevo",
    imagen: "",
    destacado: true,
    disponible: true
  },
  {
    categoria: "monitores",
    nombre: 'Monitor Dell 24" Full HD',
    descripcion: "Panel IPS · HDMI y DisplayPort · Base ajustable",
    precio: 1999,
    condicion: "Seminuevo",
    imagen: "",
    destacado: false,
    disponible: true
  },
  {
    categoria: "accesorios",
    nombre: "Kit teclado y mouse USB",
    descripcion: "Teclado en español · Plug & play · Garantía de funcionamiento",
    precio: 299,
    condicion: "Nuevo",
    imagen: "",
    destacado: false,
    disponible: true
  },
  {
    categoria: "accesorios",
    nombre: "Memoria RAM 8 GB DDR4",
    descripcion: "Para laptop o escritorio · Instalación incluida en compra",
    precio: 499,
    condicion: "Nuevo",
    imagen: "",
    destacado: false,
    disponible: true
  },
  {
    categoria: "accesorios",
    nombre: "SSD 480 GB",
    descripcion: "Acelere su equipo · Clonación de información disponible",
    precio: 699,
    condicion: "Nuevo",
    imagen: "",
    destacado: false,
    disponible: true
  }
];

/* ============================================================
   PROMOCIONES EDITABLES
   Edite los textos o agregue más objetos a la lista.
   ============================================================ */
const PROMOCIONES = [
  {
    titulo: "Equipo completo para oficina",
    detalle: "CPU + monitor + teclado y mouse desde $6,999. Listo para trabajar.",
    etiqueta: "Paquete"
  },
  {
    titulo: "Envíos a toda la República",
    detalle: "Reciba su equipo en cualquier parte de México, revisado al 100%.",
    etiqueta: "Envíos"
  },
  {
    titulo: "Mantenimiento preventivo",
    detalle: "Limpieza interna, cambio de pasta térmica y optimización de su equipo.",
    etiqueta: "Servicio"
  }
];
