'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { LanguageToggle } from './LanguageToggle'
import { MessageCircle, Menu, X } from 'lucide-react'

export function Navbar({ brandName, brandNameAr, lang, whatsapp }: {
  brandName?: string
  brandNameAr?: string | null
  lang: 'en' | 'ar'
  whatsapp?: string | null
}) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const displayBrand = lang === 'ar'
    ? (brandNameAr || brandName || 'صيانة مطابخ')
    : (brandName || 'KITCHEN PRO')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { href: '#services', en: 'Services', ar: 'خدماتنا' },
    { href: '#gallery', en: 'Gallery', ar: 'أعمالنا' },
    { href: '#faq', en: 'FAQ', ar: 'الأسئلة' },
  ]

  const wpClean = (whatsapp || '').replace(/\D/g, '')
  const wpMsg = lang === 'ar' ? 'مرحباً، أود الاستفسار عن خدماتكم.' : 'Hello, I would like to inquire about your services.'

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#D4B896]/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="font-playfair text-xl md:text-2xl font-bold tracking-wide text-[#2C3B2D]">
            {displayBrand}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] font-semibold text-[#8C7B6B] hover:text-[#2C3B2D] transition-colors duration-200"
              >
                {lang === 'ar' ? link.ar : link.en}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle currentLang={lang} />
            {wpClean && (
              <a
                href={`https://wa.me/${wpClean}?text=${encodeURIComponent(wpMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 sf-btn-primary text-sm py-2.5 px-5"
                style={{ borderRadius: '9999px', background: 'var(--sf-green)', color: '#F5F0E8', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.04em', padding: '0.6rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
              >
                <MessageCircle className="h-4 w-4" />
                {lang === 'ar' ? 'تواصل معنا' : 'WhatsApp Us'}
              </a>
            )}
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#2C3B2D]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 inset-x-0 z-40 bg-[#F5F0E8] border-b border-[#D4B896]/50 shadow-lg md:hidden px-6 py-6 flex flex-col gap-4"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-[0.15em] font-semibold text-[#2C3B2D] py-2 border-b border-[#D4B896]/30"
            >
              {lang === 'ar' ? link.ar : link.en}
            </Link>
          ))}
          {wpClean && (
            <a
              href={`https://wa.me/${wpClean}?text=${encodeURIComponent(wpMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'var(--sf-green)', color: '#F5F0E8' }}
            >
              <MessageCircle className="h-4 w-4" />
              {lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}
            </a>
          )}
        </motion.div>
      )}
    </>
  )
}
