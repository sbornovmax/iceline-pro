'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = sessionStorage.getItem('cookies-accepted')
    if (!accepted) setTimeout(() => setVisible(true), 2000)
  }, [])

  const accept = () => {
    sessionStorage.setItem('cookies-accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-ice-black text-white p-4 shadow-2xl animate-slide-up border-t-2 border-ice-red">
      <div className="container-ice flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая использование сайта, вы соглашаетесь с{' '}
          <Link href="/legal/privacy" className="underline text-white hover:text-ice-red">политикой конфиденциальности</Link>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={accept} className="bg-ice-red text-white px-5 py-2 text-sm font-bold hover:bg-ice-red-dark transition-colors whitespace-nowrap">
            Принять
          </button>
          <button onClick={accept} className="border border-gray-600 text-gray-300 px-5 py-2 text-sm hover:border-gray-400 transition-colors whitespace-nowrap">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
