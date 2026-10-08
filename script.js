/* Irene Cuesta — Template 01 · Minimalista */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Theme ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  function setTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (persist) store('ic-theme', t);
  }
  themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSchemeChange = function (e) {
    var saved = store('ic-theme');
    if (saved !== 'light' && saved !== 'dark') setTheme(e.matches ? 'dark' : 'light', false);
  };
  if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
  else if (mq.addListener) mq.addListener(onSchemeChange);

  /* ---------- i18n ---------- */
  var dict = {
    es: {
      'nav.work': 'Trabajos', 'nav.services': 'Servicios', 'nav.about': 'Sobre mí', 'nav.experience': 'Experiencia', 'nav.contact': '¿Hablamos?',
      'hero.role': 'Especialista en marketing digital',
      'hero.place': 'Gijón, Asturias',
      'hero.time': 'Hora local',
      'hero.status': 'Disponible para proyectos · Oct 2026',
      'hero.lead': 'Te doy la bienvenida a mi archivo dedicado al marketing digital, las redes sociales y el arte de comunicar con mucha personalidad.',
      'hero.ctaWork': 'Ver trabajos', 'hero.ctaContact': '¿Hablamos?',
      'hero.location': 'Gijón · Disponible en remoto',
      'kpi.followers': 'Seguidores con redes y Meta Ads', 'kpi.seo': 'Alcance orgánico gracias al SEO',
      'kpi.meta': 'Cuentas de Meta gestionadas', 'kpi.views': 'Reproducciones en Instagram · Janel Cuesta',
      'work.title': 'trabajos', 'work.desc': 'Donde la estrategia se fusiona con la creatividad.',
      'filter.all': 'Todos', 'filter.estrategia': 'Estrategia digital', 'filter.feed': 'Feed y diseño',
      'filter.branding': 'Branding', 'filter.foto': 'Fotografía',
      'services.title': 'lo que hago', 'services.desc': 'Lo que más disfruto hacer: estrategia, redes, diseño y mucha creatividad.',
      'about.title': 'sobre mí', 'about.desc': 'Maniática de la perfección, la organización y de que todo salga tal y como lo habíamos pensado.',
      'about.skills': 'Competencias', 'about.cv': 'Ver mi CV',
      'exp.title': 'experiencia', 'exp.desc': 'Cada etapa ha dado forma a mi manera de entender el marketing digital.',
      'exp.work': 'Experiencia profesional', 'exp.edu': 'Formación', 'exp.extra': 'Idiomas y cursos',
      'exp.native': 'Nativo', 'exp.spanish': 'Español', 'exp.english': 'Inglés · Cambridge First Certificate',
      'tools.title': 'herramientas', 'tools.desc': 'Con lo que planifico, creo, mido y optimizo cada campaña.',
      'tools.ads': 'Campañas y analítica', 'tools.email': 'Email y contenido', 'tools.copy': 'Copywriting de marca',
      'tools.design': 'Diseño', 'tools.video': 'Vídeo y audio',
      'clients.title': 'marcas', 'clients.desc': 'Empresas y marcas con las que he trabajado.',
      'contact.title': '¿hablamos', 'contact.desc': '¿Trabajamos juntos/as? Podríamos hacer muy buen equipo :)',
      'contact.lead': 'Cuéntame qué tienes en mente: una estrategia digital, tus redes sociales, una campaña de Meta Ads, una identidad visual o una sesión de fotos.',
      'contact.cv': 'Mi CV',
      'form.name': 'Nombre', 'form.email': 'Email', 'form.subject': 'Asunto', 'form.message': 'Cuéntame más…', 'form.submit': 'Enviar',
      'form.thanks': '¡Gracias! Te respondo pronto.',
      'form.error': 'Revisa los campos marcados, por favor.',
      'footer.legal': 'Aviso legal', 'footer.privacy': 'Privacidad', 'footer.top': 'Volver arriba',
      'menu.open': 'Abrir menú', 'menu.close': 'Cerrar menú'
    },
    en: {
      'nav.work': 'Work', 'nav.services': 'Services', 'nav.about': 'About', 'nav.experience': 'Experience', 'nav.contact': "Let's talk",
      'hero.role': 'Digital marketing specialist',
      'hero.place': 'Gijón, Spain',
      'hero.time': 'Local time',
      'hero.status': 'Available for projects · Oct 2026',
      'hero.lead': 'Welcome to my archive of digital marketing, social media and the art of communicating with plenty of personality.',
      'hero.ctaWork': 'See work', 'hero.ctaContact': "Let's talk",
      'hero.location': 'Gijón · Available remotely',
      'kpi.followers': 'Followers through social media & Meta Ads', 'kpi.seo': 'Organic reach thanks to SEO',
      'kpi.meta': 'Meta accounts managed', 'kpi.views': 'Instagram views · Janel Cuesta',
      'work.title': 'work', 'work.desc': 'Where strategy meets creativity.',
      'filter.all': 'All', 'filter.estrategia': 'Digital strategy', 'filter.feed': 'Feed & design',
      'filter.branding': 'Branding', 'filter.foto': 'Photography',
      'services.title': 'what i do', 'services.desc': 'What I enjoy most: strategy, social media, design and plenty of creativity.',
      'about.title': 'about', 'about.desc': 'Obsessed with perfection, organisation and things turning out exactly as planned.',
      'about.skills': 'Soft skills', 'about.cv': 'See my CV',
      'exp.title': 'experience', 'exp.desc': 'Every stage has shaped the way I understand digital marketing.',
      'exp.work': 'Work experience', 'exp.edu': 'Education', 'exp.extra': 'Languages & courses',
      'exp.native': 'Native', 'exp.spanish': 'Spanish', 'exp.english': 'English · Cambridge First Certificate',
      'tools.title': 'tools', 'tools.desc': 'What I use to plan, create, measure and optimise every campaign.',
      'tools.ads': 'Ads & analytics', 'tools.email': 'Email & content', 'tools.copy': 'Brand copywriting',
      'tools.design': 'Design', 'tools.video': 'Video & audio',
      'clients.title': 'brands', 'clients.desc': "Companies and brands I've worked with.",
      'contact.title': 'shall we talk', 'contact.desc': 'Shall we work together? We could make a great team :)',
      'contact.lead': 'Tell me what you have in mind: a digital strategy, your social media, a Meta Ads campaign, a visual identity or a photo shoot.',
      'contact.cv': 'My CV',
      'form.name': 'Name', 'form.email': 'Email', 'form.subject': 'Subject', 'form.message': 'Tell me more…', 'form.submit': 'Send',
      'form.thanks': "Thanks! I'll get back to you soon.",
      'form.error': 'Please check the highlighted fields.',
      'footer.legal': 'Legal notice', 'footer.privacy': 'Privacy', 'footer.top': 'Back to top',
      'menu.open': 'Open menu', 'menu.close': 'Close menu'
    }
  };
  var lang = store('ic-lang') === 'en' ? 'en' : 'es';
  function t(key) { return (dict[lang] && dict[lang][key]) || dict.es[key] || ''; }
  function applyLang(l) {
    lang = l;
    root.setAttribute('lang', l);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[l][el.getAttribute('data-i18n')];
      if (v) el.textContent = v;
    });
    var status = document.getElementById('form-status');
    if (status && status.dataset.key) status.textContent = t(status.dataset.key);
    updateBurgerLabel();
  }
  document.getElementById('lang-toggle').addEventListener('click', function () {
    var next = lang === 'es' ? 'en' : 'es';
    applyLang(next);
    store('ic-lang', next);
  });

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  function updateBurgerLabel() {
    burger.setAttribute('aria-label', t(burger.getAttribute('aria-expanded') === 'true' ? 'menu.close' : 'menu.open'));
  }
  function setNav(open) {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    updateBurgerLabel();
  }
  burger.addEventListener('click', function () { setNav(burger.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); burger.focus(); }
  });
  var wideMQ = window.matchMedia('(min-width: 761px)');
  var onWide = function (e) { if (e.matches) setNav(false); };
  if (wideMQ.addEventListener) wideMQ.addEventListener('change', onWide);
  else if (wideMQ.addListener) wideMQ.addListener(onWide);

  if (lang !== 'es') applyLang(lang); else { root.setAttribute('lang', 'es'); updateBurgerLabel(); }

  /* ---------- Local time (Madrid) ---------- */
  var timeEl = document.getElementById('local-time');
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', hour12: false });
  } catch (e) { fmt = null; }
  function tick() {
    if (!fmt) return;
    timeEl.textContent = fmt.format(new Date()) + ' CET';
  }
  tick();
  setInterval(tick, 15000);

  /* ---------- Hero intro ---------- */
  requestAnimationFrame(function () {
    document.querySelector('.hero').classList.add('is-loaded');
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stats count-up ---------- */
  var nums = document.querySelectorAll('[data-count]');
  function fmtNum(n, sep) {
    return sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n);
  }
  function countUp(el) {
    var to = parseFloat(el.dataset.count);
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + fmtNum(Math.round(to * eased), el.dataset.sep) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) {
      el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
      cio.observe(el);
    });
  }

  /* ---------- Work filters ---------- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var rows = document.querySelectorAll('.work-row');
  var countEl = document.getElementById('work-count');
  var emptyEl = document.getElementById('work-empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      var n = 0;
      rows.forEach(function (row) {
        var show = f === 'all' || row.dataset.category === f;
        row.hidden = !show;
        if (show) { n++; row.classList.add('is-in'); }
      });
      countEl.textContent = (n < 10 ? '0' : '') + n;
      emptyEl.hidden = n !== 0;
    });
  });

  /* ---------- Floating preview (desktop, fine pointer) ---------- */
  var list = document.getElementById('work-list');
  var desktopMQ = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
  var preview = document.createElement('div');
  preview.className = 'preview';
  preview.setAttribute('aria-hidden', 'true');
  var previewImgs = [];
  rows.forEach(function (row) {
    var img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.dataset.src = row.dataset.img;
    preview.appendChild(img);
    previewImgs.push(img);
  });
  document.body.appendChild(preview);

  var loaded = false;
  function loadPreviews() {
    if (loaded) return;
    loaded = true;
    previewImgs.forEach(function (img) { img.src = img.dataset.src; });
  }

  var mouse = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, raf = null, active = false;
  function place() {
    var w = preview.offsetWidth, h = preview.offsetHeight;
    var tx = mouse.x + 28, ty = mouse.y - h / 2;
    if (tx + w > window.innerWidth - 16) tx = mouse.x - w - 28;
    ty = Math.max(16, Math.min(ty, window.innerHeight - h - 16));
    return { x: tx, y: ty };
  }
  function loop() {
    var target = place();
    if (reduceMotion) { pos.x = target.x; pos.y = target.y; }
    else { pos.x += (target.x - pos.x) * 0.16; pos.y += (target.y - pos.y) * 0.16; }
    preview.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px,0)';
    raf = active ? requestAnimationFrame(loop) : null;
  }
  function show(index) {
    previewImgs.forEach(function (img, i) { img.classList.toggle('is-active', i === index); });
    if (!active) {
      active = true;
      var t0 = place(); pos.x = t0.x; pos.y = t0.y;
      preview.classList.add('is-visible');
      if (!raf) raf = requestAnimationFrame(loop);
    }
  }
  function hide() {
    active = false;
    preview.classList.remove('is-visible');
  }

  list.addEventListener('mouseenter', function () { if (desktopMQ.matches) loadPreviews(); });
  list.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (!desktopMQ.matches) return;
    var row = e.target.closest('.work-row');
    if (row) show(Array.prototype.indexOf.call(rows, row));
    else hide();
  });
  list.addEventListener('mouseleave', hide);
  window.addEventListener('scroll', function () { if (active) hide(); }, { passive: true });

  // Rows link to themselves (placeholder for case-study pages): avoid jump
  list.addEventListener('click', function (e) {
    if (e.target.closest('.work-row__link')) e.preventDefault();
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll('input, textarea').forEach(function (f) {
      var valid = f.checkValidity() && f.value.trim() !== '';
      f.closest('.field').classList.toggle('is-invalid', !valid);
      f.setAttribute('aria-invalid', String(!valid));
      if (!valid && ok) { ok = false; f.focus(); }
    });
    statusEl.dataset.key = ok ? 'form.thanks' : 'form.error';
    statusEl.textContent = t(statusEl.dataset.key);
    if (ok) {
      form.reset();
      form.querySelectorAll('.field').forEach(function (fl) { fl.classList.remove('is-invalid'); });
    }
  });
  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('is-invalid') && e.target.checkValidity()) {
      field.classList.remove('is-invalid');
      e.target.removeAttribute('aria-invalid');
    }
  });
})();
