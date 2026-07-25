'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Github } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import type { PortfolioProject, ProjectCategory } from '@/lib/project-types'
import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { ProjectCard } from '@/components/projects/ProjectCard'

interface ProjectsClientProps {
  projects: PortfolioProject[]
  showFilters?: boolean
  showViewAll?: boolean
  title?: string
  subtitle?: string
  limit?: number
  githubUsername?: string
}

export function ProjectsClient({
  projects,
  showFilters = false,
  showViewAll = true,
  title = 'Featured Projects',
  subtitle = 'A showcase of my recent work — synced automatically from GitHub',
  limit,
  githubUsername = 'ytagrowthhub-beep',
}: ProjectsClientProps) {
  const { colors } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')

  const displayProjects = useMemo(() => {
    let list =
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter)
    if (limit && activeFilter === 'all') {
      list = list.slice(0, limit)
    }
    return list
  }, [projects, activeFilter, limit])

  const filterCounts = useMemo(() => {
    const counts: Partial<Record<ProjectCategory, number>> = { all: projects.length }
    for (const project of projects) {
      counts[project.category] = (counts[project.category] || 0) + 1
    }
    return counts
  }, [projects])

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-white py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2
            className="mb-4 font-display text-4xl font-bold md:text-5xl"
            style={{ color: colors.primary }}
          >
            {title}
          </h2>
          <div
            className="mx-auto h-1 w-24"
            style={{ backgroundColor: colors.primary }}
          />
          <p className="mx-auto mt-6 max-w-2xl text-gray-600">{subtitle}</p>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800"
          >
            <Github size={14} aria-hidden />
            <span>Synced from @{githubUsername}</span>
          </a>
        </motion.div>

        {showFilters && projects.length > 0 && (
          <ProjectFilters
            active={activeFilter}
            onChange={setActiveFilter}
            counts={filterCounts}
          />
        )}

        {displayProjects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              {projects.length === 0
                ? 'No projects found. Check your GitHub connection or try again later.'
                : 'No projects match this filter. Try another category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        )}

        {showViewAll && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center space-x-2 font-semibold transition-colors"
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
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
