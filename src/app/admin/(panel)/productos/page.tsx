'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, Search, Star, X, Save, Package } from 'lucide-react'
import { SUBCATEGORIES } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDesc: string | null
  category: string
  subcategory: string
  featured: boolean
  active: boolean
  order: number
}

const EMPTY: Omit<Product, 'id' | 'slug'> = {
  name: '', description: '', longDesc: '', category: 'canino',
  subcategory: 'Snacks y Galletas', featured: false, active: true, order: 0,
}

const catMeta: Record<string, { label: string; bg: string; color: string }> = {
  canino: { label: '🐕 Canino', bg: '#f0f9e0', color: '#3a7a0a' },
  felino: { label: '🐈 Felino', bg: '#fff8ec', color: '#b07210' },
  equino: { label: '🐴 Equino', bg: '#edf7ec', color: '#063b05' },
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Red Hat Display', sans-serif",
  fontWeight: 700, fontSize: '0.78rem',
  color: 'var(--gray-700)', marginBottom: '0.45rem',
  letterSpacing: '0.02em',
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [modal, setModal] = useState<{ open: boolean; editing: Product | null }>({ open: false, editing: null })
  const [form, setForm] = useState<Omit<Product, 'id' | 'slug'>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      setProducts(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => {
    setForm(EMPTY)
    setModal({ open: true, editing: null })
    setError('')
  }

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, description: p.description, longDesc: p.longDesc ?? '',
      category: p.category, subcategory: p.subcategory,
      featured: p.featured, active: p.active, order: p.order,
    })
    setModal({ open: true, editing: p })
    setError('')
  }

  const closeModal = () => setModal({ open: false, editing: null })

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = modal.editing ? `/api/admin/products/${modal.editing.id}` : '/api/admin/products'
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
    if (!confirm('¿Eliminar este producto?')) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      await load()
    } finally {
      setDeleting(null)
    }
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = !catFilter || p.category === catFilter
    return matchSearch && matchCat
  })

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: '#f0f9e0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Package size={20} style={{ color: 'var(--green-bright)' }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900, fontSize: '1.5rem',
              color: 'var(--green-dark)', letterSpacing: '-0.03em',
            }}>
              Productos
            </h1>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.8rem', color: 'var(--gray-400)',
              marginTop: '0.1rem',
            }}>
              {products.length} productos en total
            </p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{
            position: 'absolute', left: '0.85rem', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--gray-400)',
          }} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="input-field"
          style={{ width: 'auto', minWidth: '160px' }}
        >
          <option value="">Todas las categorías</option>
          <option value="canino">🐕 Caninos</option>
          <option value="felino">🐈 Felinos</option>
          <option value="equino">🐴 Equinos</option>
        </select>
      </div>

      {/* Table card */}
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
              width: '40px', height: '40px',
              border: '3px solid var(--gray-200)',
              borderTopColor: 'var(--green-bright)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem',
            }} />
            <p style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.875rem', color: 'var(--gray-400)' }}>
              Cargando productos...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <p style={{ fontFamily: "'Lexend Deca', sans-serif", fontSize: '0.95rem', color: 'var(--gray-400)' }}>
              No hay productos{search || catFilter ? ' con esos filtros' : ''}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  {['Nombre', 'Categoría', 'Subcategoría', 'Estado', 'Acciones'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700, fontSize: '0.72rem',
                        color: 'var(--gray-400)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                        background: '#fafafa',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => {
                  const meta = catMeta[product.category]
                  return (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontFamily: "'Red Hat Display', sans-serif",
                            fontWeight: 700, fontSize: '0.875rem',
                            color: 'var(--gray-900)',
                          }}>
                            {product.name}
                          </span>
                          {product.featured && (
                            <Star size={12} fill="#f5a623" style={{ color: '#f5a623', flexShrink: 0 }} />
                          )}
                        </div>
                        <div style={{
                          fontFamily: "'Lexend Deca', sans-serif",
                          fontSize: '0.75rem', color: 'var(--gray-400)',
                          marginTop: '0.15rem',
                        }}>
                          /{product.slug}
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {meta && (
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '100px',
                            background: meta.bg,
                            color: meta.color,
                            fontFamily: "'Red Hat Display', sans-serif",
                            fontWeight: 700, fontSize: '0.72rem',
                            border: `1px solid ${meta.color}20`,
                          }}>
                            {meta.label}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{
                          fontFamily: "'Lexend Deca', sans-serif",
                          fontSize: '0.85rem', color: 'var(--gray-600)',
                        }}>
                          {product.subcategory}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '100px',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700, fontSize: '0.72rem',
                          background: product.active ? '#dcfce7' : '#fee2e2',
                          color: product.active ? '#16a34a' : '#dc2626',
                          border: `1px solid ${product.active ? '#16a34a' : '#dc2626'}20`,
                        }}>
                          {product.active ? '● Activo' : '● Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <button
                            onClick={() => openEdit(product)}
                            style={{
                              width: '32px', height: '32px',
                              borderRadius: '8px',
                              background: '#eff6ff',
                              border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.15s ease',
                            }}
                            title="Editar"
                          >
                            <Edit2 size={14} style={{ color: '#3b82f6' }} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            style={{
                              width: '32px', height: '32px',
                              borderRadius: '8px',
                              background: '#fef2f2',
                              border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.15s ease',
                              opacity: deleting === product.id ? 0.5 : 1,
                            }}
                            title="Eliminar"
                          >
                            <Trash2 size={14} style={{ color: '#ef4444' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%', maxWidth: '640px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
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
                {modal.editing ? 'Editar Producto' : 'Nuevo Producto'}
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

            {/* Modal body */}
            <form onSubmit={handleSave} style={{ padding: '1.5rem 2rem', overflow: 'y-auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Nombre *</label>
                  <input
                    required type="text" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field" placeholder="Nombre del producto"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Categoría *</label>
                  <select
                    required value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="canino">🐕 Canino</option>
                    <option value="felino">🐈 Felino</option>
                    <option value="equino">🐴 Equino</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subcategoría *</label>
                <select
                  required value={form.subcategory}
                  onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  className="input-field"
                >
                  {SUBCATEGORIES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Descripción corta *</label>
                <textarea
                  required rows={3} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field" style={{ resize: 'none' as const }}
                  placeholder="Descripción breve del producto"
                />
              </div>

              <div>
                <label style={labelStyle}>Descripción detallada (HTML)</label>
                <textarea
                  rows={4} value={form.longDesc ?? ''}
                  onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                  className="input-field"
                  style={{ resize: 'none' as const, fontFamily: 'monospace', fontSize: '0.8rem' }}
                  placeholder="<p>Descripción detallada...</p>"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label style={labelStyle}>Orden</label>
                  <input
                    type="number" value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="input-field" min={0}
                  />
                </div>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: form.featured ? '#fff8ec' : 'var(--gray-100)',
                  border: `1px solid ${form.featured ? '#f5a62330' : 'transparent'}`,
                  cursor: 'pointer',
                  userSelect: 'none' as const,
                  transition: 'all 0.15s ease',
                }}>
                  <input
                    type="checkbox" id="featured" checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    style={{ accentColor: '#f5a623', width: '16px', height: '16px' }}
                  />
                  <span style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.82rem',
                    color: form.featured ? '#b07210' : 'var(--gray-600)',
                  }}>⭐ Destacado</span>
                </label>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: form.active ? '#f0f9e0' : 'var(--gray-100)',
                  border: `1px solid ${form.active ? '#7ec82330' : 'transparent'}`,
                  cursor: 'pointer',
                  userSelect: 'none' as const,
                  transition: 'all 0.15s ease',
                }}>
                  <input
                    type="checkbox" id="active" checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    style={{ accentColor: '#7ec823', width: '16px', height: '16px' }}
                  />
                  <span style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.82rem',
                    color: form.active ? '#3a7a0a' : 'var(--gray-600)',
                  }}>● Activo</span>
                </label>
              </div>

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

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                <button
                  type="button" onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '100px',
                    background: 'var(--gray-100)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.875rem',
                    color: 'var(--gray-600)',
                    transition: 'background 0.15s ease',
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
                  ) : <><Save size={15} /> Guardar</>}
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
