'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function N8nRetryButton() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = async () => {
    setMessage('');
    setIsRetrying(true);

    try {
      const response = await fetch('/api/n8n/events/retry', { method: 'POST' });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Could not retry n8n events.');
      }

      setMessage(`Retried ${result.retried} event${result.retried === 1 ? '' : 's'}.`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not retry n8n events.');
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div>
      <Button type="button" size="sm" onClick={retry} disabled={isRetrying}>
        {isRetrying ? 'Retrying...' : 'Retry n8n events'}
      </Button>
      {message && <p className="mt-2 text-xs text-muted">{message}</p>}
    </div>
  );
}
