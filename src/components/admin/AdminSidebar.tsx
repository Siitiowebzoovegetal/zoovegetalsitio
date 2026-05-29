'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, FileText, MessageSquare,
  LogOut, Menu, X, ExternalLink, ChevronRight,
  Leaf,
} from 'lucide-react'

const navItems = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Visión general',
    color: '#7ec823',
    activeBg: 'rgba(126,200,35,0.10)',
    activeBorder: '#7ec823',
  },
  {
    href: '/admin/productos',
    label: 'Productos',
    icon: Package,
    description: 'Gestión del catálogo',
    color: '#3b82f6',
    activeBg: 'rgba(59,130,246,0.08)',
    activeBorder: '#3b82f6',
  },
  {
    href: '/admin/blog',
    label: 'Blog',
    icon: FileText,
    description: 'Artículos y posts',
    color: '#f5a623',
    activeBg: 'rgba(245,166,35,0.08)',
    activeBorder: '#f5a623',
  },
  {
    href: '/admin/mensajes',
    label: 'Mensajes',
    icon: MessageSquare,
    description: 'Contacto de clientes',
    color: '#8b5cf6',
    activeBg: 'rgba(139,92,246,0.08)',
    activeBorder: '#8b5cf6',
  },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>

      {/* ── Logo ── */}
      <div style={{
        padding: '1.5rem 1.25rem 1.25rem',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <Link
          href="/admin/dashboard"
          onClick={onClose}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/cropped-logo3.webp" alt="Zoovegetal" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
        <div style={{
          fontFamily: "'Lexend Deca', sans-serif",
          fontSize: '0.62rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase' as const,
          color: '#cbd5e1',
          padding: '0 0.5rem',
          marginBottom: '0.5rem',
        }}>
          Navegación
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {navItems.map(({ href, label, icon: Icon, description, color, activeBg, activeBorder }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  background: active ? activeBg : 'transparent',
                  borderLeft: `3px solid ${active ? activeBorder : 'transparent'}`,
                  paddingLeft: active ? 'calc(0.85rem - 3px)' : '0.85rem',
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: '30px', height: '30px',
                  borderRadius: '8px',
                  background: active ? `${color}18` : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}>
                  <Icon size={15} style={{ color: active ? color : '#94a3b8' }} />
                </div>

                {/* Label + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700, fontSize: '0.85rem',
                    color: active ? '#0f172a' : '#64748b',
                    lineHeight: 1.2,
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: "'Lexend Deca', sans-serif",
                    fontSize: '0.68rem', color: active ? color : '#cbd5e1',
                    fontWeight: 500,
                    marginTop: '0.1rem',
                  }}>
                    {description}
                  </div>
                </div>

                {active && (
                  <ChevronRight size={13} style={{ color, flexShrink: 0 }} />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── Footer actions ── */}
      <div style={{
        padding: '0.75rem',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        {/* View site */}
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.6rem 0.85rem',
            borderRadius: '10px',
            textDecoration: 'none',
            transition: 'background 0.15s ease',
            marginBottom: '0.2rem',
          }}
        >
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: '#f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ExternalLink size={13} style={{ color: '#94a3b8' }} />
          </div>
          <span style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
            color: '#94a3b8',
          }}>
            Ver sitio web
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.6rem 0.85rem',
            borderRadius: '10px',
            background: 'none', border: 'none', cursor: 'pointer',
            width: '100%', textAlign: 'left',
            transition: 'background 0.15s ease',
            opacity: loggingOut ? 0.6 : 1,
          }}
        >
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: '#fef2f2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <LogOut size={13} style={{ color: '#ef4444' }} />
          </div>
          <span style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
            color: '#ef4444',
          }}>
            {loggingOut ? 'Cerrando...' : 'Cerrar sesión'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const activeItem = navItems.find((item) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`)
  )
  const pageLabel = activeItem?.label ?? 'Admin'

  return (
    <>
      {/* ══ DESKTOP SIDEBAR ══ */}
      <aside style={{
        width: '230px',
        flexShrink: 0,
        minHeight: '100vh',
        background: '#ffffff',
        borderRight: '1px solid rgba(0,0,0,0.07)',
        display: 'none',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        maxHeight: '100vh',
      }} className="admin-sidebar-desktop">
        <SidebarContent />
      </aside>

      {/* ══ MOBILE TOP BAR ══ */}
      <div
        className="admin-mobile-bar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: '56px',
          background: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1rem',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/cropped-logo3.webp" alt="Zoovegetal" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
          {activeItem && (
            <span style={{
              fontFamily: "'Lexend Deca', sans-serif",
              fontSize: '0.7rem', color: '#94a3b8',
              marginLeft: '0.4rem', fontWeight: 500,
            }}>
              / {pageLabel}
            </span>
          )}
        </div>

        {/* Right: hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: open ? '#f1f5f9' : 'transparent',
            border: '1px solid rgba(0,0,0,0.08)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#64748b', transition: 'all 0.15s ease',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(15,23,42,0.35)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Drawer panel */}
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
            width: '260px',
            background: '#ffffff',
            boxShadow: '4px 0 40px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column',
            animation: 'slideInLeft 0.22s ease',
          }}>
            {/* Close button inside drawer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              padding: '0.75rem 0.75rem 0',
            }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#f1f5f9', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <X size={15} />
              </button>
            </div>
            <SidebarContent onClose={() => setOpen(false)} />
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-mobile-bar { display: none !important; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  )
}
