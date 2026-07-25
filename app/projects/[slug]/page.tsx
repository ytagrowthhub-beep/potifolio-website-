import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ProjectGallery } from '@/components/ProjectGallery'
import {
  getGitHubProjectBySlug,
  getGitHubProjectSlugs,
  githubProjectsRevalidate,
} from '@/lib/github-projects'
import { PROJECT_CATEGORY_LABELS } from '@/lib/project-types'

export const revalidate = githubProjectsRevalidate

export async function generateStaticParams() {
  const slugs = await getGitHubProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getGitHubProjectBySlug(params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.previewImage || project.thumbnail,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getGitHubProjectBySlug(params.slug)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-wine py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center space-x-2 text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
            {PROJECT_CATEGORY_LABELS[project.category]}
          </span>

          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-6 max-w-3xl text-xl text-white/90">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
              <span className="text-sm">{formatDate(project.createdAt)}</span>
              </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-wine-600 transition-colors hover:bg-white/90"
              >
                <ExternalLink size={18} />
                <span>View Live Project</span>
              </a>
            )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <Github size={18} />
              <span>View Source Code</span>
              </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <section aria-labelledby="project-preview-heading">
              <h2
                id="project-preview-heading"
                className="mb-4 font-display text-3xl font-semibold text-gray-900"
              >
                Project Preview
              </h2>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/preview block overflow-hidden rounded-2xl border border-gray-200 shadow-lg ring-wine-500/0 transition-all hover:ring-2 hover:ring-wine-500/40"
                  aria-label={`Open live website for ${project.title} in a new tab`}
                >
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image
                      src={project.previewImage || project.thumbnail}
                      alt={`${project.title} website screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/preview:scale-[1.02]"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
                      <ExternalLink size={32} className="text-white" />
                      <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-wine-600">
                        Open Live Website
                      </span>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                  <Image
                    src={project.previewImage || project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}
              <p className="mt-3 text-sm text-gray-600">
                {project.liveUrl ? (
                  <>
                    Click the preview to visit the live site in a new tab, or use{' '}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-wine-600 hover:underline"
                    >
                      View Live Project
                    </a>
                    .
                  </>
                ) : (
                  <>
                    Live website link is not configured yet. Add your deployment URL
                    in GitHub (repo Settings → Website) or set{' '}
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                      YOUNG_WEARS_LIVE_URL
                    </code>{' '}
                    in your environment for this project.
                  </>
                )}
              </p>
            </section>

            {project.images.length > 0 && (
              <ProjectGallery images={project.images} />
            )}

            {project.longDescription && (
              <div>
                <h2 className="mb-4 font-display text-3xl font-semibold text-gray-900">
                  Overview
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: project.longDescription }}
                />
              </div>
            )}

            {project.problem && (
              <div>
                <h2 className="mb-4 font-display text-3xl font-semibold text-gray-900">
                  Challenge
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className="mb-4 font-display text-3xl font-semibold text-gray-900">
                  Solution
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {project.solution}
                </p>
              </div>
            )}

            {project.outcome && (
              <div>
                <h2 className="mb-4 font-display text-3xl font-semibold text-gray-900">
                  Outcome
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {project.outcome}
                </p>
              </div>
            )}

            {project.features.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-3xl font-semibold text-gray-900">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-wine-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {project.techStack.length > 0 && (
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="mb-4 font-display text-xl font-semibold text-gray-900">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-wine-200 bg-white px-3 py-1.5 text-sm font-medium text-wine-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-wine-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-wine-600"
                  >
                    <ExternalLink size={20} />
                    <span>View Live Project</span>
                  </a>
                )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    <Github size={20} />
                  <span>View Source Code</span>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
