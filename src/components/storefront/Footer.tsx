import Link from 'next/link'
import { prisma } from '@/core/db/client'

export async function Footer() {
  const settings = await prisma.siteSettings.findFirst()

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <h2 className="font-playfair text-2xl font-bold tracking-wider mb-6">
            {settings?.brandName || 'STUDIOCORE'}
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Crafting elegant, modern, and timeless spaces tailored to your unique lifestyle and vision.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Contact</h3>
          <ul className="space-y-4 text-muted-foreground">
            {settings?.email && <li><a href={`mailto:${settings.email}`} className="hover:text-foreground transition-colors">{settings.email}</a></li>}
            {settings?.phone && <li><a href={`tel:${settings.phone}`} className="hover:text-foreground transition-colors">{settings.phone}</a></li>}
            {settings?.address && <li className="max-w-[200px]">{settings.address}</li>}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Socials</h3>
          <ul className="space-y-4 text-muted-foreground">
            {settings?.instagram && <li><a href={settings.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>}
            {settings?.facebook && <li><a href={settings.facebook} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Facebook</a></li>}
            {settings?.linkedin && <li><a href={settings.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {settings?.brandName || 'Studio Core'}. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
