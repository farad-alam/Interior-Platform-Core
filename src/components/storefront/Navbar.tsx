'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
        <Link href="/" className="font-playfair text-2xl font-bold tracking-wider">
          STUDIO<span className="text-muted-foreground">CORE</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground font-medium">
          <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </div>
    </motion.header>
  )
}
