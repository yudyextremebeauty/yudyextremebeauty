// ===== Business info =====
const PHONE_E164 = "+14014998644";
const EMAIL = "vivirgirl@icloud.com";

// If the IG/FB usernames are different, change these:
const IG_HANDLE = "YudyExtremeBeauty";
const FB_HANDLE = "YudyExtremeBeauty";

// ===== Services =====
const SERVICES = [
  { name: "Laminado de cejas + tintado", price: 80, duration: "1h20min" },
  { name: "Laminado de cejas", price: 70, duration: "1h" },
  { name: "Tintado de cejas", price: 50, duration: "1h" },
  { name: "Micropimentacion", price: 350, duration: "2h30min" },
  { name: "Microblading", price: 300, duration: "2h" },
  { name: "Depilación de cejas", price: 20, duration: "25min" },
  { name: "Depilación de rostro", price: 30, duration: "30min" },
  { name: "Una cera facial completa con mascarilla de gelatina personalizada", price: 35, duration: "1h" },
  { name: "Depilación axilas", price: 25, duration: "20min" },
  { name: "Depilación de bozo", price: 8, duration: "15min" },
  { name: "Depilación de barbilla", price: 10, duration: "20min" },
  { name: "Depilación de pecho completa", price: 30, duration: "40min" },
  { name: "Depilación de piernas completas", price: 90, duration: "1h20min" },
  { name: "Depilación de media piernas", price: 45, duration: "1h" },
  { name: "Depilación brazos completos", price: 30, duration: "1h" },
  { name: "Depilación de medio brazos", price: 20, duration: "30min" },
  { name: "Depilación íntima", price: 68, duration: "1h" },
  { name: "Depilación íntima + vajacial máscara hidratante + extracción de bellos encarnados", price: 80, duration: "1h30min" },
  { name: "Depilación de espalda baja", price: 30, duration: "30min" },
  { name: "Depilación de espalda completa", price: 45, duration: "1h" },
  { name: "Depilación de estómago", price: 25, duration: "30min" },
  { name: "Depilación de ombligo", price: 10, duration: "15min" }
];

const money = (n) => `$${Number(n).toFixed(0)}`;

function serviceHTML(s) {
  const smsBody = encodeURIComponent(`Hola! Quiero reservar: ${s.name} (${money(s.price)} - ${s.duration}).`);
  const mailSubject = encodeURIComponent(`Reserva - ${s.name}`);
  const mailBody = encodeURIComponent(
    `Hola!\n\nQuiero reservar:\n- Servicio: ${s.name}\n- Precio: ${money(s.price)}\n- Duración: ${s.duration}\n\nGracias!`
  );

  return `
    <article class="service">
      <h3 class="service__name">${s.name}</h3>
      <div class="badges">
        <span class="badge">⏱ ${s.duration}</span>
        <span class="badge">💲 <span class="price">${money(s.price)}</span></span>
      </div>
      <div class="service__actions">
        <a class="mini" href="tel:${PHONE_E164}">📞 Llamar</a>
        <a class="mini" href="sms:${PHONE_E164}?&body=${smsBody}">💬 Texto</a>
        <a class="mini" href="mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}">✉️ Email</a>
      </div>
    </article>
  `;
}

function renderServices(query = "") {
  const grid = document.getElementById("servicesGrid");
  const q = query.trim().toLowerCase();

  const filtered = !q ? SERVICES : SERVICES.filter(s => (s.name || "").toLowerCase().includes(q));

  grid.innerHTML = filtered.length
    ? filtered.map(serviceHTML).join("")
    : `<div class="note"><b>No hay resultados.</b> Prueba otra palabra.</div>`;
}

// Social links
const igUrl = `https://www.instagram.com/${IG_HANDLE}/`;
const fbUrl = `https://www.facebook.com/${FB_HANDLE}`;

["igLink", "igLink2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.href = igUrl; el.textContent = `Instagram: ${IG_HANDLE}`; }
});

["fbLink", "fbLink2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.href = fbUrl; el.textContent = `Facebook: ${FB_HANDLE}`; }
});

// Search
const search = document.getElementById("search");
const clear = document.getElementById("clear");

if (search) search.addEventListener("input", () => renderServices(search.value));
if (clear) clear.addEventListener("click", () => { search.value = ""; renderServices(""); search.focus(); });

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Initial render
renderServices("");
