'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Package, Phone, Mail, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const [orderId] = useState(() => `ICE-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`)
  const [confetti, setConfetti] = useState<Array<{ x: number; color: string; delay: number }>>([])

  useEffect(() => {
    clearCart()
    // Generate confetti
    const items = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      color: ['#D10000', '#0C0C0C', '#FFD700', '#FFFFFF'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2,
    }))
    setConfetti(items)
  }, [])

  return (
    <div className="container-ice py-16 text-center max-w-lg mx-auto relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c, i) => (
          <div key={i} className="absolute w-2 h-2 animate-bounce opacity-70"
            style={{ left: `${c.x}%`, top: `-20px`, backgroundColor: c.color, animationDelay: `${c.delay}s`, animationDuration: '1.5s' }} />
        ))}
      </div>

      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
        <Check size={48} className="text-green-600" />
        <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-30" />
      </div>

      <h1 className="text-3xl font-black mb-2">Заказ оформлен!</h1>
      <p className="text-gray-500 mb-1">Спасибо за покупку в ICELINE PRO 🏒</p>

      {/* Order number */}
      <div className="bg-ice-gray border border-gray-200 px-6 py-4 my-6 inline-block">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Номер заказа</p>
        <p className="text-2xl font-black text-ice-red">#{orderId}</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: Check, title: 'Заказ принят', desc: 'Уже в системе', done: true },
          { icon: Package, title: 'Сборка', desc: '1–2 рабочих дня', done: false },
          { icon: Package, title: 'Доставка', desc: 'СДЭК / Почта', done: false },
        ].map(({ icon: Icon, title, desc, done }) => (
          <div key={title} className={`p-3 border text-center ${done ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
            <Icon size={20} className={`mx-auto mb-1 ${done ? 'text-green-600' : 'text-gray-300'}`} />
            <p className="text-xs font-bold">{title}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      {/* Contact info */}
      <div className="border border-gray-100 p-5 mb-8 text-left space-y-3">
        <p className="font-bold text-sm uppercase tracking-wider mb-3">Что дальше?</p>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail size={16} className="text-ice-red flex-shrink-0" />
          Подтверждение заказа отправлено на email
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={16} className="text-ice-red flex-shrink-0" />
          Менеджер свяжется в течение 30 минут
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Package size={16} className="text-ice-red flex-shrink-0" />
          Трек-номер придёт после отправки
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href="/account" className="btn-red flex items-center gap-2">
          Мои заказы <ArrowRight size={16} />
        </Link>
        <Link href="/catalog" className="btn-outline">
          Продолжить покупки
        </Link>
      </div>
    </div>
  )
}
