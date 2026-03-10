import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { ProjectGallery } from '@/components/ProjectGallery'

// Static fallback data for projects (used when database is not configured)
const staticProjects = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
    // Uses public/asset/ecommerce.webp
    thumbnail: '/asset/ecommerce.webp',
    createdAt: new Date('2024-01-10'),
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
    techStack: ['Next.js', 'TypeScript', 'Stripe API', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    longDescription:
      '<p>A comprehensive e-commerce solution built with modern web technologies. This platform provides a seamless shopping experience with real-time inventory management, secure payment processing, and an intuitive admin interface.</p><p>The platform supports multiple payment gateways, order tracking, and customer management features that help businesses scale their online presence.</p>',
    problem:
      'Small businesses needed an affordable, scalable e-commerce solution without the complexity and cost of enterprise platforms.',
    solution:
      'Designed a modular architecture with Next.js and serverless APIs, integrated Stripe for secure payments, and built an admin dashboard for managing products, orders, and customers.',
    outcome:
      'Launched platform serving 500+ businesses with 10,000+ active products and 99.9% uptime, processing over $2M in transactions.',
    features: [
      'Real-time shopping cart and checkout flow',
      'Secure payment processing with Stripe',
      'Inventory and order management dashboard',
      'Customer accounts and order history',
      'SEO-friendly product pages',
    ],
    images: [
      { id: 'e-1', url: '/asset/ecommerce.webp', alt: 'E-commerce home page' },
      { id: 'e-2', url: '/asset/ecommerce.webp', alt: 'Product listing page' },
      { id: 'e-3', url: '/asset/ecommerce.webp', alt: 'Admin dashboard' },
    ],
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, team collaboration, and project tracking.',
    // Uses public/asset/task management.png
    thumbnail: '/asset/task management.png',
    createdAt: new Date('2024-02-05'),
    liveUrl: 'https://example-taskapp.com',
    githubUrl: 'https://github.com/example/taskapp',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    longDescription:
      '<p>An intuitive task management application designed for teams to collaborate effectively. Features include real-time updates, drag-and-drop task organization, and comprehensive project analytics.</p><p>The app helps teams stay organized, meet deadlines, and improve productivity through visual project boards and automated notifications.</p>',
    problem:
      'Teams struggled with scattered task information across multiple tools, leading to missed deadlines and poor collaboration.',
    solution:
      'Created a unified platform with real-time synchronization powered by WebSockets, Kanban-style boards, and integrated project analytics to keep everyone aligned.',
    outcome:
      'Adopted by 50+ teams with 1,000+ active users, reducing project completion time by 30% and improving collaboration scores by 45%.',
    features: [
      'Real-time task updates with WebSockets',
      'Drag-and-drop Kanban boards',
      'Team workspaces and permissions',
      'Project analytics and reporting',
      'Due date reminders and notifications',
    ],
    images: [
      { id: 't-1', url: '/asset/task management.png', alt: 'Task board overview' },
      { id: 't-2', url: '/asset/task management.png', alt: 'Kanban board' },
      { id: 't-3', url: '/asset/task management.png', alt: 'Project analytics dashboard' },
    ],
  },
  {
    slug: 'social-media-dashboard',
    title: 'Social Media Dashboard',
    description:
      'A comprehensive social media management dashboard for scheduling posts, analytics, and multi-platform management.',
    // Uses public/asset/social media.jpg
    thumbnail: '/asset/social media.jpg',
    createdAt: new Date('2024-03-01'),
    liveUrl: 'https://example-social.com',
    githubUrl: 'https://github.com/example/social-dashboard',
    techStack: ['Next.js', 'TypeScript', 'Twitter API', 'PostgreSQL', 'Chart.js'],
    longDescription:
      '<p>A powerful social media management tool that allows users to manage multiple social media accounts from one dashboard. Schedule posts, analyze performance, and engage with audiences across platforms.</p><p>The dashboard provides insights into audience engagement, best posting times, and content performance metrics.</p>',
    problem:
      'Social media managers spent too much time switching between platforms and lacked unified analytics to measure campaign effectiveness.',
    solution:
      'Built a centralized dashboard integrating multiple social APIs, with cross-platform scheduling, queue management, and analytics visualizations.',
    outcome:
      'Serving 200+ businesses managing 1,500+ social accounts, increasing engagement by 60% and saving ~15 hours per week per user.',
    features: [
      'Multi-platform post scheduling',
      'Content calendar and queue management',
      'Engagement and reach analytics',
      'Best-time-to-post recommendations',
      'Team collaboration tools',
    ],
    images: [
      { id: 's-1', url: '/asset/social media.jpg', alt: 'Social dashboard overview' },
      { id: 's-2', url: '/asset/social media.jpg', alt: 'Engagement insights' },
      { id: 's-3', url: '/asset/social media.jpg', alt: 'Post scheduler' },
    ],
  },
  {
    slug: 'fitness-tracking-app',
    title: 'Fitness Tracking App',
    description:
      'A mobile-first fitness application with workout tracking, progress monitoring, and personalized training plans.',
    // Uses public/asset/fitness app.png
    thumbnail: '/asset/fitness app.png',
    createdAt: new Date('2024-03-20'),
    liveUrl: 'https://example-fitness.com',
    githubUrl: 'https://github.com/example/fitness-app',
    techStack: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Chart.js'],
    longDescription:
      '<p>A comprehensive fitness tracking application that helps users achieve their health goals. Features include workout logging, progress tracking, nutrition planning, and personalized training recommendations.</p><p>The app uses AI to create custom workout plans based on user goals, fitness level, and progress history.</p>',
    problem:
      'Fitness enthusiasts needed a simple way to track workouts, monitor progress, and receive personalized guidance without expensive trainers.',
    solution:
      'Developed a mobile-first app with intuitive workout logging, visual progress charts, and AI-powered plan suggestions based on performance.',
    outcome:
      '10,000+ active users with 85% retention; users reported meaningful improvements in strength and endurance within 12 weeks.',
    features: [
      'Workout and habit tracking',
      'Progress charts and analytics',
      'AI-generated workout plans',
      'Nutrition tracking integration',
      'Social challenges and leaderboards',
    ],
    images: [
      { id: 'f-1', url: '/asset/fitness app.png', alt: 'Workout summary screen' },
      { id: 'f-2', url: '/asset/fitness app.png', alt: 'Progress charts' },
      { id: 'f-3', url: '/asset/fitness app.png', alt: 'Workout library' },
    ],
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    description:
      'A property listing platform with advanced search, virtual tours, and agent management features.',
    // Uses public/asset/real estate.jpg
    thumbnail: '/asset/real estate.jpg',
    createdAt: new Date('2024-04-05'),
    liveUrl: 'https://example-realestate.com',
    githubUrl: 'https://github.com/example/realestate',
    techStack: ['Next.js', 'TypeScript', 'Mapbox API', 'PostgreSQL', 'Prisma'],
    longDescription:
      '<p>An advanced real estate platform connecting buyers, sellers, and agents. Features include property search with filters, virtual tour integration, mortgage calculator, and agent dashboard.</p><p>The platform uses geospatial search to help buyers discover properties in their ideal neighborhoods.</p>',
    problem:
      'Buyers struggled to compare properties across multiple sites, while agents needed better tools for managing listings and leads.',
    solution:
      'Built a unified platform with rich search filters, interactive maps, and agent tools for managing listings, inquiries, and appointments.',
    outcome:
      'Listed 5,000+ properties with 50,000+ monthly visitors, helping facilitate hundreds of successful transactions.',
    features: [
      'Advanced property search and filtering',
      'Interactive map with geospatial search',
      'Virtual tour and media galleries',
      'Agent CRM and lead tracking',
      'Mortgage calculator and affordability tools',
    ],
    images: [
      { id: 'r-1', url: '/asset/real estate.jpg', alt: 'Real estate home page' },
      { id: 'r-2', url: '/asset/real estate.jpg', alt: 'Map search view' },
      { id: 'r-3', url: '/asset/real estate.jpg', alt: 'Property listing detail' },
    ],
  },
  {
    slug: 'learning-management-system',
    title: 'Learning Management System',
    description:
      'An online learning platform with course creation, student management, and interactive learning features.',
    // Uses public/asset/learning management.png
    thumbnail: '/asset/learning management.png',
    createdAt: new Date('2024-04-25'),
    liveUrl: 'https://example-lms.com',
    githubUrl: 'https://github.com/example/lms',
    techStack: ['Next.js', 'TypeScript', 'AWS S3', 'PostgreSQL', 'Prisma'],
    longDescription:
      '<p>A comprehensive learning management system for educational institutions and online course creators. Features include course creation tools, student progress tracking, quizzes, and interactive content.</p><p>The platform supports video lessons, assignments, discussions, and certification upon course completion.</p>',
    problem:
      'Educators needed a flexible, scalable platform to deliver engaging online courses without heavy technical overhead.',
    solution:
      'Implemented a modular LMS with course builder, video streaming from AWS S3, quiz engine, and student progress dashboards.',
    outcome:
      'Used by 30+ institutions with thousands of students, hosting hundreds of courses with high completion and satisfaction rates.',
    features: [
      'Drag-and-drop course builder',
      'Video lessons and resource management',
      'Quizzes, assignments, and grading tools',
      'Student dashboards and progress tracking',
      'Completion certificates and reporting',
    ],
    images: [
      { id: 'l-1', url: '/asset/learning management.png', alt: 'LMS course catalog' },
      { id: 'l-2', url: '/asset/learning management.png', alt: 'Course detail page' },
      { id: 'l-3', url: '/asset/learning management.png', alt: 'Instructor dashboard' },
    ],
  },
]

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dbProject = await getProject(params.slug)
  const project = dbProject || staticProjects.find((p) => p.slug === params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail
        ? [{ url: project.thumbnail, width: 1200, height: 630 }]
        : [],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const dbProject = await getProject(params.slug)
  const project = dbProject || staticProjects.find((p) => p.slug === params.slug)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-wine text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            {project.createdAt && (
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span className="text-sm">
                  {formatDate(project.createdAt)}
                </span>
              </div>
            )}
            {project.liveUrl && (
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
                <span className="text-sm">Live Demo</span>
              </Link>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Github size={18} />
                <span className="text-sm">View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <ProjectGallery images={project.images as any} />
            )}

            {/* Long Description */}
            {project.longDescription && (
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                  Overview
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: project.longDescription }}
                />
              </div>
            )}

            {/* Problem */}
            {project.problem && (
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                  Problem
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                  Solution
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                  Outcome
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Features */}
            {project.features.length > 0 && (
              <div>
                <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-wine-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white text-wine-600 text-sm rounded-full font-medium border border-wine-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-wine-500 text-white font-semibold rounded-lg hover:bg-wine-600 transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Visit Live Site</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github size={20} />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
