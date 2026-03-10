import { ProjectsClient } from './ProjectsClient'
import { prisma } from '@/lib/prisma'

// Sample projects data (fallback if database is empty)
// Add matching images in `/public/projects` for each `thumbnail` and gallery image below.
const sampleProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description:
      'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
    // Image file: public/asset/ecommerce.webp
    thumbnail: '/asset/ecommerce.webp',
    techStack: ['Next.js', 'TypeScript', 'Stripe API', 'PostgreSQL'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
    images: [
      { url: '/asset/ecommerce.webp' },
      { url: '/asset/ecommerce.webp' },
      { url: '/asset/ecommerce.webp' },
    ],
  },
  {
    id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    description:
      'A collaborative task management application with real-time updates, team collaboration, and project tracking.',
    // Image file: public/asset/task management.png
    thumbnail: '/asset/task management.png',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: 'https://example-taskapp.com',
    githubUrl: 'https://github.com/example/taskapp',
    images: [
      { url: '/asset/task management.png' },
      { url: '/asset/task management.png' },
      { url: '/asset/task management.png' },
    ],
  },
  {
    id: '3',
    title: 'Social Media Dashboard',
    slug: 'social-media-dashboard',
    description:
      'A comprehensive social media management dashboard for scheduling posts, analytics, and multi-platform management.',
    // Image file: public/asset/social media.jpg
    thumbnail: '/asset/social media.jpg',
    techStack: ['Next.js', 'TypeScript', 'Twitter API', 'PostgreSQL'],
    liveUrl: 'https://example-social.com',
    githubUrl: 'https://github.com/example/social-dashboard',
    images: [
      { url: '/asset/social media.jpg' },
      { url: '/asset/social media.jpg' },
      { url: '/asset/social media.jpg' },
    ],
  },
  {
    id: '4',
    title: 'Fitness Tracking App',
    slug: 'fitness-tracking-app',
    description:
      'A mobile-first fitness application with workout tracking, progress monitoring, and personalized training plans.',
    // Image file: public/asset/fitness app.png
    thumbnail: '/asset/fitness app.png',
    techStack: ['React Native', 'Firebase', 'TensorFlow', 'Node.js'],
    liveUrl: 'https://example-fitness.com',
    githubUrl: 'https://github.com/example/fitness-app',
    images: [
      { url: '/asset/fitness app.png' },
      { url: '/asset/fitness app.png' },
      { url: '/asset/fitness app.png' },
    ],
  },
  {
    id: '5',
    title: 'Real Estate Platform',
    slug: 'real-estate-platform',
    description:
      'A property listing platform with advanced search, virtual tours, and agent management features.',
    // Image file: public/asset/real estate.jpg
    thumbnail: '/asset/real estate.jpg',
    techStack: ['Next.js', 'TypeScript', 'Mapbox API', 'PostgreSQL'],
    liveUrl: 'https://example-realestate.com',
    githubUrl: 'https://github.com/example/realestate',
    images: [
      { url: '/asset/real estate.jpg' },
      { url: '/asset/real estate.jpg' },
      { url: '/asset/real estate.jpg' },
    ],
  },
  {
    id: '6',
    title: 'Learning Management System',
    slug: 'learning-management-system',
    description:
      'An online learning platform with course creation, student management, and interactive learning features.',
    // Image file: public/asset/learning management.png
    thumbnail: '/asset/learning management.png',
    techStack: ['Next.js', 'TypeScript', 'AWS S3', 'PostgreSQL'],
    liveUrl: 'https://example-lms.com',
    githubUrl: 'https://github.com/example/lms',
    images: [
      { url: '/asset/learning management.png' },
      { url: '/asset/learning management.png' },
      { url: '/asset/learning management.png' },
    ],
  },
]

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    })
    
    // If no projects in database, return sample projects
    if (projects.length === 0) {
      console.log('No projects in database, using sample projects')
      return sampleProjects.map(p => ({
        ...p,
        id: p.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        featured: true,
        longDescription: null,
        problem: null,
        solution: null,
        outcome: null,
        features: [],
      })) as any
    }
    
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return sample projects as fallback
    console.log('Database error, using sample projects')
    return sampleProjects.map(p => ({
      ...p,
      id: p.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: true,
      longDescription: null,
      problem: null,
      solution: null,
      outcome: null,
      features: [],
    })) as any
  }
}

export async function Projects() {
  const projects = await getProjects()

  return <ProjectsClient projects={projects} />
}
