import { PageHero } from '@/components/PageHero'
import { About } from '@/components/sections/About'

export const metadata = {
  title: 'About Me',
  description:
    'Learn more about Sanni Akeem (Ayorfe Tech), a Full-Stack Developer crafting scalable and high-impact digital solutions.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="About Me"
        subtitle="Full-Stack Developer focused on building scalable, high-impact digital products."
      />
      <About />
    </div>
  )
}

