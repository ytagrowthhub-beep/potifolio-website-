'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, DollarSign, Headphones, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-context'

const reasons = [
  {
    icon: Award,
    title: 'Superior Quality',
    description:
      'We deliver exceptional code quality and design that meets the highest industry standards.',
    wineGradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    blueGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #F59E0B 100%)',
  },
  {
    icon: DollarSign,
    title: 'Affordable Prices',
    description:
      'Competitive pricing without compromising on quality. We offer value that fits your budget.',
    wineGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    blueGradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Round-the-clock support and maintenance to ensure your project runs smoothly at all times.',
    wineGradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    blueGradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    description:
      'Your success is our priority. We go the extra mile to ensure you\'re completely satisfied.',
    wineGradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    blueGradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 50%, #3B82F6 100%)',
  },
]

export function WhyChooseUs() {
  const { colors, theme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              style={{
                color: colors.primary,
              }}
            >
              Why Choose Ayorfe Tech?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We combine technical expertise with a passion for excellence to deliver
              solutions that drive your business forward. Our commitment to quality,
              affordability, and customer satisfaction sets us apart.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{
                background: colors.buttonGradient,
              }}
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          {/* Right Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border"
                  style={{
                    borderColor: colors.primaryLight + '40',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                    style={{
                      background: theme === 'blue-mixed' ? reason.blueGradient : reason.wineGradient,
                    }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* CTA Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            style={{
              background: colors.buttonGradient,
            }}
          >
            <span>View Our Portfolio</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
