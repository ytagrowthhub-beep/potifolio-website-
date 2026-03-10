import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create 6 different projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
      longDescription: '<p>A comprehensive e-commerce solution built with modern web technologies. This platform provides a seamless shopping experience with real-time inventory management, secure payment processing, and an intuitive admin interface.</p><p>The platform supports multiple payment gateways, order tracking, and customer management features that help businesses scale their online presence.</p>',
      problem: 'Small businesses needed an affordable, scalable e-commerce solution that could handle growing inventory and customer base without requiring extensive technical knowledge.',
      solution: 'Built a user-friendly platform with drag-and-drop store builder, automated inventory management, and integrated payment processing. The solution uses serverless architecture for cost-effective scaling.',
      outcome: 'Launched platform serving 500+ businesses with 10,000+ active products. Achieved 99.9% uptime and processed $2M+ in transactions. Customer satisfaction score of 4.8/5.',
      features: [
        'Shopping cart with real-time updates',
        'Multiple payment gateway integration',
        'Admin dashboard with analytics',
        'Inventory management system',
        'Order tracking and notifications',
        'Customer review system',
      ],
      techStack: ['Next.js', 'TypeScript', 'Stripe API', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      featured: true,
      thumbnail: '/projects/ecommerce-thumb.jpg',
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/example/ecommerce',
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking.',
      longDescription: '<p>An intuitive task management application designed for teams to collaborate effectively. Features include real-time updates, drag-and-drop task organization, and comprehensive project analytics.</p><p>The app helps teams stay organized, meet deadlines, and improve productivity through visual project boards and automated notifications.</p>',
      problem: 'Teams struggled with scattered task information across multiple tools, leading to missed deadlines and poor collaboration.',
      solution: 'Created a unified platform with real-time synchronization, visual project boards, and automated workflow management. Integrated calendar views and deadline reminders.',
      outcome: 'Used by 50+ teams with 1,000+ active users. Reduced project completion time by 30% and improved team collaboration scores by 45%.',
      features: [
        'Real-time task synchronization',
        'Drag-and-drop task organization',
        'Team collaboration features',
        'Project analytics dashboard',
        'Calendar and timeline views',
        'Automated notifications',
      ],
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
      featured: true,
      thumbnail: '/projects/taskapp-thumb.jpg',
      liveUrl: 'https://example-taskapp.com',
      githubUrl: 'https://github.com/example/taskapp',
    },
    {
      title: 'Social Media Dashboard',
      slug: 'social-media-dashboard',
      description: 'A comprehensive social media management dashboard for scheduling posts, analytics, and multi-platform management.',
      longDescription: '<p>A powerful social media management tool that allows users to manage multiple social media accounts from one dashboard. Schedule posts, analyze performance, and engage with audiences across platforms.</p><p>The dashboard provides insights into audience engagement, best posting times, and content performance metrics.</p>',
      problem: 'Social media managers spent too much time switching between platforms and lacked unified analytics to measure campaign effectiveness.',
      solution: 'Built a unified dashboard with multi-platform API integration, content scheduling, and comprehensive analytics. Automated posting and engagement tracking.',
      outcome: 'Serving 200+ businesses managing 1,500+ social accounts. Increased client engagement by 60% and saved 15+ hours per week per user.',
      features: [
        'Multi-platform social media management',
        'Content scheduling and calendar',
        'Analytics and performance tracking',
        'Bulk post scheduling',
        'Audience insights and analytics',
        'Engagement tracking tools',
      ],
      techStack: ['Next.js', 'TypeScript', 'Twitter API', 'Instagram API', 'PostgreSQL', 'Chart.js'],
      featured: true,
      thumbnail: '/projects/social-dashboard-thumb.jpg',
      liveUrl: 'https://example-social.com',
      githubUrl: 'https://github.com/example/social-dashboard',
    },
    {
      title: 'Fitness Tracking App',
      slug: 'fitness-tracking-app',
      description: 'A mobile-first fitness application with workout tracking, progress monitoring, and personalized training plans.',
      longDescription: '<p>A comprehensive fitness tracking application that helps users achieve their health goals. Features include workout logging, progress tracking, nutrition planning, and personalized training recommendations.</p><p>The app uses AI to create custom workout plans based on user goals, fitness level, and progress history.</p>',
      problem: 'Fitness enthusiasts needed a simple way to track workouts, monitor progress, and receive personalized training guidance without expensive personal trainers.',
      solution: 'Developed a mobile-first app with intuitive workout logging, progress visualization, and AI-powered training recommendations. Integrated with wearable devices for automatic tracking.',
      outcome: '10,000+ active users with 85% retention rate. Users reported average weight loss of 8lbs in 3 months. Featured in App Store "Health & Fitness" category.',
      features: [
        'Workout logging and tracking',
        'Progress visualization charts',
        'AI-powered training plans',
        'Nutrition tracking integration',
        'Wearable device sync',
        'Community challenges and leaderboards',
      ],
      techStack: ['React Native', 'Firebase', 'TensorFlow', 'Node.js', 'MongoDB', 'Chart.js'],
      featured: true,
      thumbnail: '/projects/fitness-thumb.jpg',
      liveUrl: 'https://example-fitness.com',
      githubUrl: 'https://github.com/example/fitness-app',
    },
    {
      title: 'Real Estate Platform',
      slug: 'real-estate-platform',
      description: 'A property listing platform with advanced search, virtual tours, and agent management features.',
      longDescription: '<p>An advanced real estate platform connecting buyers, sellers, and agents. Features include property search with filters, virtual tour integration, mortgage calculator, and agent dashboard.</p><p>The platform uses AI to match properties with buyer preferences and provides market insights for informed decisions.</p>',
      problem: 'Real estate searches were fragmented across multiple platforms, making it difficult for buyers to find suitable properties and for agents to manage listings efficiently.',
      solution: 'Created a unified platform with advanced search filters, virtual tour integration, and comprehensive property data. Built agent tools for listing management and client communication.',
      outcome: 'Listed 5,000+ properties with 50,000+ monthly visitors. Facilitated 200+ property sales. Reduced average property search time by 40%.',
      features: [
        'Advanced property search with filters',
        'Virtual tour integration',
        'Mortgage calculator',
        'Agent dashboard and CRM',
        'Property comparison tool',
        'Market insights and analytics',
      ],
      techStack: ['Next.js', 'TypeScript', 'Mapbox API', 'PostgreSQL', 'Prisma', 'Stripe'],
      featured: true,
      thumbnail: '/projects/realestate-thumb.jpg',
      liveUrl: 'https://example-realestate.com',
      githubUrl: 'https://github.com/example/realestate',
    },
    {
      title: 'Learning Management System',
      slug: 'learning-management-system',
      description: 'An online learning platform with course creation, student management, and interactive learning features.',
      longDescription: '<p>A comprehensive learning management system for educational institutions and online course creators. Features include course creation tools, student progress tracking, quizzes, and interactive content.</p><p>The platform supports video lessons, assignments, discussions, and certification upon course completion.</p>',
      problem: 'Educational institutions and course creators needed a flexible platform to create, manage, and deliver online courses with student engagement features.',
      solution: 'Built a scalable LMS with intuitive course builder, student progress tracking, interactive quizzes, and video streaming. Integrated payment processing for course sales.',
      outcome: 'Used by 30+ institutions with 5,000+ students. Hosting 200+ courses with 95% student satisfaction. Generated $500K+ in course sales.',
      features: [
        'Course creation and management',
        'Video lesson streaming',
        'Interactive quizzes and assignments',
        'Student progress tracking',
        'Discussion forums',
        'Certification system',
      ],
      techStack: ['Next.js', 'TypeScript', 'AWS S3', 'PostgreSQL', 'Prisma', 'Stripe API'],
      featured: true,
      thumbnail: '/projects/lms-thumb.jpg',
      liveUrl: 'https://example-lms.com',
      githubUrl: 'https://github.com/example/lms',
    },
  ]

  // Create projects with images
  for (const projectData of projects) {
    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: projectData,
      create: {
        ...projectData,
        images: {
          create: [
            {
              url: projectData.thumbnail || '/projects/default-thumb.jpg',
              alt: `${projectData.title} - Main Image`,
              order: 0,
            },
            {
              url: projectData.thumbnail || '/projects/default-thumb.jpg',
              alt: `${projectData.title} - Feature 1`,
              order: 1,
            },
            {
              url: projectData.thumbnail || '/projects/default-thumb.jpg',
              alt: `${projectData.title} - Feature 2`,
              order: 2,
            },
          ],
        },
      },
    })
    console.log('✅ Created/Updated project:', project.title)
  }

  // Example: Create skills
  const skills = [
    {
      name: 'React',
      category: 'Frontend',
      proficiency: 9,
      order: 1,
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      proficiency: 9,
      order: 2,
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      proficiency: 8,
      order: 3,
    },
    {
      name: 'Node.js',
      category: 'Backend',
      proficiency: 8,
      order: 1,
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      proficiency: 8,
      order: 1,
    },
    {
      name: 'Prisma',
      category: 'Database',
      proficiency: 9,
      order: 2,
    },
  ]

  for (const skill of skills) {
    const existing = await prisma.skill.findFirst({
      where: {
        name: skill.name,
        category: skill.category,
      },
    })

    if (!existing) {
      await prisma.skill.create({
        data: skill,
      })
    }
  }

  console.log('✅ Created skills')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
