import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <main style={{ flex: 1, padding: '2rem', marginTop: '56px' }} className="admin-main">
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .admin-main { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  )
}
