# WebPilot · sitio web

Sitio de WebPilot hecho con HTML, CSS y JavaScript comunes. No hay que instalar
nada ni "compilar" nada: los archivos se suben tal cual.

```
webpilot/
├── index.html            ← la página
├── 404.html              ← página de "no encontrado"
├── assets/
│   ├── css/styles.css    ← diseño (colores, tamaños, animaciones)
│   ├── js/main.js        ← ✏️ CONFIGURACIÓN (WhatsApp, precios, mensajes) + animaciones
│   ├── img/              ← imágenes (webp/svg), favicon e imagen para redes
│   └── fonts/            ← vacía (se usa Helvetica/Arial del sistema)
├── _headers              ← seguridad y caché para Cloudflare
├── robots.txt / sitemap.xml ← para Google
└── README.md             ← esta guía
```

---

## 1. Ver el sitio en tu computadora

Hacé doble clic en `index.html` y se abre en el navegador. Funciona casi todo.
(La página 404 solo se ve bien una vez publicada.)

---

## 2. Cambiar WhatsApp, precios y mensajes

Todo está en **un solo lugar**: el principio de `assets/js/main.js`, en el bloque `CONFIG`.

```js
whatsapp: '5493885864312',          // sin +, sin espacios
prices: { basico: 250, profesional: 400, mantenimientoMin: 20, mantenimientoMax: 30 },
messages: {
  basico: 'Hola WebPilot, vi la web y quiero consultar por el paquete Básico (desde {basico} USD).',
  ...
}
```

- Cambiá solo lo que está **entre comillas** o los **números**. No borres comas ni llaves.
- En los mensajes podés escribir `{basico}`, `{profesional}` o `{mantenimiento}` y se
  reemplazan por el precio.
- Cada botón de WhatsApp manda un mensaje distinto según dónde lo tocaron (hero,
  cada paquete, chatbots, FAQ, CTA final, botón flotante…).
- `stats.proyectos`: sumale 1 cada vez que publiques una web nueva (es el contador
  "Webs publicadas").

Los textos de la página (títulos, FAQ, etc.) se cambian directo en `index.html`.

> **Importante:** cuando cambies `styles.css` o `main.js`, abrí `index.html` y subí el
> número de versión: `styles.css?v=1` → `?v=2` y `main.js?v=1` → `?v=2`. Así los
> visitantes ven los cambios al instante y no una copia vieja guardada.

---

## 3. Subir el proyecto a GitHub

Este sitio hoy está dentro del repositorio de Parque El Solar, en la carpeta
`webpilot/`. **Lo recomendable es darle su propio repositorio**, así los dos sitios
no se mezclan.

1. Entrá a <https://github.com> con tu cuenta.
2. Arriba a la derecha: **+** → **New repository**.
3. Nombre: `webpilot`. Dejalo en **Public** o **Private** (los dos funcionan con Cloudflare).
   No tildes nada más. Tocá **Create repository**.
4. En la pantalla siguiente, tocá el link **uploading an existing file**.
5. Abrí la carpeta `webpilot` en tu computadora, seleccioná **todo lo que hay adentro**
   (no la carpeta en sí) y arrastralo a la página de GitHub.
   - Los archivos que empiezan con punto (como `.gitignore`) a veces no se ven. En Mac:
     `Cmd + Shift + .` los muestra. En Windows: Explorador → Vista → Elementos ocultos.
     Si `.gitignore` no se sube, no pasa nada grave.
   - Tiene que quedar `index.html` en la raíz del repositorio, no adentro de otra carpeta.
6. Abajo, en "Commit changes", escribí algo como `Primera versión` y tocá **Commit changes**.

> ¿Preferís dejarlo en el repositorio de Parque El Solar? Se puede (ver paso 4.5), pero
> **no juntes esta rama con la principal de Parque El Solar**: ese repositorio publica
> parqueelsolar.com y el sitio de WebPilot quedaría visible en parqueelsolar.com/webpilot/.

---

## 4. Publicarlo con Cloudflare (deploy automático)

1. Creá una cuenta gratis en <https://dash.cloudflare.com> (o entrá con la tuya).
2. En el menú de la izquierda: **Workers & Pages** → botón **Create** (Crear).
3. Elegí la pestaña **Pages** y después **Connect to Git** (Conectar con Git).
   - Si la pantalla te ofrece crear un "Worker", buscá abajo el link que dice algo como
     *"Looking to deploy Pages? Get started"* y seguí por ahí.
4. Conectá tu cuenta de GitHub, autorizá a Cloudflare y elegí el repositorio `webpilot`.
5. Configuración de compilación (Build settings):
   - **Project name:** `webpilot` (vas a tener una dirección tipo `webpilot.pages.dev`).
   - **Production branch:** `main`.
   - **Framework preset:** `None`.
   - **Build command:** dejalo **vacío**.
   - **Build output directory:** dejalo vacío o poné `/`.
   - Si usás el repositorio de Parque El Solar en vez de uno propio: en **Root directory**
     poné `webpilot` y en Production branch la rama donde esté el sitio.
6. Tocá **Save and Deploy**. En uno o dos minutos te da la dirección `https://webpilot.pages.dev`.
   Abrila y revisá que todo ande.

Desde ahora, **cada vez que cambies algo en GitHub, Cloudflare publica solo** la versión nueva.

---

## 5. Conectar tu dominio (ej. webpilotcba.com)

1. En Cloudflare, abrí el proyecto `webpilot` → pestaña **Custom domains** →
   **Set up a custom domain**.
2. Escribí `webpilotcba.com` y seguí los pasos.
   - **Si el dominio ya está en Cloudflare** (lo compraste ahí o ya lo agregaste), se
     configura solo. Listo.
   - **Si el dominio está en otro lado** (NIC Argentina, GoDaddy, Hostinger, etc.), lo más
     simple es agregarlo a Cloudflare: en el inicio del panel → **Add a domain** → plan
     **Free** → Cloudflare te da **dos "nameservers"**. Entrá a donde compraste el dominio y
     reemplazá los nameservers por esos dos. Puede tardar de minutos a 24 h. Después
     volvé al paso 1.
3. Repetí con `www.webpilotcba.com` para que funcione con y sin "www".
4. El candado (HTTPS) lo pone Cloudflare automáticamente.

**Si tu dominio NO es webpilotcba.com**, reemplazalo en: `index.html` (buscá
`webpilotcba.com`, aparece varias veces), `sitemap.xml` y `robots.txt`.

Después, sumá el sitio a Google: <https://search.google.com/search-console> → agregar
propiedad → enviá `https://tudominio.com/sitemap.xml`.

---

## 6. Actualizar el sitio después

**Desde la web de GitHub (lo más fácil):**

1. Entrá al repositorio → tocá el archivo (por ejemplo `assets/js/main.js`).
2. Tocá el lápiz ✏️ (Edit), hacé el cambio.
3. **Commit changes**. En 1–2 minutos está online.

Para **cambiar una imagen**: entrá a la carpeta `assets/img` → **Add file** →
**Upload files** → subí la imagen con **el mismo nombre** que la anterior.

Acordate de subir el `?v=` en `index.html` si tocaste CSS o JS (ver punto 2).

Si algo sale mal: en Cloudflare → proyecto → **Deployments**, elegí una versión anterior
→ **Rollback**. Vuelve como estaba.

---

## 7. Medir los clics en WhatsApp

- **Visitas:** en Cloudflare → proyecto `webpilot` → **Metrics** → activá **Web Analytics**.
  Es gratis y no usa cookies.
- **Clics en WhatsApp:** cada clic se registra como el evento `whatsapp_click` (con el
  origen: `hero`, `basico`, `profesional`, `final`, etc.) en `window.dataLayer`.
  Cloudflare Web Analytics no muestra eventos personalizados, así que para verlos podés:
  - Activar **Cloudflare Zaraz** (en el panel del dominio → Zaraz) y crear un evento
    `whatsapp_click`: el código ya lo manda a Zaraz si está activo.
  - O sumar Google Analytics 4 / Tag Manager (lee el mismo `dataLayer`). En ese caso hay
    que agregar sus dominios al `Content-Security-Policy` de `_headers`.

---

## 8. Si cambiás el script corto del `<head>`

En `index.html` hay un `<script>` de una línea en el `<head>` (tema oscuro, tipografía y
preloader). Por seguridad, `_headers` solo permite ese script exacto mediante su "hash".
Si lo modificás, el navegador lo bloquea (el sitio sigue andando, pero puede parpadear el
tema al cargar). Para arreglarlo, abrí la web publicada, apretá F12 → pestaña **Console**:
el error muestra el nuevo `sha256-...`. Copialo y reemplazá el viejo en `_headers`.

---

## 9. Detalles técnicos (por si te preguntan)

- Sin frameworks ni librerías externas. Todo el peso es HTML + ~40 KB de CSS + ~12 KB de JS.
- Paleta 100% en grises con variables CSS (`--bg`, `--surface`, `--line`, `--text-muted`,
  `--text`, `--ink`). Modo claro y oscuro automático, con botón manual.
- Tipografía: Helvetica Neue / Helvetica (Mac/iPhone) y Arial como respaldo con el
  interletrado ajustado (clase `ff-fallback`).
- Animaciones solo con `transform` y `opacity`, `IntersectionObserver` y
  `requestAnimationFrame`. Con "reducir movimiento" activado en el sistema se desactivan.
- Si el JavaScript falla, todo el contenido se ve igual (las animaciones se saltean).
- Lighthouse (probado localmente, móvil y escritorio): 100 en Rendimiento, Accesibilidad,
  Buenas prácticas y SEO.
- Probado en 360 px, 768 px y 1440 px.

---

## ✅ Checklist: cosas a completar

Buscá `[COMPLETAR]` en los archivos para encontrarlas.

- [ ] **Dominio:** confirmar `webpilotcba.com` (index.html, sitemap.xml, robots.txt).
- [ ] **Huanka:** link del sitio (`CONFIG.links.huanka` en main.js).
- [ ] **Huanka:** capturas reales → `assets/img/huanka-desktop.webp` (1200×750) y
      `assets/img/huanka-mobile.webp` (390×844), y reemplazar el mockup dibujado por
      `<img>` (copiá la estructura del proyecto Parque El Solar).
- [ ] **Huanka:** confirmar los textos "Qué hice" y "Clave" (están redactados de forma
      genérica).
- [ ] **Parque El Solar:** las capturas se sacaron del sitio real, pero sin su tipografía;
      conviene reemplazarlas por capturas propias con el mismo nombre y tamaño.
- [ ] **Parque El Solar:** si tenés un resultado medible real, sumarlo en "Resultado".
- [ ] **Plazos del proceso** (Día 1 / 2–4 días / 5–10 días / 1–2 días): confirmar.
- [ ] **FAQ "¿Cuánto tarda?":** confirmar 1–2 semanas (Básico) y 2–3 (Profesional).
- [ ] **FAQ "¿Cómo se paga?":** poner porcentajes y medios de pago reales.
- [ ] **FAQ "¿La web va a ser mía?":** confirmar la respuesta.
- [ ] **"Respuesta el mismo día":** confirmá que lo podés cumplir (aparece cerca de los botones).
- [ ] **Testimonios:** no hay ninguno. Cuando tengas testimonios reales de clientes, se
      puede sumar una sección.
- [ ] Activar **Web Analytics** en Cloudflare (y Zaraz si querés ver los clics).
