'use client'
import Link from 'next/link'
import { ChevronRight, X, Plus, Star, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { PRODUCTS } from '@/lib/data'
import { useCart } from '@/context/CartContext'

export default function ComparePage() {
  const { addItem } = useCart()
  const [compared, setCompared] = useState(PRODUCTS.slice(0, 3))
  const remove = (id: string) => setCompared(p => p.filter(x => x.id !== id))

  if (compared.length === 0) return (
    <div className="container-ice py-20 text-center">
      <p className="text-5xl mb-4">📊</p>
      <h2 className="text-2xl font-black mb-2">Нет товаров для сравнения</h2>
      <p className="text-gray-400 mb-6">Нажмите на иконку сравнения на карточке товара</p>
      <Link href="/catalog" className="btn-red">В каталог</Link>
    </div>
  )

  const SPECS = [
    { label: 'Бренд', key: 'brand' },
    { label: 'Возраст', key: 'age' },
    { label: 'В наличии', key: 'inStock' },
    { label: 'Рейтинг', key: 'rating' },
    { label: 'Отзывов', key: 'reviewCount' },
  ]

  return (
    <div className="container-ice py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Сравнение товаров</span>
      </nav>

      <h1 className="section-title mb-6">Сравнение <span className="text-gray-400 font-normal text-xl">({compared.length})</span></h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <td className="w-40 p-3 bg-gray-50 border border-gray-100 text-xs font-bold uppercase text-gray-400">Товар</td>
              {compared.map(p => (
                <td key={p.id} className="p-3 border border-gray-100 align-top min-w-[200px]">
                  <div className="relative">
                    <button onClick={() => remove(p.id)} className="absolute -top-1 -right-1 w-6 h-6 bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors">
                      <X size={12} />
                    </button>
                    <Link href={`/product/${p.slug}`}>
                      <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-2" />
                    </Link>
                    <p className="text-[10px] text-ice-red font-bold">{p.brand}</p>
                    <Link href={`/product/${p.slug}`} className="text-xs font-semibold hover:text-ice-red line-clamp-2">{p.name}</Link>
                  </div>
                </td>
              ))}
              {compared.length < 4 && (
                <td className="p-3 border border-dashed border-gray-200 align-middle text-center min-w-[160px]">
                  <Link href="/catalog" className="flex flex-col items-center gap-2 text-gray-300 hover:text-ice-red transition-colors">
                    <Plus size={24} />
                    <span className="text-xs">Добавить товар</span>
                  </Link>
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Price row */}
            <tr className="bg-ice-black text-white">
              <td className="p-3 text-xs font-bold uppercase">Цена</td>
              {compared.map(p => (
                <td key={p.id} className="p-3 text-center">
                  <p className="text-xl font-black text-ice-red">{p.price.toLocaleString('ru-RU')} ₽</p>
                  {p.oldPrice && <p className="text-xs text-gray-400 line-through">{p.oldPrice.toLocaleString('ru-RU')} ₽</p>}
                </td>
              ))}
              {compared.length < 4 && <td />}
            </tr>

            {/* Specs */}
            {SPECS.map(({ label, key }, i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 text-xs font-bold text-gray-500 uppercase">{label}</td>
                {compared.map(p => {
                  const val = (p as any)[key]
                  return (
                    <td key={p.id} className="p-3 text-center text-sm font-semibold">
                      {key === 'inStock' ? (
                        <span className={val ? 'text-green-600' : 'text-red-400'}>{val ? '✓ Да' : '✗ Нет'}</span>
                      ) : key === 'rating' ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={12} className="text-amber-400 fill-current" />
                          <span>{val}</span>
                        </div>
                      ) : val ?? '—'}
                    </td>
                  )
                })}
                {compared.length < 4 && <td />}
              </tr>
            ))}

            {/* Add to cart row */}
            <tr className="bg-white">
              <td className="p-3" />
              {compared.map(p => (
                <td key={p.id} className="p-3 text-center">
                  <button onClick={() => addItem(p)} className="btn-red w-full text-xs py-2.5 flex items-center justify-center gap-1.5">
                    <ShoppingCart size={14} /> В корзину
                  </button>
                </td>
              ))}
              {compared.length < 4 && <td />}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
