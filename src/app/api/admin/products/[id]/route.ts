import { NextRequest } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const { name, description, longDesc, category, subcategory, image, featured, active, order } = body

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) return Response.json({ error: 'Producto no encontrado' }, { status: 404 })

    let slug = existing.slug
    if (name !== existing.name) {
      slug = slugify(name)
      const conflict = await prisma.product.findFirst({ where: { slug, id: { not: id } } })
      if (conflict) slug = `${slug}-${Date.now()}`
    }

    const product = await prisma.product.update({
      where: { id },
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

    return Response.json(product)
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
