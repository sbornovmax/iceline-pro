'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Package, Heart, User, Settings, LogOut, ChevronRight, Star, RotateCcw } from 'lucide-react'

const ORDERS = [
  { id: 'ICE-2026-0041', date: '10 июня 2026', status: 'delivered', statusLabel: 'Доставлен', total: 89990, items: ['Коньки Bauer Vapor X5 Pro SR'] },
  { id: 'ICE-2026-0038', date: '2 июня 2026', status: 'processing', statusLabel: 'В обработке', total: 34990, items: ['Клюшка CCM Ribcor Trigger 9 SR'] },
  { id: 'ICE-2026-0031', date: '18 мая 2026', status: 'delivered', statusLabel: 'Доставлен', total: 124980, items: ['Коньки Bauer Vapor X5 Pro SR', 'Клюшка CCM'] },
]

const STATUS_COLORS: Record<string, string> = {
  delivered: 'text-green-600 bg-green-50',
  processing: 'text-amber-600 bg-amber-50',
  shipped: 'text-blue-600 bg-blue-50',
  cancelled: 'text-red-500 bg-red-50',
}

const TABS = [
  { id: 'orders', label: 'Мои заказы', icon: Package },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'settings', label: 'Настройки', icon: Settings },
]

export default function AccountPage() {
  const [tab, setTab] = useState('orders')

  return (
    <div className="container-ice py-8">
      <h1 className="section-title mb-8">Личный кабинет</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="border border-gray-100 p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-ice-red flex items-center justify-center text-white font-black text-lg">АИ</div>
              <div>
                <p className="font-bold text-sm">Александр Иванов</p>
                <p className="text-xs text-gray-400">alex@example.com</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 border-t pt-3">
              <p>Заказов: <span className="font-bold text-ice-black">{ORDERS.length}</span></p>
            </div>
          </div>

          <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors ${tab === id ? 'bg-ice-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-ice-black'}`}>
                <Icon size={16} />
                {label}
                <ChevronRight size={14} className="ml-auto" />
              </button>
            ))}
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={16} />
              Выйти
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="md:col-span-3">
          {tab === 'orders' && (
            <div>
              <h2 className="text-lg font-black mb-4 uppercase tracking-tight">История заказов</h2>
              {ORDERS.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200">
                  <Package size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">Заказов пока нет</p>
                  <Link href="/catalog" className="btn-red mt-4 inline-flex">Перейти в каталог</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {ORDERS.map(order => (
                    <div key={order.id} className="border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-sm">#{order.id}</span>
                          <span className="text-xs text-gray-400">{order.date}</span>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 ${STATUS_COLORS[order.status]}`}>
                          {order.statusLabel}
                        </span>
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-sm text-gray-600 mb-3">{order.items.join(', ')}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-black text-lg">{order.total.toLocaleString('ru-RU')} ₽</span>
                          <div className="flex gap-2">
                            {order.status === 'delivered' && (
                              <>
                                <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 hover:border-ice-red hover:text-ice-red transition-colors">
                                  <Star size={12} /> Оценить
                                </button>
                                <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 hover:border-ice-red hover:text-ice-red transition-colors">
                                  <RotateCcw size={12} /> Повторить
                                </button>
                              </>
                            )}
                            <Link href={`/account/order/${order.id}`}
                              className="text-xs bg-ice-black text-white px-3 py-1.5 hover:bg-ice-red transition-colors">
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'favorites' && (
            <div>
              <h2 className="text-lg font-black mb-4 uppercase tracking-tight">Избранное</h2>
              <div className="text-center py-16 border border-dashed border-gray-200">
                <Heart size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Нет избранных товаров</p>
                <p className="text-xs text-gray-400">Нажмите ❤ на карточке товара чтобы добавить</p>
                <Link href="/catalog" className="btn-red mt-4 inline-flex">Смотреть каталог</Link>
              </div>
            </div>
          )}

          {tab === 'profile' && (
            <div>
              <h2 className="text-lg font-black mb-6 uppercase tracking-tight">Мой профиль</h2>
              <div className="space-y-4 max-w-lg">
                {[
                  { label: 'Имя', value: 'Александр' },
                  { label: 'Фамилия', value: 'Иванов' },
                  { label: 'Email', value: 'alex@example.com' },
                  { label: 'Телефон', value: '+7 (900) 123-45-67' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">{label}</label>
                    <input defaultValue={value} className="input-field" />
                  </div>
                ))}
                <button className="btn-red w-full mt-2">Сохранить изменения</button>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div>
              <h2 className="text-lg font-black mb-6 uppercase tracking-tight">Настройки</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Текущий пароль</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Новый пароль</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Подтвердите пароль</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
                <button className="btn-black w-full">Сменить пароль</button>
                <hr className="my-4" />
                <div className="space-y-3">
                  <p className="text-sm font-bold">Уведомления</p>
                  {['Email о статусе заказа', 'SMS при доставке', 'Акции и скидки'].map(n => (
                    <label key={n} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-ice-red" />
                      <span className="text-sm text-gray-600">{n}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
