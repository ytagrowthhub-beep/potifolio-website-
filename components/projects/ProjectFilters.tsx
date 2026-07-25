'use client'

import { motion } from 'framer-motion'
import type { ProjectCategory } from '@/lib/project-types'
import { PROJECT_FILTER_OPTIONS } from '@/lib/project-types'
import { useTheme } from '@/lib/theme-context'

interface ProjectFiltersProps {
  active: ProjectCategory
  onChange: (category: ProjectCategory) => void
  counts: Partial<Record<ProjectCategory, number>>
}

export function ProjectFilters({
  active,
  onChange,
  counts,
}: ProjectFiltersProps) {
  const { colors } = useTheme()

  return (
    <div
      className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {PROJECT_FILTER_OPTIONS.map((option) => {
        const count = counts[option.id] ?? 0
        const isActive = active === option.id
        const showCount = option.id === 'all' ? count : count

        return (
          <motion.button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
            style={
              isActive
                ? {
                    backgroundColor: colors.primary,
                    color: '#fff',
                    borderColor: colors.primary,
                  }
                : {
                    backgroundColor: '#fff',
                    color: '#4B5563',
                    borderColor: '#E5E7EB',
                  }
            }
          >
            {option.label}
            {showCount > 0 && (
              <span
                className="ml-1.5 opacity-80"
                aria-hidden
              >
                ({showCount})
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
