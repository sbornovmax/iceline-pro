import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: { default: 'ICELINE PRO — Хоккейное снаряжение', template: '%s | ICELINE PRO' },
  description: 'Интернет-магазин хоккейного снаряжения. Коньки, клюшки, защита, шлемы. Bauer, CCM, Warrior. Доставка по всей России.',
  keywords: ['хоккейные коньки', 'хоккейные клюшки', 'bauer', 'ccm', 'хоккейная защита', 'хоккейное снаряжение'],
  openGraph: {
    title: 'ICELINE PRO — Хоккейное снаряжение',
    description: 'Интернет-магазин хоккейного снаряжения',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
