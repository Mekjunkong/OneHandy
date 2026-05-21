import { Grid2x2, ShieldCheck, CreditCard } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Grid2x2,
    title: 'Choose your service',
    desc: 'Browse our fixed-price menu or request a custom quote. Book online in under 2 minutes.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'We dispatch a vetted technician',
    desc: 'Background-checked, fully equipped, and briefed on your job before they arrive.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Pay securely, get photo updates',
    desc: 'All communication and payment handled in English. Before & after photos sent via WhatsApp.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
            The Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
            Three steps to done
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-border-line to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 bg-cream mb-6">
                  <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-ink text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-ink mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
