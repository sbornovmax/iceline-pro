'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BANNERS } from '@/lib/data'

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % BANNERS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrent(p => (p - 1 + BANNERS.length) % BANNERS.length)
  const next = () => setCurrent(p => (p + 1) % BANNERS.length)
  const b = BANNERS[current]

  return (
    <div className="relative overflow-hidden h-[420px] md:h-[520px]">
      {/* Slides */}
      {BANNERS.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-r ${banner.bg} ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />

          <div className="container-ice h-full flex items-center relative z-10">
            <div className="max-w-xl animate-slide-up">
              <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${banner.accent}`}>
                {banner.subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-none mb-4">
                {banner.title}
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
                {banner.description}
              </p>
              <div className="flex items-center gap-4">
                <Link href={banner.href} className="btn-red">
                  {banner.cta} →
                </Link>
                <Link href="/catalog" className="text-white text-sm font-medium hover:text-ice-red transition-colors border-b border-white/30 pb-0.5">
                  Весь каталог
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative number */}
          <div className="absolute right-8 bottom-8 text-[200px] font-black text-white/5 leading-none select-none">
            {String(i + 1).padStart(2, '0')}
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-ice-red text-white flex items-center justify-center transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-ice-red text-white flex items-center justify-center transition-colors">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1 transition-all ${i === current ? 'w-8 bg-ice-red' : 'w-4 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
