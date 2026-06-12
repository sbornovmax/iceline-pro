import Link from 'next/link'
import { ChevronRight, Calendar, User } from 'lucide-react'

export const metadata = { title: 'Блог — советы по хоккею' }

const POSTS = [
  { slug: 'kak-vybrat-konki', title: 'Как выбрать хоккейные коньки: полное руководство 2026', category: 'Коньки', date: '10 июня 2026', author: 'Алексей Иванов', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=350&fit=crop', excerpt: 'Правильный выбор коньков — основа хорошей игры. Разбираем на что обратить внимание при покупке коньков для хоккея: размер, жёсткость, материал.' },
  { slug: 'reyting-klyushek-2026', title: 'Рейтинг хоккейных клюшек 2026: Bauer vs CCM vs Warrior', category: 'Клюшки', date: '5 июня 2026', author: 'Дмитрий Смирнов', image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=600&h=350&fit=crop', excerpt: 'Сравниваем топовые модели клюшек 2026 года. Кто победит в споре трёх лидеров рынка?' },
  { slug: 'zashita-dlya-nachinayushih', title: 'Защита для начинающих хоккеистов: что купить в первую очередь', category: 'Защита', date: '1 июня 2026', author: 'Алексей Иванов', image: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719?w=600&h=350&fit=crop', excerpt: 'Если вы только начинаете играть в хоккей, этот гид поможет вам выбрать необходимую защиту без лишних трат.' },
  { slug: 'uhod-za-snarjazheniem', title: 'Уход за хоккейным снаряжением: продлеваем срок службы', category: 'Советы', date: '25 мая 2026', author: 'Дмитрий Смирнов', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=350&fit=crop', excerpt: 'Правильный уход за снаряжением позволяет значительно продлить срок его службы и сохранить защитные свойства.' },
]

export default function BlogPage() {
  return (
    <div className="container-ice py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium">Блог</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="section-title">Блог о хоккее</h1>
      </div>

      {/* Featured post */}
      <div className="mb-8">
        <Link href={`/blog/${POSTS[0].slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-100 hover:border-ice-red overflow-hidden transition-all">
          <div className="aspect-video md:aspect-auto overflow-hidden">
            <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="badge-new mb-3">{POSTS[0].category}</span>
            <h2 className="text-2xl font-black mb-3 group-hover:text-ice-red transition-colors leading-tight">{POSTS[0].title}</h2>
            <p className="text-gray-500 text-sm mb-4">{POSTS[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Calendar size={12} />{POSTS[0].date}</span>
              <span className="flex items-center gap-1"><User size={12} />{POSTS[0].author}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Other posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.slice(1).map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group border border-gray-100 hover:border-ice-red overflow-hidden transition-all">
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ice-red">{post.category}</span>
              <h3 className="font-black text-sm mt-1 mb-2 leading-snug group-hover:text-ice-red transition-colors line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
