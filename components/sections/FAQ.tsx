'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const faqs = [
  {
    question: 'How can I get started with your services?',
    answer:
      'Getting started is easy! Simply reach out through our contact form or email us directly. We\'ll schedule a free consultation to discuss your project requirements, timeline, and budget. After understanding your needs, we\'ll provide a detailed proposal and project plan.',
  },
  {
    question: 'What services do you offer?',
    answer:
      'We offer comprehensive full-stack development services including frontend development (React, Next.js, TypeScript), backend development (Node.js, APIs, Server Actions), database solutions (PostgreSQL, MongoDB, Prisma), and DevOps services (CI/CD, Docker, Cloud deployment). We also provide UI/UX design, performance optimization, and ongoing maintenance.',
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process with regular milestones.',
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer:
      'Yes! We offer comprehensive support and maintenance packages to ensure your application continues to run smoothly. This includes bug fixes, security updates, performance monitoring, feature enhancements, and technical support. We can customize a maintenance plan that fits your needs.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in modern web technologies including Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind CSS, and Framer Motion. We also work with various cloud platforms like AWS, Vercel, and Docker for deployment. Our team stays updated with the latest industry trends and best practices.',
  },
  {
    question: 'Can you work with our existing codebase?',
    answer:
      'Absolutely! We can integrate with existing systems, refactor legacy code, or enhance current applications. We\'ll review your codebase, understand the architecture, and provide recommendations for improvements while maintaining compatibility with your existing infrastructure.',
  },
  {
    question: 'What is your pricing model?',
    answer:
      'We offer flexible pricing models including fixed-price projects for well-defined scopes, hourly rates for ongoing work, and retainer agreements for long-term partnerships. Pricing depends on project complexity, timeline, and requirements. Contact us for a customized quote based on your specific needs.',
  },
  {
    question: 'Do you offer revisions after project completion?',
    answer:
      'Yes, we include a revision period after project delivery to ensure everything meets your expectations. The number of revisions depends on the project scope and is outlined in our project agreement. We\'re committed to your satisfaction and will work with you until you\'re happy with the final result.',
  },
]

export function FAQ() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              backgroundColor: colors.primaryLight + '20',
            }}
          >
            <HelpCircle 
              size={32}
              style={{
                color: colors.primary,
              }}
            />
          </div>
          <h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Frequently Asked Questions
          </h2>
          <div 
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colors.primary }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-display font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: colors.primary,
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              style={{
                background: colors.buttonGradient,
              }}
            >
              <span>Contact Us</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
