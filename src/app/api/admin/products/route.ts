import { NextRequest } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const products = await prisma.product.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
    return Response.json(products)
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, description, longDesc, category, subcategory, image, featured, active, order } = body

    if (!name || !description || !category || !subcategory) {
      return Response.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    let slug = slugify(name)
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const product = await prisma.product.create({
      data: {
        name, slug, description,
        longDesc: longDesc || null,
        category, subcategory,
        image: image || null,
        featured: featured ?? false,
        active: active ?? true,
        order: order ?? 0,
      },
    })

    return Response.json(product, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}
