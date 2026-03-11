import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayorfetech.com'

  // Fetch all projects for dynamic routes with error handling
  let projectRoutes: MetadataRoute.Sitemap = []
  
  try {
    if (process.env.DATABASE_URL) {
      const projects = await prisma.project.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
    // Continue with empty project routes if database is not available
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectRoutes,
  ]
}
