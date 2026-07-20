'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { LanguageToggle } from './LanguageToggle'

export function Navbar({ brandName, brandNameAr, lang }: { brandName?: string, brandNameAr?: string | null, lang: 'en' | 'ar' }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const displayBrand = lang === 'ar' ? (brandNameAr || brandName || 'ألمنيوم') : (brandName || 'STUDIOCORE')

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-playfair text-xl md:text-2xl font-bold tracking-wider">
          {displayBrand.toUpperCase()}
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground font-medium">
            <Link href="#services" className="hover:text-foreground transition-colors">
              {lang === 'ar' ? 'خدماتنا' : 'Services'}
            </Link>
            <Link href="#gallery" className="hover:text-foreground transition-colors">
              {lang === 'ar' ? 'أعمالنا' : 'Gallery'}
            </Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </Link>
          </nav>
          <LanguageToggle currentLang={lang} />
        </div>
      </div>
    </motion.header>
  )
}
