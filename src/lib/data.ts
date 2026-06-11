export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  subcategories: { name: string; slug: string }[]
}

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  slug: string
  price: number
  oldPrice?: number
  image: string
  badge?: 'new' | 'sale' | 'hit'
  age?: string
  inStock: boolean
  rating: number
  reviewCount: number
}

export const CATEGORIES: Category[] = [
  {
    id: '1', name: 'Хоккейные коньки', slug: 'konki', icon: '⛸️',
    subcategories: [
      { name: 'Взрослые (SR)', slug: 'konki-sr' },
      { name: 'Подростковые (INT)', slug: 'konki-int' },
      { name: 'Юниорские (JR)', slug: 'konki-jr' },
      { name: 'Детские (YTH)', slug: 'konki-yth' },
      { name: 'Роликовые коньки', slug: 'rolikovye' },
    ]
  },
  {
    id: '2', name: 'Хоккейные клюшки', slug: 'klyushki', icon: '🏒',
    subcategories: [
      { name: 'Взрослые (SR)', slug: 'klyushki-sr' },
      { name: 'Подростковые (INT)', slug: 'klyushki-int' },
      { name: 'Юниорские и Детские', slug: 'klyushki-jr' },
      { name: 'Крюки, Трубы', slug: 'kruki' },
      { name: 'Флорбол', slug: 'florbol' },
    ]
  },
  {
    id: '3', name: 'Хоккейные шлемы', slug: 'shlemy', icon: '⛑️',
    subcategories: [
      { name: 'Хоккейные шлемы', slug: 'shlemy-all' },
      { name: 'Маски, Визоры', slug: 'maski' },
      { name: 'Аксессуары для шлема', slug: 'aksessuary-shlem' },
    ]
  },
  {
    id: '4', name: 'Хоккейные перчатки', slug: 'perchatki', icon: '🥊',
    subcategories: [
      { name: 'Взрослые (SR)', slug: 'perchatki-sr' },
      { name: 'Юниорские и Детские', slug: 'perchatki-jr' },
    ]
  },
  {
    id: '5', name: 'Хоккейная защита', slug: 'zashita', icon: '🛡️',
    subcategories: [
      { name: 'Нагрудники', slug: 'nagrudniki' },
      { name: 'Налокотники', slug: 'nalokotniki' },
      { name: 'Трусы (шорты)', slug: 'trusy' },
      { name: 'Щитки (наколенники)', slug: 'shitki' },
    ]
  },
  {
    id: '6', name: 'Хоккейные шлемы', slug: 'shlemy2', icon: '🎭',
    subcategories: [
      { name: 'Для вратаря', slug: 'vratar' },
      { name: 'Хоккейные сумки', slug: 'sumki' },
    ]
  },
  {
    id: '7', name: 'Для вратаря', slug: 'vratar', icon: '🥅',
    subcategories: [
      { name: 'Вратарские коньки', slug: 'vrat-konki' },
      { name: 'Вратарская защита', slug: 'vrat-zashita' },
      { name: 'Маски вратаря', slug: 'vrat-maski' },
    ]
  },
  {
    id: '8', name: 'Детская, юношеская', slug: 'detskaya', icon: '👦',
    subcategories: [
      { name: 'Детские наборы', slug: 'nabory' },
      { name: 'Детское снаряжение', slug: 'detskoe' },
    ]
  },
]

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Коньки хоккейные Bauer Vapor X5 Pro SR', brand: 'Bauer', category: 'konki',
    slug: 'bauer-vapor-x5-pro-sr', price: 89990, oldPrice: 109990,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    badge: 'sale', age: 'SR', inStock: true, rating: 4.9, reviewCount: 47
  },
  {
    id: '2', name: 'Клюшка CCM Ribcor Trigger 9 SR', brand: 'CCM', category: 'klyushki',
    slug: 'ccm-ribcor-trigger-9-sr', price: 34990,
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=400&h=400&fit=crop',
    badge: 'new', age: 'SR', inStock: true, rating: 4.8, reviewCount: 23
  },
  {
    id: '3', name: 'Шлем Bauer Re-Akt 200 SR', brand: 'Bauer', category: 'shlemy',
    slug: 'bauer-reakt-200-sr', price: 12990, oldPrice: 15990,
    image: 'https://images.unsplash.com/photo-1606921231106-f1083329a65c?w=400&h=400&fit=crop',
    badge: 'sale', age: 'SR', inStock: true, rating: 4.7, reviewCount: 31
  },
  {
    id: '4', name: 'Перчатки CCM Tacks AS-V Pro SR', brand: 'CCM', category: 'perchatki',
    slug: 'ccm-tacks-asv-pro-sr', price: 19990,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    badge: 'hit', age: 'SR', inStock: true, rating: 4.9, reviewCount: 18
  },
  {
    id: '5', name: 'Коньки CCM Jetspeed FT6 Pro SR', brand: 'CCM', category: 'konki',
    slug: 'ccm-jetspeed-ft6-pro-sr', price: 74990, oldPrice: 89990,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    badge: 'sale', age: 'SR', inStock: true, rating: 4.8, reviewCount: 62
  },
  {
    id: '6', name: 'Клюшка Bauer Vapor HyperLite2 SR', brand: 'Bauer', category: 'klyushki',
    slug: 'bauer-vapor-hyperlite2-sr', price: 42990,
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=400&h=400&fit=crop',
    badge: 'new', age: 'SR', inStock: true, rating: 5.0, reviewCount: 9
  },
  {
    id: '7', name: 'Нагрудник Bauer Supreme Mach SR', brand: 'Bauer', category: 'zashita',
    slug: 'bauer-supreme-mach-sr', price: 14990,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    badge: 'hit', age: 'SR', inStock: true, rating: 4.6, reviewCount: 14
  },
  {
    id: '8', name: 'Коньки Bauer Vapor X3 JR', brand: 'Bauer', category: 'konki',
    slug: 'bauer-vapor-x3-jr', price: 29990, oldPrice: 37990,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    badge: 'sale', age: 'JR', inStock: true, rating: 4.7, reviewCount: 28
  },
]

export const BANNERS = [
  {
    id: 1,
    title: 'BAUER VAPOR X5 PRO',
    subtitle: 'Новая коллекция 2026',
    description: 'Профессиональные коньки для максимальной скорости и контроля',
    cta: 'Смотреть',
    href: '/catalog/konki',
    bg: 'from-ice-black to-ice-graphite',
    accent: 'text-ice-red',
  },
  {
    id: 2,
    title: 'РАСПРОДАЖА ДО -40%',
    subtitle: 'Только до конца месяца',
    description: 'Экипировка CCM, Bauer, Warrior по сниженным ценам',
    cta: 'Все скидки',
    href: '/sale',
    bg: 'from-ice-red-dark to-ice-red',
    accent: 'text-white',
  },
  {
    id: 3,
    title: 'ДЕТСКАЯ ЛИНЕЙКА',
    subtitle: 'Для будущих чемпионов',
    description: 'Полные комплекты защиты для детей от 3 лет',
    cta: 'Детям',
    href: '/catalog/detskaya',
    bg: 'from-ice-graphite to-[#1a1a2e]',
    accent: 'text-blue-400',
  },
]
