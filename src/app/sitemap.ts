import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use NEXT_PUBLIC_APP_URL if defined, otherwise fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://www.yourdomain.com'

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
    // As you add more pages (like /services, /about, /blog), you can list them here dynamically
  ]
}
