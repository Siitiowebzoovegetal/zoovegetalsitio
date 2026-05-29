'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, Leaf } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Credenciales inválidas')
        return
      }
      router.push('/admin/dashboard')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      background: '#021f01', // Base dark background
    }}>
      {/* ── Background Unified Mesh / Gradient ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(2,31,1,0.9) 0%, rgba(6,59,5,0.9) 50%, rgba(13,92,11,0.95) 100%)',
        zIndex: 0,
      }} />

      {/* Paw prints pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cellipse cx='20' cy='20' rx='8' ry='10' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='12' cy='10' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='28' cy='10' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='9' cy='17' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='31' cy='17' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Cellipse cx='70' cy='60' rx='8' ry='10' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='62' cy='50' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='78' cy='50' r='4' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='59' cy='57' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3Ccircle cx='81' cy='57' r='3.5' fill='%23ffffff' opacity='0.04'/%3E%3C/svg%3E")`,
        zIndex: 0,
      }} />
      
      {/* Decorative Orbs for elegance */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(126,200,35,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '40%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(126,200,35,0.08) 0%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: 0,
      }} />

      {/* ── Left panel — branding (Transparent now) ── */}
      <div style={{
        display: 'none',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        position: 'relative',
        zIndex: 1,
      }} className="lg-flex">
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3.5rem' }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '12px 24px', 
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)' 
          }}>
            <img src="/cropped-logo3.webp" alt="Zoovegetal Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </div>

        <h2 style={{
          fontFamily: "'Red Hat Display', sans-serif",
          fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
          color: '#ffffff', letterSpacing: '-0.03em',
          lineHeight: 1.1, marginBottom: '1.25rem',
          maxWidth: '500px',
        }}>
          Gestiona tu<br />
          <span style={{ color: '#9fd63a' }}>catálogo</span> con facilidad
        </h2>
        <p style={{
          fontFamily: "'Lexend Deca', sans-serif",
          fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.7, maxWidth: '450px',
        }}>
          Administra productos, publicaciones de blog y mensajes de clientes desde un solo lugar.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '3.5rem' }}>
          {[
            { icon: '📦', text: 'Gestión de productos y catálogo' },
            { icon: '📝', text: 'Publicación de artículos del blog' },
            { icon: '💬', text: 'Bandeja de mensajes de clientes' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{
                fontFamily: "'Lexend Deca', sans-serif",
                fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)',
                fontWeight: 500,
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Mobile logo */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="lg-hidden">
            <div style={{ 
              background: '#ffffff', 
              padding: '10px 20px', 
              borderRadius: '14px',
              display: 'inline-block',
              margin: '0 auto 1.25rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)' 
            }}>
              <img src="/cropped-logo3.webp" alt="Zoovegetal Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.75rem', letterSpacing: '0.14em',
              color: '#9fd63a', fontWeight: 600,
              textTransform: 'uppercase' as const,
              marginTop: '0.5rem',
            }}>
              Panel Administrativo
            </div>
          </div>

          {/* Form Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
          }}>
            <h1 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 900, fontSize: '1.6rem',
              color: 'var(--green-dark)', letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
            }}>
              Iniciar sesión
            </h1>
            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.9rem', color: 'var(--gray-500)',
              marginBottom: '2.5rem',
            }}>
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700, fontSize: '0.85rem',
                  color: 'var(--gray-700)', marginBottom: '0.6rem',
                  letterSpacing: '0.02em',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  style={{ padding: '0.85rem 1rem', fontSize: '0.95rem', borderRadius: '14px' }}
                  placeholder="admin@zoovegetal.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 700, fontSize: '0.85rem',
                  color: 'var(--gray-700)', marginBottom: '0.6rem',
                  letterSpacing: '0.02em',
                }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field"
                    style={{ padding: '0.85rem 1rem', paddingRight: '3rem', fontSize: '0.95rem', borderRadius: '14px' }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: '1rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--gray-400)', padding: '0.25rem',
                    }}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.9rem',
                  color: '#dc2626',
                  fontWeight: 500,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  padding: '1rem 1.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: '0 8px 24px rgba(126,200,35,0.3)',
                }}
              >
                {loading ? (
                  <div style={{
                    width: '20px', height: '20px',
                    border: '2.5px solid currentColor',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                ) : (
                  <>
                    <LogIn size={18} />
                    Iniciar sesión
                  </>
                )}
              </button>
            </form>
          </div>

          <p style={{
            textAlign: 'center', marginTop: '2rem',
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
          }}>
            © {new Date().getFullYear()} Zoovegetal SAS.<br className="lg-hidden" /> Todos los derechos reservados.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-flex { display: flex !important; }
          .lg-hidden { display: none !important; }
        }
        @media (max-width: 1023px) {
          .lg-hidden { display: block !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
