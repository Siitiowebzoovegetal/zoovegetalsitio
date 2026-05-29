import { NextRequest } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const { id } = await params
    const { read } = await req.json()
    const msg = await prisma.contactMessage.update({ where: { id }, data: { read } })
    return Response.json(msg)
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.contactMessage.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
