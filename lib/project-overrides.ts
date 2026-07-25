/**
 * Manual project metadata when GitHub homepage is missing or deployments are not linked.
 * Override via env: GITHUB_PROJECT_LIVE_URLS={"young-wears":"https://yoursite.com"}
 */
export interface ProjectOverride {
  liveUrl?: string
  thumbnail?: string
  description?: string
}

const BUILTIN_OVERRIDES: Record<string, ProjectOverride> = {
  'young-wears': {
    // Set YOUNG_WEARS_LIVE_URL in .env to your Vercel production URL (GitHub → repo → Website field also works)
    liveUrl: process.env.YOUNG_WEARS_LIVE_URL,
    description:
      'Modern full-stack fashion e-commerce platform with Next.js, Supabase auth, and a product catalog API.',
  },
  'paultecnology-potifolio': {
    liveUrl: process.env.PAULTECNOLOGY_LIVE_URL || 'https://paultecnology.com',
    description:
      'Professional digital agency website for Paultecnology — web development, marketing, and brand services.',
  },
  'pockect-sms': {
    liveUrl:
      process.env.POCKECT_SMS_LIVE_URL ||
      process.env.POCKET_SMS_LIVE_URL ||
      'https://pocket-sms-link.vercel.app/',
    description:
      'Virtual SMS platform for sending and receiving texts online — instant numbers, real-time inbox, and secure messaging.',
  },
  'pocket-sms': {
    liveUrl:
      process.env.POCKECT_SMS_LIVE_URL ||
      process.env.POCKET_SMS_LIVE_URL ||
      'https://pocket-sms-link.vercel.app/',
    description:
      'Virtual SMS platform for sending and receiving texts online — instant numbers, real-time inbox, and secure messaging.',
  },
  'pocket-sms-link': {
    liveUrl:
      process.env.POCKECT_SMS_LIVE_URL ||
      process.env.POCKET_SMS_LIVE_URL ||
      'https://pocket-sms-link.vercel.app/',
    description:
      'Virtual SMS platform for sending and receiving texts online — instant numbers, real-time inbox, and secure messaging.',
  },
}

function parseEnvLiveUrls(): Record<string, string> {
  const raw = process.env.GITHUB_PROJECT_LIVE_URLS
  if (!raw) return {}

  try {
    const parsed = JSON.parse(raw) as Record<string, string>
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [k.toLowerCase(), v])
    )
  } catch {
    return {}
  }
}

export function getProjectOverride(repoName: string): ProjectOverride {
  const key = repoName.toLowerCase()
  const fromEnv = parseEnvLiveUrls()
  const singleEnv: ProjectOverride = {}
  if (key === 'young-wears' && process.env.YOUNG_WEARS_LIVE_URL) {
    singleEnv.liveUrl = process.env.YOUNG_WEARS_LIVE_URL
  }
  if (key === 'paultecnology-potifolio' && process.env.PAULTECNOLOGY_LIVE_URL) {
    singleEnv.liveUrl = process.env.PAULTECNOLOGY_LIVE_URL
  }
  if (
    (key === 'pockect-sms' || key === 'pocket-sms') &&
    (process.env.POCKECT_SMS_LIVE_URL || process.env.POCKET_SMS_LIVE_URL)
  ) {
    singleEnv.liveUrl =
      process.env.POCKECT_SMS_LIVE_URL || process.env.POCKET_SMS_LIVE_URL
  }

  return {
    ...BUILTIN_OVERRIDES[key],
    ...(fromEnv[key] ? { liveUrl: fromEnv[key] } : {}),
    ...singleEnv,
  }
}
