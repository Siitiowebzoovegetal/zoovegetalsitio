import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const [products, posts, messages, unreadMessages] = await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ])

    const recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    return Response.json({ products, posts, messages, unreadMessages, recentMessages })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}
