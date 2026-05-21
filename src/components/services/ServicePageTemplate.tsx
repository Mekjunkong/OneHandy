import Link from 'next/link';
import {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck,
  CheckCircle, ArrowRight, ChevronDown,
} from 'lucide-react';
import { Service, services } from '@/lib/services';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck,
};

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const Icon = iconMap[service.icon] || Home;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 2);

  return (
    <main className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-20 px-6 border-b border-border-line">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors mb-8"
          >
            ← All Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-surface border border-border-line flex items-center justify-center">
              <Icon size={20} className="text-gold" />
            </div>
            <Badge type={service.type} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-4">
            {service.name}
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-xl">{service.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-semibold text-ink">{service.price}</p>
                <p className="text-xs text-muted">{service.duration}</p>
              </div>
            </div>
          </div>
          <Link href={`/book?step=1&service=${service.slug}`}>
            <Button variant="primary" size="lg">
              Book This Service →
            </Button>
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink mb-8">What's Included</h2>
          <ul className="space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-base text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Breakdown */}
      <section className="py-16 px-6 border-t border-border-line">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink mb-8">Pricing</h2>
          <div className="bg-surface border border-border-line rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line">
              <span className="text-sm text-muted">Service</span>
              <span className="text-sm text-muted">Price</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line">
              <span className="text-sm text-ink">{service.name}</span>
              <span className="text-sm font-semibold text-ink">{service.price}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line">
              <span className="text-sm text-muted">Labour</span>
              <span className="text-sm text-muted">Included</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-line">
              <span className="text-sm text-muted">Materials / Parts</span>
              <span className="text-sm text-muted">Quoted separately if needed</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-cream">
              <span className="text-sm font-semibold text-ink">Estimated duration</span>
              <span className="text-sm font-semibold text-ink">{service.duration}</span>
            </div>
          </div>
          {service.type === 'QUOTE' && (
            <p className="text-sm text-muted mt-4">
              * Final price confirmed after on-site assessment. No work begins without your approval.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-surface border-t border-border-line">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <details
                key={i}
                className="group border border-border-line rounded-lg bg-cream overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-ink hover:text-gold transition-colors">
                  {item.q}
                  <ChevronDown
                    size={16}
                    className="text-muted transition-transform group-open:rotate-180 shrink-0 ml-4"
                  />
                </summary>
                <div className="px-6 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-border-line">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-6 border-t border-border-line">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink mb-8">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((s) => {
              const RelIcon = iconMap[s.icon] || Home;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-4 p-5 bg-surface border border-border-line rounded-lg hover:border-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-sm bg-cream flex items-center justify-center shrink-0">
                    <RelIcon size={18} className="text-muted group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{s.name}</p>
                    <p className="text-xs text-muted">{s.price}</p>
                  </div>
                  <ArrowRight size={14} className="text-muted ml-auto group-hover:text-gold transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-light italic text-white mb-4">
            Ready to book your {service.name.toLowerCase()}?
          </h2>
          <p className="text-white/50 text-sm mb-8">
            English support · Vetted technicians · Secure payment
          </p>
          <Link href={`/book?step=1&service=${service.slug}`}>
            <Button variant="gold" size="lg">
              Book Now — {service.price}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
