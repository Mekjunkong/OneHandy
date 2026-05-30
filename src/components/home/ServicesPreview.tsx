import Link from 'next/link';
import {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck, ArrowRight,
} from 'lucide-react';
import { services } from '@/lib/services';
import { Badge } from '@/components/ui/Badge';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck,
};

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gold mb-3 block">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              What can we help with?
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors"
          >
            See all services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((service) => {
            const Icon = iconMap[service.icon] || Home;
            const isEmergency = service.slug === 'emergency';
            return (
              <article
                key={service.slug}
                className={`group rounded-lg transition-all duration-150 ${
                  isEmergency
                    ? 'border border-gold/40 bg-gold/[0.04] hover:border-gold hover:shadow-sm'
                    : 'bg-surface border border-border-line hover:border-gold hover:shadow-sm'
                }`}
              >
                <Link href={`/services/${service.slug}`} className="block p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${isEmergency ? 'bg-gold/10' : 'bg-cream'}`}>
                      <Icon
                        size={20}
                        className={isEmergency ? 'text-gold' : 'text-muted group-hover:text-gold transition-colors'}
                      />
                    </div>
                    <Badge type={service.type} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ink mb-1.5">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">{service.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">{service.price}</span>
                    <span className="text-xs text-muted group-hover:text-gold transition-colors flex items-center gap-1">
                      View details <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <Link
                    href={`/book?step=1&service=${service.slug}`}
                    className={`inline-flex w-full items-center justify-center gap-1 rounded-sm px-4 py-2 text-xs font-semibold transition-colors ${
                      isEmergency
                        ? 'border border-gold text-gold hover:bg-gold hover:text-ink'
                        : 'border border-border-line text-ink hover:border-gold hover:text-gold'
                    }`}
                  >
                    {isEmergency ? 'Request urgent help' : 'Request this service'} <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/services" className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors">
            See all services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
