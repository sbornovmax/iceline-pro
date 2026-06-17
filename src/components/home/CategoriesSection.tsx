import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'
import CategoryIcon from '@/components/icons/CategoryIcon'

export default function CategoriesSection() {
  return (
    <section className="py-10 bg-ice-gray">
      <div className="container-ice">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-ice-red" />
          <h2 className="section-title">Каталог снаряжения</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/catalog/${cat.slug}`}
              className="group flex flex-col items-center gap-2 bg-white p-4 hover:bg-ice-black transition-all duration-300 border border-gray-100 hover:border-ice-red"
            >
              <CategoryIcon name={cat.icon} className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
              <span className="text-[11px] font-bold text-center text-gray-700 group-hover:text-white transition-colors uppercase leading-tight">
                {cat.name.replace('Хоккейные ', '').replace('Хоккейная ', '')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
