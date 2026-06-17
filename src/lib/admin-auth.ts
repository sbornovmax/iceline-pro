import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'iceline_admin_session'
const SESSION_DAYS = 14
export const ADMIN_SESSION_MAX_AGE = SESSION_DAYS * 86400

export type AdminRole = 'owner' | 'editor'
export type AdminPayload = { role: AdminRole; exp: number }

function getSecret(): string {
  const s = process.env.ADMIN_SECRET
  if (!s || s.length < 16) return ''
  return s
}

export function signAdminToken(payload: AdminPayload): string | null {
  const secret = getSecret()
  if (!secret) return null
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function verifyAdminToken(token: string | undefined): AdminPayload | null {
  if (!token) return null
  const secret = getSecret()
  if (!secret) return null
  const dot = token.lastIndexOf('.')
  if (dot < 0) return null
  const data = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = createHmac('sha256', secret).update(data).digest('base64url')
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString()) as AdminPayload
    if (!payload?.role || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function adminCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSec,
  }
}

export async function getAdminRole(): Promise<AdminRole | null> {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  const payload = verifyAdminToken(token)
  return payload?.role ?? null
}

export function createAdminSessionToken(role: AdminRole): string | null {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400
  return signAdminToken({ role, exp })
}
