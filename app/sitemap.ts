import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.titaniumrobotics.org',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.titaniumrobotics.org/aboutus',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.titaniumrobotics.org/mentors',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
        url: "https://www.titaniumrobotics.org/cabinet/engineering",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.titaniumrobotics.org/cabinet/business",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.titaniumrobotics.org/robots",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.titaniumrobotics.org/donate",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    }
  ]
}