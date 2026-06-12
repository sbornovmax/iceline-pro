'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, X, Trash2, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartIcon() {
  const { items, count, total, removeItem, updateQty } = useCart()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group relative"
      >
        <div className="relative">
          <ShoppingCart size={20} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-ice-red text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold animate-fade-in">
              {count}
            </span>
          )}
        </div>
        <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Корзина</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-2xl border border-gray-100 z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-sm uppercase tracking-wider">Корзина {count > 0 && `(${count})`}</p>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-ice-black"><X size={16} /></button>
          </div>

          {items.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingCart size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Корзина пуста</p>
              <Link href="/catalog" onClick={() => setOpen(false)} className="btn-red text-xs py-2 px-4 mt-3 inline-flex">
                В каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 p-3">
                    <div className="w-12 h-12 bg-ice-gray flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
                      {item.size && <p className="text-[10px] text-gray-400">Размер: {item.size}</p>}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex border border-gray-100">
                          <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="w-6 h-6 text-xs flex items-center justify-center hover:bg-gray-50">−</button>
                          <span className="w-6 h-6 text-xs flex items-center justify-center font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="w-6 h-6 text-xs flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                        <p className="text-xs font-black">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</p>
                        <button onClick={() => removeItem(item.id, item.size)} className="text-gray-300 hover:text-red-400 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 p-4 space-y-3">
                <div className="flex justify-between font-black">
                  <span>Итого</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/cart" onClick={() => setOpen(false)}
                    className="btn-outline text-xs py-2.5 text-center">
                    Корзина
                  </Link>
                  <Link href="/checkout" onClick={() => setOpen(false)}
                    className="btn-red text-xs py-2.5 flex items-center justify-center gap-1">
                    Оформить <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
