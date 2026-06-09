const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const overlay = document.querySelector('[data-menu-overlay]');

const closeMenu = () => {
  if (menu) menu.dataset.visible = 'close';
  if (overlay) overlay.dataset.visible = 'close';
  document.body.style.overflow = '';
};

const openMenu = () => {
  if (menu) menu.dataset.visible = 'open';
  if (overlay) overlay.dataset.visible = 'open';
  document.body.style.overflow = 'hidden';
};

openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


window.addEventListener('menu:close', closeMenu);