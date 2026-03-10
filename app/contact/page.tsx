import { PageHero } from '@/components/PageHero'
import { Contact } from '@/components/sections/Contact'

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Sanni Akeem (Ayorfe Tech) to discuss projects, collaborations, and opportunities.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Contact Me"
        subtitle="Let\u2019s talk about your next project or collaboration."
      />
      <Contact />
    </div>
  )
}

