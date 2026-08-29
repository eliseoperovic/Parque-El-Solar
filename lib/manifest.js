/*
 * lib/manifest.js — Datos editables del sitio de Cementerio Parque El Solar.
 *
 * Se puede abrir y editar con el Bloc de notas. Cambiá el texto que está
 * entre comillas "así" y guardá el archivo. No toques las comas ni las
 * llaves { } — si algo se rompe, lo más simple es deshacer el cambio.
 *
 * IMPORTANTE: los teléfonos, direcciones y horarios también están escritos
 * directamente en index.html (para que la web funcione aunque este archivo
 * no cargue). Si cambiás un dato acá, buscalo también en index.html con
 * Ctrl+B en el Bloc de notas y actualizalo ahí. El README.md trae el
 * detalle exacto de qué buscar.
 */
(function () {
  "use strict";

  window.__ELSOLAR__ = {

    brand: {
      nombre: "Cementerio Parque El Solar",
      razonSocial: "Cementerio Parque el Solar",

      fundacion: 1995,
      superficieHectareas: 8,

      // Confirmado por el cliente: el cementerio opera bajo esta persona
      // física, así que el CUIT se publica en el pie de página.
      cuit: "27-06624986-2",

      // Habilitación municipal, confirmada por el cliente.
      habilitacionMunicipal: "6875"
    },

    contacto: {
      urgencias24h: {
        etiqueta: "Urgencias 24 horas",
        numero: "+54 9 388 488-1158",
        tel: "+5493884881158",
        wa: "5493884881158"
      },
      administracion: {
        etiqueta: "Administración",
        numero: "+54 9 388 519-6557",
        tel: "+5493885196557",
        wa: "5493885196557"
      },
      email: "parque_el_solar@live.com.ar",

      facebookNombre: "Parque El Solar",
      facebookUrl: "https://www.facebook.com/parqueelsolar/",

      direccionParque: "Ruta 9 km 8, San Salvador de Jujuy",
      direccionAdmin: "San Martín y Lamadrid, San Salvador de Jujuy",
      acceso: "Saliendo por Ruta 9 hacia El Carmen, zona de Alto Comedero"
    },

    horarios: {
      visitas: "Todos los días, de 8 a 19 h",
      administracion: "Lunes a viernes de 8:30 a 12:30 y de 16 a 20 h · Sábados de 9 a 13 h",
      respuestaConsultas: "Lunes a viernes de 8:30 a 12:30 y de 16 a 20 h, y sábados de 9 a 13 h"
    },

    // Texto único del CTA. Aparece siempre igual: mismo texto, mismo botón.
    ctaTexto: "Hablar con la administración",

    // Marca de origen que viaja invisible dentro del mensaje de WhatsApp,
    // para que la administración sepa qué parte del sitio generó la
    // consulta. No la ve quien escribe, sólo queda en el texto del mensaje.
    whatsappOrigenes: {
      nav: "[web · nav]",
      hero: "[web · hero]",
      formulario: "[web · formulario]",
      urgenciasMovil: "[web · urgencias]"
    },

    // Referencia de contenido — el texto visible real vive en index.html
    // (a propósito, para que la web funcione sin este archivo). Esta lista
    // es sólo para que el cliente tenga a mano el detalle de cada servicio
    // si necesita revisarlo. Si cambiás algo importante acá, actualizalo
    // también en la sección "Servicios" de index.html.
    servicios: [
      {
        titulo: "Inhumación en tierra",
        resumen: "Parcelas en jardines o sectores del parque.",
        detalle: "Parcelas hasta tres ocupaciones. Incluye servicio de inhumación, instalación de placa y floreros, y mantenimiento general."
      },
      {
        titulo: "Columbarios",
        resumen: "Depósito de urnas con cenizas.",
        detalle: "Servicio de resguardo de urnas cinerarias en caso de cremación."
      },
      {
        titulo: "Ceremonias de despedida",
        resumen: "Acompañamiento el día de la despedida.",
        detalle: "Ornamentación de la parcela con alfombras de césped sintético, porta corona y toldilla. Traslado en cureña por parte de los empleados desde el ingreso principal hasta el lugar de la parcela."
      },
      {
        titulo: "Mantenimiento de parcelas",
        resumen: "Cuidado periódico del espacio.",
        detalle: "Las parcelas se mantienen periódicamente a partir del pago de expensas."
      }
    ],

    proceso: [
      { titulo: "Nos escribís o llamás.", detalle: "Una conversación, sin compromiso." },
      { titulo: "Te mostramos las opciones.", detalle: "Ubicaciones disponibles, características y valores. Se puede visitar el parque." },
      { titulo: "Resolvés cuando estés listo.", detalle: "Sin apuro. La documentación y el pago se coordinan de forma personal." }
    ],

    // FAQ — el texto real y visible vive en index.html (accesible sin JS,
    // con <details>/<summary>). Se repite acá como referencia editable.
    faq: [
      {
        pregunta: "¿Puedo comprar una parcela por adelantado? ¿Me obliga a algo?",
        respuesta: "Sí. Adquirir una parcela con anticipación es una decisión habitual y no genera ninguna obligación adicional más allá de la parcela en sí. Podés consultar ubicaciones y valores cuando quieras, sin apuro."
      },
      {
        pregunta: "¿Cómo se abona? ¿Hay financiación?",
        respuesta: "Se puede abonar en efectivo, por transferencia o con débito."
      },
      {
        pregunta: "¿Qué incluye el mantenimiento y cómo funcionan las expensas?",
        respuesta: "El mantenimiento incluye el cuidado periódico del espacio de cada parcela. Se sostiene con el pago de expensas, que se abonan de forma periódica y se informan en la administración."
      },
      {
        pregunta: "¿Qué documentación se necesita para una inhumación?",
        respuesta: "El certificado de inhumación expedido por la Municipalidad de San Salvador de Jujuy y, si la parcela ya fue adquirida, los documentos que acrediten su propiedad. Se presenta antes de la inhumación."
      },
      {
        pregunta: "¿Cuál es el horario de visitas?",
        respuesta: "El parque recibe visitas todos los días, de 8 a 19 h."
      },
      {
        pregunta: "¿Se pueden dejar flores? ¿Cada cuánto se retiran?",
        respuesta: "Sí, se pueden dejar flores en las parcelas. El personal del parque las retira periódicamente como parte del mantenimiento general."
      },
      {
        pregunta: "¿Puedo ingresar con mi mascota?",
        respuesta: "No, el ingreso de mascotas no está permitido dentro del parque."
      },
      {
        pregunta: "¿Hay misas?",
        respuesta: "Se celebran cuando se solicitan."
      },
      {
        pregunta: "¿El predio es accesible para sillas de ruedas?",
        respuesta: "Sí. El parque cuenta con acceso para sillas de ruedas en sus caminerías principales."
      },
      {
        pregunta: "¿Qué días hay más gente?",
        respuesta: "Día de los Muertos, Día de la Madre, Día del Padre y Navidad; conviene prever demora."
      }
    ],

    instalaciones: [
      "Capilla", "Estacionamiento", "Accesible en silla de ruedas",
      "Floristería", "Cafetería", "Baños para visitantes"
    ],

    galeria: [
      { id: "hero", src: "assets/img/hero.webp", alt: "Caminería del parque bordeada de palmeras y arboleda, con luz de sol." },
      { id: "parque-jardines", src: "assets/img/parque-jardines.webp", alt: "Añosos árboles sobre el césped del parque." },
      { id: "parque-2", src: "assets/img/parque-2.webp", alt: "Jardín del parque con glorieta cubierta de enredadera y palmera." },
      { id: "parque-3", src: "assets/img/parque-3.webp", alt: "Árbol de gran porte sobre el césped del parque, con cielo despejado." }
    ]
  };
})();
