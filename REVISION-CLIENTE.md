# Documento de revisión por secciones — Sitio web PC Y ASOCIADOS

**Propósito:** revisar con el cliente cada sección del sitio y cada elemento que la conforma.
Para cada elemento, marcar una opción:

- ✅ **Me gusta** — se queda como está
- ❌ **Se quita** — se elimina del sitio
- ✏️ **Se corrige** — se queda pero con cambios (anotar el cambio en la última columna)

**Fecha de revisión:** ____ / ____ / ______
**Revisado por:** _______________________________

---

## PÁGINA PRINCIPAL (`index.html`)

### 1. HEADER (barra de navegación superior fija)

Barra azul marino que permanece visible al hacer scroll, en todas las páginas.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 1.1 | Logo (SVG provisional) | Ícono de monitor con código + texto "PC Y ASOCIADOS / Tu mejor opción" | ☐ | ☐ | ☐ | |
| 1.2 | Menú de navegación | Enlaces: Catálogo, Promociones, Servicios, Nosotros, Preguntas, Blog | ☐ | ☐ | ☐ | |
| 1.3 | Botón CTA del menú | Botón cian "Contacto" (lleva a la sección de contacto) | ☐ | ☐ | ☐ | |
| 1.4 | Menú hamburguesa (móvil) | Ícono ☰ que despliega el menú en celulares | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** logo por el PNG real, orden y nombres de los enlaces, color del botón, agregar/quitar enlaces.

---

### 2. HERO (sección de portada, lo primero que se ve)

Fondo degradado azul marino con círculo cian decorativo.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 2.1 | Badge superior | Etiqueta "Equipo de cómputo nuevo y seminuevo" | ☐ | ☐ | ☐ | |
| 2.2 | Título H1 | "¿Buscas el mejor equipo a un excelente precio? Ya no busques más." (frase promocional del cuestionario) | ☐ | ☐ | ☐ | |
| 2.3 | Subtítulo / párrafo | Descripción: laptops, escritorio, monitores y accesorios, revisados al 100%, garantía 3 meses, envíos nacionales | ☐ | ☐ | ☐ | |
| 2.4 | Botón primario | Botón cian "Ver catálogo" (scroll al catálogo) | ☐ | ☐ | ☐ | |
| 2.5 | Botón de WhatsApp | Botón verde "Cotizar por WhatsApp" con ícono (abre chat al 55 4932 9345 con mensaje prellenado) | ☐ | ☐ | ☐ | |
| 2.6 | Tarjeta lateral de beneficios | "Por qué comprar con nosotros": 5 puntos con palomitas (revisados 100%, garantía, envíos, facturación/meses, soporte). *Se oculta en móvil* | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** textos, frase principal, qué botones aparecen y a dónde llevan, los 5 puntos de la tarjeta, agregar foto o video de fondo.

---

### 3. TRUST BAR (barra de confianza)

Franja gris claro debajo del hero, con 4 datos en columnas.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 3.1 | Dato 1 | "Garantía 3 meses — en todos los equipos*" | ☐ | ☐ | ☐ | |
| 3.2 | Dato 2 | "Revisados al 100% — antes de entregarse" | ☐ | ☐ | ☐ | |
| 3.3 | Dato 3 | "Envíos nacionales — a toda la República" | ☐ | ☐ | ☐ | |
| 3.4 | Dato 4 | "Tienda física — en Coyoacán, CDMX" | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** los 4 textos, el orden, agregar íconos, cambiar por otros datos (ej. años de experiencia, facturación).

---

### 4. SECCIÓN CATÁLOGO (`#catalogo`)

Catálogo de productos con filtros. Los productos se editan en `js/productos.js` (actualmente son **productos de muestra**).

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 4.1 | Título de sección | Kicker "CATÁLOGO" + H2 "Laptops, equipos de escritorio, monitores y accesorios" + texto introductorio | ☐ | ☐ | ☐ | |
| 4.2 | Botones de filtro | Píldoras: Todos / Laptops / Escritorio-CPU / Monitores / Accesorios | ☐ | ☐ | ☐ | |
| 4.3 | Cards de producto (grid) | 12 productos de muestra; cada card tiene: badge Nuevo/Seminuevo, ícono o foto, nombre, especificaciones, precio MXN | ☐ | ☐ | ☐ | |
| 4.4 | Badge de condición | Etiqueta "NUEVO" (cian) o "SEMINUEVO" (azul) en la esquina de cada card | ☐ | ☐ | ☐ | |
| 4.5 | Nota de precio por card | "Precio sujeto a cambio · Garantía 3 meses*" | ☐ | ☐ | ☐ | |
| 4.6 | Botón de WhatsApp por card | Botón verde "Preguntar por WhatsApp" (abre chat con el nombre y precio del producto ya escritos) | ☐ | ☐ | ☐ | |
| 4.7 | Disclaimer del catálogo | Texto al pie: precios pueden cambiar, garantía no aplica en baterías, consultar existencias | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** productos y precios reales (los actuales son de ejemplo), fotos reales en lugar de íconos, categorías de los filtros, si se muestran o no los precios, texto del botón.

---
INSTRUCCIONES IMPORTANTES PARA PODER MOSTRAR EL PROYECTO

### 5. SECCIÓN PROMOCIONES (`#promociones`)

Fondo gris claro. Las promociones se editan en `js/productos.js` (lista `PROMOCIONES`).

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 5.1 | Título de sección | Kicker "PROMOCIONES" + H2 "Promociones activas" + subtítulo | ☐ | ☐ | ☐ | |
| 5.2 | Card promo 1 | Etiqueta "Paquete" — "Equipo completo para oficina" desde $6,999 | ☐ | ☐ | ☐ | |
| 5.3 | Card promo 2 | Etiqueta "Envíos" — "Envíos a toda la República" | ☐ | ☐ | ☐ | |
| 5.4 | Card promo 3 | Etiqueta "Servicio" — "Mantenimiento preventivo" | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** textos y cantidad de promociones, agregar vigencias/fechas, agregar imágenes o precios tachados.

---

### 6. SECCIÓN SERVICIOS (`#servicios`)

Grid de 6 cards blancas con borde superior cian e ícono.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 6.1 | Título de sección | Kicker "SERVICIOS" + H2 "Más que venta: soporte completo para tu equipo" | ☐ | ☐ | ☐ | |
| 6.2 | Card "Reparación de equipos" | Diagnóstico y reparación de laptops y escritorio | ☐ | ☐ | ☐ | |
| 6.3 | Card "Mantenimiento preventivo y correctivo" | Limpieza, pasta térmica, optimización, actualización | ☐ | ☐ | ☐ | |
| 6.4 | Card "Asesoría personalizada" | Ayuda para elegir equipo según uso y presupuesto | ☐ | ☐ | ☐ | |
| 6.5 | Card "Entrega a domicilio" | CDMX + envíos nacionales, técnico asiste por servicio | ☐ | ☐ | ☐ | |
| 6.6 | Card "Facturación" | Emisión de factura para oficinas/negocios | ☐ | ☐ | ☐ | |
| 6.7 | Card "Pagos a meses" | Efectivo, transferencia, terminal, planes a meses | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** textos, íconos, quitar o agregar servicios, agregar precios de servicios.

---

### 7. SECCIÓN NOSOTROS (`#nosotros`)

Fondo gris claro. Incluye la descripción larga del negocio y el bloque "por qué elegirnos".

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 7.1 | Título + descripción larga | H2 con el eslogan "PC y Asociados, tu mejor opción" + texto del cuestionario (producto nacional e importado, ambiente laboral, precios bajos) | ☐ | ☐ | ☐ | |
| 7.2 | Item numerado 1 | "Precio, calidad y servicio" | ☐ | ☐ | ☐ | |
| 7.3 | Item numerado 2 | "Seguridad en tu compra" (revisión 100%, garantía por escrito) | ☐ | ☐ | ☐ | |
| 7.4 | Item numerado 3 | "Atención cercana" (WhatsApp y oficina, 9 am – 6 pm) | ☐ | ☐ | ☐ | |
| 7.5 | Item numerado 4 | "Soporte postventa" | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** textos, agregar fotos del local/equipo de trabajo, agregar testimonios de clientes (el cliente dijo tener reseñas).

---

### 8. SECCIÓN FAQ (`#faq`) — preguntas frecuentes

Acordeón desplegable (componente `<details>`), 7 preguntas basadas en el cuestionario.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 8.1 | Pregunta 1 | "¿Tienen el producto en existencia?" | ☐ | ☐ | ☐ | |
| 8.2 | Pregunta 2 | "¿Dónde se encuentran?" (dirección y horario completos) | ☐ | ☐ | ☐ | |
| 8.3 | Pregunta 3 | "¿Los equipos tienen garantía?" (3 meses, no baterías) | ☐ | ☐ | ☐ | |
| 8.4 | Pregunta 4 | "¿El teclado es en español o americano?" | ☐ | ☐ | ☐ | |
| 8.5 | Pregunta 5 | "¿Los equipos usados vienen en buen estado?" | ☐ | ☐ | ☐ | |
| 8.6 | Pregunta 6 | "¿Hacen envíos? ¿A dónde?" | ☐ | ☐ | ☐ | |
| 8.7 | Pregunta 7 | "¿Qué formas de pago aceptan?" | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** redacción de preguntas y respuestas, agregar/quitar preguntas.

---

### 9. SECCIÓN CONTACTO (`#contacto`)

Fondo gris claro, dos columnas: datos de contacto + formulario. Mapa abajo a lo ancho.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 9.1 | Card "Dirección" | Privada Vicente García Torres #6, Col. San Lucas, Coyoacán, CP 04030, CDMX | ☐ | ☐ | ☐ | |
| 9.2 | Card "Horario" | Lunes a viernes, 9:00 am – 6:00 pm · Sábados, 9:00 am – 2:00 pm | ☐ | ☐ | ☐ | |
| 9.3 | Card "Teléfono y WhatsApp" | 55 4932 9345 (enlace a WhatsApp con mensaje prellenado) | ☐ | ☐ | ☐ | |
| 9.4 | Card "Correo" | contacto-ventas@pcyasociados.com (enlace mailto) | ☐ | ☐ | ☐ | |
| 9.5 | Formulario de cotización | Campos: Nombre*, Teléfono*, ¿Qué te interesa?* (select con 6 opciones), Mensaje | ☐ | ☐ | ☐ | |
| 9.6 | Botón submit del formulario | Botón azul "Enviar por WhatsApp" — arma el mensaje y abre el chat (no envía correo) | ☐ | ☐ | ☐ | |
| 9.7 | Mapa embebido (iframe Google Maps) | Ubicación de la dirección de Coyoacán, 380 px de alto | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** datos de contacto, campos del formulario, que el formulario envíe correo en vez de WhatsApp, tamaño/posición del mapa.

---

### 10. FOOTER (pie de página)

Fondo azul marino, 4 columnas + línea inferior de derechos.

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 10.1 | Columna 1 — Marca | Nombre, descripción corta y eslogan en cian: "PC y Asociados, tu mejor opción" | ☐ | ☐ | ☐ | |
| 10.2 | Columna 2 — Secciones | Enlaces internos: Catálogo, Promociones, Servicios, Blog, Contacto | ☐ | ☐ | ☐ | |
| 10.3 | Columna 3 — Información | Enlaces legales: Aviso de privacidad, Garantía y devoluciones, Entrega, Formas de pago | ☐ | ☐ | ☐ | |
| 10.4 | Columna 4 — Contacto | Dirección, horario, WhatsApp y correo | ☐ | ☐ | ☐ | |
| 10.5 | Copyright bar | "© 2026 PC y Asociados… Los precios pueden cambiar sin previo aviso." (año automático) | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** textos, columnas, agregar redes sociales (Facebook, Instagram, TikTok — el cliente los mencionó pero no dio enlaces).

---

## ELEMENTOS FLOTANTES (visibles en todas las páginas)

### 11. BOTÓN FLOTANTE DE WHATSAPP (esquina inferior derecha)

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 11.1 | Botón circular verde con logo de WhatsApp | Fijo en pantalla; abre chat al 55 4932 9345 con mensaje "Hola, vi su página web…" | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** número al que llega, mensaje prellenado, posición (izquierda/derecha), tamaño, agregar texto junto al botón.

### 12. COOKIE BANNER (aviso de cookies)

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 12.1 | Banner inferior centrado | Texto sobre cookies (Google Analytics y Meta Pixel) + enlace al aviso de privacidad | ☐ | ☐ | ☐ | |
| 12.2 | Botones Aceptar / Rechazar | "Aceptar" activa la medición; "Rechazar" navega sin medición; la elección se recuerda | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** redacción del texto, colores de botones. *(Se recomienda NO quitarlo: es requisito de privacidad para usar Analytics/Pixel.)*

---

## PÁGINAS SECUNDARIAS

### 13. BLOG (`blog.html` + 3 artículos)

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 13.1 | Página índice del blog | Grid de 3 cards con fecha, título, resumen y enlace "Leer artículo" | ☐ | ☐ | ☐ | |
| 13.2 | Artículo 1 | "¿Laptop nueva o seminueva de ambiente laboral? Guía para decidir" (`blog-laptop-nueva-o-usada.html`) | ☐ | ☐ | ☐ | |
| 13.3 | Artículo 2 | "5 señales de que tu computadora necesita mantenimiento" (`blog-senales-mantenimiento.html`) | ☐ | ☐ | ☐ | |
| 13.4 | Artículo 3 | "Cómo elegir el equipo ideal para tu oficina o negocio" (`blog-equipo-para-oficina.html`) | ☐ | ☐ | ☐ | |

**Qué se puede cambiar aquí:** títulos y contenido de los artículos, agregar imágenes, frecuencia de publicación, temas nuevos.

### 14. PÁGINAS LEGALES

| # | Elemento | Contenido actual | ✅ | ❌ | ✏️ | ¿Qué cambiar? |
|---|----------|------------------|----|----|----|---------------|
| 14.1 | Aviso de privacidad (`aviso-privacidad.html`) | Texto base (datos que se recaban, finalidades, cookies, derechos ARCO). **Pendiente revisión por asesor legal** | ☐ | ☐ | ☐ | |
| 14.2 | Políticas comerciales (`politicas.html`) | Garantía 3 meses (sin baterías), devoluciones con número de serie, entrega, formas de pago, nota de precios | ☐ | ☐ | ☐ | |

---

## ELEMENTOS TÉCNICOS NO VISIBLES (informar al cliente, no requieren su aprobación visual)

| # | Elemento | Estado |
|---|----------|--------|
| 15.1 | SEO on-page (meta title, description, keywords, Open Graph, schema LocalBusiness) | Configurado con dominio de ejemplo — falta dominio real |
| 15.2 | Google Analytics 4 (`js/analytics.js`) | Preparado — falta ID real |
| 15.3 | Meta Pixel (`js/analytics.js`) | Preparado — falta ID real |
| 15.4 | Google Search Console (meta de verificación en `index.html`) | Preparado — falta código real |
| 15.5 | `sitemap.xml` y `robots.txt` | Creados |
| 15.6 | Catálogo editable (`js/productos.js`) | Funcional — faltan productos y precios reales |
| 15.7 | Diseño responsive (celular, tablet, escritorio) | Implementado |

---

## MATERIAL PENDIENTE DE PARTE DEL CLIENTE

- ☐ Logo en PNG con fondo transparente
- ☐ Fotos reales de productos
- ☐ Foto de la oficina/local (opcional, para sección Nosotros)
- ☐ Videos promocionales (dijeron tener — definir dónde colocarlos)
- ☐ Inventario y precios reales para el catálogo
- ☐ Enlaces de redes sociales (Facebook, Instagram, TikTok)
- ☐ Dominio que van a comprar
- ☐ Confirmar días de atención (¿lunes a sábado o lunes a viernes?)
- ☐ Definir a cuál de los 3 números llegan el botón flotante y el formulario

---

**Firma del cliente:** _______________________  **Fecha:** ____ / ____ / ______
