export type ProjectCategory =
  | 'all'
  | 'website'
  | 'web-app'
  | 'mobile-app'
  | 'e-commerce'
  | 'wordpress'
  | 'shopify'
  | 'saas'
  | 'dashboard'
  | 'other'

export const PROJECT_CATEGORY_LABELS: Record<
  Exclude<ProjectCategory, 'all'>,
  string
> = {
  website: 'Website',
  'web-app': 'Web Application',
  'mobile-app': 'Mobile Application',
  'e-commerce': 'E-commerce',
  wordpress: 'WordPress',
  shopify: 'Shopify',
  saas: 'SaaS',
  dashboard: 'Dashboard',
  other: 'Other',
}

export const PROJECT_FILTER_OPTIONS: Array<{
  id: ProjectCategory
  label: string
}> = [
  { id: 'all', label: 'All Projects' },
  { id: 'website', label: 'Websites' },
  { id: 'web-app', label: 'Web Applications' },
  { id: 'mobile-app', label: 'Mobile Applications' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'saas', label: 'SaaS' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'other', label: 'Other' },
]

export interface PortfolioProjectImage {
  id: string
  url: string
  alt?: string | null
}

export interface PortfolioProject {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string | null
  problem: string | null
  solution: string | null
  outcome: string | null
  features: string[]
  techStack: string[]
  category: Exclude<ProjectCategory, 'all'>
  liveUrl: string | null
  githubUrl: string
  thumbnail: string
  /** Site screenshot when liveUrl is available; falls back to thumbnail */
  previewImage: string
  images: PortfolioProjectImage[]
  createdAt: Date
  updatedAt: Date
  featured: boolean
  repoName: string
  topics: string[]
  stars: number
  hasLiveDemo: boolean
}
