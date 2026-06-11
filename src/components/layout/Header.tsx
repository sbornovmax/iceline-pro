'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, BarChart2, ShoppingCart, Phone, Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(CATEGORIES[0])
  const [search, setSearch] = useState('')

  return (
    <>
      {/* Top bar */}
      <div className="bg-ice-black text-white text-xs py-2">
        <div className="container-ice flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-ice-gray-mid">Бесплатная доставка от 5 000 ₽</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/icelinepro" className="flex items-center gap-1 hover:text-ice-red transition-colors">
              <MessageCircle size={12} /> Telegram
            </a>
            <a href="tel:+79001234567" className="flex items-center gap-1 font-medium hover:text-ice-red transition-colors">
              <Phone size={12} /> +7 (900) 123-45-67
            </a>
            <button className="bg-ice-red text-white px-3 py-1 text-[11px] font-bold uppercase hover:bg-ice-red-dark transition-colors">
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container-ice">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tighter text-ice-black">ICELINE</span>
                <span className="text-2xl font-black tracking-tighter text-ice-red">PRO</span>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative flex">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск по товарам, брендам..."
                  className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-ice-red transition-colors pr-12"
                />
                <button className="absolute right-0 top-0 h-full bg-ice-red text-white px-4 flex items-center justify-center hover:bg-ice-red-dark transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link href="/account" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group">
                <User size={20} />
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Кабинет</span>
              </Link>
              <Link href="/favorites" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group">
                <Heart size={20} />
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Избранное</span>
              </Link>
              <Link href="/compare" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group">
                <BarChart2 size={20} />
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Сравнение</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group relative">
                <div className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-ice-red text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold">0</span>
                </div>
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Корзина</span>
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <div className="bg-ice-black hidden md:block">
          <div className="container-ice">
            <nav className="flex items-center h-11">
              {/* Catalog button */}
              <button
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                className="flex items-center gap-2 bg-ice-red text-white px-5 h-full font-bold text-sm uppercase tracking-wider hover:bg-ice-red-dark transition-colors"
              >
                <Menu size={16} />
                Каталог
                <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Nav links */}
              {[
                { label: 'Главная', href: '/' },
                { label: 'Доставка', href: '/delivery' },
                { label: 'Оплата', href: '/payment' },
                { label: 'Блог', href: '/blog' },
                { label: 'Контакты', href: '/contacts' },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="px-4 h-full flex items-center text-sm text-gray-300 hover:text-white hover:bg-ice-graphite transition-colors">
                  {label}
                </Link>
              ))}

              <div className="ml-auto flex items-center gap-3 text-sm">
                <Link href="/sale" className="text-ice-red font-bold hover:text-white transition-colors animate-pulse">🔥 Распродажа</Link>
              </div>
            </nav>
          </div>

          {/* Mega menu */}
          {megaOpen && (
            <div
              className="absolute left-0 right-0 bg-white shadow-2xl border-t-2 border-ice-red z-50"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="container-ice py-6">
                <div className="flex gap-0">
                  {/* Categories list */}
                  <div className="w-64 border-r border-gray-100 pr-4">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCat(cat)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left transition-colors ${activeCat.id === cat.id ? 'bg-ice-red text-white font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <ChevronDown size={12} className="ml-auto rotate-[-90deg]" />
                      </button>
                    ))}
                  </div>

                  {/* Subcategories */}
                  <div className="flex-1 pl-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{activeCat.name}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {activeCat.subcategories.map(sub => (
                        <Link
                          key={sub.slug}
                          href={`/catalog/${sub.slug}`}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-ice-gray hover:text-ice-red font-medium transition-colors border border-transparent hover:border-gray-100"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Promo block */}
                  <div className="w-56 ml-8 bg-gradient-to-br from-ice-black to-ice-graphite text-white p-5 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ice-red mb-2">Специальное предложение</p>
                      <p className="text-lg font-black leading-tight">BAUER VAPOR<br/>X5 PRO</p>
                      <p className="text-2xl font-black text-ice-red mt-2">-20%</p>
                    </div>
                    <Link href="/catalog/konki" className="btn-red text-xs py-2 mt-4 text-center block">Смотреть →</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <div className="p-4 space-y-1">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} href={`/catalog/${cat.slug}`} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-ice-gray hover:text-ice-red transition-colors">
                  <span>{cat.icon}</span>{cat.name}
                </Link>
              ))}
              <hr className="my-3" />
              {[{l:'Доставка',h:'/delivery'},{l:'Оплата',h:'/payment'},{l:'Блог',h:'/blog'},{l:'Контакты',h:'/contacts'}].map(({l,h}) => (
                <Link key={h} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-ice-red">{l}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
