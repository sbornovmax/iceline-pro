'use client'
import { useState } from 'react'
import { Package, ShoppingBag, Users, TrendingUp, Plus, Pencil, Trash2, Search, Filter, Upload, Eye, Check, X } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const ORDERS_ADMIN = [
  { id: 'ICE-2026-0042', customer: 'Иванов А.И.', phone: '+7 900 123-45-67', total: 89990, status: 'new', items: 1, date: '12.06.2026 03:15' },
  { id: 'ICE-2026-0041', customer: 'Петров В.С.', phone: '+7 911 234-56-78', total: 34990, status: 'paid', items: 1, date: '11.06.2026 18:22' },
  { id: 'ICE-2026-0040', customer: 'Сидорова М.В.', phone: '+7 922 345-67-89', total: 124980, status: 'shipped', items: 2, date: '11.06.2026 12:10' },
  { id: 'ICE-2026-0039', customer: 'Козлов Д.А.', phone: '+7 933 456-78-90', total: 19990, status: 'delivered', items: 1, date: '10.06.2026 09:44' },
  { id: 'ICE-2026-0038', customer: 'Новикова Е.П.', phone: '+7 944 567-89-01', total: 74990, status: 'cancelled', items: 1, date: '09.06.2026 15:30' },
]

const ORDER_STATUSES = [
  { value: 'new', label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  { value: 'paid', label: 'Оплачен', color: 'bg-green-100 text-green-700' },
  { value: 'assembly', label: 'Сборка', color: 'bg-amber-100 text-amber-700' },
  { value: 'shipped', label: 'В пути', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'Доставлен', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Отменён', color: 'bg-red-100 text-red-600' },
]

const STATS = [
  { label: 'Заказов сегодня', value: '12', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
  { label: 'Выручка (месяц)', value: '842 400 ₽', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
  { label: 'Товаров', value: '248', icon: Package, color: 'text-purple-600 bg-purple-50' },
  { label: 'Клиентов', value: '1 284', icon: Users, color: 'text-amber-600 bg-amber-50' },
]

const ADMIN_TABS = ['Дашборд', 'Заказы', 'Товары', 'Клиенты']

export default function AdminPage() {
  const [tab, setTab] = useState('Дашборд')
  const [orderSearch, setOrderSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(ORDERS_ADMIN.map(o => [o.id, o.status]))
  )

  const filteredOrders = ORDERS_ADMIN.filter(o =>
    o.id.includes(orderSearch) || o.customer.toLowerCase().includes(orderSearch.toLowerCase())
  )

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-ice-black text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black">ICELINE <span className="text-ice-red">PRO</span></span>
          <span className="text-xs bg-ice-red px-2 py-0.5 font-bold">ADMIN</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400">Администратор</span>
          <button className="text-gray-400 hover:text-white">Выйти</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex">
          {ADMIN_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${tab === t ? 'border-ice-red text-ice-red' : 'border-transparent text-gray-500 hover:text-ice-black'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Dashboard */}
        {tab === 'Дашборд' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white border border-gray-100 p-5">
                  <div className={`w-10 h-10 flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 p-5">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Последние заказы</h3>
              <div className="space-y-2">
                {ORDERS_ADMIN.slice(0, 3).map(order => {
                  const statusObj = ORDER_STATUSES.find(s => s.value === orderStatuses[order.id])
                  return (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="font-bold text-sm">{order.id}</span>
                        <span className="text-gray-400 text-xs ml-2">{order.customer}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm">{order.total.toLocaleString('ru-RU')} ₽</span>
                        <span className={`text-xs px-2 py-0.5 font-bold ${statusObj?.color ?? ''}`}>{statusObj?.label}</span>
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
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Поиск по номеру или клиенту..." className="input-field !pl-9 text-sm" />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 px-3 py-2.5 text-sm hover:border-gray-300">
                <Filter size={14} /> Фильтр
              </button>
            </div>

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Номер', 'Клиент', 'Телефон', 'Товаров', 'Сумма', 'Статус', 'Дата', 'Действия'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map(order => {
                    const statusObj = ORDER_STATUSES.find(s => s.value === orderStatuses[order.id])
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-ice-red">{order.id}</td>
                        <td className="px-4 py-3 font-medium">{order.customer}</td>
                        <td className="px-4 py-3 text-gray-500">{order.phone}</td>
                        <td className="px-4 py-3 text-center">{order.items}</td>
                        <td className="px-4 py-3 font-bold">{order.total.toLocaleString('ru-RU')} ₽</td>
                        <td className="px-4 py-3">
                          <select
                            value={orderStatuses[order.id]}
                            onChange={e => setOrderStatuses(p => ({ ...p, [order.id]: e.target.value }))}
                            className={`text-xs font-bold px-2 py-1 border-0 outline-none cursor-pointer ${statusObj?.color ?? ''}`}>
                            {ORDER_STATUSES.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{order.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors">
                              <Eye size={12} />
                            </button>
                          </div>
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
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={productSearch} onChange={e => setProductSearch(e.target.value)}
                  placeholder="Поиск товара..." className="input-field !pl-9 text-sm" />
              </div>
              <button className="btn-red flex items-center gap-2 !py-2.5">
                <Plus size={14} /> Добавить товар
              </button>
              <button className="flex items-center gap-2 border border-gray-200 px-3 py-2.5 text-sm hover:border-gray-300">
                <Upload size={14} /> Импорт Excel
              </button>
            </div>

            <div className="bg-white border border-gray-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Фото', 'Название', 'Бренд', 'Цена', 'Статус', 'Действия'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 bg-gray-100 overflow-hidden">
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium max-w-xs">
                        <p className="truncate">{p.name}</p>
                      </td>
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
                          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-ice-red hover:text-ice-red transition-colors">
                            <Pencil size={12} />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors">
                            <Trash2 size={12} />
                          </button>
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
          <div className="bg-white border border-gray-100 p-8 text-center">
            <Users size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="font-bold text-gray-400">База клиентов</p>
            <p className="text-sm text-gray-400 mt-1">Будет доступна после подключения базы данных</p>
          </div>
        )}
      </div>
    </div>
  )
}
