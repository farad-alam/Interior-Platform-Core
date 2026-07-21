'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  title: string
  titleAr?: string | null
  caption: string
  captionAr?: string | null
  serviceType: string
  isAr: boolean
}

export function BeforeAfterSlider({ beforeImage, afterImage, title, titleAr, caption, captionAr, serviceType, isAr }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-[#EDE8DD]">
      {/* Before Image (underneath, shows on the left) */}
      <Image
        src={beforeImage}
        alt="Before"
        fill
        className="object-cover"
      />
      
      {/* After Image (on top, shows on the right) */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
        />
      </div>

      {/* Slider Handle UI */}
      <div 
        className="absolute inset-y-0 z-20 w-1 bg-white/80 cursor-ew-resize flex items-center justify-center pointer-events-none"
        style={{ left: `calc(${sliderPos}% - 2px)` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--sf-charcoal)' }}>
            <path d="m9 18-6-6 6-6"/><path d="m15 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* Invisible Range Input for Interaction */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize m-0 p-0"
      />

      {/* Gradient Overlay for Text (only shows on hover) */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-t from-[#1A2421]/90 via-[#1A2421]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
        <h4 className="font-playfair font-bold text-2xl mb-2">
          {isAr ? (titleAr || title) : title}
        </h4>
        <p className="text-sm text-white/80 leading-relaxed mb-4">
          {isAr ? (captionAr || caption) : caption}
        </p>
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest"
          style={{ color: '#D4B896' }}
        >
          {serviceType}
        </span>
      </div>

      {/* Badges for Before/After */}
      <div 
        className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-opacity duration-200"
        style={{ opacity: sliderPos < 15 ? 0 : 1 }}
      >
        {isAr ? 'قبل' : 'Before'}
      </div>
      <div 
        className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-opacity duration-200"
        style={{ opacity: sliderPos > 85 ? 0 : 1 }}
      >
        {isAr ? 'بعد' : 'After'}
      </div>
    </div>
  )
}
