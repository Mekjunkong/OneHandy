import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Home Services in Chiang Mai',
  description:
    'Browse all OneHandy services — AC cleaning, plumbing, electrical, gardening, emergency callout, and property care. Vetted technicians, English support.',
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream">
        <section className="py-20 px-6 border-b border-border-line">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              All Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-4">
              What can we help with?
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Fixed-price and custom-quote services for expat homeowners in Chiang Mai.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
