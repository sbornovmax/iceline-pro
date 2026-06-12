'use client'
import Link from 'next/link'
import { ChevronRight, Package, Truck, Check, Clock, X, Phone, Copy } from 'lucide-react'
import { useState } from 'react'

const ORDER = {
  id: 'ICE-2026-0041',
  date: '10 июня 2026, 14:32',
  status: 'delivered',
  items: [
    { name: 'Коньки хоккейные Bauer Vapor X5 Pro SR', brand: 'Bauer', size: '8.5', qty: 1, price: 89990, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=80&h=80&fit=crop' },
  ],
  delivery: 'СДЭК — пункт выдачи',
  address: 'г. Москва, ул. Ленина, 15, ПВЗ СДЭК',
  payment: 'Банковская карта',
  track: 'CDEK1234567890',
  subtotal: 89990,
  deliveryCost: 0,
  total: 89990,
  timeline: [
    { label: 'Заказ оформлен', date: '10 июня, 14:32', done: true },
    { label: 'Оплачен', date: '10 июня, 14:35', done: true },
    { label: 'Передан в доставку', date: '11 июня, 10:00', done: true },
    { label: 'Доставлен', date: '13 июня, 15:20', done: true },
  ]
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Check }> = {
  new: { label: 'Новый', color: 'text-blue-600 bg-blue-50', icon: Clock },
  paid: { label: 'Оплачен', color: 'text-green-600 bg-green-50', icon: Check },
  assembly: { label: 'Сборка', color: 'text-amber-600 bg-amber-50', icon: Package },
  shipped: { label: 'В пути', color: 'text-purple-600 bg-purple-50', icon: Truck },
  delivered: { label: 'Доставлен', color: 'text-green-600 bg-green-50', icon: Check },
  cancelled: { label: 'Отменён', color: 'text-red-500 bg-red-50', icon: X },
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)
  const status = STATUS_MAP[ORDER.status]
  const StatusIcon = status.icon

  const copyTrack = () => {
    navigator.clipboard.writeText(ORDER.track)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container-ice py-8 max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/account" className="hover:text-ice-red">Личный кабинет</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Заказ #{params.id}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="section-title">Заказ #{ORDER.id}</h1>
          <p className="text-sm text-gray-400 mt-1">{ORDER.date}</p>
        </div>
        <span className={`text-sm font-bold px-4 py-2 flex items-center gap-2 ${status.color}`}>
          <StatusIcon size={14} /> {status.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Items */}
          <div className="border border-gray-100 p-5">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4">Товары</h2>
            <div className="space-y-4">
              {ORDER.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-16 bg-ice-gray flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-ice-red font-bold">{item.brand}</p>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-400">Размер: {item.size} · {item.qty} шт.</p>
                  </div>
                  <p className="font-black text-sm flex-shrink-0">{item.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="border border-gray-100 p-5">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4">История заказа</h2>
            <div className="space-y-3">
              {ORDER.timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                    <Check size={12} className={t.done ? 'text-white' : 'text-gray-300'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${t.done ? 'text-ice-black' : 'text-gray-400'}`}>{t.label}</p>
                  </div>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking */}
          {ORDER.track && (
            <div className="border border-gray-100 p-5">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-3">Отслеживание</h2>
              <div className="flex items-center gap-3 p-3 bg-ice-gray">
                <Truck size={16} className="text-ice-red" />
                <span className="text-sm font-mono font-bold flex-1">{ORDER.track}</span>
                <button onClick={copyTrack} className="text-xs text-ice-red hover:text-ice-black flex items-center gap-1">
                  <Copy size={12} /> {copied ? 'Скопировано!' : 'Копировать'}
                </button>
              </div>
              <a href={`https://www.cdek.ru/ru/tracking/?order_id=${ORDER.track}`} target="_blank" rel="noopener noreferrer"
                className="text-xs text-ice-red hover:underline mt-2 block">
                Отследить на сайте СДЭК →
              </a>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4">
          <div className="border border-gray-100 p-5">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-4">Детали</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Доставка</p>
                <p className="font-medium">{ORDER.delivery}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Адрес</p>
                <p className="font-medium text-xs leading-relaxed">{ORDER.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Оплата</p>
                <p className="font-medium">{ORDER.payment}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Товары</span>
                <span>{ORDER.subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Доставка</span>
                <span className={ORDER.deliveryCost === 0 ? 'text-green-600' : ''}>
                  {ORDER.deliveryCost === 0 ? 'Бесплатно' : `${ORDER.deliveryCost} ₽`}
                </span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t">
                <span>Итого</span>
                <span>{ORDER.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="btn-red w-full text-sm py-2.5">Повторить заказ</button>
            <a href="tel:+79001234567" className="btn-outline w-full text-sm py-2.5 flex items-center justify-center gap-2">
              <Phone size={14} /> Связаться с нами
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
