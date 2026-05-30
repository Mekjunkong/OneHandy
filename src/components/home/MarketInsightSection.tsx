import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const insightCards = [
  {
    title: 'Remote owner care',
    copy: 'Monthly home checks, photo reports, and repair coordination for owners who leave Chiang Mai for weeks or months.',
    highlight: 'from ฿2,500/mo',
  },
  {
    title: 'AC cleaning lead offer',
    copy: 'A simple fixed-price service for Chiang Mai heat, smoke season, and repeat maintenance every 3–6 months.',
    highlight: '฿800/unit',
  },
  {
    title: 'Airbnb maintenance',
    copy: 'Fast triage for AC, plumbing, electrical, garden, and guest-ready issues when reviews are on the line.',
    highlight: 'priority support available',
  },
];

const trustPoints = [
  'English booking, updates, and follow-up',
  'Local technicians coordinated for each request',
  'Clear quotes before work starts',
  'Before/after photos, receipts, and WhatsApp-friendly handoff',
  'Monthly property-care plans for remote owners',
];

const serviceTargets = [
  ['AC Cleaning Chiang Mai', 'fixed price, high repeat demand, smoke-season friendly'],
  ['English-speaking plumber/electrician', 'urgent problems with clear coordination'],
  ['Property Care Chiang Mai', 'recurring inspections for expats and remote owners'],
  ['Airbnb Maintenance', 'guest-ready repair support for short-stay hosts'],
];

export function MarketInsightSection() {
  return (
    <section className="px-6 py-24 bg-surface border-y border-border-line">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
            Chiang Mai market insight
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-5">
            Built around what expat owners actually need.
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Our Chiang Mai research shows the strongest demand is not just for another handyman.
            Expat homeowners, Airbnb hosts, landlords abroad, retirees, and remote owners need
            a trusted English-speaking coordination layer: clear pricing, coordinated local help,
            WhatsApp updates, receipts, and before/after photo proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {insightCards.map((card) => (
            <article key={card.title} className="rounded-lg border border-border-line bg-cream p-7">
              <h3 className="font-display text-2xl font-light italic text-ink mb-3">
                {card.title}
              </h3>
              <p className="text-sm leading-6 text-muted mb-5">{card.copy}</p>
              <p className="text-sm font-semibold text-gold">{card.highlight}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg bg-charcoal p-8 text-cream">
            <h3 className="font-display text-3xl font-light italic mb-5">
              Where OneHandy wins
            </h3>
            <ul className="space-y-3 text-sm leading-6 text-cream/75">
              {trustPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-gold" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border-line bg-cream p-8">
            <h3 className="font-display text-3xl font-light italic text-ink mb-5">
              Best services to start with
            </h3>
            <ul className="space-y-4 text-sm leading-6 text-muted">
              {serviceTargets.map(([label, copy]) => (
                <li key={label}>
                  <strong className="text-ink">{label}:</strong> {copy}.
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/services/property-care"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-ink px-7 text-sm font-semibold tracking-wide text-cream transition-colors duration-150 hover:bg-charcoal"
          >
            View Property Care <ArrowRight size={14} />
          </Link>
          <Link
            href="/services/ac-cleaning"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-border-line px-7 text-sm font-semibold tracking-wide text-ink transition-colors duration-150 hover:border-gold hover:text-gold"
          >
            Book AC Cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}
