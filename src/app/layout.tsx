import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import FloatingWidget from '@/components/ui/FloatingWidget'
import CookieBanner from '@/components/ui/CookieBanner'
import YandexMetrika from '@/components/seo/YandexMetrika'

export const metadata: Metadata = {
  title: { default: 'ICELINE PRO — Хоккейное снаряжение', template: '%s | ICELINE PRO' },
  description: 'Интернет-магазин хоккейного снаряжения №1. Коньки, клюшки, защита, шлемы. Bauer, CCM, Warrior. Доставка СДЭК по всей России. Гарантия оригинальности.',
  keywords: ['хоккейные коньки', 'хоккейные клюшки', 'bauer', 'ccm', 'warrior', 'хоккейная защита', 'хоккейное снаряжение', 'купить коньки', 'купить клюшку'],
  authors: [{ name: 'ICELINE PRO' }],
  creator: 'ICELINE PRO',
  openGraph: {
    title: 'ICELINE PRO — Хоккейное снаряжение',
    description: 'Профессиональное хоккейное снаряжение: коньки Bauer, клюшки CCM, защита Warrior',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ICELINE PRO',
  },
  robots: { index: true, follow: true },
  verification: {
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <YandexMetrika />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWidget />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}
