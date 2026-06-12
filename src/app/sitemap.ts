import { MetadataRoute } from 'next'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://iceline-pro.vercel.app'
  const now = new Date()

  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/catalog`, priority: 0.9 },
    { url: `${base}/sale`, priority: 0.8 },
    { url: `${base}/delivery`, priority: 0.7 },
    { url: `${base}/about`, priority: 0.6 },
    { url: `${base}/contacts`, priority: 0.6 },
    { url: `${base}/return`, priority: 0.5 },
  ].map(({ url, priority }) => ({ url, lastModified: now, changeFrequency: 'weekly' as const, priority }))

  const categoryPages = CATEGORIES.flatMap(cat => [
    { url: `${base}/catalog/${cat.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.8 },
    ...cat.subcategories.map(sub => ({
      url: `${base}/catalog/${sub.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.7,
    })),
  ])

  const productPages = PRODUCTS.map(p => ({
    url: `${base}/product/${p.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
