'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, BarChart2, ShoppingCart, Star, Check } from 'lucide-react'
import type { Product } from '@/lib/data'
import { useCart } from '@/context/CartContext'
import { useFav } from '@/context/FavContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle, isFav } = useFav()
  const [added, setAdded] = useState(false)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null
  const fav = isFav(product.id)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white border border-gray-100 hover:border-ice-red hover:shadow-lg transition-all duration-300 relative flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.badge === 'new' && <span className="badge-new">Новинка</span>}
        {product.badge === 'sale' && discount && <span className="badge-sale">-{discount}%</span>}
        {product.badge === 'hit' && <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase">Хит</span>}
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => toggle(product)}
          className={`w-8 h-8 flex items-center justify-center border transition-colors ${fav ? 'bg-ice-red border-ice-red text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-ice-red hover:text-ice-red'}`}>
          <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <Link href="/compare" className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:border-ice-red hover:text-ice-red transition-colors">
          <BarChart2 size={14} />
        </Link>
      </div>

      <Link href={`/product/${product.slug}`} className="block overflow-hidden bg-ice-gray aspect-square">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ice-red mb-1">{product.brand}</p>
        <Link href={`/product/${product.slug}`}
          className="text-sm font-semibold text-ice-black hover:text-ice-red transition-colors leading-snug line-clamp-2 mb-2 flex-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current'} />)}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="price">{product.price.toLocaleString('ru-RU')} ₽</div>
            {product.oldPrice && <div className="price-old">{product.oldPrice.toLocaleString('ru-RU')} ₽</div>}
          </div>
          <button onClick={handleAdd}
            className={`w-9 h-9 flex items-center justify-center transition-all ${added ? 'bg-green-500 text-white scale-110' : 'bg-ice-black text-white hover:bg-ice-red'}`}>
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
