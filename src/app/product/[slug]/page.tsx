'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, BarChart2, ChevronRight, Star, Truck, RefreshCw, Shield, ZoomIn } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const SIZES_SKATES = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11']
const SIZE_TABLE = [
  { size: '5', foot: '22-22.5', height: '100-110' },
  { size: '6', foot: '23-23.5', height: '110-120' },
  { size: '7', foot: '24-24.5', height: '120-130' },
  { size: '8', foot: '25-25.5', height: '130-145' },
  { size: '9', foot: '26-26.5', height: '145-160' },
  { size: '10', foot: '27-27.5', height: '160-175' },
  { size: '11', foot: '28-28.5', height: '175-190' },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find(p => p.slug === params.slug) ?? PRODUCTS[0]
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [fav, setFav] = useState(false)
  const [activeTab, setActiveTab] = useState<'chars' | 'reviews' | 'size' | 'delivery'>('chars')
  const [zoom, setZoom] = useState(false)

  const images = [product.image, product.image, product.image]
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="container-ice py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-ice-red">Главная</Link>
        <ChevronRight size={12} />
        <Link href="/catalog" className="hover:text-ice-red">Каталог</Link>
        <ChevronRight size={12} />
        <span className="text-ice-black font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative bg-ice-gray aspect-square overflow-hidden group cursor-zoom-in" onClick={() => setZoom(true)}>
            <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={16} className="text-gray-600" />
            </div>
            {discount && <span className="absolute top-3 left-3 badge-sale">-{discount}%</span>}
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`w-20 h-20 border-2 overflow-hidden transition-all ${activeImg === i ? 'border-ice-red' : 'border-transparent hover:border-gray-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ice-red mb-1">{product.brand}</p>
            <h1 className="text-2xl font-black text-ice-black leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current'} />
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.rating} ({product.reviewCount} отзывов)</span>
              <span className={`text-xs font-bold px-2 py-0.5 ${product.inStock ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                {product.inStock ? '✓ В наличии' : '✗ Нет в наличии'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-ice-black">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>}
            {discount && <span className="badge-sale mb-1 text-sm">-{discount}%</span>}
          </div>

          {/* Ya.Split */}
          <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 flex items-center gap-3">
            <span className="text-amber-600 font-bold text-sm">Я.Сплит</span>
            <span className="text-sm text-gray-600">от {Math.round(product.price / 4).toLocaleString('ru-RU')} ₽ × 4 платежа</span>
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold uppercase tracking-wider">Размер</p>
              <button onClick={() => setActiveTab('size')} className="text-xs text-ice-red hover:text-ice-black underline">Таблица размеров</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES_SKATES.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border-2 text-sm font-semibold transition-all ${selectedSize === size ? 'border-ice-red bg-ice-red text-white' : 'border-gray-200 text-gray-600 hover:border-ice-red hover:text-ice-red'}`}>
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-400 mt-1">Выберите размер</p>}
          </div>

          {/* Qty + Add to cart */}
          <div className="flex gap-3">
            <div className="flex border border-gray-200">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-bold">−</button>
              <span className="w-12 h-12 flex items-center justify-center font-bold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-bold">+</button>
            </div>
            <button className="btn-red flex-1 text-base py-3">
              <ShoppingCart size={18} />
              В корзину
            </button>
          </div>

          {/* Buy now + Consult */}
          <div className="flex gap-3">
            <button className="btn-black flex-1">Купить сейчас</button>
            <button onClick={() => setFav(!fav)}
              className={`w-12 h-12 border-2 flex items-center justify-center transition-all ${fav ? 'border-ice-red bg-ice-red text-white' : 'border-gray-200 hover:border-ice-red hover:text-ice-red'}`}>
              <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button className="w-12 h-12 border-2 border-gray-200 flex items-center justify-center hover:border-ice-red hover:text-ice-red transition-all">
              <BarChart2 size={18} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="border border-gray-100 p-4 space-y-3">
            {[
              { icon: Truck, text: 'Доставка СДЭК, Почта России' },
              { icon: RefreshCw, text: 'Возврат 14 дней' },
              { icon: Shield, text: 'Гарантия оригинальности' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                <Icon size={16} className="text-ice-red flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {[
            { id: 'chars', label: 'Характеристики' },
            { id: 'size', label: 'Таблица размеров' },
            { id: 'reviews', label: `Отзывы (${product.reviewCount})` },
            { id: 'delivery', label: 'Доставка и оплата' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id as any)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === id ? 'border-ice-red text-ice-red' : 'border-transparent text-gray-500 hover:text-ice-black'}`}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'chars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              ['Бренд', product.brand],
              ['Категория', 'Хоккейные коньки'],
              ['Возраст', product.age ?? '—'],
              ['Материал лезвия', 'Нержавеющая сталь'],
              ['Материал ботинка', 'Термопластичный полиуретан'],
              ['Профиль лезвия', '9" / 10" (Quad)'],
              ['Гарантия', '12 месяцев'],
              ['Страна', 'Канада'],
            ].map(([key, value], i) => (
              <div key={key} className={`flex items-center py-3 px-4 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                <span className="w-48 text-gray-500 font-medium">{key}</span>
                <span className="font-semibold text-ice-black">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'size' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ice-black text-white">
                  <th className="py-3 px-4 text-left font-bold">Размер</th>
                  <th className="py-3 px-4 text-left font-bold">Длина стопы (см)</th>
                  <th className="py-3 px-4 text-left font-bold">Рост (см)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_TABLE.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 font-bold text-ice-red">{row.size}</td>
                    <td className="py-3 px-4">{row.foot}</td>
                    <td className="py-3 px-4">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4 p-5 bg-gray-50">
              <div className="text-center">
                <p className="text-4xl font-black text-ice-black">{product.rating}</p>
                <div className="flex mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-amber-400 fill-current" />)}
                </div>
                <p className="text-xs text-gray-400 mt-1">{product.reviewCount} отзывов</p>
              </div>
            </div>
            {[
              { name: 'Александр К.', rating: 5, text: 'Отличные коньки! Сидят как влитые, очень удобные. Доставили быстро, упаковка хорошая.', date: '15 мая 2026' },
              { name: 'Иван М.', rating: 4, text: 'Хорошее качество за свои деньги. Бал немного удивлён размером — советую взять на полразмера больше.', date: '10 мая 2026' },
            ].map(r => (
              <div key={r.name} className="border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{r.name}</span>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <div className="flex mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= r.rating ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current'} />)}
                </div>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            ))}
            <button className="btn-outline w-full">Написать отзыв</button>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="max-w-2xl space-y-4">
            {[
              { title: 'СДЭК', desc: 'Доставка в пункты выдачи и курьером. Срок 2-7 дней. Бесплатно от 5 000 ₽.' },
              { title: 'Почта России', desc: 'Доставка в отделения почты. Срок 5-14 дней.' },
              { title: 'Самовывоз', desc: 'Бесплатно при наличии магазина в вашем городе.' },
            ].map(d => (
              <div key={d.title} className="flex gap-4 p-4 border border-gray-100">
                <Truck size={20} className="text-ice-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">{d.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
            <div className="p-4 border border-gray-100">
              <p className="font-bold text-sm mb-2">Оплата</p>
              <p className="text-sm text-gray-500">Карта Visa/Mastercard · СБП · ЮKassa · Наличными при самовывозе · Рассрочка Я.Сплит</p>
            </div>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-ice-red" />
            <h2 className="section-title">Похожие товары</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <div key={p.id} className="border border-gray-100 hover:border-ice-red transition-colors group">
                <Link href={`/product/${p.slug}`} className="block aspect-square overflow-hidden bg-ice-gray">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </Link>
                <div className="p-3">
                  <p className="text-[10px] text-ice-red font-bold mb-0.5">{p.brand}</p>
                  <Link href={`/product/${p.slug}`} className="text-xs font-semibold line-clamp-2 hover:text-ice-red">{p.name}</Link>
                  <p className="font-black text-sm mt-1">{p.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
