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

  // Image-level parallax (the images slide inside their containers)
  const mainImageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  
  // Text block parallax (slides up slightly as you scroll down)
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center py-24 bg-[#0a0f0d] overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center", isAr ? "rtl" : "ltr")}>
          
          {/* Main Architectural Image - Spans 5 cols */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[800px] w-full overflow-hidden group border border-white/10">
            {/* Dark elegant border overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none transition-colors duration-500 group-hover:border-white/30 border border-transparent" />
            
            <motion.div 
              style={{ y: mainImageY }}
              className="absolute inset-0 h-[120%] w-full -top-[10%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                alt="Modern Interior Architecture"
                fill
                className="object-cover opacity-80"
              />
              {/* Subtle gradient overlay for mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>

          {/* Typography & Content - Spans 7 cols */}
          <motion.div 
            style={{ y: textY }}
            className={cn("lg:col-span-7 flex flex-col justify-center relative z-30", isAr ? "lg:pr-16 text-right" : "lg:pl-16 text-left")}
          >
            {/* Label */}
            <div className={cn("flex items-center gap-4 mb-8", isAr ? "flex-row-reverse" : "")}>
              <span className="w-12 h-[1px] bg-[#D4B896]/60" />
              <span className="text-[#D4B896] font-semibold tracking-[0.2em] text-xs uppercase">
                {isAr ? 'عن الشركة' : 'The Studio'}
              </span>
            </div>
            
            {/* Statement Quote */}
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-white mb-10 leading-[1.25] max-w-2xl drop-shadow-xl">
              {isAr 
                ? 'نحن لا نصمم مجرد مساحات، بل نصنع '
                : 'We don’t just design spaces, we craft '
              }
              <span className="text-sf-green italic font-light drop-shadow-lg">
                {isAr ? 'تجارب استثنائية' : 'exceptional experiences'}
              </span>
              {isAr ? ' تعكس جوهرك.' : ' that reflect your essence.'}
            </h2>
            
            {/* Body Text */}
            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 mb-12", isAr ? "text-right" : "text-left")}>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                {isAr 
                  ? 'منذ تأسيسنا، التزمنا بإعادة تعريف مفهوم الفخامة العملية. نجمع بين الحرفية الدقيقة والجماليات العصرية لنقدم تصاميم داخلية ومطابخ ألمنيوم ترتقي بأسلوب حياتك.'
                  : 'Since our founding, we have been committed to redefining practical luxury. We merge meticulous craftsmanship with modern aesthetics to deliver interior designs and aluminum kitchens that elevate your lifestyle.'
                }
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                {isAr
                  ? 'كل مشروع هو رحلة تعاونية فريدة. يدرس فريقنا من المهندسين المعماريين والمصممين أدق التفاصيل لضمان أن كل زاوية تنبض بالحياة، والجودة تتحدث عن نفسها.'
                  : 'Every project is a unique collaborative journey. Our team of architects and designers considers the finest details to ensure every corner breathes life, and quality speaks for itself.'
                }
              </p>
            </div>

            {/* CTA */}
            <div>
              <a 
                href="#contact" 
                className={cn("inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black", isAr ? "flex-row-reverse" : "")}
              >
                {isAr ? 'استكشف رؤيتنا' : 'Explore Our Vision'}
              </a>
            </div>

            {/* Secondary Overlapping Image */}
            <div className={cn("absolute hidden lg:block w-[280px] h-[350px] -bottom-32 z-40 overflow-hidden border border-white/10", isAr ? "-left-10" : "-right-10")}>
              <motion.div 
                style={{ y: secondaryImageY }}
                className="absolute inset-0 h-[130%] w-full -top-[15%]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80"
                  alt="Design Details"
                  fill
                  className="object-cover opacity-90"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
