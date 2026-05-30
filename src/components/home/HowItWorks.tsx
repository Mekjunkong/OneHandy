const steps = [
  {
    number: '01',
    title: 'Submit your request',
    desc: 'Browse services and submit your details online. Takes under two minutes. No account needed.',
  },
  {
    number: '02',
    title: 'We check availability',
    desc: 'OneHandy reviews your request and confirms technician availability for your service, area, and preferred timing.',
  },
  {
    number: '03',
    title: 'We follow up in English',
    desc: 'You receive confirmation, arrival timing, and pricing details before anything is agreed. No payment until you confirm.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
            The Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
            Three steps to your request
          </h2>
        </div>

        <div className="divide-y divide-border-line">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[4rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 py-10"
            >
              <div className="pt-0.5">
                <span className="font-display text-5xl md:text-6xl font-light italic text-gold leading-none select-none">
                  {step.number}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="font-sans text-lg font-semibold text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
