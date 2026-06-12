import Link from 'next/link'
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/catalog/ProductCard'

const POSTS: Record<string, { title: string; category: string; date: string; author: string; image: string; content: string }> = {
  'kak-vybrat-konki': {
    title: 'Как выбрать хоккейные коньки: полное руководство 2026',
    category: 'Коньки', date: '10 июня 2026', author: 'Алексей Иванов',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&h=500&fit=crop',
    content: `
Правильный выбор хоккейных коньков — это основа вашей игры. Неправильно подобранные коньки могут не только снизить ваши показатели, но и привести к травмам.

## Размер коньков

Размер хоккейных коньков обычно на 1-1,5 размера меньше обычной обуви. Например, если вы носите кроссовки 42-го размера, вам подойдут коньки 40-40.5.

**Как проверить размер:**
- Наденьте коньки и зашнуруйте их
- Пальцы должны едва касаться носка ботинка
- Пятка должна плотно сидеть без проскальзывания
- Между пальцами и носком должно быть 3-5 мм

## Жёсткость ботинка

Жёсткость — один из ключевых параметров. Чем жёстче ботинок, тем больше поддержки и тем быстрее передача усилий на лёд.

- **Начинающие** — мягкие коньки (60-70 Flex)
- **Любители** — средние коньки (70-80 Flex)
- **Продвинутые** — жёсткие коньки (80-90 Flex)
- **Профессионалы** — очень жёсткие (90+ Flex)

## Топовые модели 2026

**Bauer Vapor X5 Pro** — лучший выбор для скоростных игроков. Анатомический ботинок, технология 3D Lasted Construction обеспечивает превосходную посадку.

**CCM Jetspeed FT6 Pro** — идеальны для тех, кто ценит манёвренность. Лёгкая конструкция и точная передача усилий.

## Вывод

Инвестируйте в качественные коньки — это самое важное снаряжение хоккеиста. Не экономьте на посадке и жёсткости, подходящей вашему уровню.
    `,
  },
  'reyting-klyushek-2026': {
    title: 'Рейтинг хоккейных клюшек 2026: Bauer vs CCM vs Warrior',
    category: 'Клюшки', date: '5 июня 2026', author: 'Дмитрий Смирнов',
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=1200&h=500&fit=crop',
    content: `
Каждый сезон производители выпускают новые модели клюшек с улучшенными характеристиками. В 2026 году борьба за звание лучшей клюшки разгорелась между тремя гигантами.

## Bauer Vapor HyperLite2

Флагман Bauer в 2026 году. Вес — рекордные 390 граммов. Технология DuraFlex обеспечивает превосходный бросок.

**Плюсы:** лёгкий, отличный бросок, долговечный
**Минусы:** высокая цена

## CCM Ribcor Trigger 9

Клюшка для игроков, предпочитающих кистевые броски. Технология Sigmatex Carbon делает её одной из самых мощных.

**Плюсы:** мощный бросок, хорошая чувствительность шайбы
**Минусы:** чуть тяжелее конкурентов

## Warrior Covert QRE SuperLight

Тёмная лошадка сезона. Отличное соотношение цена/качество для любительского уровня.

**Итог:** Для профессионалов — Bauer HyperLite2, для любителей — Warrior Covert.
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug]
  if (!post) return <div className="container-ice py-20 text-center"><p>Статья не найдена</p><Link href="/blog" className="btn-red mt-4 inline-flex">← Блог</Link></div>

  const related = PRODUCTS.filter(p => p.badge === 'new' || p.badge === 'hit').slice(0, 4)

  const paragraphs = post.content.trim().split('\n\n')

  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/blog" className="hover:text-ice-red">Блог</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium truncate">{post.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-ice-red transition-colors mb-6">
          <ArrowLeft size={14} /> Все статьи
        </Link>

        <span className="badge-new mb-4 inline-block">{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
          <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
        </div>

        <div className="aspect-video overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none space-y-4">
          {paragraphs.map((p, i) => {
            if (p.startsWith('## ')) return (
              <h2 key={i} className="text-xl font-black uppercase mt-8 mb-3 text-ice-black">
                {p.replace('## ', '')}
              </h2>
            )
            if (p.startsWith('**') && p.includes(':**')) return (
              <div key={i} className="bg-ice-gray p-4 border-l-2 border-ice-red">
                <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            )
            if (p.includes('- **')) {
              const lines = p.split('\n').filter(Boolean)
              return (
                <ul key={i} className="space-y-1.5">
                  {lines.map((line, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-ice-red mt-1">•</span>
                      <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
          })}
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-8 bg-ice-red" />
          <h2 className="section-title">Товары из статьи</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
