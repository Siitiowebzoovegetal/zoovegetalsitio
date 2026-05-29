import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Zoovegetal — Nutrición Animal Premium',
    template: '%s | Zoovegetal',
  },
  description:
    'Empresa colombiana especializada en el desarrollo y fabricación de alimentos, snacks y suplementos nutricionales para mascotas. Calidad premium desde Medellín, Colombia.',
  keywords: [
    'nutrición animal',
    'alimentos para mascotas',
    'snacks perros',
    'suplementos animales',
    'maquila alimentos mascotas',
    'Colombia',
    'Medellín',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://zoovegetal.com',
    siteName: 'Zoovegetal',
    title: 'Zoovegetal — Nutrición Animal Premium',
    description: 'Desarrollamos y fabricamos alimentos, snacks y suplementos para mascotas con ingredientes de grado humano.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoovegetal — Nutrición Animal Premium',
    description: 'Desarrollamos y fabricamos alimentos, snacks y suplementos para mascotas.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased" style={{ overflowX: 'hidden' }}>{children}</body>
    </html>
  )
}
