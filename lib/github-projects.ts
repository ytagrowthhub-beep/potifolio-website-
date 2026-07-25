import { cache } from 'react'
import type { PortfolioProject, ProjectCategory } from './project-types'
import { getProjectOverride } from './project-overrides'
import {
  DEFAULT_FEATURED_PINNED_REPOS,
  getCuratedPockectSmsProject,
  isPockectSmsProject,
  mergeCuratedFeaturedProjects,
  sortFeaturedWithPinned,
} from './curated-projects'

const GITHUB_API = 'https://api.github.com'
const REVALIDATE_SECONDS = 3600

const EXCLUDED_NAME_PATTERNS = [
  /^test[-_]/i,
  /[-_]test$/i,
  /boilerplate/i,
  /template/i,
  /sandbox/i,
  /playground/i,
  /hello[-_]world/i,
  /^demo[-_]/i,
  /[-_]demo$/i,
  /tutorial/i,
  /learning[-_]/i,
  /course[-_]/i,
  /^wip[-_]/i,
  /[-_]wip$/i,
  /unfinished/i,
  /sample[-_]/i,
]

const DEFAULT_EXCLUDED_REPOS = [
  'youtube-portfolio',
  'my-portfolio-websiite',
  'my-portfolio-website',
]

/** Hidden from home page featured section only (still on /projects unless globally excluded) */
const DEFAULT_FEATURED_EXCLUDED_REPOS = ['young-wears']

const FEATURED_EXCLUDED_NAME_PATTERNS = [/^young[-_]?wears$/i]

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  archived: boolean
  fork: boolean
  private: boolean
  disabled: boolean
  stargazers_count: number
  has_pages: boolean
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
}

function getGitHubUsername(): string {
  return process.env.GITHUB_USERNAME || 'ytagrowthhub-beep'
}

function getExcludedRepos(): Set<string> {
  const fromEnv = (process.env.GITHUB_EXCLUDE_REPOS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return new Set([...DEFAULT_EXCLUDED_REPOS, ...fromEnv].map((s) => s.toLowerCase()))
}

function getFeaturedExcludedRepos(): Set<string> {
  const fromEnv = (process.env.FEATURED_EXCLUDE_REPOS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return new Set(
    [...DEFAULT_FEATURED_EXCLUDED_REPOS, ...fromEnv].map((s) => s.toLowerCase())
  )
}

function isExcludedFromFeatured(project: PortfolioProject): boolean {
  const excluded = getFeaturedExcludedRepos()
  const repoKey = project.repoName.toLowerCase()
  const slugKey = project.slug.toLowerCase()

  if (excluded.has(repoKey) || excluded.has(slugKey)) {
    return true
  }

  const label = `${project.repoName} ${project.slug} ${project.title}`.toLowerCase()
  return FEATURED_EXCLUDED_NAME_PATTERNS.some((pattern) => pattern.test(label))
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` }
  }
  return headers
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`GitHub API error ${res.status} for ${path}`)
      }
      return null
    }
    return (await res.json()) as T
  } catch (error) {
    console.error(`GitHub fetch failed for ${path}:`, error)
    return null
  }
}

export function isValidHttpUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatTitle(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function getOpenGraphImage(owner: string, repo: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`
}

function getGitHubPagesUrl(owner: string, repo: string): string {
  return `https://${owner}.github.io/${repo}/`
}

const LIVE_URL_PATTERN =
  /https?:\/\/[^\s)\]"'<>]+/gi

const DEPLOYMENT_HOST_PATTERN =
  /(?:https?:\/\/)?(?:[\w-]+\.)?(?:vercel\.app|netlify\.app|github\.io|onrender\.com|railway\.app|fly\.dev|pages\.dev)[^\s)\]"'<>]*/gi

function extractUrlsFromText(text: string): string[] {
  const matches = text.match(LIVE_URL_PATTERN) || []
  return matches
    .map((u) => u.replace(/[.,;]+$/, ''))
    .filter((u) => isValidHttpUrl(u))
}

function pickBestLiveUrl(urls: string[]): string | null {
  const scored = urls.map((url) => {
    const lower = url.toLowerCase()
    let score = 0
    if (/vercel\.app|netlify\.app/.test(lower)) score += 3
    if (!/localhost|127\.0\.0\.1|example\.com/.test(lower)) score += 2
    if (!/\/api\//.test(lower)) score += 1
    return { url: normalizeUrl(url), score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored[0]?.url ?? null
}

async function urlIsReachable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      next: { revalidate: REVALIDATE_SECONDS },
    })
    clearTimeout(timeout)
    return res.ok || (res.status >= 300 && res.status < 400)
  } catch {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 6000)
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        next: { revalidate: REVALIDATE_SECONDS },
      })
      clearTimeout(timeout)
      return res.ok
    } catch {
      return false
    }
  }
}

async function probeCandidateUrls(repoName: string): Promise<string | null> {
  const candidates = [
    `https://${repoName}.vercel.app`,
    `https://${repoName.replace(/-/g, '')}.vercel.app`,
    `https://${repoName}.netlify.app`,
    getGitHubPagesUrl(getGitHubUsername(), repoName),
  ]

  for (const url of candidates) {
    if (await urlIsReachable(url)) {
      return url
    }
  }
  return null
}

interface DeploymentStatus {
  state: string
  target_url: string | null
  environment_url?: string | null
}

async function fetchDeploymentLiveUrl(
  owner: string,
  repo: string
): Promise<string | null> {
  const deployments = await githubFetch<
    Array<{ id: number; statuses_url: string }>
  >(`/repos/${owner}/${repo}/deployments?per_page=10`)

  if (!deployments?.length) return null

  for (const deployment of deployments) {
    const statuses = await githubFetch<DeploymentStatus[]>(
      `/repos/${owner}/${repo}/deployments/${deployment.id}/statuses`
    )
    if (!statuses?.length) continue

    const success = statuses.find((s) => s.state === 'success')
    const candidate = success?.environment_url || success?.target_url
    if (candidate && isValidHttpUrl(candidate) && (await urlIsReachable(candidate))) {
      return normalizeUrl(candidate)
    }

    const latest = statuses[0]
    const fallback = latest?.environment_url || latest?.target_url
    if (
      fallback &&
      isValidHttpUrl(fallback) &&
      (await urlIsReachable(fallback))
    ) {
      return normalizeUrl(fallback)
    }
  }

  return null
}

async function fetchVercelJsonLiveUrl(
  owner: string,
  repo: string
): Promise<string | null> {
  const data = await githubFetch<{ content?: string; encoding?: string }>(
    `/repos/${owner}/${repo}/contents/vercel.json`
  )
  if (!data?.content || data.encoding !== 'base64') return null

  try {
    const json = JSON.parse(
      Buffer.from(data.content, 'base64').toString('utf-8')
    ) as {
      redirects?: Array<{ destination?: string }>
    }

    for (const redirect of json.redirects || []) {
      const destination = redirect.destination
      if (!destination) continue

      const baseUrl = destination
        .replace(/\/:path\*.*$/, '')
        .replace(/:path\*.*$/, '')
        .replace(/\/$/, '')

      if (isValidHttpUrl(baseUrl) && (await urlIsReachable(baseUrl))) {
        return normalizeUrl(baseUrl)
      }
    }
  } catch {
    return null
  }

  return null
}

async function resolveLiveUrl(
  repo: GitHubRepo,
  owner: string,
  readmeRaw?: string | null
): Promise<string | null> {
  if (isValidHttpUrl(repo.homepage)) {
    const homepage = normalizeUrl(repo.homepage!)
    if (await urlIsReachable(homepage)) {
      return homepage
    }
  }

  const override = getProjectOverride(repo.name)
  if (override.liveUrl && isValidHttpUrl(override.liveUrl)) {
    const normalized = normalizeUrl(override.liveUrl)
    const envUrls = process.env.GITHUB_PROJECT_LIVE_URLS
    const repoKey = repo.name.toLowerCase()
    const hasEnvOverride =
      Boolean(process.env.YOUNG_WEARS_LIVE_URL && repoKey === 'young-wears') ||
      Boolean(
        process.env.PAULTECNOLOGY_LIVE_URL &&
          repoKey === 'paultecnology-potifolio'
      ) ||
      Boolean(
        override.liveUrl &&
          (repoKey === 'pockect-sms' ||
            repoKey === 'pocket-sms' ||
            repoKey === 'pocket-sms-link' ||
            isPockectSmsProject({
              repoName: repo.name,
              slug: slugify(repo.name),
              title: repo.name,
            }))
      ) ||
      Boolean(envUrls?.toLowerCase().includes(repoKey))
    if (hasEnvOverride || (await urlIsReachable(normalized))) {
      return normalized
    }
  }

  const fromVercelJson = await fetchVercelJsonLiveUrl(owner, repo.name)
  if (fromVercelJson) return fromVercelJson

  if (repo.has_pages) {
    const pagesUrl = getGitHubPagesUrl(owner, repo.name)
    if (await urlIsReachable(pagesUrl)) {
      return pagesUrl
    }
  }

  if (readmeRaw) {
    const fromReadme = pickBestLiveUrl(extractUrlsFromText(readmeRaw))
    if (fromReadme && (await urlIsReachable(fromReadme))) {
      return fromReadme
    }

    const deployHosts = readmeRaw.match(DEPLOYMENT_HOST_PATTERN) || []
    const fromHosts = pickBestLiveUrl(
      deployHosts.map((h) => (h.startsWith('http') ? h : `https://${h}`))
    )
    if (fromHosts && (await urlIsReachable(fromHosts))) {
      return fromHosts
    }
  }

  const fromDeployment = await fetchDeploymentLiveUrl(owner, repo.name)
  if (fromDeployment) return fromDeployment

  return probeCandidateUrls(repo.name)
}

function getSitePreviewImage(liveUrl: string, fallback: string): string {
  try {
    const encoded = encodeURIComponent(liveUrl)
    return `https://v1.screenshot.11ty.dev/${encoded}/large/`
  } catch {
    return fallback
  }
}

function getOpenGraphFallback(owner: string, repo: string): string {
  return getOpenGraphImage(owner, repo)
}

function shouldExcludeRepo(repo: GitHubRepo): boolean {
  if (repo.private || repo.archived || repo.disabled || repo.fork) {
    return true
  }

  const excluded = getExcludedRepos()
  if (excluded.has(repo.name.toLowerCase())) {
    return true
  }

  if (EXCLUDED_NAME_PATTERNS.some((pattern) => pattern.test(repo.name))) {
    return true
  }

  // Empty repos with no deployment are likely unfinished
  if (repo.size === 0 && !repo.homepage && !repo.has_pages) {
    return true
  }

  return false
}

const LANGUAGE_LABELS: Record<string, string> = {
  TypeScript: 'TypeScript',
  JavaScript: 'JavaScript',
  HTML: 'HTML',
  CSS: 'CSS',
  SCSS: 'SCSS',
  Python: 'Python',
  PHP: 'PHP',
  Ruby: 'Ruby',
  Go: 'Go',
  Rust: 'Rust',
  Java: 'Java',
  Kotlin: 'Kotlin',
  Swift: 'Swift',
  'Vue': 'Vue.js',
  Dart: 'Flutter',
}

function detectCategory(
  repo: GitHubRepo,
  languages: Record<string, number>,
  techStack: string[]
): Exclude<ProjectCategory, 'all'> {
  const haystack = [
    repo.name,
    repo.description || '',
    ...(repo.topics || []),
    ...techStack,
  ]
    .join(' ')
    .toLowerCase()

  if (/wordpress|wp-theme|wp-plugin/.test(haystack)) return 'wordpress'
  if (/shopify/.test(haystack)) return 'shopify'
  if (
    /e-?commerce|ecommerce|shop|store|cart|checkout|woocommerce|young-wears|wears/.test(
      haystack
    )
  ) {
    return 'e-commerce'
  }
  if (/react-native|flutter|expo|mobile-app|ios|android/.test(haystack)) {
    return 'mobile-app'
  }
  if (/saas|subscription|multi-tenant/.test(haystack)) return 'saas'
  if (/dashboard|admin-panel|analytics|crm/.test(haystack)) return 'dashboard'

  const langKeys = Object.keys(languages)
  const isMobile =
    langKeys.includes('Kotlin') ||
    langKeys.includes('Swift') ||
    langKeys.includes('Dart')
  if (isMobile) return 'mobile-app'

  const isStaticSite =
    (langKeys.includes('HTML') || langKeys.includes('CSS')) &&
    !langKeys.includes('TypeScript') &&
    !langKeys.includes('JavaScript') &&
    !langKeys.includes('Python')
  if (isStaticSite && !/next|react|vue|angular|svelte/.test(haystack)) {
    return 'website'
  }

  if (
    langKeys.includes('TypeScript') ||
    langKeys.includes('JavaScript') ||
    langKeys.includes('Python') ||
    /next\.?js|react|vue|angular|svelte|node|express|fastapi|django/.test(
      haystack
    )
  ) {
    return 'web-app'
  }

  if (/portfolio|landing|website|site/.test(haystack)) return 'website'

  return 'other'
}

function buildTechStack(
  primaryLanguage: string | null,
  languages: Record<string, number>,
  topics: string[]
): string[] {
  const fromLanguages = Object.keys(languages)
    .sort((a, b) => languages[b] - languages[a])
    .map((lang) => LANGUAGE_LABELS[lang] || lang)

  const frameworkTopics = topics.filter((t) =>
    /nextjs|next\.js|react|vue|tailwind|typescript|node|express|prisma|stripe|vercel|netlify/i.test(
      t
    )
  )

  const formattedTopics = frameworkTopics.map((t) =>
    t
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  )

  const stack = [...fromLanguages, ...formattedTopics]
  if (primaryLanguage && !stack.includes(LANGUAGE_LABELS[primaryLanguage] || primaryLanguage)) {
    stack.unshift(LANGUAGE_LABELS[primaryLanguage] || primaryLanguage)
  }

  return [...new Set(stack)].slice(0, 8)
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\n?/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractFeatures(readme: string): string[] {
  const features: string[] = []
  const lines = readme.split('\n')
  let inFeatures = false

  for (const line of lines) {
    if (/^#+\s*(features?|key features?|highlights?)/i.test(line)) {
      inFeatures = true
      continue
    }
    if (inFeatures && /^#+\s/.test(line) && !/^#+\s*(features?)/i.test(line)) {
      break
    }
    if (inFeatures) {
      const bullet = line.match(/^[-*+]\s+(.+)/)
      if (bullet) features.push(bullet[1].trim())
    }
  }

  return features.slice(0, 8)
}

function buildDescription(repo: GitHubRepo, readmePlain?: string): string {
  if (repo.description?.trim()) {
    return repo.description.trim()
  }
  if (readmePlain) {
    const firstParagraph = readmePlain.split('\n\n')[0]?.trim()
    if (firstParagraph && firstParagraph.length > 20) {
      return firstParagraph.slice(0, 220)
    }
  }
  return `A ${detectCategory(repo, {}, []).replace('-', ' ')} project built with modern web technologies.`
}

async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<Record<string, number>> {
  const data = await githubFetch<Record<string, number>>(
    `/repos/${owner}/${repo}/languages`
  )
  return data || {}
}

async function fetchRepoReadme(owner: string, repo: string): Promise<string | null> {
  const data = await githubFetch<{ content?: string; encoding?: string }>(
    `/repos/${owner}/${repo}/readme`
  )
  if (!data?.content || data.encoding !== 'base64') return null
  try {
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8')
    return decoded
  } catch {
    return null
  }
}

async function enrichRepo(
  repo: GitHubRepo,
  owner: string
): Promise<PortfolioProject | null> {
  const [languages, readmeRaw] = await Promise.all([
    fetchRepoLanguages(owner, repo.name),
    fetchRepoReadme(owner, repo.name),
  ])

  const readmePlain = readmeRaw ? stripMarkdown(readmeRaw) : undefined
  const override = getProjectOverride(repo.name)
  const techStack = buildTechStack(repo.language, languages, repo.topics || [])
  const category = detectCategory(repo, languages, techStack)
  const resolvedLive = await resolveLiveUrl(repo, owner, readmeRaw)
  const validatedLiveUrl = isValidHttpUrl(resolvedLive) ? resolvedLive : null
  const ogThumbnail = override.thumbnail || getOpenGraphFallback(owner, repo.name)
  const previewImage = validatedLiveUrl
    ? getSitePreviewImage(validatedLiveUrl, ogThumbnail)
    : ogThumbnail
  const description =
    override.description || buildDescription(repo, readmePlain)
  const features = readmeRaw ? extractFeatures(readmeRaw) : []

  const defaultFeatures =
    features.length > 0
      ? features
      : [
          'Responsive, mobile-first interface',
          'Production-ready codebase on GitHub',
          ...(validatedLiveUrl ? ['Live deployment available'] : []),
          ...(techStack.length > 0
            ? [`Built with ${techStack.slice(0, 3).join(', ')}`]
            : []),
        ]

  const longHtml = readmePlain
    ? `<p>${readmePlain.split('\n\n').slice(0, 3).join('</p><p>')}</p>`
    : `<p>${description}</p>`

  return {
    id: String(repo.id),
    slug: slugify(repo.name),
    title: formatTitle(repo.name),
    description,
    longDescription: longHtml,
    problem: `Build and ship a production-quality ${category.replace('-', ' ')} that showcases modern development practices and real-world usability.`,
    solution: readmePlain
      ? readmePlain.slice(0, 500)
      : `Designed and developed ${formatTitle(repo.name)} as a complete ${category.replace('-', ' ')} solution.`,
    outcome: validatedLiveUrl
      ? 'Successfully deployed and available for live preview.'
      : 'Source code available on GitHub for review.',
    features: defaultFeatures,
    techStack,
    category,
    liveUrl: validatedLiveUrl,
    githubUrl: repo.html_url,
    thumbnail: ogThumbnail,
    previewImage,
    images: [
      {
        id: `${repo.id}-1`,
        url: previewImage,
        alt: `${formatTitle(repo.name)} preview`,
      },
      ...(validatedLiveUrl && previewImage !== ogThumbnail
        ? [
            {
              id: `${repo.id}-2`,
              url: ogThumbnail,
              alt: `${formatTitle(repo.name)} repository preview`,
            },
          ]
        : []),
    ],
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
    featured: Boolean(validatedLiveUrl),
    repoName: repo.name,
    topics: repo.topics || [],
    stars: repo.stargazers_count,
    hasLiveDemo: Boolean(validatedLiveUrl),
  }
}

function sortProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return [...projects].sort((a, b) => {
    const pinA = isPockectSmsProject(a) ? 1 : 0
    const pinB = isPockectSmsProject(b) ? 1 : 0
    if (pinA !== pinB) return pinB - pinA

    if (a.hasLiveDemo !== b.hasLiveDemo) {
      return a.hasLiveDemo ? -1 : 1
    }
    return b.updatedAt.getTime() - a.updatedAt.getTime()
  })
}

export const fetchGitHubProjects = cache(async (): Promise<PortfolioProject[]> => {
  const username = getGitHubUsername()
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100&sort=updated&type=owner`
  )

  if (!repos?.length) {
    return mergeCuratedFeaturedProjects([], username)
  }

  const eligible = repos.filter((repo) => !shouldExcludeRepo(repo))
  const enriched = await Promise.all(
    eligible.map((repo) => enrichRepo(repo, username))
  )

  return sortProjects(
    mergeCuratedFeaturedProjects(
      enriched.filter((p): p is PortfolioProject => p !== null),
      username
    )
  )
})

export async function getGitHubProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  const projects = await fetchGitHubProjects()
  const match = projects.find((p) => p.slug === slug)
  if (match) return match

  if (
    slug === 'pockect-sms' ||
    slug === 'pocket-sms' ||
    slug === 'pocket-sms-link'
  ) {
    return getCuratedPockectSmsProject(getGitHubUsername())
  }

  return null
}

export async function getFeaturedGitHubProjects(
  limit?: number
): Promise<PortfolioProject[]> {
  const username = getGitHubUsername()
  const pinnedFromEnv = (process.env.FEATURED_PINNED_REPOS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  const pinnedRepos =
    pinnedFromEnv.length > 0 ? pinnedFromEnv : DEFAULT_FEATURED_PINNED_REPOS

  let projects = await fetchGitHubProjects()
  projects = projects.filter((p) => !isExcludedFromFeatured(p))
  projects = mergeCuratedFeaturedProjects(projects, username)
  projects = sortFeaturedWithPinned(projects, pinnedRepos)

  if (limit == null || limit <= 0) {
    return projects
  }

  return projects.slice(0, limit)
}

export async function getGitHubProjectSlugs(): Promise<string[]> {
  const projects = await fetchGitHubProjects()
  const slugs = projects.map((p) => p.slug)
  if (!slugs.includes('pockect-sms') && !projects.some(isPockectSmsProject)) {
    slugs.unshift('pockect-sms')
  }
  return slugs
}

export const githubProjectsRevalidate = REVALIDATE_SECONDS
