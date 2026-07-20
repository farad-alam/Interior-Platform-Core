import { prisma } from '../src/core/db/client'

async function main() {
  console.log('Cleaning existing demo data (except users and media)...')
  await prisma.project.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.siteSettings.deleteMany({})

  console.log('Creating Site Settings...')
  await prisma.siteSettings.create({
    data: {
      brandName: 'STUDIOCORE',
      email: 'hello@studiocore.design',
      phone: '+1 (555) 123-4567',
      address: '123 Design Avenue, New York, NY 10012',
      instagram: 'https://instagram.com/studiocore',
      linkedin: 'https://linkedin.com/company/studiocore',
      whatsapp: '+1 (555) 123-4567',
    }
  })

  console.log('Creating Categories...')
  const residential = await prisma.category.create({ data: { name: 'Residential', slug: 'residential', type: 'project' } })
  const commercial = await prisma.category.create({ data: { name: 'Commercial', slug: 'commercial', type: 'project' } })
  const hospitality = await prisma.category.create({ data: { name: 'Hospitality', slug: 'hospitality', type: 'project' } })

  console.log('Creating Services...')
  await prisma.service.create({
    data: {
      title: 'Full-Service Interior Design',
      slug: 'full-service-interior-design',
      description: 'From conceptualization to the final styling, we handle every detail of your interior design project.',
      features: ['Space Planning & Layout', 'Custom Furniture Design', 'Material & Finish Selection', 'Project Management'],
      status: 'PUBLISHED'
    }
  })
  
  await prisma.service.create({
    data: {
      title: 'Architectural Remodeling',
      slug: 'architectural-remodeling',
      description: 'Comprehensive structural changes and remodeling to optimize your living or working environment.',
      features: ['Structural Blueprints', 'Permit Acquisition', 'Contractor Coordination', 'Lighting Design'],
      status: 'PUBLISHED'
    }
  })

  await prisma.service.create({
    data: {
      title: '3D Rendering & Visualization',
      slug: '3d-rendering-and-visualization',
      description: 'Photorealistic 3D renderings to help you visualize the space before construction begins.',
      features: ['Photorealistic Images', 'Virtual Walkthroughs', 'Material Previews', 'Lighting Simulation'],
      status: 'PUBLISHED'
    }
  })

  console.log('Creating Projects...')
  await prisma.project.create({
    data: {
      title: 'The Glasshouse Retreat',
      slug: 'glasshouse-retreat',
      description: 'A modern, minimalist forest retreat featuring floor-to-ceiling glass and natural stone finishes.',
      categoryId: residential.id,
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
      ],
      status: 'PUBLISHED',
      featured: true,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Tribeca Loft',
      slug: 'tribeca-loft',
      description: 'An industrial-chic loft in the heart of Tribeca, blending raw concrete with warm brass accents.',
      categoryId: residential.id,
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502005097973-1547b744d081?q=80&w=2071&auto=format&fit=crop'
      ],
      status: 'PUBLISHED',
      featured: true,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Aura Boutique Hotel',
      slug: 'aura-boutique-hotel',
      description: 'A luxury 40-room boutique hotel focusing on wellness, organic textures, and ambient lighting.',
      categoryId: hospitality.id,
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop'
      ],
      status: 'PUBLISHED',
      featured: true,
    }
  })

  await prisma.project.create({
    data: {
      title: 'Lumina Tech HQ',
      slug: 'lumina-tech-hq',
      description: 'An open-concept commercial workspace designed to foster collaboration and creativity.',
      categoryId: commercial.id,
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop'
      ],
      status: 'PUBLISHED',
      featured: true,
    }
  })

  console.log('Demo data successfully generated!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
