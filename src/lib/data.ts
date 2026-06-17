export type Category = {
  id: string; name: string; slug: string; icon: string
  subcategories: { name: string; slug: string }[]
}
export type Product = {
  id: string; name: string; brand: string; category: string; slug: string
  price: number; oldPrice?: number; image: string; badge?: 'new' | 'sale' | 'hit'
  age?: string; inStock: boolean; rating: number; reviewCount: number
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Хоккейные коньки', slug: 'konki', icon: 'skates',
    subcategories: [{ name: 'Взрослые (SR)', slug: 'konki-sr' }, { name: 'Подростковые (INT)', slug: 'konki-int' }, { name: 'Юниорские (JR)', slug: 'konki-jr' }, { name: 'Детские (YTH)', slug: 'konki-yth' }, { name: 'Роликовые коньки', slug: 'rolikovye' }]
  },
  { id: '2', name: 'Хоккейные клюшки', slug: 'klyushki', icon: 'stick',
    subcategories: [{ name: 'Взрослые (SR)', slug: 'klyushki-sr' }, { name: 'Подростковые (INT)', slug: 'klyushki-int' }, { name: 'Юниорские (JR)', slug: 'klyushki-jr' }, { name: 'Детские (YTH)', slug: 'klyushki-yth' }, { name: 'Крюки, Трубы', slug: 'kruki' }, { name: 'Флорбол', slug: 'florbol' }]
  },
  { id: '3', name: 'Хоккейные шлемы', slug: 'shlemy', icon: 'helmet',
    subcategories: [{ name: 'Хоккейные шлемы', slug: 'shlemy-all' }, { name: 'Маски, Визоры', slug: 'maski' }, { name: 'Аксессуары для шлема', slug: 'aksessuary-shlem' }]
  },
  { id: '4', name: 'Хоккейные перчатки', slug: 'perchatki', icon: 'gloves',
    subcategories: [{ name: 'Взрослые (SR)', slug: 'perchatki-sr' }, { name: 'Подростковые (INT)', slug: 'perchatki-int' }, { name: 'Юниорские (JR)', slug: 'perchatki-jr' }, { name: 'Детские (YTH)', slug: 'perchatki-yth' }]
  },
  { id: '5', name: 'Хоккейная защита', slug: 'zashita', icon: 'protection',
    subcategories: [{ name: 'Нагрудники', slug: 'nagrudniki' }, { name: 'Налокотники', slug: 'nalokotniki' }, { name: 'Трусы (шорты)', slug: 'trusy' }, { name: 'Щитки (наколенники)', slug: 'shitki' }]
  },
  { id: '6', name: 'Хоккейные аксессуары', slug: 'aksessuary', icon: 'bag',
    subcategories: [{ name: 'Хоккейные сумки', slug: 'sumki' }, { name: 'Тейп и лента', slug: 'tejp' }, { name: 'Стельки', slug: 'stelki' }]
  },
  { id: '7', name: 'Для вратаря', slug: 'vratar', icon: 'goalie',
    subcategories: [{ name: 'Вратарские коньки', slug: 'vrat-konki' }, { name: 'Вратарские перчатки', slug: 'vrat-perchatki' }, { name: 'Вратарские шлемы', slug: 'vrat-shlemy' }, { name: 'Вратарские нагрудники', slug: 'vrat-nagrudniki' }, { name: 'Вратарские налокотники', slug: 'vrat-nalokotniki' }, { name: 'Вратарские трусы (шорты)', slug: 'vrat-trusy' }, { name: 'Вратарские щитки (наколенники)', slug: 'vrat-shitki' }, { name: 'Маски вратаря', slug: 'vrat-maski' }]
  },
  { id: '8', name: 'Для детей', slug: 'detskaya', icon: 'kids',
    subcategories: [{ name: 'Детские наборы', slug: 'nabory' }, { name: 'Детское снаряжение', slug: 'detskoe' }]
  },
]

const S = {
  s1: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=400&fit=crop',
  s2: 'https://images.unsplash.com/photo-1520382496291-7d39e4a44a44?w=400&h=400&fit=crop',
  s3: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
  s4: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=400&fit=crop',
  k1: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=400&h=400&fit=crop',
  k2: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=400&h=400&fit=crop',
  h1: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop',
  h2: 'https://images.unsplash.com/photo-1606921231106-f1083329a65c?w=400&h=400&fit=crop',
  g1: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop',
  g2: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
  p1: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719?w=400&h=400&fit=crop',
  p2: 'https://images.unsplash.com/photo-1547944022-a78c08b5ec47?w=400&h=400&fit=crop',
}

export const PRODUCTS: Product[] = [
  // Коньки
  { id: '1', name: 'Коньки Bauer Vapor X5 Pro SR', brand: 'Bauer', category: 'konki', slug: 'bauer-vapor-x5-pro-sr', price: 89990, oldPrice: 109990, image: S.s1, badge: 'sale', age: 'SR', inStock: true, rating: 4.9, reviewCount: 47 },
  { id: '2', name: 'Коньки CCM Jetspeed FT6 Pro SR', brand: 'CCM', category: 'konki', slug: 'ccm-jetspeed-ft6-pro-sr', price: 74990, oldPrice: 89990, image: S.s2, badge: 'sale', age: 'SR', inStock: true, rating: 4.8, reviewCount: 62 },
  { id: '3', name: 'Коньки Bauer Supreme Mach SR', brand: 'Bauer', category: 'konki', slug: 'bauer-supreme-mach-sr', price: 99990, image: S.s3, badge: 'new', age: 'SR', inStock: true, rating: 5.0, reviewCount: 18 },
  { id: '4', name: 'Коньки Bauer Vapor X3 JR', brand: 'Bauer', category: 'konki', slug: 'bauer-vapor-x3-jr', price: 29990, oldPrice: 37990, image: S.s4, badge: 'sale', age: 'JR', inStock: true, rating: 4.7, reviewCount: 28 },
  { id: '5', name: 'Коньки CCM Tacks AS-570 INT', brand: 'CCM', category: 'konki', slug: 'ccm-tacks-as570-int', price: 22990, image: S.s1, age: 'INT', inStock: true, rating: 4.6, reviewCount: 15 },
  { id: '6', name: 'Коньки Bauer X-LP YTH', brand: 'Bauer', category: 'konki', slug: 'bauer-x-lp-yth', price: 8990, oldPrice: 12990, image: S.s2, badge: 'sale', age: 'YTH', inStock: true, rating: 4.5, reviewCount: 33 },

  // Клюшки
  { id: '7', name: 'Клюшка CCM Ribcor Trigger 9 SR', brand: 'CCM', category: 'klyushki', slug: 'ccm-ribcor-trigger-9-sr', price: 34990, image: S.k1, badge: 'new', age: 'SR', inStock: true, rating: 4.8, reviewCount: 23 },
  { id: '8', name: 'Клюшка Bauer Vapor HyperLite2 SR', brand: 'Bauer', category: 'klyushki', slug: 'bauer-vapor-hyperlite2-sr', price: 42990, image: S.k2, badge: 'new', age: 'SR', inStock: true, rating: 5.0, reviewCount: 9 },
  { id: '9', name: 'Клюшка Warrior Covert QRE 30 SR', brand: 'Warrior', category: 'klyushki', slug: 'warrior-covert-qre30-sr', price: 18990, oldPrice: 24990, image: S.k1, badge: 'sale', age: 'SR', inStock: true, rating: 4.6, reviewCount: 41 },
  { id: '10', name: 'Клюшка Sherwood Rekker M90 SR', brand: 'Sherwood', category: 'klyushki', slug: 'sherwood-rekker-m90-sr', price: 15990, image: S.k2, age: 'SR', inStock: true, rating: 4.4, reviewCount: 19 },
  { id: '11', name: 'Клюшка CCM Ribcor Trigger 9 JR', brand: 'CCM', category: 'klyushki', slug: 'ccm-ribcor-trigger-9-jr', price: 14990, image: S.k1, badge: 'new', age: 'JR', inStock: true, rating: 4.7, reviewCount: 12 },

  // Шлемы
  { id: '12', name: 'Шлем Bauer Re-Akt 200 SR', brand: 'Bauer', category: 'shlemy', slug: 'bauer-reakt-200-sr', price: 12990, oldPrice: 15990, image: S.h1, badge: 'sale', age: 'SR', inStock: true, rating: 4.7, reviewCount: 31 },
  { id: '13', name: 'Шлем CCM Tacks 720 SR', brand: 'CCM', category: 'shlemy', slug: 'ccm-tacks-720-sr', price: 9990, image: S.h2, badge: 'hit', age: 'SR', inStock: true, rating: 4.6, reviewCount: 44 },
  { id: '14', name: 'Шлем Bauer IMS 11.0 JR', brand: 'Bauer', category: 'shlemy', slug: 'bauer-ims-110-jr', price: 7990, image: S.h1, age: 'JR', inStock: true, rating: 4.5, reviewCount: 22 },

  // Перчатки
  { id: '15', name: 'Перчатки CCM Tacks AS-V Pro SR', brand: 'CCM', category: 'perchatki', slug: 'ccm-tacks-asv-pro-sr', price: 19990, image: S.g1, badge: 'hit', age: 'SR', inStock: true, rating: 4.9, reviewCount: 18 },
  { id: '16', name: 'Перчатки Bauer Vapor 3X Pro SR', brand: 'Bauer', category: 'perchatki', slug: 'bauer-vapor-3x-pro-sr', price: 17990, oldPrice: 21990, image: S.g2, badge: 'sale', age: 'SR', inStock: true, rating: 4.7, reviewCount: 27 },
  { id: '17', name: 'Перчатки Warrior Covert QRE 30 SR', brand: 'Warrior', category: 'perchatki', slug: 'warrior-covert-qre30-perchatki', price: 12990, image: S.g1, age: 'SR', inStock: true, rating: 4.5, reviewCount: 16 },

  // Защита
  { id: '18', name: 'Нагрудник Bauer Supreme Mach SR', brand: 'Bauer', category: 'zashita', slug: 'bauer-supreme-mach-sr-nagrudnik', price: 14990, image: S.p1, badge: 'hit', age: 'SR', inStock: true, rating: 4.6, reviewCount: 14 },
  { id: '19', name: 'Щитки CCM Tacks AS-V SR', brand: 'CCM', category: 'zashita', slug: 'ccm-tacks-asv-shitki', price: 8990, oldPrice: 11990, image: S.p2, badge: 'sale', age: 'SR', inStock: true, rating: 4.5, reviewCount: 20 },
  { id: '20', name: 'Трусы Bauer Vapor 3X SR', brand: 'Bauer', category: 'zashita', slug: 'bauer-vapor-3x-trusy', price: 7990, image: S.p1, age: 'SR', inStock: true, rating: 4.4, reviewCount: 11 },
  { id: '21', name: 'Налокотники CCM Super Tacks X SR', brand: 'CCM', category: 'zashita', slug: 'ccm-super-tacks-x-nalokot', price: 6990, image: S.p2, badge: 'new', age: 'SR', inStock: true, rating: 4.6, reviewCount: 8 },
]

export const BANNERS = [
  { id: 1, title: 'BAUER VAPOR X5 PRO', subtitle: 'Новая коллекция 2026', description: 'Профессиональные коньки для максимальной скорости', cta: 'Смотреть', href: '/catalog/konki', bg: 'from-ice-black to-ice-graphite', accent: 'text-ice-red' },
  { id: 2, title: 'РАСПРОДАЖА ДО -40%', subtitle: 'Только до конца месяца', description: 'Экипировка CCM, Bauer, Warrior по сниженным ценам', cta: 'Все скидки', href: '/sale', bg: 'from-ice-red-dark to-ice-red', accent: 'text-white' },
  { id: 3, title: 'ДЕТСКАЯ ЛИНЕЙКА', subtitle: 'Для будущих чемпионов', description: 'Полные комплекты защиты для детей от 3 лет', cta: 'Детям', href: '/catalog/detskaya', bg: 'from-ice-graphite to-[#1a1a2e]', accent: 'text-blue-400' },
]
