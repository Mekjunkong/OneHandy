'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepService } from './StepService';
import { StepProperty } from './StepProperty';
import { StepDateTime } from './StepDateTime';
import { StepPayment } from './StepPayment';
import { services } from '@/lib/services';

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

const STEP_LABELS = ['Service', 'Property', 'Date & Time', 'Review Request'];
const BOOKING_DRAFT_KEY = 'onehandy_booking_draft';
const SAFE_BOOKING_PARAMS = ['step', 'service'] as const;
const [STEP_PARAM, SERVICE_PARAM] = SAFE_BOOKING_PARAMS;

const EMPTY_DRAFT: BookingData = {
  service: '',
  propertyType: '',
  address: '',
  unit: '',
  accessNotes: '',
  acUnits: 1,
  date: '',
  timeWindow: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

const VALID_SERVICE_SLUGS = new Set(services.map((service) => service.slug));
const VALID_PROPERTY_TYPES = new Set(['condo', 'villa', 'house', 'townhouse']);
const VALID_TIME_WINDOWS = new Set(['morning', 'afternoon', 'evening']);

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getMinBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);

  return getLocalDateString(date);
}

export function getMaxBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 30);

  return getLocalDateString(date);
}

export function isValidBookingDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const parsedDate = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return false;

  return date >= getMinBookingDate() && date <= getMaxBookingDate();
}

export function isValidEmail(email: string) {
  const trimmedEmail = email.trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail) && trimmedEmail.length <= 254;
}

export function isValidPhone(phone: string) {
  const trimmedPhone = phone.trim();
  const digits = trimmedPhone.replace(/\D/g, '');

  return /^[+()\d\s.-]+$/.test(trimmedPhone) && digits.length >= 8 && digits.length <= 15;
}

export function isServiceStepValid(draft: BookingData) {
  return VALID_SERVICE_SLUGS.has(draft.service);
}

export function isPropertyStepValid(draft: BookingData) {
  const acUnits = Number(draft.acUnits);

  return (
    VALID_PROPERTY_TYPES.has(draft.propertyType) &&
    draft.address.trim().length >= 6 &&
    !Number.isNaN(acUnits) &&
    acUnits >= 1 &&
    acUnits <= 20
  );
}

export function isDateTimeStepValid(draft: BookingData) {
  return (
    isValidBookingDate(draft.date) &&
    VALID_TIME_WINDOWS.has(draft.timeWindow) &&
    draft.name.trim().length >= 2 &&
    isValidPhone(draft.phone) &&
    isValidEmail(draft.email)
  );
}

function getFirstAllowedStep(draft: BookingData) {
  if (!isServiceStepValid(draft)) return 1;
  if (!isPropertyStepValid(draft)) return 2;
  if (!isDateTimeStepValid(draft)) return 3;

  return STEP_LABELS.length;
}

function clampStepToCompletedRequirements(requestedStep: number, draft: BookingData) {
  return Math.min(Math.max(requestedStep, 1), getFirstAllowedStep(draft));
}

function getStoredDraft(): Partial<BookingData> | null {
  if (typeof window === 'undefined') return null;

  try {
    const rawDraft = window.sessionStorage.getItem(BOOKING_DRAFT_KEY);
    return rawDraft ? JSON.parse(rawDraft) : null;
  } catch {
    return null;
  }
}

function persistDraft(draft: BookingData) {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage failures; in-memory React state still keeps the active flow private.
  }
}

function clearStoredDraft() {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.removeItem(BOOKING_DRAFT_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function getSafeBookingUrl(step: number, service: string) {
  const params = new URLSearchParams();
  params.set(STEP_PARAM, String(step));
  if (service) params.set(SERVICE_PARAM, service);
  return `/book?${params.toString()}`;
}

function getSafeParams(step: number, service: string) {
  const safeParams = new URLSearchParams();
  safeParams.set(STEP_PARAM, String(step));
  if (service) safeParams.set(SERVICE_PARAM, service);

  return safeParams.toString();
}

function getInitialDraft(service: string): BookingData {
  const storedDraft = getStoredDraft();
  const storedAcUnits = Number(storedDraft?.acUnits || EMPTY_DRAFT.acUnits);
  const safeService = VALID_SERVICE_SLUGS.has(service) ? service : '';
  const safeStoredService = storedDraft?.service && VALID_SERVICE_SLUGS.has(storedDraft.service)
    ? storedDraft.service
    : '';

  return {
    ...EMPTY_DRAFT,
    ...storedDraft,
    service: safeService || safeStoredService,
    acUnits: Math.min(Math.max(Number.isFinite(storedAcUnits) ? storedAcUnits : EMPTY_DRAFT.acUnits, 1), 20),
  };
}

export function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawStep = Number(searchParams.get(STEP_PARAM) || '1');
  const requestedStep = Number.isInteger(rawStep) ? Math.min(Math.max(rawStep, 1), STEP_LABELS.length) : 1;
  const rawServiceFromUrl = searchParams.get(SERVICE_PARAM) || '';
  const serviceFromUrl = VALID_SERVICE_SLUGS.has(rawServiceFromUrl) ? rawServiceFromUrl : '';
  const [draft, setDraft] = useState<BookingData>(() => getInitialDraft(serviceFromUrl));
  const step = clampStepToCompletedRequirements(requestedStep, draft);

  const safeSearch = useMemo(
    () => getSafeParams(step, serviceFromUrl || draft.service),
    [draft.service, serviceFromUrl, step]
  );

  useEffect(() => {
    const currentSearch = searchParams.toString();

    if (currentSearch !== safeSearch) {
      router.replace(`/book?${safeSearch}`, { scroll: false });
    }
  }, [router, safeSearch, searchParams]);

  useEffect(() => {
    if (!serviceFromUrl || serviceFromUrl === draft.service) return;

    const timeout = window.setTimeout(() => {
      setDraft((currentDraft) => ({
        ...currentDraft,
        service: serviceFromUrl,
      }));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [draft.service, serviceFromUrl]);

  useEffect(() => {
    persistDraft(draft);
  }, [draft]);

  const updateDraftAndStep = (newStep: number, data?: Partial<BookingData>) => {
    const nextDraft = {
      ...draft,
      ...data,
    };

    setDraft(nextDraft);
    persistDraft(nextDraft);
    router.push(getSafeBookingUrl(newStep, nextDraft.service));
  };

  const goNext = (data?: Partial<BookingData>) => {
    const nextDraft = {
      ...draft,
      ...data,
    };

    updateDraftAndStep(Math.min(step + 1, getFirstAllowedStep(nextDraft)), data);
  };
  const goBack = () => updateDraftAndStep(Math.max(1, step - 1));
  const submitRequest = () => {
    const firstAllowedStep = getFirstAllowedStep(draft);

    if (firstAllowedStep < STEP_LABELS.length) {
      router.replace(getSafeBookingUrl(firstAllowedStep, draft.service), { scroll: false });
      return;
    }

    clearStoredDraft();
    router.push('/book/confirmation');
  };

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
        <StepService key={draft.service} initialService={draft.service} onNext={(svc) => goNext({ service: svc })} />
      )}
      {step === 2 && (
        <StepProperty
          draft={draft}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {step === 3 && (
        <StepDateTime draft={draft} onNext={goNext} onBack={goBack} />
      )}
      {step === 4 && (
        <StepPayment draft={draft} onBack={goBack} onSubmit={submitRequest} />
      )}
    </div>
  );
}

export { BOOKING_DRAFT_KEY, SAFE_BOOKING_PARAMS };
