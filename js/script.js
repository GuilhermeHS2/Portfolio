(() => {
  const d = document, root = d.documentElement, $ = id => d.getElementById(id);
  // Estrelas até mag 3,8 (Yale Bright Star): 6 caracteres base64 por estrela (AR, dec, mag, cor)
  const BSC = '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';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Idioma: textos EN em data-en / data-en-label; o PT é guardado na primeira troca
  const CV_FILES = {
    pt: { file: 'curriculo.pdf', name: 'Guilherme_Henrique_CV_PT.pdf' },
    en: { file: 'resume.pdf',    name: 'Guilherme_Henrique_CV_EN.pdf' },
  };
  const TITLES = { pt: 'Guilherme Henrique | SDET', en: 'Guilherme Henrique | SDET (Software Development Engineer in Test)' };
  let lang = 'pt';
  const t = (pt, en) => lang === 'en' ? en : pt;
  const swap = (sel, read, write, key) => d.querySelectorAll(sel).forEach(el => {
    if (!(key in el.dataset)) el.dataset[key] = read(el);
    write(el, el.dataset[lang === 'en' ? key.replace('pt', 'en') : key]);
  });
  const onLang = [];

  // Menu mobile: ao abrir, foco no primeiro link; Esc fecha e devolve o foco
  const menu = $('menu'), nav = $('nav'), links = [...nav.querySelectorAll('a')];
  const setMenu = (open, back) => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu'));
    if (back) menu.focus();
  };
  menu.addEventListener('click', () => { const open = !nav.classList.contains('open'); setMenu(open); if (open) links[0].focus(); });
  links.forEach(a => a.addEventListener('click', () => setMenu(false)));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false, true); });

  const setLang = next => {
    lang = next;
    root.lang = t('pt-BR', 'en');
    d.title = TITLES[lang];
    swap('[data-en]', el => el.textContent, (el, v) => { el.textContent = v; }, 'pt');
    swap('[data-en-label]', el => el.getAttribute('aria-label'), (el, v) => el.setAttribute('aria-label', v), 'ptLabel');
    const btn = $('lang');
    btn.textContent = t('EN', 'PT');
    btn.lang = t('en', 'pt-BR');
    btn.setAttribute('aria-label', t('EN, Switch to English', 'PT, Mudar para português'));
    setMenu(nav.classList.contains('open'));
    d.querySelectorAll('.cv-link').forEach(a => { a.href = CV_FILES[lang].file; a.download = CV_FILES[lang].name; });
    onLang.forEach(f => f());
  };
  $('lang').addEventListener('click', () => setLang(t('en', 'pt')));

  // Tema: troca direta
  $('theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage bloqueado: só não persiste */ }
  });

  // Orrery: clicar num corpo mostra o fato no painel
  const orr = $('orrery'), panel = $('ia-panel');
  const role = (pt, ptRole, en, enRole) => [[pt, 'agente por papel', [`Sessão do Claude Code com papel de ${ptRole} e instruções próprias.`, 'Os agentes revisam o trabalho uns dos outros.']],
    [en, 'role-based agent', [`A Claude Code session with the ${enRole} role and its own instructions.`, "The agents review each other's work."]]];
  const FACTS = {
    orq: [['Orquestrador', 'agente coordenador', ['Coordena o time de agentes no Maestri.', 'As entregas passam por aprovação humana.']],
          ['Orchestrator', 'coordinating agent', ['Coordinates the agent team in Maestri.', 'Every deliverable goes through human approval.']]],
    dev: role('Dev', 'dev', 'Dev', 'dev'), qa: role('QA', 'QA', 'QA', 'QA'), des: role('Design', 'design', 'Design', 'design'), rev: role('Revisão', 'revisão', 'Review', 'review'),
    pw: [['Playwright', 'servidor MCP', ['Deixa os agentes controlarem o navegador para validar páginas.']], ['Playwright', 'MCP server', ['Lets the agents drive the browser to validate pages.']]],
    cdt: [['Chrome DevTools', 'servidor MCP', ['Deixa os agentes controlarem o navegador.']], ['Chrome DevTools', 'MCP server', ['Lets the agents drive the browser.']]],
    al: [['AccessLint', 'servidor MCP', ['Audita a acessibilidade das páginas.']], ['AccessLint', 'MCP server', ['Audits page accessibility.']]],
    hooks: [['Hooks', 'controle das ações', ['Validam ou bloqueiam ações dos agentes antes de executar.', 'Exemplo: um gate que exige que o agente declare fatos antes de rodar um comando.']],
            ['Hooks', 'action control', ['Validate or block agent actions before they run.', 'Example: a gate that requires the agent to state facts before running a command.']]],
    skills: [['Skills', 'instruções reutilizáveis', ['Instruções que o agente carrega quando a tarefa pede.']], ['Skills', 'reusable instructions', ['Instructions the agent loads when the task calls for them.']]],
    lh: [['Lighthouse', 'avaliação', ['Agentes rodam Lighthouse para avaliar performance.']], ['Lighthouse', 'evaluation', ['Agents run Lighthouse to evaluate performance.']]],
    axe: [['axe', 'avaliação', ['Agentes rodam axe para avaliar acessibilidade.']], ['axe', 'evaluation', ['Agents run axe to evaluate accessibility.']]],
  };
  const el = (tag, text, className = '') => Object.assign(d.createElement(tag), { textContent: text, className });
  let active = orr.querySelector('.pl.on');
  const render = () => {
    const [n, kind, lines] = FACTS[active.dataset.k][lang === 'en' ? 1 : 0];
    panel.replaceChildren(el('h3', n), el('p', kind, 'kind'), ...lines.map(l => el('p', l)));
  };
  onLang.push(render);
  orr.querySelectorAll('.pl').forEach(btn => btn.addEventListener('click', () => {
    if (active === btn) return;
    active.classList.remove('on'); active.setAttribute('aria-pressed', 'false');
    active = btn; btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); orr.classList.add('focus');
    render();
  }));

  // Céu do fundo: pausa com a aba oculta
  const sky = d.querySelector('.space');
  d.addEventListener('visibilitychange', () => sky.classList.toggle('paused', d.hidden));

  if (!('IntersectionObserver' in window)) return; // sem IO, a classe .js não é aplicada e tudo aparece no estado final

  // Carta do céu: céu real de Londrina (tempo sideral local + Yale Bright Star, mag <= 3,8) na hora da visita,
  // girando 1 volta a cada 3,5 min em volta do polo sul celeste; a suíte do Cruzeiro roda 1x
  const chart = () => {
    const cv = $('sky'), ctx = cv.getContext && cv.getContext('2d'), spec = $('spec'); if (!ctx) return;
    const DEG = Math.PI / 180, sL = Math.sin(-23.31 * DEG), cL = Math.cos(-23.31 * DEG), SPIN = 86164 / 210, B = BSC;
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', n = i => A.indexOf(B[i]), ST = [];
    for (let i = 0; i < B.length; i += 6) ST.push([(n(i) * 64 + n(i + 1)) / 10, (n(i + 2) * 64 + n(i + 3)) / 10 - 90, n(i + 4) / 10 - 2, n(i + 5) * 10]);
    const CRUX = [[187.79, -57.11, 1.6], [191.93, -59.69, 1.25], [183.79, -58.75, 2.8], [185.34, -60.4, 3.6], [186.65, -63.1, .8]]; // γ, β, δ, ε, α
    const lst = t => ((280.46061837 + 360.98564736629 * (t / 864e5 + 2440587.5 - 2451545) - 51.16) % 360 + 360) % 360;
    // carta polar centrada no polo sul celeste (até a declinação -15°), olhando para o sul; abaixo do horizonte fica esmaecido
    const pos = (ra, dec, L, R, c) => { const H = (L - ra) * DEG, dd = dec * DEG, r = (90 + dec) / 75 * R;
      return [c + r * Math.sin(H), c - r * Math.cos(H), Math.sin(dd) * sL + Math.cos(dd) * cL * Math.cos(H) > 0]; };
    const GAL = []; for (let l = 0; l <= 360; l += 4) { const q = (122.93 - l) * DEG, g = 27.13 * DEG; // equador galáctico (b = 0) em RA/Dec
      GAL.push([192.86 + Math.atan2(Math.sin(q), -Math.sin(g) * Math.cos(q)) / DEG, Math.asin(Math.cos(g) * Math.cos(q)) / DEG]); }
    const tint = k => { const t = Math.max(0, Math.min(1, (k - 30) / 70)); return `rgb(255,${190 + 60 * t | 0},${150 + 105 * t | 0})`; };
    const t0 = Date.now(), up = CRUX.every(c => pos(c[0], c[1], lst(t0), 1, 0)[2]);
    let W = 0, dpr = 1, on = false, raf = 0, last = 0, drawn = 0, start = 0, elapsed = 0, col = {}, passed = 5;
    const setSpec = () => { spec.innerHTML = !up ? `<span>crux.spec</span> ${t('5 pending: abaixo do horizonte agora', '5 pending: below the horizon right now')}`
      : passed ? `<span>crux.spec</span> <span class="ok">✓ ${passed} passing</span>` : `<span>crux.spec</span> ${t('rodando', 'running')}`; };
    if (!up) setSpec();
    const colors = () => { const cs = getComputedStyle(root), g = v => cs.getPropertyValue(v).trim(); col = { sky: g('--sky'), line: g('--line'), faint: g('--faint'), chalk: g('--chalk'), star: g('--star'), light: root.dataset.theme === 'light' }; };
    const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; cv.width = cv.height = Math.round(W * dpr); };
    const draw = now => {
      const L = lst(t0 + elapsed * SPIN), c = W / 2, R = c * .88, k = W / 340, ts = reduced ? 9 : (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, W);
      ctx.strokeStyle = col.light ? col.chalk : col.line; ctx.globalAlpha = col.light ? .45 : 1; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(c, c, R, 0, 7); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.arc(c, c, R, 0, 7); ctx.clip(); ctx.lineJoin = ctx.lineCap = 'round'; // Via Láctea passando pelo Cruzeiro
      ctx.strokeStyle = col.light ? col.chalk : 'rgb(205,212,226)'; [[34, .045], [16, .05]].forEach(([w, a]) => { ctx.globalAlpha = a; ctx.lineWidth = w * k; ctx.beginPath();
        GAL.forEach((q, i) => { const p = pos(q[0], q[1], L, R, c); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }); ctx.stroke(); });
      ctx.restore(); ctx.strokeStyle = col.light ? col.chalk : col.line; ctx.globalAlpha = col.light ? .3 : 1; ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]); [R * .3, R * .6, R * .9].forEach(r => { ctx.beginPath(); ctx.arc(c, c, r, 0, 7); ctx.stroke(); }); ctx.setLineDash([]); ctx.globalAlpha = 1;
      ctx.strokeStyle = col.faint; ctx.beginPath(); ctx.moveTo(c - 5, c); ctx.lineTo(c + 5, c); ctx.moveTo(c, c - 5); ctx.lineTo(c, c + 5); ctx.stroke(); // polo sul celeste
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const s of ST) { if (s[1] > -15) continue; const p = pos(s[0], s[1], L, R, c);
        ctx.fillStyle = col.light ? col.chalk : tint(s[3]); ctx.globalAlpha = (col.light ? .7 : Math.min(1, .4 + (4 - s[2]) * .2)) * (p[2] ? 1 : .22);
        const r = Math.max(.6, (4.2 - s[2]) * .7 * k); ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.fill();
        if (col.light && s[2] < 1.6) { ctx.strokeStyle = col.chalk; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(p[0] - r - 3, p[1]); ctx.lineTo(p[0] + r + 3, p[1]); ctx.moveTo(p[0], p[1] - r - 3); ctx.lineTo(p[0], p[1] + r + 3); ctx.stroke(); } }
      // Cruzeiro: detalhe ampliado no próprio lugar (convenção de atlas), girando com o céu
      const tp = CRUX.map(s => pos(s[0], s[1], L, R, c)), gx = tp.reduce((a, p) => a + p[0], 0) / 5, gy = tp.reduce((a, p) => a + p[1], 0) / 5;
      const M = 38 * k, f = .74 * M / Math.max(...tp.map(p => Math.hypot(p[0] - gx, p[1] - gy))), cx = tp.map(p => [gx + (p[0] - gx) * f, gy + (p[1] - gy) * f]);
      ctx.globalAlpha = 1; ctx.fillStyle = col.sky; ctx.beginPath(); ctx.arc(gx, gy, M, 0, 7); ctx.fill();
      ctx.strokeStyle = col.light ? col.chalk : col.faint; ctx.globalAlpha = col.light ? .55 : .7; ctx.lineWidth = .8; ctx.stroke();
      const lp = Math.max(0, Math.min(1, (ts - 1.8) / .6)); ctx.strokeStyle = col.light ? col.chalk : col.star; ctx.lineWidth = 1.5; ctx.globalAlpha = .95;
      [[0, 4], [1, 2]].forEach(([i, j]) => { ctx.beginPath(); ctx.moveTo(cx[i][0], cx[i][1]); ctx.lineTo(cx[i][0] + (cx[j][0] - cx[i][0]) * lp, cx[i][1] + (cx[j][1] - cx[i][1]) * lp); ctx.stroke(); });
      ctx.strokeStyle = col.star;
      cx.forEach((p, i) => { const ti = ts - i * .32, r = Math.max(2.2, (4 - CRUX[i][2]) * 1.5 * k);
        if (ti > 0 && ti < .4) { ctx.globalAlpha = 1; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(p[0], p[1], r + 5, ti * 16, ti * 16 + 4.2); ctx.stroke(); }
        ctx.globalAlpha = ti < .4 ? .25 : 1; ctx.fillStyle = col.light ? col.chalk : i ? '#DCE6FF' : '#FFB38A'; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.fill(); });
      const dx = gx - c, dy = gy - c, dl = Math.hypot(dx, dy) || 1;
      ctx.globalAlpha = Math.min(1, Math.max(0, ts - 2.2)); ctx.fillStyle = col.star; ctx.font = `italic ${Math.max(12, 14 * k)}px "Bodoni Moda", serif`;
      ctx.fillText(t('Cruzeiro do Sul', 'Southern Cross'), gx + dx / dl * (M + 14 * k) + dx / dl * 40 * k * Math.abs(dx / dl), gy + dy / dl * (M + 12 * k)); // nome do lado de fora
      ctx.globalAlpha = 1;
    };
    const loop = now => { raf = 0; if (!start) start = now; const intro = now - start < 3e3;
      if (!reduced) elapsed += last ? Math.min(100, now - last) : 0; last = now;
      if (reduced || intro || now - drawn > 48) { draw(now); drawn = now; } // fora da intro, ~20 quadros/s bastam para 1,7°/s
      if (!reduced && on && !d.hidden) raf = requestAnimationFrame(loop); };
    const kick = () => { if (!raf && on && !d.hidden) { last = 0; raf = requestAnimationFrame(loop); } };
    let shown = false;
    const count = () => { // o contador acompanha cada estrela que acende; o leitor de tela ouve só o resultado
      if (reduced || !up) return spec.classList.add('show');
      spec.setAttribute('aria-live', 'off'); passed = 0; setSpec(); spec.classList.add('show');
      for (let i = 0; i < 5; i++) setTimeout(() => { if (i === 4) spec.setAttribute('aria-live', 'polite'); passed = i + 1; setSpec(); }, (i * .32 + .4) * 1e3); };
    new IntersectionObserver(es => { on = es[0].isIntersecting; if (on && !shown) { shown = true; count(); } kick(); }).observe(cv);
    if (window.ResizeObserver) new ResizeObserver(() => { size(); drawn = 0; kick(); }).observe(cv);
    d.addEventListener('visibilitychange', kick);
    const redraw = () => { drawn = 0; kick(); if (reduced) draw(0); };
    $('theme').addEventListener('click', () => { colors(); redraw(); });
    onLang.push(() => { if (!up || passed === 0) setSpec(); redraw(); });
    colors(); size(); if (d.fonts) d.fonts.ready.then(redraw);
  };
  // a carta começa depois do load, em tempo ocioso: o 1º desenho (~500 estrelas) não disputa a thread com o carregamento
  const idle = window.requestIdleCallback || (f => setTimeout(f, 1));
  const go = () => idle(chart, { timeout: 2000 });
  if (d.readyState === 'complete') go(); else addEventListener('load', go);

  // Estrelas cadentes e satélite: nunca sobre o texto do hero; não disparam com a aba oculta
  if (!reduced) {
    const met = d.querySelector('.meteor'), big = d.querySelector('.meteor.big'), sat = d.querySelector('.sat'), hero = $('top'), R = Math.random;
    const go = (node, vars) => { Object.entries(vars).forEach(([k, v]) => node.style.setProperty(k, v)); node.classList.remove('go'); void node.offsetWidth; node.classList.add('go'); };
    const fire = () => {
      const heroOn = hero.getBoundingClientRect().bottom > 0;
      if (!d.hidden && !(heroOn && innerWidth < 1024)) go(met, { '--x': 64 + R() * 30 + 'vw', '--y': 4 + R() * (heroOn ? 22 : 60) + 'vh' });
      setTimeout(fire, 8000 + R() * 7000);
    };
    const fire2 = () => {
      if (!d.hidden && hero.getBoundingClientRect().bottom < 0) go(big, { '--x': 70 + R() * 28 + 'vw', '--y': 3 + R() * 30 + 'vh' });
      setTimeout(fire2, 25000 + R() * 20000);
    };
    const fireSat = () => {
      if (!d.hidden && root.dataset.theme !== 'light') { const side = R() < .5;
        go(sat, { '--x': side ? '-1vw' : 15 + R() * 70 + 'vw', '--y': side ? 4 + R() * 50 + 'vh' : '-1vh',
          '--dx': side ? '102vw' : (R() < .5 ? -1 : 1) * (20 + R() * 25) + 'vw', '--dy': side ? R() * 40 - 15 + 'vh' : '102vh', '--t': 20 + R() * 10 + 's' }); }
      setTimeout(fireSat, 3e4 + R() * 3e4);
    };
    setTimeout(fire, 8000 + R() * 7000); setTimeout(fire2, 25000 + R() * 20000); setTimeout(fireSat, 3e4 + R() * 3e4);
  }

  // Entradas curtas (1x) e seção atual no menu
  if (reduced) d.querySelectorAll('.rv').forEach(e => e.classList.add('in'));
  else { const rv = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    d.querySelectorAll('.rv').forEach(e => rv.observe(e)); }
  const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(a => a.setAttribute('aria-current', a.hash === '#' + e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
  ['top', ...links.map(a => a.hash.slice(1))].forEach(id => spy.observe($(id)));

  window.ghReady = true; // o fallback inline do <head> confere isso no load
})();
