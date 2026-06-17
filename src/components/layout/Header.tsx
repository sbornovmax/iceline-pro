'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, BarChart2, Phone, Menu, X, ChevronDown, Send } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'
import CartIcon from '@/components/ui/CartIcon'
import CategoryIcon from '@/components/icons/CategoryIcon'
import { useFav } from '@/context/FavContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const { count: favCount } = useFav()
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(CATEGORIES[0])
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim().length > 1) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <>
      <div className="bg-ice-black text-white text-xs py-2">
        <div className="container-ice flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="https://vk.ru/club236946159" target="_blank" rel="noopener noreferrer"
              className="hover:text-ice-red transition-colors font-bold text-[13px]" aria-label="VK">
              VK
            </a>
            <a href="https://t.me/iceline_pro" target="_blank" rel="noopener noreferrer"
              className="hover:text-ice-red transition-colors" aria-label="Telegram">
              <Send size={13} />
            </a>
            <a href="https://instagram.com/icelinepro.shop" target="_blank" rel="noopener noreferrer"
              className="hover:text-ice-red transition-colors font-bold text-[13px]" aria-label="Instagram">
              IG
            </a>
            <span className="text-gray-500 cursor-default select-none" title="Скоро">Max</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="tel:+79934703548" className="flex items-center gap-1 font-medium hover:text-ice-red transition-colors">
              <Phone size={12} /> +7 993 470 3548
            </a>
            <button className="bg-ice-red text-white px-3 py-1 text-[11px] font-bold uppercase hover:bg-ice-red-dark transition-colors">
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container-ice">
          <div className="flex items-center gap-4 h-16">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-0.5">
                <span className="text-2xl font-black tracking-tighter text-ice-black">АЙСЛАЙН</span>
                <span className="text-2xl font-black tracking-tighter text-ice-red">ПРО</span>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 md:mx-4">
              <div className="relative flex">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск: коньки Bauer, клюшки CCM..."
                  className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-ice-red transition-colors pr-12" />
                <button type="submit" className="absolute right-0 top-0 h-full bg-ice-red text-white px-4 flex items-center justify-center hover:bg-ice-red-dark transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-0.5 flex-shrink-0 ml-auto">
              <Link href="/auth/login" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group">
                <User size={20} />
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Кабинет</span>
              </Link>
              <Link href="/favorites" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group relative">
                <div className="relative">
                  <Heart size={20} />
                  {favCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-ice-red text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                      {favCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Избранное</span>
              </Link>
              <Link href="/compare" className="flex flex-col items-center gap-0.5 p-2 hover:text-ice-red transition-colors group">
                <BarChart2 size={20} />
                <span className="text-[10px] hidden md:block text-gray-500 group-hover:text-ice-red">Сравнение</span>
              </Link>
              <CartIcon />
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 ml-1">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-ice-black hidden md:block">
          <div className="container-ice">
            <nav className="flex items-center h-11">
              <button onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}
                className="flex items-center gap-2 bg-ice-red text-white px-5 h-full font-bold text-sm uppercase tracking-wider hover:bg-ice-red-dark transition-colors">
                <Menu size={16} /> Каталог <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              {[{l:'Главная',h:'/'},{l:'О компании',h:'/about'},{l:'Доставка',h:'/delivery'},{l:'Оплата',h:'/payment'},{l:'Блог',h:'/blog'},{l:'Контакты',h:'/contacts'}].map(({l,h}) => (
                <Link key={h} href={h} className="px-4 h-full flex items-center text-sm text-gray-300 hover:text-white hover:bg-ice-graphite transition-colors">{l}</Link>
              ))}
              <div className="ml-auto pr-2">
                <Link href="/sale" className="text-ice-red font-bold hover:text-white text-sm">🔥 Распродажа</Link>
              </div>
            </nav>
          </div>

          {megaOpen && (
            <div className="absolute left-0 right-0 bg-white shadow-2xl border-t-2 border-ice-red z-50"
              onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <div className="container-ice py-6">
                <div className="flex gap-0">
                  <div className="w-64 border-r border-gray-100 pr-4">
                    {CATEGORIES.map(cat => (
                      <Link key={cat.id} href={`/catalog/${cat.slug}`} onMouseEnter={() => setActiveCat(cat)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left transition-colors ${activeCat.id === cat.id ? 'bg-ice-red text-white font-bold' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <CategoryIcon name={cat.icon} className="w-4 h-4 flex-shrink-0" /><span>{cat.name}</span>
                        <ChevronDown size={12} className="ml-auto -rotate-90" />
                      </Link>
                    ))}
                  </div>
                  <div className="flex-1 pl-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{activeCat.name}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {activeCat.subcategories.map(sub => (
                        <Link key={sub.slug} href={`/catalog/${sub.slug}`}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-ice-gray hover:text-ice-red font-medium transition-colors border border-transparent hover:border-gray-100">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="w-56 ml-8 bg-gradient-to-br from-ice-black to-ice-graphite text-white p-5 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ice-red mb-2">Акция</p>
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

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <div className="p-4 space-y-1">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} href={`/catalog/${cat.slug}`} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-ice-gray hover:text-ice-red transition-colors">
                  <CategoryIcon name={cat.icon} className="w-4 h-4 flex-shrink-0" />{cat.name}
                </Link>
              ))}
              <hr className="my-3" />
              {[{l:'О компании',h:'/about'},{l:'Доставка',h:'/delivery'},{l:'Оплата',h:'/payment'},{l:'Блог',h:'/blog'},{l:'Контакты',h:'/contacts'},{l:'Войти',h:'/auth/login'}].map(({l,h}) => (
                <Link key={h} href={h} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-ice-red">{l}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
