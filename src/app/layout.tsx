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
    default: 'OneHandy — Home Services in Chiang Mai',
    template: '%s | OneHandy',
  },
  description:
    'English-speaking home service coordination and a pilot technician network for expat homeowners in Chiang Mai.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://onehandy.com'
  ),
  openGraph: {
    siteName: 'OneHandy',
    locale: 'en_US',
    type: 'website',
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
