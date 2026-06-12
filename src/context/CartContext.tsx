'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product } from '@/lib/data'

export type CartItem = Product & { qty: number; size: string }

type CartCtx = {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: Product, size?: string) => void
  removeItem: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, size = '') => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size)
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1, size }]
    })
  }, [])

  const removeItem = useCallback((id: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }, [])

  const updateQty = useCallback((id: string, size: string, qty: number) => {
    if (qty < 1) { removeItem(id, size); return }
    setItems(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart outside CartProvider')
  return ctx
}
