import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/core/db/client'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StorefrontPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  const services = await prisma.service.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'asc' },
    take: 4,
  })

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" 
            alt="Luxury Interior Background" 
            fill 
            className="object-cover opacity-40 brightness-50"
            priority
          />
          {/* Note: In a real scenario, this would pull from SiteSettings or a dedicated Hero model. Using a placeholder for v1 */}
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-6 leading-tight">
            Design that elevates your lifestyle.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light mb-10">
            We specialize in creating timeless, functional, and deeply personal spaces that reflect who you are.
          </p>
          <Link 
            href="#projects" 
            className="group flex items-center gap-4 text-sm uppercase tracking-widest text-white border-b border-white/30 pb-2 hover:border-white transition-colors"
          >
            Explore Portfolio <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-8 leading-snug">
                We believe a home should be the ultimate reflection of its inhabitants.
              </h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                Our approach marries architectural rigor with intuitive design. We don't just decorate rooms; we architect atmospheres. Every material, every line, and every shadow is meticulously considered to create a space that feels inherently right.
              </p>
              <Link href="/about" className="inline-block text-sm font-semibold uppercase tracking-widest border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
                Our Philosophy
              </Link>
            </div>
            <div className="relative h-[600px] w-full bg-muted">
               {/* Decorative structural element / secondary image placeholder */}
               <div className="absolute inset-4 border border-foreground/10 z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-white">Selected Works</h2>
            <Link href="/projects" className="text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={project.id} className={`group block ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-white/5">
                  {project.images[0] && (
                    <Image 
                      src={project.images[0]} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-playfair text-2xl text-white mb-2">{project.title}</h3>
                <p className="text-white/60 text-sm font-light uppercase tracking-widest">
                  {project.description?.substring(0, 50)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-6">Our Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Comprehensive design services tailored to bring your vision to life, from initial concept to final installation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((service) => (
              <div key={service.id} className="border-t border-border pt-8">
                <h3 className="font-playfair text-2xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground font-light mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-foreground/20 before:rounded-full before:mr-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
