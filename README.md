# 🤠 VAQUERUN · Sitio web público

Sitio informativo **VAQUERUN** para **Helping Hearts / Corazones que Ayudan**. Se diseñó como página pública, **sin registro de pagos, sin emisión de tickets y sin base de datos**. Pensado para GitHub Pages.

**Tecnología:** React + TypeScript + Vite + Tailwind CSS 4 + componentes shadcn/ui (Button, Accordion; código incluido) + Lucide + QR SVG.

## 1. Verlo en tu computadora

Requisitos: Node.js 22 o superior, Visual Studio Code y conexión a internet para descargar las dependencias la primera vez.

Abre la carpeta `VAQUERUN_WEB` en VS Code y abre su terminal:

```bash
npm install
npm run dev
```

Se mostrará una dirección parecida a `http://localhost:5173/`. Ábrela en tu navegador. Para generar el sitio final:

```bash
npm run build
npm run preview
```

También encontrarás `VISTA_PREVIA.html`, que puedes abrir directamente haciendo doble clic. Es **una muestra visual estática** y **NO refleja cambios** del formulario `src/config/site.ts`: la web verdadera se genera con React.

## 2. Cómo editar el logo, las redes, fotos y los datos

Edita **`src/config/site.ts`**. Este es el único archivo que debes tocar para cambiar la información principal:

| Necesitas cambiar | Propiedad en `site.ts` | Ejemplo de valor |
| --- | --- | --- |
| Logo VAQUERUN | `logo` | `'images/logo.png'` |
| Logo Helping Hearts | `helpingHeartsLogo` | `'images/helping-hearts.png'` |
| Imagen de portada | `heroImage` | `'images/portada.jpg'` |
| Fecha | `event.date` | `'23 de enero de 2027'` **(ejemplo, NO fecha real)** |
| Sede | `event.location` | `'Lugar confirmado'` |
| Recorrido | `event.distance` | `'Recorrido confirmado'` |
| Google Forms | `registration.googleFormUrl` | `'https://forms.gle/...'` |
| QR de registro propio | `registration.qrImage` | `'images/qr-registro.png'` |
| Puntos físicos | `registration.points` | Array de nombres, direcciones y horarios |
| Foto oficial del kit | `kit.photo` | `'images/kit.jpg'` |
| Contenido del kit | `kit.includes` | `['Artículo confirmado', 'Otro']` |
| WhatsApp patrocinadores | `sponsors.whatsapp` | `'529XXXXXXXXX'` **(ejemplo, reemplazar)** |
| QR de patrocinadores | `sponsors.qrImage` | `'images/qr-patrocinio.png'` |
| Instagram/Facebook/TikTok | `social.instagram`, etc. | URL completa `https://...` |
| WhatsApp general | `social.whatsappGeneral` | Número con clave de país o enlace |
| Fotos de la galería | `gallery` | Rutas + textos descriptivos |

**Importante:** Copia tus imágenes dentro de `public/images/` y en `site.ts` utiliza rutas como `images/mi-foto.jpg` (NO `C:\Users\...`). Si no agregas un logo, se muestra temporalmente un icono de sombrero. Los enlaces vacíos se muestran como "Próximamente" y no abren páginas incorrectas.

Ejemplo de punto físico (colócalo en `registration.points`):

```ts
points: [
  { name: 'Nombre del punto', address: 'Dirección oficial', hours: 'Horario confirmado' },
],
```

Si agregas `registration.googleFormUrl`, aparece un botón real y se crea el **código QR automáticamente**. Si prefieres subir la imagen del QR, ponla en `registration.qrImage`.

Si agregas `sponsors.whatsapp`, el botón abre WhatsApp y el QR se crea automáticamente. Se puede sustituir por un QR propio (`sponsors.qrImage`). Los números deben estar en formato internacional. Los links externos se abren en otra pestaña.

## 3. Publicar GRATIS en GitHub Pages

1. Crea en GitHub un **repositorio público** (por ejemplo `vaquerun`).
2. Sube **todo el contenido** de esta carpeta a la **raíz** del repositorio (incluida la carpeta oculta `.github/workflows`). No subas `node_modules`.
3. En GitHub entra a `Settings → Pages → Build and deployment → Source`, elige **GitHub Actions**.
4. Ve a `Actions`. El flujo **Publicar VAQUERUN en GitHub Pages** se ejecutará al subir los archivos a la rama `main` o `master`, o puedes iniciarlo con `Run workflow`.
5. Cuando finalice correctamente, en `Settings → Pages` encontrarás el enlace público, por ejemplo `https://USUARIO.github.io/vaquerun/`.
6. Comparte ese enlace o conviértelo en un QR. No es necesario comprar dominio.

La configuración `base: './'` en Vite permite alojarlo dentro de la ruta del repositorio, sin que se rompan las imágenes y estilos.

**Para futuras actualizaciones:** modifica `src/config/site.ts`, guarda, haz commit/push y GitHub Actions vuelve a compilar y publicar el sitio.

**Nota:** Este ZIP no incluye `node_modules` ni `package-lock.json`. El flujo usa `npm install` (no `npm ci`). El proyecto está listo para instalar dependencias, pero no fue posible descargarlas en el entorno de elaboración, por lo que el build de producción no pudo verificarse aquí. Revisa el resultado de `npm run build` o la pestaña `Actions`.

## 4. Recomendaciones antes de difundir la página

- Confirma los datos oficiales: **fecha, sede, recorrido, puntos de inscripción y qué contiene el kit**.
- Agrega logos oficiales y redes reales.
- Sustituye las ilustraciones de galería por imágenes autorizadas del evento.
- Verifica el enlace real de Google Forms y los números de WhatsApp.
- No añadas datos personales de asistentes ni recibos a este repositorio público.
- No uses esta página pública como sistema de autorización o registro de pagos; esa función debe desarrollarse aparte con controles adecuados.

### Diseño incluido

Hero con imagen original estilo vaquero, menú móvil, transiciones al desplazarse, cinta animada, conócenos, misión, detalles del evento, kit, inscripciones y puntos de registro, QR automático, patrocinio y QR, galería ampliable, preguntas frecuentes, redes sociales y pie de página responsive. Incorpora preferencias de movimiento reducido para accesibilidad.

---

**Contenido editorial:** Se evita presentar fechas, precios, distancias o elementos del kit no confirmados. VAQUERUN es una convivencia social sin podio; este año Helping Hearts sustituye el desfile tradicional por visitas a localidades que necesitan apoyo para entregar juguetes.
