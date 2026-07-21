import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { getSiteSettings } from '@/core/services/settings.service'
import { MessageCircle, MapPin, ChevronDown, Star, ArrowRight, Phone } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ClientGallery } from '@/components/storefront/ClientGallery'

import { HeroSlider } from '@/components/storefront/HeroSlider'

export const dynamic = 'force-dynamic'

const DynamicIcon = ({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.CheckCircle
  return <Icon className={className} style={style} />
}

export default async function StorefrontPage() {
  const lang = await getLanguage()
  const settings = await getSiteSettings()

  const [services, trustFeatures, stats, faqs, testimonials, galleryItems] = await Promise.all([
    prisma.service.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'asc' } }),
    prisma.trustFeature.findMany({ orderBy: { order: 'asc' } }),
    prisma.statCounter.findMany({ orderBy: { order: 'asc' } }),
    prisma.fAQ.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'asc' } }),
    prisma.testimonial.findMany({ where: { status: 'PUBLISHED', featured: true }, orderBy: { createdAt: 'desc' } }),
    prisma.galleryItem.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } }),
  ])

  const isAr = lang === 'ar'
  const heroHeadline = isAr ? settings?.heroHeadlineAr : settings?.heroHeadline
  const heroSub = isAr ? settings?.heroSubheadlineAr : settings?.heroSubheadline
  const wpNumber = settings?.whatsapp || ''
  const wpClean = wpNumber.replace(/\D/g, '')

  const defaultHeadline = isAr
    ? 'خبراء صيانة وتركيب مطابخ الألمنيوم'
    : 'Expert Aluminum Kitchen Services'
  const defaultSub = isAr
    ? 'خدمات احترافية في جميع أنحاء الرياض. جودة مضمونة وسرعة في التنفيذ.'
    : 'Professional maintenance, dismantling & installation across all Riyadh neighborhoods.'

  // Split headline for italic last word (design inspiration)
  const headline = heroHeadline || defaultHeadline
  const words = headline.split(' ')
  const lastWord = words.pop()
  const restWords = words.join(' ')
  
  // Use heroImages array, falling back to legacy single heroImage if present
  const heroImages = settings?.heroImages?.length 
    ? settings.heroImages 
    : (settings as any)?.heroImage 
      ? [(settings as any).heroImage] 
      : []

  // Build Schema.org LocalBusiness JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings?.brandName || 'Interior Platform Core',
    image: heroImages[0] || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
    '@id': process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://www.yourdomain.com',
    url: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://www.yourdomain.com',
    telephone: settings?.phone || settings?.whatsapp || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.address || '',
      addressLocality: 'Riyadh',
      addressRegion: 'Riyadh Province',
      addressCountry: 'SA'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday'
      ],
      opens: '07:00',
      closes: '22:00'
    }
  }

  return (
    <div className="flex flex-col w-full" style={{ background: 'var(--sf-cream)' }}>
      {/* JSON-LD Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ══════════════════════════════════════════
          1. HERO — FULL BACKGROUND IMAGE
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <HeroSlider images={heroImages} />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2421]/80 via-[#1A2421]/60 to-[#1A2421]/90" />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(212,184,150,0.2)', color: '#D4B896', border: '1px solid rgba(212,184,150,0.3)' }}>
              {isAr ? 'خدمات مطابخ الألمنيوم' : 'Aluminum Kitchen Services'}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-playfair font-bold leading-tight mb-8 max-w-4xl"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F5F0E8', lineHeight: 1.15 }}
          >
            {restWords}{' '}
            <em style={{ fontStyle: 'italic', color: '#D4B896' }}>{lastWord}</em>
          </h1>

          {/* Subheadline */}
          <p
            className="mb-12 max-w-2xl leading-relaxed"
            style={{ fontSize: '1.1rem', color: 'rgba(245,240,232,0.8)', lineHeight: 1.8 }}
          >
            {heroSub || defaultSub}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            {wpClean && (
              <a
                href={`https://wa.me/${wpClean}?text=${encodeURIComponent(isAr ? 'مرحباً، أود الاستفسار عن خدمات المطابخ' : 'Hello, I want to inquire about kitchen services')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 px-8 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: 'var(--sf-green)', color: '#F5F0E8', border: '1.5px solid var(--sf-green)' }}
              >
                <MessageCircle className="h-5 w-5" />
                {isAr ? 'تواصل عبر واتساب' : 'Request Free Quote'}
              </a>
            )}
            <a
              href="#services"
              className="flex items-center justify-center gap-2 py-4 px-8 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#F5F0E8] hover:text-[#1A2421]"
              style={{ background: 'transparent', color: '#F5F0E8', border: '1.5px solid rgba(245,240,232,0.5)' }}
            >
              {isAr ? 'استكشف خدماتنا' : 'Explore Services'}
            </a>
          </div>

        </div>

      </section>

      {/* ══════════════════════════════════════════
          2. TRUST FEATURES — Floating card strip
      ══════════════════════════════════════════ */}
      {trustFeatures.length > 0 && (
        <section className="px-6 py-4" style={{ background: 'var(--sf-cream)' }}>
          <div className="container mx-auto max-w-6xl">
            <div
              className="rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6"
              style={{ background: '#fff', boxShadow: '0 4px 40px rgba(44,59,45,0.07)', border: '1px solid rgba(212,184,150,0.3)' }}
            >
              {trustFeatures.slice(0, 4).map(feature => (
                <div key={feature.id} className="flex flex-col items-center text-center gap-3">
                  {/* Icon circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--sf-cream)', border: '1.5px solid var(--sf-tan)' }}
                  >
                    <DynamicIcon
                      name={feature.icon || 'CheckCircle'}
                      className="h-6 w-6"
                      style={{ color: 'var(--sf-green)' } as any}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--sf-charcoal)', letterSpacing: '0.12em' }}
                    >
                      {isAr ? (feature.titleAr || feature.title) : feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--sf-warm-gray)' }}>
                      {isAr ? (feature.descriptionAr || feature.description) : feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          3. SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6" style={{ background: 'var(--sf-cream)' }}>
        <div className="container mx-auto max-w-6xl">
          {/* Section header */}
          <div className={`flex items-start justify-between mb-14 flex-wrap gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div>
              <span className="sf-label block mb-3" style={{ color: 'var(--sf-brown)' }}>
                {isAr ? 'ما نقدمه' : 'What We Offer'}
              </span>
              <h2
                className="font-playfair font-bold"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--sf-charcoal)', lineHeight: 1.2 }}
              >
                {isAr ? 'خدماتنا الأساسية' : 'Our Core Services'}
              </h2>
            </div>
            <a
              href="#gallery"
              className="flex items-center gap-2 text-sm font-semibold self-end"
              style={{ color: 'var(--sf-brown)' }}
            >
              {isAr ? 'مشاهدة الأعمال' : 'View Our Work'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const sTitle = isAr ? (service.titleAr || service.title) : service.title
              const sDesc = isAr ? (service.descriptionAr || service.description) : service.description
              const sFeatures = isAr
                ? service.featuresAr.length > 0 ? service.featuresAr : service.features
                : service.features
              const sMsg = isAr
                ? (service.whatsappMessageAr || 'أريد طلب خدمة')
                : (service.whatsappMessage || 'I want to request service')

              return (
                <div
                  key={service.id}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(212,184,150,0.35)',
                    boxShadow: '0 2px 20px rgba(44,59,45,0.05)'
                  }}
                >
                  {/* Service image or color band */}
                  {service.image ? (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={sTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-2 w-full"
                      style={{
                        background: idx === 0
                          ? 'var(--sf-green)'
                          : idx === 1
                          ? 'var(--sf-brown)'
                          : 'var(--sf-green-light)'
                      }}
                    />
                  )}

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'var(--sf-cream)', border: '1.5px solid var(--sf-tan)' }}
                    >
                      <DynamicIcon
                        name={service.icon || 'Wrench'}
                        className="h-5 w-5"
                        style={{ color: 'var(--sf-green)' } as any}
                      />
                    </div>

                    <h3
                      className="font-playfair font-bold text-xl mb-3"
                      style={{ color: 'var(--sf-charcoal)' }}
                    >
                      {sTitle}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6 flex-1"
                      style={{ color: 'var(--sf-warm-gray)', lineHeight: 1.75 }}
                    >
                      {sDesc}
                    </p>

                    {sFeatures.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {sFeatures.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--sf-charcoal)' }}>
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: 'var(--sf-brown)' }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {wpClean && (
                      <a
                        href={`https://wa.me/${wpClean}?text=${encodeURIComponent(sMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-200 group-hover:bg-[#2C3B2D] group-hover:text-[#F5F0E8] hover:bg-[#2C3B2D] hover:text-[#F5F0E8] bg-[#F5F0E8] text-[#2C3B2D] border-[1.5px] border-[#2C3B2D]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {isAr ? 'اطلب الخدمة' : 'Request Service'}
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. PORTFOLIO GALLERY
      ══════════════════════════════════════════ */}
      {galleryItems.length > 0 && (
        <section id="gallery" className="py-24 px-6" style={{ background: '#fff' }}>
          <div className="container mx-auto max-w-7xl">
            <div className={`flex items-start justify-between mb-14 flex-wrap gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div>
                <span className="sf-label block mb-3" style={{ color: 'var(--sf-brown)' }}>
                  {isAr ? 'معرض الأعمال' : 'Portfolio'}
                </span>
                <h2
                  className="font-playfair font-bold"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--sf-charcoal)', lineHeight: 1.2 }}
                >
                  {isAr ? 'أعمالنا المنجزة' : 'Our Completed Work'}
                </h2>
              </div>
            </div>
            <ClientGallery items={galleryItems} isAr={isAr} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          5. STATS STRIP (dark green)
      ══════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="py-20 px-6" style={{ background: 'var(--sf-green)' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(stat => (
                <div key={stat.id}>
                  <div
                    className="font-playfair font-bold mb-1"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F5F0E8' }}
                  >
                    {isAr ? (stat.valueAr || stat.value) : stat.value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(245,240,232,0.7)' }}>
                    {isAr ? (stat.labelAr || stat.label) : stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6" style={{ background: 'var(--sf-cream-dark)' }}>
          <div className="container mx-auto max-w-6xl">
            <div className={`mb-14 ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="sf-label block mb-3" style={{ color: 'var(--sf-brown)' }}>
                {isAr ? 'آراء العملاء' : 'Client Reviews'}
              </span>
              <h2
                className="font-playfair font-bold"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--sf-charcoal)', lineHeight: 1.2 }}
              >
                {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className="flex flex-col p-7 rounded-2xl"
                  style={{ background: '#fff', border: '1px solid rgba(212,184,150,0.35)', boxShadow: '0 2px 20px rgba(44,59,45,0.05)' }}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--sf-brown)' }} />
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1 italic"
                    style={{ color: 'var(--sf-charcoal)', lineHeight: 1.8 }}
                  >
                    "{isAr ? (t.contentAr || t.content) : t.content}"
                  </p>
                  {/* Divider */}
                  <div className="h-px mb-4" style={{ background: 'rgba(212,184,150,0.4)' }} />
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--sf-charcoal)' }}>
                      {isAr ? (t.clientNameAr || t.clientName) : t.clientName}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--sf-warm-gray)' }}>
                      {isAr ? (t.clientLocationAr || t.clientLocation) : t.clientLocation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          7. WHATSAPP FREE QUOTE CTA
      ══════════════════════════════════════════ */}
      {wpClean && (
        <section className="py-24 px-6" style={{ background: 'var(--sf-cream)' }}>
          <div
            className="container mx-auto max-w-4xl rounded-3xl py-16 px-8 md:px-16 text-center"
            style={{ background: 'var(--sf-green)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Decorative circles */}
            <div
              className="absolute top-[-4rem] right-[-4rem] w-64 h-64 rounded-full opacity-10"
              style={{ background: 'var(--sf-cream)' }}
            />
            <div
              className="absolute bottom-[-3rem] left-[-3rem] w-48 h-48 rounded-full opacity-10"
              style={{ background: 'var(--sf-tan)' }}
            />

            <span
              className="sf-label block mb-4"
              style={{ color: 'rgba(245,240,232,0.7)', position: 'relative' }}
            >
              {isAr ? 'تواصل سريع ومجاني' : 'Quick & Free'}
            </span>
            <h2
              className="font-playfair font-bold mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5F0E8', lineHeight: 1.2, position: 'relative' }}
            >
              {isAr ? 'احصل على عرض سعر مجاني الآن' : 'Get a Free Price Quote Today'}
            </h2>
            <p
              className="mb-10 max-w-xl mx-auto"
              style={{ color: 'rgba(245,240,232,0.75)', fontSize: '0.95rem', lineHeight: 1.8, position: 'relative' }}
            >
              {isAr
                ? 'أرسل لنا صورة لمطبخك عبر واتساب وسنقدم لك تقييماً مجانياً وعرض سعر خلال دقائق.'
                : "Send us a photo of your kitchen via WhatsApp and we'll give you a free assessment and price quote within minutes."}
            </p>
            <a
              href={`https://wa.me/${wpClean}?text=${encodeURIComponent(isAr ? 'مرحباً، أريد الاستفسار والحصول على عرض سعر.' : 'Hello, I would like to get a free price quote.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-semibold transition-all duration-200 hover:-translate-y-1"
              style={{
                background: '#F5F0E8',
                color: 'var(--sf-green)',
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }}
            >
              <MessageCircle className="h-5 w-5" />
              {isAr ? 'ابدأ المحادثة على واتساب' : 'Chat on WhatsApp'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 px-6" style={{ background: '#fff' }}>
          <div className="container mx-auto max-w-3xl">
            <div className={`mb-14 ${isAr ? 'text-right' : 'text-left'}`}>
              <span className="sf-label block mb-3" style={{ color: 'var(--sf-brown)' }}>
                {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
              <h2
                className="font-playfair font-bold"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--sf-charcoal)', lineHeight: 1.2 }}
              >
                {isAr ? 'أسئلة يطرحها عملاؤنا' : 'Questions We Get Asked'}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group [&_summary::-webkit-details-marker]:hidden rounded-2xl overflow-hidden"
                  style={{ background: 'var(--sf-cream)', border: '1px solid rgba(212,184,150,0.4)' }}
                >
                  <summary
                    className={`flex items-center justify-between p-6 cursor-pointer font-semibold text-sm ${isAr ? 'flex-row-reverse text-right' : ''}`}
                    style={{ color: 'var(--sf-charcoal)', letterSpacing: '0.01em' }}
                  >
                    <span>{isAr ? (faq.questionAr || faq.question) : faq.question}</span>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4"
                      style={{ color: 'var(--sf-brown)' }}
                    />
                  </summary>
                  <div
                    className={`px-6 pb-6 text-sm leading-relaxed ${isAr ? 'text-right' : ''}`}
                    style={{ color: 'var(--sf-warm-gray)', lineHeight: 1.8 }}
                  >
                    {isAr ? (faq.answerAr || faq.answer) : faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
