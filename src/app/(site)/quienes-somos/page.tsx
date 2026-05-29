import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description: 'Somos una empresa colombiana fundada en 2017, especializada en el desarrollo y fabricación de alimentos y suplementos para mascotas.',
}

const values = [
  {
    emoji: '🌿',
    title: 'Natural',
    desc: 'Utilizamos exclusivamente ingredientes de grado humano: proteínas animales y vegetales, vitaminas y minerales.',
    color: '#7ec823',
    bg: '#f0f9e0',
  },
  {
    emoji: '🔬',
    title: 'Científico',
    desc: 'Cada producto pasa por análisis microbiológicos y bromatológicos para garantizar su seguridad y calidad nutricional.',
    color: '#f5a623',
    bg: '#fff8ec',
  },
  {
    emoji: '🏆',
    title: 'Certificado',
    desc: 'Contamos con certificación BPM ICA y registro individual por producto, garantizando el cumplimiento normativo.',
    color: '#7ec823',
    bg: '#f0f9e0',
  },
  {
    emoji: '🤝',
    title: 'Aliado',
    desc: 'Más que un proveedor, somos el socio estratégico que te ayuda a crecer tu marca en el mercado de nutrición animal.',
    color: '#f5a623',
    bg: '#fff8ec',
  },
]

const proteins = [
  { icon: '🥩', name: 'Res', type: 'Animal' },
  { icon: '🍗', name: 'Pollo', type: 'Animal' },
  { icon: '🐷', name: 'Cerdo', type: 'Animal' },
  { icon: '🫘', name: 'Garbanzo', type: 'Vegetal' },
  { icon: '🌱', name: 'Lenteja', type: 'Vegetal' },
  { icon: '🌾', name: 'Soya', type: 'Vegetal' },
]

const timeline = [
  { year: '2017', event: 'Fundación de Zoovegetal en Medellín, Antioquia.', active: false },
  { year: '2018', event: 'Obtención de la primera certificación BPM ICA.', active: false },
  { year: '2020', event: 'Expansión de líneas de producto a felinos y equinos.', active: false },
  { year: '2022', event: 'Superamos los 50 productos desarrollados para marcas clientes.', active: false },
  { year: '2024', event: 'Consolidación como referente de maquila de alimentos para mascotas en Colombia.', active: true },
]

const certifications = [
  { title: 'BPM ICA', sub: 'Buenas Prácticas de Manufactura', icon: '🏅' },
  { title: 'Registro ICA', sub: 'Certificación individual por producto', icon: '📋' },
  { title: 'Análisis Microbiológico', sub: 'Control de calidad por lote', icon: '🔬' },
  { title: 'Análisis Bromatológico', sub: 'Composición nutricional certificada', icon: '🧪' },
]

export default function QuienesSomosPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <div style={{
        padding: '7rem 1.5rem 5rem',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(126,200,35,0.14) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '100px',
            border: '1px solid rgba(126,200,35,0.35)',
            background: 'rgba(126,200,35,0.1)',
            color: '#9fd63a',
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            marginBottom: '1.25rem',
          }}>
            Nuestra Historia
          </span>
          <h1 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '1rem',
          }}>
            Apasionados por la{' '}
            <span style={{ color: '#9fd63a' }}>nutrición animal</span>
          </h1>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Desde 2017, en Medellín, Colombia, desarrollamos y fabricamos alimentos de alta calidad
            para mascotas, usando materias primas de grado humano y los más altos estándares de manufactura.
          </p>
        </div>
      </div>

      {/* ── Mission + Values ── */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left — mission text */}
            <div>
              <span className="section-badge">Misión</span>
              <h2 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                color: 'var(--green-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}>
                Nutrición que{' '}
                <span style={{ color: 'var(--green-bright)' }}>transforma vidas animales</span>
              </h2>
              <p style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.97rem',
                color: 'var(--gray-600)',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}>
                En Zoovegetal desarrollamos y fabricamos productos nutricionales premium para animales domésticos,
                utilizando ingredientes de primera calidad, grado humano, que aportan proteínas, vitaminas y minerales
                esenciales para la salud y el bienestar animal.
              </p>
              <p style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.97rem',
                color: 'var(--gray-600)',
                lineHeight: 1.75,
              }}>
                Trabajamos con marcas y distribuidores mayoristas, acompañándolos desde la concepción del producto
                hasta el registro ICA y la producción final, para que puedan competir con confianza en el creciente
                mercado de nutrición animal.
              </p>
            </div>

            {/* Right — values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {values.map((v) => (
                <div
                  key={v.title}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    background: v.bg,
                    border: `1.5px solid ${v.color}20`,
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{v.emoji}</div>
                  <h3 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.4rem',
                  }}>
                    {v.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.82rem',
                    color: 'var(--gray-600)',
                    lineHeight: 1.6,
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Ingredientes</span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Solo ingredientes de{' '}
              <span style={{ color: 'var(--green-bright)' }}>grado humano</span>
            </h2>
          </div>

          {/* Protein grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            {proteins.map((p) => (
              <div
                key={p.name}
                className="card"
                style={{ padding: '1.5rem 1rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{p.icon}</div>
                <div style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.01em',
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.72rem',
                  color: 'var(--gray-400)',
                  marginTop: '0.2rem',
                  fontWeight: 500,
                }}>
                  Proteína {p.type}
                </div>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}>
            {[
              { title: 'Vitaminas y Minerales', desc: 'Extraídos de frutas y vegetales frescos para complementar la nutrición.', emoji: '🥦' },
              { title: 'Sin Conservantes Artificiales', desc: 'Formulaciones limpias sin colorantes ni conservantes artificiales.', emoji: '🚫' },
              { title: 'Altamente Digestibles', desc: 'Fórmulas optimizadas para la máxima absorción de nutrientes.', emoji: '✅' },
            ].map((item) => (
              <div
                key={item.title}
                className="card"
                style={{ padding: '1.75rem', background: '#ffffff' }}
              >
                <div style={{ fontSize: '2.25rem', marginBottom: '0.85rem' }}>{item.emoji}</div>
                <h3 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.5rem',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.875rem',
                  color: 'var(--gray-500)',
                  lineHeight: 1.65,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(160deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '300px', height: '300px', borderRadius: '50%',
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
              Calidad Garantizada
            </span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
            }}>
              Certificaciones y estándares
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}>
            {certifications.map((cert) => (
              <div key={cert.title} className="card-glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cert.icon}</div>
                <h3 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.4rem',
                }}>
                  {cert.title}
                </h3>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.5,
                }}>
                  {cert.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Historia</span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              letterSpacing: '-0.03em',
            }}>
              Nuestro camino
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '32px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--green-bright), var(--green-light))',
              borderRadius: '1px',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timeline.map((item) => (
                <div key={item.year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Year circle */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    letterSpacing: '-0.01em',
                    position: 'relative',
                    zIndex: 1,
                    background: item.active
                      ? 'var(--green-bright)'
                      : 'var(--green-pale)',
                    color: 'var(--green-dark)',
                    boxShadow: item.active ? 'var(--shadow-green)' : 'none',
                    border: item.active ? 'none' : '2px solid rgba(126,200,35,0.2)',
                  }}>
                    {item.year}
                  </div>

                  {/* Event text */}
                  <div style={{ paddingTop: '1rem', flex: 1 }}>
                    <p style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.95rem',
                      color: item.active ? 'var(--green-dark)' : 'var(--gray-700)',
                      lineHeight: 1.6,
                      fontWeight: item.active ? 600 : 400,
                    }}>
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '5rem 1.5rem',
        textAlign: 'center',
        background: 'var(--green-pale)',
      }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: 'var(--green-dark)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            ¿Quieres crecer tu marca con nosotros?
          </h2>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.97rem',
            color: 'var(--gray-600)',
            lineHeight: 1.7,
            marginBottom: '2.25rem',
          }}>
            Somos el aliado que tu marca de alimentos para mascotas necesita.
          </p>
          <Link href="/contacto" className="btn-primary" style={{ fontSize: '0.95rem' }}>
            Contactar ahora
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
