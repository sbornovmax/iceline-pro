import Link from 'next/link'
import { ChevronRight, Award, Users, Truck, Percent, Briefcase, Target } from 'lucide-react'

export const metadata = { title: 'О компании АЙСЛАЙН ПРО' }

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-ice-black to-ice-graphite text-white py-16">
        <div className="container-ice">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white">Главная</Link>
            <ChevronRight size={12} />
            <span className="text-white">О компании</span>
          </nav>
          <p className="text-ice-red text-xs font-bold uppercase tracking-[0.3em] mb-3">С 2018 года</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">АЙСЛАЙН ПРО</h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Помогаем игрокам любого уровня выходить на лед в надежной и оригинальной экипировке.
          </p>
        </div>
      </div>

      <div className="container-ice py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '6+', label: 'лет на рынке' },
            { value: '12 000+', label: 'довольных клиентов' },
            { value: '500+', label: 'товаров в каталоге' },
            { value: '98%', label: 'положительных отзывов' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center border border-gray-100 p-6">
              <p className="text-3xl md:text-4xl font-black text-ice-red">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* About text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="section-title mb-4">Наша миссия</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>ICELINE PRO — это не просто магазин. Это сообщество людей, влюблённых в хоккей. Мы работаем с 2018 года и за это время помогли тысячам хоккеистов подобрать правильное снаряжение.</p>
              <p>Мы являемся официальными дистрибьюторами ведущих мировых брендов: Bauer, CCM, Warrior, Sherwood. Вся продукция сертифицирована и имеет официальную гарантию.</p>
              <p>Наши консультанты — бывшие хоккеисты с многолетним опытом. Они помогут подобрать снаряжение под ваш уровень игры, рост и стиль катания.</p>
            </div>
          </div>
          <div className="bg-ice-gray p-8">
            <h3 className="font-black text-xl uppercase mb-6">Почему выбирают нас</h3>
            <div className="space-y-4">
              {[
                { icon: Award, text: 'Только оригинальная продукция от официальных дистрибьюторов' },
                { icon: Users, text: 'Консультанты с хоккейным опытом помогут с выбором' },
                { icon: Truck, text: 'Быстрая доставка по всей России — СДЭК, Почта России' },
                { icon: Percent, text: 'Честные цены: Актуальная стоимость без скрытых наценок.' },
                { icon: Briefcase, text: 'Опт и розница: Работаем с физическими и юридическими лицами.' },
                { icon: Target, text: 'Подбор снаряжения под любой уровень и бюджет' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={18} className="text-ice-red flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="border-t pt-12 mb-12">
          <h2 className="section-title mb-8 text-center">Официальные партнеры</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['BAUER', 'CCM', 'WARRIOR', 'SHERWOOD', 'FISCHER', 'MAD GUY'].map(b => (
              <div key={b} className="border border-gray-100 px-8 py-4 hover:border-ice-red transition-colors">
                <p className="text-xl font-black text-gray-300 hover:text-ice-red transition-colors">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-ice-black text-white p-8 text-center">
          <p className="text-2xl font-black uppercase mb-2">Нужна консультация?</p>
          <p className="text-gray-400 mb-6">Наши эксперты помогут подобрать снаряжение именно для вас</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:+79934703548" className="btn-red">Позвонить</a>
            <Link href="/contacts" className="btn-outline border-white text-white hover:bg-white hover:text-ice-black">Написать</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
