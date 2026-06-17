'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Ошибка входа')
        setLoading(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Ошибка входа')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ice-black flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-sm p-8">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="text-xl font-black">АЙСЛАЙН</span>
          <span className="text-xl font-black text-ice-red">ПРО</span>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-ice-gray mx-auto mb-4">
          <Lock size={20} className="text-ice-red" />
        </div>
        <h1 className="text-center font-bold uppercase tracking-wider text-sm mb-6">Вход в панель управления</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Пароль"
          className="input-field mb-3"
          autoFocus
        />
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="btn-red w-full">
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
