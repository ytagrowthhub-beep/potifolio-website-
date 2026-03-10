import { PageHero } from '@/components/PageHero'
import { Skills } from '@/components/sections/Skills'

export const metadata = {
  title: 'Services',
  description:
    'Explore our comprehensive development services: Frontend, Backend, Database, and DevOps solutions.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Our Services"
        subtitle="Comprehensive development services to bring your digital vision to life"
      />
      <Skills />
    </div>
  )
}
