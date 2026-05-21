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
            return (
              <Link
                key={service.slug}
                href={`/book?step=1&service=${service.slug}`}
                className="group bg-surface border border-border-line rounded-lg p-6 hover:border-gold hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-cream flex items-center justify-center">
                    <Icon size={20} className="text-muted group-hover:text-gold transition-colors" />
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
                    Book Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
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
