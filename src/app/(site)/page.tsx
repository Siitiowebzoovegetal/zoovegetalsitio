import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, Leaf, Beaker, Truck, ChevronRight, Star } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { active: true, featured: true },
      orderBy: { order: 'asc' },
      take: 6,
    })
  } catch {
    return []
  }
}

async function getLatestPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
  } catch {
    return []
  }
}

const categoryCards = [
  {
    id: 'canino',
    label: 'Caninos',
    emoji: '🐕',
    desc: 'Snacks, concentrado seco, comida cocida congelada y suplementos para perros de todas las razas y edades.',
    accentColor: '#7ec823',
    bgGradient: 'linear-gradient(135deg, #f0f9e0 0%, #e8f5d0 100%)',
    borderColor: 'rgba(126,200,35,0.2)',
    href: '/productos?cat=canino',
    tag: '20+ productos',
  },
  {
    id: 'felino',
    label: 'Felinos',
    emoji: '🐈',
    desc: 'Nutrición balanceada, galletas y suplementos especializados para gatos con ingredientes naturales.',
    accentColor: '#f5a623',
    bgGradient: 'linear-gradient(135deg, #fffbf0 0%, #fff3d6 100%)',
    borderColor: 'rgba(245,166,35,0.2)',
    href: '/productos?cat=felino',
    tag: '15+ productos',
  },
  {
    id: 'equino',
    label: 'Equinos',
    emoji: '🐴',
    desc: 'Concentrado, snacks y suplementos nutricionales pelletizados para caballos de alto rendimiento.',
    accentColor: '#063b05',
    bgGradient: 'linear-gradient(135deg, #edf7ec 0%, #dff0de 100%)',
    borderColor: 'rgba(6,59,5,0.15)',
    href: '/productos?cat=equino',
    tag: '10+ productos',
  },
]

const stats = [
  { value: '7+', label: 'Años de experiencia', icon: '⏱️' },
  { value: '50+', label: 'Productos fabricados', icon: '📦' },
  { value: '100%', label: 'Ingredientes naturales', icon: '🌿' },
  { value: 'BPM', label: 'Certificación ICA', icon: '🏆' },
]

const services = [
  {
    icon: Beaker,
    title: 'Desarrollo de Producto',
    desc: 'Formulamos y desarrollamos tu producto desde cero, adaptado a tu marca y mercado objetivo.',
    color: '#7ec823',
    bg: 'rgba(126,200,35,0.12)',
  },
  {
    icon: Leaf,
    title: 'Maquila con Registro ICA',
    desc: 'Producción a escala con o sin registro ICA. Tú defines la marca, nosotros la fabricamos.',
    color: '#f5a623',
    bg: 'rgba(245,166,35,0.12)',
  },
  {
    icon: Award,
    title: 'Asesoría Especializada',
    desc: 'Te acompañamos desde la concepción del producto hasta la comercialización final.',
    color: '#c8e88a',
    bg: 'rgba(200,232,138,0.15)',
  },
  {
    icon: Truck,
    title: 'Logística Integral',
    desc: 'Gestionamos toda la cadena de producción y te entregamos listo para vender.',
    color: '#7ec823',
    bg: 'rgba(126,200,35,0.12)',
  },
]

const whyUs = [
  'Materias primas de grado humano: proteínas animales y vegetales',
  'Análisis microbiológico y bromatológico en cada lote',
  'Certificación BPM ICA — Buenas Prácticas de Manufactura',
  'Registro ICA individual por producto',
  'Fórmulas personalizadas para tu marca o negocio',
  'Acompañamiento desde la concepción hasta el mercado',
]

const certBadges = [
  { icon: '✅', title: 'BPM ICA', sub: 'Certificado' },
  { icon: '🌿', title: 'Grado Humano', sub: 'Ingredientes' },
  { icon: '🔬', title: 'Microbiológico', sub: 'Análisis en lote' },
  { icon: '📋', title: 'Registro ICA', sub: 'Por producto' },
]

export default async function HomePage() {
  const [featuredProducts, latestPosts] = await Promise.all([
    getFeaturedProducts(),
    getLatestPosts(),
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ══════════════════════════════════════════════════════
          HERO — Split 2-column professional layout
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #021f01 0%, #042d03 30%, #063b05 55%, #0a4a08 80%, #0d5c0b 100%)',
        }}
      >
        {/* Diagonal light divider */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, transparent 45%, rgba(141,208,43,0.04) 45%)',
          pointerEvents: 'none',
        }} />

        {/* Orbs */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-3%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(141,208,43,0.14) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,176,59,0.10) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(141,208,43,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        {/* Paw prints pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cellipse cx='20' cy='20' rx='8' ry='10' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='12' cy='10' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='28' cy='10' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='9' cy='17' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='31' cy='17' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Cellipse cx='70' cy='60' rx='8' ry='10' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='62' cy='50' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='78' cy='50' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='59' cy='57' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='81' cy='57' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />

        {/* ── 2-column grid ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: '1280px', width: '100%', margin: '0 auto',
          padding: 'clamp(5rem, 10vw, 8rem) 2rem clamp(4rem, 8vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Badge */}
            <div className="animate-fade-in-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(141,208,43,0.4)',
              background: 'rgba(141,208,43,0.1)',
              color: '#9fd63a',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              marginBottom: '2rem',
            }}>
              <Star size={11} fill="currentColor" />
              Certificado BPM ICA · Medellín, Colombia
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100" style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
            }}>
              Tu marca de<br />
              alimentos para<br />
              <span style={{
                background: 'linear-gradient(90deg, #8cd02b, #fbb03b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>mascotas</span>, lista.
            </h1>

            <p className="animate-fade-in-up delay-200" style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.68)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '480px',
            }}>
              Fabricamos y desarrollamos alimentos, snacks y suplementos premium con{' '}
              <strong style={{ color: '#9fd63a', fontWeight: 600 }}>ingredientes de grado humano</strong>.
              Maquila con o sin Registro ICA. Desde Medellín para el mundo.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link href="/productos" className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
                Ver Productos
                <ArrowRight size={17} />
              </Link>
              <Link href="/contacto" className="btn-secondary" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem' }}>
                Hablar con un experto
              </Link>
            </div>

            {/* Stats row */}
            <div className="animate-fade-in-up delay-400" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, auto)',
              gap: '0',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              maxWidth: '480px',
            }}>
              {stats.map((stat, i) => (
                <div key={stat.label} style={{
                  padding: '1.1rem 0.75rem',
                  textAlign: 'center',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    color: '#9fd63a',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.62rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: '0.3rem',
                    lineHeight: 1.3,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product showcase ── */}
          <div className="animate-fade-in delay-200" style={{ position: 'relative', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>

            {/* Main showcase card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(141,208,43,0.2)',
              borderRadius: '28px',
              padding: '2rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>

              {/* Top label */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}>
                <span style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.04em',
                }}>
                  🐾 Líneas de Productos
                </span>
                <span style={{
                  background: 'rgba(141,208,43,0.15)',
                  border: '1px solid rgba(141,208,43,0.3)',
                  borderRadius: '100px',
                  padding: '0.2rem 0.7rem',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  color: '#9fd63a',
                  letterSpacing: '0.05em',
                }}>
                  50+ SKUs
                </span>
              </div>

              {/* Product line cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  {
                    emoji: '🐕', label: 'Caninos', tag: '20+ productos',
                    desc: 'Snacks, concentrado y suplementos para perros',
                    color: '#8cd02b', bg: 'rgba(141,208,43,0.08)',
                    border: 'rgba(141,208,43,0.22)', href: '/productos?cat=canino',
                  },
                  {
                    emoji: '🐈', label: 'Felinos', tag: '15+ productos',
                    desc: 'Nutrición balanceada y snacks para gatos',
                    color: '#fbb03b', bg: 'rgba(251,176,59,0.08)',
                    border: 'rgba(251,176,59,0.22)', href: '/productos?cat=felino',
                  },
                  {
                    emoji: '🐴', label: 'Equinos', tag: '10+ productos',
                    desc: 'Suplementos y concentrado para caballos',
                    color: '#c0de7c', bg: 'rgba(192,222,124,0.08)',
                    border: 'rgba(192,222,124,0.18)', href: '/productos?cat=equino',
                  },
                ].map((line) => (
                  <Link key={line.label} href={line.href} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: line.bg,
                    border: `1px solid ${line.border}`,
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    textDecoration: 'none',
                    transition: 'all 0.22s ease',
                  }}>
                    <div style={{
                      width: '48px', height: '48px', flexShrink: 0,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem',
                    }}>
                      {line.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 800, fontSize: '0.9rem',
                          color: '#ffffff',
                        }}>{line.label}</span>
                        <span style={{
                          background: line.color + '22',
                          border: `1px solid ${line.color}44`,
                          borderRadius: '100px',
                          padding: '0.1rem 0.5rem',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700, fontSize: '0.62rem',
                          color: line.color,
                        }}>{line.tag}</span>
                      </div>
                      <p style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.4, margin: 0,
                      }}>{line.desc}</p>
                    </div>
                    <ChevronRight size={16} style={{ color: line.color, flexShrink: 0 }} />
                  </Link>
                ))}
              </div>

              {/* Bottom cert strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'rgba(141,208,43,0.07)',
                  border: '1px solid rgba(141,208,43,0.15)',
                  borderRadius: '12px',
                  padding: '0.65rem 0.75rem',
                }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>🏆</span>
                  <div>
                    <div style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 800, fontSize: '0.72rem', color: '#9fd63a', lineHeight: 1,
                    }}>BPM ICA</div>
                    <div style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.3, marginTop: '0.15rem',
                    }}>Certificación oficial</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '0.65rem 0.75rem',
                }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>📍</span>
                  <div>
                    <div style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 800, fontSize: '0.72rem', color: '#ffffff', lineHeight: 1,
                    }}>Medellín</div>
                    <div style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.3, marginTop: '0.15rem',
                    }}>Planta propia · Colombia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div style={{
              position: 'absolute', top: '-16px', right: '20px',
              background: 'linear-gradient(135deg, #fbb03b, #f5a623)',
              borderRadius: '14px',
              padding: '0.6rem 1rem',
              boxShadow: '0 8px 24px rgba(251,176,59,0.45)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              zIndex: 5,
            }}>
              <span style={{ fontSize: '1rem' }}>🌿</span>
              <div>
                <div style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900, fontSize: '0.72rem', color: '#063b05',
                  lineHeight: 1,
                }}>Grado Humano</div>
                <div style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.6rem', color: 'rgba(6,59,5,0.7)', lineHeight: 1.2,
                }}>Ingredientes certificados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        }} className="animate-fade-in delay-500">
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Lexend Deca', sans-serif" }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(126,200,35,0.6), transparent)',
            animation: 'pulse-glow 2s infinite',
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CATEGORÍAS — cards limpias sobre fondo claro
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Líneas de Productos</span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--green-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Para cada animal,{' '}
              <span style={{ color: 'var(--green-bright)' }}>la mejor nutrición</span>
            </h2>
            <p style={{
              marginTop: '1rem',
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '1rem',
              color: 'var(--gray-500)',
              maxWidth: '500px',
              margin: '1rem auto 0',
              lineHeight: 1.65,
            }}>
              Líneas especializadas diseñadas con ingredientes de grado humano para caninos, felinos y equinos.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {categoryCards.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="card-category"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
              >
                {/* Card header band */}
                <div style={{
                  background: cat.bgGradient,
                  padding: '2.5rem 2rem 2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Decorative circle */}
                  <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: cat.accentColor,
                    opacity: 0.08,
                  }} />
                  <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1rem' }}>
                    {cat.emoji}
                  </div>
                  <h3 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.35rem',
                  }}>
                    {cat.label}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    background: cat.accentColor,
                    color: 'white',
                    borderRadius: '100px',
                    fontSize: '0.68rem',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    padding: '0.2rem 0.7rem',
                    letterSpacing: '0.04em',
                  }}>
                    {cat.tag}
                  </span>
                </div>

                {/* Card body */}
                <div style={{
                  padding: '1.5rem 2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  borderTop: `2px solid ${cat.borderColor}`,
                }}>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--gray-600)',
                    lineHeight: 1.65,
                    flex: 1,
                    marginBottom: '1.25rem',
                  }}>
                    {cat.desc}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: cat.accentColor === '#063b05' ? cat.accentColor : cat.accentColor,
                    transition: 'gap 0.2s ease',
                  }}>
                    Ver productos
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRODUCTOS DESTACADOS
      ══════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section style={{ padding: '6rem 1.5rem', background: 'var(--off-white)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', marginBottom: '2.75rem',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <span className="section-badge">Destacados</span>
                <h2 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.03em',
                }}>
                  Productos estrella
                </h2>
              </div>
              <Link
                href="/productos"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: 'var(--green-bright)',
                  textDecoration: 'none',
                }}
              >
                Ver todos <ArrowRight size={15} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {featuredProducts.map((product) => {
                const catColor = product.category === 'canino' ? '#7ec823' : product.category === 'felino' ? '#f5a623' : '#063b05'
                const catBg   = product.category === 'canino' ? '#f0f9e0' : product.category === 'felino' ? '#fff8ec' : '#edf7ec'
                const catEmoji = product.category === 'canino' ? '🐕' : product.category === 'felino' ? '🐈' : '🐴'
                return (
                  <div key={product.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Product image area */}
                    <div style={{
                      height: '160px',
                      background: catBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '3.5rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', bottom: '-15px', right: '-15px',
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: catColor, opacity: 0.1,
                      }} />
                      {catEmoji}
                    </div>

                    <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        display: 'inline-block',
                        background: catBg,
                        color: catColor,
                        border: `1px solid ${catColor}30`,
                        borderRadius: '100px',
                        fontSize: '0.68rem',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        letterSpacing: '0.05em',
                        marginBottom: '0.65rem',
                        textTransform: 'uppercase' as const,
                      }}>
                        {product.subcategory}
                      </span>
                      <h3 style={{
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: 'var(--green-dark)',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.5rem',
                        lineHeight: 1.25,
                      }}>
                        {product.name}
                      </h3>
                      <p style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.85rem',
                        color: 'var(--gray-500)',
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: '1.1rem',
                      }}>
                        {product.description.slice(0, 100)}…
                      </p>
                      <Link
                        href={`/productos/${product.slug}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.3rem',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: 'var(--green-bright)',
                          textDecoration: 'none',
                        }}
                      >
                        Ver detalle <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          SERVICIOS — tarjetas en fondo verde oscuro
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(160deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background orb */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(126,200,35,0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(126,200,35,0.3)',
              background: 'rgba(126,200,35,0.08)',
              color: '#9fd63a',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              marginBottom: '1.2rem',
            }}>
              Nuestros Servicios
            </span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Hacemos realidad{' '}
              <span style={{ color: '#9fd63a' }}>tu marca de alimentos</span>
            </h2>
            <p style={{
              marginTop: '1rem',
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '500px',
              margin: '1rem auto 0',
              lineHeight: 1.65,
            }}>
              Desde la fórmula hasta el producto terminado, somos tu aliado estratégico en nutrición animal.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
          }}>
            {services.map((svc) => (
              <div key={svc.title} className="card-glass" style={{ padding: '2rem 1.75rem' }}>
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '14px',
                  background: svc.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <svc.icon size={22} style={{ color: svc.color }} />
                </div>
                <h3 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.6rem',
                  lineHeight: 1.25,
                }}>
                  {svc.title}
                </h3>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.65,
                }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
            <Link href="/servicios" className="btn-primary" style={{ fontSize: '0.95rem' }}>
              Conocer todos los servicios
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIDEO SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(160deg, #021f01 0%, #063b05 60%, #0a4a08 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Paw prints background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cellipse cx='20' cy='20' rx='8' ry='10' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='12' cy='10' r='4' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='28' cy='10' r='4' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='9' cy='17' r='3.5' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='31' cy='17' r='3.5' fill='%23ffffff' opacity='0.03'/%3E%3Cellipse cx='70' cy='60' rx='8' ry='10' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='62' cy='50' r='4' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='78' cy='50' r='4' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='59' cy='57' r='3.5' fill='%23ffffff' opacity='0.03'/%3E%3Ccircle cx='81' cy='57' r='3.5' fill='%23ffffff' opacity='0.03'/%3E%3C/svg%3E")`,
        }} />
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(141,208,43,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,176,59,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '100px',
              border: '1px solid rgba(141,208,43,0.35)',
              background: 'rgba(141,208,43,0.1)',
              color: '#9fd63a',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              marginBottom: '1.25rem',
            }}>
              🎬 Así lo hacemos
            </span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              Conoce el proceso{' '}
              <span style={{ color: '#9fd63a' }}>detrás de la calidad</span>
            </h2>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}>
              Descubre cómo elaboramos nuestros productos con ingredientes de grado humano,
              en instalaciones certificadas BPM ICA en Medellín, Colombia.
            </p>
          </div>

          {/* Video embed container */}
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(141,208,43,0.15)',
            background: '#000',
            aspectRatio: '16/9',
            maxWidth: '880px',
            margin: '0 auto',
          }}>
            {/* Decorative corner accents */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '60px', height: '60px',
              borderTop: '3px solid #8cd02b',
              borderLeft: '3px solid #8cd02b',
              borderRadius: '24px 0 0 0',
              zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '60px', height: '60px',
              borderBottom: '3px solid #8cd02b',
              borderRight: '3px solid #8cd02b',
              borderRadius: '0 0 24px 0',
              zIndex: 2, pointerEvents: 'none',
            }} />
            <iframe
              src="https://www.youtube.com/embed/ilPV_5UEtX8?rel=0&modestbranding=1&color=white"
              title="Zoovegetal — Conoce nuestro proceso"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Below-video trust row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: '🏭', label: 'Planta propia en Medellín' },
              { icon: '✅', label: 'Certificación BPM ICA' },
              { icon: '🌿', label: 'Ingredientes grado humano' },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.65)',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALERÍA DE INSTALACIONES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-badge">📸 Nuestras Instalaciones</span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '0.85rem',
            }}>
              Planta de producción{' '}
              <span style={{ color: 'var(--green-bright)' }}>certificada BPM</span>
            </h2>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '1rem',
              color: 'var(--gray-500)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}>
              Conoce nuestras instalaciones en Medellín. Equipos de grado industrial,
              procesos controlados y estrictos estándares de higiene en cada línea de producción.
            </p>
          </div>

          {/* ── Masonry Grid Layout ── */}
          {/* Row 1: 1 large featured + 4 smaller */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            {/* Featured large image */}
            <div className="gallery-cell-lg" style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}>
              <img
                src="/locativo1 (1).jpg"
                alt="Planta de producción Zoovegetal - Vista general"
                className="gallery-img"
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(6,59,5,0.75) 0%, transparent 100%)',
                padding: '1.25rem 1.25rem 1rem',
                borderRadius: '0 0 20px 20px',
              }}>
                <span style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700, fontSize: '0.8rem',
                  color: '#ffffff', letterSpacing: '0.02em',
                }}>Zona de producción principal</span>
              </div>
            </div>
            {/* Top-right */}
            <div className="gallery-cell" style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <img src="/locativo1 (2).jpg" alt="Instalaciones Zoovegetal" className="gallery-img-43" />
            </div>
            {/* Mid-right top */}
            <div className="gallery-cell" style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <img src="/locativo1 (3).jpg" alt="Equipos de producción" className="gallery-img-43" />
            </div>
            {/* Bottom-right */}
            <div className="gallery-cell" style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <img src="/locativo1 (4).jpg" alt="Maquinaria industrial" className="gallery-img-43" />
            </div>
            {/* Bottom-right 2 */}
            <div className="gallery-cell" style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <img src="/locativo1 (5).jpg" alt="Zona de almacenamiento" className="gallery-img-43" />
            </div>
          </div>

          {/* Row 2: 4 square cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            {[6, 7, 8, 9].map((n) => (
              <div key={n} className="gallery-cell">
                <img
                  src={`/locativo1 (${n}).jpg`}
                  alt={`Instalaciones Zoovegetal ${n}`}
                  className="gallery-img-sq"
                />
              </div>
            ))}
          </div>

          {/* Row 3: last 4 square cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
          }}>
            {[10, 11, 12, 13].map((n) => (
              <div key={n} className="gallery-cell">
                <img
                  src={`/locativo1 (${n}).jpg`}
                  alt={`Instalaciones Zoovegetal ${n}`}
                  className="gallery-img-sq"
                />
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div style={{
            marginTop: '2.5rem',
            background: 'linear-gradient(135deg, var(--green-pale) 0%, #edffd0 100%)',
            border: '1.5px solid rgba(141,208,43,0.25)',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}>
            <div>
              <div style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900, fontSize: '1.1rem',
                color: 'var(--green-dark)', letterSpacing: '-0.02em',
              }}>¿Quieres conocer nuestra planta en persona?</div>
              <div style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: '0.25rem',
              }}>Agenda una visita y te mostramos todo el proceso de fabricación.</div>
            </div>
            <Link href="/contacto" className="btn-primary" style={{ whiteSpace: 'nowrap' as const }}>
              Agendar visita
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          POR QUÉ ZOOVEGETAL — 2 columnas
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left column */}
            <div>
              <span className="section-badge">¿Por qué elegirnos?</span>
              <h2 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
                color: 'var(--green-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}>
                Calidad que{' '}
                <span style={{ color: 'var(--green-bright)' }}>se puede medir</span>
              </h2>
              <p style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.97rem',
                color: 'var(--gray-600)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}>
                Desde 2017, Zoovegetal ha desarrollado más de 50 productos con ingredientes
                de grado humano, garantizando la más alta calidad nutricional para caninos,
                felinos y equinos.
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {whyUs.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '20px', height: '20px', flexShrink: 0, marginTop: '1px',
                    }}>
                      <CheckCircle size={20} style={{ color: 'var(--green-bright)' }} />
                    </div>
                    <span style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.9rem',
                      color: 'var(--gray-700)',
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '2.25rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link href="/quienes-somos" className="btn-primary">
                  Conocer más
                  <ArrowRight size={17} />
                </Link>
                <Link href="/contacto" className="btn-amber">
                  Hablar con un experto
                </Link>
              </div>
            </div>

            {/* Right column — cert badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {certBadges.map((badge) => (
                  <div key={badge.title} style={{
                    background: 'var(--green-pale)',
                    border: '1.5px solid rgba(126,200,35,0.2)',
                    borderRadius: '20px',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    transition: 'all 0.25s ease',
                  }}
                    className="card"
                  >
                    <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{badge.icon}</div>
                    <div style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: 'var(--green-dark)',
                      letterSpacing: '-0.01em',
                    }}>
                      {badge.title}
                    </div>
                    <div style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.75rem',
                      color: 'var(--gray-500)',
                      marginTop: '0.25rem',
                    }}>
                      {badge.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trophy card */}
              <div style={{
                background: 'linear-gradient(135deg, var(--green-dark) 0%, #0d5c0b 100%)',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}>
                <div style={{
                  width: '56px', height: '56px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem',
                }}>
                  🏆
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.35rem',
                  }}>
                    +7 años de experiencia
                  </h3>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.5,
                  }}>
                    Fabricando productos premium para mascotas desde 2017 en Medellín, Colombia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section style={{ padding: '6rem 1.5rem', background: 'var(--off-white)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', marginBottom: '2.75rem',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <span className="section-badge">Blog</span>
                <h2 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.03em',
                }}>
                  Nutrición y bienestar animal
                </h2>
              </div>
              <Link
                href="/blog"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: 'var(--green-bright)',
                  textDecoration: 'none',
                }}
              >
                Ver todos <ArrowRight size={15} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}>
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card"
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                  <div style={{
                    height: '150px',
                    background: 'linear-gradient(135deg, #f0f9e0 0%, #e4f5c8 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', top: '-10px', right: '-10px',
                      width: '70px', height: '70px', borderRadius: '50%',
                      background: 'rgba(126,200,35,0.12)',
                    }} />
                    📝
                  </div>
                  <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: 'var(--green-dark)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      marginBottom: '0.6rem',
                      flex: 1,
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.85rem',
                      color: 'var(--gray-500)',
                      lineHeight: 1.6,
                      marginBottom: '1.1rem',
                    }}>
                      {post.excerpt.slice(0, 100)}…
                    </p>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--green-bright)',
                    }}>
                      Leer más <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          CTA FINAL — degradado verde limón
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(135deg, #7ec823 0%, #9fd63a 40%, #c8e88a 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-40px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />

        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', lineHeight: 1 }}>🐾</div>
          <h2 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
            color: 'var(--green-dark)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            ¿Listo para crear tu marca de alimentos para mascotas?
          </h2>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(6,59,5,0.75)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            Atendemos exclusivamente a clientes mayoristas y marcas. Contáctanos hoy y cuéntanos tu proyecto.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contacto" className="btn-dark" style={{ fontSize: '0.95rem', padding: '0.9rem 2rem' }}>
              Hablar con un experto
              <ArrowRight size={17} />
            </Link>
            <a
              href="https://wa.me/573136525779?text=Hola,%20quiero%20desarrollar%20un%20producto%20con%20Zoovegetal."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.9rem 2rem',
                borderRadius: '100px',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                background: '#25D366',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
