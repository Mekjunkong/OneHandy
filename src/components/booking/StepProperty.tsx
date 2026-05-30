'use client';

import { useState } from 'react';
import { Building2, TreePine, Home, Store } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { isPropertyStepValid, type BookingData } from './BookingWizard';

const propertyTypes = [
  { value: 'condo', label: 'Condo', icon: Building2 },
  { value: 'villa', label: 'Villa', icon: TreePine },
  { value: 'house', label: 'House', icon: Home },
  { value: 'townhouse', label: 'Townhouse', icon: Store },
];

interface StepPropertyProps {
  draft: BookingData;
  onNext: (data?: Partial<BookingData>) => void;
  onBack: () => void;
}

export function StepProperty({ draft, onNext, onBack }: StepPropertyProps) {
  const [propertyType, setPropertyType] = useState(draft.propertyType);
  const [address, setAddress] = useState(draft.address);
  const [unit, setUnit] = useState(draft.unit);
  const [accessNotes, setAccessNotes] = useState(draft.accessNotes);
  const [acUnits, setAcUnits] = useState(String(draft.acUnits || 1));

  const nextData = {
    propertyType,
    address: address.trim(),
    unit: unit.trim(),
    accessNotes: accessNotes.trim(),
    acUnits: Math.min(Math.max(Number(acUnits) || 1, 1), 20),
  };
  const isValid = isPropertyStepValid({ ...draft, ...nextData });

  const handleNext = () => {
    if (!isValid) return;

    onNext(nextData);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">Your property</h2>
      <p className="text-muted text-sm mb-8">Tell us where to send your technician.</p>

      {/* Property type */}
      <div className="mb-6">
        <label className="block text-xs font-semibold tracking-wide uppercase text-muted mb-3">
          Property Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {propertyTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setPropertyType(value)}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg text-sm transition-all duration-150 ${
                propertyType === value
                  ? 'border-gold bg-gold/5 text-ink'
                  : 'border-border-line bg-surface text-muted hover:border-muted'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-xs font-semibold tracking-wide uppercase text-muted mb-2">
          Address *
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 15/4 Nimman Road, Chiang Mai"
          className="w-full h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Unit */}
      <div className="mb-4">
        <label className="block text-xs font-semibold tracking-wide uppercase text-muted mb-2">
          Unit / Floor <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g. Unit 8A, Floor 3"
          className="w-full h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* AC units (only for AC cleaning) */}
      {draft.service === 'ac-cleaning' && (
        <div className="mb-4">
          <label className="block text-xs font-semibold tracking-wide uppercase text-muted mb-2">
            Number of AC Units
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={acUnits}
            onChange={(e) => setAcUnits(e.target.value)}
            className="w-24 h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      )}

      {/* Access notes */}
      <div className="mb-8">
        <label className="block text-xs font-semibold tracking-wide uppercase text-muted mb-2">
          Access Notes <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          value={accessNotes}
          onChange={(e) => setAccessNotes(e.target.value)}
          rows={3}
          placeholder="e.g. Gate code: 1234, parking in visitor bay, call on arrival…"
          className="w-full px-4 py-3 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" size="lg" onClick={onBack} className="border border-border-line">
          ← Back
        </Button>
        <Button variant="primary" size="lg" className="flex-1" disabled={!isValid} onClick={handleNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
