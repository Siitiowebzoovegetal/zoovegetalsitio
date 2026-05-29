import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug, published: true } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Artículo no encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Header spacer */}
      <div style={{ height: '72px' }} />

      {/* Post header */}
      <div style={{
        padding: '3.5rem 1.5rem 4rem',
        background: 'linear-gradient(145deg, #021f01 0%, #063b05 50%, #0d5c0b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(126,200,35,0.12) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              transition: 'color 0.2s ease',
            }}
          >
            <ArrowLeft size={15} />
            Volver al blog
          </Link>

          <h1 style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.85rem, 4vw, 3rem)',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.65)',
            }}>
              <User size={14} style={{ color: '#9fd63a' }} />
              {post.author}
            </span>
            {post.publishedAt && (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.65)',
              }}>
                <Calendar size={14} style={{ color: '#9fd63a' }} />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Post content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--gray-100)',
        }}>
          {/* Excerpt */}
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1.1rem',
            color: 'var(--gray-700)',
            lineHeight: 1.75,
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--gray-100)',
            fontWeight: 500,
          }}>
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose-zoovegetal"
            style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '1rem',
              color: 'var(--gray-700)',
              lineHeight: 1.8,
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Back link */}
        <div style={{ marginTop: '2.5rem' }}>
          <Link
            href="/blog"
            className="btn-primary"
            style={{ display: 'inline-flex', fontSize: '0.9rem' }}
          >
            <ArrowLeft size={16} />
            Volver al blog
          </Link>
        </div>
      </div>
    </div>
  )
}
