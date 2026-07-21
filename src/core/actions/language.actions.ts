'use server'

import { cookies, headers } from 'next/headers'

export async function setLanguageCookie(lang: 'en' | 'ar') {
  const cookieStore = await cookies()
  cookieStore.set('language', lang, { path: '/' })
}

export async function getLanguage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('language')
  
  // If explicitly set, respect the cookie
  if (lang) {
    return lang.value === 'ar' ? 'ar' : 'en'
  }

  // If no cookie is set, detect from IP country header (provided by Vercel)
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country')
  
  // Array of ISO 3166-1 alpha-2 codes for Arab countries
  const arabCountries = ['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO', 'LB', 'SY', 'IQ', 'YE', 'PS', 'SD', 'LY', 'TN', 'DZ', 'MA', 'MR']
  
  if (country && arabCountries.includes(country.toUpperCase())) {
    return 'ar'
  }
  
  return 'en'
}
