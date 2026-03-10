'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Mail, Github, Twitter, Loader2 } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  serviceType: z.enum([
    'Frontend Development',
    'Backend Development',
    'Full-Stack Development',
    'Database & Data Layer',
    'DevOps & Infrastructure',
    'Maintenance & Support',
    'Consultation',
  ]),
  budget: z
    .string()
    .min(1, 'Please select an estimated budget')
    .optional(),
  timeline: z
    .string()
    .min(2, 'Please provide an estimated timeline')
    .optional(),
  billingAddress: z.string().optional(),
  projectDetails: z
    .string()
    .min(10, 'Project details must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Map the structured hiring / invoice data into the simple
    // payload expected by the existing /api/contact endpoint.
    const payload = {
      name: data.name,
      email: data.email,
      subject: `Hiring Request - ${data.serviceType}${data.budget ? ` (${data.budget})` : ''}`,
      message: [
        `Service Type: ${data.serviceType}`,
        data.company ? `Company / Organization: ${data.company}` : '',
        data.budget ? `Estimated Budget: ${data.budget}` : '',
        data.timeline ? `Timeline: ${data.timeline}` : '',
        data.billingAddress ? `Billing Address: ${data.billingAddress}` : '',
        '',
        'Project Details:',
        data.projectDetails,
      ]
        .filter(Boolean)
        .join('\n'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50"
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
            Hire Me / Request an Invoice
          </h2>
          <div 
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colors.primary }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Ready to work together? Share a few details about your project and billing
            information and I&apos;ll follow up with a tailored proposal and invoice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                How the hiring process works
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Tell me about the service you need, your budget, and timeline. I&apos;ll
                review your request, ask any follow-up questions, and send an invoice
                or detailed quote to your email.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="mailto:ayorfe2@gmail.com"
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div 
                  className="rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: colors.primary,
                    width: '48px',
                    height: '48px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryDark
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary
                  }}
                >
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p 
                    className="text-gray-900 font-medium transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#111827'
                    }}
                  >
                    ayorfe2@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/ytagrowthhub-beep"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <Github size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">GitHub</p>
                  <p 
                    className="text-gray-900 font-medium transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#111827'
                    }}
                  >
                    @ytagrowthhub-beep
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/haryor6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <Twitter size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Twitter</p>
                  <p 
                    className="text-gray-900 font-medium transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#111827'
                    }}
                  >
                    @haryor6
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company / Organization (optional)
                </label>
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  placeholder="Your business or brand name"
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Service you&apos;d like to hire me for
                </label>
                <select
                  {...register('serviceType')}
                  id="serviceType"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all bg-white"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                >
                  <option value="">Select a service</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full-Stack Development">Full-Stack Development</option>
                  <option value="Database & Data Layer">Database &amp; Data Layer</option>
                  <option value="DevOps & Infrastructure">DevOps &amp; Infrastructure</option>
                  <option value="Maintenance & Support">Maintenance &amp; Support</option>
                  <option value="Consultation">Consultation / Technical Advisory</option>
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    {...register('budget')}
                    id="budget"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all bg-white"
                    style={{
                      '--tw-ring-color': colors.primary,
                    } as React.CSSProperties}
                  >
                    <option value="">Select a range</option>
                    <option value="Below $500">Below $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Timeline
                  </label>
                  <select
                    {...register('timeline')}
                    id="timeline"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all bg-white"
                    style={{
                      '--tw-ring-color': colors.primary,
                    } as React.CSSProperties}
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="4-6 weeks">4-6 weeks</option>
                    <option value="6-8 weeks">6-8 weeks</option>
                    <option value="8-12 weeks">8-12 weeks</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                  {errors.timeline && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address (optional)
                </label>
                <textarea
                  {...register('billingAddress')}
                  id="billingAddress"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  placeholder="Address and any invoice details (tax ID, company number, etc.)"
                />
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  {...register('projectDetails')}
                  id="projectDetails"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{
                    '--tw-ring-color': colors.primary,
                  } as React.CSSProperties}
                  placeholder="Describe what you need built, who it&apos;s for, and any important requirements."
                />
                {errors.projectDetails && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectDetails.message}</p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    Something went wrong. Please try again later.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{
                  background: colors.buttonGradient,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending email...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send an Email</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
