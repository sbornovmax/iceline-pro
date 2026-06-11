import Link from 'next/link'
import { Truck, Package, MapPin, Clock, CreditCard, ChevronRight, Phone } from 'lucide-react'

export const metadata = { title: 'Доставка и оплата' }

export default function DeliveryPage() {
  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Доставка и оплата</span>
      </nav>

      <h1 className="section-title mb-8">Доставка и оплата</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* CDEK */}
        <div className="border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
              <Truck size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-black text-lg">СДЭК</h2>
              <p className="text-xs text-gray-400">Доставка по всей России</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Срок доставки</span>
              <span className="font-semibold">2–7 рабочих дней</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">До пункта выдачи</span>
              <span className="font-semibold">от 250 ₽</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Курьером до двери</span>
              <span className="font-semibold">от 350 ₽</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Бесплатно при заказе</span>
              <span className="font-bold text-green-600">от 5 000 ₽</span>
            </div>
          </div>
        </div>

        {/* Russian Post */}
        <div className="border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-black text-lg">Почта России</h2>
              <p className="text-xs text-gray-400">В любой населённый пункт</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Срок доставки</span>
              <span className="font-semibold">5–21 рабочий день</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">До почтового отделения</span>
              <span className="font-semibold">от 200 ₽</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Стоимость зависит от</span>
              <span className="font-semibold">веса и региона</span>
            </div>
          </div>
        </div>

        {/* Pickup */}
        <div className="border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-ice-red/10 flex items-center justify-center">
              <MapPin size={20} className="text-ice-red" />
            </div>
            <div>
              <h2 className="font-black text-lg">Самовывоз</h2>
              <p className="text-xs text-gray-400">Бесплатно</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Стоимость</span>
              <span className="font-bold text-green-600">Бесплатно</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Готовность</span>
              <span className="font-semibold">1–2 рабочих дня</span>
            </div>
            <div className="py-2">
              <span className="text-gray-500 block mb-1">Адрес</span>
              <span className="font-semibold">Уточните у менеджера по телефону</span>
            </div>
          </div>
        </div>

        {/* Timing */}
        <div className="border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 flex items-center justify-center">
              <Clock size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="font-black text-lg">Сроки обработки</h2>
              <p className="text-xs text-gray-400">После подтверждения оплаты</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Обработка заказа</span>
              <span className="font-semibold">1 рабочий день</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="span text-gray-500">Заказ до 14:00</span>
              <span className="font-semibold">Отправка в тот же день</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Рабочие дни</span>
              <span className="font-semibold">Пн–Пт 9:00–18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <h2 className="section-title mb-6">Способы оплаты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { title: 'Банковская карта', desc: 'Visa, Mastercard, МИР. Безопасная оплата через ЮKassa', color: 'border-blue-200 bg-blue-50' },
          { title: 'СБП', desc: 'Система быстрых платежей. Мгновенное зачисление', color: 'border-green-200 bg-green-50' },
          { title: 'Тинькофф', desc: 'Оплата через Тинькофф Pay с кешбэком', color: 'border-yellow-200 bg-yellow-50' },
          { title: 'Я.Сплит', desc: 'Рассрочка на 4 платежа без процентов', color: 'border-purple-200 bg-purple-50' },
        ].map(({ title, desc, color }) => (
          <div key={title} className={`border p-5 ${color}`}>
            <CreditCard size={24} className="mb-3 text-gray-600" />
            <h3 className="font-bold text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="section-title mb-6">Частые вопросы</h2>
      <div className="space-y-3 max-w-2xl mb-10">
        {[
          { q: 'Как отследить заказ?', a: 'После отправки вы получите номер трека на email. Отслеживание доступно на сайте СДЭК или Почты России.' },
          { q: 'Можно ли изменить адрес доставки?', a: 'Да, до момента передачи товара в службу доставки. Позвоните нам по телефону.' },
          { q: 'Что делать если товар поврежден?', a: 'Зафиксируйте повреждения при получении и свяжитесь с нами в течение 24 часов.' },
          { q: 'Как вернуть товар?', a: 'Возврат в течение 14 дней при сохранении товарного вида. Обратитесь к менеджеру.' },
        ].map(({ q, a }) => (
          <div key={q} className="border border-gray-100 p-4">
            <p className="font-bold text-sm mb-1">{q}</p>
            <p className="text-sm text-gray-500">{a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-ice-black text-white p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-black text-xl">Остались вопросы?</p>
          <p className="text-gray-400 text-sm mt-1">Наши менеджеры помогут с выбором и доставкой</p>
        </div>
        <div className="flex gap-3">
          <a href="tel:+79001234567" className="btn-red flex items-center gap-2">
            <Phone size={16} /> +7 (900) 123-45-67
          </a>
        </div>
      </div>
    </div>
  )
}
