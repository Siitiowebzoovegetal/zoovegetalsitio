import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  empresa: [
    { href: '/quienes-somos', label: 'Quiénes Somos' },
    { href: '/servicios', label: 'Nuestros Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ],
  productos: [
    { href: '/productos?cat=canino', label: '🐕 Caninos' },
    { href: '/productos?cat=felino', label: '🐈 Felinos' },
    { href: '/productos?cat=equino', label: '🐴 Equinos' },
    { href: '/productos', label: 'Ver todos →' },
  ],
  servicios: [
    { href: '/servicios#asesoria', label: 'Asesoría Especializada' },
    { href: '/servicios#desarrollo', label: 'Desarrollo de Producto' },
    { href: '/servicios#maquila', label: 'Maquila con ICA' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #021f01 0%, #063b05 100%)', color: 'white' }}>
      
      {/* Top accent line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #7ec823, #f5a623, transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1', maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(126,200,35,0.15)',
                border: '1px solid rgba(126,200,35,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
              }}>
                🐾
              </div>
              <div>
                <div style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.03em',
                  color: 'white',
                }}>
                  ZOOVEGETAL
                </div>
                <div style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: '#9fd63a',
                }}>
                  Nutrición Animal
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.75rem',
            }}>
              Empresa colombiana especializada en el desarrollo y fabricación de alimentos,
              snacks y suplementos para mascotas desde 2017.
            </p>

            {/* Cert badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.9rem',
              borderRadius: '100px',
              background: 'rgba(126,200,35,0.1)',
              border: '1px solid rgba(126,200,35,0.25)',
              marginBottom: '1.5rem',
            }}>
              <span style={{ fontSize: '0.75rem' }}>✅</span>
              <span style={{
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 700,
                fontSize: '0.72rem',
                color: '#9fd63a',
                letterSpacing: '0.04em',
              }}>
                Certificado BPM ICA
              </span>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a
                href="https://www.instagram.com/zoovegetal?igsh=MWVrdmUxeWQ3ODl1OA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '38px', height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1J5PC9hSQD/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '38px', height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px' }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/573136525779"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '38px', height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#9fd63a',
              marginBottom: '1.25rem',
            }}>
              Empresa
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h4 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#9fd63a',
              marginBottom: '1.25rem',
            }}>
              Productos
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
              {footerLinks.productos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#9fd63a',
              marginBottom: '1.25rem',
            }}>
              Servicios
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Lexend Deca', sans-serif",
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#9fd63a',
              marginBottom: '1.25rem',
            }}>
              Contacto
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                <MapPin size={15} style={{ color: '#9fd63a', flexShrink: 0, marginTop: '2px' }} />
                <span style={{
                  fontFamily: "'Lexend Deca', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                }}>
                  Carrera 57 # 24–23<br />
                  Medellín, Antioquia<br />
                  Colombia
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Phone size={15} style={{ color: '#9fd63a', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <a href="tel:3136525779" style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}>
                    313 652 57 79
                  </a>
                  <a href="tel:054 3221688" style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}>
                    (054) 322 16 88
                  </a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Mail size={15} style={{ color: '#9fd63a', flexShrink: 0 }} />
                <a
                  href="mailto:info@zoovegetal.com"
                  style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    wordBreak: 'break-all' as const,
                  }}
                >
                  info@zoovegetal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            © {new Date().getFullYear()} Zoovegetal SAS. Todos los derechos reservados.
          </p>
          <p style={{
            fontFamily: "'Lexend Deca', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Medellín, Colombia · Fundada 2017
          </p>
        </div>
      </div>
    </footer>
  )
}
