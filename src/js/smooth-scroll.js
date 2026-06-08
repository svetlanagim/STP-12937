if ('history' in window) {
  window.history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-scroll-spy]');
  const sections = document.querySelectorAll('[data-scroll-section]');

  function setActiveNavItem(sectionId) {
    navLinks.forEach(link => {
      const parentLi = link.parentElement;
      const href = link.getAttribute('href');

      if (parentLi) {
        parentLi.dataset.active = href === `#${sectionId}` ? 'true' : 'false';
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      window.dispatchEvent(new CustomEvent('menu:close'));

      setActiveNavItem(targetId);

      target.scrollIntoView({ behavior: 'smooth' });

      history.replaceState(null, null, href);
    });
  });

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavItem(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  if (window.location.hash) {
    const cleanUrl = window.location.pathname + window.location.search;
    history.replaceState(null, null, cleanUrl);

    navLinks.forEach(link => {
      const parentLi = link.parentElement;
      if (parentLi) parentLi.dataset.active = 'false';
    });
  }
});
