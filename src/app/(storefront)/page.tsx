import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { getLanguage } from '@/core/actions/language.actions'
import { getSiteSettings } from '@/core/services/settings.service'
import { Phone, MessageCircle, Wrench, ShieldCheck, Clock, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StorefrontPage() {
  const lang = await getLanguage()
  const settings = await getSiteSettings()
  
  const services = await prisma.service.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'asc' },
  })

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
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col items-center text-center border border-border/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{isAr ? 'عمل مضمون' : 'Guaranteed Work'}</h3>
              <p className="text-muted-foreground">{isAr ? 'نقدم ضماناً على كافة أعمال الصيانة والتركيب لضمان راحة بالك.' : 'We provide a warranty on all maintenance and installation work for your peace of mind.'}</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col items-center text-center border border-border/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{isAr ? 'استجابة سريعة' : 'Fast Response'}</h3>
              <p className="text-muted-foreground">{isAr ? 'فريقنا مستعد لتلبية طلبك في أسرع وقت داخل مدينة الرياض.' : 'Our team is ready to fulfill your request as quickly as possible within Riyadh.'}</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl shadow-sm flex flex-col items-center text-center border border-border/50">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{isAr ? 'فنيون خبراء' : 'Expert Technicians'}</h3>
              <p className="text-muted-foreground">{isAr ? 'عمالة مدربة وذات خبرة طويلة في التعامل مع جميع أنواع المطابخ.' : 'Trained workforce with extensive experience handling all types of kitchens.'}</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* WhatsApp Floating CTA (Client Component will be injected here) */}
    </div>
  )
}
