import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/admin-login/', '/account/', '/checkout/'] },
      { userAgent: 'Yandex', allow: '/' },
    ],
    sitemap: 'https://iceline-pro.vercel.app/sitemap.xml',
  }
}
