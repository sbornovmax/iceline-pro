import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { ADMIN_COOKIE, adminCookieOptions, createAdminSessionToken, ADMIN_SESSION_MAX_AGE } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD || ''
    if (!expected) {
      return NextResponse.json({ error: 'Панель временно недоступна' }, { status: 503 })
    }
    const a = Buffer.from(String(password || ''))
    const b = Buffer.from(expected)
    const valid = a.length === b.length && timingSafeEqual(a, b)
    if (!valid) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }
    const token = createAdminSessionToken('owner')
    if (!token) {
      return NextResponse.json({ error: 'Панель временно недоступна' }, { status: 503 })
    }
    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE, token, adminCookieOptions(ADMIN_SESSION_MAX_AGE))
    return res
  } catch {
    return NextResponse.json({ error: 'Ошибка входа' }, { status: 500 })
  }
}
