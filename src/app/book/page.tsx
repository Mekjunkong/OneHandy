import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { BookingWizard } from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Request Service',
  description: 'Request home service support in Chiang Mai. Choose service, share details, select a preferred time, and submit for availability follow-up.',
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream">
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
                Service Request
              </span>
              <h1 className="font-display text-3xl font-semibold text-ink">
                Request service
              </h1>
            </div>
            <Suspense fallback={<div className="max-w-2xl mx-auto py-20 text-center text-muted text-sm">Loading…</div>}>
              <BookingWizard />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
