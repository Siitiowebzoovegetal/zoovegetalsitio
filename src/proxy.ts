import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'zoovegetal-fallback-secret-key-change-in-prod'
)

const ADMIN_PATHS = ['/admin']
const PUBLIC_ADMIN = ['/admin/login']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
  const isPublicAdmin = PUBLIC_ADMIN.some((p) => pathname === p)

  if (!isAdminPath || isPublicAdmin) return NextResponse.next()

  const token = req.cookies.get('admin-token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/admin/login', req.url))
    res.cookies.delete('admin-token')
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
