import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/storefront/Navbar'
import { Footer } from '@/components/storefront/Footer'
import { getSiteSettings } from '@/core/services/settings.service'
import { getLanguage } from '@/core/actions/language.actions'
import { FloatingWhatsApp } from '@/components/storefront/FloatingWhatsApp'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
