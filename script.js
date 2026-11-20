
document.addEventListener("DOMContentLoaded", () => {

  // Año automático del pie de página
  const year = document.getElementById("y");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Menú desplegable para celulares
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (menuButton && nav) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
      });
    });

    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  // Animaciones al desplazarse
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-main, .value-card, .skill-card, " +
    ".project-card, .education-item, .extra-card, .contact-section"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
      item.classList.add("scroll-reveal");
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Resaltar la sección actual en el menú
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Botón para imprimir o guardar en PDF
  document.querySelectorAll("[data-print]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      window.print();
    });
  });

});
