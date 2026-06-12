import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import { FavProvider } from '@/context/FavContext'
import FloatingWidget from '@/components/ui/FloatingWidget'
import CookieBanner from '@/components/ui/CookieBanner'
import YandexMetrika from '@/components/seo/YandexMetrika'

export const metadata: Metadata = {
  title: { default: 'ICELINE PRO — Хоккейное снаряжение', template: '%s | ICELINE PRO' },
  description: 'Интернет-магазин хоккейного снаряжения №1. Коньки, клюшки, защита, шлемы. Bauer, CCM, Warrior. Доставка СДЭК по всей России.',
  keywords: ['хоккейные коньки', 'хоккейные клюшки', 'bauer', 'ccm', 'warrior', 'хоккейная защита', 'купить коньки'],
  openGraph: {
    title: 'ICELINE PRO — Хоккейное снаряжение',
    description: 'Профессиональное хоккейное снаряжение',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ICELINE PRO',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <YandexMetrika />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <FavProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingWidget />
            <CookieBanner />
          </FavProvider>
        </CartProvider>
      </body>
    </html>
  )
}
