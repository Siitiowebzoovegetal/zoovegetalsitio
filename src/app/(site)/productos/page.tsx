import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Descubre nuestra línea de alimentos, snacks y suplementos para caninos, felinos y equinos con ingredientes de grado humano.',
}

async function getProducts(category?: string) {
  try {
    return await prisma.product.findMany({
      where: {
        active: true,
        ...(category ? { category } : {}),
      },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    })
  } catch {
    return []
  }
}

const categories = [
  { id: '', label: 'Todos', emoji: '🐾', color: '#7ec823' },
  { id: 'canino', label: 'Caninos', emoji: '🐕', color: '#7ec823' },
  { id: 'felino', label: 'Felinos', emoji: '🐈', color: '#f5a623' },
  { id: 'equino', label: 'Equinos', emoji: '🐴', color: '#063b05' },
]

const catMeta: Record<string, { bg: string; accent: string; label: string }> = {
  canino: { bg: '#f0f9e0', accent: '#7ec823', label: 'Canino' },
  felino: { bg: '#fff8ec', accent: '#f5a623', label: 'Felino' },
  equino: { bg: '#edf7ec', accent: '#063b05', label: 'Equino' },
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const params = await searchParams
  const cat = params.cat ?? ''
  const products = await getProducts(cat || undefined)

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{
        paddingTop: '7rem',
        paddingBottom: '4rem',
        padding: '7rem 1.5rem 4rem',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orb */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(126,200,35,0.15) 0%, transparent 70%)',
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
            Catálogo
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
            Nuestros Productos
          </h1>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Formulados con ingredientes de grado humano. Proteínas animales y vegetales,
            vitaminas y minerales esenciales.
          </p>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 30,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--gray-100)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 0',
            overflowX: 'auto',
          }}>
            {categories.map((c) => {
              const active = cat === c.id
              return (
                <Link
                  key={c.id}
                  href={c.id ? `/productos?cat=${c.id}` : '/productos'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap' as const,
                    flexShrink: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: active ? c.color : 'var(--gray-100)',
                    color: active ? (c.id === 'equino' ? 'white' : 'var(--green-dark)') : 'var(--gray-600)',
                    boxShadow: active ? `0 4px 12px ${c.color}40` : 'none',
                  }}
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'var(--green-dark)',
              letterSpacing: '-0.02em',
              marginBottom: '0.6rem',
            }}>
              No hay productos disponibles
            </h3>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--gray-500)',
              marginBottom: '2rem',
            }}>
              Pronto añadiremos más productos. Contáctanos para más información.
            </p>
            <Link href="/contacto" className="btn-primary">Contactar</Link>
          </div>
        ) : (
          <>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--gray-400)',
              marginBottom: '2rem',
              fontWeight: 500,
            }}>
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {products.map((product) => {
                const meta = catMeta[product.category] ?? catMeta.canino
                const emoji = product.category === 'canino' ? '🐕' : product.category === 'felino' ? '🐈' : '🐴'
                return (
                  <Link
                    key={product.id}
                    href={`/productos/${product.slug}`}
                    className="card"
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                  >
                    {/* Image area */}
                    <div style={{
                      height: '150px',
                      background: meta.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.5rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', bottom: '-12px', right: '-12px',
                        width: '70px', height: '70px', borderRadius: '50%',
                        background: meta.accent, opacity: 0.1,
                      }} />
                      {emoji}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.1rem 1.35rem 1.35rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{
                          display: 'inline-block',
                          background: meta.bg,
                          color: meta.accent === '#063b05' ? meta.accent : meta.accent,
                          border: `1px solid ${meta.accent}30`,
                          borderRadius: '100px',
                          fontSize: '0.67rem',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          padding: '0.18rem 0.6rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase' as const,
                        }}>
                          {meta.label}
                        </span>
                        {product.featured && (
                          <span style={{
                            display: 'inline-block',
                            background: 'rgba(245,166,35,0.12)',
                            color: '#b07210',
                            border: '1px solid rgba(245,166,35,0.25)',
                            borderRadius: '100px',
                            fontSize: '0.67rem',
                            fontFamily: "'Red Hat Display', sans-serif",
                            fontWeight: 700,
                            padding: '0.18rem 0.6rem',
                          }}>
                            ⭐ Destacado
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.975rem',
                        color: 'var(--green-dark)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                        marginBottom: '0.25rem',
                      }}>
                        {product.name}
                      </h3>

                      <p style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.75rem',
                        color: 'var(--gray-400)',
                        marginBottom: '0.6rem',
                        fontWeight: 500,
                      }}>
                        {product.subcategory}
                      </p>

                      <p style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.85rem',
                        color: 'var(--gray-500)',
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}>
                        {product.description}
                      </p>

                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: 'var(--green-bright)',
                      }}>
                        Ver detalle <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: '0 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          borderRadius: '24px',
          padding: '3.5rem 3rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #021f01 0%, #063b05 60%, #0d5c0b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(126,200,35,0.12) 0%, transparent 70%)',
          }} />
          <h2 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
          }}>
            ¿No encuentras lo que buscas?
          </h2>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.97rem',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '2rem',
            lineHeight: 1.65,
          }}>
            Desarrollamos productos personalizados bajo tu marca. Cuéntanos tu idea.
          </p>
          <Link href="/contacto" className="btn-primary" style={{ fontSize: '0.95rem' }}>
            Solicitar producto personalizado
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  )
}
