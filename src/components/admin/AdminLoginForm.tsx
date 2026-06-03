'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-border-line bg-surface p-8">
        <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border-line">
          <Lock size={18} className="text-muted" />
        </div>
        <h1 className="font-sans text-2xl font-semibold text-ink">Admin Login</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Sign in to manage service requests, PromptPay/cash status, technician reviews, and n8n delivery logs.
        </p>
        <label className="mt-7 block text-xs font-semibold uppercase tracking-wide text-muted">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 h-11 w-full rounded-sm border border-border-line bg-cream px-4 text-sm text-ink outline-none transition-colors focus:border-ink"
          autoComplete="current-password"
          required
        />
        {error && <p className="mt-3 text-sm text-error">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting || !password}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </main>
  );
}
