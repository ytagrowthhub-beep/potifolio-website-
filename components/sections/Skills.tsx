'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Code,
  Database,
  Server,
  Cloud,
  GitBranch,
  Package,
  Layout,
  Terminal,
  ArrowRight,
} from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const skillCategories = [
  {
    name: 'Frontend',
    slug: 'frontend',
    icon: Layout,
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'HTML/CSS',
    ],
    color: 'from-blue-500 to-cyan-500',
    description: 'Building beautiful, responsive, and interactive user interfaces with modern frontend technologies.',
  },
  {
    name: 'Backend',
    slug: 'backend',
    icon: Server,
    skills: [
      'Node.js',
      'Express',
      'REST APIs',
      'GraphQL',
      'Server Actions',
      'API Design',
    ],
    color: 'from-green-500 to-emerald-500',
    description: 'Developing robust server-side applications and APIs that power modern web applications.',
  },
  {
    name: 'Database',
    slug: 'database',
    icon: Database,
    skills: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'SQL', 'ORM'],
    color: 'from-purple-500 to-pink-500',
    description: 'Designing and managing efficient database systems for optimal data storage and retrieval.',
  },
  {
    name: 'DevOps & Tools',
    slug: 'devops-tools',
    icon: Cloud,
    skills: [
      'Git',
      'Docker',
      'CI/CD',
      'AWS',
      'Vercel',
      'Testing',
      'ESLint',
      'Prettier',
    ],
    color: 'from-orange-500 to-red-500',
    description: 'Streamlining development workflows and deploying scalable applications to the cloud.',
  },
]

export function Skills() {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
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
          <h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Skills & Technologies
          </h2>
          <div 
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colors.primary }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Link
                  href={`/services/${category.slug}`}
                  className="block h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer"
                  style={{
                    borderColor: 'rgb(229, 231, 235)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primaryLight + '80'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'
                  }}
                >
                  <span
                    className={`inline-block w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={28} className="text-white" />
                  </span>

                  <h3 
                    className="text-xl font-display font-semibold text-gray-900 mb-4 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#111827'
                    }}
                  >
                    {category.name}
                  </h3>

                  <ul className="space-y-2 mb-4">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-gray-600 text-sm flex items-center space-x-2"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>

                  <div 
                    className="flex items-center text-sm font-medium mt-4 pt-4 border-t border-gray-100 group-hover:space-x-2 transition-all"
                    style={{ color: colors.primary }}
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
