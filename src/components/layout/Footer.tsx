import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ice-black text-white mt-16">
      {/* Main footer */}
      <div className="container-ice py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-white">ICELINE</span>
              <span className="text-2xl font-black text-ice-red">PRO</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Профессиональное хоккейное снаряжение от ведущих мировых брендов. Bauer, CCM, Warrior и другие.
            </p>
            <div className="flex gap-3">
              <a href="https://t.me/icelinepro" className="w-9 h-9 bg-ice-graphite flex items-center justify-center hover:bg-ice-red transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="https://vk.com/icelinepro" className="w-9 h-9 bg-ice-graphite flex items-center justify-center hover:bg-ice-red transition-colors text-xs font-bold">
                VK
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-white">Каталог</h3>
            <ul className="space-y-2">
              {[
                ['Хоккейные коньки', '/catalog/konki'],
                ['Хоккейные клюшки', '/catalog/klyushki'],
                ['Хоккейные шлемы', '/catalog/shlemy'],
                ['Перчатки', '/catalog/perchatki'],
                ['Хоккейная защита', '/catalog/zashita'],
                ['Для вратаря', '/catalog/vratar'],
                ['Детское снаряжение', '/catalog/detskaya'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors hover:text-ice-red">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-white">Информация</h3>
            <ul className="space-y-2">
              {[
                ['Доставка и оплата', '/delivery'],
                ['Возврат и обмен', '/return'],
                ['О компании', '/about'],
                ['Блог', '/blog'],
                ['Контакты', '/contacts'],
                ['Публичная оферта', '/legal/offer'],
                ['Политика конфиденциальности', '/legal/privacy'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-ice-red transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4 text-white">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-ice-red mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+79001234567" className="text-sm text-white font-medium hover:text-ice-red">+7 (900) 123-45-67</a>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <Clock size={10} /> Пн–Пт 9:00–20:00
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-ice-red flex-shrink-0" />
                <a href="mailto:info@icelinepro.ru" className="text-sm text-gray-400 hover:text-white">info@icelinepro.ru</a>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-ice-red mt-0.5 flex-shrink-0" />
                <a href="https://t.me/icelinepro" className="text-sm text-gray-400 hover:text-white">@icelinepro</a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-ice-graphite border-l-2 border-ice-red">
              <p className="text-xs text-gray-400 mb-2">Подпишитесь на новости</p>
              <div className="flex">
                <input type="email" placeholder="Ваш email" className="flex-1 bg-ice-black text-white text-xs px-3 py-2 outline-none border border-ice-graphite focus:border-ice-red" />
                <button className="bg-ice-red text-white px-3 py-2 text-xs font-bold hover:bg-ice-red-dark transition-colors">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ice-graphite">
        <div className="container-ice py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 ICELINE PRO. Все права защищены.</p>
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="visa" className="h-5 opacity-50 grayscale" />
            <span className="text-xs text-gray-600">Visa · Mastercard · СБП · ЮKassa</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
