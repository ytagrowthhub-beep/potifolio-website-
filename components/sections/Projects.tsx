import { ProjectsClient } from './ProjectsClient'
import { getFeaturedGitHubProjects } from '@/lib/github-projects'

export async function Projects() {
  const projects = await getFeaturedGitHubProjects(6)
  const githubUsername = process.env.GITHUB_USERNAME || 'ytagrowthhub-beep'

  return (
    <ProjectsClient
      projects={projects}
      limit={6}
      showFilters={false}
      showViewAll={true}
      title="Featured Projects"
      subtitle="Click a preview to open the live website, or view full project details"
      githubUsername={githubUsername}
    />
  )
}
