'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FloatingWhatsAppProps {
  whatsappNumber: string | null
  lang: 'en' | 'ar'
}

export function FloatingWhatsApp({ whatsappNumber, lang }: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button after a slight delay to not distract immediately on load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!whatsappNumber || !isVisible) return null

  const cleanNumber = whatsappNumber.replace(/\D/g, '')
  const message = lang === 'ar' 
    ? 'مرحباً، أود الاستفسار عن خدماتكم' 
    : 'Hello, I would like to inquire about your services'

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-10 hover:bg-[#1ebd5a]"
      aria-label="Contact us on WhatsApp"
      dir="ltr"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
    </a>
  )
}
