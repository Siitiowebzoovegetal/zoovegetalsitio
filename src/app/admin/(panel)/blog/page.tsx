'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, Search, X, Save, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published: boolean
  publishedAt: string | null
  createdAt: string
}

const EMPTY = {
  title: '', excerpt: '', content: '', author: 'Zoovegetal', published: false,
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: 700, fontSize: '0.78rem',
  color: 'var(--gray-700)', marginBottom: '0.45rem',
  letterSpacing: '0.02em',
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<{ open: boolean; editing: BlogPost | null }>({ open: false, editing: null })
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/blog')
      setPosts(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => {
    setForm(EMPTY)
    setModal({ open: true, editing: null })
    setError('')
    setTab('edit')
  }

  const openEdit = (p: BlogPost) => {
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, author: p.author, published: p.published })
    setModal({ open: true, editing: p })
    setError('')
    setTab('edit')
  }

  const closeModal = () => setModal({ open: false, editing: null })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = modal.editing ? `/api/admin/blog/${modal.editing.id}` : '/api/admin/blog'
      const method = modal.editing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Error al guardar')
        return
      }
      closeModal()
      await load()
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este post?')) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      await load()
    } finally {
      setDeleting(null)
    }
  }

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: '#fff8ec',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={20} style={{ color: '#f5a623' }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900, fontSize: '1.5rem',
              color: 'var(--green-dark)', letterSpacing: '-0.03em',
            }}>
              Blog
            </h1>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.8rem', color: 'var(--gray-400)',
              marginTop: '0.1rem',
            }}>
              {posts.length} artículos · {posts.filter((p) => p.published).length} publicados
            </p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <Plus size={16} />
          Nuevo Post
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '380px', marginBottom: '1.25rem' }}>
        <Search size={15} style={{
          position: 'absolute', left: '0.85rem', top: '50%',
          transform: 'translateY(-50%)', color: 'var(--gray-400)',
        }} />
        <input
          type="text" placeholder="Buscar posts..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="input-field" style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Posts list */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--gray-100)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{
              width: '36px', height: '36px',
              border: '3px solid var(--gray-200)', borderTopColor: '#f5a623',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              margin: '0 auto',
            }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.95rem', color: 'var(--gray-400)' }}>
              No hay artículos{search ? ' con ese nombre' : ''}
            </p>
          </div>
        ) : (
          <div>
            {filtered.map((post, i) => (
              <div
                key={post.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.1rem 1.25rem',
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Post icon */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: post.published ? '#f0f9e0' : 'var(--gray-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '1.2rem',
                }}>
                  {post.published ? '📰' : '📄'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700, fontSize: '0.925rem',
                      color: 'var(--gray-900)',
                    }}>
                      {post.title}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '100px',
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 700, fontSize: '0.68rem',
                      background: post.published ? '#dcfce7' : 'var(--gray-100)',
                      color: post.published ? '#16a34a' : 'var(--gray-400)',
                      border: `1px solid ${post.published ? '#16a34a20' : 'transparent'}`,
                    }}>
                      {post.published ? '● Publicado' : '○ Borrador'}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.82rem', color: 'var(--gray-500)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    marginBottom: '0.25rem',
                  }}>
                    {post.excerpt}
                  </p>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.72rem', color: 'var(--gray-300)',
                  }}>
                    Por {post.author} · {formatDate(post.createdAt)}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                  <button
                    onClick={() => openEdit(post)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: '#eff6ff', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    title="Editar"
                  >
                    <Edit2 size={14} style={{ color: '#3b82f6' }} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: '#fef2f2', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: deleting === post.id ? 0.5 : 1,
                    }}
                    title="Eliminar"
                  >
                    <Trash2 size={14} style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '1rem', overflowY: 'auto',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%', maxWidth: '800px',
            margin: '2rem 0',
            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
            overflow: 'hidden',
          }}>
            {/* Modal header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--gray-100)',
            }}>
              <h2 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900, fontSize: '1.2rem',
                color: 'var(--green-dark)', letterSpacing: '-0.02em',
              }}>
                {modal.editing ? 'Editar Post' : 'Nuevo Post'}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'var(--gray-100)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gray-500)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Título *</label>
                  <input
                    required type="text" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-field" placeholder="Título del artículo"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Autor</label>
                  <input
                    type="text" value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Resumen / Extracto *</label>
                <textarea
                  required rows={2} value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="input-field" style={{ resize: 'none' as const }}
                  placeholder="Resumen breve del artículo"
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Contenido (HTML) *</label>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {(['edit', 'preview'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '8px',
                          border: 'none', cursor: 'pointer',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700, fontSize: '0.75rem',
                          background: tab === t ? 'var(--green-bright)' : 'var(--gray-100)',
                          color: tab === t ? 'var(--green-dark)' : 'var(--gray-500)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {t === 'edit' ? 'Editor' : 'Vista previa'}
                      </button>
                    ))}
                  </div>
                </div>
                {tab === 'edit' ? (
                  <textarea
                    required rows={14}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="input-field"
                    style={{ resize: 'none' as const, fontFamily: 'monospace', fontSize: '0.82rem' }}
                    placeholder="<h2>Título sección</h2><p>Contenido del artículo...</p>"
                  />
                ) : (
                  <div
                    className="prose-zoovegetal"
                    style={{
                      minHeight: '200px', maxHeight: '350px',
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      border: '2px solid var(--gray-200)',
                      overflowY: 'auto',
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.9rem',
                    }}
                    dangerouslySetInnerHTML={{ __html: form.content || '<p style="color:var(--gray-400)">Sin contenido aún...</p>' }}
                  />
                )}
              </div>

              {/* Publish toggle */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                background: form.published ? '#f0f9e0' : 'var(--gray-100)',
                border: `1.5px solid ${form.published ? 'rgba(126,200,35,0.25)' : 'transparent'}`,
                cursor: 'pointer',
                userSelect: 'none' as const,
                transition: 'all 0.2s ease',
              }}>
                <input
                  type="checkbox" id="published" checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  style={{ accentColor: 'var(--green-bright)', width: '18px', height: '18px' }}
                />
                <div>
                  <span style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.9rem',
                    color: form.published ? 'var(--green-dark)' : 'var(--gray-600)',
                    display: 'block',
                  }}>
                    {form.published ? '● Publicar ahora' : '○ Guardar como borrador'}
                  </span>
                  <span style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.75rem',
                    color: 'var(--gray-400)',
                  }}>
                    {form.published ? 'El artículo será visible en el blog' : 'El artículo no estará visible aún'}
                  </span>
                </div>
              </label>

              {error && (
                <div style={{
                  padding: '0.85rem 1rem', borderRadius: '12px',
                  background: '#fef2f2', border: '1px solid #fecaca',
                  fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.875rem',
                  color: '#dc2626',
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
                <button
                  type="button" onClick={closeModal}
                  style={{
                    flex: '0 0 auto',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '100px',
                    background: 'var(--gray-100)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.875rem',
                    color: 'var(--gray-600)',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit" disabled={saving}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', opacity: saving ? 0.75 : 1 }}
                >
                  {saving ? (
                    <div style={{
                      width: '16px', height: '16px',
                      border: '2px solid currentColor', borderTopColor: 'transparent',
                      borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                    }} />
                  ) : <><Save size={15} /> Guardar Post</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
