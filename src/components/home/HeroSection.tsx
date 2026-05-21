'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { services } from '@/lib/services';

const categories = [
  { label: 'AC Cleaning', slug: 'ac-cleaning' },
  { label: 'Plumbing', slug: 'plumbing' },
  { label: 'Electrical', slug: 'electrical' },
  { label: 'Gardening', slug: 'gardening' },
  { label: 'Emergency', slug: 'emergency' },
];

export function HeroSection() {
  const [selected, setSelected] = useState('');
  const router = useRouter();

  const handleBook = () => {
    if (selected) {
      router.push(`/book?step=1&service=${selected}`);
    } else {
      router.push('/book?step=1');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-24 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1C1C1C 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Gold accent — top right */}
      <div className="absolute top-32 right-0 w-48 h-px bg-gradient-to-l from-gold/40 to-transparent" />
      <div className="absolute top-32 left-0 w-48 h-px bg-gradient-to-r from-gold/40 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-6 h-px bg-gold" />
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            Chiang Mai · Est. 2026
          </span>
          <span className="w-6 h-px bg-gold" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-light italic text-ink leading-[1.05] mb-6">
          Your home,<br />handled.
        </h1>

        {/* Gold divider */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-8 h-px bg-gold" />
        </div>

        {/* Subtitle */}
        <p className="text-muted text-lg font-normal tracking-wide mb-12">
          Vetted technicians · English support · Secure payment
        </p>

        {/* Inline booking widget */}
        <div className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto mb-10 shadow-sm">
          <div className="relative flex-1">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full h-14 pl-4 pr-10 bg-surface border border-border-line sm:border-r-0 text-sm text-ink appearance-none focus:outline-none focus:border-gold transition-colors"
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} — {s.price}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>
          <button
            onClick={handleBook}
            className="h-14 px-8 bg-ink text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors duration-150 whitespace-nowrap"
          >
            Book →
          </button>
        </div>

        {/* Category pill strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/book?step=1&service=${cat.slug}`)}
              className="px-4 py-1.5 border border-border-line rounded-full text-xs font-medium text-muted hover:border-gold hover:text-gold transition-colors duration-150"
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => router.push('/services')}
            className="px-4 py-1.5 border border-border-line rounded-full text-xs font-medium text-muted hover:border-gold hover:text-gold transition-colors duration-150"
          >
            + More
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-border-line">
          {[
            '200+ Jobs Completed',
            'Verified Technicians',
            'English-Speaking Support',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-gold font-semibold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
