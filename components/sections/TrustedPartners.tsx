'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const partners = [
  {
    name: 'Faitheroic',
    logo: '/asset-1/faitheroic.png',
  },
  {
    name: 'Fiverr',
    logo: '/asset-1/fiverr.png',
  },
  {
    name: 'Shopify',
    logo: '/asset-1/shopify.png',
  },
  {
    name: 'Upwork',
    logo: '/asset-1/upwork.png',
  },
  {
    name: 'WordPress',
    logo: '/asset-1/wordpress.png',
  },
]

// Duplicate for seamless infinite scroll
const infinitePartners = [...partners, ...partners, ...partners]

export function TrustedPartners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [xOffset, setXOffset] = useState(0)

  // Auto-slide effect - cycles through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Continuous horizontal scrolling animation
  useEffect(() => {
    const scrollSpeed = 0.5 // pixels per frame
    let animationFrame: number

    const animate = () => {
      setXOffset((prev) => {
        const cardWidth = 160 + 24 // width + gap
        const resetPoint = cardWidth * partners.length
        return prev >= resetPoint ? 0 : prev + scrollSpeed
      })
      animationFrame = requestAnimationFrame(animate)
    }

    if (isInView) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-r from-blue-50 via-white to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Dots - Top Center */}
        <div className="flex justify-center gap-2 mb-8">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-600 w-8'
                  : 'bg-blue-200 hover:bg-blue-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Content Band */}
        <div className="relative bg-gradient-to-r from-blue-50 via-white to-white rounded-2xl py-8 md:py-12 px-6 md:px-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Partner Logos - Left Side with Continuous Auto-Scrolling */}
            <div className="flex-1 w-full lg:w-auto overflow-hidden">
              <div className="relative">
                <motion.div
                  style={{ x: -xOffset }}
                  className="flex gap-6 justify-start"
                >
                  {infinitePartners.map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 w-32 md:w-40 h-32 md:h-40 flex items-center justify-center border border-gray-100 hover:scale-105"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 128px, 160px"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Title - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0 text-right lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 uppercase tracking-tight">
                Trusted Partners
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
