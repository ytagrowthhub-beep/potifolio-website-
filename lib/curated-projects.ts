import type { PortfolioProject } from './project-types'

function isValidLiveUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const POCKECT_SMS_REPO_NAMES = [
  'pockect-sms',
  'pocket-sms',
  'pockect-sms-website',
  'pocket-sms-website',
  'pocketsms',
]

export function isPockectSmsProject(project: {
  repoName: string
  slug: string
  title: string
}): boolean {
  const label = `${project.repoName} ${project.slug} ${project.title}`.toLowerCase()
  return (
    POCKECT_SMS_REPO_NAMES.some((name) => label.includes(name)) ||
    /pockect[-_\s]?sms|pocket[-_\s]?sms/.test(label)
  )
}

export function getCuratedPockectSmsProject(
  githubUsername: string
): PortfolioProject {
  const liveUrlRaw =
    process.env.POCKECT_SMS_LIVE_URL ||
    process.env.POCKET_SMS_LIVE_URL ||
    null
  const liveUrl =
    liveUrlRaw && isValidLiveUrl(liveUrlRaw) ? liveUrlRaw.trim() : null
  const repoName = 'pockect-sms'
  const thumbnail = `https://opengraph.githubassets.com/1/${githubUsername}/${repoName}`

  return {
    id: 'curated-pockect-sms',
    slug: 'pockect-sms',
    title: 'Pockect SMS',
    description:
      'SMS messaging website — a web platform for sending and managing text messages with a clean, user-friendly interface.',
    longDescription:
      '<p>Pockect SMS is a web-based SMS platform designed for reliable message delivery and an intuitive user experience.</p>',
    problem:
      'Provide a simple, accessible way to manage SMS communications through the web.',
    solution:
      'Built a responsive web application focused on clarity, speed, and ease of use for SMS workflows.',
    outcome: liveUrl
      ? 'Live website available for preview and use.'
      : 'Project showcased on portfolio with source available on GitHub.',
    features: [
      'Responsive web interface',
      'SMS messaging workflow',
      'Clean, modern UI',
      'Production-ready deployment',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'web-app',
    liveUrl,
    githubUrl: `https://github.com/${githubUsername}/${repoName}`,
    thumbnail,
    previewImage: thumbnail,
    images: [
      {
        id: 'curated-pockect-sms-1',
        url: thumbnail,
        alt: 'Pockect SMS preview',
      },
    ],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date(),
    featured: true,
    repoName,
    topics: ['sms', 'web-app'],
    stars: 0,
    hasLiveDemo: Boolean(liveUrl),
  }
}

export function mergeCuratedFeaturedProjects(
  projects: PortfolioProject[],
  githubUsername: string
): PortfolioProject[] {
  if (projects.some(isPockectSmsProject)) {
    return projects
  }
  return [getCuratedPockectSmsProject(githubUsername), ...projects]
}

export const DEFAULT_FEATURED_PINNED_REPOS = [
  'pockect-sms',
  'pocket-sms',
  'pockect-sms-website',
  'pocket-sms-website',
  'pocketsms',
]

export function sortFeaturedWithPinned(
  projects: PortfolioProject[],
  pinnedRepoNames: string[]
): PortfolioProject[] {
  const pinned: PortfolioProject[] = []
  const rest: PortfolioProject[] = []

  for (const project of projects) {
    const keys = [project.repoName.toLowerCase(), project.slug.toLowerCase()]
    const isPinned =
      pinnedRepoNames.some((name) => keys.includes(name)) ||
      isPockectSmsProject(project)

    if (isPinned) pinned.push(project)
    else rest.push(project)
  }

  pinned.sort((a, b) => {
    const indexA = pinnedRepoNames.findIndex((name) =>
      [a.repoName, a.slug].map((s) => s.toLowerCase()).includes(name)
    )
    const indexB = pinnedRepoNames.findIndex((name) =>
      [b.repoName, b.slug].map((s) => s.toLowerCase()).includes(name)
    )
    const rankA = indexA === -1 ? pinnedRepoNames.length : indexA
    const rankB = indexB === -1 ? pinnedRepoNames.length : indexB
    return rankA - rankB
  })

  return [...pinned, ...rest]
}
