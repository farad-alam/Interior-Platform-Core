import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export async function Footer() {
  const [settings, lang] = await Promise.all([
    prisma.siteSettings.findFirst(),
    getLanguage(),
  ])

  const isAr = lang === 'ar'
  const brandName = isAr ? (settings?.brandNameAr || settings?.brandName) : settings?.brandName
  const tagline = isAr ? (settings?.footerTaglineAr || settings?.footerTagline) : settings?.footerTagline
  const address = isAr ? (settings?.addressAr || settings?.address) : settings?.address
  const workingHours = isAr ? (settings?.workingHoursAr || settings?.workingHours) : settings?.workingHours
  const serviceAreas = isAr ? (settings?.serviceAreasAr || settings?.serviceAreas) : settings?.serviceAreas
  const wp = settings?.whatsapp || ''
  const wpClean = wp.replace(/\D/g, '')

  return (
    <footer className="bg-muted/20 border-t border-border">
      {/* CTA Strip */}
      {wp && (
        <div className="bg-primary py-10 px-6">
          <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                {isAr ? 'هل تحتاج مساعدة في مطبخك؟' : 'Need help with your kitchen?'}
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                {isAr ? 'تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر.' : 'Contact us now for a free consultation and price quote.'}
              </p>
            </div>
            <a
              href={`https://wa.me/${wpClean}?text=${encodeURIComponent(isAr ? 'مرحباً، أريد الاستفسار عن خدماتكم.' : 'Hello, I would like to inquire about your services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              {isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      )}

      {/* Footer Grid */}
      <div className="container mx-auto px-6 pt-16 pb-10 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="font-playfair text-2xl font-bold tracking-wider mb-4">
            {brandName || 'STUDIOCORE'}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {tagline || (isAr ? 'شريكك الموثوق لحلول مطابخ الألمنيوم في الرياض.' : 'Your trusted partner for aluminum kitchen solutions in Riyadh.')}
          </p>
          {wp && (
            <a
              href={`tel:${settings?.phone}`}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Phone className="h-4 w-4" />
              {settings?.phone || wp}
            </a>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-foreground">
            {isAr ? 'تواصل معنا' : 'Contact'}
          </h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {address && (
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{address}</span>
              </li>
            )}
            {workingHours && (
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{workingHours}</span>
              </li>
            )}
            {settings?.phone && (
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-foreground transition-colors">
                  {settings.phone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-foreground">
            {isAr ? 'مناطق الخدمة' : 'Service Areas'}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {serviceAreas || (isAr ? 'جميع أحياء الرياض' : 'All Riyadh Neighborhoods')}
          </p>
          <div className="mt-6 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              {isAr ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">{isAr ? 'صيانة المطابخ' : 'Kitchen Maintenance'}</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">{isAr ? 'فك المطابخ' : 'Kitchen Dismantling'}</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">{isAr ? 'تركيب المطابخ' : 'Kitchen Installation'}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 py-6 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
        <p>
          &copy; {new Date().getFullYear()} {settings?.brandName || 'Aluminum Kitchen Maintenance'}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
        <p className="text-xs">
          {isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
        </p>
      </div>
    </footer>
  )
}
