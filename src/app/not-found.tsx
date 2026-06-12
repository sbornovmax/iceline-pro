import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-ice py-24 text-center">
      <div className="max-w-md mx-auto">
        <p className="text-[120px] font-black leading-none text-ice-gray">404</p>
        <div className="w-full h-1 bg-ice-red mb-8" />
        <h1 className="text-2xl font-black uppercase mb-3">Страница не найдена</h1>
        <p className="text-gray-400 mb-8">Возможно, страница была удалена или вы ввели неверный адрес</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-red">На главную</Link>
          <Link href="/catalog" className="btn-outline">Каталог</Link>
        </div>
        <div className="mt-12 flex justify-center gap-6 text-sm text-gray-400">
          {[['Доставка','/delivery'],['Контакты','/contacts'],['Распродажа','/sale']].map(([l,h]) => (
            <Link key={h} href={h} className="hover:text-ice-red transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
