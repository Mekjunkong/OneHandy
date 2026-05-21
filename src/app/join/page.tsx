'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Banknote, Clock, Globe } from 'lucide-react';
import { services } from '@/lib/services';

const benefits = [
  { icon: Banknote, title: 'Guaranteed Payments', desc: 'Get paid on time, every time. No chasing clients.' },
  { icon: Globe, title: 'English-Speaking Clients', desc: 'We handle all communication in English for you.' },
  { icon: Clock, title: 'Flexible Schedule', desc: 'Accept jobs that fit your availability.' },
  { icon: CheckCircle, title: 'Grow Your Business', desc: "We handle marketing and bookings — you focus on the work." },
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', whatsapp: '', experience: '',
    tools: '', previousWork: '', backgroundCheck: false,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors';
  const labelClass = 'block text-xs font-semibold tracking-wide uppercase text-muted mb-2';

  if (submitted) {
    return (
      <>
        <SiteHeader />
        <main className="pt-16 min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="max-w-md text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold bg-gold/10 mb-6">
              <CheckCircle size={28} className="text-gold" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-3">Application submitted!</h1>
            <p className="text-muted text-sm leading-relaxed">
              Thanks for applying to join the OneHandy network. Our team will review your application and reach out via WhatsApp within 3–5 business days.
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Hero */}
        <section className="py-20 px-6 border-b border-border-line">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              Partner With Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5">
              Join the OneHandy Network
            </h1>
            <p className="text-muted text-lg max-w-xl">
              We connect skilled technicians in Chiang Mai with verified expat homeowners who pay on time and communicate in English.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-6 bg-surface border-b border-border-line">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm border border-border-line flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink mb-1">{b.title}</p>
                      <p className="text-sm text-muted">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-ink mb-8">Apply to Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+66 80 000 0000" />
                </div>
              </div>

              <div>
                <label className={labelClass}>WhatsApp Number *</label>
                <input type="tel" required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={inputClass} placeholder="+66 80 000 0000" />
              </div>

              <div>
                <label className={labelClass}>Years of Experience *</label>
                <input type="number" required min="0" max="50" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-24 h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink focus:outline-none focus:border-gold transition-colors" />
              </div>

              <div>
                <label className={labelClass}>Services You Offer *</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => toggleService(s.slug)}
                      className={`px-3 py-1.5 border rounded-full text-xs font-medium transition-all ${
                        selectedServices.includes(s.slug)
                          ? 'border-gold bg-gold/10 text-ink'
                          : 'border-border-line text-muted hover:border-muted'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Tools & Equipment You Own</label>
                <textarea rows={3} value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} className="w-full px-4 py-3 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="List your main tools and equipment…" />
              </div>

              <div>
                <label className={labelClass}>Previous Work Description</label>
                <textarea rows={4} value={form.previousWork} onChange={(e) => setForm({ ...form, previousWork: e.target.value })} className="w-full px-4 py-3 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Describe your previous work experience, types of properties served, any notable projects…" />
              </div>

              <div>
                <label className={labelClass}>Work Portfolio / ID <span className="normal-case font-normal">(optional)</span></label>
                <input type="file" accept="image/*,.pdf" className="w-full h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-muted file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-cream file:text-ink cursor-pointer" />
              </div>

              <div className="flex items-start gap-3 p-4 bg-surface border border-border-line rounded-lg">
                <input
                  type="checkbox"
                  id="background"
                  required
                  checked={form.backgroundCheck}
                  onChange={(e) => setForm({ ...form, backgroundCheck: e.target.checked })}
                  className="mt-0.5 accent-gold"
                />
                <label htmlFor="background" className="text-sm text-ink leading-relaxed cursor-pointer">
                  I agree to undergo a background check as part of the OneHandy vetting process. I confirm the information provided is accurate.
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
