import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata = { title: 'Распродажа до -40%' }

export default function SalePage() {
  const saleProducts = PRODUCTS.filter(p => p.badge === 'sale')
  return (
    <div className="container-ice py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Распродажа</span>
      </nav>

      <div className="bg-gradient-to-r from-ice-red-dark to-ice-red text-white p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Только до конца месяца</p>
        <h1 className="text-4xl md:text-6xl font-black">РАСПРОДАЖА<br/>ДО -40%</h1>
        <p className="mt-3 opacity-80">Bauer, CCM, Warrior — оригинальное снаряжение по сниженным ценам</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {saleProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
