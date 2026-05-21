import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function PropertyCareCTA() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="bg-charcoal rounded-lg px-10 py-16 text-center md:text-left md:flex md:items-center md:justify-between gap-10">
          <div className="max-w-lg mb-8 md:mb-0">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              Going Away?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-white mb-4">
              We'll watch your home.
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Weekly inspections, photo reports, and priority repairs — all handled in English while you're away. Property care subscriptions from{' '}
              <span className="text-gold font-semibold">฿2,500/month</span>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:flex-col md:items-end shrink-0">
            <Link href="/services/property-care">
              <Button variant="gold" size="lg">
                Learn More →
              </Button>
            </Link>
            <Link href="/book?step=1&service=property-care">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
              >
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Technician apply strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 py-5 border border-border-line rounded-lg">
          <p className="text-sm text-muted">
            Are you a skilled technician in Chiang Mai?
          </p>
          <Link
            href="/join"
            className="text-sm font-semibold text-ink hover:text-gold transition-colors flex items-center gap-1"
          >
            Join our network →
          </Link>
        </div>
      </div>
    </section>
  );
}
