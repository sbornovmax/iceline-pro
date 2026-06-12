import Link from 'next/link'
import { ChevronRight, CreditCard, Shield, Clock, Smartphone } from 'lucide-react'

export const metadata = { title: 'Оплата' }

export default function PaymentPage() {
  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Оплата</span>
      </nav>

      <h1 className="section-title mb-8">Способы оплаты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          {
            icon: CreditCard, title: 'Банковская карта', color: 'bg-blue-50 border-blue-200',
            desc: 'Оплата картами Visa, Mastercard и МИР через защищённый платёжный шлюз ЮKassa. Данные вашей карты не хранятся на нашем сайте.',
            details: ['Мгновенное зачисление', 'SSL шифрование 256-bit', 'Поддержка 3D-Secure'],
          },
          {
            icon: Smartphone, title: 'СБП — Система быстрых платежей', color: 'bg-green-50 border-green-200',
            desc: 'Оплата через QR-код или ссылку напрямую с банковского счёта. Мгновенное зачисление без комиссии.',
            details: ['Без комиссии', 'Мгновенное зачисление', 'Любой банк РФ'],
          },
          {
            icon: CreditCard, title: 'Тинькофф Касса', color: 'bg-yellow-50 border-yellow-200',
            desc: 'Оплата через Тинькофф Pay. Удобно для клиентов Тинькофф Банка — платёж в один клик.',
            details: ['Кешбэк до 30%', 'Оплата в 1 клик', 'Рассрочка 0%'],
          },
          {
            icon: Clock, title: 'Я.Сплит — рассрочка', color: 'bg-purple-50 border-purple-200',
            desc: 'Купите сейчас, платите частями. Разбейте платёж на 4 равные части без процентов и переплат.',
            details: ['4 платежа без %', 'Одобрение за 1 мин', 'Без справок'],
          },
        ].map(({ icon: Icon, title, color, desc, details }) => (
          <div key={title} className={`border p-6 ${color}`}>
            <Icon size={28} className="mb-3 text-gray-600" />
            <h2 className="font-black text-lg mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{desc}</p>
            <ul className="space-y-1">
              {details.map(d => (
                <li key={d} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="text-green-500">✓</span>{d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Security block */}
      <div className="bg-ice-black text-white p-8 flex flex-col md:flex-row items-center gap-6">
        <Shield size={48} className="text-ice-red flex-shrink-0" />
        <div>
          <h3 className="font-black text-xl mb-2">Безопасность платежей</h3>
          <p className="text-gray-400 text-sm">Все платежи обрабатываются через сертифицированные платёжные системы. Мы никогда не храним данные вашей карты. Ваша персональная информация защищена протоколом SSL.</p>
        </div>
      </div>
    </div>
  )
}
