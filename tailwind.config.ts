import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ice: {
          black: '#0C0C0C',
          dark: '#1A1A1A',
          graphite: '#2A2A2A',
          red: '#D10000',
          'red-dark': '#A80000',
          'red-light': '#FF1A1A',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          'gray-mid': '#9CA3AF',
          border: '#2E2E2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
