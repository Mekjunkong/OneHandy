import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/services';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for all OneHandy home services in Chiang Mai. Fixed prices on most services — no hidden costs.',
};

export default function PricingPage() {
  const fixed = services.filter((s) => s.type === 'FIXED');
  const quoted = services.filter((s) => s.type === 'QUOTE');

  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream">
        <section className="py-20 px-6 border-b border-border-line">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              Pricing
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5">
              Transparent pricing,<br />no surprises
            </h1>
            <p className="text-muted text-lg max-w-lg mx-auto">
              Most services start from clear guide prices. Final availability, timing, and any custom quotes are confirmed before work begins.
            </p>
          </div>
        </section>

        {/* Fixed price services */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-display text-2xl font-semibold text-ink">Fixed Price Services</h2>
              <Badge type="FIXED" />
            </div>
            <div className="bg-surface border border-border-line rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 px-6 py-3 border-b border-border-line bg-cream text-xs font-semibold tracking-wide uppercase text-muted">
                <span className="col-span-2">Service</span>
                <span>Price</span>
                <span>Duration</span>
              </div>
              {fixed.map((s, i) => (
                <div
                  key={s.slug}
                  className={`grid grid-cols-4 px-6 py-4 items-center ${i < fixed.length - 1 ? 'border-b border-border-line' : ''}`}
                >
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-ink">{s.name}</p>
                    <p className="text-xs text-muted">{s.shortDesc}</p>
                  </div>
                  <p className="text-sm font-semibold text-ink">{s.price}</p>
                  <p className="text-sm text-muted">{s.duration}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3">
              * Fixed prices cover labour. Parts or materials are quoted separately and require your approval before purchase.
            </p>
          </div>
        </section>

        {/* Custom quote services */}
        <section className="py-8 px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-display text-2xl font-semibold text-ink">Custom Quote Services</h2>
              <Badge type="QUOTE" />
            </div>
            <div className="space-y-4">
              {quoted.map((s) => (
                <div key={s.slug} className="bg-surface border border-border-line rounded-lg p-6 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-ink mb-1">{s.name}</p>
                    <p className="text-xs text-muted">{s.shortDesc}</p>
                    <p className="text-xs text-muted mt-1">Starting from {s.price}</p>
                  </div>
                  <Link href={`/book?step=1&service=${s.slug}`} className="shrink-0">
                    <Button variant="outline" size="sm">Get Quote</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included in all services */}
        <section className="py-16 px-6 bg-surface border-t border-border-line">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-ink mb-8 text-center">
              Included with every request
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'English-language request coordination',
                'Follow-up to confirm availability and timing',
                'Pilot technician network in progress',
                'Clear pricing before work proceeds',
                'No hidden fees or surprise charges',
                'Payment details confirmed after availability',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-gold shrink-0" />
                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center border-t border-border-line">
          <h2 className="font-display text-2xl font-light italic text-ink mb-4">
            Ready to request service?
          </h2>
          <p className="text-muted mb-8 text-sm">No account needed. Submit a request in under 2 minutes.</p>
          <Link href="/book">
            <Button variant="primary" size="lg">Request Service →</Button>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
