'use client'

import dynamic from 'next/dynamic'

// Lazy load chatbot for better performance - using default export wrapper
const Chatbot = dynamic(
  () => import('@/components/Chatbot').then((mod) => ({ default: mod.Chatbot })),
  {
    ssr: false,
    loading: () => null, // Don't show loading state
  }
)

export function ChatbotWrapper() {
  return <Chatbot />
}
