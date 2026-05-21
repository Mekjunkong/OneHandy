import type { Metadata } from 'next';
import { Service } from './services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onehandy.com';

export function serviceMetadata(service: Service): Metadata {
  return {
    title: `${service.name} Chiang Mai | OneHandy — Vetted Technicians`,
    description: `Book a vetted ${service.name.toLowerCase()} technician in Chiang Mai. English support, secure payment, photo updates. ${service.price} — ${service.duration}.`,
    keywords: [
      `${service.name.toLowerCase()} Chiang Mai`,
      `${service.name.toLowerCase()} expat Thailand`,
      'home services Chiang Mai',
      'vetted technicians Chiang Mai',
      'English home services Thailand',
    ],
    openGraph: {
      title: `${service.name} in Chiang Mai | OneHandy`,
      description: `Professional ${service.name.toLowerCase()} service with English support. ${service.price}.`,
      url: `${siteUrl}/services/${service.slug}`,
    },
  };
}

export function serviceStructuredData(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'OneHandy',
      areaServed: 'Chiang Mai',
    },
    areaServed: 'Chiang Mai',
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'THB',
    },
  };
}
