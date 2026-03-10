'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, ArrowRight, Code } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

type Project = {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  techStack?: string[]
  liveUrl: string | null
  githubUrl: string | null
  images: Array<{ url: string }>
}

interface ProjectsClientProps {
  projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleExternalClick = (e: MouseEvent<HTMLButtonElement>, url: string | null) => {
    e.stopPropagation()
    if (!url) return
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section
      id="projects"
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
          <h2 
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Featured Projects
          </h2>
          <div 
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colors.primary }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            A showcase of my recent work building scalable and modern applications
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer"
                  style={{
                    borderColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primaryLight + '80'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  {/* Project Image */}
                  <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {project.thumbnail || project.images[0]?.url ? (
                        <Image
                          src={project.thumbnail || project.images[0].url}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-wine-soft">
                          <Code size={48} className="text-wine-500/50" />
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div 
                        className="absolute inset-0 transition-colors duration-300"
                        style={{
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.primary + '1A'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 
                        className="text-xl font-display font-semibold text-gray-900 mb-3 transition-colors duration-300"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#111827'
                        }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {(project.techStack || []).slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full font-medium border"
                            style={{
                              backgroundColor: colors.primaryLight + '20',
                              color: colors.primaryDark,
                              borderColor: colors.primaryLight + '40',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.techStack || []).length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
                            +{(project.techStack || []).length - 3}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span 
                          className="text-sm font-semibold flex items-center space-x-1 group-hover:space-x-2 transition-all"
                          style={{ color: colors.primary }}
                        >
                          <span>View Details</span>
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </span>
                        <div className="flex space-x-2">
                          {project.liveUrl && (
                            <Link
                              href={`/projects/${project.slug}`}
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                              className="p-2 text-gray-400 rounded-lg transition-all duration-300"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = colors.primary
                                e.currentTarget.style.backgroundColor = colors.primaryLight + '20'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#9CA3AF'
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                              aria-label="Live demo"
                              title="Live Demo"
                            >
                              <ExternalLink size={18} />
                            </Link>
                          )}
                          {project.githubUrl && (
                            <button
                              type="button"
                              onClick={(e) => handleExternalClick(e, project.githubUrl)}
                              className="p-2 text-gray-400 hover:text-wine-500 hover:bg-wine-50 rounded-lg transition-all duration-300"
                              aria-label="GitHub repository"
                              title="View Code"
                            >
                              <Github size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 font-semibold transition-colors group"
            style={{ color: colors.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.primaryDark
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.primary
            }}
          >
            <span>View All Projects</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
