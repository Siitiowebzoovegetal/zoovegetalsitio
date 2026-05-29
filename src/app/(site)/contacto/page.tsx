'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    Icon: MapPin,
    title: 'Dirección',
    content: 'Carrera 57 # 24–23\nMedellín, Antioquia, Colombia',
    color: '#7ec823',
    bg: '#f0f9e0',
  },
  {
    Icon: Phone,
    title: 'Teléfonos',
    content: '313 652 57 79\n(054) 322 16 88',
    color: '#7ec823',
    bg: '#f0f9e0',
  },
  {
    Icon: Mail,
    title: 'Email',
    content: 'info@zoovegetal.com',
    color: '#f5a623',
    bg: '#fff8ec',
  },
  {
    Icon: Clock,
    title: 'Horario',
    content: 'Lunes a Viernes: 8:00am – 6:00pm\nSábado: 8:00am – 1:00pm',
    color: '#f5a623',
    bg: '#fff8ec',
  },
]

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    } catch {
      setError('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbenos por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

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
            Contáctanos
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
            Hablemos de tu{' '}
            <span style={{ color: '#9fd63a' }}>proyecto</span>
          </h1>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.7,
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            Atendemos a marcas y distribuidores mayoristas. Cuéntanos tu idea y te respondemos.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <section style={{ padding: '5rem 1.5rem 6rem', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>

            {/* ── Left: contact info ── */}
            <div>
              <h2 style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 900,
                fontSize: '1.65rem',
                color: 'var(--green-dark)',
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}>
                Información de contacto
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {contactInfo.map(({ Icon, title, content, color, bg }) => (
                  <div
                    key={title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem',
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid var(--gray-100)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={19} style={{ color }} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        color: 'var(--green-dark)',
                        marginBottom: '0.3rem',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase' as const,
                      }}>
                        {title}
                      </div>
                      <div style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.9rem',
                        color: 'var(--gray-600)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line' as const,
                      }}>
                        {content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/573136525779?text=Hola,%20quiero%20más%20información%20sobre%20los%20servicios%20de%20Zoovegetal."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: '#25D366',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: '22px', height: '22px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    letterSpacing: '-0.01em',
                  }}>
                    Escríbenos por WhatsApp
                  </div>
                  <div style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.85rem',
                    opacity: 0.9,
                    marginTop: '0.15rem',
                  }}>
                    Respuesta inmediata · 313 652 57 79
                  </div>
                </div>
              </a>
            </div>

            {/* ── Right: form ── */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid var(--gray-100)',
              boxShadow: 'var(--shadow-md)',
            }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{
                    width: '72px', height: '72px',
                    background: 'var(--green-pale)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <CheckCircle size={36} style={{ color: 'var(--green-bright)' }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.95rem',
                    color: 'var(--gray-500)',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                  }}>
                    Te responderemos en menos de 24 horas hábiles.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn-primary">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    color: 'var(--green-dark)',
                    letterSpacing: '-0.02em',
                    marginBottom: '1.75rem',
                  }}>
                    Envíanos un mensaje
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {/* Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: 'var(--gray-700)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.02em',
                        }}>
                          Nombre *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input-field"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: 'var(--gray-700)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.02em',
                        }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-field"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone + Company */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: 'var(--gray-700)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.02em',
                        }}>
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="300 000 0000"
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: 'var(--gray-700)',
                          marginBottom: '0.45rem',
                          letterSpacing: '0.02em',
                        }}>
                          Empresa / Marca
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="input-field"
                          placeholder="Tu empresa"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: 'var(--gray-700)',
                        marginBottom: '0.45rem',
                        letterSpacing: '0.02em',
                      }}>
                        Asunto *
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input-field"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="Desarrollo de producto">Desarrollo de producto</option>
                        <option value="Maquila con ICA">Maquila con registro ICA</option>
                        <option value="Maquila sin ICA">Maquila sin registro ICA</option>
                        <option value="Asesoría">Asesoría especializada</option>
                        <option value="Cotización productos">Cotización de productos</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: 'var(--gray-700)',
                        marginBottom: '0.45rem',
                        letterSpacing: '0.02em',
                      }}>
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-field"
                        style={{ resize: 'none' as const }}
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                      />
                    </div>

                    {error && (
                      <div style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        fontFamily: "'Lexend Deca', sans-serif",
                        fontSize: '0.875rem',
                        color: '#dc2626',
                      }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ justifyContent: 'center', marginTop: '0.25rem', opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: '16px', height: '16px',
                            border: '2px solid currentColor',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }} />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={17} />
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
