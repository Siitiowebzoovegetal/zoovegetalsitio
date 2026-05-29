import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return Response.json(messages)
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}
