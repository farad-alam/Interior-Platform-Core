export const siteConfig = {
  // Client branding (populated from DB at runtime, this is the fallback)
  name: 'Client Name',
  tagline: 'Your Interior Design Partner',
  locale: 'en',

  // Feature flags — enable/disable dashboard sections and website pages
  features: {
    gallery: true,
    testimonials: true,
    faq: true,
    categories: true,
  },

  // Analytics — IDs are loaded from env vars, set to null to disable
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? null,
  },

  // Contact — primary CTA is always WhatsApp (from DB settings)
  contact: {
    showPhoneButton: true,
    showEmailButton: false,
  },

  // Layout preferences
  layout: {
    headerStyle: 'sticky',     // 'sticky' | 'fixed' | 'static'
    footerStyle: 'detailed',   // 'minimal' | 'detailed'
  },
}
