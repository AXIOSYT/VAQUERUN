/**
 * ★ EDITA ESTE ARCHIVO ★
 * Todas las opciones que aún no tienes confirmadas están vacías.
 * Coloca los archivos en /public/images y aquí escribe su ruta como "images/foto.jpg".
 * Los enlaces deben empezar con https:// . Para WhatsApp puedes poner el número
 * internacional sin espacios, ej. "529XXXXXXXXX" (¡no uses ese ejemplo literalmente!).
 */
export const site = {
  name: 'VAQUERUN',
  tagline: 'CORRE · CONECTA · AYUDA',

  // Logos: deja "" para mostrar el isotipo ilustrativo temporal de la página.
  logo: 'images/VAQUERUNLOGO.png',
  helpingHeartsLogo: 'images/HHLOGO.png',
  heroImage: 'images/hero-vaquerun.webp',

  // Datos de la carrera; no publiques fechas o cantidades sin confirmar.
  event: {
    date: '19 de diciembre de 2026',
    location: 'Sede por anunciar',
    schedule: '4:00 p. m.',
    mapUrl: 'https://maps.app.goo.gl/23w8RAR2xeEd4zQn9', // Enlace a Google Maps de la sede
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d949.5114460781323!2d-93.39699675660098!3d17.8364885288872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1794345652543!5m2!1ses-419!2smx', // Enlace para insertar mapa de Google Maps
  },

  // Datos de participación, separados del sistema de cobro/recibos.
  registration: {
    googleFormUrl: '',
    qrImage: '',        // Ej. "images/qr-registro.png"; si está vacío se crea desde el enlace.
    points: [] as { name: string; address: string; hours?: string }[],
  },

  // Sección del kit: agrega elementos solo cuando estén oficialmente confirmados.
  kit: {
    photo: 'images/kit-cartel-oficial.jpg',          // Ej. "images/kit-oficial.jpg"
    includes: [] as string[], // Ej. ['Playera oficial', '...'] cuando sea real.
  },

  // WhatsApp de patrocinadores (puede ser distinto al general).
  sponsors: {
    whatsapp: "529171008862",
    qrLink: '',         // Opcional: destino distinto al WhatsApp para generar el QR.
    qrImage: '',        // Opcional: imagen propia de QR; tiene prioridad sobre qrLink.
    posterImage: "images/patrocinadores-oficial.jpg",
  },
  // Red social: deja "" hasta tener su enlace real.
  social: {
    instagram: "https://www.instagram.com/vaquerun_huimanguillo?psln=dmV4c3RsYzk3cDY0",
    facebook: "https://www.facebook.com/share/1JrWrV9M3P/?mibextid=wwXIfr",
    whatsappGeneral: "529171008862",
  },

  // Galería: reemplaza las ilustraciones temporales por fotos reales del evento/equipo.
  gallery: [
    {
      image: 'images/galeria-participante.jpg',
      title: 'Nuestra esencia',
      caption: 'La energía y el estilo vaquero de VAQUERUN.',
    },
    {
      image: 'images/galeria-preparacion.jpg',
      title: 'Listos para la aventura',
      caption: 'Cada paso cuenta cuando corremos por una buena causa.',
    },
    {
      image: 'images/galeria-sombrero-paliacate.jpg',
      title: 'Estilo vaquero',
      caption: 'Sombrero y paliacate: detalles que nos representan.',
    },
  ],
} as const
