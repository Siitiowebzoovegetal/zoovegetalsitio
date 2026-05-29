'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, FileText, MessageSquare, Bell, ArrowUpRight, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Stats {
  products: number
  posts: number
  messages: number
  unreadMessages: number
  recentMessages: Array<{
    id: string
    name: string
    email: string
    subject: string
    createdAt: string
    read: boolean
  }>
}

const labelStyle = {
  fontFamily: "'Lexend Deca', sans-serif",
  fontSize: '0.8rem',
  color: 'var(--gray-500)',
  fontWeight: 500,
}

const valueStyle = {
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: 900,
  fontSize: '2.25rem',
  color: 'var(--gray-900)',
  letterSpacing: '-0.04em',
  lineHeight: 1,
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    {
      label: 'Productos activos',
      value: stats?.products,
      icon: Package,
      accent: '#7ec823',
      bg: '#f0f9e0',
      href: '/admin/productos',
    },
    {
      label: 'Posts publicados',
      value: stats?.posts,
      icon: FileText,
      accent: '#f5a623',
      bg: '#fff8ec',
      href: '/admin/blog',
    },
    {
      label: 'Total mensajes',
      value: stats?.messages,
      icon: MessageSquare,
      accent: '#3b82f6',
      bg: '#eff6ff',
      href: '/admin/mensajes',
    },
    {
      label: 'Sin leer',
      value: stats?.unreadMessages,
      icon: Bell,
      accent: '#ef4444',
      bg: '#fef2f2',
      href: '/admin/mensajes',
    },
  ]

  const quickActions = [
    { label: 'Nuevo Producto', href: '/admin/productos?new=1', icon: '📦', accent: '#7ec823', bg: '#f0f9e0' },
    { label: 'Nuevo Post', href: '/admin/blog?new=1', icon: '📝', accent: '#f5a623', bg: '#fff8ec' },
    { label: 'Ver Mensajes', href: '/admin/mensajes', icon: '💬', accent: '#3b82f6', bg: '#eff6ff' },
    { label: 'Ver Sitio', href: '/', icon: '🌐', accent: '#8b5cf6', bg: '#f5f3ff', newTab: true },
  ]

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: "'Red Hat Display', sans-serif",
          fontWeight: 900, fontSize: '1.75rem',
          color: 'var(--green-dark)', letterSpacing: '-0.03em',
          marginBottom: '0.3rem',
        }}>
          Dashboard
        </h1>
        <p style={{ ...labelStyle, fontSize: '0.875rem' }}>
          Bienvenido al panel de administración de Zoovegetal
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              textDecoration: 'none',
              border: '1px solid var(--gray-100)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              display: 'block',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <card.icon size={20} style={{ color: card.accent }} />
              </div>
              <ArrowUpRight size={15} style={{ color: 'var(--gray-300)' }} />
            </div>
            <div style={valueStyle}>
              {loading ? (
                <div style={{
                  width: '60px', height: '2.25rem', borderRadius: '8px',
                  background: 'var(--gray-100)', animation: 'pulse 1.5s ease-in-out infinite',
                }} />
              ) : (
                card.value ?? '—'
              )}
            </div>
            <div style={{ ...labelStyle, marginTop: '0.4rem' }}>{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
      }}>
        {/* Quick actions */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '1px solid var(--gray-100)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TrendingUp size={16} style={{ color: 'var(--green-bright)' }} />
            <h2 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 800, fontSize: '1rem',
              color: 'var(--green-dark)', letterSpacing: '-0.02em',
            }}>
              Acciones rápidas
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.newTab ? '_blank' : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  padding: '1rem',
                  borderRadius: '14px',
                  background: action.bg,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${action.accent}20`,
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <span style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700, fontSize: '0.82rem',
                  color: action.accent,
                  lineHeight: 1.2,
                }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '1px solid var(--gray-100)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={16} style={{ color: '#3b82f6' }} />
              <h2 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 800, fontSize: '1rem',
                color: 'var(--green-dark)', letterSpacing: '-0.02em',
              }}>
                Mensajes recientes
              </h2>
            </div>
            <Link
              href="/admin/mensajes"
              style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontSize: '0.78rem', fontWeight: 700,
                color: 'var(--green-bright)', textDecoration: 'none',
              }}
            >
              Ver todos →
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  height: '56px', borderRadius: '12px',
                  background: 'var(--gray-100)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }} />
              ))}
            </div>
          ) : stats?.recentMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <p style={{ ...labelStyle }}>No hay mensajes aún</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stats?.recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href="/admin/mensajes"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    background: msg.read ? 'transparent' : '#f0f9e0',
                    border: msg.read ? '1px solid transparent' : '1px solid rgba(126,200,35,0.2)',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: msg.read ? 'var(--gray-100)' : '#7ec82320',
                    border: msg.read ? 'none' : '1.5px solid #7ec82340',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800, fontSize: '0.85rem',
                    color: msg.read ? 'var(--gray-500)' : 'var(--green-dark)',
                  }}>
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700, fontSize: '0.85rem',
                        color: 'var(--gray-900)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <div style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: 'var(--green-bright)', flexShrink: 0,
                        }} />
                      )}
                    </div>
                    <div style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.78rem', color: 'var(--gray-500)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {msg.subject}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.72rem', color: 'var(--gray-300)',
                    flexShrink: 0,
                  }}>
                    {formatDate(msg.createdAt)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
