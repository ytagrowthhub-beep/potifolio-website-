'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, ArrowRight, Code2, Zap, Shield, Users } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { useTheme } from '@/lib/theme-context'

const iconMap: Record<string, any> = {
  Users,
  Zap,
  Shield,
  Code2,
}

type Service = {
  title: string
  slug: string
  description: string
  heroImage: string
  skills: string[]
  services: string[]
  approach: string
  detailedApproach: Array<{
    title: string
    description: string
    icon: string
  }>
  technologies: Array<{
    name: string
    slug: string
    description: string
    image: string
    features: string[]
  }>
  benefits: string[]
  process: Array<{
    step: string
    title: string
    description: string
  }>
}

export function ServiceDetailClient({ service }: { service: Service }) {
  const { colors } = useTheme()

  return (
    <div className="min-h-screen bg-white">
      <PageHero title={service.title} subtitle={service.description} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 mb-8 transition-colors"
          style={{
            color: colors.primary,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primaryDark
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.primary
          }}
        >
          <ArrowLeft size={20} />
          <span>Back to Services</span>
        </Link>

        {/* Hero Image Section */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-96 w-full">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              style={{
                background: `linear-gradient(to top, ${colors.primaryDark}CC 0%, ${colors.primary}66 50%, transparent 100%)`,
              }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {service.title}
              </h2>
              <p className="text-white/90 text-lg max-w-3xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Approach */}
            <div>
              <h2 
                className="text-4xl font-display font-semibold text-gray-900 mb-6"
                style={{ color: colors.primary }}
              >
                Our Approach
              </h2>
              <p className="text-gray-700 leading-relaxed text-xl mb-8">
                {service.approach}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {service.detailedApproach.map((item, index) => {
                  const Icon = iconMap[item.icon] || Code2
                  return (
                    <div
                      key={index}
                      className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                      style={{
                        borderColor: colors.primaryLight + '40',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.primaryLight + '80'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = colors.primaryLight + '40'
                      }}
                    >
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          backgroundColor: colors.primaryLight + '20',
                        }}
                      >
                        <Icon 
                          size={28} 
                          style={{
                            color: colors.primary,
                          }}
                        />
                      </div>
                      <h3 
                        className="text-xl font-display font-semibold text-gray-900 mb-2"
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <h2 
                className="text-4xl font-display font-semibold text-gray-900 mb-8"
                style={{ color: colors.primary }}
              >
                Services Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.services.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    style={{
                      borderColor: colors.primaryLight + '40',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primaryLight + '80'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.primaryLight + '40'
                    }}
                  >
                    <CheckCircle2
                      size={24}
                      className="mt-0.5 flex-shrink-0"
                      style={{
                        color: colors.primary,
                      }}
                    />
                    <span className="text-gray-700 text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies - Clickable Cards */}
            <div>
              <h2 
                className="text-4xl font-display font-semibold text-gray-900 mb-8"
                style={{ color: colors.primary }}
              >
                Key Technologies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.technologies.map((tech, index) => (
                  <Link
                    key={index}
                    href={`/services/${service.slug}/${tech.slug}`}
                    className="group block p-6 bg-white border-2 rounded-xl hover:shadow-xl transition-all"
                    style={{
                      borderColor: colors.primaryLight + '40',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary + '80'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.primaryLight + '40'
                    }}
                  >
                    <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(to top, ${colors.primaryDark}CC 0%, transparent 100%)`,
                        }}
                      />
                    </div>
                    <h3 
                      className="text-2xl font-display font-semibold text-gray-900 mb-3 transition-colors"
                      style={{
                        color: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#111827'
                      }}
                    >
                      {tech.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tech.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full font-medium border"
                          style={{
                            backgroundColor: colors.primaryLight + '20',
                            color: colors.primaryDark,
                            borderColor: colors.primaryLight + '40',
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div 
                      className="flex items-center font-medium group-hover:space-x-2 transition-all"
                      style={{
                        color: colors.primary,
                      }}
                    >
                      <span>Learn More</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 
                className="text-4xl font-display font-semibold text-gray-900 mb-8"
                style={{ color: colors.primary }}
              >
                Benefits
              </h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
                    style={{
                      borderColor: colors.primaryLight + '40',
                    }}
                  >
                    <CheckCircle2
                      size={24}
                      className="mt-0.5 flex-shrink-0"
                      style={{
                        color: colors.primary,
                      }}
                    />
                    <span className="text-gray-700 text-base leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 
                className="text-4xl font-display font-semibold text-gray-900 mb-8"
                style={{ color: colors.primary }}
              >
                Our Process
              </h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-6 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    style={{
                      borderColor: colors.primaryLight + '40',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primaryLight + '80'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.primaryLight + '40'
                    }}
                  >
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl"
                      style={{
                        backgroundColor: colors.primary,
                        color: 'white',
                      }}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-display font-semibold text-gray-900 mb-2"
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Skills */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border"
                style={{
                  borderColor: colors.primaryLight + '40',
                }}
              >
                <h3 
                  className="text-xl font-display font-semibold text-gray-900 mb-4"
                  style={{ color: colors.primary }}
                >
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white text-sm rounded-full font-medium border"
                      style={{
                        color: colors.primaryDark,
                        borderColor: colors.primaryLight + '40',
                        backgroundColor: colors.primaryLight + '20',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div 
                className="rounded-2xl p-6 text-white"
                style={{
                  background: colors.gradient,
                }}
              >
                <h3 className="text-xl font-display font-semibold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Let&apos;s discuss how I can help bring your project to life with
                  these services.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-white font-semibold rounded-lg hover:opacity-90 transition-all"
                  style={{
                    color: colors.primary,
                  }}
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
