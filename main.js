/*
 * main.js — Cementerio Parque El Solar
 * IIFE clásico, sin módulos. Cada init está aislado con safe() para que
 * un fallo puntual no rompa el resto del sitio. Todo el contenido crítico
 * (teléfonos, direcciones, horarios, CTA) ya está en el HTML: este archivo
 * sólo agrega comportamiento y pulido visual.
 */
(function () {
  "use strict";

  var data = window.__ELSOLAR__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "]", e); }
  }

  /* -----------------------------------------------------------
     Nav — se solidifica al bajar, cierra el menú móvil al navegar
     ----------------------------------------------------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var mobile = $("[data-nav-mobile]");
    if (mobile) {
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () { mobile.removeAttribute("open"); });
      });
      document.addEventListener("click", function (e) {
        if (mobile.hasAttribute("open") && !mobile.contains(e.target)) {
          mobile.removeAttribute("open");
        }
      });
    }
  }

  /* -----------------------------------------------------------
     Reveal universal: fade + 12px, 0.6s, sin rebote.
     Threshold bajo + red de seguridad a los 6s.
     ----------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    }, 6000);
  }

  /* -----------------------------------------------------------
     Reveal por líneas del titular del hero (reemplaza el scramble
     bilingüe del arquetipo original: acá, sobrio y quieto).
     ----------------------------------------------------------- */
  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function splitLines(el) {
    // Agrupa los nodos hijos en "líneas" separadas por <br>, preservando
    // elementos inline como <em>.
    var groups = [[]];
    Array.prototype.forEach.call(el.childNodes, function (node) {
      if (node.nodeName === "BR") { groups.push([]); return; }
      groups[groups.length - 1].push(node);
    });

    var html = groups.map(function (nodes) {
      var inner = nodes.map(function (node) {
        if (node.nodeType === 3) return escHTML(node.textContent);
        if (node.nodeType === 1) return node.outerHTML;
        return "";
      }).join("");
      return '<span class="reveal-line-outer"><span class="reveal-line-inner">' + inner + "</span></span>";
    }).join("");

    el.innerHTML = html;
    return $$(".reveal-line-outer", el);
  }

  function initSplitLines() {
    var els = $$('[data-split="lines"]');
    if (!els.length) return;
    els.forEach(function (el) {
      var lines = splitLines(el);
      lines.forEach(function (line, i) {
        setTimeout(function () { line.classList.add("is-revealed"); }, 350 + i * 260);
      });
    });
  }

  /* -----------------------------------------------------------
     Parallax muy leve (máx. 20px) sólo en las dos fotos anchas.
     Usa GSAP + ScrollTrigger si cargaron; si no, no pasa nada
     (la foto se queda quieta, que es una degradación aceptable).
     ----------------------------------------------------------- */
  function initParallax() {
    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    // Recorrido total de 20px (de -10 a +10), el máximo que pide el brief.
    $$("[data-parallax]").forEach(function (img) {
      gsap.fromTo(img, { y: -10 }, {
        y: 10,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("section") || img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /* -----------------------------------------------------------
     Enlaces de WhatsApp: el HTML ya trae un href funcional (texto
     simple, sin tildes, sin marca de origen) para que funcione
     aunque este script no cargue. Acá lo mejoramos con el texto
     completo y la marca de origen, tomados de manifest.js.
     ----------------------------------------------------------- */
  function buildWaUrl(numero, texto, origen) {
    var msg = texto + (origen ? " " + origen : "");
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);
  }

  function initWhatsAppLinks() {
    var contacto = data.contacto;
    var origenes = data.whatsappOrigenes;
    if (!contacto || !origenes) return;

    var textos = {
      nav: "Hola, quisiera hablar con la administración.",
      hero: "Hola, quisiera hablar con la administración.",
      urgenciasMovil: "Hola, necesito ayuda urgente."
    };

    $$("[data-wa-origin]").forEach(function (el) {
      var key = el.getAttribute("data-wa-origin");
      var texto = textos[key];
      if (!texto) return;
      var numero = key === "urgenciasMovil" ? contacto.urgencias24h.wa : contacto.administracion.wa;
      el.setAttribute("href", buildWaUrl(numero, texto, origenes[key]));
    });
  }

  /* -----------------------------------------------------------
     Altura real de la barra móvil de urgencias, para que el
     padding-bottom del body nunca tape el final del contenido.
     ----------------------------------------------------------- */
  function initUrgenciasMobileSpacing() {
    var bar = $("[data-urgencias-mobile]");
    if (!bar) return;
    var apply = function () {
      var h = bar.getBoundingClientRect().height;
      if (h > 0) document.documentElement.style.setProperty("--urgencias-mobile-h", h + "px");
    };
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
  }

  /* -----------------------------------------------------------
     Formulario de contacto → abre WhatsApp con el mensaje armado.
     Sin backend: todo pasa en el navegador. window.open se llama
     de forma síncrona dentro del handler del submit para que el
     navegador no lo bloquee como pop-up.
     ----------------------------------------------------------- */
  function setupContactForm() {
    var form = $("[data-contact-form]");
    var success = $("[data-contact-success]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var nombre = (form.elements.nombre.value || "").trim();
      var telefono = (form.elements.telefono.value || "").trim();
      var motivo = (form.elements.motivo && form.elements.motivo.value) || "";
      var mensaje = (form.elements.mensaje.value || "").trim();

      var partes = ["Hola, soy " + (nombre || "una persona interesada") + "."];
      partes.push("Teléfono: " + telefono + ".");
      if (motivo) partes.push("Motivo: " + motivo + ".");
      if (mensaje) partes.push("Mensaje: " + mensaje);

      var contacto = data.contacto;
      var origenes = data.whatsappOrigenes;
      var numero = contacto ? contacto.administracion.wa : "5493885196557";
      var origen = origenes ? origenes.formulario : "[web · formulario]";
      var texto = partes.join(" ") + " " + origen;

      window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(texto), "_blank", "noopener");

      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("aria-hidden", "false");
      }
    });
  }

  /* -----------------------------------------------------------
     Boot
     ----------------------------------------------------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initSplitLines, "initSplitLines");
    safe(initUrgenciasMobileSpacing, "initUrgenciasMobileSpacing");
    safe(initWhatsAppLinks, "initWhatsAppLinks");
    safe(setupContactForm, "setupContactForm");
    safe(initParallax, "initParallax");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
