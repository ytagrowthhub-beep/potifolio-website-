'use client'

import { useEffect } from 'react'

export function HashNavigation() {
  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300) // Wait for page to render
    }
  }, [])

  return null
}
