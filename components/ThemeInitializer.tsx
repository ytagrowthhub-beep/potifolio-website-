'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/theme-context'

export function ThemeInitializer() {
  const { theme } = useTheme()

  useEffect(() => {
    // Ensure html element has data-theme attribute
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
