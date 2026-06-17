'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package, ShoppingBag, Users, TrendingUp, Plus, Pencil, Trash2, Search,
  Upload, Eye, Tag, Star, Bell, X, LogOut, FileText, FolderTree, Settings as SettingsIcon, ShieldCheck,
} from 'lucide-react'
import { PRODUCTS, CATEGORIES, type Product } from '@/lib/data'
import Link from 'next/link'

type AdminRole = 'owner' | 'editor'
type AdminProduct = Product & { description?: string }
type BlogPost = { id: string; title: string; slug: string; excerpt: string; content: string; status: 'draft' | 'published'; date: string }

const ORDERS = [
  { id: 'ICE-2026-0042', customer: 'Иванов А.И.', phone: '+7 900 123-45-67', total: 89990, status: 'new', items: 1, date: '12.06.2026 03:15' },
  { id: 'ICE-2026-0041', customer: 'Петров В.С.', phone: '+7 911 234-56-78', total: 34990, status: 'paid', items: 1, date: '11.06.2026 18:22' },
  { id: 'ICE-2026-0040', customer: 'Сидорова М.В.', phone: '+7 922 345-67-89', total: 124980, status: 'shipped', items: 2, date: '11.06.2026 12:10' },
  { id: 'ICE-2026-0039', customer: 'Козлов Д.А.', phone: '+7 933 456-78-90', total: 19990, status: 'delivered', items: 1, date: '10.06.2026 09:44' },
  { id: 'ICE-2026-0038', customer: 'Новикова Е.П.', phone: '+7 944 567-89-01', total: 74990, status: 'cancelled', items: 1, date: '09.06.2026 15:30' },
]

const REVIEWS = [
  { id: 1, product: 'Коньки Bauer Vapor X5 Pro SR', customer: 'Александр К.', rating: 5, text: 'Отличные коньки!', date: '15.06.2026', status: 'pending' },
  { id: 2, product: 'Клюшка CCM Ribcor Trigger 9', customer: 'Иван М.', rating: 4, text: 'Хорошее качество.', date: '14.06.2026', status: 'pending' },
  { id: 3, product: 'Шлем Bauer Re-Akt 200', customer: 'Мария С.', rating: 5, text: 'Лёгкий и удобный.', date: '13.06.2026', status: 'approved' },
]

const PROMOS = [
  { code: 'PROMO10', discount: '10%', uses: 45, limit: 100, active: true, expires: '30.06.2026' },
  { code: 'SUMMER20', discount: '20%', uses: 12, limit: 50, active: true, expires: '31.07.2026' },
  { code: 'VIP30', discount: '30%', uses: 3, limit: 10, active: false, expires: '01.06.2026' },
]

const STATUSES = [
  { value: 'new', label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  { value: 'paid', label: 'Оплачен', color: 'bg-green-100 text-green-700' },
  { value: 'assembly', label: 'Сборка', color: 'bg-amber-100 text-amber-700' },
  { value: 'shipped', label: 'В пути', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'Доставлен', color: 'bg-teal-100 text-teal-700' },
  { value: 'cancelled', label: 'Отменён', color: 'bg-red-100 text-red-600' },
]

const STATS = [
  { label: 'Заказов сегодня', value: '12', delta: '+3', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
  { label: 'Выручка (месяц)', value: '842 400 ₽', delta: '+18%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
  { label: 'Товаров', value: '248', delta: '+5', icon: Package, color: 'text-purple-600 bg-purple-50' },
  { label: 'Клиентов', value: '1 284', delta: '+24', icon: Users, color: 'text-amber-600 bg-amber-50' },
]

const REVENUE = [120, 180, 140, 220, 190, 260, 310, 280, 350, 290, 380, 420]
const MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']

const emptyProductDraft: AdminProduct = {
  id: '', name: '', brand: '', category: CATEGORIES[0]?.slug || '', slug: '',
  price: 0, oldPrice: undefined, image: '', description: '', badge: undefined,
  age: '', inStock: true, rating: 5, reviewCount: 0,
}

const emptyPostDraft: BlogPost = { id: '', title: '', slug: '', excerpt: '', content: '', status: 'draft', date: '' }

function DemoBanner() {
  return (
    <div className="bg-blue-50 border border-blue-100 text-xs text-gray-500 p-3">
      Демо-режим: изменения видны только в этой сессии. Сохранение в базу данных подключается на следующем этапе.
    </div>
  )
}

export default function AdminDashboardClient({ role }: { role: AdminRole }) {
  const router = useRouter()
  const baseTabs = ['Дашборд', 'Заказы', 'Товары', 'Блог', 'Категории', 'Отзывы', 'Промокоды', 'Клиенты']
  const ownerTabs = ['Настройки', 'Пользователи']
  const TABS = role === 'owner' ? [...baseTabs, ...ownerTabs] : baseTabs

  const [tab, setTab] = useState('Дашборд')
  const [orderSearch, setOrderSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [statuses, setStatuses] = useState<Record<string, string>>(Object.fromEntries(ORDERS.map(o => [o.id, o.status])))
  const [reviews, setReviews] = useState(REVIEWS)
  const [promos, setPromos] = useState(PROMOS)

  const [products, setProducts] = useState<AdminProduct[]>(PRODUCTS)
  const [productDraft, setProductDraft] = useState<AdminProduct | null>(null)

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    { id: '1', title: 'Как выбрать клюшку по росту', slug: 'kak-vybrat-klyushku', excerpt: 'Разбираем главные правила подбора длины и жёсткости клюшки.', content: 'Полный текст статьи...', status: 'published', date: '10.06.2026' },
    { id: '2', title: 'Топ-5 коньков для начинающих', slug: 'top-5-konkov', excerpt: 'Какие модели подойдут тем, кто только встаёт на лёд.', content: 'Полный текст статьи...', status: 'draft', date: '15.06.2026' },
  ])
  const [postDraft, setPostDraft] = useState<BlogPost | null>(null)

  const [categories, setCategories] = useState(() => JSON.parse(JSON.stringify(CATEGORIES)) as typeof CATEGORIES)

  const [settings, setSettings] = useState({
    phone: '+7 993 470 3548',
    vk: 'https://vk.ru/club236946159',
    telegram: '@iceline_pro',
    instagram: '@icelinepro.shop',
    hours: 'ПН-ВС 10:00–18:00',
    inn: '1234567890',
    ogrn: '1234567890123',
  })
  const [savedNote, setSavedNote] = useState(false)

  const maxRevenue = Math.max(...REVENUE)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin-login')
    router.refresh()
  }

  // Products
  const openNewProduct = () => setProductDraft({ ...emptyProductDraft, id: String(Date.now()) })
  const openEditProduct = (p: AdminProduct) => setProductDraft({ ...p })
  const closeProductForm = () => setProductDraft(null)
  const saveProduct = () => {
    if (!productDraft || !productDraft.name) return
    setProducts(prev => {
      const exists = prev.some(p => p.id === productDraft.id)
      return exists ? prev.map(p => p.id === productDraft.id ? productDraft : p) : [productDraft, ...prev]
    })
    setProductDraft(null)
  }
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id))

  // Blog
  const openNewPost = () => setPostDraft({ ...emptyPostDraft, id: String(Date.now()), date: new Date().toLocaleDateString('ru-RU') })
  const openEditPost = (p: BlogPost) => setPostDraft({ ...p })
  const closePostForm = () => setPostDraft(null)
  const savePost = () => {
    if (!postDraft || !postDraft.title) return
    setBlogPosts(prev => {
      const exists = prev.some(p => p.id === postDraft.id)
      return exists ? prev.map(p => p.id === postDraft.id ? postDraft : p) : [postDraft, ...prev]
    })
    setPostDraft(null)
  }
  const deletePost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id))

  // Categories
  const addCategory = () => setCategories(p => [...p, { id: String(Date.now()), name: 'Новая категория', slug: 'novaya-' + Date.now(), icon: 'protection', subcategories: [] }])
  const removeCategory = (ci: number) => setCategories(p => p.filter((_, i) => i !== ci))
  const updateCategoryName = (ci: number, val: string) => setCategories(p => p.map((c, i) => i === ci ? { ...c, name: val } : c))
  const updateCategorySlug = (ci: number, val: string) => setCategories(p => p.map((c, i) => i === ci ? { ...c, slug: val } : c))
  const addSub = (ci: number) => setCategories(p => p.map((c, i) => i === ci ? { ...c, subcategories: [...c.subcategories, { name: '', slug: '' }] } : c))
  const removeSub = (ci: number, si: number) => setCategories(p => p.map((c, i) => i === ci ? { ...c, subcategories: c.subcategories.filter((_, j) => j !== si) } : c))
  const updateSubName = (ci: number, si: number, val: string) => setCategories(p => p.map((c, i) => i === ci ? { ...c, subcategories: c.subcategories.map((s, j) => j === si ? { ...s, name: val } : s) } : c))
  const updateSubSlug = (ci: number, si: number, val: string) => setCategories(p => p.map((c, i) => i === ci ? { ...c, subcategories: c.subcategories.map((s, j) => j === si ? { ...s, slug: val } : s) } : c))

  const saveSettings = () => {
    setSavedNote(true)
    setTimeout(() => setSavedNote(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-ice-black text-white px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-xl font-black">АЙСЛАЙН</span>
            <span className="text-xl font-black text-ice-red">ПРО</span>
          </Link>
          <span className="text-xs bg-ice-red px-2 py-0.5 font-bold uppercase">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-1 text-gray-400 hover:text-white">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-ice-red text-white text-[9px] flex items-center justify-center font-bold">3</span>
          </button>
          <span className="text-gray-400 text-sm hidden sm:block">{role === 'owner' ? 'Владелец' : 'Редактор'}</span>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← На сайт</Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-ice-red text-sm">
            <LogOut size={14} /> Выйти
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-6 overflow-x-auto">
        <div className="flex min-w-max">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${tab === t ? 'border-ice-red text-ice-red' : 'border-transparent text-gray-500 hover:text-ice-black'}`}>
              {t}
              {t === 'Отзывы' && reviews.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-1.5 bg-ice-red text-white text-[10px] px-1.5 py-0.5 font-bold">
                  {reviews.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6">
        {tab === 'Дашборд' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map(({ label, value, delta, icon: Icon, color }) => (
                <div key={label} className="bg-white border border-gray-100 p-5">
                  <div className={`w-10 h-10 flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-black">{value}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400">{label}</p>
                    <span className="text-xs text-green-600 font-bold">{delta}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider">Выручка по месяцам (тыс. ₽)</h3>
                <span className="text-xs text-gray-400">2026</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {REVENUE.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-ice-red hover:bg-ice-red-dark transition-colors cursor-pointer"
                      style={{ height: `${(v / maxRevenue) * 100}%` }} title={`${MONTHS[i]}: ${v}к ₽`} />
                    <span className="text-[9px] text-gray-400">{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider">Последние заказы</h3>
                <button onClick={() => setTab('Заказы')} className="text-xs text-ice-red hover:underline">Все заказы →</button>
              </div>
              <div className="space-y-2">
                {ORDERS.slice(0, 4).map(order => {
                  const s = STATUSES.find(x => x.value === statuses[order.id])
                  return (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-ice-red">{order.id}</span>
                        <span className="text-gray-500">{order.customer}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black">{order.total.toLocaleString('ru-RU')} ₽</span>
                        <span className={`text-xs px-2 py-0.5 font-bold ${s?.color}`}>{s?.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'Заказы' && (
          <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Поиск по номеру или клиенту..." className="input-field !pl-9 text-sm" />
              </div>
            </div>
            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{['Номер','Клиент','Телефон','Товаров','Сумма','Статус','Дата',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ORDERS.filter(o => !orderSearch || o.id.includes(orderSearch) || o.customer.toLowerCase().includes(orderSearch.toLowerCase())).map(order => {
                    const s = STATUSES.find(x => x.value === statuses[order.id])
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-ice-red">{order.id}</td>
                        <td className="px-4 py-3 font-medium">{order.customer}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{order.phone}</td>
                        <td className="px-4 py-3 text-center">{order.items}</td>
                        <td className="px-4 py-3 font-bold">{order.total.toLocaleString('ru-RU')} ₽</td>
                        <td className="px-4 py-3">
                          <select value={statuses[order.id]} onChange={e => setStatuses(p => ({ ...p, [order.id]: e.target.value }))}
                            className={`text-xs font-bold px-2 py-1 border-0 outline-none cursor-pointer ${s?.color}`}>
                            {STATUSES.map(st => <option key={st.value} value={st.value}>{st.label}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{order.date}</td>
                        <td className="px-4 py-3">
                          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors"><Eye size={12} /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Товары' && (
          <div className="space-y-4">
            <DemoBanner />
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                  placeholder="Поиск товара..." className="input-field !pl-9 text-sm" />
              </div>
              <button onClick={openNewProduct} className="btn-red flex items-center gap-2 !py-2.5 text-sm"><Plus size={14} /> Добавить</button>
              <button className="flex items-center gap-2 border border-gray-200 px-3 py-2.5 text-sm hover:border-ice-red hover:text-ice-red transition-colors">
                <Upload size={14} /> Импорт Excel
              </button>
            </div>

            {productDraft && (
              <div className="bg-white border border-ice-red p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase">{products.some(p => p.id === productDraft.id) ? 'Редактировать товар' : 'Новый товар'}</h3>
                  <button onClick={closeProductForm}><X size={16} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Название" value={productDraft.name} onChange={e => setProductDraft({ ...productDraft, name: e.target.value })} />
                  <input className="input-field" placeholder="Бренд" value={productDraft.brand} onChange={e => setProductDraft({ ...productDraft, brand: e.target.value })} />
                  <select className="input-field" value={productDraft.category} onChange={e => setProductDraft({ ...productDraft, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                  <input className="input-field" placeholder="Slug" value={productDraft.slug} onChange={e => setProductDraft({ ...productDraft, slug: e.target.value })} />
                  <input type="number" className="input-field" placeholder="Цена" value={productDraft.price} onChange={e => setProductDraft({ ...productDraft, price: Number(e.target.value) })} />
                  <input type="number" className="input-field" placeholder="Старая цена" value={productDraft.oldPrice ?? ''} onChange={e => setProductDraft({ ...productDraft, oldPrice: e.target.value ? Number(e.target.value) : undefined })} />
                  <input className="input-field col-span-2" placeholder="URL фото" value={productDraft.image} onChange={e => setProductDraft({ ...productDraft, image: e.target.value })} />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={productDraft.inStock} onChange={e => setProductDraft({ ...productDraft, inStock: e.target.checked })} className="w-4 h-4 accent-ice-red" /> В наличии
                  </label>
                </div>
                <textarea className="input-field resize-none w-full" rows={3} placeholder="Описание товара"
                  value={productDraft.description ?? ''} onChange={e => setProductDraft({ ...productDraft, description: e.target.value })} />
                <div className="flex justify-end gap-2">
                  <button onClick={closeProductForm} className="btn-outline !py-2 text-sm">Отмена</button>
                  <button onClick={saveProduct} className="btn-red !py-2 text-sm">Сохранить</button>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{['Фото','Название','Бренд','Цена','Статус',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase())).map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 bg-gray-100 overflow-hidden">
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium max-w-xs"><p className="truncate">{p.name}</p></td>
                      <td className="px-4 py-3 text-ice-red font-bold text-xs">{p.brand}</td>
                      <td className="px-4 py-3">
                        <p className="font-bold">{p.price.toLocaleString('ru-RU')} ₽</p>
                        {p.oldPrice && <p className="text-xs text-gray-400 line-through">{p.oldPrice.toLocaleString('ru-RU')} ₽</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {p.inStock ? 'В наличии' : 'Нет'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => openEditProduct(p)} className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors"><Pencil size={12} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Блог' && (
          <div className="space-y-4">
            <DemoBanner />
            <button onClick={openNewPost} className="btn-red flex items-center gap-2 !py-2.5 text-sm"><Plus size={14} /><FileText size={14} /> Новая статья</button>

            {postDraft && (
              <div className="bg-white border border-ice-red p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase">{blogPosts.some(p => p.id === postDraft.id) ? 'Редактировать статью' : 'Новая статья'}</h3>
                  <button onClick={closePostForm}><X size={16} /></button>
                </div>
                <input className="input-field" placeholder="Заголовок" value={postDraft.title} onChange={e => setPostDraft({ ...postDraft, title: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Slug" value={postDraft.slug} onChange={e => setPostDraft({ ...postDraft, slug: e.target.value })} />
                  <select className="input-field" value={postDraft.status} onChange={e => setPostDraft({ ...postDraft, status: e.target.value as 'draft' | 'published' })}>
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовано</option>
                  </select>
                </div>
                <input className="input-field" placeholder="Краткое описание" value={postDraft.excerpt} onChange={e => setPostDraft({ ...postDraft, excerpt: e.target.value })} />
                <textarea className="input-field resize-none w-full" rows={6} placeholder="Текст статьи" value={postDraft.content} onChange={e => setPostDraft({ ...postDraft, content: e.target.value })} />
                <div className="flex justify-end gap-2">
                  <button onClick={closePostForm} className="btn-outline !py-2 text-sm">Отмена</button>
                  <button onClick={savePost} className="btn-red !py-2 text-sm">Сохранить</button>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{['Заголовок','Статус','Дата',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {blogPosts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{p.title}<p className="text-xs text-gray-400">{p.excerpt}</p></td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {p.status === 'published' ? 'Опубликовано' : 'Черновик'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{p.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => openEditPost(p)} className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors"><Pencil size={12} /></button>
                          <button onClick={() => deletePost(p.id)} className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Категории' && (
          <div className="space-y-4">
            <DemoBanner />
            <button onClick={addCategory} className="btn-red flex items-center gap-2 !py-2.5 text-sm"><Plus size={14} /><FolderTree size={14} /> Добавить категорию</button>
            <div className="space-y-3">
              {categories.map((cat, ci) => (
                <div key={cat.id} className="bg-white border border-gray-100 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <input value={cat.name} onChange={e => updateCategoryName(ci, e.target.value)} className="input-field flex-1 font-bold" />
                    <input value={cat.slug} onChange={e => updateCategorySlug(ci, e.target.value)} className="input-field w-40 text-xs" />
                    <button onClick={() => removeCategory(ci)} className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                  <div className="pl-4 space-y-2">
                    {cat.subcategories.map((sub, si) => (
                      <div key={si} className="flex items-center gap-2">
                        <input value={sub.name} onChange={e => updateSubName(ci, si, e.target.value)} className="input-field flex-1 text-sm" placeholder="Название подкатегории" />
                        <input value={sub.slug} onChange={e => updateSubSlug(ci, si, e.target.value)} className="input-field w-36 text-xs" placeholder="slug" />
                        <button onClick={() => removeSub(ci, si)} className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500"><Trash2 size={12} /></button>
                      </div>
                    ))}
                    <button onClick={() => addSub(ci)} className="text-xs text-ice-red hover:underline flex items-center gap-1"><Plus size={12} /> Подкатегория</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Отзывы' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-2">
              {[{l:'Ожидают',v:reviews.filter(r=>r.status==='pending').length,c:'text-amber-600'},{l:'Одобрены',v:reviews.filter(r=>r.status==='approved').length,c:'text-green-600'},{l:'Отклонены',v:reviews.filter(r=>r.status==='rejected').length,c:'text-red-500'}].map(({l,v,c}) => (
                <div key={l} className="bg-white border border-gray-100 p-4 text-center">
                  <p className={`text-2xl font-black ${c}`}>{v}</p>
                  <p className="text-xs text-gray-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {reviews.map(r => (
                <div key={r.id} className="bg-white border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{r.product}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.customer} · {r.date}</p>
                      <div className="flex mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s<=r.rating?'text-amber-400 fill-current':'text-gray-200 fill-current'} />)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{r.text}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 ${r.status==='pending'?'bg-amber-100 text-amber-700':r.status==='approved'?'bg-green-100 text-green-700':'bg-red-100 text-red-600'}`}>
                        {r.status==='pending'?'Ожидает':r.status==='approved'?'Одобрен':'Отклонён'}
                      </span>
                      {r.status === 'pending' && (
                        <>
                          <button onClick={() => setReviews(p => p.map(x => x.id===r.id?{...x,status:'approved'}:x))}
                            className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors">✓ Одобрить</button>
                          <button onClick={() => setReviews(p => p.map(x => x.id===r.id?{...x,status:'rejected'}:x))}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">✗ Отклонить</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Промокоды' && (
          <div className="space-y-4">
            <button className="btn-red flex items-center gap-2 !py-2.5 text-sm"><Plus size={14} /><Tag size={14} /> Создать промокод</button>
            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{['Промокод','Скидка','Использований','Лимит','Активен до','Статус',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {promos.map(p => (
                    <tr key={p.code} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-black text-ice-red">{p.code}</td>
                      <td className="px-4 py-3 font-bold">{p.discount}</td>
                      <td className="px-4 py-3">{p.uses}</td>
                      <td className="px-4 py-3">{p.limit}</td>
                      <td className="px-4 py-3 text-gray-500">{p.expires}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 ${p.active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                          {p.active?'Активен':'Истёк'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors"><Pencil size={12} /></button>
                          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Клиенты' && (
          <div className="bg-white border border-gray-100 p-12 text-center">
            <Users size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="font-bold text-gray-400">База клиентов</p>
            <p className="text-sm text-gray-400 mt-1">Доступна после подключения базы данных PostgreSQL</p>
          </div>
        )}

        {tab === 'Настройки' && role === 'owner' && (
          <div className="space-y-4 max-w-2xl">
            <div className="bg-blue-50 border border-blue-100 text-xs text-gray-500 p-3">
              Эти данные станут источником для шапки, футера и страницы контактов после подключения базы данных.
            </div>
            <div className="bg-white border border-gray-100 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Телефон</label>
                  <input className="input-field" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Режим работы</label>
                  <input className="input-field" value={settings.hours} onChange={e => setSettings({ ...settings, hours: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">VK</label>
                  <input className="input-field" value={settings.vk} onChange={e => setSettings({ ...settings, vk: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Telegram</label>
                  <input className="input-field" value={settings.telegram} onChange={e => setSettings({ ...settings, telegram: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Instagram</label>
                  <input className="input-field" value={settings.instagram} onChange={e => setSettings({ ...settings, instagram: e.target.value })} />
                </div>
                <div />
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">ИНН</label>
                  <input className="input-field" value={settings.inn} onChange={e => setSettings({ ...settings, inn: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">ОГРН</label>
                  <input className="input-field" value={settings.ogrn} onChange={e => setSettings({ ...settings, ogrn: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={saveSettings} className="btn-red !py-2.5 text-sm">Сохранить</button>
                {savedNote && <span className="text-green-600 text-sm font-bold">✓ Сохранено</span>}
              </div>
            </div>
          </div>
        )}

        {tab === 'Пользователи' && role === 'owner' && (
          <div className="space-y-4 max-w-2xl">
            <div className="bg-white border border-gray-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ice-red/10 flex items-center justify-center"><ShieldCheck size={18} className="text-ice-red" /></div>
                <div>
                  <p className="font-bold text-sm">Вы</p>
                  <p className="text-xs text-gray-400">Владелец · полный доступ</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-5 text-sm text-gray-500">
              Приглашение редакторов с ограниченными правами (товары, блог, без доступа к настройкам и пользователям) будет доступно после подключения базы данных.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
