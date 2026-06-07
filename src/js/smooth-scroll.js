document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-scroll-header]');
  const navLinks = document.querySelectorAll('[data-scroll-spy]');
  const sections = document.querySelectorAll('[data-scroll-section]');

  const ACTIVE_CLASS = 'active';

  let isScrolling = false;

  function getHeaderOffset() {
    return header ? header.offsetHeight : 0;
  }

  function smoothScrollToElement(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = getHeaderOffset();
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    isScrolling = true;

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  function setActiveNavItem(sectionId) {
    navLinks.forEach(link => {
      const parentLi = link.parentElement;
      const href = link.getAttribute('href');

      if (parentLi) {
        if (href === `#${sectionId}`) {
          parentLi.classList.add(ACTIVE_CLASS);
        } else {
          parentLi.classList.remove(ACTIVE_CLASS);
        }
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

      setActiveNavItem(targetId);

      smoothScrollToElement(targetId);

      history.replaceState(null, null, href);
    });
  });

  if (sections.length > 0) {
    const topMargin = getHeaderOffset() + 20;

    const observerOptions = {
      root: null,
      rootMargin: `-${topMargin}px 0px -60% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(entries => {
      if (isScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavItem(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      smoothScrollToElement(targetId);
      setActiveNavItem(targetId);
    }, 300);
  }
});
