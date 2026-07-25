import { ProjectsClient } from './ProjectsClient'
import { fetchGitHubProjects } from '@/lib/github-projects'
import {
  DEFAULT_FEATURED_PINNED_REPOS,
  sortFeaturedWithPinned,
} from '@/lib/curated-projects'

export async function Projects() {
  const githubUsername = process.env.GITHUB_USERNAME || 'ytagrowthhub-beep'
  const pinnedFromEnv = (process.env.FEATURED_PINNED_REPOS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  const pinnedRepos =
    pinnedFromEnv.length > 0 ? pinnedFromEnv : DEFAULT_FEATURED_PINNED_REPOS

  const projects = sortFeaturedWithPinned(
    await fetchGitHubProjects(),
    pinnedRepos
  )

  return (
    <ProjectsClient
      projects={projects}
      showFilters={false}
      showViewAll={true}
      carousel={true}
      title="Featured Projects"
      subtitle="All projects from my GitHub — browse the carousel or open a live preview"
      githubUsername={githubUsername}
    />
  )
}
