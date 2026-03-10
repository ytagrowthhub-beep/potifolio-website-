import { ProjectsClient } from '@/components/sections/ProjectsClient'
import { prisma } from '@/lib/prisma'

async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const metadata = {
  title: 'Projects',
  description: 'Browse all my projects and case studies',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-wine-500 mb-4">
            All Projects
          </h1>
          <div className="w-24 h-1 bg-wine-500 mx-auto" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive showcase of my work
          </p>
        </div>
        <ProjectsClient projects={projects} />
      </div>
    </div>
  )
}
