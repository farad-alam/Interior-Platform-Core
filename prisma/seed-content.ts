import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Load env
import { config } from 'dotenv'
config()

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🚀 Starting content seed for Aluminum Kitchen Maintenance...\n')

  // ─────────────────────────────────────────────
  // 1. SITE SETTINGS
  // ─────────────────────────────────────────────
  console.log('📋 Seeding Site Settings...')
  const existingSettings = await prisma.siteSettings.findFirst()
  const settingsData = {
    brandName: 'Aluminum Kitchen Maintenance',
    brandNameAr: 'صيانة مطابخ الألمنيوم',
    phone: '+966500892742',
    whatsapp: '+966500892742',
    address: 'Riyadh, Saudi Arabia',
    addressAr: 'الرياض، المملكة العربية السعودية',
    heroHeadline: 'Expert Aluminum Kitchen Maintenance & Installation in Riyadh',
    heroHeadlineAr: 'خبراء صيانة وتركيب وفك مطابخ الألمنيوم في الرياض',
    heroSubheadline: 'Professional dismantling, installation & maintenance of aluminum kitchens across all Riyadh neighborhoods. Fast, reliable, and guaranteed quality.',
    heroSubheadlineAr: 'خدمات احترافية في فك وتركيب وصيانة مطابخ الألمنيوم في جميع أحياء الرياض. سرعة في التنفيذ وجودة مضمونة.',
    workingHours: 'Sat–Thu: 7:00 AM – 10:00 PM',
    workingHoursAr: 'السبت – الخميس: ٧:٠٠ ص – ١٠:٠٠ م',
    serviceAreas: 'All Riyadh Neighborhoods including Al Olaya, Al Malaz, Al Nakheel, Al Rawdah, and surrounding areas',
    serviceAreasAr: 'جميع أحياء الرياض بما فيها العليا، الملز، النخيل، الروضة، والمناطق المجاورة',
    footerTagline: 'Your trusted partner for aluminum kitchen solutions in Riyadh.',
    footerTaglineAr: 'شريكك الموثوق لحلول مطابخ الألمنيوم في الرياض.',
  }

  if (existingSettings) {
    await prisma.siteSettings.update({ where: { id: existingSettings.id }, data: settingsData })
    console.log('  ✓ Updated Site Settings')
  } else {
    await prisma.siteSettings.create({ data: settingsData })
    console.log('  ✓ Created Site Settings')
  }

  // ─────────────────────────────────────────────
  // 2. SERVICES
  // ─────────────────────────────────────────────
  console.log('\n🔧 Seeding Services...')
  await prisma.service.deleteMany({})

  const services = [
    {
      title: 'Aluminum Kitchen Maintenance',
      titleAr: 'صيانة مطابخ الألمنيوم',
      slug: 'aluminum-kitchen-maintenance',
      description: 'We provide comprehensive maintenance for all types of aluminum kitchens. Whether it\'s a damaged door, broken hinge, worn-out rail, or misaligned cabinet — our skilled technicians restore your kitchen to perfect working condition quickly and efficiently.',
      descriptionAr: 'نقدم خدمات صيانة شاملة لجميع أنواع مطابخ الألمنيوم. سواء كان باباً تالفاً أو مفصلاً مكسوراً أو ريلاً بالياً أو خزانة غير محاذية — يعيد فنيونا المهرة مطبخك إلى حالته المثالية بسرعة وكفاءة.',
      icon: 'Wrench',
      features: [
        'Cabinet door repair & adjustment',
        'Hinge and handle replacement',
        'Rail and drawer mechanism repair',
        'Seal and edge band replacement',
        'Surface scratch & dent restoration',
        'Free diagnosis and assessment',
      ],
      featuresAr: [
        'إصلاح وضبط أبواب الخزائن',
        'استبدال المفصلات والمقابض',
        'إصلاح آليات الريل والأدراج',
        'استبدال الأختام والحواف',
        'إصلاح الخدوش والمشوهات السطحية',
        'تشخيص وتقييم مجاني',
      ],
      whatsappMessage: 'Hello, I need aluminum kitchen maintenance service in Riyadh.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى خدمة صيانة مطبخ ألمنيوم في الرياض.',
      status: 'PUBLISHED',
    },
    {
      title: 'Kitchen Dismantling (Removal)',
      titleAr: 'فك المطابخ',
      slug: 'kitchen-dismantling',
      description: 'Professional and careful dismantling of aluminum kitchens with zero damage to your walls or tiles. We dismantle and pack your entire kitchen ready for relocation, renovation, or replacement.',
      descriptionAr: 'فك احترافي وحذر لمطابخ الألمنيوم دون أي ضرر لجدرانك أو البلاط. نفك ونحزم مطبخك بالكامل استعداداً للانتقال أو التجديد أو الاستبدال.',
      icon: 'PackageOpen',
      features: [
        'Complete kitchen unit dismantling',
        'Wall & tile protection during removal',
        'Careful component labeling & packing',
        'Countertop and sink removal',
        'Appliance disconnection assistance',
        'Same-day service available',
      ],
      featuresAr: [
        'فك وحدات المطبخ بالكامل',
        'حماية الجدران والبلاط أثناء الفك',
        'تسمية وتغليف المكونات بعناية',
        'فك الأسطح وأحواض المغسلة',
        'مساعدة في فصل الأجهزة',
        'خدمة في نفس اليوم متاحة',
      ],
      whatsappMessage: 'Hello, I need a kitchen dismantling service in Riyadh.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى خدمة فك مطبخ في الرياض.',
      status: 'PUBLISHED',
    },
    {
      title: 'Kitchen Installation (Assembly)',
      titleAr: 'تركيب المطابخ',
      slug: 'kitchen-installation',
      description: 'Expert installation of new or relocated aluminum kitchens with precision and attention to detail. We ensure everything is perfectly aligned, securely fixed, and fully functional from day one.',
      descriptionAr: 'تركيب احترافي للمطابخ الألمنيوم الجديدة أو المنقولة بدقة واهتمام بالتفاصيل. نضمن أن كل شيء محاذٍ تماماً ومثبت بأمان ويعمل بشكل كامل منذ اليوم الأول.',
      icon: 'Construction',
      features: [
        'Precise measurement & layout planning',
        'Full unit assembly & wall mounting',
        'Countertop cutting & fitting',
        'Sink & faucet installation',
        'Appliance integration support',
        'Final inspection & quality check',
      ],
      featuresAr: [
        'قياس دقيق وتخطيط التصميم',
        'تجميع كامل للوحدات وتثبيتها بالجدار',
        'قطع وتركيب أسطح المطبخ',
        'تركيب الأحواض والصنابير',
        'دعم تكامل الأجهزة',
        'فحص نهائي وفحص جودة',
      ],
      whatsappMessage: 'Hello, I need a kitchen installation service in Riyadh.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى خدمة تركيب مطبخ في الرياض.',
      status: 'PUBLISHED',
    },
  ]

  for (const s of services) {
    await prisma.service.create({ data: s as any })
  }
  console.log(`  ✓ Created ${services.length} Services`)

  // ─────────────────────────────────────────────
  // 3. TRUST FEATURES
  // ─────────────────────────────────────────────
  console.log('\n⭐ Seeding Trust Features...')
  await prisma.trustFeature.deleteMany({})

  const trustFeatures = [
    { title: 'Licensed & Experienced', titleAr: 'مرخصون وذوو خبرة', description: 'Over 10 years of experience in aluminum kitchen services across Riyadh.', descriptionAr: 'أكثر من 10 سنوات من الخبرة في خدمات مطابخ الألمنيوم في الرياض.', icon: 'BadgeCheck', order: 1 },
    { title: 'Fast Response', titleAr: 'استجابة سريعة', description: 'Same-day and next-day service available. We\'re there when you need us.', descriptionAr: 'خدمة في نفس اليوم واليوم التالي متاحة. نحن هنا عندما تحتاجنا.', icon: 'Zap', order: 2 },
    { title: 'Quality Guaranteed', titleAr: 'الجودة مضمونة', description: 'All work comes with a satisfaction guarantee and high-quality materials.', descriptionAr: 'جميع الأعمال مصحوبة بضمان الرضا ومواد عالية الجودة.', icon: 'ShieldCheck', order: 3 },
    { title: 'Serving All Riyadh', titleAr: 'نخدم جميع أحياء الرياض', description: 'We cover all districts across Riyadh. Wherever you are, we come to you.', descriptionAr: 'نغطي جميع الأحياء في الرياض. أينما كنت، نأتي إليك.', icon: 'MapPin', order: 4 },
    { title: 'Transparent Pricing', titleAr: 'أسعار شفافة', description: 'No hidden fees. Clear, honest pricing before any work begins.', descriptionAr: 'لا رسوم خفية. أسعار واضحة وصادقة قبل البدء بأي عمل.', icon: 'CircleDollarSign', order: 5 },
    { title: 'Clean & Professional', titleAr: 'نظيف واحترافي', description: 'Our team arrives on time, works neatly and leaves your home spotless.', descriptionAr: 'يصل فريقنا في الوقت المحدد ويعمل بنظافة ويترك منزلك نظيفاً.', icon: 'Sparkles', order: 6 },
  ]

  for (const tf of trustFeatures) {
    await prisma.trustFeature.create({ data: tf })
  }
  console.log(`  ✓ Created ${trustFeatures.length} Trust Features`)

  // ─────────────────────────────────────────────
  // 4. STAT COUNTERS
  // ─────────────────────────────────────────────
  console.log('\n📊 Seeding Stat Counters...')
  await prisma.statCounter.deleteMany({})

  const stats = [
    { label: 'Years of Experience', labelAr: 'سنوات الخبرة', value: '10+', valueAr: '+10', icon: 'Calendar', order: 1 },
    { label: 'Kitchens Serviced', labelAr: 'مطبخاً تمت خدمته', value: '1,500+', valueAr: '+١٥٠٠', icon: 'ChefHat', order: 2 },
    { label: 'Happy Clients', labelAr: 'عميل راضٍ', value: '1,200+', valueAr: '+١٢٠٠', icon: 'Users', order: 3 },
    { label: 'Riyadh Districts Covered', labelAr: 'حياً مغطىً في الرياض', value: '30+', valueAr: '+٣٠', icon: 'MapPin', order: 4 },
  ]

  for (const stat of stats) {
    await prisma.statCounter.create({ data: stat })
  }
  console.log(`  ✓ Created ${stats.length} Stat Counters`)

  // ─────────────────────────────────────────────
  // 5. TESTIMONIALS
  // ─────────────────────────────────────────────
  console.log('\n💬 Seeding Testimonials...')
  await prisma.testimonial.deleteMany({})

  const testimonials = [
    {
      clientName: 'Ahmed Al-Rashidi', clientNameAr: 'أحمد الراشدي',
      clientLocation: 'Al Olaya, Riyadh', clientLocationAr: 'العليا، الرياض',
      clientTitle: 'Homeowner',
      content: 'Excellent service! Fixed all cabinet doors and replaced damaged hinges in just two hours. The technician was very professional and left everything spotless. Highly recommended!',
      contentAr: 'خدمة ممتازة! أصلحوا جميع أبواب الخزائن واستبدلوا المفصلات التالفة في ساعتين فقط. كان الفني محترفاً جداً وترك كل شيء نظيفاً. أنصح بهم بشدة!',
      rating: 5, featured: true, status: 'PUBLISHED',
    },
    {
      clientName: 'Fatima Al-Zahrani', clientNameAr: 'فاطمة الزهراني',
      clientLocation: 'Al Malaz, Riyadh', clientLocationAr: 'الملز، الرياض',
      clientTitle: 'Interior Designer',
      content: 'I regularly refer my clients to this team for kitchen dismantling after renovations. They are precise, careful, and always on time. The quality of their work is consistently excellent.',
      contentAr: 'أحيل عملائي بانتظام إلى هذا الفريق لفك المطابخ بعد التجديدات. إنهم دقيقون وحذرون ودائماً في الوقت المحدد. جودة عملهم ممتازة باستمرار.',
      rating: 5, featured: true, status: 'PUBLISHED',
    },
    {
      clientName: 'Khalid Al-Mutairi', clientNameAr: 'خالد المطيري',
      clientLocation: 'Al Nakheel, Riyadh', clientLocationAr: 'النخيل، الرياض',
      clientTitle: 'Restaurant Owner',
      content: 'Needed our commercial kitchen dismantled quickly for relocation. The team arrived same day, worked efficiently, and had everything packed within a few hours. Great communication throughout!',
      contentAr: 'احتجنا إلى فك مطبخنا التجاري بسرعة. وصل الفريق في نفس اليوم وعمل بكفاءة وأتم كل شيء في غضون ساعات قليلة. تواصل رائع طوال الوقت!',
      rating: 5, featured: true, status: 'PUBLISHED',
    },
    {
      clientName: 'Nora Al-Qahtani', clientNameAr: 'نورة القحطاني',
      clientLocation: 'Al Rawdah, Riyadh', clientLocationAr: 'الروضة، الرياض',
      clientTitle: 'Homeowner',
      content: 'Hired them for complete kitchen installation in my new apartment. Meticulous work — every cabinet perfectly aligned and all drawers slide smoothly. Worth every riyal!',
      contentAr: 'استأجرتهم لتركيب مطبخي في شقتي الجديدة. عمل دقيق للغاية — كل خزانة محاذية تماماً وجميع الأدراج تنزلق بسلاسة. يستحق كل ريال!',
      rating: 5, featured: true, status: 'PUBLISHED',
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t as any })
  }
  console.log(`  ✓ Created ${testimonials.length} Testimonials`)

  // ─────────────────────────────────────────────
  // 6. FAQs
  // ─────────────────────────────────────────────
  console.log('\n❓ Seeding FAQs...')
  await prisma.fAQ.deleteMany({})

  const faqs = [
    {
      question: 'What areas in Riyadh do you cover?',
      questionAr: 'ما هي المناطق التي تغطونها في الرياض؟',
      answer: 'We cover all districts and neighborhoods across Riyadh, including Al Olaya, Al Malaz, Al Nakheel, Al Rawdah, Al Yasmeen, Hittin, Al Narjis, and all surrounding areas.',
      answerAr: 'نغطي جميع الأحياء في الرياض، بما في ذلك العليا والملز والنخيل والروضة والياسمين وحطين والنرجس وجميع المناطق المحيطة.',
      status: 'PUBLISHED',
    },
    {
      question: 'How long does kitchen maintenance typically take?',
      questionAr: 'كم من الوقت تستغرق صيانة المطبخ عادةً؟',
      answer: 'Minor repairs such as adjusting hinges or fixing a single door usually take 1–2 hours. Comprehensive maintenance of a full kitchen typically takes 4–6 hours.',
      answerAr: 'الإصلاحات البسيطة كضبط المفصلات تستغرق 1-2 ساعة. الصيانة الشاملة لمطبخ كامل تستغرق 4-6 ساعات عادةً.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you offer same-day service?',
      questionAr: 'هل تقدمون خدمة في نفس اليوم؟',
      answer: 'Yes! We offer same-day service for urgent cases, subject to technician availability. Contact us via WhatsApp for the fastest response.',
      answerAr: 'نعم! نقدم خدمة في نفس اليوم للحالات العاجلة. تواصل معنا عبر واتساب للحصول على أسرع رد.',
      status: 'PUBLISHED',
    },
    {
      question: 'Is there a warranty on your work?',
      questionAr: 'هل هناك ضمان على أعمالكم؟',
      answer: 'Yes, all our maintenance and installation work comes with a warranty. If any issue arises after completion, we will return to fix it at no extra charge.',
      answerAr: 'نعم، جميع أعمالنا تأتي مع ضمان. إذا نشأت أي مشكلة بعد الانتهاء، سنعود لإصلاحها دون رسوم إضافية.',
      status: 'PUBLISHED',
    },
    {
      question: 'Can you dismantle a kitchen and reinstall it in a new location?',
      questionAr: 'هل يمكنكم فك مطبخ وإعادة تركيبه في موقع جديد؟',
      answer: 'Absolutely! We carefully dismantle, label, and pack all kitchen components, then professionally reinstall them in the new location. Ideal for home relocations.',
      answerAr: 'بالتأكيد! نفك ونعلم ونغلف جميع مكونات المطبخ بعناية، ثم نعيد تركيبها في الموقع الجديد. مثالي لحالات الانتقال.',
      status: 'PUBLISHED',
    },
    {
      question: 'How do I get a price quote?',
      questionAr: 'كيف أحصل على عرض سعر؟',
      answer: 'The easiest way is via WhatsApp. Send us photos or a description of your kitchen and the work needed, and we\'ll provide a free quote within minutes.',
      answerAr: 'أسهل طريقة هي عبر واتساب. أرسل لنا صوراً أو وصفاً لمطبخك والعمل المطلوب، وسنقدم عرض سعر مجاني في غضون دقائق.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you work on commercial kitchens as well?',
      questionAr: 'هل تعملون على المطابخ التجارية أيضاً؟',
      answer: 'Yes, we service both residential and commercial aluminum kitchens, including restaurants, office pantries, and other commercial spaces.',
      answerAr: 'نعم، نخدم مطابخ الألمنيوم السكنية والتجارية، بما في ذلك المطاعم ومطابخ المكاتب والمساحات التجارية.',
      status: 'PUBLISHED',
    },
    {
      question: 'What types of aluminum kitchens do you service?',
      questionAr: 'ما أنواع مطابخ الألمنيوم التي تصلحونها؟',
      answer: 'We service all types of aluminum kitchen systems — modular kitchens, classic aluminum frame cabinets, pull-out drawer systems, and more. If it\'s aluminum, we handle it.',
      answerAr: 'نصلح جميع أنواع مطابخ الألمنيوم — المطابخ المعيارية وخزائن إطار الألمنيوم الكلاسيكية وأنظمة الأدراج وغيرها. إذا كان ألمنيوم، نتعامل معه.',
      status: 'PUBLISHED',
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq as any })
  }
  console.log(`  ✓ Created ${faqs.length} FAQs`)

  console.log('\n✅ All content seeded successfully!')
  console.log('\nSummary:')
  console.log('  📋 Site Settings: Updated')
  console.log(`  🔧 Services: ${services.length}`)
  console.log(`  ⭐ Trust Features: ${trustFeatures.length}`)
  console.log(`  📊 Stat Counters: ${stats.length}`)
  console.log(`  💬 Testimonials: ${testimonials.length}`)
  console.log(`  ❓ FAQs: ${faqs.length}`)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
