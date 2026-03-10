import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: '#6A0F1F',
          50: '#F5E8EB',
          100: '#E8D1D6',
          200: '#CEA3AD',
          300: '#B47584',
          400: '#9A475B',
          500: '#6A0F1F',
          600: '#5A0D1A',
          700: '#4A0A15',
          800: '#3A0810',
          900: '#2A050B',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-clash)', 'var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-wine': 'linear-gradient(135deg, #6A0F1F 0%, #4A0A15 100%)',
        'gradient-wine-soft': 'linear-gradient(135deg, rgba(106, 15, 31, 0.1) 0%, rgba(74, 10, 21, 0.1) 100%)',
        'gradient-primary': 'var(--color-gradient)',
        'gradient-primary-soft': 'var(--color-gradient-soft)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
