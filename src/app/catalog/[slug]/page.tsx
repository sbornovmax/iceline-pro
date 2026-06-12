'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'

const BRANDS = ['Bauer', 'CCM', 'Warrior', 'Sherwood', 'Fischer', 'Supreme', 'Mad Guy']
const AGES = [
  { value: 'SR', label: 'Взрослые (SR)' },
  { value: 'INT', label: 'Подростковые (INT)' },
  { value: 'JR', label: 'Юниорские (JR)' },
  { value: 'YTH', label: 'Детские (YTH)' },
]
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '6', '7', '8', '9', '10', '11']

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find(c =>
    c.slug === params.slug ||
    c.subcategories.some(s => s.slug === params.slug)
  )
  const parentCat = CATEGORIES.find(c => c.subcategories.some(s => s.slug === params.slug))
  const subcat = parentCat?.subcategories.find(s => s.slug === params.slug)

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(200000)
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileFilters, setMobileFilters] = useState(false)

  const toggle = (arr: string[], setArr: Function, val: string) =>
    setArr((p: string[]) => p.includes(val) ? p.filter(x => x !== val) : [...p, val])

  const filtered = useMemo(() => {
    let result = [...PRODUCTS]
    if (category) result = result.filter(p => p.category === category.slug)
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand))
    if (selectedAges.length) result = result.filter(p => p.age && selectedAges.includes(p.age))
    result = result.filter(p => p.price <= priceMax)
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price)
    return result
  }, [category, selectedBrands, selectedAges, priceMax, sort])

  const title = subcat?.name ?? category?.name ?? 'Каталог'
  const activeFilters = selectedBrands.length + selectedAges.length + selectedSizes.length

  const FiltersBlock = () => (
    <div className="space-y-0">
      {/* Brands */}
      <div className="border-b border-gray-100 py-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-3">Бренд</p>
        <div className="space-y-2">
          {BRANDS.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(b)}
                onChange={() => toggle(selectedBrands, setSelectedBrands, b)} className="w-4 h-4 accent-ice-red" />
              <span className="text-sm text-gray-600 group-hover:text-ice-red">{b}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Age */}
      <div className="border-b border-gray-100 py-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-3">Возраст</p>
        <div className="space-y-2">
          {AGES.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedAges.includes(value)}
                onChange={() => toggle(selectedAges, setSelectedAges, value)} className="w-4 h-4 accent-ice-red" />
              <span className="text-sm text-gray-600 group-hover:text-ice-red">{label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Sizes */}
      <div className="border-b border-gray-100 py-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-3">Размер</p>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map(s => (
            <button key={s} onClick={() => toggle(selectedSizes, setSelectedSizes, s)}
              className={`px-2.5 py-1.5 text-xs font-semibold border transition-all ${selectedSizes.includes(s) ? 'bg-ice-black text-white border-ice-black' : 'border-gray-200 text-gray-600 hover:border-ice-red'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      {/* Price */}
      <div className="py-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-3">Цена до: {priceMax.toLocaleString('ru-RU')} ₽</p>
        <input type="range" min={0} max={200000} step={1000} value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          className="w-full accent-ice-red" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0 ₽</span><span>200 000 ₽</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container-ice py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4 flex-wrap">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/catalog" className="hover:text-ice-red">Каталог</Link>
        {parentCat && <>
          <ChevronRight size={12} />
          <Link href={`/catalog/${parentCat.slug}`} className="hover:text-ice-red">{parentCat.name}</Link>
        </>}
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">{title}</span>
      </nav>

      {/* Subcategory pills */}
      {category && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {category.subcategories.map(sub => (
            <Link key={sub.slug} href={`/catalog/${sub.slug}`}
              className={`px-3 py-1.5 text-xs font-bold border transition-all ${params.slug === sub.slug ? 'bg-ice-black text-white border-ice-black' : 'border-gray-200 hover:border-ice-red hover:text-ice-red'}`}>
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="section-title">{title}</h1>
        <button onClick={() => setMobileFilters(true)} className="md:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 text-sm">
          <SlidersHorizontal size={14} /> Фильтры
          {activeFilters > 0 && <span className="bg-ice-red text-white text-[10px] px-1.5 py-0.5">{activeFilters}</span>}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0 sticky top-24 self-start">
          <div className="flex justify-between mb-2">
            <p className="text-xs text-gray-400 font-bold uppercase">Фильтры</p>
            {activeFilters > 0 && (
              <button onClick={() => { setSelectedBrands([]); setSelectedAges([]); setSelectedSizes([]) }}
                className="text-xs text-ice-red">Сбросить</button>
            )}
          </div>
          <FiltersBlock />
        </aside>

        {/* Mobile filters */}
        {mobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto p-5">
              <div className="flex justify-between mb-4">
                <p className="font-bold uppercase">Фильтры</p>
                <button onClick={() => setMobileFilters(false)}><X size={20} /></button>
              </div>
              <FiltersBlock />
              <button onClick={() => setMobileFilters(false)} className="btn-red w-full mt-4">
                Показать {filtered.length} товаров
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Active filter tags */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedBrands.map(b => (
                <button key={b} onClick={() => toggle(selectedBrands, setSelectedBrands, b)}
                  className="flex items-center gap-1 bg-ice-black text-white text-xs px-2.5 py-1.5 hover:bg-ice-red transition-colors">
                  {b} <X size={10} />
                </button>
              ))}
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Найдено: <span className="font-bold text-ice-black">{filtered.length}</span></p>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="border border-gray-200 text-sm px-3 py-2 outline-none focus:border-ice-red">
                <option value="popular">По популярности</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
              <div className="flex border border-gray-200">
                <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-ice-black text-white' : 'hover:bg-gray-50'}`}><Grid3X3 size={15} /></button>
                <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-ice-black text-white' : 'hover:bg-gray-50'}`}><List size={15} /></button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">🏒</p>
              <p className="font-bold text-gray-400 mb-2">Нет товаров по фильтрам</p>
              <button onClick={() => { setSelectedBrands([]); setSelectedAges([]); setSelectedSizes([]) }} className="btn-red mt-2">
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
