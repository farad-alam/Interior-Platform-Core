'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface AboutSectionProps {
  isAr?: boolean
}

export function AboutSection({ isAr }: AboutSectionProps) {
  return (
    <section className="py-32 relative" style={{ background: 'var(--sf-cream)' }}>
      {/* 
        We add extra bottom padding (py-32 instead of py-24) to account for the Stats strip 
        which will overlap the bottom of this section using a negative top margin. 
      */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className={cn("flex flex-col lg:flex-row items-stretch", isAr ? "lg:flex-row-reverse" : "")}>
          
          {/* Solid Color Card - Overlaps the image on Desktop */}
          <div 
            className={cn(
              "w-full lg:w-[45%] p-10 md:p-16 rounded-2xl relative z-20 shadow-2xl flex flex-col justify-center",
              // We use negative margins to make the card overlap the image
              isAr ? "lg:-ml-16 lg:mr-0 mt-8 lg:mt-12" : "lg:-mr-16 lg:ml-0 mb-8 lg:mb-12"
            )}
            style={{ background: 'var(--sf-brown)', color: '#fff' }}
          >
            <span 
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" 
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {isAr ? 'عن الشركة' : 'MORE ABOUT US'}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-8 leading-[1.15]">
              {isAr 
                ? '١٠ سنوات من الجودة والمشاريع الناجحة'
                : '10 years of quality and successful projects'
              }
            </h2>
            
            <div className="space-y-6 mb-10 text-sm md:text-base font-light" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
               <p>
                {isAr 
                  ? 'منذ تأسيسنا، التزمنا بإعادة تعريف مفهوم الفخامة العملية. نجمع بين الحرفية الدقيقة والجماليات العصرية لنقدم تصاميم داخلية ومطابخ ألمنيوم ترتقي بأسلوب حياتك.'
                  : 'Since our founding, we have been committed to redefining practical luxury. We merge meticulous craftsmanship with modern aesthetics to deliver interior designs and aluminum kitchens that elevate your lifestyle.'
                }
              </p>
              <p>
                {isAr
                  ? 'كل مشروع هو رحلة تعاونية فريدة. يدرس فريقنا أدق التفاصيل لضمان أن كل زاوية تنبض بالحياة، والجودة تتحدث عن نفسها، دون الحاجة إلى تكاليف باهظة أو هدر للوقت.'
                  : 'Every project is a unique collaborative journey. Our team considers the finest details to ensure every corner breathes life, and quality speaks for itself, without requiring immense cost or time.'
                }
              </p>
            </div>
            
            <div>
              <a 
                href="#contact" 
                className={cn(
                  "inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-80",
                  isAr ? "flex-row-reverse" : ""
                )} 
                // We use a bright green for the CTA text to contrast with the brown
                style={{ color: '#4ade80' }}
              >
                {isAr ? 'اقرأ المزيد' : 'Read More'}
                <ArrowRight className={cn("h-5 w-5", isAr ? "rotate-180" : "")} />
              </a>
            </div>
          </div>

          {/* Main Architectural Image */}
          <div className="w-full lg:w-[65%] h-[400px] lg:h-[700px] relative rounded-2xl overflow-hidden shadow-lg z-10 lg:my-auto">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
              alt="Interior Design"
              fill
              className="object-cover"
            />
            {/* Subtle overlay to enhance image depth */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

        </div>
        
      </div>
    </section>
  )
}
