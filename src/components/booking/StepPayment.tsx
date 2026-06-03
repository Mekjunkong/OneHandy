'use client';

import { useState } from 'react';
import { Lock, CreditCard, Info } from 'lucide-react';
import { services } from '@/lib/services';
import { Button } from '@/components/ui/Button';
import { isDateTimeStepValid, isPropertyStepValid, isServiceStepValid, type BookingData } from './BookingWizard';

interface StepPaymentProps {
  draft: BookingData;
  error: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export function StepPayment({ draft, error, isSubmitting, onBack, onSubmit }: StepPaymentProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const service = services.find((s) => s.slug === draft.service);
  const canSubmit = isServiceStepValid(draft) && isPropertyStepValid(draft) && isDateTimeStepValid(draft);
  const guidePriceLabel = service?.type === 'QUOTE' ? 'Quote basis' : 'Guide price';
  const guidePriceValue = service?.type === 'QUOTE'
    ? `${service.price} — final quote required`
    : service?.price || 'To be confirmed';

  const timeLabels: Record<string, string> = {
    morning: 'Morning (8–12)',
    afternoon: 'Afternoon (12–17)',
    evening: 'Evening (17–20)',
  };


  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">Review Request</h2>
      <p className="text-muted text-sm mb-8">
        Review your service request. No payment is taken until availability and details are confirmed.
      </p>

      {/* Request summary */}
      <div className="bg-surface border border-border-line rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border-line bg-cream">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted">Request Summary</p>
        </div>
        <div className="px-6 py-5 space-y-3">
          {[
            { label: 'Service', value: service?.name || '—' },
            { label: 'Address', value: draft.address || '—' },
            { label: 'Date', value: draft.date ? new Date(draft.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
            { label: 'Time', value: draft.timeWindow ? timeLabels[draft.timeWindow] : '—' },
            { label: 'Contact', value: draft.name || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs text-muted shrink-0 pt-0.5">{label}</span>
              <span className="text-sm text-ink text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-cream border-t border-border-line flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">{guidePriceLabel}</span>
          <span className="text-lg font-semibold text-ink text-right">{guidePriceValue}</span>
        </div>
      </div>

      {/* Phase 1 payment status */}
      <div className="bg-surface border border-border-line rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={16} className="text-muted" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted">
            Payment after confirmation
          </span>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          Online payment is not collected in this request step. OneHandy will confirm technician availability,
          final timing, quote items where needed, and any payment instructions before the service proceeds.
        </p>
      </div>

      {/* Disabled future payment button */}
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
            Online payment after availability is confirmed
          </Button>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-cream text-xs rounded-sm whitespace-nowrap z-10">
              Payment is not collected during the Phase 1 request flow
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
            </div>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full mb-6"
        disabled={!canSubmit || isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? 'Submitting request...' : 'Submit Service Request'}
      </Button>

      {!canSubmit && (
        <p className="text-xs text-error text-center mb-4">
          Please complete the required service, property, date, and contact details before submitting.
        </p>
      )}

      {error && (
        <p className="text-xs text-error text-center mb-4">
          {error}
        </p>
      )}

      {/* Fine print */}
      <div className="flex items-start gap-2 p-4 bg-surface border border-border-line rounded-lg text-xs text-muted leading-relaxed">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          Submitting this request does not confirm a paid booking. Our team will follow up to confirm availability,
          arrival details, and next steps.
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
