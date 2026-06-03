import { AdminNotice } from '@/components/admin/AdminNotice';
import { AdminShell } from '@/components/admin/AdminShell';
import { N8nRetryButton } from '@/components/admin/N8nRetryButton';
import { requireAdminSession } from '@/lib/admin-auth';
import { isDatabaseConfigured } from '@/lib/db';
import { formatDateTime } from '@/lib/formatters';
import { listRecentN8nEventLogs } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  await requireAdminSession();

  const checks = [
    { label: 'DATABASE_URL', ok: Boolean(process.env.DATABASE_URL) },
    { label: 'ADMIN_PASSWORD or ADMIN_PIN', ok: Boolean(process.env.ADMIN_PASSWORD || process.env.ADMIN_PIN) },
    { label: 'ADMIN_SESSION_SECRET', ok: Boolean(process.env.ADMIN_SESSION_SECRET) },
    { label: 'N8N_WEBHOOK_URL', ok: Boolean(process.env.N8N_WEBHOOK_URL) },
    { label: 'N8N_WEBHOOK_SECRET', ok: Boolean(process.env.N8N_WEBHOOK_SECRET) },
    { label: 'NEXT_PUBLIC_SITE_URL', ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL) },
  ];

  const logs = isDatabaseConfigured() ? await listRecentN8nEventLogs(30) : [];

  return (
    <AdminShell title="Settings" subtitle="Deployment readiness and automation delivery logs for the Hostinger VPS setup.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-lg border border-border-line bg-surface p-6">
          <h2 className="font-sans text-base font-semibold text-ink">Environment</h2>
          <div className="mt-5 space-y-3">
            {checks.map((check) => (
              <div key={check.label} className="flex items-center justify-between gap-4 text-sm">
                <span className="font-mono text-xs text-muted">{check.label}</span>
                <span className={check.ok ? 'text-green-700' : 'text-error'}>
                  {check.ok ? 'Configured' : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border-line bg-surface p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-sans text-base font-semibold text-ink">n8n Event Logs</h2>
              <p className="mt-1 text-sm text-muted">Signed webhook deliveries for requests and technician reviews.</p>
            </div>
            <N8nRetryButton />
          </div>
          {!isDatabaseConfigured() ? (
            <AdminNotice title="DATABASE_URL is not configured">
              Event logs are stored in Postgres after database setup.
            </AdminNotice>
          ) : logs.length === 0 ? (
            <p className="text-sm text-muted">No n8n events recorded yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border-line">
              <table className="w-full text-sm">
                <thead className="border-b border-border-line bg-cream">
                  <tr>
                    {['Created', 'Event', 'Object', 'Status', 'Attempts', 'Error'].map((heading) => (
                      <th key={heading} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-line">
                  {logs.map((log) => (
                    <tr key={log.id} className="bg-surface">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">{formatDateTime(log.createdAt)}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-ink">{log.eventType}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted">{log.objectId}</td>
                      <td className="px-4 py-3 capitalize text-ink">{log.deliveryStatus}</td>
                      <td className="px-4 py-3 text-muted">{log.attempts}</td>
                      <td className="px-4 py-3 text-xs text-muted">{log.errorMessage || log.responseBody || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
