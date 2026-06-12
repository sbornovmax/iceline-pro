'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, UserPlus, Check } from 'lucide-react'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agree, setAgree] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const u = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) { setError('Заполните обязательные поля'); return }
    if (form.password !== form.confirm) { setError('Пароли не совпадают'); return }
    if (form.password.length < 6) { setError('Пароль не менее 6 символов'); return }
    if (!agree) { setError('Необходимо согласие с условиями'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSuccess(true)
  }

  if (success) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-sm mx-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-black mb-2">Аккаунт создан!</h2>
        <p className="text-gray-400 mb-6 text-sm">Добро пожаловать в ICELINE PRO, {form.name}!</p>
        <Link href="/account" className="btn-red">Перейти в кабинет</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
            <span className="text-3xl font-black text-ice-black">ICELINE</span>
            <span className="text-3xl font-black text-ice-red">PRO</span>
          </Link>
          <h1 className="text-xl font-black uppercase">Регистрация</h1>
          <p className="text-sm text-gray-400 mt-1">Создайте аккаунт для быстрых заказов</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">{error}</div>}

          {[
            { label: 'Имя и фамилия *', key: 'name', type: 'text', placeholder: 'Александр Иванов' },
            { label: 'Email *', key: 'email', type: 'email', placeholder: 'ivan@example.com' },
            { label: 'Телефон', key: 'phone', type: 'tel', placeholder: '+7 (900) 000-00-00' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">{label}</label>
              <input type={type} value={(form as any)[key]} onChange={e => u(key, e.target.value)}
                className="input-field" placeholder={placeholder} />
            </div>
          ))}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Пароль *</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={form.password} onChange={e => u('password', e.target.value)}
                className="input-field pr-10" placeholder="Минимум 6 символов" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Подтвердите пароль *</label>
            <input type="password" value={form.confirm} onChange={e => u('confirm', e.target.value)}
              className={`input-field ${form.confirm && form.confirm !== form.password ? 'border-red-300' : ''}`}
              placeholder="Повторите пароль" />
          </div>

          <label className="flex items-start gap-2 cursor-pointer mt-2">
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 w-4 h-4 accent-ice-red" />
            <span className="text-xs text-gray-500">
              Я соглашаюсь с <Link href="/legal/offer" className="text-ice-red hover:underline">публичной офертой</Link> и{' '}
              <Link href="/legal/privacy" className="text-ice-red hover:underline">политикой конфиденциальности</Link>
            </span>
          </label>

          <button type="submit" disabled={loading}
            className={`btn-red w-full flex items-center justify-center gap-2 py-3.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={16} /> Создать аккаунт</>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Уже есть аккаунт?{' '}
          <Link href="/auth/login" className="text-ice-red font-bold hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  )
}
