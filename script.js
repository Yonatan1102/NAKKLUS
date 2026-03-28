/* ═══════════════════════════════════════════════
   NAKKLUS — script.js
   ═══════════════════════════════════════════════ */

// ── Tiendas Dollarama por ciudad ──────────────────────────────────────────────
const tiendas = {
  toronto: [
    { nombre: "Dollarama – Yonge & Bloor", direccion: "55 Bloor St W, Toronto, ON",   horario: "Lun–Dom 9am–9pm",  mapQ: "Dollarama+55+Bloor+St+W+Toronto" },
    { nombre: "Dollarama – Queen St W",    direccion: "390 Queen St W, Toronto, ON",   horario: "Lun–Dom 9am–9pm",  mapQ: "Dollarama+390+Queen+St+W+Toronto" },
    { nombre: "Dollarama – Dundas Square", direccion: "10 Dundas St E, Toronto, ON",   horario: "Lun–Dom 9am–10pm", mapQ: "Dollarama+10+Dundas+St+E+Toronto" },
    { nombre: "Dollarama – Yonge St",      direccion: "730 Yonge St, Toronto, ON",     horario: "Lun–Dom 9am–9pm",  mapQ: "Dollarama+730+Yonge+St+Toronto" },
  ],
  montreal: [
    { nombre: "Dollarama – Ste-Catherine", direccion: "677 Rue Ste-Catherine O, Montréal, QC", horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+677+Rue+Ste-Catherine+Montreal" },
    { nombre: "Dollarama – Jean-Talon",    direccion: "7175 Rue Jean-Talon E, Montréal, QC",   horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+7175+Rue+Jean-Talon+Montreal" },
  ],
  vancouver: [
    { nombre: "Dollarama – Robson St",  direccion: "1128 Robson St, Vancouver, BC",  horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+1128+Robson+St+Vancouver" },
    { nombre: "Dollarama – Broadway",   direccion: "2985 W Broadway, Vancouver, BC", horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+2985+W+Broadway+Vancouver" },
  ],
  calgary: [
    { nombre: "Dollarama – Centre St",     direccion: "910 Centre St N, Calgary, AB",     horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+910+Centre+St+N+Calgary" },
    { nombre: "Dollarama – Macleod Trail", direccion: "6455 Macleod Trail S, Calgary, AB", horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+6455+Macleod+Trail+Calgary" },
  ],
  ottawa: [
    { nombre: "Dollarama – Rideau St", direccion: "73 Rideau St, Ottawa, ON",   horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+73+Rideau+St+Ottawa" },
    { nombre: "Dollarama – Bank St",   direccion: "1770 Bank St, Ottawa, ON",   horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+1770+Bank+St+Ottawa" },
  ],
  winnipeg: [
    { nombre: "Dollarama – Portage Ave", direccion: "1485 Portage Ave, Winnipeg, MB", horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+1485+Portage+Ave+Winnipeg" },
  ],
  edmonton: [
    { nombre: "Dollarama – Jasper Ave", direccion: "10182 Jasper Ave, Edmonton, AB",  horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+10182+Jasper+Ave+Edmonton" },
    { nombre: "Dollarama – Whyte Ave",  direccion: "8210 Gateway Blvd, Edmonton, AB", horario: "Lun–Dom 9am–9pm", mapQ: "Dollarama+8210+Gateway+Blvd+Edmonton" },
  ],
};

// ── Buscar tiendas ────────────────────────────────────────────────────────────
function buscar() {
  const input = document.getElementById("ciudad").value.trim().toLowerCase();
  const panel = document.getElementById("panel-tiendas");
  const lista = document.getElementById("lista-tiendas");
  const mapa  = document.getElementById("mapa");

  const key = Object.keys(tiendas).find(c => input.includes(c) || c.includes(input));

  if (!key) {
    panel.style.display = "none";
    mapa.src = `https://maps.google.com/maps?q=Dollarama+${encodeURIComponent(input)}+Canada&output=embed`;
    mostrarMensaje("No encontramos resultados exactos. Mostrando búsqueda general.");
    return;
  }

  const resultados = tiendas[key];
  seleccionarTienda(resultados[0], 0, key);

  lista.innerHTML = resultados.map((t, i) => `
    <div class="tienda-item" id="item-${i}" onclick="seleccionarTienda(tiendas['${key}'][${i}], ${i}, '${key}')">
      <div class="tienda-icon">☕</div>
      <div class="tienda-info">
        <h4>${t.nombre}</h4>
        <p>📍 ${t.direccion}</p>
        <p>🕐 ${t.horario}</p>
      </div>
    </div>
  `).join('');

  panel.style.display = "flex";
  ocultarMensaje();
}

// ── Seleccionar tienda en mapa ────────────────────────────────────────────────
function seleccionarTienda(tienda, index, key) {
  document.getElementById("mapa").src =
    `https://maps.google.com/maps?q=${tienda.mapQ}&output=embed`;

  document.querySelectorAll(".tienda-item").forEach(el => el.classList.remove("activo"));
  const item = document.getElementById(`item-${index}`);
  if (item) item.classList.add("activo");
}

// ── Scroll a sección tiendas ──────────────────────────────────────────────────
function scrollTienda() {
  document.getElementById("tiendas").scrollIntoView({ behavior: "smooth" });
}

// ── Menú hamburguesa ──────────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
  document.querySelector(".menu-toggle").classList.toggle("open");
}

// ── Mensajes auxiliares ───────────────────────────────────────────────────────
function mostrarMensaje(texto) {
  let msg = document.getElementById("mapa-mensaje");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "mapa-mensaje";
    msg.style.cssText = "color:#c8a96a;margin-top:10px;font-style:italic;font-size:13px;";
    document.querySelector(".buscador").after(msg);
  }
  msg.textContent = texto;
}

function ocultarMensaje() {
  const msg = document.getElementById("mapa-mensaje");
  if (msg) msg.textContent = "";
}

// ── Buscar con Enter ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("ciudad");
  if (input) input.addEventListener("keydown", e => { if (e.key === "Enter") buscar(); });
});

// ── Datos del modal ───────────────────────────────────────────────────────────
const modalData = {
  producto: {
    titulo: "☕ Pura Conversa — Café Liofilizado",
    img: "imagenes/PRODUCTO.jpeg",
    parrafos: [
      "Pura Conversa es un café colombiano liofilizado que conserva todas las características del café recién tostado mediante tecnología avanzada de liofilización.",
      "<strong>100% colombiano</strong>: Sin mezclas ni aditivos, puro sabor de origen.",
      "<ul><li>Preparación rápida y práctica, ideal para el día a día</li><li>Alta solubilidad en agua caliente o fría</li><li>Larga vida útil hasta 24 meses sin pérdida de calidad</li><li>Versátil para bebidas frías, calientes o recetas especiales</li></ul>",
      "<blockquote>El mejor café colombiano, listo cuando tú lo estés.</blockquote>",
    ],
    tags: ["Liofilizado", "100% Colombiano", "95g", "Sin aditivos"],
  },
  origen: {
    titulo: "🌄 Sostenibilidad — Fincas Colombianas",
    img: "imagenes/origen.png",
    parrafos: [
      "NAKKLU'S busca ofrecer café colombiano con un impacto positivo, basando su modelo en la sostenibilidad, la responsabilidad y el respeto por los productores.",
      "<strong>Comercio justo</strong>: Apoyan economías rurales mediante compras responsables y relaciones duraderas con productores.",
      "<strong>Producción consciente</strong>: Reducen desperdicios y el impacto ambiental optimizando recursos sin perder calidad.",
      "<strong>Empaque inteligente</strong>: Envases reutilizables y amigables con el medio ambiente.",
      "<blockquote>Cada taza de Pura Conversa es un homenaje a la dedicación de las familias caficultoras colombianas.</blockquote>",
    ],
    tags: ["Clima ideal", "Familias caficultoras", "Colombia", "Comercio justo"],
  },
  grano: {
    titulo: "🧊 Liofilización — Tecnología de Calidad",
    img: "imagenes/liofilizado.png",
    parrafos: [
      "El proceso de liofilización permite preservar al máximo el aroma y sabor original del café, a diferencia del café instantáneo convencional.",
      "<ul><li>Café 100% arábica colombiano puro</li><li>Proceso de congelación y sublimación que preserva aromas</li><li>Alta solubilidad tanto en agua caliente como fría</li><li>Perfil de sabor equilibrado, suave y aromático</li></ul>",
    ],
    tags: ["Arábica", "Liofilizado", "Sin aditivos", "Premium"],
  },
  sabor: {
    titulo: "✨ Perfil de Sabor",
    img: "imagenes/suelo.jpg",
    parrafos: [
      "Pura Conversa tiene un perfil sensorial único: aroma intenso con notas a caramelo y frutos secos, sabor balanceado con acidez suave y un cuerpo medio que lo hace perfecto para cualquier momento del día.",
    ],
    tags: ["Aroma intenso", "Sabor balanceado", "Acidez suave", "Cuerpo medio", "Notas a caramelo"],
  },
  presentacion: {
    titulo: "🫙 Presentación Premium",
    img: "imagenes/PRODUCTO2.jpeg",
    parrafos: [
      "Nuestro café viene en un elegante envase de vidrio reutilizable de 95g. El frasco conserva el aroma y frescura del café liofilizado, y puede reutilizarse después — una elección consciente con el medio ambiente.",
    ],
    tags: ["Vidrio reutilizable", "95g", "Café liofilizado", "Eco-friendly", "Hermético"],
  },
};

// ── Abrir modal ───────────────────────────────────────────────────────────────
function abrirModal(tipo) {
  const data = modalData[tipo];
  if (!data) return;

  document.getElementById("modal-img").src = data.img;
  document.getElementById("modal-titulo").textContent = data.titulo;
  document.getElementById("modal-texto").innerHTML = data.parrafos.map(p => `<p>${p}</p>`).join('');
  document.getElementById("modal-lista").innerHTML = data.tags.map(t => `<li>${t}</li>`).join('');

  document.getElementById("modal-overlay").classList.add("activo");
  document.body.style.overflow = "hidden";
}

// ── Cerrar modal ──────────────────────────────────────────────────────────────
function cerrarModal() {
  document.getElementById("modal-overlay").classList.remove("activo");
  document.body.style.overflow = "";
}

// Cerrar con Escape
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });
