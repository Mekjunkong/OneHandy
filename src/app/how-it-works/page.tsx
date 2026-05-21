import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/Button';
import {
  MousePointerClick, ShieldCheck, CreditCard,
  Clock, Phone, Camera,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Three simple steps to book a vetted technician in Chiang Mai. Choose your service, we dispatch, you pay securely and get photo updates.',
};

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Choose your service',
    desc: 'Browse our fixed-price menu or request a custom quote. Book online in under 2 minutes — no phone calls needed.',
    details: [
      'Select from 7 services including AC cleaning, plumbing, electrical, and more',
      'See live pricing immediately',
      'Choose your preferred date and time window',
    ],
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'We dispatch a vetted technician',
    desc: "We match your job to the right specialist — background-checked, equipped, and briefed before they arrive.",
    details: [
      'All technicians are verified and reference-checked',
      "You'll receive a WhatsApp confirmation within 2 hours",
      'Technician arrives with all necessary tools and equipment',
    ],
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Pay securely, get photo updates',
    desc: 'All communication and payment handled in English. Before & after photos sent via WhatsApp.',
    details: [
      'Secure online payment — no cash needed',
      'Before and after photos of the completed work',
      'English-language job report included',
    ],
  },
];

const guarantees = [
  { icon: Clock, title: '2-Hour Confirmation', desc: 'WhatsApp confirmation within 2 hours of booking' },
  { icon: ShieldCheck, title: 'Vetted Technicians', desc: 'Every technician is background-checked and assessed' },
  { icon: Phone, title: 'English Support', desc: 'All communication handled in English throughout' },
  { icon: Camera, title: 'Photo Evidence', desc: 'Before & after photos sent for every job' },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Hero */}
        <section className="py-20 px-6 border-b border-border-line">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              The Process
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5">
              Three steps to done
            </h1>
            <p className="text-muted text-lg max-w-lg mx-auto">
              We've removed every friction point so you get a great result without the stress.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-8">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-gold/30 bg-surface flex items-center justify-center relative">
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold text-ink">
                        {i + 1}
                      </span>
                      <Icon size={22} className="text-gold" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 mt-4 bg-gradient-to-b from-border-line to-transparent min-h-12" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs font-mono text-muted mb-2">{step.number}</p>
                    <h2 className="font-display text-2xl font-semibold text-ink mb-3">{step.title}</h2>
                    <p className="text-muted leading-relaxed mb-5">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-muted">
                          <span className="w-1 h-1 rounded-full bg-gold inline-block shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 px-6 bg-surface border-t border-border-line">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-ink mb-10 text-center">
              Our guarantees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {guarantees.map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm border border-border-line flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink mb-1">{g.title}</p>
                      <p className="text-sm text-muted">{g.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center border-t border-border-line">
          <h2 className="font-display text-2xl font-light italic text-ink mb-4">
            Ready to try it?
          </h2>
          <p className="text-muted mb-8">Book your first service in under 2 minutes.</p>
          <Link href="/book">
            <Button variant="primary" size="lg">Book a Service →</Button>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
