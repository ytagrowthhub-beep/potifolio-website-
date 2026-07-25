import { ProjectsClient } from '@/components/sections/ProjectsClient'
import { fetchGitHubProjects, githubProjectsRevalidate } from '@/lib/github-projects'

export const revalidate = githubProjectsRevalidate

export const metadata = {
  title: 'Projects',
  description:
    'Browse all completed websites and web applications from my GitHub portfolio',
}

export default async function ProjectsPage() {
  const projects = await fetchGitHubProjects()
  const githubUsername = process.env.GITHUB_USERNAME || 'ytagrowthhub-beep'

  return (
    <div className="min-h-screen bg-white pt-20">
      <ProjectsClient
        projects={projects}
        showFilters={true}
        showViewAll={false}
        title="All Projects"
        subtitle="A comprehensive showcase synced from GitHub — filter by category or open a live demo"
        githubUsername={githubUsername}
      />
    </div>
  )
}
