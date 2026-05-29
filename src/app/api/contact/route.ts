import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, company: company || null, subject, message },
    })

    return Response.json({ success: true, id: contact.id })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
