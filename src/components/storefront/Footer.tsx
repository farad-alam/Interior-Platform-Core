import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { Phone, MapPin, Clock, MessageCircle, ArrowRight, Instagram } from 'lucide-react'

// Custom SVGs for Snapchat and TikTok if Lucide doesn't have them
function SnapchatIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11.69 2.52a.5.5 0 0 1 .62 0 8.04 8.04 0 0 1 2.82 2.6c1.13 1.7 1.83 3.66 2.05 5.67.06.5.48.91 1 .91h1.16a.44.44 0 0 1 .37.69l-.75 1.09a.4.4 0 0 0-.07.41c.21.57.8 1.01 1.43 1.13a.42.42 0 0 1 .31.64 6.7 6.7 0 0 1-2.92 2.67.65.65 0 0 0-.41.61c.01.27.09.52.23.75a1.27 1.27 0 0 1-.22 1.48 2.37 2.37 0 0 1-1.63.7c-.55 0-1.12-.23-1.63-.58a.4.4 0 0 0-.46 0 6.64 6.64 0 0 1-3.08.75 6.64 6.64 0 0 1-3.08-.75.4.4 0 0 0-.46 0c-.51.35-1.08.58-1.63.58a2.37 2.37 0 0 1-1.63-.7 1.27 1.27 0 0 1-.22-1.48c.14-.23.22-.48.23-.75a.65.65 0 0 0-.41-.61 6.7 6.7 0 0 1-2.92-2.67.42.42 0 0 1 .31-.64c.63-.12 1.22-.56 1.43-1.13a.4.4 0 0 0-.07-.41l-.75-1.09a.44.44 0 0 1 .37-.69h1.16c.52 0 .94-.41 1-.91.22-2.01.92-3.97 2.05-5.67a8.04 8.04 0 0 1 2.82-2.6Z" />
    </svg>
  )
}

function TikTokIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function XIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16M4 20L20 4" />
    </svg>
  )
}

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
    <>
      {/* ══════════════════════════════════════════
          MAP SECTION (Full Width Before Footer)
      ══════════════════════════════════════════ */}
      {settings?.mapEmbedUrl && (
        <section className="relative w-full h-[400px] bg-[#EDE8DD]">
          <iframe
            src={settings.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.8)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend the map into the footer */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--sf-charcoal)] to-transparent opacity-80" />
        </section>
      )}

      <footer style={{ background: 'var(--sf-charcoal)', color: '#F5F0E8' }}>
        
        {/* ══════════════════════════════════════════
            FOOTER MAIN CTA STRIP (Deep Forest Green)
        ══════════════════════════════════════════ */}
        {wp && (
          <div style={{ background: 'var(--sf-green)' }}>
            <div className={`container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 ${isAr ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
              <div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-2">
                  {isAr ? 'جاهز لتجديد مطبخك؟' : 'Ready to upgrade your kitchen?'}
                </h3>
                <p style={{ color: 'rgba(245,240,232,0.8)' }}>
                  {isAr ? 'تواصل معنا الآن للحصول على استشارة مجانية.' : 'Contact us now for a free consultation.'}
                </p>
              </div>
              <a
                href={`https://wa.me/${wpClean}?text=${encodeURIComponent(isAr ? 'مرحباً، أريد الاستفسار عن خدماتكم.' : 'Hello, I would like to inquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-3 font-semibold transition-transform hover:-translate-y-1"
                style={{
                  background: '#F5F0E8',
                  color: 'var(--sf-green)',
                  padding: '0.9rem 2.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em'
                }}
              >
                <MessageCircle className="h-5 w-5" />
                {isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            FOOTER GRID
        ══════════════════════════════════════════ */}
        <div className={`container mx-auto px-6 pt-20 pb-16 grid md:grid-cols-12 gap-12 ${isAr ? 'text-right' : 'text-left'}`}>
          
          {/* Brand Info (takes up 4 cols) */}
          <div className="md:col-span-5">
            <h2 className="font-playfair text-3xl font-bold tracking-wider mb-6 text-white">
              {brandName || 'KITCHEN PRO'}
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
              {tagline || (isAr ? 'شريكك الموثوق لحلول مطابخ الألمنيوم في الرياض.' : 'Your trusted partner for aluminum kitchen solutions in Riyadh.')}
            </p>
            {wp && (
              <a
                href={`tel:${settings?.phone}`}
                className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity font-semibold mb-8"
                style={{ color: '#D4B896' }}
              >
                <Phone className="h-4 w-4" />
                {settings?.phone || wp}
              </a>
            )}

            {/* Social Media Links (Saudi Arabia favorites) */}
            <div className={`flex gap-4 ${isAr ? 'justify-end md:justify-start flex-row-reverse' : ''}`}>
              {settings?.snapchat && (
                <a href={settings.snapchat} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1" style={{ background: 'rgba(245,240,232,0.05)', color: '#D4B896' }}>
                  <SnapchatIcon className="h-5 w-5" />
                </a>
              )}
              {settings?.tiktok && (
                <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1" style={{ background: 'rgba(245,240,232,0.05)', color: '#D4B896' }}>
                  <TikTokIcon className="h-5 w-5" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1" style={{ background: 'rgba(245,240,232,0.05)', color: '#D4B896' }}>
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1" style={{ background: 'rgba(245,240,232,0.05)', color: '#D4B896' }}>
                  <XIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Info (takes up 4 cols) */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 text-white">
              {isAr ? 'معلومات التواصل' : 'Contact Info'}
            </h3>
            <ul className="space-y-5 text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
              {address && (
                <li className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4B896' }} />
                  <span>{address}</span>
                </li>
              )}
              {workingHours && (
                <li className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4B896' }} />
                  <span>{workingHours}</span>
                </li>
              )}
              {settings?.email && (
                <li className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4B896' }}>@</span>
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links / Areas (takes up 3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 text-white">
              {isAr ? 'مناطق الخدمة' : 'Service Areas'}
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(245,240,232,0.6)' }}>
              {serviceAreas || (isAr ? 'نغطي جميع أحياء الرياض' : 'Covering all Riyadh Neighborhoods')}
            </p>
            
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
              <li><Link href="#services" className="hover:text-white transition-colors">{isAr ? 'خدماتنا' : 'Our Services'}</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">{isAr ? 'أعمالنا' : 'Portfolio'}</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
            </ul>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}>
          <div className={`container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${isAr ? 'md:flex-row-reverse' : ''}`} style={{ color: 'rgba(245,240,232,0.4)' }}>
            <p>
              &copy; {new Date().getFullYear()} {settings?.brandName || 'Aluminum Kitchen Maintenance'}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
              <span className="hover:text-white transition-colors cursor-pointer">{isAr ? 'الشروط والأحكام' : 'Terms of Service'}</span>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}
