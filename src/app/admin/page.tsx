'use client'
import { useState } from 'react'
import { Package, ShoppingBag, Users, TrendingUp, Plus, Pencil, Trash2, Search, Upload, Eye, Tag, Star, BarChart2, Bell } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import Link from 'next/link'

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

const TABS = ['Дашборд', 'Заказы', 'Товары', 'Отзывы', 'Промокоды', 'Клиенты']

export default function AdminPage() {
  const [tab, setTab] = useState('Дашборд')
  const [orderSearch, setOrderSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [statuses, setStatuses] = useState<Record<string, string>>(Object.fromEntries(ORDERS.map(o => [o.id, o.status])))
  const [reviews, setReviews] = useState(REVIEWS)
  const [promos, setPromos] = useState(PROMOS)

  const maxRevenue = Math.max(...REVENUE)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-ice-black text-white px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-xl font-black">ICELINE</span>
            <span className="text-xl font-black text-ice-red">PRO</span>
          </Link>
          <span className="text-xs bg-ice-red px-2 py-0.5 font-bold uppercase">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-1 text-gray-400 hover:text-white">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-ice-red text-white text-[9px] flex items-center justify-center font-bold">3</span>
          </button>
          <span className="text-gray-400 text-sm hidden sm:block">Администратор</span>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← На сайт</Link>
        </div>
      </div>

      {/* Tabs */}
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
        {/* Dashboard */}
        {tab === 'Дашборд' && (
          <div className="space-y-6">
            {/* Stats */}
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

            {/* Revenue chart */}
            <div className="bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider">Выручка по месяцам (тыс. ₽)</h3>
                <span className="text-xs text-gray-400">2026</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {REVENUE.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-ice-red hover:bg-ice-red-dark transition-colors cursor-pointer"
                      style={{ height: `${(v / maxRevenue) * 100}%` }}
                      title={`${MONTHS[i]}: ${v}к ₽`}
                    />
                    <span className="text-[9px] text-gray-400">{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last orders */}
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

        {/* Orders */}
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
                          <select value={statuses[order.id]} onChange={e => setStatuses(p => ({...p, [order.id]: e.target.value}))}
                            className={`text-xs font-bold px-2 py-1 border-0 outline-none cursor-pointer ${s?.color}`}>
                            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
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

        {/* Products */}
        {tab === 'Товары' && (
          <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                  placeholder="Поиск товара..." className="input-field !pl-9 text-sm" />
              </div>
              <button className="btn-red flex items-center gap-2 !py-2.5 text-sm"><Plus size={14} /> Добавить</button>
              <button className="flex items-center gap-2 border border-gray-200 px-3 py-2.5 text-sm hover:border-ice-red hover:text-ice-red transition-colors">
                <Upload size={14} /> Импорт Excel
              </button>
            </div>
            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>{['Фото','Название','Бренд','Цена','Статус',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PRODUCTS.filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase())).map(p => (
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

        {/* Reviews moderation */}
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

        {/* Promo codes */}
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

        {/* Customers */}
        {tab === 'Клиенты' && (
          <div className="bg-white border border-gray-100 p-12 text-center">
            <Users size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="font-bold text-gray-400">База клиентов</p>
            <p className="text-sm text-gray-400 mt-1">Доступна после подключения базы данных PostgreSQL</p>
            <div className="mt-4 text-xs text-gray-400 max-w-sm mx-auto p-3 bg-blue-50 border border-blue-100">
              Следующий этап: подключение PostgreSQL → реальные данные о клиентах и заказах
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
