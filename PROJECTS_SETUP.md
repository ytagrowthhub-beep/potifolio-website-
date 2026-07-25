# GitHub Portfolio Projects

Projects are **synced automatically from GitHub** — no manual database seeding required for the portfolio grid.

## Configuration

Add to `.env` (see `.env.example`):

```env
GITHUB_USERNAME=ytagrowthhub-beep
# Optional: higher API rate limits
# GITHUB_TOKEN=ghp_...
# Hide specific repos from the portfolio
# GITHUB_EXCLUDE_REPOS=my-portfolio-websiite,draft-repo
```

## How it works

- Fetches public repositories from `GITHUB_USERNAME`
- Excludes archived, private, forked, test/template, and empty unfinished repos
- Prioritizes repos with live URLs (`homepage`, Vercel, Netlify, GitHub Pages)
- Revalidates every hour (`revalidate: 3600`)
- New GitHub repos appear on the site after the next build or ISR refresh

## Live URLs

Set the **Website** field on each GitHub repository (Settings → General) to your Vercel/Netlify/custom domain. Repos with `homepage` show the **View Live Project** button.

## Pages

| Route | Description |
|-------|-------------|
| `/#projects` | Featured projects (up to 6, live demos first) |
| `/projects` | Full grid with category filters |
| `/projects/[slug]` | Detail page with overview, tech stack, live preview |

## Categories

Auto-detected from repo name, description, topics, and languages: Website, Web App, Mobile, E-commerce, WordPress, Shopify, SaaS, Dashboard, Other.

## Optional database

Prisma `Project` models are no longer used for the public portfolio. GitHub is the source of truth.
