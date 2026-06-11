'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Check, CreditCard, Truck, Package } from 'lucide-react'

const STEPS = ['Данные', 'Доставка', 'Оплата']

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', address: '', delivery: '', payment: '' })
  const [done, setDone] = useState(false)

  function u(f: string, v: string) { setForm(p => ({ ...p, [f]: v })) }

  if (done) return (
    <div className="container-ice py-20 text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h1 className="text-3xl font-black mb-3">Заказ оформлен!</h1>
      <p className="text-gray-500 mb-2">Номер заказа: <strong>#ICE-2026-0042</strong></p>
      <p className="text-gray-500 mb-8">Мы отправили подтверждение на {form.email}</p>
      <Link href="/" className="btn-red">На главную</Link>
    </div>
  )

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

      {/* Steps */}
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

      <div className="border border-gray-100 p-6">
        {/* Step 1: Personal data */}
        {step === 0 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-4">Личные данные</p>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">ФИО *</label>
              <input value={form.name} onChange={e => u('name', e.target.value)} className="input-field" placeholder="Иванов Иван Иванович" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Телефон *</label>
              <input value={form.phone} onChange={e => u('phone', e.target.value)} className="input-field" placeholder="+7 (900) 000-00-00" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Email *</label>
              <input value={form.email} onChange={e => u('email', e.target.value)} className="input-field" placeholder="ivan@example.com" type="email" />
            </div>
          </div>
        )}

        {/* Step 2: Delivery */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-4">Способ доставки</p>
            {[
              { id: 'cdek', icon: Truck, label: 'СДЭК', desc: 'Доставка 2–5 дней', price: '350 ₽ / Бесплатно от 5 000 ₽' },
              { id: 'post', icon: Package, label: 'Почта России', desc: 'Доставка 5–14 дней', price: '250 ₽' },
              { id: 'pickup', icon: Check, label: 'Самовывоз', desc: 'Бесплатно, по готовности', price: 'Бесплатно' },
            ].map(({ id, icon: Icon, label, desc, price }) => (
              <label key={id} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${form.delivery === id ? 'border-ice-red' : 'border-gray-100 hover:border-gray-200'}`}>
                <input type="radio" name="delivery" value={id} checked={form.delivery === id} onChange={() => u('delivery', id)} className="accent-ice-red" />
                <Icon size={20} className="text-ice-red flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <span className="text-sm font-bold text-ice-red">{price}</span>
              </label>
            ))}
            {form.delivery !== 'pickup' && (
              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Город</label>
                  <input value={form.city} onChange={e => u('city', e.target.value)} className="input-field" placeholder="Москва" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Адрес</label>
                  <input value={form.address} onChange={e => u('address', e.target.value)} className="input-field" placeholder="ул. Примерная, д. 1, кв. 1" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm mb-4">Способ оплаты</p>
            {[
              { id: 'card', label: 'Банковская карта', desc: 'Visa, Mastercard, МИР', extra: 'Безопасная оплата через ЮKassa' },
              { id: 'sbp', label: 'СБП', desc: 'Система быстрых платежей', extra: 'Мгновенная оплата' },
              { id: 'tinkoff', label: 'Тинькофф', desc: 'Оплата через Тинькофф', extra: null },
              { id: 'cash', label: 'Наличными', desc: 'При самовывозе', extra: null },
            ].map(({ id, label, desc, extra }) => (
              <label key={id} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${form.payment === id ? 'border-ice-red' : 'border-gray-100 hover:border-gray-200'}`}>
                <input type="radio" name="payment" value={id} checked={form.payment === id} onChange={() => u('payment', id)} className="accent-ice-red" />
                <CreditCard size={20} className="text-ice-red flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                  {extra && <p className="text-xs text-green-600 mt-0.5">{extra}</p>}
                </div>
              </label>
            ))}

            {/* Order summary */}
            <div className="border-t pt-4 mt-4">
              <div className="space-y-1 text-sm mb-3">
                <div className="flex justify-between"><span className="text-gray-500">Товары</span><span>124 980 ₽</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Доставка</span><span className="text-green-600">Бесплатно</span></div>
              </div>
              <div className="flex justify-between font-black text-xl">
                <span>Итого</span><span>124 980 ₽</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : null}
          className={`btn-outline ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
          ← Назад
        </button>
        <button
          onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : setDone(true)}
          className="btn-red px-8">
          {step < STEPS.length - 1 ? 'Далее →' : '✓ Подтвердить заказ'}
        </button>
      </div>
    </div>
  )
}
