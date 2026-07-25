import { MetadataRoute } from 'next'
import { getGitHubProjectSlugs, githubProjectsRevalidate } from '@/lib/github-projects'

export const revalidate = githubProjectsRevalidate

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayorfetech.com'

  let projectRoutes: MetadataRoute.Sitemap = []

  try {
    const slugs = await getGitHubProjectSlugs()
    projectRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching GitHub projects for sitemap:', error)
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
