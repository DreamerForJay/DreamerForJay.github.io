(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  if (!toggle || !menu) return;
  const close = menu.querySelector('.menu-close');
  const setState = (open) => toggle.setAttribute('aria-expanded', String(open));
  toggle.addEventListener('click', () => { menu.showModal(); setState(true); });
  close.addEventListener('click', () => { menu.close(); setState(false); });
  menu.addEventListener('click', (event) => {
    if (event.target === menu) { menu.close(); setState(false); }
    if (event.target.closest('a')) { menu.close(); setState(false); }
  });
  menu.addEventListener('close', () => {
    setState(false);
    toggle.focus({ preventScroll: true });
  });
})();