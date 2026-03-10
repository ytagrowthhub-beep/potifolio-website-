'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/lib/theme-context'

const testimonials = [
  {
    id: 1,
    name: 'William Blake',
    role: 'E-commerce Store Owner',
    image: '/asset-2/testimonials1.png',
    quote:
      'The logo and banner designs for our Shopify store perfectly captured our brand\'s identity.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Chris Wilson',
    role: 'Business Owner',
    image: '/asset-2/testimonials2.png',
    quote:
      'Ayorfe Tech\'s professionalism helped us take our business to new heights. Highly recommend them!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'Startup Founder',
    image: '/asset-2/testimonials 3.png',
    quote:
      'Their app and web development exceeded expectations. A seamless and user-friendly experience.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Maria Gonzales',
    role: 'Marketing Director',
    image: '/asset-2/testimonials4.png',
    quote:
      'Amazing experience! The theme is easy to customize and the features are extremely useful.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Krishna',
    role: 'Project Manager',
    image: '/asset-2/testimonials5.png',
    quote:
      'Excellent service and great design work! We are fully satisfied with the work done by Ayorfe Tech.',
    rating: 5,
  },
]

export function Testimonials() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Auto-rotate every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Get visible cards (current, previous, next)
  const getVisibleCards = () => {
    const cards = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length
      cards.push({ index, offset: i })
    }
    return cards
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Hear what our clients say. Real feedback from those who have experienced our dedication and expertise firsthand.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative overflow-hidden py-8">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {getVisibleCards().map(({ index, offset }) => {
                const testimonial = testimonials[index]
                const isCenter = offset === 0
                const distance = Math.abs(offset)

                return (
                  <motion.div
                    key={`${testimonial.id}-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.8, x: offset * 100 }}
                    animate={{
                      opacity: isCenter ? 1 : Math.max(0.3, 1 - distance * 0.3),
                      scale: isCenter ? 1 : Math.max(0.85, 1 - distance * 0.1),
                      x: offset * (isCenter ? 0 : 80),
                      zIndex: isCenter ? 10 : 5 - distance,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className={`flex-shrink-0 w-full max-w-sm ${
                      isCenter ? '' : 'pointer-events-none'
                    }`}
                    style={{
                      filter: isCenter ? 'none' : `blur(${distance * 2}px)`,
                    }}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote 
                          className="w-8 h-8"
                          style={{
                            color: colors.primary + '4D',
                          }}
                        />
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 min-h-[80px]">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div 
                          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
                          style={{
                            borderColor: colors.primary,
                          }}
                        >
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>

                        {/* Name and Rating */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-semibold text-sm md:text-base truncate"
                            style={{
                              color: colors.primary,
                            }}
                          >
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xs md:text-sm">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => {
              const isActive = index === currentIndex
              const isNearActive =
                index === (currentIndex + 1) % testimonials.length ||
                index === (currentIndex - 1 + testimonials.length) % testimonials.length

              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? '32px' : isNearActive ? '16px' : '8px',
                    backgroundColor: isActive 
                      ? colors.primary 
                      : isNearActive 
                        ? colors.primaryLight 
                        : '#D1D5DB',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && !isNearActive) {
                      e.currentTarget.style.backgroundColor = '#9CA3AF'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && !isNearActive) {
                      e.currentTarget.style.backgroundColor = '#D1D5DB'
                    }
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
