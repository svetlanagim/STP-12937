const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-scroll-spy]');
const overlay = document.getElementById('[data-menu-overlay]');

const closeMenu = () => {
  if (menu) menu.dataset.visible = 'close';
  if (overlay) overlay.dataset.visible = 'close';
  document.body.style.overflow = '';
};

if (openBtn) {
  openBtn.addEventListener('click', () => {
    if (menu) menu.dataset.visible = 'open';
    if (overlay) overlay.dataset.visible = 'open';
    document.body.style.overflow = 'hidden';
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu && menu.dataset.visible === 'open') {
    closeMenu();
  }
});

if (menu) {
  menu.addEventListener('click', e => {
    if (e.target === menu) {
      closeMenu();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

window.addEventListener('menu:close', closeMenu);
