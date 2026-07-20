'use server'

import { cookies } from 'next/headers'

export async function setLanguageCookie(lang: 'en' | 'ar') {
  cookies().set('language', lang, { path: '/' })
}

export async function getLanguage() {
  const cookieStore = cookies()
  const lang = cookieStore.get('language')
  return (lang?.value === 'ar' ? 'ar' : 'en') as 'en' | 'ar'
}
