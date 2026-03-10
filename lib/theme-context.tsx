'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'wine' | 'blue-mixed'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colors: {
    primary: string
    primaryDark: string
    primaryLight: string
    gradient: string
    gradientSoft: string
    heroGradient: string
    buttonGradient: string
    text: string
    textLight: string
    bg: string
    bgLight: string
  }
}

const themeColors: Record<Theme, ThemeContextType['colors']> = {
  wine: {
    primary: '#6A0F1F',
    primaryDark: '#4A0A15',
    primaryLight: '#9A475B',
    gradient: 'linear-gradient(135deg, #6A0F1F 0%, #4A0A15 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(106, 15, 31, 0.1) 0%, rgba(74, 10, 21, 0.1) 100%)',
    heroGradient: 'linear-gradient(135deg, rgba(106, 15, 31, 0.85) 0%, rgba(74, 10, 21, 0.75) 50%, rgba(106, 15, 31, 0.85) 100%)',
    buttonGradient: 'linear-gradient(135deg, #6A0F1F 0%, #4A0A15 100%)',
    text: '#1F2937',
    textLight: '#6B7280',
    bg: '#FFFFFF',
    bgLight: '#F9FAFB',
  },
  'blue-mixed': {
    primary: '#2563EB',
    primaryDark: '#1E40AF',
    primaryLight: '#60A5FA',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 25%, #F59E0B 50%, #EC4899 75%, #2563EB 100%)',
    gradientSoft: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(245, 158, 11, 0.1) 50%, rgba(236, 72, 153, 0.1) 75%, rgba(37, 99, 235, 0.1) 100%)',
    heroGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(139, 92, 246, 0.75) 25%, rgba(245, 158, 11, 0.75) 50%, rgba(236, 72, 153, 0.75) 75%, rgba(37, 99, 235, 0.85) 100%)',
    buttonGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 25%, #F59E0B 50%, #EC4899 75%, #2563EB 100%)',
    text: '#1F2937',
    textLight: '#6B7280',
    bg: '#FFFFFF',
    bgLight: '#EFF6FF',
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('wine')

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themeColors[savedTheme]) {
      setThemeState(savedTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const applyTheme = (themeToApply: Theme) => {
    const colors = themeColors[themeToApply]
    const root = document.documentElement
    
    // Apply theme colors to CSS variables
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-primary-dark', colors.primaryDark)
    root.style.setProperty('--color-primary-light', colors.primaryLight)
    root.style.setProperty('--color-gradient', colors.gradient)
    root.style.setProperty('--color-gradient-soft', colors.gradientSoft)
    root.style.setProperty('--color-hero-gradient', colors.heroGradient)
    root.style.setProperty('--color-button-gradient', colors.buttonGradient)
    
    // Set data attribute for theme-aware styling
    root.setAttribute('data-theme', themeToApply)
  }

  useEffect(() => {
    // Apply initial theme colors
    applyTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
