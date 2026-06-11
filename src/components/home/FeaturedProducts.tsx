import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'
import Link from 'next/link'

interface Props {
  title: string
  badge?: 'new' | 'sale' | 'hit'
  viewAllHref: string
  viewAllLabel?: string
}

export default function FeaturedProducts({ title, badge, viewAllHref, viewAllLabel = 'Все товары' }: Props) {
  const products = badge
    ? PRODUCTS.filter(p => p.badge === badge).slice(0, 4)
    : PRODUCTS.slice(0, 4)

  return (
    <section className="py-10">
      <div className="container-ice">
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-ice-red" />
            <h2 className="section-title">{title}</h2>
          </div>
          <Link href={viewAllHref} className="text-sm font-bold text-ice-red hover:text-ice-black transition-colors uppercase tracking-wider border-b-2 border-ice-red pb-0.5">
            {viewAllLabel} →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
