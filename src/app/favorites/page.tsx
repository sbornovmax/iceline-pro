'use client'
import Link from 'next/link'
import { Heart, ChevronRight } from 'lucide-react'
import { useFav } from '@/context/FavContext'
import ProductCard from '@/components/catalog/ProductCard'

export default function FavoritesPage() {
  const { items, count } = useFav()

  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Избранное</span>
      </nav>

      <h1 className="section-title mb-6">
        Избранное {count > 0 && <span className="text-gray-400 font-normal text-xl">({count})</span>}
      </h1>

      {count === 0 ? (
        <div className="py-24 text-center">
          <Heart size={64} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-black mb-2">В избранном пусто</h2>
          <p className="text-gray-400 mb-8 text-sm">Нажмите ❤ на карточке товара чтобы добавить в избранное</p>
          <Link href="/catalog" className="btn-red">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
