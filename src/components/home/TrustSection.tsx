import { ShieldCheck, Globe, CreditCard } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Pilot Network in Progress',
    desc: 'We are building a practical Chiang Mai technician network with careful onboarding and clear service expectations before every request is accepted.',
  },
  {
    icon: Globe,
    title: 'English Coordination',
    desc: 'Requests, updates, and follow-up are handled in clear English so expat homeowners know what happens next.',
  },
  {
    icon: CreditCard,
    title: 'Pay After Confirmation',
    desc: 'No online payment is taken during the Phase 1 request flow. Pricing and payment steps are confirmed after availability is reviewed.',
  },
];

const pilotProof = [
  {
    title: 'Launching in Chiang Mai',
    desc: 'Focused first on core home services for expat homeowners and long-stay residents.',
  },
  {
    title: 'Clear request updates',
    desc: 'Submit the details once and receive follow-up on technician availability, timing, and next steps.',
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
            We handle the language barrier and request coordination — so your home service starts with clarity, not guesswork.
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

        {/* Launch-safe proof */}
        <div className="text-center mb-16">
          <p className="font-display text-5xl font-light italic text-gold mb-2">Pilot</p>
          <p className="text-sm text-muted tracking-wide uppercase font-medium">
            Service for Chiang Mai expat homeowners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pilotProof.map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-border-line rounded-lg p-8"
            >
              <p className="text-sm font-semibold text-ink mb-3">{item.title}</p>
              <p className="text-base text-ink leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
