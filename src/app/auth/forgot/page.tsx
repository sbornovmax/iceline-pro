'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Check } from 'lucide-react'

export default function ForgotPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
            <span className="text-3xl font-black text-ice-black">ICELINE</span>
            <span className="text-3xl font-black text-ice-red">PRO</span>
          </Link>
          <h1 className="text-xl font-black uppercase">Восстановление пароля</h1>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-green-600" />
            </div>
            <p className="font-bold mb-2">Письмо отправлено!</p>
            <p className="text-sm text-gray-400 mb-6">Проверьте {email}</p>
            <Link href="/auth/login" className="btn-red">Вернуться ко входу</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-500 text-center">Введите email — пришлём ссылку для сброса пароля</p>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field !pl-10" placeholder="ivan@example.com" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className={`btn-red w-full py-3.5 flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}>
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Отправить ссылку'}
            </button>
            <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-ice-black transition-colors mt-2">
              <ArrowLeft size={14} /> Вернуться ко входу
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
