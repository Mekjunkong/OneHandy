import Link from 'next/link';

const btnGoldLg =
  'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer px-8 py-4 text-sm rounded-sm bg-gold text-ink hover:brightness-95';

const btnOutlineLg =
  'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer px-8 py-4 text-sm rounded-sm border border-cream/30 text-cream hover:bg-cream/10 hover:border-cream/50';

export function PropertyCareCTA() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="bg-charcoal rounded-lg px-10 py-16 text-center md:text-left md:flex md:items-center md:justify-between gap-10">
          <div className="max-w-lg mb-8 md:mb-0">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              Going Away?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-cream mb-4">
              We&apos;ll watch your home.
            </h2>
            <p className="text-cream/70 text-base leading-relaxed">
              Coordinate home checks and service requests in English while you travel. Ask us about property coordination and we&apos;ll follow up with what&apos;s available for your area and schedule.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-end shrink-0">
            <Link href="/services/property-care" className={btnGoldLg}>
              Learn More →
            </Link>
            <Link href="/book?step=1&service=property-care" className={btnOutlineLg}>
              Enquire
            </Link>
          </div>
        </div>

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
