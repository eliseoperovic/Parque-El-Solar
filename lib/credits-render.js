/*
 * lib/credits-render.js — pinta assets/credits.json en creditos.html.
 * Sólo corre en esa página. Si el fetch falla (por ejemplo al abrir el
 * sitio con doble clic, sin servidor), muestra un aviso en vez de romper.
 */
(function () {
  "use strict";

  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(list, credits) {
    var entries = Object.keys(credits);
    if (!entries.length) {
      list.innerHTML = '<li class="credits-empty">No hay créditos que mostrar todavía.</li>';
      return;
    }
    list.innerHTML = entries.map(function (id) {
      var c = credits[id];
      var licencia = (c.license || "").toUpperCase() + (c.license_version ? " " + c.license_version : "");
      return (
        "<li><strong>" + escHTML(c.title || "Sin título") + "</strong>" +
        "por " + (c.creator_url
          ? '<a href="' + escHTML(c.creator_url) + '" target="_blank" rel="noopener">' + escHTML(c.creator || "Autor desconocido") + "</a>"
          : escHTML(c.creator || "Autor desconocido")) +
        " · " + escHTML(c.source || "") +
        " · " + (c.license_url
          ? '<a href="' + escHTML(c.license_url) + '" target="_blank" rel="noopener">' + escHTML(licencia) + "</a>"
          : escHTML(licencia)) +
        (c.foreign_landing_url
          ? ' · <a href="' + escHTML(c.foreign_landing_url) + '" target="_blank" rel="noopener">Ver original ↗</a>'
          : "") +
        "</li>"
      );
    }).join("");
  }

  function boot() {
    var list = document.querySelector("[data-credits]");
    if (!list) return;
    fetch("assets/credits.json")
      .then(function (r) { return r.json(); })
      .then(function (credits) { render(list, credits); })
      .catch(function () {
        list.innerHTML = '<li class="credits-empty">No se pudieron cargar los créditos (esto puede pasar si abriste el archivo con doble clic en vez de subirlo a un servidor).</li>';
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
