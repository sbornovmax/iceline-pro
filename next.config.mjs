/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  // Enable standalone output for Docker/VPS deployment
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      { source: '/admin', destination: '/admin', permanent: false },
    ]
  },
}

export default nextConfig
