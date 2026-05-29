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
    const { title, excerpt, content, image, author, published } = body

    const existing = await prisma.blogPost.findUnique({ where: { id } })
    if (!existing) return Response.json({ error: 'Post no encontrado' }, { status: 404 })

    let slug = existing.slug
    if (title !== existing.title) {
      slug = slugify(title)
      const conflict = await prisma.blogPost.findFirst({ where: { slug, id: { not: id } } })
      if (conflict) slug = `${slug}-${Date.now()}`
    }

    const wasPublished = existing.published
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title, slug, excerpt, content,
        image: image || null,
        author: author || 'Zoovegetal',
        published: published ?? false,
        publishedAt: published && !wasPublished ? new Date() : existing.publishedAt,
      },
    })

    return Response.json(post)
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
    await prisma.blogPost.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
