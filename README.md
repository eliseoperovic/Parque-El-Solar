# Sitio web — Cementerio Parque El Solar

Guía para vos, sin lenguaje técnico. Si algo no queda claro, decímelo y lo
reescribo.

## 1. Ver el sitio ahora mismo

Andá a la carpeta del sitio y hacé doble clic en **`index.html`**. Se abre
en tu navegador (Chrome, Edge, Firefox) y funciona completo: textos, fotos,
botones y el formulario. No hace falta instalar nada ni tener internet para
verlo (salvo el mapa y las letras, que si cargan desde internet).

## 2. Subirlo a Hostinger

1. Entrá al Administrador de archivos de Hostinger (o a tu cliente FTP).
2. Andá a la carpeta `public_html` (o la que use tu dominio).
3. Arrastrá **todo el contenido** de esta carpeta ahí adentro (todos los
   archivos y carpetas: `index.html`, `styles.css`, `main.js`, `lib/`,
   `assets/`, `.htaccess`, etc.). No hace falta arrastrar la carpeta en sí,
   sino lo que tiene adentro.
4. Esperá un par de minutos y entrá a tu dominio. Listo.

El archivo `.htaccess` es invisible en muchos exploradores de archivos —
asegurate de que tu explorador muestre "archivos ocultos" antes de subir,
para no dejarlo afuera. Sin él, el sitio funciona igual, pero los
navegadores tardan más en ver tus próximos cambios (ver punto 6).

## 3. Cómo editar los textos, teléfonos y horarios

Casi todo el contenido que cambia con más frecuencia vive en un solo
archivo: **`lib/manifest.js`**. Abrilo con el Bloc de notas (clic derecho →
Abrir con → Bloc de notas) y vas a ver el texto entre comillas, por
ejemplo:

```
email: "parque_el_solar@live.com.ar",
```

Cambiá lo que está entre comillas y guardá (Ctrl+S). No toques las comas ni
las llaves `{ }` — si borrás una por accidente, el sitio puede dejar de
funcionar. Si eso pasa, lo más simple es deshacer el cambio (Ctrl+Z) y
volver a intentar con más cuidado.

### Importante: los teléfonos y direcciones están en dos lugares

Por seguridad, para que el sitio funcione aunque algo falle, los datos más
importantes (teléfonos, direcciones, horarios) están escritos **tanto en
`lib/manifest.js` como directamente en `index.html`**. Si cambiás un
teléfono, actualizalo en los dos archivos. La forma más fácil:

1. Abrí `index.html` con el Bloc de notas.
2. Presioná **Ctrl+B** (buscar) y escribí el número viejo, por ejemplo
   `388 488-1158`.
3. Te va a aparecer varias veces (barra de urgencias, sección "Si acaba de
   fallecer un familiar", panel de contacto, footer). Reemplazalo en cada
   aparición, y también en los enlaces `tel:` y `wa.me` que están al lado
   (son el mismo número, sin espacios ni guiones).
4. Hacé lo mismo en `lib/manifest.js`.

**Tabla de búsqueda rápida** (qué buscar en `index.html` si cambia un dato):

| Si cambia... | Buscá esto en index.html |
|---|---|
| Teléfono de urgencias | `488-1158` y `5493884881158` |
| Teléfono de administración | `519-6557` y `5493885196557` |
| Email | `parque_el_solar@live.com.ar` |
| Dirección del parque | `Ruta 9 km 8` |
| Dirección de administración | `San Martín y Lamadrid` |
| Horario de administración | `8:30 a 12:30` |
| Horario de visitas | `8 a 19` |

## 4. Cómo reemplazar las fotos

Las fotos actuales son provisorias (de banco de imágenes), hasta que envíes
las tuyas del predio.

1. Guardá tus fotos en la carpeta `assets/photos/source/` con estos
   nombres exactos:
   - `hero.jpg` (o `.png`) → la foto grande de la portada. Un ingreso o
     caminería con luz de mañana, sin lápidas en primer plano.
   - `parque-jardines.jpg` (o `.png`) → una foto ancha de los jardines,
     para la sección "El parque".
2. Avisame o pedile a quien administre el sitio que las convierta y las
   suba a `assets/img/` (es un paso técnico corto). Si preferís hacerlo
   vos mismo más adelante, cualquier programador puede correr el script
   que ya está preparado para esto.
3. También podés mandarme las fotos por WhatsApp y yo las proceso y subo.

El logo institucional va en el mismo lugar: en cuanto lo envíes, se
reemplaza el nombre en letras (que hoy hace de logo provisorio) por tu
imagen, tanto en el menú de arriba como en el pie de página.

## 5. Cómo leer las marcas de origen en WhatsApp

Cada botón "Hablar con la administración" manda un mensaje de WhatsApp que
ya viene con una marca invisible al final, entre corchetes, para que
sepas de qué parte del sitio vino la consulta. Quien escribe no la nota;
vos sí, al final del mensaje que recibís:

- `[web · nav]` → tocó el botón que está siempre arriba (o en el menú del
  celular). Suele ser alguien decidido, que no necesitó leer mucho.
- `[web · hero]` → tocó el botón apenas entró al sitio.
- `[web · servicios]` → leyó la sección de servicios antes de escribir.
- `[web · formulario]` → completó el formulario de la sección de contacto
  (este es el único que trae nombre, motivo y mensaje además del
  teléfono).
- `[web · urgencias]` → usó el botón de WhatsApp de la barra de
  emergencias, no el botón verde principal.

Con el tiempo, esto te va a mostrar qué parte del sitio genera más
consultas, sin instalar ningún sistema de estadísticas.

## 6. Si subís un cambio y no se ve

Los navegadores guardan una copia de las páginas para que carguen más
rápido, y a veces "no se enteran" de que subiste algo nuevo. Antes de
pensar que algo se rompió:

1. Recargá la página con **Ctrl+F5** (o Cmd+Shift+R en Mac) — eso fuerza
   una recarga completa, sin usar la copia guardada.
2. Si cambiaste `styles.css` o `main.js`, pedile a quien te ayude que
   cambie el número que dice `?v=20260828` al final de esos archivos en
   `index.html` (por ejemplo, a la fecha del día) y vuelva a subirlo. Ese
   número le indica al navegador "esta es una versión nueva, no uses la
   vieja".
3. Si subiste el `.htaccess` (punto 2), esto casi nunca pasa.

## 7. Datos pendientes de tu parte

Esta tabla está para que la tengas a mano. Ninguno de estos puntos bloquea
la publicación del sitio; se actualizan cuando los tengas.

| Dato | Estado | Dónde impacta |
|---|---|---|
| Logo institucional | Falta enviarlo | Menú y pie de página (hoy hay un texto que hace de logo) |
| Fotos reales del predio | Se van sumando | `assets/photos/source/` (ver punto 4) |
| Eslogan | No definido | Hay 3 opciones propuestas, comentadas dentro de `lib/manifest.js`. Ninguna se muestra todavía en el sitio. |
| Habilitación municipal N.º | Falta | Pie de página (hoy dice "—") |
| Política de privacidad y términos | Falta | Pie de página (hoy dice "pendiente de publicación") |
| URL exacta de Facebook | Falta | Hoy el sitio muestra "Facebook: Parque El Solar" como texto simple, sin enlace, para no publicar una dirección adivinada. Buscá el comentario `FACEBOOK-URL` en `index.html` para agregarla cuando la tengas. |
| ¿Ofrecen cremación propia? | A confirmar | La sección de Servicios hoy sólo muestra "Columbarios" (resguardo de urnas). Si el cementerio también realiza la cremación, avisame para agregar esa tarjeta. |
| CUIT | No publicado a propósito | Ver aviso especial abajo |
| Algunas respuestas de las Preguntas frecuentes | Redactadas como texto de partida | Ver aviso abajo |

### Aviso sobre el CUIT

El número que me pasaste (27-06624986-2) empieza con **27**, que en
Argentina es el prefijo de una **persona física**, no el de una empresa.
Publicarlo tal cual expondría el número fiscal de una persona, no el del
cementerio. Por eso lo dejé escrito pero **comentado** (invisible) dentro
de `index.html` y de `lib/manifest.js`, con una nota explicando el motivo.
Antes de publicarlo, confirmame:

- si el cementerio opera bajo esa persona física y estás de acuerdo en
  publicarlo así, o
- si existe una razón social con CUIT propio (empieza con 30 o 33) que sea
  la que corresponde mostrar.

Con tu confirmación, lo activo en un minuto.

### Aviso sobre algunas respuestas de las Preguntas frecuentes

Redacté todas las respuestas del acordeón de preguntas frecuentes con la
información que me diste. Dos de ellas — "¿Puedo comprar una parcela por
adelantado? ¿Me obliga a algo?" y "¿Puedo ingresar con mi mascota?" — las
completé con una respuesta razonable pero que no surge de un dato que me
hayas confirmado. Te pido que las leas en la sección "Preguntas frecuentes"
del sitio antes de darla por definitiva; si algo no es exactamente así,
me lo corregís y lo actualizo.

## 8. Estructura de la carpeta (por si algún día la necesitás)

```
index.html          → la página (todo el sitio es una sola página larga)
creditos.html        → créditos de las fotos de banco
styles.css            → todos los estilos visuales
main.js               → el comportamiento (botones, animaciones suaves)
.htaccess             → configuración para que Hostinger no muestre versiones viejas
favicon.svg            → el icono de la pestaña del navegador
lib/
  manifest.js          → tus datos editables (ver punto 3)
  gsap.min.js, ScrollTrigger.min.js → animaciones suaves
  credits-render.js    → arma la página de créditos
assets/
  img/                 → fotos ya optimizadas que usa el sitio
  photos/source/        → dejá acá tus fotos originales (ver punto 4)
  credits.json          → datos de las fotos de banco actuales
```

Cualquier duda, escribime.
