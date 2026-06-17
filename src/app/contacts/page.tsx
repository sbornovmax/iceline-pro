import { Phone, Mail, MessageCircle, Clock, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Контакты' }

export default function ContactsPage() {
  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Контакты</span>
      </nav>

      <h1 className="section-title mb-8">Контакты</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Phone, title: 'Телефон', value: '+7 993 470 3548', href: 'tel:+79934703548', sub: 'ПН-ВС 10:00–18:00' },
              { icon: Mail, title: 'Email', value: 'info@icelinepro.ru', href: 'mailto:info@icelinepro.ru', sub: 'Ответим в течение часа' },
              { icon: MessageCircle, title: 'Telegram', value: '@iceline_pro', href: 'https://t.me/iceline_pro', sub: 'Быстрый ответ' },
              { icon: Clock, title: 'Режим работы', value: 'ПН-ВС 10:00–18:00', href: null, sub: 'Без выходных' },
            ].map(({ icon: Icon, title, value, href, sub }) => (
              <div key={title} className="border border-gray-100 p-5">
                <Icon size={20} className="text-ice-red mb-3" />
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{title}</p>
                {href ? (
                  <a href={href} className="font-bold text-sm hover:text-ice-red transition-colors block">{value}</a>
                ) : (
                  <p className="font-bold text-sm">{value}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <div className="border border-gray-100 p-6">
            <h2 className="font-black text-lg mb-4 uppercase">Написать нам</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Имя</label>
                  <input className="input-field" placeholder="Александр" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Телефон</label>
                  <input className="input-field" placeholder="+7 (900) 000-00-00" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Сообщение</label>
                <textarea className="input-field resize-none" rows={4} placeholder="Ваш вопрос..." />
              </div>
              <button className="btn-red w-full">Отправить сообщение</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-ice-gray h-80 flex items-center justify-center border border-gray-100">
            <div className="text-center">
              <MapPin size={40} className="text-ice-red mx-auto mb-3" />
              <p className="font-bold">Карта магазина</p>
              <p className="text-sm text-gray-400 mt-1">Уточните адрес у менеджера</p>
            </div>
          </div>
          <div className="border border-gray-100 p-5">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wider">Реквизиты</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p><span className="font-medium text-ice-black">ООО "АЙСЛАЙН ПРО"</span></p>
              <p>ИНН: 1234567890</p>
              <p>ОГРН: 1234567890123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
