import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'ICELINE PRO — Хоккейное снаряжение', template: '%s | ICELINE PRO' },
  description: 'Интернет-магазин хоккейного снаряжения. Коньки, клюшки, защита, шлемы. Бренды Bauer, CCM, Warrior. Доставка по всей России.',
  keywords: ['хоккейные коньки', 'хоккейные клюшки', 'bauer', 'ccm', 'хоккейная защита'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
