import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme-context'
import { ThemeInitializer } from '@/components/ThemeInitializer'
import { ChatbotWrapper } from '@/components/ChatbotWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: {
    default: 'Sanni Akeem | Full-Stack Developer | Ayorfe Tech',
    template: '%s | Ayorfe Tech',
  },
  description:
    'Full-Stack Developer crafting scalable, modern, and high-impact digital solutions. Building performant web apps & systems.',
  keywords: [
    'Full-Stack Developer',
    'Web Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
    'Ayorfe Tech',
  ],
  authors: [{ name: 'Sanni Akeem', url: 'https://github.com/ytagrowthhub-beep' }],
  creator: 'Sanni Akeem',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayorfetech.com',
    siteName: 'Ayorfe Tech',
    title: 'Sanni Akeem | Full-Stack Developer',
    description:
      'Full-Stack Developer crafting scalable, modern, and high-impact digital solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ayorfe Tech Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanni Akeem | Full-Stack Developer',
    description:
      'Full-Stack Developer crafting scalable, modern, and high-impact digital solutions.',
    creator: '@haryor6',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ThemeProvider>
          <ThemeInitializer />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatbotWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
