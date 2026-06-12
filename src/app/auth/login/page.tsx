'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
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
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    // TODO: Supabase auth
    setError('Неверный email или пароль. (Демо — авторизация через Supabase будет добавлена)')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
            <span className="text-3xl font-black text-ice-black">ICELINE</span>
            <span className="text-3xl font-black text-ice-red">PRO</span>
          </Link>
          <h1 className="text-xl font-black uppercase">Вход в аккаунт</h1>
          <p className="text-sm text-gray-400 mt-1">Добро пожаловать!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input-field" placeholder="ivan@example.com" autoComplete="email" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Пароль</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="input-field pr-10" placeholder="••••••••" autoComplete="current-password" />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="/auth/forgot" className="text-xs text-ice-red hover:underline">Забыли пароль?</Link>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={`btn-red w-full flex items-center justify-center gap-2 py-3.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><LogIn size={16} /> Войти</>
            )}
          </button>

          {/* Social auth */}
          <div className="relative flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">или войти через</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              <span className="text-base">Я</span> Яндекс
            </button>
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              <span className="text-base">VK</span>
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
