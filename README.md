# Ayorfe Tech Portfolio Website

A modern, high-performance, full-stack portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, smooth animations, and responsive layout
- **Performance Optimized**: Lighthouse score 90+, optimized images, lazy loading
- **SEO Ready**: Dynamic metadata, sitemap, robots.txt, Open Graph tags
- **Full-Stack**: Next.js API routes, PostgreSQL with Prisma ORM
- **Type Safe**: Full TypeScript coverage
- **Accessible**: ARIA labels, keyboard navigation, contrast-safe colors

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **Icons**: Lucide React
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Forms**: React Hook Form + Zod validation

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (local or cloud)
- Git

## 🏗 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` and add your:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_SITE_URL`: Your site URL (e.g., `http://localhost:3000` for dev)

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# (Optional) Open Prisma Studio to manage data
npm run db:studio
```

### 4. Add Your Content

#### Add Logo
Place your logo image at `/public/logo.png`

#### Add Images
- Hero carousel images: `/public/hero-1.jpg`, `/public/hero-2.jpg`, `/public/hero-3.jpg`
- About section image: `/public/about-image.jpg`
- Project images: Upload via Prisma Studio or seed script

#### Seed Database (Optional)

You can create a seed script to populate initial data. Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add your seed data here
  const project = await prisma.project.create({
    data: {
      title: 'Example Project',
      slug: 'example-project',
      description: 'A sample project description',
      longDescription: '<p>Full project description...</p>',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      featured: true,
      // ... other fields
    },
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Then add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── projects/          # Project pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── Navbar.tsx         # Navigation
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
└── public/                # Static assets
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the wine color scheme:

```typescript
colors: {
  wine: {
    DEFAULT: '#6A0F1F',
    // ... other shades
  },
}
```

### Fonts

Fonts are configured in `app/layout.tsx`. You can:
- Use Google Fonts (already set up with Inter and Poppins)
- Add custom fonts via `next/font/local`

### Content

- **Owner Info**: Update in `components/Footer.tsx` and `app/layout.tsx` metadata
- **Social Links**: Update in `components/Footer.tsx` and `components/sections/Contact.tsx`
- **Skills**: Update in `components/sections/Skills.tsx` or add to database
- **Projects**: Manage via Prisma Studio or API

## 📧 Contact Form Setup

The contact form is ready but needs email service configuration. Options:

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env`: `RESEND_API_KEY=re_xxxxx`
4. Uncomment and configure in `app/api/contact/route.ts`

### Option 2: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Install: `npm install @sendgrid/mail`
3. Configure in `app/api/contact/route.ts`

### Option 3: Nodemailer

1. Install: `npm install nodemailer`
2. Configure SMTP in `app/api/contact/route.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Netlify**: Configure build command: `npm run build`
- **Railway**: Add PostgreSQL addon, set `DATABASE_URL`
- **AWS/DigitalOcean**: Follow Next.js deployment guides

## 📊 Performance

- Lighthouse score: 90+
- Image optimization: Next.js Image component
- Code splitting: Automatic with App Router
- Font optimization: `next/font`

## 🔒 Security

- Form validation with Zod
- SQL injection protection via Prisma
- XSS protection with React
- Environment variables for secrets

## 📝 License

This project is private and proprietary.

## 👤 Author

**Sanni Akeem**
- Email: ayorfe2@gmail.com
- GitHub: [@ytagrowthhub](https://github.com/ytagrowthhub)
- Twitter: [@haryor6](https://x.com/haryor6)

---

Built with ❤️ by Ayorfe Tech
