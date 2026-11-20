
document.addEventListener("DOMContentLoaded", () => {

    // 1. ACTUALIZAR AUTOMÁTICAMENTE EL AÑO
    const yearElements = document.querySelectorAll("#year, [data-year]");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // 2. BOTÓN PARA IMPRIMIR O GUARDAR COMO PDF
    const printButtons = document.querySelectorAll(
        ".nav-print, [data-print]"
    );

    printButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            window.print();
        });
    });

    // 3. ANIMACIONES AL APARECER EN PANTALLA
    const animatedElements = document.querySelectorAll(
        ".section-heading, .about-content, .about-facts > *, " +
        ".skill-card, .project-card, .timeline-item, " +
        ".language-interest, .contact-section"
    );

    animatedElements.forEach(element => {
        element.classList.add("scroll-reveal");
    });

    // Agregar estilos de animación
    const animationStyles = document.createElement("style");

    animationStyles.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity .75s ease, transform .75s ease;
        }

        .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .scroll-reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(animationStyles);

    // Detectar cuándo aparecen los elementos
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // 4. RESALTAR EL ENLACE DE LA SECCIÓN ACTUAL
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const pageSections = document.querySelectorAll(
        "main section[id], section[id]"
    );

    if ("IntersectionObserver" in window && pageSections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        });

        pageSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // 5. EFECTO SUAVE AL HACER CLIC EN EL MENÚ
    navigationLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});
