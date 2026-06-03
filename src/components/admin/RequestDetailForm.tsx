'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { formatDate, formatDateTime, timeWindowLabels } from '@/lib/formatters';
import type { ServiceRequestEventRecord, ServiceRequestRecord } from '@/lib/repositories';
import {
  paymentStatusLabels,
  paymentStatuses,
  requestStatusLabels,
  requestStatuses,
} from '@/lib/status';

export function RequestDetailForm({
  request,
  events,
}: {
  request: ServiceRequestRecord;
  events: ServiceRequestEventRecord[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);
  const [paymentStatus, setPaymentStatus] = useState(request.paymentStatus);
  const [quoteAmountBaht, setQuoteAmountBaht] = useState(request.quoteAmountBaht?.toString() || '');
  const [quoteNotes, setQuoteNotes] = useState(request.quoteNotes);
  const [technicianName, setTechnicianName] = useState(request.technicianName);
  const [internalNotes, setInternalNotes] = useState(request.internalNotes);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    setMessage('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/service-requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          paymentStatus,
          quoteAmountBaht: quoteAmountBaht ? Number(quoteAmountBaht) : null,
          quoteNotes,
          technicianName,
          internalNotes,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Could not save request.');
      }

      setMessage('Request saved and n8n event queued.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save request.');
    } finally {
      setIsSaving(false);
    }
  };

  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-muted mb-2';
  const inputClass = 'h-11 w-full rounded-sm border border-border-line bg-surface px-3 text-sm text-ink outline-none focus:border-ink';
  const textareaClass = 'min-h-28 w-full rounded-sm border border-border-line bg-surface px-3 py-3 text-sm text-ink outline-none focus:border-ink';

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <section className="rounded-lg border border-border-line bg-surface p-6">
          <div className="mb-5 flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold text-muted">{request.id}</p>
            <h2 className="font-sans text-xl font-semibold text-ink">{request.serviceName}</h2>
            <p className="text-sm text-muted">
              {formatDate(request.preferredDate)} · {timeWindowLabels[request.timeWindow]}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Customer</p>
              <p className="mt-1 text-sm font-semibold text-ink">{request.customerName}</p>
              <p className="text-sm text-muted">{request.phone}</p>
              <p className="text-sm text-muted">{request.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Property</p>
              <p className="mt-1 text-sm font-semibold text-ink">{request.propertyType}</p>
              <p className="text-sm text-muted">{request.address}</p>
              {request.unit && <p className="text-sm text-muted">{request.unit}</p>}
            </div>
            {request.accessNotes && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Access notes</p>
                <p className="mt-1 text-sm text-ink">{request.accessNotes}</p>
              </div>
            )}
            {request.notes && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Customer notes</p>
                <p className="mt-1 text-sm text-ink">{request.notes}</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-border-line bg-surface p-6">
          <h2 className="mb-5 font-sans text-base font-semibold text-ink">Triage and payment</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Status</label>
              <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className={inputClass}>
                {requestStatuses.map((item) => (
                  <option key={item} value={item}>{requestStatusLabels[item]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Payment</label>
              <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value as typeof paymentStatus)} className={inputClass}>
                {paymentStatuses.map((item) => (
                  <option key={item} value={item}>{paymentStatusLabels[item]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Quote amount (THB)</label>
              <input value={quoteAmountBaht} onChange={(event) => setQuoteAmountBaht(event.target.value)} inputMode="numeric" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Technician</label>
              <input value={technicianName} onChange={(event) => setTechnicianName(event.target.value)} className={inputClass} placeholder="Name after assignment" />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Quote notes</label>
            <textarea value={quoteNotes} onChange={(event) => setQuoteNotes(event.target.value)} className={textareaClass} />
          </div>
          <div className="mt-4">
            <label className={labelClass}>Internal notes</label>
            <textarea value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} className={textareaClass} />
          </div>
          {message && <p className="mt-4 text-sm text-muted">{message}</p>}
          <Button type="button" onClick={save} disabled={isSaving} className="mt-5">
            {isSaving ? 'Saving...' : 'Save request'}
          </Button>
        </section>
      </div>

      <aside className="rounded-lg border border-border-line bg-surface p-6">
        <h2 className="font-sans text-base font-semibold text-ink">Timeline</h2>
        <div className="mt-5 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border-l border-border-line pl-4">
              <p className="text-sm font-semibold text-ink">{event.eventType.replaceAll('_', ' ')}</p>
              {event.note && <p className="mt-1 text-sm leading-5 text-muted">{event.note}</p>}
              <p className="mt-1 text-xs text-muted">{formatDateTime(event.createdAt)} · {event.actor}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
