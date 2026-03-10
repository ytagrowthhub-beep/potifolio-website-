'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useTheme } from '@/lib/theme-context'

export function About() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            About Me
          </h2>
          <div 
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colors.primary }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative max-w-md w-full bg-gradient-wine-soft rounded-2xl shadow-2xl p-0.5">
              <Image
                src="/my avatar.png"
                alt="Sanni Akeem - Full-Stack Developer"
                width={768}
                height={1024}
                className="w-full h-auto rounded-2xl object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
            <div 
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl -z-10"
              style={{
                backgroundColor: colors.primary + '33',
              }}
            />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                Sanni Akeem
              </h3>
              <p 
                className="text-lg font-medium mb-6"
                style={{ color: colors.primary }}
              >
                Full-Stack Developer at Ayorfe Tech
              </p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I&apos;m a passionate Full-Stack Developer dedicated to building
                scalable, modern, and high-impact digital solutions. With a
                strong foundation in both frontend and backend technologies, I
                craft performant web applications and systems that solve real-world
                problems.
              </p>

              <p>
                My approach to development combines clean code architecture,
                user-centered design, and performance optimization. I believe in
                writing maintainable code that not only works but also scales
                with business needs.
              </p>

              <p>
                When I&apos;m not coding, I&apos;m constantly learning new technologies,
                contributing to open-source projects, and sharing knowledge with
                the developer community.
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-display font-semibold text-gray-900 mb-4">
                Tech Philosophy
              </h4>
              <p className="text-gray-700 leading-relaxed">
                I believe in building software that is not just functional, but
                also maintainable, scalable, and delightful to use. Every line of
                code should serve a purpose, and every feature should enhance the
                user experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
