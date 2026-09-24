(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  if (!toggle || !menu) return;
  const close = menu.querySelector('.menu-close');
  const indicator = document.querySelector('#section-indicator');
  const pipeline = document.querySelector('.scroll-pipeline');
  const pipelineStops = [...(pipeline?.querySelectorAll('.scroll-pipeline-stop') || [])];
  const pipelineCaption = pipeline?.querySelector('.scroll-pipeline-caption');
  const sectionLinks = [...menu.querySelectorAll('a[href^="#"]')];
  const homeLink = menu.querySelector('a[href="index.html"]');
  const labels = { about: ['ABOUT', '01'], research: ['RESEARCH', '02'], experience: ['EXPERIENCE', '03'], education: ['EDUCATION', '04'], competitions: ['COMPETITIONS', '05'], contact: ['CONTACT', '07'] };
  const setState = (open) => toggle.setAttribute('aria-expanded', String(open));
  const setCurrent = (id) => {
    const home = id === 'home';
    homeLink?.toggleAttribute('aria-current', home);
    sectionLinks.forEach((link) => link.toggleAttribute('aria-current', link.hash === `#${id}`));
    pipelineStops.forEach((stop) => {
      const active = stop.dataset.stage === id;
      stop.classList.toggle('is-current', active);
      if (active) stop.setAttribute('aria-current', 'location');
      else stop.removeAttribute('aria-current');
    });
    const label = home ? ['HOME', '00'] : labels[id];
    if (indicator && label) indicator.textContent = `${label[0]} · ${label[1]}`;
    if (pipelineCaption && label) pipelineCaption.textContent = `${label[0]} / ${label[1]}`;
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
    const marker = innerHeight * .34;
    let current = 'home';
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= marker) current = section.id; });
    if (pipeline) {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const positions = pipelineStops.map((stop) => {
        if (stop.dataset.stage === 'home') return 0;
        const section = document.getElementById(stop.dataset.stage);
        return section ? Math.min(scrollable, Math.max(0, section.getBoundingClientRect().top + scrollY - marker)) : scrollable;
      });
      let stage = 0;
      positions.forEach((position, index) => { if (scrollY >= position) stage = index; });
      current = pipelineStops[stage]?.dataset.stage || current;
      const next = positions[stage + 1];
      const fraction = next === undefined ? 0 : Math.min(1, Math.max(0, (scrollY - positions[stage]) / Math.max(1, next - positions[stage])));
      const progress = (stage + fraction) / Math.max(1, pipelineStops.length - 1);
      pipeline.style.setProperty('--scroll-progress', String(progress));
    }
    setCurrent(current);
  };
  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateCurrent); }, { passive: true });
  addEventListener('resize', updateCurrent);
  updateCurrent();
})();
