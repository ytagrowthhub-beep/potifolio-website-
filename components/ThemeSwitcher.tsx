'use client'

import { useTheme } from '@/lib/theme-context'
import { motion } from 'framer-motion'

export function ThemeSwitcher({ textColor }: { textColor?: string }) {
  const { theme, setTheme, colors } = useTheme()
  const isBlue = theme === 'blue-mixed'

  const toggleTheme = () => {
    setTheme(isBlue ? 'wine' : 'blue-mixed')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: colors.primary,
      }}
      aria-label={`Switch to ${isBlue ? 'wine' : 'blue'} theme`}
      title={`Switch to ${isBlue ? 'wine' : 'blue'} theme`}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: isBlue ? 28 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: colors.gradient,
          }}
        />
      </motion.div>
    </button>
  )
}
