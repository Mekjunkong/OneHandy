import Link from 'next/link';
import { Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Service } from '@/lib/services';
import { Badge } from '@/components/ui/Badge';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck,
};

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'compact';
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Home;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-surface border border-border-line rounded-lg hover:border-gold hover:shadow-sm transition-all duration-150"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-sm bg-cream flex items-center justify-center">
            <Icon size={20} className="text-muted group-hover:text-gold transition-colors" />
          </div>
          <Badge type={service.type} />
        </div>
        <h3 className="font-sans text-base font-semibold text-ink mb-1.5">{service.name}</h3>
        <p className="text-sm text-muted mb-4 leading-relaxed">{service.shortDesc}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border-line">
          <div>
            <p className="text-sm font-semibold text-ink">{service.price}</p>
            <p className="text-xs text-muted">{service.duration}</p>
          </div>
          <span className="text-xs text-muted group-hover:text-gold transition-colors flex items-center gap-1">
            View details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
