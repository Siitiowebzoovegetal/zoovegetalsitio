import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken, getAdminSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return Response.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    const token = await signToken({ id: admin.id, email: admin.email, name: admin.name })
    const cookieStore = await cookies()
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return Response.json({ success: true, name: admin.name, email: admin.email })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin-token')
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getAdminSession()
  if (!session) return Response.json({ authenticated: false }, { status: 401 })
  return Response.json({ authenticated: true, ...session })
}
