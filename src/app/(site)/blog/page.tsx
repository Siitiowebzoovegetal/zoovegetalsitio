import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Calendar, User } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre nutrición animal, bienestar de mascotas y tendencias del mercado de alimentos para animales.',
}

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

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
          width: '300px', height: '300px', borderRadius: '50%',
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
            Blog
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
            Nutrición y bienestar{' '}
            <span style={{ color: '#9fd63a' }}>animal</span>
          </h1>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Artículos, consejos y tendencias sobre nutrición animal escritos por nuestros expertos.
          </p>
        </div>
      </div>

      {/* ── Posts ── */}
      <section style={{ padding: '5rem 1.5rem 6rem', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 800,
                fontSize: '1.5rem',
                color: 'var(--green-dark)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}>
                Blog en construcción
              </h3>
              <p style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.95rem',
                color: 'var(--gray-500)',
              }}>
                Pronto publicaremos artículos sobre nutrición y bienestar animal.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              <Link
                href={`/blog/${posts[0].slug}`}
                className="card"
                style={{
                  textDecoration: 'none',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                }}
              >
                {/* Image placeholder */}
                <div style={{
                  minHeight: '260px',
                  background: 'linear-gradient(135deg, #f0f9e0 0%, #dff0cc 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'rgba(126,200,35,0.15)',
                  }} />
                  📰
                </div>

                {/* Content */}
                <div style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: '#ffffff',
                }}>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--green-bright)',
                    marginBottom: '0.85rem',
                  }}>
                    ✦ Artículo destacado
                  </span>
                  <h2 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                    marginBottom: '0.85rem',
                  }}>
                    {posts[0].title}
                  </h2>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.95rem',
                    color: 'var(--gray-500)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}>
                    {posts[0].excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.8rem',
                        color: 'var(--gray-400)',
                      }}>
                        <User size={13} />
                        {posts[0].author}
                      </span>
                      {posts[0].publishedAt && (
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontFamily: "'Lexend Deca', sans-serif",
                          fontSize: '0.8rem',
                          color: 'var(--gray-400)',
                        }}>
                          <Calendar size={13} />
                          {formatDate(posts[0].publishedAt)}
                        </span>
                      )}
                    </div>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      color: 'var(--green-bright)',
                    }}>
                      Leer artículo <ChevronRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Rest of posts */}
              {posts.length > 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.25rem',
                }}>
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="card"
                      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                      {/* Image */}
                      <div style={{
                        height: '150px',
                        background: 'linear-gradient(135deg, #f0f9e0 0%, #e4f5c8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          position: 'absolute', top: '-10px', right: '-10px',
                          width: '70px', height: '70px', borderRadius: '50%',
                          background: 'rgba(126,200,35,0.15)',
                        }} />
                        📝
                      </div>

                      <div style={{ padding: '1.35rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                          marginBottom: '1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}>
                          {post.excerpt}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {post.publishedAt && (
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              fontFamily: "'Lexend Deca', sans-serif",
                              fontSize: '0.75rem',
                              color: 'var(--gray-400)',
                            }}>
                              <Calendar size={12} />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontFamily: "'Red Hat Display', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            color: 'var(--green-bright)',
                          }}>
                            Leer <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
