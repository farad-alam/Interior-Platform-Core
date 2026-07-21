import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/storefront/Navbar'
import { Footer } from '@/components/storefront/Footer'
import { getSiteSettings } from '@/core/services/settings.service'
import { getLanguage } from '@/core/actions/language.actions'
import { FloatingWhatsApp } from '@/components/storefront/FloatingWhatsApp'

import type { Metadata } from 'next'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const lang = await getLanguage()
  const isAr = lang === 'ar'

  const brandName = isAr ? settings?.brandNameAr || settings?.brandName : settings?.brandName
  const title = brandName ? `${brandName} - Aluminum Kitchen Services` : 'Interior Platform Core'
  const description = isAr ? settings?.footerTaglineAr : settings?.footerTagline
  
  const heroImages = settings?.heroImages?.length 
    ? settings.heroImages 
    : (settings as any)?.heroImage 
      ? [(settings as any).heroImage] 
      : []
  
  const ogImage = heroImages.length > 0 ? heroImages[0] : 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'

  return {
    title: {
      template: `%s | ${brandName || 'Interior Platform'}`,
      default: title,
    },
    description: description || 'Professional maintenance, dismantling & installation across all Riyadh neighborhoods.',
    openGraph: {
      title,
      description: description || 'Professional maintenance, dismantling & installation across all Riyadh neighborhoods.',
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || 'Professional maintenance, dismantling & installation across all Riyadh neighborhoods.',
      images: [ogImage],
    }
  }
}

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const lang = await getLanguage()
  
  return (
    <div className={`min-h-screen bg-background text-foreground ${playfair.variable} ${inter.variable} font-sans`}>
      <Navbar brandName={settings?.brandName} brandNameAr={settings?.brandNameAr} lang={lang} whatsapp={settings?.whatsapp} />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp whatsappNumber={settings?.whatsapp || null} lang={lang} />
    </div>
  )
}
