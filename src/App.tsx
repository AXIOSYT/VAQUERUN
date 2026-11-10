import { Promociones } from './components/Promociones'
import { useEffect, useState, type ReactNode } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays,
  Check, CircleHelp, Clock3, Facebook,
  Gift, HandHeart, Heart, HeartHandshake, Instagram, MapPin,
Menu, MessageCircle, MoveRight, Play, Share2,
  Sparkles, Star, Ticket, Users, X, type LucideIcon,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { localImage, whatsAppLink } from '@/lib/utils'
import { site } from '@/config/site'

const MENU = [
  ['#inicio', 'Inicio'], ['#conocenos', 'Conócenos'], ['#evento', 'La carrera'],
  ['#kit', 'Kit'], ['#registro', 'Inscripciones'], ['#avisos', 'Avisos'], ['#patrocinadores', 'Patrocina'],
  ['#galeria', 'Galería'], ['#contacto', 'Contacto'],
]

function useScrollEffects() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25)
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((e) => e.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
    elements.forEach((e) => observer.observe(e))
    return () => observer.disconnect()
  }, [])
  return scrolled
}

function HatMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 76 58" fill="none">
      <path d="M21 29 29 8c2-5 7-7 11-4l7 5c4 2 8 2 12-1l6-4 3 26" fill="#D8A268" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M19 29c12 8 37 7 49-1M5 33c-3 13 9 18 30 18 17 0 29-3 36-9 5-4 3-10-1-11-15 11-43 11-59 3L5 33Z" fill="#C48650" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M22 27c14 6 32 6 44-1" stroke="#522B20" strokeWidth="4.5" strokeLinecap="round" />
      <path d="m44 19 2.3 4.2 4.7.8-3.3 3.2.6 4.5-4.3-2.2-4.3 2.2.7-4.5-3.4-3.2 4.7-.8L44 19Z" fill="#F6DFB4" />
    </svg>
  )
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="VAQUERUN, ir al inicio">
      {site.logo ? <img className="brand-logo" src={localImage(site.logo)} alt="Logo de VAQUERUN" /> : <HatMark className="brand-hat" />}
      <span className="brand-text"><strong>VAQUERUN</strong><small>CORRE CON CAUSA</small></span>
    </a>
  )
}

function SmallLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <span className={`small-label ${inverse ? 'small-label-light' : ''}`}><span className="label-line" /><Star size={12} fill="currentColor" />{children}</span>
}

function SectionTitle({ eyebrow, title, desc, inverse = false, center = false }: {
  eyebrow: string; title: ReactNode; desc?: string; inverse?: boolean; center?: boolean
}) {
  return <div className={`section-heading ${inverse ? 'heading-inverse' : ''} ${center ? 'heading-centered' : ''}`} data-reveal>
    <SmallLabel inverse={inverse}>{eyebrow}</SmallLabel>
    <h2>{title}</h2>
    {desc && <p>{desc}</p>}
  </div>
}

function Stamp({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return <div className="stamp"><Icon size={20} strokeWidth={1.8} /><span>{label}</span></div>
}

function ExternalButton({ href, children, className = '', variant = 'default', icon: Icon = ArrowUpRight }: {
  href: string; children: ReactNode; className?: string; variant?: 'default' | 'secondary' | 'outline' | 'ghost'; icon?: LucideIcon
}) {
  if (!href) return <span className={`ui-button ui-size-default ui-button-disabled ${className}`} title="Enlace por confirmar"><Clock3 size={16} /> Próximamente</span>
  return <Button asChild className={className} variant={variant}>
    <a href={href} target="_blank" rel="noopener noreferrer">{children}<Icon size={18} /></a>
  </Button>
}

function Header({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [menuOpen])
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><Sparkles size={13} /> UNA EXPERIENCIA CON PROPÓSITO</span><span>UN EVENTO CON CAUSA · HELPING HEARTS <Heart size={12} fill="currentColor" /></span></div></div>
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Menú principal">{MENU.slice(0, -1).map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="header-cta" href="#registro">QUIERO SUMARME <ArrowUpRight size={15} /></a>
        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((x) => !x)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-label="Menú móvil">{MENU.map(([href, label]) => <a onClick={() => setMenuOpen(false)} href={href} key={href}>{label}<ArrowUpRight size={16} /></a>)}</nav>
    </header>
  </>
}

function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <img className="hero-image" src={localImage(site.heroImage)} alt="Ilustración fotográfica de un grupo de amigos con atuendo vaquero trotando al atardecer" fetchPriority="high" />
    <div className="hero-gradient" />
    <div className="hero-grain" />
    <div className="container hero-inner">
      <div className="hero-content">
        <div className="hero-topline"><span className="hero-topline-dot" /> MÁS QUE UNA CARRERA. UNA MISIÓN.</div>
        <h1 id="hero-title"><span className="hero-title-first">POLVO, BOTAS</span><span className="hero-title-accent">Y CORAZÓN.</span></h1>
        <p className="hero-subtitle">Bienvenidos a <strong>VAQUERUN</strong>: donde las ganas de convivir se encuentran con el deseo de ayudar.</p>
        <p className="hero-description">Una experiencia social con esencia vaquera, organizada para sumar esfuerzos y llevar alegría a niñas y niños que más lo necesitan.</p>
        <div className="hero-actions">
          <Button asChild className="hero-primary" size="lg"><a href="#conocenos">CONOCE LA CAUSA <ArrowUpRight size={19} /></a></Button>
          <Button asChild className="hero-secondary" size="lg" variant="outline"><a href="#evento"><Play size={16} fill="currentColor" /> DESCUBRE EL EVENTO</a></Button>
        </div>
        <div className="hero-mini"><span className="hero-mini-line" /><Heart size={18} strokeWidth={1.8} /><span><strong>Sin competencia. Sin podios.</strong> Solo personas unidas por una causa.</span></div>
      </div>
      <div className="hero-seal" aria-label="Corre con causa"><div className="hero-seal-inner"><Star size={14} fill="currentColor" /><span>JUNTOS</span><strong>LLEGAMOS<br />MÁS LEJOS</strong><span>♥ 2026 ♥</span></div></div>
    </div>
    <a href="#conocenos" className="hero-scroll" aria-label="Deslizar para conocer más"><span>EXPLORA</span><ArrowDown size={17} /></a>
    <svg className="hero-edge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path fill="#f7f0e5" d="M0 38 41 46 81 36 127 44 185 29 231 37 277 32 332 42 389 29 444 37 499 27 543 43 588 33 639 40 694 27 749 41 801 32 853 42 906 30 963 43 1012 34 1067 40 1111 29 1166 41 1217 32 1277 43 1337 35 1385 41 1440 32V90H0Z"/></svg>
  </section>
}

function Marquee() {
  const phrases = ['CORRE POR UNA SONRISA', 'SIN PODIO, CON PROPÓSITO', 'ESPÍRITU VAQUERO', 'HELPING HEARTS']
  return <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...phrases, ...phrases, ...phrases, ...phrases].map((x, i) => <span key={i}><Star size={16} fill="currentColor" /> {x}</span>)}</div></div>
}

function About() {
  return <section id="conocenos" className="section section-cream about-section">
    <div className="container about-grid">
      <div className="about-image-panel" data-reveal>
        <div className="about-image-wrap"><img src={localImage('images/foto-conocenos.jpg.jpeg')} alt="Amigos compartiendo una carrera social en un ambiente vaquero" loading="lazy" /></div>
        <div className="about-orbit about-orbit-one" /><div className="about-orbit about-orbit-two" />
        <div className="about-sticker"><HeartHandshake size={30} /><b>UNA CAUSA<br />QUE NOS UNE</b><span>♥</span></div>
        <div className="about-caption">CORAZONES QUE AYUDAN <Star size={12} fill="currentColor" /></div>
      </div>
      <div className="about-copy">
        <SectionTitle eyebrow="01 · CONÓCENOS" title={<>Una carrera que <em>nace del corazón.</em></>} desc="Detrás de cada paso hay una historia. Detrás de este evento, hay una misión que vale la pena compartir." />
        <div className="about-org" data-reveal>
          {site.helpingHeartsLogo ? <img className="about-org-logo" src={localImage(site.helpingHeartsLogo)} alt="Logo de Helping Hearts" /> : <div className="about-org-icon"><HeartHandshake size={30} /></div>}
          <div><span>ORGANIZADO POR</span><strong>Helping Hearts</strong><small>Corazones que Ayudan</small></div>
        </div>
        <p data-reveal>Somos parte de una iniciativa altruista que organiza eventos para recaudar fondos y transformarlos en <strong>juguetes, ilusión y momentos especiales</strong> para niñas y niños que los necesitan.</p>
        <p data-reveal>Este año nuestra misión toma un nuevo camino: <strong>en lugar del tradicional desfile de Día de Reyes</strong>, queremos visitar poblados y comunidades con mayores necesidades para entregar los juguetes directamente y compartir un mensaje de solidaridad.</p>
        <p data-reveal>Con VAQUERUN también buscamos inspirar a más personas a conocer, compartir y apoyar esta causa a través de las redes sociales.</p>
        <a href="#causa" className="text-link" data-reveal>DESCUBRE NUESTRA MISIÓN <ArrowUpRight size={19} /></a>
      </div>
    </div>
  </section>
}

const causeCards = [
  { icon: Gift, number: '01', title: 'Llevar sonrisas', text: 'Reunir apoyos para entregar juguetes a niños y niñas en comunidades que necesitan un gesto de alegría.' },
  { icon: HandHeart, number: '02', title: 'Acercarnos más', text: 'Cambiar el recorrido de un desfile por visitas directas a poblados y lugares con mayores necesidades.' },
  { icon: Share2, number: '03', title: 'Hacer eco', text: 'Crear conciencia y compartir la misión para que más personas se sumen y la solidaridad llegue más lejos.' },
]
function Cause() {
  return <section className="section section-sand cause-section" id="causa"><div className="container">
    <div className="cause-top"><SectionTitle eyebrow="02 · NUESTRA MISIÓN" title={<>No solo contamos pasos.<br /><em>Contamos buenas acciones.</em></>} /><div className="cause-top-aside" data-reveal><span className="cause-top-aside-heart">♥</span>Porque una comunidad unida puede cambiar mucho más que una meta.</div></div>
    <div className="cause-cards">{causeCards.map(({ icon: Icon, number, title, text }) => <article className="cause-card" data-reveal key={title}><div className="cause-card-upper"><span>{number} / 03</span><Icon size={35} strokeWidth={1.35} /></div><h3>{title}</h3><p>{text}</p><div className="cause-card-bottom"><span>HEARTS IN MOTION</span><ArrowUpRight size={18} /></div></article>)}</div>
  </div></section>
}

function EventSection() {
  const mapUrl = site.event.mapUrl
  const mapEmbedUrl = site.event.mapEmbedUrl
  const venueName = site.event.location && !/por anunciar|pendiente/i.test(site.event.location) ? site.event.location : ''
  return <section id="evento" className="section event-section"><div className="event-bg-art" aria-hidden="true"><div className="mountain one" /><div className="mountain two" /></div><div className="container event-grid">
    <div className="event-left"><SectionTitle eyebrow="03 · EL EVENTO" inverse title={<>Ni primero ni último.<br /><em>Todos llegamos juntos.</em></>} desc="VAQUERUN no es una carrera de competencia: es una convivencia para correr, caminar, compartir y pasarla bien, con una razón que nos mueve." />
      <p className="event-body" data-reveal>Aquí no habrá primero, segundo o tercer lugar. No perseguimos un podio; <strong>celebramos el hecho de presentarnos, convivir y participar por una buena causa.</strong></p>
      <div className="event-stamps" data-reveal><Stamp label="SIN PODIO" icon={BadgeCheck} /><Stamp label="CON AMIGOS" icon={Users} /><Stamp label="CON CAUSA" icon={Heart} /></div>
    </div>
    <div className="event-right event-right-venue" data-reveal>
      <div className="event-info-top"><span>LA PRÓXIMA AVENTURA</span><Star size={20} fill="currentColor" /></div>
      <h3>UN DÍA PARA<br />HACER HISTORIA.</h3>
      <div className="event-facts">
        <div className="event-fact"><span className="event-fact-icon"><CalendarDays size={21} /></span><div><small>FECHA</small><strong>{site.event.date}</strong></div></div>
        <div className="event-fact"><span className="event-fact-icon"><Clock3 size={21} /></span><div><small>HORA DE INICIO</small><strong>{site.event.schedule}</strong></div></div>
      </div>
      <div className="venue-heading"><MapPin size={21} /><span>UBICACIÓN DE LA SEDE</span></div>
      {mapEmbedUrl ? (
        <iframe className="venue-map-frame" title="Mapa de la sede de VAQUERUN" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="venue-map-placeholder"><MapPin size={34} strokeWidth={1.6} /><strong>Encuéntranos aquí</strong><span>Agregaremos el mapa del punto de salida cuando se confirme la ubicación.</span></div>
      )}
      {venueName && <p className="venue-address">{venueName}</p>}
      {mapUrl && <a className="venue-map-link" href={mapUrl} target="_blank" rel="noopener noreferrer">VER UBICACIÓN EN GOOGLE MAPS <ArrowUpRight size={18} /></a>}
      <a href="#registro" className="event-info-link">¿QUIERES PARTICIPAR? <MoveRight size={19} /></a>
    </div>
  </div></section>
}

function KitSection() {
  const items: readonly string[] = site.kit.includes
  return <section id="kit" className="section kit-section section-cream"><div className="container kit-grid">
    <div className="kit-copy"><SectionTitle eyebrow="04 · PARTICIPA CON ESTILO" title={<>El espíritu vaquero<br /><em>también se lleva puesto.</em></>} desc="Estos son los artículos que acompañarán tu experiencia en VAQUERUN. Consulta el cartel oficial del kit." />
      <div className="kit-list" data-reveal><h3>¿QUÉ INCLUYE EL KIT?</h3>{items.length ? <ul>{items.map((item) => <li key={item}><span className="check-round"><Check size={15} /></span>{item}</li>)}</ul> : <div className="kit-pending"><Ticket size={21} /><div><strong>Contenido por confirmar</strong><span>Publicaremos los artículos del kit cuando estén definidos por la organización.</span></div></div>}</div>
      <a className="text-link" href="#contacto" data-reveal>MANTENTE AL PENDIENTE <ArrowUpRight size={19} /></a>
    </div>
    <div className="kit-visual" data-reveal>
      <div className={`kit-visual-inner ${site.kit.photo.includes("kit-cartel-oficial.jpg") ? "kit-poster-inner" : ""}`}>{site.kit.photo ? <img src={localImage(site.kit.photo)} alt="Cartel oficial con los artículos que incluye el kit VAQUERUN" loading="lazy" /> : <div className="kit-visual-placeholder"><div className="kit-sun" /><HatMark className="kit-hat" /><span className="kit-placeholder-top">EL KIT OFICIAL</span><strong>ESTÁ POR<br />REVELARSE</strong><small>FOTOGRAFÍA PRÓXIMAMENTE</small></div>}</div>
      <div className="kit-sticker"><span>★</span><strong>EDICIÓN<br />CON CAUSA</strong><span>★</span></div>
    </div>
  </div></section>
}

function Registration() {
  const link = site.registration.googleFormUrl
  const points: readonly { name: string; address: string; hours?: string }[] = site.registration.points
  return <section id="registro" className="section registration-section section-sand"><div className="container"><SectionTitle eyebrow="05 · ÚNETE A LA AVENTURA" title={<>El primer paso <em>lo das tú.</em></>} desc="Consulta cómo sumarte y encuentra aquí los puntos de inscripción y el cartel con el código de registro oficial." center />
    <div className="registration-layout">
      <div className="registration-steps" data-reveal><div className="registration-step"><span className="step-number">01</span><div><h3>Conoce el evento</h3><p>Descubre qué nos mueve y por qué cada participante forma parte de esta causa.</p></div></div><div className="registration-step"><span className="step-number">02</span><div><h3>Revisa los puntos de inscripción</h3><p>Podrás encontrar los lugares y horarios oficiales de registro en este mismo apartado.</p></div></div><div className="registration-step"><span className="step-number">03</span><div><h3>Completa tu registro</h3><p>Escanea el QR que aparece en el cartel oficial y sigue las indicaciones del formulario.</p></div></div>
      <div className="registration-points" id="registro-presencial">
        <div className="registration-points-head"><MapPin size={20} /><strong>INSCRIPCIONES PRESENCIALES</strong></div>
        <p className="registro-presencial-intro">¿Prefieres hacer tu registro en persona? ¡También puedes inscribirte presencialmente en Huimanguillo!</p>
        <div className="registro-presencial-card">
          <strong className="registro-presencial-direccion">Calle Benito Juárez #143</strong>
          <span className="registro-presencial-referencia">A un lado de Carnicería Don Ciriaco, Huimanguillo, Tabasco.</span>
          <div className="registro-presencial-horario-titulo"><Clock3 size={18} /><strong>HORARIOS PARA INSCRIBIRTE</strong></div>
          <div className="registro-presencial-horarios">
            <div><span>Lunes, miércoles y viernes</span><strong>4:00 a 8:00 p. m.</strong></div>
            <div><span>Sábado y domingo</span><strong>10:00 a. m. a 2:00 p. m.</strong></div>
          </div>
          <a className="registro-presencial-maps" href="https://www.google.com/maps/search/?api=1&query=Calle%20Benito%20Ju%C3%A1rez%20143%20Huimanguillo%20Tabasco" target="_blank" rel="noopener noreferrer">BUSCAR DIRECCIÓN EN GOOGLE MAPS <MapPin size={16} /></a>
        </div>
        {points.filter((point) => !/benito\s+ju[aá]rez|don\s+ciriaco/i.test(point.address)).map((point) => <div className="registration-point" key={point.name}><strong>{point.name}</strong><span>{point.address}</span>{point.hours && <small>{point.hours}</small>}</div>)}
      </div></div>
      <div className="registration-qr registration-poster-panel" data-reveal>
        <div className="registration-qr-head"><Ticket size={24} /><span>FORMULARIO OFICIAL</span></div>
        <h3>¿LISTO PARA<br /><em>SUMARTE?</em></h3>
        <p>Escanea el QR del cartel para inscribirte. También puedes usar el enlace directo cuando esté configurado.</p>
        {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="registration-poster-link"><img className="registration-poster-image" src={localImage('images/registro-cartel-oficial.jpg')} alt="Cartel oficial de VAQUERUN: escanea e inscríbete aquí" loading="lazy" /></a> : <img className="registration-poster-image" src={localImage('images/registro-cartel-oficial.jpg')} alt="Cartel oficial de VAQUERUN: escanea e inscríbete aquí" loading="lazy" />}
        <span className="qr-instruction">INSCRIPCIÓN OFICIAL · 19 DE DICIEMBRE</span>
        {link && <ExternalButton href={link} className="registration-form-link">ABRIR FORMULARIO</ExternalButton>}
      </div>
    </div>
  </div></section>
}

function Sponsors() {
  const sponsorWhatsApp = whatsAppLink(site.sponsors.whatsapp)
  return <section id="patrocinadores" className="section sponsors-section">
    <div className="sponsor-light" />
    <div className="container sponsor-grid">
      <div className="sponsor-copy">
        <SectionTitle eyebrow="06 · HAGAMOS EQUIPO" inverse title={<>Una buena causa<br />necesita <em>grandes aliados.</em></>} desc="Cada apoyo cuenta para llevar más alegría a niñas y niños. Si tienes un negocio, emprendimiento o simplemente quieres sumarte, nos encantará escucharte." />
        <div className="sponsor-options" data-reveal>
          <div><HandHeart size={23} /><span>APORTACIONES<br />Y DONATIVOS</span></div>
          <div><Gift size={23} /><span>APOYO CON<br />JUGUETES</span></div>
          <div><Share2 size={23} /><span>DIFUSIÓN<br />Y ALIANZAS</span></div>
        </div>
        <div className="sponsor-actions" data-reveal>
          <ExternalButton href={sponsorWhatsApp} className="sponsor-primary" icon={MessageCircle}>QUIERO PATROCINAR</ExternalButton>
          <p>Contáctanos para conocer cómo colaborar con la causa.</p>
        </div>
      </div>
      <aside className="sponsor-qr-card sponsor-poster-card" data-reveal>
        <div className="sponsor-card-accent">★ CONVIÉRTETE EN ALIADO ★</div>
        <div className="sponsor-card-content">
          <a className="sponsor-poster-link" href={sponsorWhatsApp} target="_blank" rel="noopener noreferrer" aria-label="Contactar para patrocinar VAQUERUN">
            <img className="sponsor-poster" src={localImage(site.sponsors.posterImage)} alt="Cartel oficial: estamos buscando patrocinadores para VAQUERUN" loading="lazy" />
          </a>
          <span>¿QUIERES COLABORAR? · 917 100 8862</span>
        </div>
      </aside>
    </div>
  </section>
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const images = site.gallery
  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight') setSelected((n) => n === null ? null : (n + 1) % images.length)
      if (e.key === 'ArrowLeft') setSelected((n) => n === null ? null : (n - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = old }
  }, [selected, images.length])
  return <section id="galeria" className="section gallery-section section-cream"><div className="container"><div className="gallery-heading-row"><SectionTitle eyebrow="07 · MOMENTOS QUE INSPIRAN" title={<>Postales de un camino<br /><em>que hacemos juntos.</em></>} /><p data-reveal>Aquí reunimos algunas fotografías reales que ayudan a transmitir el estilo, la comunidad y la esencia de VAQUERUN.</p></div>
    <div className="gallery-grid">{images.map((item, index) => <button className={`gallery-tile gallery-tile-${index + 1}`} onClick={() => setSelected(index)} aria-label={`Ampliar: ${item.title}`} type="button" key={item.title} data-reveal><img src={localImage(item.image)} alt={item.caption} loading="lazy" /><span className="gallery-overlay" /><span className="gallery-tile-text"><small>VAQUERUN / {String(index + 1).padStart(2, '0')}</small><strong>{item.title}</strong></span><span className="gallery-zoom"><ArrowUpRight size={21} /></span></button>)}</div>
    <p className="gallery-note"><CircleHelp size={15} /> Esta galería ya incluye algunas fotografías reales de VAQUERUN; puedes sustituirlas o agregar más cuando quieras.</p>
  </div>
  {selected !== null && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`Fotografía: ${images[selected].title}`} onClick={() => setSelected(null)}><div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}><button className="gallery-close" type="button" aria-label="Cerrar fotografía" onClick={() => setSelected(null)}><X size={25} /></button><img src={localImage(images[selected].image)} alt={images[selected].caption} /><div className="gallery-modal-footer"><button type="button" aria-label="Imagen anterior" onClick={() => setSelected((selected - 1 + images.length) % images.length)}><ArrowLeft /></button><span>{images[selected].title} · {selected + 1} / {images.length}</span><button type="button" aria-label="Imagen siguiente" onClick={() => setSelected((selected + 1) % images.length)}><ArrowRight /></button></div></div></div>}
  </section>
}

function FAQ() {
  return <section className="section faq-section section-sand" id="preguntas"><div className="container faq-grid"><div className="faq-intro"><SectionTitle eyebrow="08 · RESOLVEMOS TUS DUDAS" title={<>Lo que debes <em>saber.</em></>} /><div className="faq-sticker"><span>¿MÁS PREGUNTAS?</span><Heart size={30} /><a href="#contacto">CONTÁCTANOS <ArrowUpRight size={17} /></a></div></div><div className="faq-list" data-reveal><Accordion type="single" collapsible defaultValue="item-1"><AccordionItem value="item-1"><AccordionTrigger>¿VAQUERUN es una carrera competitiva?</AccordionTrigger><AccordionContent>No. Es una carrera social y recreativa. No habrá premiaciones por primero, segundo o tercer lugar: lo importante es participar, convivir y apoyar la causa.</AccordionContent></AccordionItem><AccordionItem value="item-2"><AccordionTrigger>¿Cuál es el propósito del evento?</AccordionTrigger><AccordionContent>Sumar apoyos para la labor altruista de Helping Hearts / Corazones que Ayudan, cuya misión este año es llevar juguetes directamente a niñas y niños de comunidades con mayores necesidades.</AccordionContent></AccordionItem><AccordionItem value="item-4"><AccordionTrigger>¿Dónde me inscribo y qué incluye el kit?</AccordionTrigger><AccordionContent>Encontrarás la información del kit y los puntos de inscripción en sus respectivos apartados de esta página; consulta también los carteles oficiales para conocer las novedades.</AccordionContent></AccordionItem><AccordionItem value="item-5"><AccordionTrigger>¿Cómo puedo apoyar como patrocinador?</AccordionTrigger><AccordionContent>En la sección de patrocinadores encontrarás la imagen oficial de invitación y el contacto directo por WhatsApp para comunicarte con el equipo responsable de las colaboraciones.</AccordionContent></AccordionItem></Accordion></div></div></section>
}

function SocialCard({ icon: Icon, title, value, sub }: { icon: LucideIcon; title: string; value: string; sub: string }) {
  return value ? <a className="social-card" href={value} target="_blank" rel="noopener noreferrer"><Icon size={25} strokeWidth={1.7} /><span><strong>{title}</strong><small>{sub}</small></span><ArrowUpRight className="social-arrow" size={19} /></a> : <div className="social-card social-disabled" title={`Agrega el enlace de ${title} en src/config/site.ts`}><Icon size={25} strokeWidth={1.7} /><span><strong>{title}</strong><small>Enlace próximamente</small></span><Clock3 className="social-arrow" size={17} /></div>
}

function Contact() {
  return <section id="contacto" className="section contact-section section-cream"><div className="container"><div className="contact-top"><SectionTitle eyebrow="09 · SIGAMOS EN CONTACTO" title={<>La aventura sigue <em>en comunidad.</em></>} desc="Síguenos, comparte la causa e invita a alguien más a formar parte de VAQUERUN." /><div className="contact-illustration" aria-hidden="true"><HatMark /></div></div>
    <div className="social-grid" data-reveal><SocialCard icon={Instagram} title="Instagram" value={site.social.instagram} sub="Fotos, historias y novedades" /><SocialCard icon={Facebook} title="Facebook" value={site.social.facebook} sub="Noticias y comunidad" /><SocialCard icon={MessageCircle} title="WhatsApp" value={whatsAppLink(site.social.whatsappGeneral)} sub="Escríbenos directamente" /></div>
    <div className="contact-banner" data-reveal><span><Heart size={24} fill="currentColor" /> HAZ QUE ESTA CAUSA LLEGUE MÁS LEJOS.</span><a href="#patrocinadores">SÚMATE AL MOVIMIENTO <ArrowUpRight size={19} /></a></div>
  </div></section>
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-main"><div><Brand light /><p>Una convivencia con esencia vaquera y una misión que se lleva en el corazón.</p></div><div><span>EXPLORA</span><a href="#conocenos">Conócenos</a><a href="#evento">El evento</a><a href="#registro">Inscripciones</a><a href="#patrocinadores">Patrocinios</a></div><div><span>DETRÁS DE LA CAUSA</span><div className="footer-hearts"><HeartHandshake size={29} /><div><strong>Helping Hearts</strong><small>Corazones que Ayudan</small></div></div><p>Pequeñas acciones, grandes sonrisas.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VAQUERUN. HECHO CON CORAZÓN.</span><span>UNA CARRERA SOCIAL · NO COMPETITIVA <Heart size={13} fill="currentColor" /></span><a href="#inicio">VOLVER ARRIBA ↑</a></div></div></footer>
}

function FloatContact() {
  const link = whatsAppLink(site.social.whatsappGeneral)
  if (!link) return null
  return <a className="float-wa" href={link} rel="noopener noreferrer" target="_blank" aria-label="Abrir WhatsApp"><MessageCircle size={24} /></a>
}

function App() {
  const scrolled = useScrollEffects()
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header scrolled={scrolled} /><main id="contenido"><Hero /><Marquee /><About /><Cause /><EventSection /><KitSection /><Registration /><Promociones /><Sponsors /><Gallery /><FAQ /><Contact /></main><Footer /><FloatContact /></>
}

export default App
