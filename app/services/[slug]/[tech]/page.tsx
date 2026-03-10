import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, Code2, Zap, BookOpen, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

const technologies: Record<
  string,
  Record<
    string,
    {
      name: string
      description: string
      longDescription: string
      image: string
      features: string[]
      useCases: string[]
      benefits: string[]
      resources: { title: string; description: string; url?: string }[]
      codeExample?: string
    }
  >
> = {
  frontend: {
    react: {
      name: 'React',
      description:
        'A powerful JavaScript library for building user interfaces with component-based architecture.',
      longDescription:
        'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components". React has become the foundation of modern web development, powering millions of websites and applications worldwide.',
      image: '/asset/ecommerce.webp',
      features: [
        'Component-based architecture for reusable UI elements',
        'Virtual DOM for efficient rendering and updates',
        'Hooks API for state management and side effects',
        'Rich ecosystem with thousands of libraries',
        'One-way data binding for predictable state',
        'JSX syntax for declarative UI code',
      ],
      useCases: [
        'Single Page Applications (SPAs)',
        'Interactive dashboards and admin panels',
        'E-commerce platforms and shopping carts',
        'Social media feeds and real-time updates',
        'Data visualization and analytics tools',
        'Progressive Web Applications (PWAs)',
      ],
      benefits: [
        'Faster development with reusable components',
        'Better performance with virtual DOM',
        'Large community and extensive documentation',
        'Works seamlessly with other libraries',
        'Strong developer tools and debugging',
        'Suitable for both small and large applications',
      ],
      resources: [
        {
          title: 'Official Documentation',
          description: 'Comprehensive guides and API references',
          url: 'https://react.dev',
        },
        {
          title: 'React Hooks',
          description: 'Learn about useState, useEffect, and custom hooks',
        },
        {
          title: 'Component Patterns',
          description: 'Best practices for component design and architecture',
        },
      ],
      codeExample: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="World" />
    </div>
  );
}`,
    },
    nextjs: {
      name: 'Next.js',
      description:
        'The React framework for production with server-side rendering and static site generation.',
      longDescription:
        'Next.js is a powerful React framework that enables server-side rendering, static site generation, and API routes. It provides the best developer experience with features like automatic code splitting, optimized images, and built-in routing. Next.js is used by companies like Netflix, TikTok, and Hulu to build fast, scalable web applications.',
      image: '/asset/ecommerce.webp',
      features: [
        'Server-Side Rendering (SSR) for better SEO',
        'Static Site Generation (SSG) for performance',
        'API Routes for backend functionality',
        'Automatic code splitting and optimization',
        'Built-in image optimization and lazy loading',
        'File-based routing system',
        'Middleware for request handling',
      ],
      useCases: [
        'E-commerce websites with product pages',
        'Blogs and content management systems',
        'Marketing websites and landing pages',
        'Dashboards with real-time data',
        'Portfolio websites and showcases',
        'Enterprise applications with complex routing',
      ],
      benefits: [
        'Improved SEO with server-side rendering',
        'Faster page loads with static generation',
        'Better user experience with optimized images',
        'Simplified deployment with Vercel integration',
        'TypeScript support out of the box',
        'Excellent developer experience',
      ],
      resources: [
        {
          title: 'Next.js Documentation',
          description: 'Complete guide to Next.js features',
          url: 'https://nextjs.org/docs',
        },
        {
          title: 'App Router',
          description: 'Learn about the new App Router in Next.js 13+',
        },
        {
          title: 'Deployment Guide',
          description: 'Deploy your Next.js app to production',
        },
      ],
      codeExample: `// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
    </div>
  );
}`,
    },
    typescript: {
      name: 'TypeScript',
      description:
        'Type-safe JavaScript that catches errors at compile time and improves developer experience.',
      longDescription:
        'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, enabling you to catch errors during development rather than at runtime. TypeScript is used by major companies like Microsoft, Google, and Airbnb.',
      image: '/asset/ecommerce.webp',
      features: [
        'Static type checking for error prevention',
        'IntelliSense and autocomplete in IDEs',
        'Refactoring support with confidence',
        'Self-documenting code with types',
        'Interfaces and type definitions',
        'Compatible with all JavaScript libraries',
      ],
      useCases: [
        'Large-scale applications with many developers',
        'Projects requiring high reliability',
        'Complex data structures and APIs',
        'Enterprise applications',
        'Libraries and frameworks',
        'Any JavaScript project for better DX',
      ],
      benefits: [
        'Catch errors before runtime',
        'Better code documentation',
        'Improved IDE support and autocomplete',
        'Easier refactoring and maintenance',
        'Better collaboration in teams',
        'Gradual adoption from JavaScript',
      ],
      resources: [
        {
          title: 'TypeScript Handbook',
          description: 'Official TypeScript documentation',
          url: 'https://www.typescriptlang.org/docs',
        },
        {
          title: 'Type Definitions',
          description: 'Find type definitions for popular libraries',
        },
        {
          title: 'TypeScript Playground',
          description: 'Experiment with TypeScript online',
        },
      ],
      codeExample: `interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = { name: "John", age: 30 };
console.log(greet(user));`,
    },
    'tailwind-css': {
      name: 'Tailwind CSS',
      description:
        'Utility-first CSS framework for rapidly building custom user interfaces.',
      longDescription:
        'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML. Instead of writing custom CSS, you compose utility classes to create unique designs. Tailwind has revolutionized how developers approach styling, making it faster and more maintainable.',
      image: '/asset/ecommerce.webp',
      features: [
        'Utility-first approach for rapid development',
        'Responsive design utilities',
        'Dark mode support',
        'Customizable design system',
        'PurgeCSS for minimal bundle size',
        'Component-friendly with @apply directive',
      ],
      useCases: [
        'Rapid prototyping and MVP development',
        'Custom design systems',
        'Component libraries',
        'Marketing websites',
        'Admin dashboards',
        'Any project needing custom styling',
      ],
      benefits: [
        'Faster development with utility classes',
        'Consistent design system',
        'Smaller CSS bundle with purging',
        'No naming conflicts',
        'Easy to maintain and update',
        'Great developer experience',
      ],
      resources: [
        {
          title: 'Tailwind CSS Docs',
          description: 'Complete utility class reference',
          url: 'https://tailwindcss.com/docs',
        },
        {
          title: 'Tailwind UI',
          description: 'Beautiful component examples',
        },
        {
          title: 'Customization',
          description: 'Learn to customize your design system',
        },
      ],
      codeExample: `<div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
  <div class="p-8">
    <h2 class="text-2xl font-bold text-gray-900">Card Title</h2>
    <p class="mt-2 text-gray-600">Card description</p>
  </div>
</div>`,
    },
  },
  backend: {
    nodejs: {
      name: 'Node.js',
      description:
        "JavaScript runtime built on Chrome's V8 engine for building scalable server-side applications.",
      longDescription:
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js enables JavaScript to run on the server, allowing developers to use the same language for both frontend and backend development.",
      image: '/asset/task management.png',
      features: [
        'Event-driven, non-blocking I/O',
        'NPM ecosystem with millions of packages',
        'Single-threaded with event loop',
        'Built on Chrome V8 engine',
        'Cross-platform support',
        'Real-time capabilities',
      ],
      useCases: [
        'RESTful and GraphQL APIs',
        'Real-time applications (chat, gaming)',
        'Microservices architecture',
        'Serverless functions',
        'CLI tools and automation',
        'Data streaming applications',
      ],
      benefits: [
        'Fast execution with V8 engine',
        'Large ecosystem of packages',
        'Same language for frontend and backend',
        'Excellent for I/O-intensive applications',
        'Active community and support',
        'Scalable and performant',
      ],
      resources: [
        {
          title: 'Node.js Documentation',
          description: 'Official Node.js guides and API',
          url: 'https://nodejs.org/docs',
        },
        {
          title: 'NPM Registry',
          description: 'Find and use packages from npm',
        },
        {
          title: 'Best Practices',
          description: 'Learn Node.js best practices and patterns',
        },
      ],
      codeExample: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    },
    express: {
      name: 'Express',
      description:
        'Fast, unopinionated, minimalist web framework for Node.js.',
      longDescription:
        'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of writing server code and provides a thin layer of fundamental web application features without obscuring Node.js features.',
      image: '/asset/task management.png',
      features: [
        'Robust routing system',
        'Middleware support',
        'Template engine integration',
        'Error handling utilities',
        'HTTP helpers and utilities',
        'Lightweight and fast',
      ],
      useCases: [
        'RESTful API development',
        'Web application backends',
        'Middleware for request processing',
        'Server-side rendering',
        'API gateways',
        'Microservices',
      ],
      benefits: [
        'Simple and intuitive API',
        'Large ecosystem of middleware',
        'Fast and lightweight',
        'Flexible and unopinionated',
        'Well-documented',
        'Industry standard for Node.js',
      ],
      resources: [
        {
          title: 'Express Guide',
          description: 'Official Express.js documentation',
          url: 'https://expressjs.com',
        },
        {
          title: 'Middleware',
          description: 'Learn about Express middleware',
        },
        {
          title: 'Routing',
          description: 'Master Express routing patterns',
        },
      ],
      codeExample: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Express!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    },
    graphql: {
      name: 'GraphQL',
      description:
        'Query language for APIs that allows clients to request exactly the data they need.',
      longDescription:
        'GraphQL is a query language for APIs and a runtime for executing those queries. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need, and makes it easier to evolve APIs over time. GraphQL was developed by Facebook and is now used by companies like GitHub, Shopify, and Pinterest.',
      image: '/asset/task management.png',
      features: [
        'Query exactly what you need',
        'Single endpoint for all operations',
        'Strongly typed schema',
        'Real-time subscriptions',
        'Introspection and tooling',
        'Version-free API evolution',
      ],
      useCases: [
        'Mobile applications with limited bandwidth',
        'Complex data requirements',
        'Real-time applications',
        'Microservices communication',
        'API aggregation',
        'Applications with varying data needs',
      ],
      benefits: [
        'Reduced over-fetching and under-fetching',
        'Single endpoint simplifies API',
        'Strong typing prevents errors',
        'Better developer experience',
        'Easier API evolution',
        'Powerful tooling and ecosystem',
      ],
      resources: [
        {
          title: 'GraphQL Documentation',
          description: 'Learn GraphQL fundamentals',
          url: 'https://graphql.org/learn',
        },
        {
          title: 'Apollo Client',
          description: 'Popular GraphQL client library',
        },
        {
          title: 'Schema Design',
          description: 'Best practices for GraphQL schemas',
        },
      ],
      codeExample: `type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  email: String!
}

query {
  user(id: "1") {
    name
    email
  }
}`,
    },
    'rest-apis': {
      name: 'REST APIs',
      description:
        'Architectural style for designing networked applications using standard HTTP methods.',
      longDescription:
        'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. REST has become the standard for web APIs due to its simplicity, scalability, and stateless nature.',
      image: '/asset/task management.png',
      features: [
        'Stateless communication',
        'Cacheable responses',
        'Uniform interface',
        'Layered system architecture',
        'Standard HTTP methods',
        'Resource-based URLs',
      ],
      useCases: [
        'Web service APIs',
        'Mobile app backends',
        'Third-party integrations',
        'Microservices communication',
        'Public APIs',
        'Enterprise applications',
      ],
      benefits: [
        'Simple and intuitive',
        'Widely understood and supported',
        'Scalable and stateless',
        'Cacheable for performance',
        'Language and platform agnostic',
        'Easy to test and debug',
      ],
      resources: [
        {
          title: 'REST API Tutorial',
          description: 'Learn REST API design principles',
        },
        {
          title: 'HTTP Methods',
          description: 'Understanding GET, POST, PUT, DELETE',
        },
        {
          title: 'Best Practices',
          description: 'REST API design best practices',
        },
      ],
      codeExample: `GET    /api/users        # Get all users
GET    /api/users/1      # Get user with ID 1
POST   /api/users        # Create new user
PUT    /api/users/1      # Update user with ID 1
DELETE /api/users/1      # Delete user with ID 1`,
    },
  },
  database: {
    postgresql: {
      name: 'PostgreSQL',
      description:
        'Advanced open-source relational database with ACID compliance and powerful features.',
      longDescription:
        'PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development. It has earned a strong reputation for reliability, feature robustness, and performance. PostgreSQL supports both SQL (relational) and JSON (non-relational) querying.',
      image: '/asset/learning management.png',
      features: [
        'ACID compliance for data integrity',
        'JSON and JSONB support',
        'Full-text search capabilities',
        'Extensible with custom functions',
        'Advanced indexing options',
        'Concurrent access and transactions',
      ],
      useCases: [
        'Enterprise applications',
        'Data warehousing',
        'Geographic information systems',
        'Content management systems',
        'Financial applications',
        'Analytics and reporting',
      ],
      benefits: [
        'High reliability and data integrity',
        'Rich feature set',
        'Excellent performance',
        'Strong community support',
        'Open source and free',
        'Cross-platform compatibility',
      ],
      resources: [
        {
          title: 'PostgreSQL Docs',
          description: 'Official PostgreSQL documentation',
          url: 'https://www.postgresql.org/docs',
        },
        {
          title: 'SQL Tutorial',
          description: 'Learn SQL with PostgreSQL',
        },
        {
          title: 'Performance Tuning',
          description: 'Optimize your PostgreSQL database',
        },
      ],
      codeExample: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users WHERE email = 'user@example.com';`,
    },
    mongodb: {
      name: 'MongoDB',
      description:
        'NoSQL document database for flexible schema design and horizontal scaling.',
      longDescription:
        'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database, MongoDB uses JSON-like documents with optional schemas. MongoDB is designed for scalability and developer productivity.',
      image: '/asset/learning management.png',
      features: [
        'Document-based data model',
        'Horizontal scaling with sharding',
        'Rich query language',
        'Indexing for performance',
        'Aggregation framework',
        'Replication for high availability',
      ],
      useCases: [
        'Content management systems',
        'Real-time analytics',
        'Mobile applications',
        'Internet of Things (IoT)',
        'Gaming applications',
        'Catalogs and product data',
      ],
      benefits: [
        'Flexible schema design',
        'Easy horizontal scaling',
        'Fast development cycle',
        'Rich query capabilities',
        'Good for unstructured data',
        'Active community',
      ],
      resources: [
        {
          title: 'MongoDB University',
          description: 'Free MongoDB courses and certifications',
          url: 'https://university.mongodb.com',
        },
        {
          title: 'MongoDB Atlas',
          description: 'Managed MongoDB cloud service',
        },
        {
          title: 'Aggregation Pipeline',
          description: 'Learn MongoDB aggregation framework',
        },
      ],
      codeExample: `db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30
});

db.users.find({ age: { $gt: 25 } });`,
    },
    prisma: {
      name: 'Prisma',
      description:
        'Next-generation ORM for type-safe database access with migrations and query builder.',
      longDescription:
        'Prisma is a next-generation ORM that makes database access easy with type safety, auto-completion, and great developer experience. It consists of Prisma Client (auto-generated query builder), Prisma Migrate (migration system), and Prisma Studio (database GUI).',
      image: '/asset/learning management.png',
      features: [
        'Type-safe database client',
        'Automatic migrations',
        'Query builder with autocomplete',
        'Schema management',
        'Database introspection',
        'Prisma Studio GUI',
      ],
      useCases: [
        'TypeScript applications',
        'REST and GraphQL APIs',
        'Full-stack applications',
        'Microservices',
        'Rapid prototyping',
        'Enterprise applications',
      ],
      benefits: [
        'Type safety and autocomplete',
        'Reduced boilerplate code',
        'Database migrations made easy',
        'Great developer experience',
        'Works with multiple databases',
        'Active development and support',
      ],
      resources: [
        {
          title: 'Prisma Docs',
          description: 'Complete Prisma documentation',
          url: 'https://www.prisma.io/docs',
        },
        {
          title: 'Prisma Client',
          description: 'Learn to use Prisma Client',
        },
        {
          title: 'Migrations',
          description: 'Database migrations with Prisma',
        },
      ],
      codeExample: `// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

// Usage
const user = await prisma.user.create({
  data: {
    name: "John",
    email: "john@example.com"
  }
});`,
    },
    redis: {
      name: 'Redis',
      description:
        'In-memory data structure store used as database, cache, and message broker.',
      longDescription:
        'Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker. Redis supports various data structures such as strings, hashes, lists, sets, sorted sets, and more. It is known for its exceptional performance.',
      image: '/asset/learning management.png',
      features: [
        'In-memory storage for speed',
        'Multiple data structures',
        'Pub/Sub messaging',
        'Persistence options',
        'Replication and clustering',
        'Atomic operations',
      ],
      useCases: [
        'Caching layer',
        'Session storage',
        'Real-time analytics',
        'Message queues',
        'Leaderboards',
        'Rate limiting',
      ],
      benefits: [
        'Extremely fast performance',
        'Simple data structures',
        'Versatile use cases',
        'Low latency',
        'High availability options',
        'Rich feature set',
      ],
      resources: [
        {
          title: 'Redis Documentation',
          description: 'Official Redis documentation',
          url: 'https://redis.io/docs',
        },
        {
          title: 'Data Structures',
          description: 'Learn Redis data structures',
        },
        {
          title: 'Caching Patterns',
          description: 'Redis caching strategies',
        },
      ],
      codeExample: `// Set a value
SET user:1:name "John"

// Get a value
GET user:1:name

// Set with expiration
SET session:abc123 "data" EX 3600

// Increment counter
INCR page:views`,
    },
  },
  'devops-tools': {
    docker: {
      name: 'Docker',
      description:
        'Containerization platform that packages applications with dependencies for consistent deployments.',
      longDescription:
        'Docker is a platform that uses containerization to make it easier to create, deploy, and run applications. Containers allow developers to package an application with all of its dependencies into a standardized unit for software development. Docker has revolutionized how applications are deployed and scaled.',
      image: '/asset/social media.jpg',
      features: [
        'Containerization for isolation',
        'Docker images and containers',
        'Docker Compose for multi-container apps',
        'Image versioning and registry',
        'Portable across environments',
        'Resource efficiency',
      ],
      useCases: [
        'Microservices architecture',
        'CI/CD pipelines',
        'Development environment setup',
        'Cloud deployments',
        'Local development',
        'Application isolation',
      ],
      benefits: [
        'Consistent environments',
        'Easy deployment',
        'Resource efficiency',
        'Isolation and security',
        'Scalability',
        'Version control for environments',
      ],
      resources: [
        {
          title: 'Docker Docs',
          description: 'Official Docker documentation',
          url: 'https://docs.docker.com',
        },
        {
          title: 'Docker Compose',
          description: 'Multi-container Docker applications',
        },
        {
          title: 'Best Practices',
          description: 'Docker image and container best practices',
        },
      ],
      codeExample: `# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
    },
    cicd: {
      name: 'CI/CD',
      description:
        'Continuous Integration and Deployment pipelines that automate testing, building, and deploying applications.',
      longDescription:
        'CI/CD (Continuous Integration/Continuous Deployment) is a method to frequently deliver apps to customers by introducing automation into the stages of app development. CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing, and deployment of applications.',
      image: '/asset/social media.jpg',
      features: [
        'Automated testing',
        'Build automation',
        'Automated deployments',
        'Environment management',
        'Rollback capabilities',
        'Pipeline visualization',
      ],
      useCases: [
        'Software development teams',
        'DevOps practices',
        'Automated testing',
        'Production deployments',
        'Quality assurance',
        'Release management',
      ],
      benefits: [
        'Faster release cycles',
        'Reduced manual errors',
        'Consistent deployments',
        'Early bug detection',
        'Better collaboration',
        'Automated quality checks',
      ],
      resources: [
        {
          title: 'CI/CD Guide',
          description: 'Learn CI/CD fundamentals',
        },
        {
          title: 'GitHub Actions',
          description: 'CI/CD with GitHub Actions',
        },
        {
          title: 'Jenkins',
          description: 'Popular CI/CD automation server',
        },
      ],
      codeExample: `# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Deploy
        run: npm run deploy`,
    },
    aws: {
      name: 'AWS',
      description:
        'Cloud infrastructure platform providing scalable computing, storage, and services.',
      longDescription:
        'Amazon Web Services (AWS) is a comprehensive cloud computing platform offered by Amazon. It provides a mix of infrastructure as a service (IaaS), platform as a service (PaaS), and packaged software as a service (SaaS) offerings. AWS is the leading cloud provider with the largest market share.',
      image: '/asset/social media.jpg',
      features: [
        'Elastic Compute Cloud (EC2)',
        'Simple Storage Service (S3)',
        'Relational Database Service (RDS)',
        'Lambda serverless functions',
        'CloudFront CDN',
        'Hundreds of services',
      ],
      useCases: [
        'Web application hosting',
        'Data storage and backup',
        'Machine learning',
        'Big data analytics',
        'Content delivery',
        'Enterprise applications',
      ],
      benefits: [
        'Scalable infrastructure',
        'Pay-as-you-go pricing',
        'Global infrastructure',
        'High availability',
        'Security and compliance',
        'Extensive service catalog',
      ],
      resources: [
        {
          title: 'AWS Documentation',
          description: 'Complete AWS service documentation',
          url: 'https://docs.aws.amazon.com',
        },
        {
          title: 'AWS Free Tier',
          description: 'Free tier services to get started',
        },
        {
          title: 'AWS Certification',
          description: 'AWS certification programs',
        },
      ],
      codeExample: `# Deploy to AWS Lambda
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from AWS Lambda!'
    })
  };
};`,
    },
    git: {
      name: 'Git',
      description:
        'Distributed version control system for tracking changes and collaborating on code.',
      longDescription:
        'Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Git is easy to learn and has a tiny footprint with lightning-fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.',
      image: '/asset/social media.jpg',
      features: [
        'Distributed version control',
        'Branching and merging',
        'Staging area',
        'Fast and efficient',
        'Non-linear workflows',
        'Data integrity',
      ],
      useCases: [
        'Source code management',
        'Team collaboration',
        'Version tracking',
        'Branching strategies',
        'Code review',
        'Project history',
      ],
      benefits: [
        'Track all changes',
        'Collaborate easily',
        'Branch without fear',
        'Fast and efficient',
        'Free and open source',
        'Industry standard',
      ],
      resources: [
        {
          title: 'Git Documentation',
          description: 'Official Git documentation',
          url: 'https://git-scm.com/doc',
        },
        {
          title: 'GitHub',
          description: 'Git hosting and collaboration platform',
          url: 'https://github.com',
        },
        {
          title: 'Git Workflows',
          description: 'Learn Git branching workflows',
        },
      ],
      codeExample: `# Initialize repository
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to remote
git push origin main`,
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; tech: string }
}) {
  const serviceTechs = technologies[params.slug]
  const tech = serviceTechs?.[params.tech]

  if (!tech) {
    return {
      title: 'Technology Not Found',
    }
  }

  return {
    title: `${tech.name} - ${params.slug}`,
    description: tech.description,
  }
}

export default function TechnologyDetailPage({
  params,
}: {
  params: { slug: string; tech: string }
}) {
  const serviceTechs = technologies[params.slug]
  const tech = serviceTechs?.[params.tech]

  if (!tech) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero title={tech.name} subtitle={tech.description} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href={`/services/${params.slug}`}
          className="inline-flex items-center space-x-2 text-wine-500 hover:text-wine-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Services</span>
        </Link>

        {/* Hero Image Section */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-96 w-full">
            <Image
              src={tech.image}
              alt={tech.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-900/80 via-wine-800/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {tech.name}
              </h2>
              <p className="text-white/90 text-lg max-w-3xl">
                {tech.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tech.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tech.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-wine-200 hover:shadow-md transition-all"
                  >
                    <CheckCircle2
                      size={24}
                      className="text-wine-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-base leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Common Use Cases
              </h2>
              <div className="space-y-4">
                {tech.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-wine-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700 text-base font-medium">
                        {useCase}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tech.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-5 bg-gradient-to-br from-wine-50 to-white rounded-xl border border-wine-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-wine-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700 text-base leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            {tech.codeExample && (
              <div>
                <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                  Code Example
                </h2>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-gray-100 text-sm font-mono">
                    <code>{tech.codeExample}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Resources */}
            <div>
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Learning Resources
              </h2>
              <div className="space-y-4">
                {tech.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl hover:border-wine-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600">{resource.description}</p>
                      </div>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-wine-500 hover:text-wine-600 hover:bg-wine-50 rounded-lg transition-colors"
                          aria-label={`Visit ${resource.title}`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="text-gray-900 font-medium capitalize">
                      {params.slug.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Type</span>
                    <p className="text-gray-900 font-medium">
                      {params.slug === 'frontend'
                        ? 'Frontend Technology'
                        : params.slug === 'backend'
                        ? 'Backend Technology'
                        : params.slug === 'database'
                        ? 'Database Technology'
                        : 'DevOps Tool'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-wine rounded-2xl p-6 text-white">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Need Help?
                </h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Let&apos;s discuss how I can help you implement {tech.name} in your
                  project.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-white text-wine-500 font-semibold rounded-lg hover:bg-wine-50 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
