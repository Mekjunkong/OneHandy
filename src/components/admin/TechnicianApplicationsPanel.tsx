'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { formatDateTime } from '@/lib/formatters';
import type { TechnicianApplicationRecord } from '@/lib/repositories';
import {
  technicianApplicationStatusLabels,
  technicianApplicationStatuses,
} from '@/lib/status';

export function TechnicianApplicationsPanel({
  applications,
}: {
  applications: TechnicianApplicationRecord[];
}) {
  const router = useRouter();
  const [savingId, setSavingId] = useState('');
  const [message, setMessage] = useState('');
  const [drafts, setDrafts] = useState<Record<string, { status: string; internalNotes: string }>>(() =>
    Object.fromEntries(
      applications.map((application) => [
        application.id,
        {
          status: application.status,
          internalNotes: application.internalNotes,
        },
      ])
    )
  );

  const updateDraft = (id: string, patch: Partial<{ status: string; internalNotes: string }>) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...patch,
      },
    }));
  };

  const save = async (id: string) => {
    setMessage('');
    setSavingId(id);

    try {
      const response = await fetch(`/api/admin/technician-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drafts[id]),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Could not save application.');
      }

      setMessage(`Saved ${id}.`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save application.');
    } finally {
      setSavingId('');
    }
  };

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-border-line bg-surface p-8 text-sm text-muted">
        No technician applications yet. New partner applications will appear here.
      </div>
    );
  }

  return (
    <div>
      {message && <p className="mb-4 text-sm text-muted">{message}</p>}
      <div className="space-y-4">
        {applications.map((application) => {
          const draft = drafts[application.id] || {
            status: application.status,
            internalNotes: application.internalNotes,
          };

          return (
            <article key={application.id} className="rounded-lg border border-border-line bg-surface p-6">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_260px]">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <p className="font-mono text-xs font-semibold text-muted">{application.id}</p>
                    <p className="text-xs text-muted">{formatDateTime(application.createdAt)}</p>
                  </div>
                  <h2 className="font-sans text-lg font-semibold text-ink">{application.name}</h2>
                  <p className="mt-1 text-sm text-muted">{application.phone} · WhatsApp {application.whatsapp}</p>
                  <p className="mt-1 text-sm text-muted">{application.yearsExperience} years experience</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {application.serviceNames.map((service) => (
                      <span key={service} className="rounded-full border border-border-line bg-cream px-2 py-0.5 text-xs text-muted">
                        {service}
                      </span>
                    ))}
                  </div>
                  {application.tools && (
                    <p className="mt-4 text-sm leading-6 text-ink">
                      <span className="font-semibold">Tools:</span> {application.tools}
                    </p>
                  )}
                  {application.previousWork && (
                    <p className="mt-3 text-sm leading-6 text-ink">
                      <span className="font-semibold">Previous work:</span> {application.previousWork}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted">Status</label>
                  <select
                    value={draft.status}
                    onChange={(event) => updateDraft(application.id, { status: event.target.value })}
                    className="mt-2 h-10 w-full rounded-sm border border-border-line bg-cream px-3 text-sm text-ink outline-none focus:border-ink"
                  >
                    {technicianApplicationStatuses.map((status) => (
                      <option key={status} value={status}>{technicianApplicationStatusLabels[status]}</option>
                    ))}
                  </select>
                  <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted">Internal notes</label>
                  <textarea
                    value={draft.internalNotes}
                    onChange={(event) => updateDraft(application.id, { internalNotes: event.target.value })}
                    className="mt-2 min-h-28 w-full rounded-sm border border-border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => save(application.id)}
                    disabled={savingId === application.id}
                  >
                    {savingId === application.id ? 'Saving...' : 'Save review'}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
