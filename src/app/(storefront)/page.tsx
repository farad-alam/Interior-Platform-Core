import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { getSiteSettings } from '@/core/services/settings.service'
import { Phone, MessageCircle, MapPin, ChevronDown, Star } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

export const dynamic = 'force-dynamic'

// Helper to dynamically render a Lucide icon by name
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.CheckCircle
  return <Icon className={className} />
}

export default async function StorefrontPage() {
  const lang = await getLanguage()
  const settings = await getSiteSettings()
  
  const [services, trustFeatures, stats, faqs, testimonials, galleryItems] = await Promise.all([
    prisma.service.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'asc' } }),
    prisma.trustFeature.findMany({ orderBy: { order: 'asc' } }),
    prisma.statCounter.findMany({ orderBy: { order: 'asc' } }),
    prisma.fAQ.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } }),
    prisma.testimonial.findMany({ where: { status: 'PUBLISHED', featured: true }, orderBy: { createdAt: 'desc' } }),
    prisma.galleryItem.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } })
  ])

  const isAr = lang === 'ar'

  // Dynamic Content Accessors
  const heroHeadline = isAr ? settings?.heroHeadlineAr : settings?.heroHeadline
  const heroSub = isAr ? settings?.heroSubheadlineAr : settings?.heroSubheadline
  const wpNumber = settings?.whatsapp || ''
  
  const defaultHeadline = isAr ? 'خبراء صيانة وتركيب مطابخ الألمنيوم' : 'Expert Aluminum Kitchen Maintenance & Installation'
  const defaultSub = isAr ? 'خدمات احترافية في جميع أنحاء الرياض. جودة مضمونة وسرعة في التنفيذ.' : 'Professional services across Riyadh. Guaranteed quality and fast execution.'

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src={settings?.heroImage || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} 
            alt="Aluminum Kitchen Maintenance" 
            fill 
            className="object-cover opacity-60 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-8 font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            {isAr ? 'نخدم جميع أحياء الرياض' : 'Serving all Riyadh neighborhoods'}
          </div>
          
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight drop-shadow-lg">
            {heroHeadline || defaultHeadline}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-medium mb-12 drop-shadow-md">
            {heroSub || defaultSub}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a 
              href={`https://wa.me/${wpNumber.replace(/\D/g,'')}?text=${encodeURIComponent(isAr ? 'مرحباً، أود الاستفسار عن خدمات المطابخ' : 'Hello, I want to inquire about kitchen services')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-lg font-bold text-lg w-full sm:w-auto transition-transform hover:scale-105 shadow-lg shadow-green-900/20"
            >
              <MessageCircle className="h-6 w-6" />
              {isAr ? 'تواصل معنا عبر واتساب' : 'Contact via WhatsApp'}
            </a>
            
            {settings?.phone && (
              <a 
                href={`tel:${settings.phone.replace(/\D/g,'')}`}
                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg w-full sm:w-auto transition-transform hover:scale-105 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                {isAr ? 'اتصل بنا الآن' : 'Call Us Now'}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (Trust Signals) */}
      {trustFeatures.length > 0 && (
        <section className="py-20 px-6 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustFeatures.map(feature => (
                <div key={feature.id} className="bg-background p-8 rounded-2xl shadow-sm flex flex-col items-center text-center border border-border/50">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <DynamicIcon name={feature.icon || 'CheckCircle'} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{isAr ? (feature.titleAr || feature.title) : feature.title}</h3>
                  <p className="text-muted-foreground">{isAr ? (feature.descriptionAr || feature.description) : feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CORE SERVICES */}
      <section id="services" className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              {isAr ? 'خدماتنا' : 'Our Services'}
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const sTitle = isAr ? (service.titleAr || service.title) : service.title
              const sDesc = isAr ? (service.descriptionAr || service.description) : service.description
              const sFeatures = isAr ? (service.featuresAr.length > 0 ? service.featuresAr : service.features) : service.features
              const sMsg = isAr ? (service.whatsappMessageAr || 'أريد طلب خدمة') : (service.whatsappMessage || 'I want to request service')
              
              return (
                <div key={service.id} className="group flex flex-col bg-muted/30 rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                  {service.image && (
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image src={service.image} alt={sTitle} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4">{sTitle}</h3>
                    <p className="text-muted-foreground mb-6 flex-1">{sDesc}</p>
                    
                    {sFeatures.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {sFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-foreground/80">
                            <span className="text-primary mr-2 ml-2 font-bold">•</span> 
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <a 
                      href={`https://wa.me/${wpNumber.replace(/\D/g,'')}?text=${encodeURIComponent(sMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/50 py-3 rounded-lg font-bold transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {isAr ? 'اطلب الخدمة' : 'Request Service'}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3.5. PORTFOLIO GALLERY */}
      {galleryItems.length > 0 && (
        <section id="gallery" className="py-24 px-6 bg-muted/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {isAr ? 'معرض الأعمال' : 'Our Work Gallery'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
              
              {/* Note: In a complete implementation, this filter would be client-side state. 
                  For now, it displays all items. */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-sm">
                  {isAr ? 'الكل' : 'All'}
                </span>
                <span className="px-6 py-2 bg-background border border-border text-muted-foreground rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  {isAr ? 'صيانة' : 'Maintenance'}
                </span>
                <span className="px-6 py-2 bg-background border border-border text-muted-foreground rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  {isAr ? 'تركيب' : 'Installation'}
                </span>
                <span className="px-6 py-2 bg-background border border-border text-muted-foreground rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  {isAr ? 'فك' : 'Dismantling'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map(item => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <Image src={item.imageUrl} alt={item.title || 'Portfolio Image'} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h4 className="font-bold text-lg">{isAr ? (item.titleAr || item.title) : item.title}</h4>
                    <p className="text-sm text-white/80">{isAr ? (item.captionAr || item.caption) : item.caption}</p>
                    <span className="inline-block mt-3 text-xs font-bold uppercase tracking-wider text-primary">
                      {item.serviceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. STATS COUNTERS */}
      {stats.length > 0 && (
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(stat => (
                <div key={stat.id}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{isAr ? (stat.valueAr || stat.value) : stat.value}</div>
                  <div className="text-primary-foreground/80 font-medium">{isAr ? (stat.labelAr || stat.label) : stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {isAr ? 'آراء عملائنا' : 'What Our Clients Say'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="bg-background p-8 rounded-2xl shadow-sm border border-border">
                  <div className="flex text-amber-500 mb-6">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg mb-8 italic">"{isAr ? (t.contentAr || t.content) : t.content}"</p>
                  <div>
                    <div className="font-bold">{isAr ? (t.clientNameAr || t.clientName) : t.clientName}</div>
                    <div className="text-sm text-muted-foreground">{isAr ? (t.clientLocationAr || t.clientLocation) : t.clientLocation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="group border border-border rounded-lg bg-muted/30 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg">
                    {isAr ? (faq.questionAr || faq.question) : faq.question}
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground">
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
