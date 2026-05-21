import { MetadataRoute } from 'next';
import { services } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onehandy.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0 },
    { url: `${siteUrl}/services`, priority: 0.9 },
    { url: `${siteUrl}/how-it-works`, priority: 0.8 },
    { url: `${siteUrl}/pricing`, priority: 0.8 },
    { url: `${siteUrl}/book`, priority: 0.9 },
    { url: `${siteUrl}/join`, priority: 0.6 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const servicePages = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages];
}
