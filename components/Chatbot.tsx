'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import Link from 'next/link'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  action?: {
    type: 'link' | 'form' | 'email'
    value: string
  }
  interactive?: {
    type: 'services-dropdown' | 'timeline-dropdown' | 'question'
    options?: string[]
  }
}

interface SuggestedQuestion {
  text: string
  action?: {
    type: 'link' | 'form'
    value: string
  }
}

const suggestedQuestions: SuggestedQuestion[] = [
  { text: 'View Services', action: { type: 'link', value: '/services' } },
  { text: 'See Projects', action: { type: 'link', value: '/projects' } },
  { text: 'Hire Me', action: { type: 'form', value: '/contact' } },
  { text: 'Contact Info', action: { type: 'link', value: '/contact' } },
]

export function Chatbot() {
  const { colors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! 👋 I'm the A.Tech AI assistant. I'm here to help you find the right solution for your project.\n\nTo get started, could you tell me:\n• What type of project are you working on?\n• What services are you interested in?\n• What's your timeline?\n\nOr select a service from the dropdown below to learn more:",
      timestamp: new Date(),
      interactive: {
        type: 'services-dropdown',
        options: [
          'Frontend Development',
          'Backend Development',
          'Full-Stack Development',
          'Database & Data Layer',
          'DevOps & Infrastructure',
          'Maintenance & Support',
          'Consultation / Technical Advisory',
        ],
      },
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)

    // Create assistant message placeholder for streaming
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullResponse = ''
      let action: Message['action']
      let interactive: Message['interactive']

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))
                  
                  if (data.type === 'chunk' && data.content) {
                    fullResponse += data.content
                    // Update message in real-time
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: fullResponse }
                          : msg
                      )
                    )
                    scrollToBottom()
                  }

                  if (data.type === 'done') {
                    if (data.action) {
                      action = data.action as Message['action']
                    }
                    if (data.interactive) {
                      interactive = data.interactive as Message['interactive']
                    }
                    
                    // Final update with action and interactive elements
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? {
                              ...msg,
                              content: fullResponse,
                              ...(action && { action }),
                              ...(interactive && { interactive }),
                            }
                          : msg
                      )
                    )
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } finally {
          reader.releaseLock()
        }
      } else {
        // Fallback to non-streaming if reader not available
        const data = await response.json()
        fullResponse = data.response
        action = data.action
        interactive = data.interactive

        // Simulate typing effect for instant responses
        const words = fullResponse.split(' ')
        let currentText = ''
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i]
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: currentText }
                : msg
            )
          )
          await new Promise((resolve) => setTimeout(resolve, 30)) // 30ms delay per word
        }

        // Final update with action and interactive
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: fullResponse,
                  action,
                  interactive,
                }
              : msg
          )
        )
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "I'm sorry, I encountered an error. Please try again or contact A.Tech directly at ayorfe2@gmail.com",
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: SuggestedQuestion) => {
    if (suggestion.action?.type === 'link') {
      window.location.href = suggestion.action.value
    } else if (suggestion.action?.type === 'form') {
      window.location.href = suggestion.action.value
    } else {
      handleSendMessage(suggestion.text)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: colors.buttonGradient,
        }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[90vw] max-w-md h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: colors.buttonGradient,
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">A.Tech AI Assistant</h3>
                  <p className="text-white/80 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'rounded-br-sm'
                        : 'rounded-bl-sm bg-white shadow-sm border border-gray-100'
                    }`}
                    style={
                      message.role === 'user'
                        ? {
                            background: colors.buttonGradient,
                            color: 'white',
                          }
                        : {}
                    }
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Interactive Dropdowns */}
                    {message.interactive?.type === 'services-dropdown' && message.interactive.options && (
                      <div className="mt-3">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleSendMessage(`Tell me about ${e.target.value}`)
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
                          style={{
                            '--tw-ring-color': colors.primary,
                          } as React.CSSProperties}
                          defaultValue=""
                        >
                          <option value="">Select a service...</option>
                          {message.interactive.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {message.interactive?.type === 'timeline-dropdown' && message.interactive.options && (
                      <div className="mt-3">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleSendMessage(`I need a timeline of ${e.target.value}`)
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
                          style={{
                            '--tw-ring-color': colors.primary,
                          } as React.CSSProperties}
                          defaultValue=""
                        >
                          <option value="">Select timeline...</option>
                          {message.interactive.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {message.action && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        {message.action.type === 'link' && (
                          <Link
                            href={message.action.value}
                            className="text-xs font-medium underline"
                            style={{ color: colors.primary }}
                          >
                            Visit {message.action.value}
                          </Link>
                        )}
                        {message.action.type === 'form' && (
                          <Link
                            href={message.action.value}
                            className="text-xs font-medium underline"
                            style={{ color: colors.primary }}
                          >
                            Fill out contact form
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-100">
                    <div className="flex space-x-1.5">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: colors.primary,
                          animationDelay: '0ms',
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: colors.primary,
                          animationDelay: '150ms',
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: colors.primary,
                          animationDelay: '300ms',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested Questions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 text-xs font-medium rounded-full border transition-all hover:scale-105"
                        style={{
                          borderColor: colors.primaryLight,
                          color: colors.primary,
                          backgroundColor: colors.primaryLight + '10',
                        }}
                        onHoverStart={(e) => {
                          e.currentTarget.style.backgroundColor = colors.primaryLight + '20'
                        }}
                        onHoverEnd={(e) => {
                          e.currentTarget.style.backgroundColor = colors.primaryLight + '10'
                        }}
                      >
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: colors.buttonGradient,
                    color: 'white',
                  }}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
