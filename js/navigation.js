(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  if (!toggle || !menu) return;
  const close = menu.querySelector('.menu-close');
  const indicator = document.querySelector('#section-indicator');
  const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const homeLink = menu.querySelector('a[href="index.html"]');
  const labels = { about: ['ABOUT', '01'], experience: ['EXPERIENCE', '02'], education: ['EDUCATION', '03'], projects: ['WORK', '05'], avatar: ['AI AVATAR', '06'], contact: ['CONTACT', '07'] };
  const setState = (open) => toggle.setAttribute('aria-expanded', String(open));
  const setCurrent = (id) => {
    const home = id === 'home';
    homeLink?.toggleAttribute('aria-current', home);
    sectionLinks.forEach((link) => link.toggleAttribute('aria-current', link.hash === `#${id}`));
    const label = home ? ['HOME', '00'] : labels[id];
    if (indicator && label) indicator.textContent = `${label[0]} · ${label[1]}`;
    toggle.setAttribute('aria-label', `${home ? 'Home' : label?.[0] || 'Page'} — Open site menu`);
  };
  toggle.addEventListener('click', () => { menu.showModal(); setState(true); });
  close.addEventListener('click', () => { menu.close(); setState(false); });
  menu.addEventListener('click', (event) => {
    if (event.target === menu) { menu.close(); setState(false); }
    if (event.target.closest('a')) { menu.close(); setState(false); }
  });
  menu.addEventListener('close', () => { setState(false); toggle.focus({ preventScroll: true }); });
  const sections = [...document.querySelectorAll('main section[id], footer[id]')];
  let frame = 0;
  const updateCurrent = () => {
    frame = 0;
    let current = 'home';
    const marker = innerHeight * .34;
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= marker) current = section.id; });
    setCurrent(current);
  };
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateCurrent); }, { passive: true });
  addEventListener('resize', updateCurrent);
  updateCurrent();
})();
