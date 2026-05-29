export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const CATEGORIES = {
  canino: { label: 'Caninos', emoji: '🐕', color: '#8cd02b' },
  felino: { label: 'Felinos', emoji: '🐈', color: '#fbb03b' },
  equino: { label: 'Equinos', emoji: '🐴', color: '#063b05' },
} as const

export const SUBCATEGORIES = [
  'Snacks y Galletas',
  'Concentrado Seco',
  'Comida Cocida Congelada',
  'Suplementos Sólidos',
  'Suplementos en Polvo',
  'Pelletizados',
] as const
