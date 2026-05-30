'use client';

import { useState, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Button } from './Button';

interface PinGateProps {
  onSuccess: () => void;
}

export function PinGate({ onSuccess }: PinGateProps) {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);
    setMessage('');
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newPin.every((d) => d !== '')) {
      verifyPin(newPin.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      verifyPin(pin.join(''));
    }
  };

  const verifyPin = (enteredPin: string) => {
    if (enteredPin.length < 6) return;
    fetch('/api/admin/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: enteredPin }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          onSuccess();
        } else {
          setError(true);
          setMessage(data.message || 'Incorrect PIN. Please try again.');
          setShake(true);
          setPin(['', '', '', '', '', '']);
          setTimeout(() => setShake(false), 500);
          setTimeout(() => inputRefs.current[0]?.focus(), 50);
        }
      })
      .catch(() => {
        // Fallback: direct env check not possible client-side; show error
        setError(true);
        setMessage('Admin access is unavailable. Configure ADMIN_PIN for the Phase 1 local PIN gate.');
        setShake(true);
        setPin(['', '', '', '', '', '']);
        setTimeout(() => setShake(false), 500);
      });
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border-line mb-6">
          <Lock size={20} className="text-muted" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink mb-2">Admin Access</h1>
        <p className="text-muted text-sm mb-3">Enter your 6-digit admin PIN to continue.</p>
        <p className="text-xs text-muted mb-8">
          Phase 1 admin uses a local PIN gate for mock data only. It is not production-grade backend auth.
        </p>

        <div
          className="flex gap-3 justify-center mb-6"
          style={{
            animation: shake ? 'shake 0.4s ease' : undefined,
          }}
        >
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-11 h-12 text-center text-lg font-semibold border rounded-sm bg-surface outline-none transition-colors duration-150
                ${error ? 'border-error text-error' : digit ? 'border-gold' : 'border-border-line'}
                focus:border-gold`}
            />
          ))}
        </div>

        {error && <p className="text-error text-sm mb-4">{message || 'Incorrect PIN. Please try again.'}</p>}

        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={() => verifyPin(pin.join(''))}
          disabled={pin.some((d) => !d)}
        >
          Unlock Dashboard
        </Button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
