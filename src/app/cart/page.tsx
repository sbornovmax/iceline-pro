'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ChevronRight, ShoppingCart, Tag, Truck } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const INITIAL_CART = [
  { ...PRODUCTS[0], qty: 1, size: '8.5' },
  { ...PRODUCTS[1], qty: 1, size: 'SR P28' },
]

export default function CartPage() {
  const [cart, setCart] = useState(INITIAL_CART)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { setCart(c => c.filter(i => i.id !== id)); return }
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i))
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? Math.round(total * 0.1) : 0
  const delivery = total >= 5000 ? 0 : 350

  if (cart.length === 0) return (
    <div className="container-ice py-20 text-center">
      <ShoppingCart size={64} className="text-gray-200 mx-auto mb-4" />
      <h2 className="text-2xl font-black mb-2">Корзина пуста</h2>
      <p className="text-gray-400 mb-6">Добавьте товары из каталога</p>
      <Link href="/catalog" className="btn-red">Перейти в каталог</Link>
    </div>
  )

  return (
    <div className="container-ice py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Корзина</span>
      </nav>

      <h1 className="section-title mb-6">Корзина <span className="text-gray-400 font-normal text-xl">({cart.length})</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 border border-gray-100 p-4 hover:border-gray-200 transition-colors">
              <Link href={`/product/${item.slug}`} className="w-20 h-20 flex-shrink-0 bg-ice-gray overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-ice-red font-bold uppercase">{item.brand}</p>
                <Link href={`/product/${item.slug}`} className="text-sm font-semibold line-clamp-2 hover:text-ice-red transition-colors">{item.name}</Link>
                <p className="text-xs text-gray-400 mt-0.5">Размер: {item.size}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex border border-gray-200">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-bold">−</button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-bold">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                    <button onClick={() => updateQty(item.id, 0)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="border border-gray-100 p-5 space-y-4">
            <p className="font-bold uppercase tracking-wider text-sm">Ваш заказ</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Товары ({cart.length})</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка (PROMO10)</span>
                  <span>−{discount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1"><Truck size={13} /> Доставка</span>
                <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between font-black text-lg">
              <span>Итого</span>
              <span>{(total - discount + delivery).toLocaleString('ru-RU')} ₽</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border border-gray-200 px-3 gap-2">
                <Tag size={14} className="text-gray-400" />
                <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())}
                  placeholder="Промокод" className="flex-1 text-sm py-2 outline-none" />
              </div>
              <button onClick={() => { if (promo === 'PROMO10') setPromoApplied(true) }}
                className="bg-ice-black text-white px-4 text-sm font-bold hover:bg-ice-graphite transition-colors">
                ОК
              </button>
            </div>
            {promoApplied && <p className="text-xs text-green-600">✓ Промокод применён: −10%</p>}

            <Link href="/checkout" className="btn-red w-full text-center block text-base py-4">
              Оформить заказ →
            </Link>

            {delivery > 0 && (
              <p className="text-xs text-gray-400 text-center">
                Бесплатная доставка от {(5000 - total).toLocaleString('ru-RU')} ₽
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
            <Shield size={12} />
            Безопасная оплата
          </div>
        </div>
      </div>
    </div>
  )
}
