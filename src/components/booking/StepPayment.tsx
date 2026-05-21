'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CreditCard, Info } from 'lucide-react';
import { services } from '@/lib/services';
import { Button } from '@/components/ui/Button';

interface StepPaymentProps {
  params: URLSearchParams;
  onBack: () => void;
}

export function StepPayment({ params, onBack }: StepPaymentProps) {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const serviceSlug = params.get('service') || '';
  const service = services.find((s) => s.slug === serviceSlug);
  const date = params.get('date') || '';
  const timeWindow = params.get('timeWindow') || '';
  const address = decodeURIComponent(params.get('address') || '');
  const name = decodeURIComponent(params.get('name') || '');

  const timeLabels: Record<string, string> = {
    morning: 'Morning (8–12)',
    afternoon: 'Afternoon (12–17)',
    evening: 'Evening (17–20)',
  };

  const handleConfirm = () => {
    router.push('/book/confirmation');
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">Review & Pay</h2>
      <p className="text-muted text-sm mb-8">Confirm your booking details before payment.</p>

      {/* Order summary */}
      <div className="bg-surface border border-border-line rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border-line bg-cream">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted">Booking Summary</p>
        </div>
        <div className="px-6 py-5 space-y-3">
          {[
            { label: 'Service', value: service?.name || '—' },
            { label: 'Address', value: address || '—' },
            { label: 'Date', value: date ? new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
            { label: 'Time', value: timeWindow ? timeLabels[timeWindow] : '—' },
            { label: 'Contact', value: name || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs text-muted shrink-0 pt-0.5">{label}</span>
              <span className="text-sm text-ink text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-cream border-t border-border-line flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">Total</span>
          <span className="text-lg font-semibold text-ink">{service?.price || '—'}</span>
        </div>
      </div>

      {/* Placeholder payment form */}
      <div className="bg-surface border border-border-line rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard size={16} className="text-muted" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted">
            Payment Details
          </span>
        </div>
        <div className="space-y-3 opacity-60 pointer-events-none">
          <div>
            <label className="block text-xs text-muted mb-1.5">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              readOnly
              className="w-full h-11 px-4 border border-border-line rounded-sm bg-cream text-sm text-muted"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1.5">Expiry</label>
              <input
                type="text"
                placeholder="MM / YY"
                readOnly
                className="w-full h-11 px-4 border border-border-line rounded-sm bg-cream text-sm text-muted"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1.5">CVC</label>
              <input
                type="text"
                placeholder="•••"
                readOnly
                className="w-full h-11 px-4 border border-border-line rounded-sm bg-cream text-sm text-muted"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm button with tooltip */}
      <div className="relative mb-4">
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full opacity-70 cursor-not-allowed"
            disabled
          >
            <Lock size={14} className="mr-2" />
            Pay {service?.price} & Confirm Booking
          </Button>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-cream text-xs rounded-sm whitespace-nowrap z-10">
              Payments launching soon
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
            </div>
          )}
        </div>
      </div>

      {/* Bypass button for Phase 1 */}
      <Button variant="outline" size="lg" className="w-full mb-6" onClick={handleConfirm}>
        Confirm Booking (Demo)
      </Button>

      {/* Fine print */}
      <div className="flex items-start gap-2 p-4 bg-surface border border-border-line rounded-lg text-xs text-muted leading-relaxed">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          Your card will not be charged until our team confirms technician availability. You'll receive a WhatsApp confirmation within 2 hours.
        </p>
      </div>

      <div className="mt-6">
        <Button variant="ghost" size="md" onClick={onBack} className="border border-border-line">
          ← Back
        </Button>
      </div>
    </div>
  );
}
