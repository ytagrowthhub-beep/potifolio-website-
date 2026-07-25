'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ExternalLink,
  Github,
  ArrowRight,
  Code,
  Star,
  Eye,
} from 'lucide-react'
import type { PortfolioProject } from '@/lib/project-types'
import { PROJECT_CATEGORY_LABELS } from '@/lib/project-types'
import { useTheme } from '@/lib/theme-context'

interface ProjectCardProps {
  project: PortfolioProject
  index?: number
  isInView?: boolean
}

export function ProjectCard({
  project,
  index = 0,
  isInView = true,
}: ProjectCardProps) {
  const { colors } = useTheme()
  const imageSrc = project.previewImage || project.thumbnail
  const hasLive = Boolean(project.liveUrl)

  const imageContent = (
    <>
      <Image
        src={imageSrc}
        alt={`${project.title} website preview`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={index < 3 ? 'eager' : 'lazy'}
        priority={index < 3}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <span
        className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md"
        style={{ backgroundColor: colors.primary }}
      >
        {PROJECT_CATEGORY_LABELS[project.category]}
      </span>
      {hasLive ? (
        <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg bg-white/95 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
          <ExternalLink size={16} style={{ color: colors.primary }} />
          Live Preview — opens website
        </span>
      ) : (
        <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg bg-white/95 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-lg">
          <Eye size={16} style={{ color: colors.primary }} />
          View project details
        </span>
      )}
      {project.stars > 0 && (
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {project.stars}
        </span>
      )}
    </>
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ borderColor: 'transparent' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.primaryLight + '80'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent'
      }}
    >
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {hasLive ? (
          <a
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full w-full"
            aria-label={`Open live preview of ${project.title} in a new tab`}
          >
            {imageContent}
          </a>
        ) : (
          <Link
            href={`/projects/${project.slug}`}
            className="relative block h-full w-full"
            aria-label={`View details for ${project.title}`}
          >
            {imageContent}
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/projects/${project.slug}`} className="group/title">
          <h3
            className="mb-2 text-xl font-display font-semibold text-gray-900 transition-colors duration-300 group-hover/title:underline"
            style={{ textDecorationColor: colors.primary }}
          >
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: colors.primaryLight + '20',
                color: colors.primaryDark,
                borderColor: colors.primaryLight + '40',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-2 border-t border-gray-100 pt-4">
          {hasLive && (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primaryDark
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary
              }}
            >
              <ExternalLink size={16} aria-hidden />
              View Live Project
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
              hasLive
                ? 'border-gray-200 text-gray-800 hover:bg-gray-50'
                : 'text-white'
            }`}
            style={!hasLive ? { backgroundColor: colors.primary } : undefined}
          >
            <Eye size={16} aria-hidden />
            View Project Details
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              <Github size={16} aria-hidden />
              View Source Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectCardPlaceholder() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <Code size={48} className="text-gray-300" />
      </div>
    </div>
  )
}
