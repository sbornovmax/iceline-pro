import { Truck, Shield, RefreshCw, Headphones, Award, CreditCard } from 'lucide-react'

const ADVANTAGES = [
  { icon: Truck, title: 'Быстрая доставка', desc: 'СДЭК, Почта России по всей стране' },
  { icon: Shield, title: 'Гарантия качества', desc: 'Только оригинальная продукция от официальных дистрибьюторов' },
  { icon: RefreshCw, title: 'Возврат 14 дней', desc: 'Легкий возврат и обмен товара без лишних вопросов' },
  { icon: Headphones, title: 'Поддержка 24/7', desc: 'Опытные консультанты помогут подобрать снаряжение' },
  { icon: Award, title: 'Топ бренды', desc: 'Bauer, CCM, Warrior, Sherwood, Fischer и другие' },
  { icon: CreditCard, title: 'Удобная оплата', desc: 'Карта, СБП, ЮKassa, Т-Банк. Рассрочка Я.Сплит' },
]

export default function WhyUs() {
  return (
    <section className="py-12 bg-ice-black text-white">
      <div className="container-ice">
        <div className="text-center mb-10">
          <p className="text-ice-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Почему выбирают нас</p>
          <h2 className="text-3xl font-black uppercase">ICELINE PRO — ваш надежный<br />хоккейный магазин</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 border border-ice-graphite hover:border-ice-red transition-colors group">
              <div className="w-12 h-12 bg-ice-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ice-red transition-colors">
                <Icon size={22} className="text-ice-red group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
