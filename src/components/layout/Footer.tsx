'use client'
import Link from 'next/link'
import { Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) setEmail('')
    } catch { setStatus('error') }
  }

  return (
    <footer className="bg-ice-black text-white mt-16">
      <div className="container-ice py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 mb-4">
              <span className="text-2xl font-black text-white">ICELINE</span>
              <span className="text-2xl font-black text-ice-red">PRO</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Профессиональное хоккейное снаряжение. Bauer, CCM, Warrior. Официальная гарантия.
            </p>
            <div className="flex gap-3">
              <a href="https://t.me/icelinepro" className="w-9 h-9 bg-ice-graphite flex items-center justify-center hover:bg-ice-red transition-colors" aria-label="Telegram">
                <MessageCircle size={16} />
              </a>
              <a href="https://vk.com/icelinepro" className="w-9 h-9 bg-ice-graphite flex items-center justify-center hover:bg-ice-red transition-colors text-xs font-bold" aria-label="VK">VK</a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Каталог</h3>
            <ul className="space-y-2">
              {[['Хоккейные коньки','/catalog/konki'],['Хоккейные клюшки','/catalog/klyushki'],['Хоккейные шлемы','/catalog/shlemy'],['Перчатки','/catalog/perchatki'],['Хоккейная защита','/catalog/zashita'],['Для вратаря','/catalog/vratar'],['Детское снаряжение','/catalog/detskaya']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-gray-400 hover:text-ice-red transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Информация</h3>
            <ul className="space-y-2">
              {[['О компании','/about'],['Доставка и оплата','/delivery'],['Возврат и обмен','/return'],['Блог','/blog'],['Контакты','/contacts'],['Публичная оферта','/legal/offer'],['Политика конфиденциальности','/legal/privacy']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-gray-400 hover:text-ice-red transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacts + Newsletter */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-sm mb-4">Контакты</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-ice-red mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+79001234567" className="text-sm text-white font-medium hover:text-ice-red">+7 (900) 123-45-67</a>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><Clock size={10} /> Пн–Пт 9:00–20:00</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-ice-red flex-shrink-0" />
                <a href="mailto:info@icelinepro.ru" className="text-sm text-gray-400 hover:text-white">info@icelinepro.ru</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={15} className="text-ice-red flex-shrink-0" />
                <a href="https://t.me/icelinepro" className="text-sm text-gray-400 hover:text-white">@icelinepro</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-4 bg-ice-graphite border-l-2 border-ice-red">
              <p className="text-xs text-gray-400 mb-2">Подпишитесь на акции</p>
              {status === 'ok' ? (
                <p className="text-xs text-green-400 font-bold">✓ Вы подписаны!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Ваш email" className="flex-1 bg-ice-black text-white text-xs px-3 py-2 outline-none border border-ice-graphite focus:border-ice-red" />
                  <button type="submit" disabled={status === 'loading'}
                    className="bg-ice-red text-white px-3 py-2 hover:bg-ice-red-dark transition-colors flex items-center">
                    {status === 'loading' ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={12} />}
                  </button>
                </form>
              )}
              {status === 'error' && <p className="text-xs text-red-400 mt-1">Ошибка. Попробуйте снова</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ice-graphite">
        <div className="container-ice py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 ICELINE PRO. Все права защищены.</p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Visa · Mastercard · МИР · СБП · ЮKassa</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
