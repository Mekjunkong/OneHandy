import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'OneHandy — Home Services for Expats in Chiang Mai',
    template: '%s | OneHandy',
  },
  description:
    'English-speaking home repair and property care in Chiang Mai for expats, remote owners, Airbnb hosts, and landlords — AC cleaning, plumbing, electrical, emergency repairs, WhatsApp updates, and photo proof.',
  keywords: [
    'AC Cleaning Chiang Mai',
    'English Speaking Plumber Chiang Mai',
    'Electrician Chiang Mai',
    'Property Care Chiang Mai',
    'Home Services for Expats in Chiang Mai',
    'Airbnb Maintenance Chiang Mai',
    'Emergency Home Repair Chiang Mai',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://onehandy.com'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OneHandy — Home Services for Expats in Chiang Mai',
    description:
      'English-speaking home repair and property care in Chiang Mai for expats, remote owners, Airbnb hosts, and landlords.',
    url: '/',
    siteName: 'OneHandy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneHandy — Home Services for Expats in Chiang Mai',
    description:
      'English-speaking home repair and property care in Chiang Mai with WhatsApp updates and photo proof.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-cream text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
