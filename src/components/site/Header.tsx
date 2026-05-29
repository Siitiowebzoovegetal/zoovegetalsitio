'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Productos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/quienes-somos', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
        ...(solid
          ? {
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(126,200,35,0.15)',
              boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
            }
          : {
              background: 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }),
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: solid ? 'none' : '0 4px 20px rgba(0,0,0,0.2)',
              border: solid ? 'none' : '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }}>
              <img 
                src="/cropped-logo3.webp" 
                alt="Zoovegetal" 
                style={{ 
                  height: '32px', 
                  width: 'auto', 
                  objectFit: 'contain', 
                }} 
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.1rem' }}>
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: active ? 700 : 600,
                    fontSize: '0.875rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '100px',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.2s ease',
                    color: active
                      ? (solid ? 'var(--green-dark)' : '#ffffff')
                      : (solid ? 'var(--gray-700)' : 'rgba(255,255,255,0.85)'),
                    backgroundColor: active
                      ? (solid ? 'var(--green-pale)' : 'rgba(126,200,35,0.2)')
                      : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.target as HTMLElement).style.backgroundColor = solid
                        ? 'var(--gray-100)'
                        : 'rgba(255,255,255,0.1)'
                      ;(e.target as HTMLElement).style.color = solid ? 'var(--green-dark)' : '#ffffff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent'
                      ;(e.target as HTMLElement).style.color = solid ? 'var(--gray-700)' : 'rgba(255,255,255,0.85)'
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="tel:3136525779"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 600,
                fontSize: '0.84rem',
                color: solid ? 'var(--gray-600)' : 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                letterSpacing: '-0.01em',
              }}
            >
              <Phone size={14} />
              313 652 57 79
            </a>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '0.84rem', padding: '0.55rem 1.3rem' }}>
              Contáctanos
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{
              padding: '0.45rem',
              borderRadius: '10px',
              background: solid ? 'var(--gray-100)' : 'rgba(255,255,255,0.12)',
              border: 'none',
              cursor: 'pointer',
              color: solid ? 'var(--green-dark)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '480px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: open ? '1px solid var(--gray-100)' : 'none',
        }}
        className="md:hidden"
      >
        <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: active ? 700 : 600,
                  fontSize: '0.95rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: active ? 'var(--green-dark)' : 'var(--gray-700)',
                  backgroundColor: active ? 'var(--green-pale)' : 'transparent',
                  transition: 'all 0.2s ease',
                  display: 'block',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <div style={{ borderTop: '1px solid var(--gray-100)', marginTop: '0.75rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="tel:3136525779"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--gray-600)',
                textDecoration: 'none',
                padding: '0 1rem',
              }}
            >
              <Phone size={15} />
              313 652 57 79
            </a>
            <Link href="/contacto" className="btn-primary" style={{ justifyContent: 'center' }}>
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
