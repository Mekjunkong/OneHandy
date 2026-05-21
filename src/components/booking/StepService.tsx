'use client';

import { useState } from 'react';
import { Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck } from 'lucide-react';
import { services } from '@/lib/services';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wind, Droplets, Zap, Leaf, Home, AlertTriangle, ShieldCheck,
};

interface StepServiceProps {
  initialService: string;
  onNext: (service: string) => void;
}

export function StepService({ initialService, onNext }: StepServiceProps) {
  const [selected, setSelected] = useState(initialService);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">Choose your service</h2>
      <p className="text-muted text-sm mb-8">Select the service you need and see live pricing.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Home;
          const isSelected = selected === service.slug;
          return (
            <button
              key={service.slug}
              onClick={() => setSelected(service.slug)}
              className={`text-left p-5 border rounded-lg transition-all duration-150 ${
                isSelected
                  ? 'border-gold bg-gold/5 shadow-sm'
                  : 'border-border-line bg-surface hover:border-muted'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                    isSelected ? 'bg-gold/20' : 'bg-cream'
                  }`}
                >
                  <Icon size={16} className={isSelected ? 'text-gold' : 'text-muted'} />
                </div>
                <Badge type={service.type} />
              </div>
              <p className="text-sm font-semibold text-ink mb-0.5">{service.name}</p>
              <p className="text-xs text-muted mb-2">{service.shortDesc}</p>
              <p className={`text-sm font-semibold ${isSelected ? 'text-gold' : 'text-ink'}`}>
                {service.price}
              </p>
            </button>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!selected}
        onClick={() => onNext(selected)}
      >
        Continue →
      </Button>
    </div>
  );
}
