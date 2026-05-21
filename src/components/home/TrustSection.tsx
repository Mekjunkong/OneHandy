import { ShieldCheck, Globe, CreditCard } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Verified Technicians',
    desc: 'Every technician is background-checked, reference-verified, and assessed on-site before joining our network.',
  },
  {
    icon: Globe,
    title: 'English Support',
    desc: 'Our coordination team communicates with you in English at every step — booking, updates, and follow-up.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    desc: 'Pay online via card with full protection. No cash handling. Receipts and photo proof for every job.',
  },
];

const testimonials = [
  {
    quote:
      "I was nervous about finding a reliable plumber as a foreigner. OneHandy sent someone within 24 hours, kept me updated in English, and the job was done perfectly.",
    name: 'Sarah M.',
    location: 'Nimman, Chiang Mai',
  },
  {
    quote:
      'The AC cleaning was thorough and priced exactly as quoted. The WhatsApp photos before and after were a great touch. Will definitely use again.',
    name: 'David C.',
    location: 'Hang Dong',
  },
];

export function TrustSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
            Why OneHandy
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
            Built for expats, by design
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            We handle the language barrier, the vetting, and the logistics — so you get the result without the stress.
          </p>
        </div>

        {/* Trust columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-sans text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Stat */}
        <div className="text-center mb-16">
          <p className="font-display text-5xl font-light italic text-gold mb-2">200+</p>
          <p className="text-sm text-muted tracking-wide uppercase font-medium">
            Jobs completed in Chiang Mai
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border-line rounded-lg p-8 border-l-2 border-l-gold"
            >
              <p className="text-base text-ink leading-relaxed italic mb-5">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
