import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/storefront/Navbar'
import { Footer } from '@/components/storefront/Footer'
import { getSiteSettings } from '@/core/services/settings.service'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default async function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  
  return (
    <div className={`min-h-screen bg-background text-foreground dark ${playfair.variable} ${inter.variable} font-sans`}>
      <Navbar brandName={settings?.brandName} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
