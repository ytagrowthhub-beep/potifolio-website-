import { notFound } from 'next/navigation'
import { ServiceDetailClient } from './ServiceDetailClient'
import { Code2, Zap, Shield, Users } from 'lucide-react'

const services = {
  frontend: {
    title: 'Frontend Development',
    slug: 'frontend',
    description:
      'Building beautiful, responsive, and interactive user interfaces with modern frontend technologies that deliver exceptional user experiences.',
    icon: 'Layout',
    color: 'from-blue-500 to-cyan-500',
    heroImage: '/asset/ecommerce.webp',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'HTML/CSS',
      'Responsive Design',
      'Performance Optimization',
    ],
    services: [
      'Custom web application development',
      'Responsive and mobile-first design',
      'Component-based architecture',
      'State management solutions',
      'Animation and interactivity',
      'Performance optimization',
      'SEO-friendly implementations',
      'Accessibility compliance (WCAG)',
    ],
    approach:
      'I focus on creating intuitive, performant, and accessible user interfaces. Using modern frameworks like React and Next.js, I build scalable frontend architectures that prioritize user experience and maintainability. Every interface I design is crafted with attention to detail, ensuring smooth interactions and delightful user experiences.',
    detailedApproach: [
      {
        title: 'User-Centered Design',
        description:
          'I start every project by understanding the end-user. Through research, wireframing, and prototyping, I ensure that the interface is intuitive and meets user needs effectively.',
        icon: 'Users',
      },
      {
        title: 'Performance First',
        description:
          'Speed matters. I optimize every aspect of the frontend - from code splitting to image optimization, ensuring lightning-fast load times and smooth interactions.',
        icon: 'Zap',
      },
      {
        title: 'Accessibility & Standards',
        description:
          'I build interfaces that everyone can use. Following WCAG guidelines, I ensure proper semantic HTML, ARIA labels, keyboard navigation, and screen reader compatibility.',
        icon: 'Shield',
      },
      {
        title: 'Modern Architecture',
        description:
          'Using component-based architecture and modern patterns, I create maintainable, scalable codebases that grow with your business needs.',
        icon: 'Code2',
      },
    ],
    technologies: [
      {
        name: 'React',
        slug: 'react',
        description:
          'Component-based UI library for building interactive interfaces with reusable components and efficient state management.',
        image: '/asset/ecommerce.webp',
        features: ['Component reusability', 'Virtual DOM', 'Hooks API', 'Ecosystem'],
      },
      {
        name: 'Next.js',
        slug: 'nextjs',
        description:
          'Full-stack React framework with server-side rendering, static site generation, and API routes for production-ready applications.',
        image: '/asset/ecommerce.webp',
        features: ['SSR/SSG', 'API Routes', 'Image Optimization', 'Built-in Routing'],
      },
      {
        name: 'TypeScript',
        slug: 'typescript',
        description:
          'Type-safe JavaScript that catches errors at compile time, improving code quality and developer experience.',
        image: '/asset/ecommerce.webp',
        features: ['Type Safety', 'IntelliSense', 'Refactoring', 'Documentation'],
      },
      {
        name: 'Tailwind CSS',
        slug: 'tailwind-css',
        description:
          'Utility-first CSS framework for rapid UI development with consistent design systems and responsive utilities.',
        image: '/asset/ecommerce.webp',
        features: ['Utility Classes', 'Responsive Design', 'Customization', 'Performance'],
      },
    ],
    benefits: [
      'Improved user engagement and conversion rates',
      'Faster page load times and better SEO rankings',
      'Mobile-responsive designs that work on all devices',
      'Accessible interfaces that reach a wider audience',
      'Scalable architecture that grows with your business',
      'Modern UI/UX that reflects your brand identity',
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Planning',
        description:
          'Understanding your goals, target audience, and requirements through detailed discussions and research.',
      },
      {
        step: '02',
        title: 'Design & Prototyping',
        description:
          'Creating wireframes, mockups, and interactive prototypes to visualize the user experience before development.',
      },
      {
        step: '03',
        title: 'Development',
        description:
          'Building the frontend using modern frameworks, following best practices, and ensuring code quality.',
      },
      {
        step: '04',
        title: 'Testing & Optimization',
        description:
          'Rigorous testing across devices and browsers, performance optimization, and accessibility audits.',
      },
      {
        step: '05',
        title: 'Deployment & Support',
        description:
          'Deploying to production, monitoring performance, and providing ongoing support and maintenance.',
      },
    ],
  },
  backend: {
    title: 'Backend Development',
    slug: 'backend',
    description:
      'Developing robust server-side applications and APIs that power modern web applications with scalability and security in mind.',
    icon: 'Server',
    color: 'from-green-500 to-emerald-500',
    heroImage: '/asset/task management.png',
    skills: [
      'Node.js',
      'Express',
      'REST APIs',
      'GraphQL',
      'Server Actions',
      'API Design',
      'Authentication',
      'Microservices',
    ],
    services: [
      'RESTful and GraphQL API development',
      'Server-side application architecture',
      'Authentication and authorization',
      'Database integration and optimization',
      'Real-time features with WebSockets',
      'Microservices architecture',
      'API documentation and testing',
      'Cloud deployment and scaling',
    ],
    approach:
      'I design and build scalable backend systems that handle complex business logic efficiently. From REST APIs to GraphQL endpoints, I ensure your backend is secure, performant, and maintainable. Every system I build is architected for growth and reliability.',
    detailedApproach: [
      {
        title: 'Scalable Architecture',
        description:
          'I design backend systems that can handle growth. Using microservices, load balancing, and efficient caching strategies, I ensure your application scales seamlessly.',
        icon: 'Code2',
      },
      {
        title: 'Security First',
        description:
          'Security is paramount. I implement authentication, authorization, data encryption, and follow OWASP best practices to protect your application and user data.',
        icon: 'Shield',
      },
      {
        title: 'Performance Optimization',
        description:
          'I optimize database queries, implement caching strategies, and use efficient algorithms to ensure your backend performs at scale.',
        icon: 'Zap',
      },
      {
        title: 'API Design',
        description:
          'I create well-documented, RESTful APIs that are intuitive to use, version-controlled, and follow industry best practices.',
        icon: 'Code2',
      },
    ],
    technologies: [
      {
        name: 'Node.js',
        slug: 'nodejs',
        description:
          'JavaScript runtime for building scalable server-side applications with event-driven, non-blocking I/O.',
        image: '/asset/task management.png',
        features: ['Event-Driven', 'NPM Ecosystem', 'Scalability', 'Performance'],
      },
      {
        name: 'Express',
        slug: 'express',
        description:
          'Minimalist web framework for Node.js, providing robust features for building APIs and web applications.',
        image: '/asset/task management.png',
        features: ['Middleware', 'Routing', 'Templates', 'Fast'],
      },
      {
        name: 'GraphQL',
        slug: 'graphql',
        description:
          'Query language and runtime for APIs that allows clients to request exactly the data they need.',
        image: '/asset/task management.png',
        features: ['Flexible Queries', 'Type System', 'Real-time', 'Efficient'],
      },
      {
        name: 'REST APIs',
        slug: 'rest-apis',
        description:
          'RESTful API design following industry standards for building scalable and maintainable web services.',
        image: '/asset/task management.png',
        features: ['Stateless', 'Cacheable', 'Layered', 'Standard'],
      },
    ],
    benefits: [
      'Scalable architecture that handles growth',
      'Secure APIs with authentication and encryption',
      'High performance with optimized queries',
      'Well-documented APIs for easy integration',
      'Real-time capabilities with WebSockets',
      'Reliable systems with error handling',
    ],
    process: [
      {
        step: '01',
        title: 'Architecture Design',
        description:
          'Designing the backend architecture, database schema, and API structure based on your requirements.',
      },
      {
        step: '02',
        title: 'Development',
        description:
          'Building the backend services, APIs, and business logic using best practices and modern patterns.',
      },
      {
        step: '03',
        title: 'Security Implementation',
        description:
          'Implementing authentication, authorization, data validation, and security best practices.',
      },
      {
        step: '04',
        title: 'Testing & Optimization',
        description:
          'Writing tests, optimizing performance, and ensuring reliability through comprehensive testing.',
      },
      {
        step: '05',
        title: 'Deployment & Monitoring',
        description:
          'Deploying to production, setting up monitoring, and providing ongoing maintenance and support.',
      },
    ],
  },
  database: {
    title: 'Database Solutions',
    slug: 'database',
    description:
      'Designing and managing efficient database systems for optimal data storage, retrieval, and performance.',
    icon: 'Database',
    color: 'from-purple-500 to-pink-500',
    heroImage: '/asset/social media.png',
    skills: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'SQL', 'ORM', 'Database Design', 'Optimization'],
    services: [
      'Database schema design and optimization',
      'SQL and NoSQL database solutions',
      'Data migration and backup strategies',
      'Query optimization and indexing',
      'ORM integration and management',
      'Caching strategies with Redis',
      'Database security and access control',
      'Performance monitoring and tuning',
    ],
    approach:
      'I design and implement database solutions that are efficient, scalable, and secure. Whether you need SQL or NoSQL, I ensure your data is stored optimally and retrieved quickly. Every database I design is normalized, indexed, and optimized for your specific use case.',
    detailedApproach: [
      {
        title: 'Optimal Schema Design',
        description:
          'I design database schemas that are normalized, efficient, and scalable. Every table and relationship is carefully planned to ensure data integrity and performance.',
        icon: 'Code2',
      },
      {
        title: 'Performance Optimization',
        description:
          'I optimize queries, create proper indexes, and implement caching strategies to ensure your database performs at scale.',
        icon: 'Zap',
      },
      {
        title: 'Data Security',
        description:
          'I implement proper access controls, encryption, and backup strategies to protect your valuable data.',
        icon: 'Shield',
      },
      {
        title: 'Scalability',
        description:
          'I design databases that can grow with your business, using partitioning, replication, and sharding when needed.',
        icon: 'Code2',
      },
    ],
    technologies: [
      {
        name: 'PostgreSQL',
        slug: 'postgresql',
        description:
          'Advanced open-source relational database with ACID compliance, extensibility, and robust feature set.',
        image: '/asset/social media.png',
        features: ['ACID', 'Extensible', 'JSON Support', 'Performance'],
      },
      {
        name: 'MongoDB',
        slug: 'mongodb',
        description:
          'NoSQL document database for flexible schema design and horizontal scaling capabilities.',
        image: '/asset/social media.png',
        features: ['Flexible Schema', 'Scalable', 'Document Model', 'Fast'],
      },
      {
        name: 'Prisma',
        slug: 'prisma',
        description:
          'Next-generation ORM that provides type-safe database access and intuitive data modeling.',
        image: '/asset/social media.png',
        features: ['Type Safety', 'Migrations', 'Query Builder', 'Modern'],
      },
      {
        name: 'Redis',
        slug: 'redis',
        description:
          'In-memory data structure store used as a database, cache, and message broker for high-performance applications.',
        image: '/asset/social media.png',
        features: ['Fast', 'Caching', 'Pub/Sub', 'Persistence'],
      },
    ],
    benefits: [
      'Optimized database performance',
      'Scalable data storage solutions',
      'Secure data management',
      'Efficient query execution',
      'Reliable backup and recovery',
      'Type-safe database access',
    ],
    process: [
      {
        step: '01',
        title: 'Requirements Analysis',
        description:
          'Understanding your data requirements, relationships, and access patterns to design the optimal schema.',
      },
      {
        step: '02',
        title: 'Schema Design',
        description:
          'Designing normalized schemas, relationships, and indexes based on your data model and query patterns.',
      },
      {
        step: '03',
        title: 'Implementation',
        description:
          'Setting up the database, creating tables, indexes, and implementing data access layers.',
      },
      {
        step: '04',
        title: 'Optimization',
        description:
          'Optimizing queries, indexes, and implementing caching strategies for optimal performance.',
      },
      {
        step: '05',
        title: 'Maintenance',
        description:
          'Setting up backups, monitoring, and providing ongoing maintenance and optimization.',
      },
    ],
  },
  'devops-tools': {
    title: 'DevOps & Tools',
    slug: 'devops-tools',
    description:
      'Streamlining development workflows and deploying scalable applications to the cloud with modern DevOps practices.',
    icon: 'Cloud',
    color: 'from-orange-500 to-red-500',
    heroImage: '/asset/fitness.png',
    skills: [
      'Git',
      'Docker',
      'CI/CD',
      'AWS',
      'Vercel',
      'Testing',
      'ESLint',
      'Prettier',
      'Monitoring',
      'Automation',
    ],
    services: [
      'CI/CD pipeline setup and automation',
      'Containerization with Docker',
      'Cloud deployment and scaling',
      'Infrastructure as Code',
      'Monitoring and logging setup',
      'Automated testing pipelines',
      'Code quality tools and linting',
      'Performance monitoring and optimization',
    ],
    approach:
      'I streamline your development workflow with modern DevOps practices. From CI/CD pipelines to cloud deployment, I ensure your applications are deployed efficiently, monitored effectively, and scaled automatically. Every workflow I set up saves time and reduces errors.',
    detailedApproach: [
      {
        title: 'Automation',
        description:
          'I automate repetitive tasks, from testing to deployment, ensuring consistent and error-free processes.',
        icon: 'Zap',
      },
      {
        title: 'Scalability',
        description:
          'I set up infrastructure that scales automatically with your application load, ensuring optimal performance.',
        icon: 'Code2',
      },
      {
        title: 'Monitoring',
        description:
          'I implement comprehensive monitoring and logging to track performance, errors, and user behavior.',
        icon: 'Shield',
      },
      {
        title: 'Best Practices',
        description:
          'I follow DevOps best practices, using Infrastructure as Code, version control, and automated testing.',
        icon: 'Code2',
      },
    ],
    technologies: [
      {
        name: 'Docker',
        slug: 'docker',
        description:
          'Containerization platform for packaging applications and dependencies into portable containers.',
        image: '/asset/fitness.png',
        features: ['Containers', 'Portable', 'Scalable', 'Isolated'],
      },
      {
        name: 'CI/CD',
        slug: 'cicd',
        description:
          'Continuous Integration and Deployment pipelines for automated testing and deployment workflows.',
        image: '/asset/fitness.png',
        features: ['Automation', 'Testing', 'Deployment', 'Quality'],
      },
      {
        name: 'AWS',
        slug: 'aws',
        description:
          'Cloud platform providing scalable infrastructure, storage, and services for modern applications.',
        image: '/asset/fitness.png',
        features: ['Scalable', 'Reliable', 'Global', 'Services'],
      },
      {
        name: 'Git',
        slug: 'git',
        description:
          'Version control system for tracking changes, collaborating, and managing code repositories.',
        image: '/asset/fitness.png',
        features: ['Version Control', 'Collaboration', 'Branching', 'History'],
      },
    ],
    benefits: [
      'Automated deployment workflows',
      'Scalable cloud infrastructure',
      'Consistent development environments',
      'Reduced deployment errors',
      'Better collaboration and code quality',
      'Cost-effective cloud solutions',
    ],
    process: [
      {
        step: '01',
        title: 'Assessment',
        description:
          'Evaluating your current workflow, infrastructure, and requirements to identify improvement opportunities.',
      },
      {
        step: '02',
        title: 'Pipeline Setup',
        description:
          'Setting up CI/CD pipelines, automated testing, and deployment workflows.',
      },
      {
        step: '03',
        title: 'Infrastructure',
        description:
          'Configuring cloud infrastructure, containers, and scaling policies.',
      },
      {
        step: '04',
        title: 'Monitoring',
        description:
          'Setting up monitoring, logging, and alerting systems for production environments.',
      },
      {
        step: '05',
        title: 'Optimization',
        description:
          'Continuously optimizing workflows, costs, and performance based on usage patterns.',
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | Ayorfe Tech`,
    description: service.description,
  }
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <ServiceDetailClient service={service} />
  )
}
