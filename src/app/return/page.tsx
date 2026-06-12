import Link from 'next/link'
import { ChevronRight, RefreshCw, Phone, CheckCircle, XCircle } from 'lucide-react'

export const metadata = { title: 'Возврат и обмен' }

export default function ReturnPage() {
  return (
    <div className="container-ice py-8 max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Возврат и обмен</span>
      </nav>

      <h1 className="section-title mb-8">Возврат и обмен</h1>

      <div className="space-y-8">
        {/* Main rule */}
        <div className="bg-green-50 border border-green-200 p-5 flex gap-4">
          <RefreshCw size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-800">14 дней на возврат</p>
            <p className="text-sm text-green-700 mt-1">Вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения без объяснения причин.</p>
          </div>
        </div>

        <div>
          <h2 className="font-black text-xl uppercase mb-4">Условия возврата</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-100 p-5">
              <p className="font-bold text-sm text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle size={16} /> Можно вернуть
              </p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {['Товар с сохранённым товарным видом', 'Оригинальная упаковка без повреждений', 'Все ярлыки и бирки на месте', 'Товар не был в использовании'].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="border border-red-100 p-5">
              <p className="font-bold text-sm text-red-600 mb-3 flex items-center gap-2">
                <XCircle size={16} /> Нельзя вернуть
              </p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {['Товар после использования', 'Повреждённая или отсутствующая упаковка', 'Снятые защитные плёнки', 'Товар из категории нижнего белья'].map(t => (
                  <li key={t} className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-black text-xl uppercase mb-4">Как оформить возврат</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Свяжитесь с нами', desc: 'Позвоните или напишите в Telegram. Сообщите номер заказа и причину возврата.' },
              { step: '2', title: 'Получите инструкции', desc: 'Мы вышлем адрес для возврата и форму заявления в течение 24 часов.' },
              { step: '3', title: 'Отправьте товар', desc: 'Упакуйте товар, вложите копию чека и отправьте любой службой доставки.' },
              { step: '4', title: 'Получите деньги', desc: 'После получения товара мы вернём деньги на вашу карту в течение 3–5 рабочих дней.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 border border-gray-100 p-4">
                <div className="w-8 h-8 bg-ice-red text-white flex items-center justify-center font-black flex-shrink-0">{step}</div>
                <div>
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-black">Нужна помощь с возвратом?</p>
            <p className="text-sm text-gray-400">Ответим в течение 1 часа</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+79001234567" className="btn-red flex items-center gap-2 !py-2.5">
              <Phone size={14} /> Позвонить
            </a>
            <a href="https://t.me/icelinepro" className="btn-outline !py-2.5">Telegram</a>
          </div>
        </div>
      </div>
    </div>
  )
}
