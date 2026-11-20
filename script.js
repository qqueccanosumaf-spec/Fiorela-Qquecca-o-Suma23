// Barras de nivel: se llenan al aparecer en pantalla
const bars = document.querySelectorAll('.bars i');
bars.forEach(b => b.style.setProperty('--w', b.dataset.level + '%'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
} else bars.forEach(b => b.classList.add('on'));

// Botón para guardar como PDF (Imprimir → Guardar como PDF)
document.getElementById('print').addEventListener('click', () => window.print());

// Año automático en el pie
document.getElementById('y').textContent = new Date().getFullYear();
