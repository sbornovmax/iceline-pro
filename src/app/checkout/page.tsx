'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Check, CreditCard, Truck, Package } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const STEPS = ['Данные', 'Доставка', 'Оплата']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', address: '', delivery: '', payment: '' })
  const u = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(i => ({ name: i.name, size: i.size, qty: i.qty, price: i.price })),
          total,
          address: `${form.city}, ${form.address}`,
        }),
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
    router.push('/checkout/success')
  }

  return (
    <div className="container-ice py-6 max-w-2xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/cart" className="hover:text-ice-red">Корзина</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Оформление</span>
      </nav>

      <h1 className="section-title mb-8">Оформление заказа</h1>

      {/* Steps indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-ice-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-ice-black' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-green-500' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      {/* Cart summary (show on all steps) */}
      {items.length > 0 && (
        <div className="border border-gray-100 p-4 mb-6 bg-gray-50">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ваш заказ</p>
          <div className="space-y-1.5">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1">{item.name} {item.size && <span className="text-gray-400">({item.size})</span>} × {item.qty}</span>
                <span className="font-bold ml-3 flex-shrink-0">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-2 flex justify-between font-black">
            <span>Итого</span><span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      )}

      <div className="border border-gray-100 p-6">
        {step === 0 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-2">Личные данные</p>
            {[{l:'ФИО *',k:'name',t:'text',p:'Иванов Иван Иванович'},{l:'Телефон *',k:'phone',t:'tel',p:'+7 (900) 000-00-00'},{l:'Email *',k:'email',t:'email',p:'ivan@example.com'}].map(({l,k,t,p}) => (
              <div key={k}>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">{l}</label>
                <input type={t} value={(form as any)[k]} onChange={e => u(k, e.target.value)} className="input-field" placeholder={p} />
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-2">Способ доставки</p>
            {[
              { id: 'cdek', icon: Truck, label: 'СДЭК', desc: '2–5 дней', price: 'от 250 ₽ / бесплатно от 5 000 ₽' },
              { id: 'post', icon: Package, label: 'Почта России', desc: '5–14 дней', price: 'от 200 ₽' },
              { id: 'pickup', icon: Check, label: 'Самовывоз', desc: 'Готовность 1–2 дня', price: 'Бесплатно' },
            ].map(({ id, icon: Icon, label, desc, price }) => (
              <label key={id} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${form.delivery === id ? 'border-ice-red' : 'border-gray-100 hover:border-gray-200'}`}>
                <input type="radio" name="delivery" value={id} checked={form.delivery === id} onChange={() => u('delivery', id)} className="accent-ice-red" />
                <Icon size={20} className="text-ice-red flex-shrink-0" />
                <div className="flex-1"><p className="font-bold text-sm">{label}</p><p className="text-xs text-gray-400">{desc}</p></div>
                <span className="text-xs font-bold text-ice-red">{price}</span>
              </label>
            ))}
            {form.delivery && form.delivery !== 'pickup' && (
              <div className="space-y-3 mt-2">
                {[{l:'Город',k:'city',p:'Москва'},{l:'Адрес',k:'address',p:'ул. Примерная, д. 1, кв. 1'}].map(({l,k,p}) => (
                  <div key={k}>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">{l}</label>
                    <input value={(form as any)[k]} onChange={e => u(k, e.target.value)} className="input-field" placeholder={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-2">Способ оплаты</p>
            {[
              { id: 'card', label: 'Банковская карта', desc: 'Visa, Mastercard, МИР', extra: 'Безопасно через ЮKassa' },
              { id: 'sbp', label: 'СБП', desc: 'Система быстрых платежей', extra: 'Мгновенно' },
              { id: 'tinkoff', label: 'Тинькофф', desc: 'Tinkoff Pay', extra: 'Кешбэк баллами' },
              { id: 'cash', label: 'Наличными', desc: 'При самовывозе', extra: null },
            ].map(({ id, label, desc, extra }) => (
              <label key={id} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${form.payment === id ? 'border-ice-red' : 'border-gray-100 hover:border-gray-200'}`}>
                <input type="radio" name="payment" value={id} checked={form.payment === id} onChange={() => u('payment', id)} className="accent-ice-red" />
                <CreditCard size={20} className="text-ice-red flex-shrink-0" />
                <div><p className="font-bold text-sm">{label}</p><p className="text-xs text-gray-400">{desc}</p>{extra && <p className="text-xs text-green-600">{extra}</p>}</div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} className="btn-outline">← Назад</button>
        ) : <div />}
        <button
          onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : handleConfirm()}
          disabled={loading}
          className={`btn-red px-8 flex items-center gap-2 ${loading ? 'opacity-70' : ''}`}>
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : step < STEPS.length - 1 ? 'Далее →' : '✓ Подтвердить заказ'}
        </button>
      </div>
    </div>
  )
}
