/* =====================================================================
   WebPilot — main.js
   ---------------------------------------------------------------------
   ✏️  EDITÁ ACÁ: número de WhatsApp, precios, mensajes y links.
   Cambiá solo lo que está entre comillas o los números. Guardá y listo.
   ===================================================================== */
const CONFIG = {
  // Número en formato internacional, SIN "+", espacios ni guiones.
  whatsapp: '5493885864312',
  // Cómo se muestra el número en el footer.
  whatsappVisible: '+54 9 388 586-4312',

  email: 'info@webpilotcba.com',

  // Precios en USD. Se muestran en las tarjetas y en los mensajes.
  prices: {
    basico: 250,
    profesional: 400,
    mantenimientoMin: 20,
    mantenimientoMax: 30,
  },

  // Mensajes que se escriben solos en WhatsApp según el botón que tocaron.
  // Podés usar {basico}, {profesional} y {mantenimiento} y se reemplazan por el precio.
  messages: {
    default: 'Hola WebPilot, vi la web y quiero hacer una consulta.',
    nav: 'Hola WebPilot, vi la web y quiero hacer una consulta.',
    menu: 'Hola WebPilot, vi la web y quiero hacer una consulta.',
    hero: 'Hola WebPilot, vi la web y quiero pedir un presupuesto sin cargo.',
    trabajos: 'Hola WebPilot, vi sus trabajos y quiero una web para mi negocio.',
    basico: 'Hola WebPilot, vi la web y quiero consultar por el paquete Básico (desde {basico} USD).',
    profesional: 'Hola WebPilot, vi la web y quiero consultar por el paquete Profesional (desde {profesional} USD).',
    mantenimiento: 'Hola WebPilot, vi la web y quiero consultar por el Mantenimiento mensual ({mantenimiento} USD/mes).',
    chatbots: 'Hola WebPilot, vi la web y quiero consultar por un chatbot para mi negocio.',
    faq: 'Hola WebPilot, tengo una duda que no está en las preguntas frecuentes.',
    final: 'Hola WebPilot, quiero hablar sobre una web para mi negocio.',
    footer: 'Hola WebPilot, vi la web y quiero hacer una consulta.',
    flotante: 'Hola WebPilot, vi la web y quiero hacer una consulta.',
  },

  links: {
    instagram: 'https://www.instagram.com/webpilot.cba/',
    parqueElSolar: 'https://parqueelsolar.com',
    huanka: '', // [COMPLETAR] link de la web de Huanka. Si queda vacío, el botón no se muestra.
  },

  // Solo datos reales. Sumá 1 cada vez que publiques una web nueva.
  stats: {
    proyectos: 2,
  },
};

/* =====================================================================
   A partir de acá no hace falta tocar nada.
   ===================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let reduce = reduceMQ.matches;

  window.__wpReady = true;
  root.classList.add('js');

  /* ---------- Precios y mensajes ---------- */
  const P = CONFIG.prices;
  const fmt = (n) => Number(n).toLocaleString('es-AR');
  const maint = P.mantenimientoMin === P.mantenimientoMax
    ? fmt(P.mantenimientoMin)
    : `${fmt(P.mantenimientoMin)}–${fmt(P.mantenimientoMax)}`;
  const priceText = { basico: fmt(P.basico), profesional: fmt(P.profesional), mantenimiento: maint };

  $$('[data-price]').forEach((el) => {
    const v = priceText[el.dataset.price];
    if (v) el.textContent = v;
  });
  $$('[data-price-count]').forEach((el) => {
    const v = P[el.dataset.priceCount];
    if (v) { el.dataset.count = v; el.textContent = fmt(v); }
  });
  $$('[data-stat]').forEach((el) => {
    const v = CONFIG.stats[el.dataset.stat];
    if (v != null) { el.dataset.count = v; el.textContent = v; }
  });

  const fill = (msg) => msg.replace(/\{(\w+)\}/g, (m, k) => priceText[k] || m);
  const waUrl = (origin) => {
    const msg = fill(CONFIG.messages[origin] || CONFIG.messages.default);
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  /* ---------- Links de WhatsApp + registro de clics ---------- */
  window.dataLayer = window.dataLayer || [];
  $$('[data-wa]').forEach((a) => {
    a.href = waUrl(a.dataset.wa);
    a.addEventListener('click', () => {
      const detail = { event: 'whatsapp_click', origen: a.dataset.wa };
      window.dataLayer.push(detail);
      // Cloudflare Zaraz (si lo activás) o Google Analytics (si lo sumás)
      try { if (window.zaraz && typeof window.zaraz.track === 'function') window.zaraz.track('whatsapp_click', { origen: a.dataset.wa }); } catch (e) { /* nada */ }
      try { if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { origen: a.dataset.wa }); } catch (e) { /* nada */ }
    });
  });

  $$('[data-phone]').forEach((el) => { el.textContent = CONFIG.whatsappVisible; });
  $$('[data-email]').forEach((el) => { el.textContent = CONFIG.email; el.href = `mailto:${CONFIG.email}`; });
  $$('[data-link]').forEach((a) => {
    const url = CONFIG.links[a.dataset.link];
    if (url) { a.href = url; a.hidden = false; } else if (a.getAttribute('href') === '#') { a.hidden = true; }
  });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Tema claro / oscuro ---------- */
  const themeBtn = $('.theme-toggle');
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : darkMQ.matches;
  const syncThemeUI = () => {
    const dark = isDark();
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(dark));
      themeBtn.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
    $$('meta[name="theme-color"]').forEach((m) => { m.content = dark ? '#0e0e0e' : '#f3f3f3'; });
  };
  try {
    const saved = localStorage.getItem('wp-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (e) { /* sin almacenamiento */ }
  syncThemeUI();
  darkMQ.addEventListener?.('change', syncThemeUI);
  themeBtn?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('wp-theme', next); } catch (e) { /* sin almacenamiento */ }
    syncThemeUI();
  });

  /* ---------- Hero: índice de cada palabra para el escalonado ---------- */
  $$('.hero__title .w > span').forEach((s, i) => s.style.setProperty('--i', i));

  /* ---------- Preloader ---------- */
  const start = performance.now();
  const finishLoad = () => {
    root.classList.add('is-loaded');
    try { sessionStorage.setItem('wp-seen', '1'); } catch (e) { /* nada */ }
  };
  if (root.classList.contains('is-loading') && !reduce) {
    const pre = $('.preloader');
    const leave = () => {
      pre.classList.add('is-leaving');
      setTimeout(finishLoad, 180);
      pre.addEventListener('animationend', () => root.classList.remove('is-loading'), { once: true });
      setTimeout(() => root.classList.remove('is-loading'), 900);
    };
    const wait = Math.max(0, 850 - (performance.now() - start));
    // Sale apenas termina la animación del logo; nunca espera a las imágenes.
    setTimeout(leave, wait);
  } else {
    root.classList.remove('is-loading');
    requestAnimationFrame(finishLoad);
  }

  /* ---------- Aparición al hacer scroll ---------- */
  $$('[data-reveal-group]').forEach((g) => {
    $$(':scope > [data-reveal]', g).forEach((el, i) => el.style.setProperty('--d', i));
  });
  const reveals = $$('[data-reveal]');
  const showEl = (el) => {
    el.classList.add('is-in');
    // Al terminar, se quita el retraso para que los hover respondan al instante.
    setTimeout(() => el.style.setProperty('--d', 0), 1400 + (parseFloat(el.style.getPropertyValue('--d')) || 0) * 90);
  };
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(showEl);
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { showEl(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Contadores (solo datos reales) ---------- */
  const counters = $$('.count[data-count]');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count) || 0;
    if (reduce || target === 0) { el.textContent = fmt(target); return; }
    const dur = Math.min(1800, 700 + target * 4);
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Scroll: progreso, nav, parallax y línea de proceso ---------- */
  const nav = $('.nav');
  const bar = $('.progress__bar');
  const parallax = $$('[data-parallax]');
  const processTrack = $('.process__track');
  const steps = $$('.step');
  const navLinks = $$('.nav__links a');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  let vh = innerHeight;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle('is-scrolled', y > 24);

    if (!reduce) {
      parallax.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }

    if (processTrack) {
      const r = processTrack.getBoundingClientRect();
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.2)));
      processTrack.style.setProperty('--p', p.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle('is-active', p >= (i + 0.35) / steps.length || p >= 0.999));
    }

    let current = null;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.4) current = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === current && sections[i].getBoundingClientRect().bottom > vh * 0.4));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { vh = innerHeight; onScroll(); }, { passive: true });
  update();

  reduceMQ.addEventListener?.('change', (e) => {
    reduce = e.matches;
    if (reduce) parallax.forEach((el) => { el.style.transform = ''; });
    onScroll();
  });

  /* ---------- Menú móvil ---------- */
  const burger = $('.burger');
  const menu = $('#menu');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) setTimeout(() => $('a', menu)?.focus({ preventScroll: true }), 80);
  };
  burger?.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
    // Mantener el foco dentro del menú abierto
    if (e.key === 'Tab' && root.classList.contains('menu-open')) {
      const f = [burger, ...$$('a', menu)];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  matchMedia('(min-width: 1024px)').addEventListener?.('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- FAQ en acordeón ---------- */
  $$('.qa').forEach((qa) => {
    const btn = $('button', qa);
    btn.addEventListener('click', () => {
      const open = !qa.classList.contains('is-open');
      qa.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- Cursor personalizado y botones magnéticos (solo mouse) ---------- */
  if (finePointer && !reduce) {
    root.classList.add('has-cursor');
    const cursor = $('.cursor');
    let mx = -100, my = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = Math.abs(mx - cx) + Math.abs(my - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      cursor.classList.add('is-visible');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    const hoverSel = 'a, button, .card-invert, .service';
    document.addEventListener('pointerover', (e) => { if (e.target.closest(hoverSel)) cursor.classList.add('is-hover'); });
    document.addEventListener('pointerout', (e) => {
      if (e.target.closest(hoverSel) && !(e.relatedTarget && e.relatedTarget.closest?.(hoverSel))) cursor.classList.remove('is-hover');
    });

    $$('.magnetic').forEach((el) => {
      const strength = 0.28;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength * 1.4;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
})();
