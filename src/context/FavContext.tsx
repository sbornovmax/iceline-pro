'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product } from '@/lib/data'

type FavCtx = {
  items: Product[]
  count: number
  toggle: (product: Product) => void
  isFav: (id: string) => boolean
}

const FavContext = createContext<FavCtx | null>(null)

export function FavProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const toggle = useCallback((product: Product) => {
    setItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isFav = useCallback((id: string) => items.some(p => p.id === id), [items])

  return (
    <FavContext.Provider value={{ items, count: items.length, toggle, isFav }}>
      {children}
    </FavContext.Provider>
  )
}

export function useFav() {
  const ctx = useContext(FavContext)
  if (!ctx) throw new Error('useFav outside FavProvider')
  return ctx
}
