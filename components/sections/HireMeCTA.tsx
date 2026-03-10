'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from '@/lib/theme-context'

export function HireMeCTA() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 via-gray-950 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm font-semibold tracking-widest text-white/60 uppercase mb-4">
            Hire Me
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to build your next high-impact digital solution?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Share your project requirements and I&apos;ll send a tailored proposal and
            invoice. I work with startups, agencies, and businesses that care about
            performance and design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm md:text-base font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: colors.buttonGradient,
                color: '#ffffff',
              }}
            >
              Hire Me
            </Link>
            <p className="text-white/60 text-sm">
              Or email directly at{' '}
              <a
                href="mailto:ayorfe2@gmail.com"
                className="underline-offset-4 hover:underline"
              >
                ayorfe2@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

