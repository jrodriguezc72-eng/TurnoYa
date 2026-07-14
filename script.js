const form = document.getElementById("demo-form");
const feedback = document.getElementById("form-feedback");
const yearLabel = document.querySelector("[data-year]");
const points = document.querySelectorAll(".map-point");
const mapTitle = document.getElementById("map-title");
const mapDescription = document.getElementById("map-description");
const mapCount = document.getElementById("map-count");
const mapAvailability = document.getElementById("map-availability");
const mapSpecialties = document.getElementById("map-specialties");
const mapNote = document.getElementById("map-note");

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "Gracias. Nos pondremos en contacto para coordinar una demo.";
    form.reset();
  });
}

if (points.length && mapTitle && mapDescription && mapCount && mapAvailability && mapSpecialties && mapNote) {
  const setLocationDetails = (point) => {
    points.forEach((item) => item.classList.remove("active"));
    point.classList.add("active");

    mapTitle.textContent = point.dataset.location || "Ubicación";
    mapDescription.textContent = point.dataset.note || "Cobertura disponible para contratación y seguimiento.";
    mapCount.textContent = point.dataset.count || "0";
    mapAvailability.textContent = point.dataset.availability || "Media";
    mapSpecialties.textContent = point.dataset.specialties || "Enfermería y apoyo clínico";
    mapNote.textContent = `${point.dataset.location || "Región"} preparada para seguimiento, contratación y coordinación operativa.`;
  };

  points.forEach((point) => {
    point.addEventListener("click", () => setLocationDetails(point));
    point.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setLocationDetails(point);
      }
    });
  });

  setLocationDetails(points[0]);
}

function showModal(title, message) {
  const overlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const closeButton = document.getElementById('modal-close');
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  overlay.classList.remove('hidden');
  closeButton.focus();
}

document.getElementById('modal-close')?.addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.add('hidden');
});

document.getElementById('modal-overlay')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.add('hidden');
  }
});

const reportButtons = document.querySelectorAll('.btn-report');
reportButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showModal(
      'Reporte recibido',
      'Gracias. Nuestro equipo revisará el perfil sospechoso y te informará si es necesario bloquearlo.'
    );
  });
});

const detailButtons = document.querySelectorAll('.btn-show-details');
detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.profile-card');
    const details = card?.querySelector('.protected-details');
    if (details) {
      details.classList.toggle('hidden');
      button.textContent = details.classList.contains('hidden') ? 'Ver detalles protegidos' : 'Ocultar detalles';
    }
  });
});
