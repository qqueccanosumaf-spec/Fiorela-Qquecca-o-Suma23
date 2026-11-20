
document.addEventListener("DOMContentLoaded", () => {
  // Actualizar el año automáticamente
  const yearElement = document.getElementById("y");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Botón para imprimir o guardar como PDF
  const printButton = document.getElementById("print");

  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }

  // Animaciones de las secciones
  const sections = document.querySelectorAll(
    ".section, .intro-strip, .contact-section"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    sections.forEach((section) => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }
});
