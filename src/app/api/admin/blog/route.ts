import { NextRequest } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json(posts)
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, excerpt, content, image, author, published } = body

    if (!title || !excerpt || !content) {
      return Response.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    let slug = slugify(title)
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const post = await prisma.blogPost.create({
      data: {
        title, slug, excerpt, content,
        image: image || null,
        author: author || 'Zoovegetal',
        published: published ?? false,
        publishedAt: published ? new Date() : null,
      },
    })

    return Response.json(post, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error al crear post' }, { status: 500 })
  }
}
