/* ============================================================
   CATÁLOGO — PC Y ASOCIADOS
   ------------------------------------------------------------
   Este archivo lo administra el panel /adminPC/productos, pero
   también puede editarse a mano. Define dos listas globales:
   PRODUCTOS y PROMOCIONES.

   Campos de cada producto:
   - id:         número único (lo asigna el panel; no lo repita)
   - categoria:  "computadoras" | "laptops" | "all-in-one" | "monitores" | "servidores" | "accesorios"
   - nombre, descripcion, condicion: texto
   - precio:     número en MXN (0 = "Consultar precio")
   - imagen:     ruta dentro de img/productos/ (o "" para ícono)
   - destacado:  true para mostrarlo primero
   - disponible: false para ocultarlo sin borrarlo
   ============================================================ */

const PRODUCTOS = [
  {
    "id": 1,
    "categoria": "computadoras",
    "nombre": "CPU HP 800 G4",
    "descripcion": "Intel Core i7 8.ª gen · 8 GB RAM DDR4 · M.2 512 GB · Monitor 24\" HDMI HP · Teclado y mouse",
    "precio": 5700,
    "condicion": "Seminuevo",
    "imagen": "img/productos/EliteDesk 800 G4.png",
    "destacado": true,
    "disponible": true
  },
  {
    "id": 2,
    "categoria": "computadoras",
    "nombre": "CPU Dell OptiPlex 7060 Tiny",
    "descripcion": "Intel Core i5 8.ª gen · 16 GB RAM · SSD 512 GB · HDMI · DisplayPort · USB-C · Cargador",
    "precio": 0,
    "condicion": "Seminuevo",
    "imagen": "img/productos/DellOptiplex.png",
    "destacado": false,
    "disponible": true
  },
  {
    "id": 3,
    "categoria": "laptops",
    "nombre": "Laptop Lenovo L14",
    "descripcion": "Intel Core i7 11.ª gen · 16 GB RAM · SSD 512 GB · Pantalla 14\"",
    "precio": 7990,
    "condicion": "Seminuevo",
    "imagen": "img/productos/laptopLENOVOl14.png",
    "destacado": true,
    "disponible": true
  },
  {
    "id": 4,
    "categoria": "laptops",
    "nombre": "Laptop HP EliteBook 745 G6",
    "descripcion": "AMD Ryzen 5 PRO 3500U · 16 GB RAM DDR4 · SSD 512 GB M.2 · Lector de huella · Pantalla 14\"",
    "precio": 0,
    "condicion": "Seminuevo",
    "imagen": "img/productos/LaptopHP-Elitebook-745.png",
    "destacado": false,
    "disponible": true
  },
  {
    "id": 5,
    "categoria": "monitores",
    "nombre": "Monitor Lenovo S24e-10",
    "descripcion": "IPS sin bordes · 24 pulgadas · VGA y HDMI · Con bocinas",
    "precio": 1980,
    "condicion": "Seminuevo",
    "imagen": "img/productos/MonitorLenovo-s24e-10.png",
    "destacado": false,
    "disponible": true
  },
  {
    "id": 6,
    "categoria": "all-in-one",
    "nombre": "All in One HP 600 G5",
    "descripcion": "Intel Core i5 9.ª gen · 8 GB RAM DDR4 · SSD 128 GB M.2 + 500 GB mecánico · Pantalla 24\" IPS · Cámara web",
    "precio": 12000,
    "condicion": "Seminuevo",
    "imagen": "img/productos/All-InOne.png",
    "destacado": false,
    "disponible": true
  },
  {
    "id": 7,
    "categoria": "servidores",
    "nombre": "Servidor HP Z840",
    "descripcion": "Doble procesador Intel Xeon E5-2680 2.4 GHz · 64 GB RAM DDR4 · NVIDIA Quadro P5000 16 GB · SSD 512 GB · Fuente inteligente",
    "precio": 0,
    "condicion": "Seminuevo",
    "imagen": "img/productos/Servidor-HP-z840.png",
    "destacado": true,
    "disponible": true
  },
  {
    "id": 8,
    "categoria": "accesorios",
    "nombre": "Teclados de uso (diferentes marcas)",
    "descripcion": "Teclados de uso · Diferentes marcas",
    "precio": 0,
    "condicion": "Usado",
    "imagen": "img/productos/TECLADOS.png",
    "destacado": false,
    "disponible": true
  },
  {
    "id": 9,
    "categoria": "accesorios",
    "nombre": "Mouse de uso (diferentes marcas)",
    "descripcion": "Mouse de uso · Diferentes marcas",
    "precio": 0,
    "condicion": "Usado",
    "imagen": "img/productos/MOuse.png",
    "destacado": false,
    "disponible": true
  }
];

const PROMOCIONES = [
  {
    "titulo": "Equipo completo para oficina",
    "detalle": "CPU + monitor + teclado y mouse desde $6,999. Listo para trabajar.",
    "etiqueta": "Paquete"
  },
  {
    "titulo": "Envíos a toda la República",
    "detalle": "Reciba su equipo en cualquier parte de México, revisado al 100%.",
    "etiqueta": "Envíos"
  },
  {
    "titulo": "Mantenimiento preventivo",
    "detalle": "Limpieza interna, cambio de pasta térmica y optimización de su equipo.",
    "etiqueta": "Servicio"
  }
];
