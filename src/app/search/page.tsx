'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronRight, Search } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'
import { Suspense } from 'react'

function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''

  const results = useMemo(() => {
    if (!q || q.length < 2) return []
    const query = q.toLowerCase()
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }, [q])

  const catResults = useMemo(() => {
    if (!q || q.length < 2) return []
    const query = q.toLowerCase()
    return CATEGORIES.filter(c => c.name.toLowerCase().includes(query))
  }, [q])

  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Поиск</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <Search size={20} className="text-gray-400" />
        <h1 className="text-xl font-black">
          {q ? <>Результаты для: <span className="text-ice-red">«{q}»</span></> : 'Поиск по каталогу'}
        </h1>
      </div>

      {!q && (
        <div className="text-center py-16">
          <Search size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">Введите запрос в строку поиска</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {['Bauer', 'CCM', 'коньки', 'клюшки', 'шлем', 'перчатки'].map(tag => (
              <Link key={tag} href={`/search?q=${tag}`}
                className="px-3 py-1.5 bg-ice-gray text-sm font-medium hover:bg-ice-red hover:text-white transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {q && results.length === 0 && catResults.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-bold text-gray-500 mb-2">Ничего не найдено по запросу «{q}»</p>
          <p className="text-sm text-gray-400 mb-6">Попробуйте другой запрос или просмотрите каталог</p>
          <Link href="/catalog" className="btn-red">Весь каталог</Link>
        </div>
      )}

      {catResults.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Категории</p>
          <div className="flex flex-wrap gap-2">
            {catResults.map(cat => (
              <Link key={cat.id} href={`/catalog/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors text-sm font-medium">
                <span>{cat.icon}</span>{cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-4">Найдено товаров: <span className="font-bold text-ice-black">{results.length}</span></p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return <Suspense fallback={<div className="container-ice py-20 text-center text-gray-400">Поиск...</div>}><SearchResults /></Suspense>
}
