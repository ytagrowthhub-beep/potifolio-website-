import { Hero } from '@/components/sections/Hero'
import { TrustedPartners } from '@/components/sections/TrustedPartners'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { HireMeCTA } from '@/components/sections/HireMeCTA'
import { HashNavigation } from '@/components/HashNavigation'

export default function Home() {
  return (
    <>
      <HashNavigation />
      <Hero />
      <TrustedPartners />
      <About />
      <Skills />
      <Projects />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <HireMeCTA />
    </>
  )
}
