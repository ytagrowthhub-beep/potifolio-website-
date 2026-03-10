'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useTheme } from '@/lib/theme-context'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { colors } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOverDarkSection, setIsOverDarkSection] = useState(true) // Hero section is dark

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      // Determine which section is currently in view
      const heroSection = document.getElementById('home')
      
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        // If we're still in the hero section (dark background), use white text
        // Otherwise, use dark text for light backgrounds
        setIsOverDarkSection(scrollY < heroBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu on any navigation
    setIsMobileMenuOpen(false)
    // Let Next.js Link handle the navigation
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        {/* White Navbar Container */}
        <div 
          className="bg-white rounded-xl shadow-lg px-5 py-2.5 flex items-center justify-between"
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Logo - Bold and Visible */}
          <Link href="/" className="flex items-center group">
            <span className="relative flex-shrink-0 inline-block" style={{ width: '100px', height: '100px' }}>
              <Image
                src="/my-logo1.png"
                alt="Ayorfe Tech Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
                sizes="100px"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15)) brightness(1.05) contrast(1.1)',
                  fontWeight: 'bold',
                }}
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-medium text-gray-700 transition-colors relative group"
                style={{
                  color: '#374151',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#374151'
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:opacity-80 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div 
              className="container mx-auto bg-white rounded-xl shadow-lg px-5 py-3 space-y-2 mt-2"
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block font-medium transition-colors py-2 text-gray-700"
                  style={{
                    color: '#374151',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
