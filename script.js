document.addEventListener('DOMContentLoaded', () => {

  // --- Revelado suave de cada sección al entrar en pantalla ---
  const sections = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(section => revealObserver.observe(section));

  // --- Resaltado del enlace activo en el menú según la sección visible ---
  const navLinks = document.querySelectorAll('#site-nav a');
  const navMap = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('data-nav');
    navMap.set(id, link);
  });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navMap.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));

});
