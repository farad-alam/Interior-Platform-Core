'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BrandMarqueeProps {
  brands: any[]
  isAr?: boolean
}

export function BrandMarquee({ brands, isAr }: BrandMarqueeProps) {
  const baseX = useMotionValue(0)
  
  // Base velocity. Negative means scroll left, positive means scroll right
  // If Arabic (RTL), we might want to scroll right instead of left for natural feel
  const baseVelocity = isAr ? 1 : -1

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000) * 2.5 // Set to 2.5 for a 10s loop
    baseX.set(baseX.get() + moveBy)
  })

  if (!brands || brands.length === 0) return null

  // Duplicate brands array to create seamless loop
  // We need enough items to fill the screen twice to prevent popping
  const loopedBrands = [...brands, ...brands, ...brands, ...brands]

  // Wrap the X position so it loops seamlessly. 
  // -50% means it has scrolled exactly half its total duplicated width.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  return (
    <section className="py-20 bg-[#F5F0E8] overflow-hidden border-y border-[#2C3B2D]/10">
      <div className="container mx-auto px-6 mb-10 text-center">
        <span className="sf-label block mb-2" style={{ color: 'var(--sf-brown)' }}>
          {isAr ? 'شركاء النجاح' : 'Trusted Partners'}
        </span>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-sf-charcoal">
          {isAr ? 'العلامات التجارية التي نعمل معها' : 'Brands We Work With'}
        </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex overflow-hidden group">
        {/* Left/Right fading gradients for smooth entering/exiting effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F0E8] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F0E8] to-transparent z-10" />

        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center pl-16 md:pl-24"
          style={{ x }}
        >
          {loopedBrands.map((brand, idx) => (
            <div 
              key={`${brand.id}-${idx}`} 
              className="relative w-[140px] md:w-[180px] h-[70px] md:h-[90px] shrink-0 hover:scale-105 transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden"
            >
              {brand.url ? (
                <a href={brand.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    fill
                    className="object-contain rounded-2xl"
                  />
                </a>
              ) : (
                <Image
                  src={brand.imageUrl}
                  alt={brand.name}
                  fill
                  className="object-contain rounded-2xl"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
