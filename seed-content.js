/**
 * Seed Script: Aluminum Kitchen Maintenance - Riyadh
 * Populates all site content: Settings, Services, TrustFeatures,
 * StatCounters, FAQs, and Testimonials.
 * 
 * Run with: node seed-content.js
 */

const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting seed...')

  // ─────────────────────────────────────────────
  // 1. SITE SETTINGS
  // ─────────────────────────────────────────────
  console.log('📋 Seeding Site Settings...')
  const existingSettings = await prisma.siteSettings.findFirst()
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: {
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
    })
    console.log('  ✓ Updated Site Settings')
  } else {
    await prisma.siteSettings.create({
      data: {
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
        serviceAreas: 'All Riyadh Neighborhoods',
        serviceAreasAr: 'جميع أحياء الرياض',
        footerTagline: 'Your trusted partner for aluminum kitchen solutions in Riyadh.',
        footerTaglineAr: 'شريكك الموثوق لحلول مطابخ الألمنيوم في الرياض.',
      }
    })
    console.log('  ✓ Created Site Settings')
  }

  // ─────────────────────────────────────────────
  // 2. SERVICES
  // ─────────────────────────────────────────────
  console.log('🔧 Seeding Services...')
  await prisma.service.deleteMany({})

  const services = [
    {
      title: 'Aluminum Kitchen Maintenance',
      titleAr: 'صيانة مطابخ الألمنيوم',
      slug: 'aluminum-kitchen-maintenance',
      description: 'We provide comprehensive maintenance services for all types of aluminum kitchens. Whether it\'s a damaged door, a broken hinge, a worn-out rail, or a misaligned cabinet — our skilled technicians restore your kitchen to perfect working condition quickly and efficiently.',
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
      description: 'Professional and careful dismantling of aluminum kitchens with zero damage to your walls or tiles. We dismantle and pack your entire kitchen ready for relocation, renovation, or replacement. All parts are carefully handled and organized.',
      descriptionAr: 'فك احترافي وحذر لمطابخ الألمنيوم دون أي ضرر لجدرانك أو البلاط. نفك ونحزم مطبخك بالكامل استعداداً للانتقال أو التجديد أو الاستبدال. يتم التعامل مع جميع الأجزاء بعناية وتنظيمها.',
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
      description: 'Expert installation of new or relocated aluminum kitchens with precision and attention to detail. We ensure everything is perfectly aligned, securely fixed, and fully functional from day one. From measuring and planning to the final finishing touch.',
      descriptionAr: 'تركيب احترافي للمطابخ الألمنيوم الجديدة أو المنقولة بدقة واهتمام بالتفاصيل. نضمن أن كل شيء محاذٍ تماماً ومثبت بأمان ويعمل بشكل كامل منذ اليوم الأول. من القياس والتخطيط إلى اللمسة النهائية.',
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
        'قياس دقيق وتخطيط المخطط',
        'تجميع كامل للوحدات وتثبيتها بالجدار',
        'قطع وتركيب الأسطح',
        'تركيب الأحواض والصنابير',
        'دعم تكامل الأجهزة',
        'فحص نهائي وفحص جودة',
      ],
      whatsappMessage: 'Hello, I need a kitchen installation service in Riyadh.',
      whatsappMessageAr: 'مرحباً، أحتاج إلى خدمة تركيب مطبخ في الرياض.',
      status: 'PUBLISHED',
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log(`  ✓ Created ${services.length} Services`)

  // ─────────────────────────────────────────────
  // 3. TRUST FEATURES
  // ─────────────────────────────────────────────
  console.log('⭐ Seeding Trust Features...')
  await prisma.trustFeature.deleteMany({})

  const trustFeatures = [
    {
      title: 'Licensed & Experienced',
      titleAr: 'مرخصون وذوو خبرة',
      description: 'Over 10 years of experience in aluminum kitchen maintenance, dismantling and installation across Riyadh.',
      descriptionAr: 'أكثر من 10 سنوات من الخبرة في صيانة وفك وتركيب مطابخ الألمنيوم في جميع أنحاء الرياض.',
      icon: 'BadgeCheck',
      order: 1,
    },
    {
      title: 'Fast Response',
      titleAr: 'استجابة سريعة',
      description: 'Same-day and next-day service available. We understand you can\'t wait when your kitchen needs urgent attention.',
      descriptionAr: 'خدمة في نفس اليوم واليوم التالي متاحة. نتفهم أنك لا تستطيع الانتظار عندما يحتاج مطبخك إلى اهتمام عاجل.',
      icon: 'Zap',
      order: 2,
    },
    {
      title: 'Quality Guaranteed',
      titleAr: 'الجودة مضمونة',
      description: 'All our work comes with a satisfaction guarantee. We use only high-quality materials and proven techniques.',
      descriptionAr: 'جميع أعمالنا مصحوبة بضمان الرضا. نستخدم فقط مواد عالية الجودة وتقنيات مجربة.',
      icon: 'ShieldCheck',
      order: 3,
    },
    {
      title: 'Serving All Riyadh',
      titleAr: 'نخدم جميع أحياء الرياض',
      description: 'We cover all districts and neighborhoods across Riyadh. Wherever you are in the city, we come to you.',
      descriptionAr: 'نغطي جميع الأحياء والمناطق في الرياض. أينما كنت في المدينة، نأتي إليك.',
      icon: 'MapPin',
      order: 4,
    },
    {
      title: 'Transparent Pricing',
      titleAr: 'أسعار شفافة',
      description: 'No hidden fees. We provide clear and honest pricing before starting any work so you always know what to expect.',
      descriptionAr: 'لا رسوم خفية. نقدم أسعاراً واضحة وصادقة قبل البدء بأي عمل حتى تعرف دائماً ما تتوقعه.',
      icon: 'CircleDollarSign',
      order: 5,
    },
    {
      title: 'Clean & Professional',
      titleAr: 'نظيف واحترافي',
      description: 'Our team arrives on time, works neatly and leaves your home exactly as clean as they found it.',
      descriptionAr: 'يصل فريقنا في الوقت المحدد ويعمل بنظافة ويترك منزلك نظيفاً تماماً كما وجده.',
      icon: 'Sparkles',
      order: 6,
    },
  ]

  for (const tf of trustFeatures) {
    await prisma.trustFeature.create({ data: tf })
  }
  console.log(`  ✓ Created ${trustFeatures.length} Trust Features`)

  // ─────────────────────────────────────────────
  // 4. STAT COUNTERS
  // ─────────────────────────────────────────────
  console.log('📊 Seeding Stat Counters...')
  await prisma.statCounter.deleteMany({})

  const stats = [
    { label: 'Years of Experience', labelAr: 'سنوات الخبرة', value: '10+', valueAr: '+10', icon: 'Calendar', order: 1 },
    { label: 'Kitchens Serviced', labelAr: 'مطبخاً تمت خدمته', value: '1,500+', valueAr: '+1,500', icon: 'ChefHat', order: 2 },
    { label: 'Happy Clients', labelAr: 'عميل راضٍ', value: '1,200+', valueAr: '+1,200', icon: 'Users', order: 3 },
    { label: 'Riyadh Districts Covered', labelAr: 'حياً مغطىً في الرياض', value: '30+', valueAr: '+30', icon: 'MapPin', order: 4 },
  ]

  for (const stat of stats) {
    await prisma.statCounter.create({ data: stat })
  }
  console.log(`  ✓ Created ${stats.length} Stat Counters`)

  // ─────────────────────────────────────────────
  // 5. TESTIMONIALS
  // ─────────────────────────────────────────────
  console.log('💬 Seeding Testimonials...')
  await prisma.testimonial.deleteMany({})

  const testimonials = [
    {
      clientName: 'Ahmed Al-Rashidi',
      clientNameAr: 'أحمد الراشدي',
      clientLocation: 'Al Olaya, Riyadh',
      clientLocationAr: 'العليا، الرياض',
      clientTitle: 'Homeowner',
      content: 'Excellent service! They fixed all the cabinet doors and replaced the damaged hinges in my kitchen within just two hours. The technician was very professional and left everything spotless. Highly recommended!',
      contentAr: 'خدمة ممتازة! أصلحوا جميع أبواب الخزائن واستبدلوا المفصلات التالفة في مطبخي في غضون ساعتين فقط. كان الفني محترفاً جداً وترك كل شيء نظيفاً. أنصح بهم بشدة!',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Fatima Al-Zahrani',
      clientNameAr: 'فاطمة الزهراني',
      clientLocation: 'Al Malaz, Riyadh',
      clientLocationAr: 'الملز، الرياض',
      clientTitle: 'Interior Designer',
      content: 'I regularly refer my clients to this team for kitchen dismantling and reinstallation after renovations. They are precise, careful, and always on time. The quality of their work is consistently excellent.',
      contentAr: 'أحيل عملائي بانتظام إلى هذا الفريق لفك وإعادة تركيب المطابخ بعد التجديدات. إنهم دقيقون وحذرون ودائماً في الوقت المحدد. جودة عملهم ممتازة باستمرار.',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Khalid Al-Mutairi',
      clientNameAr: 'خالد المطيري',
      clientLocation: 'Al Nakheel, Riyadh',
      clientLocationAr: 'النخيل، الرياض',
      clientTitle: 'Restaurant Owner',
      content: 'We needed our commercial kitchen dismantled quickly for relocation. The team arrived the same day, worked efficiently, and had everything packed and ready within a few hours. Great communication throughout!',
      contentAr: 'احتجنا إلى فك مطبخنا التجاري بسرعة للانتقال. وصل الفريق في نفس اليوم وعمل بكفاءة وأتم كل شيء وهيأه للشحن في غضون ساعات قليلة. تواصل رائع طوال الوقت!',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
    {
      clientName: 'Nora Al-Qahtani',
      clientNameAr: 'نورة القحطاني',
      clientLocation: 'Al Rawdah, Riyadh',
      clientLocationAr: 'الروضة، الرياض',
      clientTitle: 'Homeowner',
      content: 'Hired them for complete kitchen installation in my new apartment. The team was meticulous — every cabinet was perfectly aligned and all the drawers slide smoothly. Worth every riyal!',
      contentAr: 'استأجرتهم لتركيب المطبخ بالكامل في شقتي الجديدة. كان الفريق دقيقاً للغاية — كل خزانة محاذية تماماً وجميع الأدراج تنزلق بسلاسة. يستحق كل ريال!',
      rating: 5,
      featured: true,
      status: 'PUBLISHED',
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`  ✓ Created ${testimonials.length} Testimonials`)

  // ─────────────────────────────────────────────
  // 6. FAQs
  // ─────────────────────────────────────────────
  console.log('❓ Seeding FAQs...')
  await prisma.fAQ.deleteMany({})

  const faqs = [
    {
      question: 'What areas in Riyadh do you cover?',
      questionAr: 'ما هي المناطق التي تغطونها في الرياض؟',
      answer: 'We cover all districts and neighborhoods across Riyadh, including Al Olaya, Al Malaz, Al Nakheel, Al Rawdah, Al Yasmeen, Hittin, Al Narjis, and all surrounding areas. If you\'re in Riyadh, we come to you.',
      answerAr: 'نغطي جميع الأحياء والمناطق في الرياض، بما في ذلك العليا والملز والنخيل والروضة والياسمين وحطين والنرجس وجميع المناطق المحيطة. إذا كنت في الرياض، نأتي إليك.',
      status: 'PUBLISHED',
    },
    {
      question: 'How long does kitchen maintenance typically take?',
      questionAr: 'كم من الوقت تستغرق صيانة المطبخ عادةً؟',
      answer: 'It depends on the scope of work. Minor repairs such as adjusting hinges or fixing a single door usually take 1–2 hours. Comprehensive maintenance of a full kitchen typically takes a half day (4–6 hours).',
      answerAr: 'يعتمد ذلك على نطاق العمل. الإصلاحات البسيطة كضبط المفصلات أو إصلاح باب واحد تستغرق عادةً 1-2 ساعة. الصيانة الشاملة لمطبخ كامل تستغرق عادةً نصف يوم (4-6 ساعات).',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you offer same-day service?',
      questionAr: 'هل تقدمون خدمة في نفس اليوم؟',
      answer: 'Yes! We offer same-day service for urgent cases, subject to technician availability. We also offer scheduled appointments at a time convenient for you. Contact us via WhatsApp for the fastest response.',
      answerAr: 'نعم! نقدم خدمة في نفس اليوم للحالات العاجلة، وذلك حسب توفر الفنيين. كما نقدم مواعيد مجدولة في الوقت المناسب لك. تواصل معنا عبر واتساب للحصول على أسرع رد.',
      status: 'PUBLISHED',
    },
    {
      question: 'Is there a warranty on your maintenance work?',
      questionAr: 'هل هناك ضمان على أعمال الصيانة الخاصة بكم؟',
      answer: 'Yes, all our maintenance and installation work comes with a warranty period. If any issue related to our work arises after completion, we will return to fix it at no extra charge. We stand by our quality.',
      answerAr: 'نعم، جميع أعمال الصيانة والتركيب لدينا تأتي مع فترة ضمان. إذا نشأت أي مشكلة تتعلق بعملنا بعد الانتهاء، سنعود لإصلاحها دون أي رسوم إضافية. نحن نثق في جودة عملنا.',
      status: 'PUBLISHED',
    },
    {
      question: 'Can you dismantle a kitchen and reinstall it in a new location?',
      questionAr: 'هل يمكنكم فك مطبخ وإعادة تركيبه في موقع جديد؟',
      answer: 'Absolutely! This is one of our core services. We carefully dismantle, label, and pack all kitchen components, then professionally reinstall them in the new location. This is ideal for home relocations or apartment moves.',
      answerAr: 'بالتأكيد! هذه إحدى خدماتنا الأساسية. نقوم بفك ووضع علامات وتغليف جميع مكونات المطبخ بعناية، ثم نعيد تركيبها باحترافية في الموقع الجديد. هذا مثالي لحالات الانتقال أو نقل الشقق.',
      status: 'PUBLISHED',
    },
    {
      question: 'How do I get a price quote?',
      questionAr: 'كيف أحصل على عرض سعر؟',
      answer: 'The easiest way is to contact us via WhatsApp. Send us photos or a description of your kitchen and the work needed, and we will provide a free, no-obligation quote within minutes.',
      answerAr: 'أسهل طريقة هي التواصل معنا عبر واتساب. أرسل لنا صوراً أو وصفاً لمطبخك والعمل المطلوب، وسنقدم لك عرض سعر مجاني وغير ملزم في غضون دقائق.',
      status: 'PUBLISHED',
    },
    {
      question: 'Do you work on commercial kitchens as well?',
      questionAr: 'هل تعملون على المطابخ التجارية أيضاً؟',
      answer: 'Yes, we work on both residential and commercial aluminum kitchens, including restaurant kitchens, office pantries, and other commercial spaces. We have the tools and experience to handle projects of all sizes.',
      answerAr: 'نعم، نعمل على مطابخ الألمنيوم السكنية والتجارية، بما في ذلك مطابخ المطاعم ومطابخ المكاتب والمساحات التجارية الأخرى. لدينا الأدوات والخبرة للتعامل مع المشاريع بجميع أحجامها.',
      status: 'PUBLISHED',
    },
    {
      question: 'What type of aluminum kitchens do you service?',
      questionAr: 'ما أنواع مطابخ الألمنيوم التي تصلحونها؟',
      answer: 'We service all types and brands of aluminum kitchen systems, including modular aluminum kitchens, classic aluminum frame cabinets, pull-out drawer systems, and more. If it\'s aluminum, we can handle it.',
      answerAr: 'نصلح جميع أنواع وماركات أنظمة مطابخ الألمنيوم، بما في ذلك المطابخ الألمنيومية المعيارية، وخزائن إطار الألمنيوم الكلاسيكية، وأنظمة الأدراج السحابة، وغيرها. إذا كان ألمنيوم، يمكننا التعامل معه.',
      status: 'PUBLISHED',
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq })
  }
  console.log(`  ✓ Created ${faqs.length} FAQs`)

  console.log('\n✅ All content seeded successfully!')
  console.log('\nSummary:')
  console.log('  - Site Settings: Updated')
  console.log(`  - Services: ${services.length}`)
  console.log(`  - Trust Features: ${trustFeatures.length}`)
  console.log(`  - Stat Counters: ${stats.length}`)
  console.log(`  - Testimonials: ${testimonials.length}`)
  console.log(`  - FAQs: ${faqs.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
