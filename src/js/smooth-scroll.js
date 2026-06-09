if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-scroll-spy]');
  const sections = document.querySelectorAll('[data-scroll-section]');

  function setActiveNavItem(sectionId) {
    navLinks.forEach(link => {
      const li = link.parentElement;
      const linkId = link.getAttribute('href')?.replace('#', '');

      if (li) {
        li.dataset.active = linkId === sectionId ? 'true' : 'false';
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      window.dispatchEvent(new Event('menu:close'));

      setActiveNavItem(id);

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id) {
        setActiveNavItem(entry.target.id);
      }
    });
  });

  sections.forEach(section => observer.observe(section));
});
