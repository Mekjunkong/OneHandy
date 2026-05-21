'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const timeWindows = [
  { value: 'morning', label: 'Morning', desc: '8:00 – 12:00' },
  { value: 'afternoon', label: 'Afternoon', desc: '12:00 – 17:00' },
  { value: 'evening', label: 'Evening', desc: '17:00 – 20:00' },
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getMaxDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

interface StepDateTimeProps {
  service: string;
  onNext: (data?: Record<string, string>) => void;
  onBack: () => void;
}

export function StepDateTime({ service, onNext, onBack }: StepDateTimeProps) {
  const [date, setDate] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const isValid = date && timeWindow && name.trim() && phone.trim() && email.trim();

  const handleNext = () => {
    onNext({
      date,
      timeWindow,
      name: encodeURIComponent(name),
      phone: encodeURIComponent(phone),
      email: encodeURIComponent(email),
      notes: encodeURIComponent(notes),
    });
  };

  const inputClass =
    'w-full h-11 px-4 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors';
  const labelClass =
    'block text-xs font-semibold tracking-wide uppercase text-muted mb-2';

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">Date, time & contact</h2>
      <p className="text-muted text-sm mb-8">When should we come, and how do we reach you?</p>

      {/* Date */}
      <div className="mb-6">
        <label className={labelClass}>Preferred Date *</label>
        <input
          type="date"
          value={date}
          min={getMinDate()}
          max={getMaxDate()}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Time window */}
      <div className="mb-8">
        <label className={labelClass}>Preferred Time Window *</label>
        <div className="grid grid-cols-3 gap-3">
          {timeWindows.map((tw) => (
            <button
              key={tw.value}
              onClick={() => setTimeWindow(tw.value)}
              className={`p-3 border rounded-lg text-center transition-all duration-150 ${
                timeWindow === tw.value
                  ? 'border-gold bg-gold/5'
                  : 'border-border-line bg-surface hover:border-muted'
              }`}
            >
              <p className="text-sm font-semibold text-ink">{tw.label}</p>
              <p className="text-xs text-muted">{tw.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-border-line pt-8 mb-8">
        <h3 className="font-sans text-sm font-semibold text-ink mb-5">Your Contact Details</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>WhatsApp / Phone *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+66 80 000 0000"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Additional Notes <span className="normal-case font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any extra information for the technician…"
              className="w-full px-4 py-3 border border-border-line rounded-sm bg-surface text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>
        </div>
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
