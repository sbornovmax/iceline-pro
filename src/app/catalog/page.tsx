'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'

const BRANDS = ['Bauer', 'CCM', 'Warrior', 'Sherwood', 'Fischer', 'Supreme', 'Mad Guy']
const AGES = [
  { value: 'SR', label: 'Взрослые (SR)' },
  { value: 'INT', label: 'Подростковые (INT)' },
  { value: 'JR', label: 'Юниорские (JR)' },
  { value: 'YTH', label: 'Детские (YTH)' },
]
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12']

function FilterSection({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider text-ice-black mb-3">
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

export default function CatalogPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(200000)
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileFilters, setMobileFilters] = useState(false)

  const toggleBrand = (b: string) => setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b])
  const toggleAge = (a: string) => setSelectedAges(p => p.includes(a) ? p.filter(x => x !== a) : [...p, a])
  const toggleSize = (s: string) => setSelectedSizes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  const filtered = useMemo(() => {
    let result = [...PRODUCTS]
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand))
    if (selectedAges.length) result = result.filter(p => p.age && selectedAges.includes(p.age))
    result = result.filter(p => p.price >= priceMin && p.price <= priceMax)
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sort === 'new') result = result.filter(p => p.badge === 'new').concat(result.filter(p => p.badge !== 'new'))
    return result
  }, [selectedBrands, selectedAges, priceMin, priceMax, sort])

  const activeFilters = selectedBrands.length + selectedAges.length + selectedSizes.length

  const FiltersContent = () => (
    <div>
      <FilterSection title="Бренд">
        <div className="space-y-2">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 accent-ice-red" />
              <span className="text-sm text-gray-600 group-hover:text-ice-red transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Возраст">
        <div className="space-y-2">
          {AGES.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedAges.includes(value)}
                onChange={() => toggleAge(value)}
                className="w-4 h-4 accent-ice-red" />
              <span className="text-sm text-gray-600 group-hover:text-ice-red transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Размер">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map(size => (
            <button key={size} onClick={() => toggleSize(size)}
              className={`px-2.5 py-1.5 text-xs font-semibold border transition-all ${selectedSizes.includes(size) ? 'bg-ice-black text-white border-ice-black' : 'border-gray-200 text-gray-600 hover:border-ice-red hover:text-ice-red'}`}>
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Цена, ₽">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 uppercase">от</label>
              <input type="number" value={priceMin} onChange={e => setPriceMin(Number(e.target.value))}
                className="w-full border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-ice-red" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 uppercase">до</label>
              <input type="number" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
                className="w-full border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-ice-red" />
            </div>
          </div>
          <input type="range" min={0} max={200000} value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            className="w-full accent-ice-red" />
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div className="container-ice py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <span>/</span>
        <span className="text-ice-black font-medium">Каталог</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title">Каталог снаряжения</h1>
        <button onClick={() => setMobileFilters(true)}
          className="md:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 text-sm font-medium">
          <SlidersHorizontal size={16} />
          Фильтры {activeFilters > 0 && <span className="bg-ice-red text-white text-[10px] px-1.5 py-0.5">{activeFilters}</span>}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Фильтры</p>
              {activeFilters > 0 && (
                <button onClick={() => { setSelectedBrands([]); setSelectedAges([]); setSelectedSizes([]); setPriceMin(0); setPriceMax(200000) }}
                  className="text-xs text-ice-red hover:text-ice-black transition-colors">
                  Сбросить ({activeFilters})
                </button>
              )}
            </div>
            <FiltersContent />
          </div>
        </aside>

        {/* Mobile filters overlay */}
        {mobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold uppercase tracking-wider">Фильтры</p>
                <button onClick={() => setMobileFilters(false)}><X size={20} /></button>
              </div>
              <FiltersContent />
              <button onClick={() => setMobileFilters(false)} className="btn-red w-full mt-4">
                Показать {filtered.length} товаров
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Active filters */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBrands.map(b => (
                <button key={b} onClick={() => toggleBrand(b)}
                  className="flex items-center gap-1 bg-ice-black text-white text-xs px-2.5 py-1.5 hover:bg-ice-red transition-colors">
                  {b} <X size={10} />
                </button>
              ))}
              {selectedAges.map(a => (
                <button key={a} onClick={() => toggleAge(a)}
                  className="flex items-center gap-1 bg-ice-black text-white text-xs px-2.5 py-1.5 hover:bg-ice-red transition-colors">
                  {a} <X size={10} />
                </button>
              ))}
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">Найдено: <span className="font-bold text-ice-black">{filtered.length}</span> товаров</p>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="border border-gray-200 text-sm px-3 py-2 outline-none focus:border-ice-red">
                <option value="popular">По популярности</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
                <option value="new">Новинки</option>
              </select>
              <div className="flex border border-gray-200">
                <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-ice-black text-white' : 'hover:bg-gray-50'}`}>
                  <Grid3X3 size={16} />
                </button>
                <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-ice-black text-white' : 'hover:bg-gray-50'}`}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">🏒</p>
              <p className="text-gray-400 font-medium">Товары не найдены</p>
              <button onClick={() => { setSelectedBrands([]); setSelectedAges([]); setSelectedSizes([]) }}
                className="btn-red mt-4">
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
