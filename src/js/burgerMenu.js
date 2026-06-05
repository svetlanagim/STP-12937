const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-menu-link]');
const overlay = document.getElementById('menuOverlay');

const closeMenu = () => {
  menu.dataset.visible = 'close';
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
};

openBtn.addEventListener('click', () => {
  menu.dataset.visible = 'open';
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.dataset.visible === 'open') {
    closeMenu();
  }
});

menu.addEventListener('click', e => {
  if (e.target === menu) {
    closeMenu();
  }
});

overlay.addEventListener('click', closeMenu);
