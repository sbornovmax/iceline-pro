import HeroBanner from '@/components/home/HeroBanner'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyUs from '@/components/home/WhyUs'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <CategoriesSection />

      {/* Hits */}
      <FeaturedProducts title="Хиты продаж" badge="hit" viewAllHref="/catalog?badge=hit" viewAllLabel="Все хиты" />

      {/* Promo banner */}
      <section className="py-0">
        <div className="container-ice">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/sale" className="group relative bg-ice-black overflow-hidden h-48 flex items-center px-8">
              <div className="absolute inset-0 bg-gradient-to-r from-ice-red-dark to-ice-red opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="relative z-10 text-white">
                <p className="text-xs uppercase tracking-widest mb-1 opacity-80">Только сейчас</p>
                <p className="text-3xl font-black uppercase leading-none">РАСПРОДАЖА<br/>ДО -40%</p>
                <p className="mt-3 text-sm border-b border-white/50 pb-0.5 inline-block">Смотреть все →</p>
              </div>
              <div className="absolute right-6 text-[120px] font-black text-white/10 leading-none">%</div>
            </Link>
            <Link href="/catalog/detskaya" className="group relative bg-gradient-to-br from-[#0a1628] to-[#1a2a4a] overflow-hidden h-48 flex items-center px-8">
              <div className="relative z-10 text-white">
                <p className="text-xs uppercase tracking-widest mb-1 text-blue-300">Для детей</p>
                <p className="text-3xl font-black uppercase leading-none">ДЕТСКАЯ<br/>ЛИНЕЙКА</p>
                <p className="mt-3 text-sm border-b border-white/50 pb-0.5 inline-block text-blue-200">Смотреть →</p>
              </div>
              <div className="absolute right-6 text-[100px] leading-none opacity-10">👦</div>
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <FeaturedProducts title="Новые поступления" badge="new" viewAllHref="/catalog?badge=new" viewAllLabel="Все новинки" />

      {/* Sale */}
      <FeaturedProducts title="Распродажа" badge="sale" viewAllHref="/sale" viewAllLabel="Вся распродажа" />

      {/* Why us */}
      <WhyUs />

      {/* Brands */}
      <section className="py-10 border-t border-gray-100">
        <div className="container-ice">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Официальные бренды</p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {['BAUER', 'CCM', 'WARRIOR', 'SHERWOOD', 'FISCHER', 'SUPREME'].map(brand => (
              <Link key={brand} href={`/catalog?brand=${brand.toLowerCase()}`}
                className="text-xl font-black text-gray-200 hover:text-ice-red transition-colors tracking-tight">
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
