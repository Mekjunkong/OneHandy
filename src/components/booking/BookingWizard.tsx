'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepService } from './StepService';
import { StepProperty } from './StepProperty';
import { StepDateTime } from './StepDateTime';
import { StepPayment } from './StepPayment';

export interface BookingData {
  service: string;
  propertyType: string;
  address: string;
  unit: string;
  accessNotes: string;
  acUnits: number;
  date: string;
  timeWindow: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const STEP_LABELS = ['Service', 'Property', 'Date & Time', 'Review & Pay'];

export function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = parseInt(searchParams.get('step') || '1');
  const service = searchParams.get('service') || '';

  const setStep = (newStep: number, extra?: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(newStep));
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => params.set(k, v));
    }
    router.push(`/book?${params.toString()}`);
  };

  const goNext = (data?: Record<string, string>) => setStep(step + 1, data);
  const goBack = () => setStep(Math.max(1, step - 1));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted">
            Step {step} of {STEP_LABELS.length}
          </span>
          <span className="text-xs text-muted">{STEP_LABELS[step - 1]}</span>
        </div>
        <ProgressBar currentStep={step} totalSteps={STEP_LABELS.length} />
      </div>

      {/* Step content */}
      {step === 1 && (
        <StepService initialService={service} onNext={(svc) => goNext({ service: svc })} />
      )}
      {step === 2 && (
        <StepProperty
          service={service}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {step === 3 && (
        <StepDateTime service={service} onNext={goNext} onBack={goBack} />
      )}
      {step === 4 && (
        <StepPayment params={searchParams} onBack={goBack} />
      )}
    </div>
  );
}
