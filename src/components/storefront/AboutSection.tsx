'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  isAr?: boolean
}

export function AboutSection({ isAr }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms
  // Background blobs
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [100, -200])
  
  // Image composition
  const yMainImage = useTransform(scrollYProgress, [0, 1], [50, -50])
  const ySecondaryImage = useTransform(scrollYProgress, [0, 1], [-30, 80])
  const rotateSecondaryImage = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center py-24 overflow-hidden bg-[#F5F0E8]"
    >
      {/* Parallax Background Blobs */}
      <motion.div 
        style={{ y: yBlob1 }}
        className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-sf-green/5 blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ y: yBlob2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8C7A6B]/10 blur-[140px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center", isAr ? "rtl" : "ltr")}>
          
          {/* Text Content */}
          <div className={cn("flex flex-col", isAr ? "text-right" : "text-left")}>
            <div className={cn("flex items-center gap-3 mb-6", isAr ? "flex-row-reverse" : "")}>
              <span className="w-10 h-[1px] bg-sf-green" />
              <span className="text-sf-green font-bold tracking-widest text-xs uppercase">
                {isAr ? 'من نحن' : 'About Us'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-sf-charcoal mb-8 leading-[1.15]">
              {isAr ? 'نصمم مساحات' : 'Crafting Spaces'}<br />
              <em className="text-sf-tan italic">{isAr ? 'تلهمك' : 'that Inspire'}</em>
            </h2>
            
            <p className="text-sf-warm-gray text-lg md:text-xl leading-relaxed mb-6 max-w-xl">
              {isAr 
                ? 'نحن نؤمن بأن المساحات التي نعيش ونعمل فيها تشكل هويتنا وحياتنا. منذ انطلاقتنا، كرسنا جهودنا لتقديم تصاميم داخلية ومطابخ ألمنيوم تجمع بين الأناقة المطلقة والأداء العملي.'
                : 'We believe that the spaces we inhabit shape our lives. Since our inception, we have been dedicated to delivering interior designs and aluminum kitchens that perfectly balance absolute elegance with practical functionality.'
              }
            </p>
            <p className="text-sf-warm-gray text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              {isAr
                ? 'فريقنا من الخبراء يعمل بشغف لتحويل رؤيتك إلى واقع ملموس، مع الاهتمام بأدق التفاصيل والالتزام بأعلى معايير الجودة في كل خطوة.'
                : 'Our team of experts works passionately to turn your vision into reality, paying attention to the finest details and adhering to the highest quality standards at every step.'
              }
            </p>

            <div>
              <a 
                href="#contact" 
                className={cn("inline-flex items-center gap-2 pb-1 border-b-2 border-sf-green text-sf-charcoal font-bold uppercase tracking-wider text-sm transition-all hover:text-sf-green", isAr ? "flex-row-reverse" : "")}
              >
                {isAr ? 'اكتشف المزيد' : 'Discover More'}
              </a>
            </div>
          </div>

          {/* Image Composition */}
          <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center">
            
            {/* Main Image (Organic Blob Shape) */}
            <motion.div 
              style={{ y: yMainImage }}
              className={cn("absolute w-[80%] h-[80%] top-[10%] z-10 drop-shadow-2xl", isAr ? "right-0" : "left-0")}
            >
              <div 
                className="w-full h-full relative"
                style={{ 
                  // Organic SVG clip-path
                  clipPath: 'polygon(10% 0, 95% 5%, 100% 85%, 85% 100%, 0 90%, 5% 15%)' 
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                  alt="Modern Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Secondary Image (Circle overlapping) */}
            <motion.div 
              style={{ y: ySecondaryImage, rotate: rotateSecondaryImage }}
              className={cn("absolute w-[45%] h-[45%] bottom-[5%] z-20 drop-shadow-xl border-[8px] border-[#F5F0E8] rounded-[30%] overflow-hidden", isAr ? "left-0" : "right-0")}
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80"
                alt="Aluminum Kitchen Detail"
                fill
                className="object-cover"
              />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
