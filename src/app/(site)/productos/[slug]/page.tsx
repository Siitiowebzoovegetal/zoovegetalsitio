import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, MessageCircle, Tag, Award } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({ where: { slug, active: true } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: product.name,
    description: product.description,
  }
}

const categoryInfo: Record<string, { emoji: string; label: string; bg: string; gradient: string; accent: string }> = {
  canino: { emoji: '🐕', label: 'Caninos', bg: '#f0f9e0', gradient: 'linear-gradient(135deg, #f0f9e0 0%, #dff0cc 100%)', accent: '#7ec823' },
  felino: { emoji: '🐈', label: 'Felinos', bg: '#fff8ec', gradient: 'linear-gradient(135deg, #fff8ec 0%, #fef0d4 100%)', accent: '#f5a623' },
  equino: { emoji: '🐴', label: 'Equinos', bg: '#edf7ec', gradient: 'linear-gradient(135deg, #edf7ec 0%, #dff0de 100%)', accent: '#063b05' },
}

const features = [
  'Ingredientes de grado humano',
  'Análisis microbiológico y bromatológico',
  'Certificación BPM ICA',
  'Disponible bajo tu marca (maquila)',
  'Formulación personalizable',
]

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const catInfo = categoryInfo[product.category] ?? categoryInfo.canino

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header spacer */}
      <div style={{ height: '72px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>

        {/* Breadcrumb + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link
            href="/productos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--green-bright)',
              textDecoration: 'none',
              transition: 'gap 0.2s ease',
            }}
          >
            <ArrowLeft size={15} />
            Volver a productos
          </Link>
          <span style={{ color: 'var(--gray-300)', fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.85rem' }}>·</span>
          <span style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.82rem', color: 'var(--gray-400)' }}>
            {catInfo.label}
          </span>
          <span style={{ color: 'var(--gray-300)', fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.85rem' }}>·</span>
          <span style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.82rem', color: 'var(--gray-600)', fontWeight: 500 }}>
            {product.name}
          </span>
        </div>

        {/* Main card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-100)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}>
            {/* Product visual */}
            <div style={{
              background: catInfo.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '380px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative circles */}
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '160px', height: '160px', borderRadius: '50%',
                background: catInfo.accent, opacity: 0.08,
              }} />
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px',
                width: '100px', height: '100px', borderRadius: '50%',
                background: catInfo.accent, opacity: 0.06,
              }} />
              <div style={{ fontSize: '8rem', lineHeight: 1, position: 'relative', zIndex: 1 }}>
                {catInfo.emoji}
              </div>
            </div>

            {/* Product details */}
            <div style={{ padding: '2.5rem' }}>
              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  background: catInfo.bg,
                  color: catInfo.accent,
                  border: `1px solid ${catInfo.accent}25`,
                  borderRadius: '100px',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.75rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                }}>
                  <Tag size={11} /> {catInfo.label}
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'var(--gray-100)',
                  color: 'var(--gray-600)',
                  borderRadius: '100px',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  padding: '0.25rem 0.75rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                }}>
                  {product.subcategory}
                </span>
                {product.featured && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    background: 'rgba(245,166,35,0.1)',
                    color: '#b07210',
                    border: '1px solid rgba(245,166,35,0.25)',
                    borderRadius: '100px',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.75rem',
                  }}>
                    <Award size={11} /> Destacado
                  </span>
                )}
              </div>

              <h1 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--green-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                {product.name}
              </h1>

              <p style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.97rem',
                color: 'var(--gray-600)',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}>
                {product.description}
              </p>

              {/* Long desc */}
              {product.longDesc && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.75rem',
                  }}>
                    Descripción detallada
                  </h2>
                  <div
                    className="prose-zoovegetal"
                    dangerouslySetInnerHTML={{ __html: product.longDesc }}
                  />
                </div>
              )}

              {/* Features box */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'var(--green-pale)',
                border: '1.5px solid rgba(126,200,35,0.2)',
                marginBottom: '2rem',
              }}>
                <p style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: 'var(--green-dark)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.85rem',
                }}>
                  Características generales
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle size={15} style={{ color: 'var(--green-bright)', flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--gray-700)',
                      }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/573136525779?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '100px',
                    background: '#25D366',
                    color: 'white',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                    transition: 'all 0.2s ease',
                    flex: '1',
                    justifyContent: 'center',
                    minWidth: '160px',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px', flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Preguntar por WhatsApp
                </a>
                <Link
                  href="/contacto"
                  className="btn-primary"
                  style={{ flex: '1', justifyContent: 'center', minWidth: '160px' }}
                >
                  <MessageCircle size={17} />
                  Solicitar cotización
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
