import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Ofrecemos asesoría especializada, desarrollo de productos y maquila con o sin registro ICA para marcas de alimentos para mascotas.',
}

const services = [
  {
    id: 'asesoria',
    emoji: '💡',
    title: 'Asesoría Especializada',
    subtitle: 'Expertos que te guían en cada paso',
    desc: 'Nuestro equipo de expertos en nutrición animal te acompaña desde la concepción de tu idea hasta la comercialización de tu producto. Te orientamos sobre regulaciones ICA, formulaciones y estrategias de mercado.',
    features: [
      'Consultoría en formulación nutricional',
      'Orientación sobre normativas ICA',
      'Análisis de mercado y competencia',
      'Estrategia de lanzamiento de producto',
      'Acompañamiento post-lanzamiento',
    ],
    accentColor: '#7ec823',
    bgColor: '#f0f9e0',
  },
  {
    id: 'desarrollo',
    emoji: '🧪',
    title: 'Desarrollo de Producto',
    subtitle: 'Tu idea, nuestra ciencia',
    desc: 'Transformamos tu concepto en un producto real. Desarrollamos formulaciones personalizadas desde cero, realizamos pruebas de palatabilidad, análisis nutricionales y ajustamos la receta hasta lograr el producto perfecto.',
    features: [
      'Formulación nutricional personalizada',
      'Pruebas de palatabilidad',
      'Análisis microbiológico y bromatológico',
      'Desarrollo de presentación y empaque',
      'Registro ICA del producto',
      'Iteraciones hasta lograr la fórmula ideal',
    ],
    accentColor: '#f5a623',
    bgColor: '#fff8ec',
  },
  {
    id: 'maquila',
    emoji: '🏭',
    title: 'Maquila',
    subtitle: 'Producción a escala, bajo tu marca',
    desc: 'Fabricamos tu producto bajo tu marca con o sin registro ICA. Contamos con instalaciones modernas, certificación BPM ICA y la capacidad de producir diferentes tipos de alimentos para mascotas a escala mayorista.',
    features: [
      'Producción con o sin registro ICA',
      'Fabricación bajo tu marca (white label)',
      'Galletas, snacks, concentrado seco',
      'Comida cocida congelada',
      'Suplementos sólidos y en polvo',
      'Pelletizados para equinos',
      'Control de calidad por lote',
    ],
    accentColor: '#7ec823',
    bgColor: '#edf7ec',
  },
]

const process = [
  { step: '01', title: 'Consulta inicial', desc: 'Conversamos sobre tu proyecto, objetivos y necesidades específicas.' },
  { step: '02', title: 'Propuesta técnica', desc: 'Desarrollamos una propuesta de formulación y plan de producción.' },
  { step: '03', title: 'Desarrollo y pruebas', desc: 'Creamos el prototipo, realizamos análisis y ajustamos la fórmula.' },
  { step: '04', title: 'Producción a escala', desc: 'Fabricamos el producto final con control de calidad en cada lote.' },
  { step: '05', title: 'Entrega', desc: 'Entregamos el producto listo para su comercialización.' },
]

export default function ServiciosPage() {
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
        <div style={{
          position: 'absolute', bottom: '5%', left: '5%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)',
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
            Servicios B2B
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
            Hacemos realidad{' '}
            <span style={{ color: '#9fd63a' }}>tu visión</span>
          </h1>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Atendemos exclusivamente a marcas y distribuidores mayoristas. Somos tu aliado
            estratégico en el desarrollo y fabricación de alimentos para mascotas.
          </p>
        </div>
      </div>

      {/* ── Services — alternating layout ── */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              {/* Visual card */}
              <div
                style={{
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '280px',
                  background: svc.bgColor,
                  border: `1.5px solid ${svc.accentColor}25`,
                  order: i % 2 === 1 ? 2 : 1,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: svc.accentColor, opacity: 0.07,
                }} />
                <div style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '1.25rem' }}>{svc.emoji}</div>
                <h3 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}>
                  {svc.subtitle}
                </h3>
              </div>

              {/* Content */}
              <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                <span style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase' as const,
                  color: svc.accentColor,
                }}>
                  Servicio 0{i + 1}
                </span>
                <h2 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  color: 'var(--green-dark)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginTop: '0.5rem',
                  marginBottom: '1rem',
                }}>
                  {svc.title}
                </h2>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.97rem',
                  color: 'var(--gray-600)',
                  lineHeight: 1.75,
                  marginBottom: '1.75rem',
                }}>
                  {svc.desc}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
                  {svc.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle size={17} style={{ color: svc.accentColor, flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.9rem',
                        color: 'var(--gray-700)',
                        lineHeight: 1.5,
                      }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/contacto" className="btn-primary" style={{ fontSize: '0.9rem' }}>
                  Solicitar este servicio
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(160deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '350px', height: '350px', borderRadius: '50%',
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
              Proceso
            </span>
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: '#ffffff',
              letterSpacing: '-0.03em',
            }}>
              Cómo trabajamos contigo
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {process.map((step, i) => (
              <div key={step.step} className="card-glass" style={{ padding: '1.75rem 1.5rem' }}>
                <div style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  letterSpacing: '-0.04em',
                  color: '#9fd63a',
                  lineHeight: 1,
                  marginBottom: '1rem',
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.5rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.6,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '5rem 1.5rem',
        textAlign: 'center',
        background: 'var(--green-pale)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: 'var(--green-dark)',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            ¿Listo para empezar?
          </h2>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.97rem',
            color: 'var(--gray-600)',
            lineHeight: 1.7,
            marginBottom: '2.25rem',
          }}>
            Contáctanos y cuéntanos tu proyecto. Atendemos solo a clientes mayoristas y marcas.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contacto" className="btn-primary">
              Contactar ahora
              <ArrowRight size={17} />
            </Link>
            <a
              href="https://wa.me/573136525779"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.75rem',
                borderRadius: '100px',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                background: '#25D366',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px', flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
