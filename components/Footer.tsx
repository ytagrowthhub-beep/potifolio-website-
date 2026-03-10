'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Mail } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ytagrowthhub-beep',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/haryor6',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:ayorfe2@gmail.com',
    icon: Mail,
  },
]

export function Footer() {
  const { colors } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="text-white"
      style={{
        background: colors.gradient,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative w-40 h-48 flex-shrink-0">
                <Image
                  src="/my logo.png.png"
                  alt="Ayorfe Tech Logo"
                  fill
                  className="object-contain"
                  sizes="160px"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.3)) brightness(1.1)',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Building scalable, modern, and high-impact digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                    aria-label={social.name}
                  >
                    <Icon
                      size={20}
                      className="text-white group-hover:scale-110 transition-transform"
                    />
                  </a>
                )
              })}
            </div>
            <p className="text-white/80 text-sm mt-4">
              <a
                href="mailto:ayorfe2@gmail.com"
                className="hover:text-white transition-colors"
              >
                ayorfe2@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Sanni Akeem - Ayorfe Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
