import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.team1160.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.team1160.com/aboutus',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.team1160.com/mentors',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
        url: "https://www.team1160.com/cabinet/engineering",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.team1160.com/cabinet/business",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.team1160.com/robots",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
    },
    {
        url: "https://www.team1160.com/donate",
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    }
  ]
}