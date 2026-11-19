// Portfólio Guilherme Henrique. Comportamento descrito em design/v3/DESIGN.md §6.
(() => {
  const d = document, root = d.documentElement;
  const $ = id => d.getElementById(id);
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const sda = !!(window.CSS && CSS.supports('animation-timeline: view()'));

  // Idioma: textos EN em data-en / data-en-label / data-en-alt; o PT é guardado na primeira troca
  //   curriculo.pdf → português, resume.pdf → inglês
  const CV_FILES = {
    pt: { file: 'curriculo.pdf', name: 'Guilherme_Henrique_CV_PT.pdf' },
    en: { file: 'resume.pdf',    name: 'Guilherme_Henrique_CV_EN.pdf' },
  };
  const TITLES = { pt: 'Guilherme Henrique | SDET', en: 'Guilherme Henrique | SDET (Software Development Engineer in Test)' };
  let lang = 'pt';
  const t = (pt, en) => lang === 'en' ? en : pt;
  // key: nome do dataset onde o PT fica guardado; o EN está no mesmo nome com "en" no lugar de "pt"
  const swap = (sel, read, write, key) => d.querySelectorAll(sel).forEach(el => {
    if (!(key in el.dataset)) el.dataset[key] = read(el);
    write(el, el.dataset[lang === 'en' ? key.replace('pt', 'en') : key]);
  });

  // Menu mobile (A15). O <nav> vem antes do botão no DOM: ao abrir, o foco vai ao primeiro link.
  const menu = $('menu'), nav = $('nav'), links = [...nav.querySelectorAll('a')];
  const setMenu = open => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu'));
  };
  menu.addEventListener('click', () => { const open = !nav.classList.contains('open'); setMenu(open); if (open) links[0].focus(); });
  links.forEach(a => a.addEventListener('click', () => setMenu(false)));
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menu.focus(); }
  });

  // A12: seção ativa + indicador deslizante (o hero limpa o ativo)
  const ind = $('ind');
  let active = null;
  const setActive = id => {
    active = id;
    let hit = null;
    links.forEach(a => { const on = a.hash === '#' + id; a.setAttribute('aria-current', on); if (on) hit = a; });
    if (hit) { ind.style.opacity = 1; ind.style.transform = `translateX(${hit.offsetLeft + 12}px) scaleX(${(hit.offsetWidth - 24) / 100})`; }
    else ind.style.opacity = 0;
  };

  const setLang = next => {
    lang = next;
    root.lang = t('pt-BR', 'en');
    d.title = TITLES[lang];
    swap('[data-en]', el => el.textContent, (el, v) => { el.textContent = v; }, 'pt');
    swap('[data-en-label]', el => el.getAttribute('aria-label'), (el, v) => el.setAttribute('aria-label', v), 'ptLabel');
    swap('[data-en-alt]', el => el.alt, (el, v) => { el.alt = v; }, 'ptAlt');
    const btn = $('lang');
    btn.textContent = t('EN', 'PT');
    btn.lang = t('en', 'pt-BR');
    btn.setAttribute('aria-label', t('EN, Switch to English', 'PT, Mudar para português'));
    setMenu(nav.classList.contains('open'));
    setActive(active); // largura dos links mudou
    d.querySelectorAll('.cv-link').forEach(a => { a.href = CV_FILES[lang].file; a.download = CV_FILES[lang].name; });
  };
  $('lang').addEventListener('click', () => setLang(t('en', 'pt')));
  d.querySelectorAll('.cv-link').forEach(a => { a.download = CV_FILES.pt.name; });

  // A11: tema com View Transition circular a partir do botão
  const themeBtn = $('theme');
  themeBtn.addEventListener('click', () => {
    const apply = () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage bloqueado: só não persiste */ }
    };
    if (!d.startViewTransition || mq.matches) return apply();
    const r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    d.startViewTransition(apply).ready.then(() => root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' }));
  });

  // A3 + A6: barra de leitura sem scroll-driven e fundo do header; 1 leitura de scroll por frame
  const rail = $('rail'), hdr = $('hdr');
  let queued = false;
  const update = () => {
    queued = false;
    if (!sda) { const max = root.scrollHeight - innerHeight; rail.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 1) + ')'; }
    hdr.classList.toggle('is-scrolled', scrollY > 40);
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  if (!('IntersectionObserver' in window)) return; // sem IO, a classe .js não é aplicada e tudo aparece no estado final

  // A2: card describe toca 1x ao entrar na viewport
  const spec = $('spec');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { spec.classList.add('play'); o.disconnect(); } }), { threshold: .3 }).observe(spec);

  // A4: conteúdo revela 1x no 1º pixel visível (texto na tela nunca espera scroll). Marca-texto: scroll-driven se houver; senão IO.
  if (!sda) root.classList.add('io');
  const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('seen'); o.unobserve(e.target); } }), { rootMargin: '0px', threshold: 0 });
  d.querySelectorAll(sda ? '.rv' : '.rv,.hl-sc').forEach(el => io.observe(el));

  const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
  ['top', ...links.map(a => a.hash.slice(1))].forEach(id => { const s = $(id); if (s) spy.observe(s); });

  window.ghReady = true; // só depois das animações armadas; o fallback inline do <head> confere isso no load
})();
