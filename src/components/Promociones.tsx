import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Images, Maximize2, X } from 'lucide-react'
import { localImage } from '@/lib/utils'

/**
 * Puedes editar títulos, descripciones e imágenes aquí.
 * Las fotos originales están en public/images/promociones/.
 */
const publicaciones = [
  {
    image: 'images/promociones/registro-qr.jpg',
    title: '¡Inscripciones abiertas!',
    description: 'Escanea el código del cartel para conocer cómo registrarte.',
  },
  {
    image: 'images/promociones/horarios-inscripcion.jpg',
    title: 'Horarios y punto de inscripción',
    description: 'Consulta dónde y cuándo puedes inscribirte de manera presencial.',
  },
  {
    image: 'images/promociones/kit-incluye.jpg',
    title: '¿Qué incluye tu kit?',
    description: 'Conoce los artículos incluidos en el kit de participante.',
  },
  {
    image: 'images/promociones/beneficios-kit.jpg',
    title: 'Beneficios de tu kit',
    description: 'Descubre las actividades y experiencias anunciadas para el evento.',
  },
  {
    image: 'images/promociones/al-finalizar.jpg',
    title: 'Al finalizar el recorrido',
    description: 'Música, convivencia y más actividades al terminar.',
  },
]

export function Promociones() {
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => {
    if (selected === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight') setSelected((n) => n === null ? null : (n + 1) % publicaciones.length)
      if (event.key === 'ArrowLeft') setSelected((n) => n === null ? null : (n + publicaciones.length - 1) % publicaciones.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  return (
    <section id="avisos" className="section promociones-section section-cream" aria-labelledby="promociones-titulo">
      <div className="container">
        <div className="promociones-heading" data-reveal>
          <div>
            <span className="small-label"><span className="label-line" /> ★ NOVEDADES DEL EVENTO</span>
            <h2 id="promociones-titulo">TODO SOBRE <em>VAQUERUN.</em></h2>
            <p>Inscripciones, kit, experiencias y todo lo que necesitas saber. Toca cada cartel para verlo completo y leer sus detalles.</p>
          </div>
          <div className="promociones-stamp"><Images size={22} /> 5 AVISOS OFICIALES</div>
        </div>
        <div className="promociones-grid">
          {publicaciones.map((item, index) => (
            <button className="promocion-card" key={item.image} type="button" onClick={() => setSelected(index)} aria-label={`Ampliar cartel: ${item.title}`} data-reveal>
              <span className="promocion-picture"><img src={localImage(item.image)} loading="lazy" alt={item.title} /><span className="promocion-open"><Maximize2 size={18} /> VER COMPLETO</span></span>
              <span className="promocion-details"><span className="promocion-number">AVISO {String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><small>{item.description}</small></span>
            </button>
          ))}
        </div>
        <p className="promociones-note">La información corresponde a los carteles facilitados por la organización. Consulta sus redes sociales por si hay actualizaciones.</p>
      </div>
      {selected !== null && (
        <div className="promociones-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
          <div className="promociones-modal" role="dialog" aria-modal="true" aria-label={`Cartel ampliado: ${publicaciones[selected].title}`}>
            <div className="promociones-modal-top"><span>{selected + 1} / {publicaciones.length} · {publicaciones[selected].title}</span><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Cerrar imagen"><X size={22} /></button></div>
            <img className="promociones-modal-img" src={localImage(publicaciones[selected].image)} alt={publicaciones[selected].title} />
            <div className="promociones-modal-bottom">
              <button type="button" onClick={() => setSelected((selected - 1 + publicaciones.length) % publicaciones.length)}><ArrowLeft size={18} /> ANTERIOR</button>
              <span>VAQUERUN · PUBLICACIONES</span>
              <button type="button" onClick={() => setSelected((selected + 1) % publicaciones.length)}>SIGUIENTE <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
