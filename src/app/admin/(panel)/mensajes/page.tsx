'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Mail, MailOpen, Search, MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMensajesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selected, setSelected] = useState<Message | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/messages')
      setMessages(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read } : m))
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read } : null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje?')) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } finally {
      setDeleting(null)
    }
  }

  const openMessage = async (msg: Message) => {
    setSelected(msg)
    if (!msg.read) await markRead(msg.id, true)
  }

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' || (filter === 'unread' && !m.read) || (filter === 'read' && m.read)
    return matchSearch && matchFilter
  })

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: '#eff6ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MessageSquare size={20} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900, fontSize: '1.5rem',
              color: 'var(--green-dark)', letterSpacing: '-0.03em',
            }}>
              Mensajes
            </h1>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.8rem', color: 'var(--gray-400)',
            }}>
              {messages.length} mensajes · {unreadCount} sin leer
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{
            position: 'absolute', left: '0.85rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--gray-400)',
          }} />
          <input
            type="text" placeholder="Buscar mensajes..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="input-field" style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                border: 'none', cursor: 'pointer',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 700, fontSize: '0.8rem',
                transition: 'all 0.15s ease',
                background: filter === f ? 'var(--green-bright)' : 'var(--gray-100)',
                color: filter === f ? 'var(--green-dark)' : 'var(--gray-500)',
                boxShadow: filter === f ? 'var(--shadow-green)' : 'none',
              }}
            >
              {f === 'all' ? 'Todos' : f === 'unread' ? `Sin leer${unreadCount > 0 ? ` (${unreadCount})` : ''}` : 'Leídos'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
        {/* Message list */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--gray-100)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{
                width: '36px', height: '36px',
                border: '3px solid var(--gray-200)', borderTopColor: '#3b82f6',
                borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                margin: '0 auto',
              }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📭</div>
              <p style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.875rem', color: 'var(--gray-400)' }}>
                Sin mensajes
              </p>
            </div>
          ) : (
            <div>
              {filtered.map((msg, i) => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1rem 1.25rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    borderLeft: `3px solid ${selected?.id === msg.id ? 'var(--green-bright)' : msg.read ? 'transparent' : '#3b82f6'}`,
                    backgroundColor: selected?.id === msg.id
                      ? '#f0f9e0'
                      : !msg.read ? '#f0f8ff' : 'transparent',
                  }}
                >
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: msg.read ? 'var(--gray-100)' : '#eff6ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800, fontSize: '0.9rem',
                    color: msg.read ? 'var(--gray-500)' : '#3b82f6',
                  }}>
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700, fontSize: '0.875rem',
                        color: 'var(--gray-900)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <div style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: '#3b82f6', flexShrink: 0,
                        }} />
                      )}
                    </div>
                    <p style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.82rem', color: 'var(--gray-700)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      marginBottom: '0.2rem',
                    }}>
                      {msg.subject}
                    </p>
                    <p style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.72rem', color: 'var(--gray-400)',
                    }}>
                      {formatDate(msg.createdAt)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid var(--gray-100)',
          boxShadow: 'var(--shadow-sm)',
          minHeight: '400px',
        }}>
          {!selected ? (
            <div style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'var(--gray-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <Mail size={28} style={{ color: 'var(--gray-300)' }} />
              </div>
              <p style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.875rem', color: 'var(--gray-400)' }}>
                Selecciona un mensaje para verlo
              </p>
            </div>
          ) : (
            <div style={{ padding: '1.5rem' }}>
              {/* Detail header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900, fontSize: '1.1rem',
                    color: 'var(--green-dark)', letterSpacing: '-0.02em',
                    marginBottom: '0.3rem',
                  }}>
                    {selected.subject}
                  </h2>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.78rem', color: 'var(--gray-400)',
                  }}>
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => markRead(selected.id, !selected.read)}
                    style={{
                      width: '34px', height: '34px', borderRadius: '9px',
                      background: 'var(--gray-100)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    title={selected.read ? 'Marcar no leído' : 'Marcar leído'}
                  >
                    {selected.read
                      ? <MailOpen size={15} style={{ color: 'var(--gray-400)' }} />
                      : <Mail size={15} style={{ color: '#3b82f6' }} />}
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    disabled={deleting === selected.id}
                    style={{
                      width: '34px', height: '34px', borderRadius: '9px',
                      background: '#fef2f2', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: deleting === selected.id ? 0.5 : 1,
                    }}
                  >
                    <Trash2 size={15} style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>

              {/* Sender info */}
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                background: 'var(--off-white)',
                border: '1px solid var(--gray-100)',
                marginBottom: '1.25rem',
              }}>
                {[
                  { label: 'De', value: selected.name },
                  { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                  ...(selected.phone ? [{ label: 'Teléfono', value: selected.phone, href: `tel:${selected.phone}` }] : []),
                  ...(selected.company ? [{ label: 'Empresa', value: selected.company }] : []),
                ].map(({ label, value, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700, fontSize: '0.72rem',
                      color: 'var(--gray-400)', letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const,
                      width: '70px', flexShrink: 0,
                      paddingTop: '0.1rem',
                    }}>
                      {label}
                    </span>
                    {href ? (
                      <a href={href} style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.875rem', color: 'var(--green-bright)',
                        textDecoration: 'none', fontWeight: 600,
                      }}>
                        {value}
                      </a>
                    ) : (
                      <span style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.875rem', color: 'var(--gray-700)',
                      }}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Message body */}
              <div style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: '#fafafa',
                border: '1px solid var(--gray-100)',
                marginBottom: '1.5rem',
              }}>
                <p style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700, fontSize: '0.72rem',
                  color: 'var(--gray-400)', letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.75rem',
                }}>
                  Mensaje
                </p>
                <p style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.9rem', color: 'var(--gray-700)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap' as const,
                }}>
                  {selected.message}
                </p>
              </div>

              {/* Reply actions */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', minWidth: '140px', fontSize: '0.875rem' }}
                >
                  <Mail size={15} />
                  Responder por email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(selected.name)},%20le%20respondo%20desde%20Zoovegetal.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.75rem 1.25rem', borderRadius: '100px',
                      background: '#25D366', color: 'white',
                      textDecoration: 'none',
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700, fontSize: '0.875rem',
                      boxShadow: '0 4px 12px rgba(37,211,102,0.35)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
