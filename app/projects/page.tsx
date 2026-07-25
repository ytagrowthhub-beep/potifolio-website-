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
        subtitle="Browse completed websites and apps — open a live preview or view full project details"
        githubUsername={githubUsername}
      />
    </div>
  )
}
