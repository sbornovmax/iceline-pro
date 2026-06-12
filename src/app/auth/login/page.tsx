'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Заполните все поля'); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Неверный email или пароль')
    } else {
      router.push('/account')
      router.refresh()
    }
  }

  const handleYandex = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'yandex' as any,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
            <span className="text-3xl font-black text-ice-black">ICELINE</span>
            <span className="text-3xl font-black text-ice-red">PRO</span>
          </Link>
          <h1 className="text-xl font-black uppercase">Вход в аккаунт</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">{error}</div>}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input-field" placeholder="ivan@example.com" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Пароль</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="input-field pr-10" placeholder="••••••••" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="/auth/forgot" className="text-xs text-ice-red hover:underline">Забыли пароль?</Link>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className={`btn-red w-full flex items-center justify-center gap-2 py-3.5 ${loading ? 'opacity-70' : ''}`}>
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={16} /> Войти</>}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">или</span><div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={handleYandex}
              className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              <span className="font-black text-red-500">Я</span> Яндекс ID
            </button>
            <button type="button"
              className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              <span className="font-black text-blue-600">VK</span> ID
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Нет аккаунта?{' '}
          <Link href="/auth/register" className="text-ice-red font-bold hover:underline">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  )
}
