'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function HeroSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use a default image if none provided
  const validImages = images?.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop']

  useEffect(() => {
    // Only slide if we have more than 1 image
    if (validImages.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [validImages.length])

  return (
    <>
      {validImages.map((src, index) => (
        <Image
          key={src + index}
          src={src}
          alt={`Aluminum Kitchen Hero ${index + 1}`}
          fill
          className="object-cover"
          priority={index === 0} // Only prioritize the first image for LCP
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0
          }}
        />
      ))}
    </>
  )
}
