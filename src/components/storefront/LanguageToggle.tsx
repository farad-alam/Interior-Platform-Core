'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setLanguageCookie } from '@/core/actions/language.actions'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  currentLang: 'en' | 'ar'
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en'
    startTransition(async () => {
      await setLanguageCookie(newLang)
      router.refresh()
    })
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage} 
      disabled={isPending}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium uppercase">{currentLang === 'en' ? 'عربي' : 'EN'}</span>
    </Button>
  )
}
