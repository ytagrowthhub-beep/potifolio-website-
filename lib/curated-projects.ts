import type { PortfolioProject } from './project-types'

/** Default live demo — override with POCKECT_SMS_LIVE_URL / POCKET_SMS_LIVE_URL */
export const DEFAULT_POCKET_SMS_LIVE_URL = 'https://pocket-sms-link.vercel.app/'

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
  'pocket-sms-link',
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

function fixPocketSmsTitle(title: string): string {
  return title.replace(/pockect/gi, 'Pocket')
}

export function getPockectSmsLiveUrl(): string {
  const liveUrlRaw =
    process.env.POCKECT_SMS_LIVE_URL ||
    process.env.POCKET_SMS_LIVE_URL ||
    DEFAULT_POCKET_SMS_LIVE_URL
  return isValidLiveUrl(liveUrlRaw)
    ? liveUrlRaw.trim().replace(/\/$/, '') + '/'
    : DEFAULT_POCKET_SMS_LIVE_URL
}

function getSiteScreenshot(liveUrl: string): string {
  const normalized = liveUrl.replace(/\/$/, '') + '/'
  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(normalized)}/large/`
}

/** Apply live URL + homepage screenshot onto an existing Pocket SMS project */
export function enrichPockectSmsProject(
  project: PortfolioProject
): PortfolioProject {
  if (!isPockectSmsProject(project)) return project

  const liveUrl = getPockectSmsLiveUrl()
  const homepageThumb = getSiteScreenshot(liveUrl)

  return {
    ...project,
    title: fixPocketSmsTitle(project.title),
    liveUrl,
    thumbnail: homepageThumb,
    previewImage: homepageThumb,
    hasLiveDemo: true,
    featured: true,
    outcome: 'Live website available for preview and use.',
    images: [
      {
        id: `${project.id}-home-preview`,
        url: homepageThumb,
        alt: `${fixPocketSmsTitle(project.title)} homepage preview`,
      },
      ...project.images.filter((img) => img.url !== homepageThumb),
    ],
  }
}

export function getCuratedPockectSmsProject(
  githubUsername: string
): PortfolioProject {
  const liveUrl = getPockectSmsLiveUrl()
  const homepageThumb = getSiteScreenshot(liveUrl)
  const repoName = 'pockect-sms'

  return {
    id: 'curated-pockect-sms',
    slug: 'pockect-sms',
    title: 'Pocket SMS',
    description:
      'Virtual SMS platform for sending and receiving texts online — instant numbers, real-time inbox, and secure messaging for verification and business use.',
    longDescription:
      '<p>Pocket SMS (TextFlow) is a web platform for virtual phone numbers and SMS messaging. Users can get numbers from 50+ countries, manage a real-time inbox, and integrate via API for verification and business communication.</p>',
    problem:
      'Businesses and individuals need private, accessible virtual numbers for verification and messaging without relying on a personal phone.',
    solution:
      'Built a responsive web app with instant virtual numbers, a chat-style SMS inbox, transparent pricing, and a developer-friendly API.',
    outcome: 'Live website available for preview and use.',
    features: [
      'Instant virtual numbers (50+ countries)',
      'Real-time SMS inbox',
      'Secure, private messaging',
      'Developer-friendly API',
      'Transparent pricing plans',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'web-app',
    liveUrl,
    githubUrl: `https://github.com/${githubUsername}/${repoName}`,
    thumbnail: homepageThumb,
    previewImage: homepageThumb,
    images: [
      {
        id: 'curated-pockect-sms-1',
        url: homepageThumb,
        alt: 'Pocket SMS homepage preview',
      },
    ],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date(),
    featured: true,
    repoName,
    topics: ['sms', 'web-app', 'saas'],
    stars: 0,
    hasLiveDemo: true,
  }
}

/** Ensure Pocket SMS appears in project lists (home + /projects), even if the GitHub repo is missing */
export function mergeCuratedFeaturedProjects(
  projects: PortfolioProject[],
  githubUsername: string
): PortfolioProject[] {
  const withEnrichment = projects.map(enrichPockectSmsProject)

  if (withEnrichment.some(isPockectSmsProject)) {
    return withEnrichment
  }

  return [getCuratedPockectSmsProject(githubUsername), ...withEnrichment]
}

export const DEFAULT_FEATURED_PINNED_REPOS = [
  'pockect-sms',
  'pocket-sms',
  'pocket-sms-link',
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
