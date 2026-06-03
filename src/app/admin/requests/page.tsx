import { AdminNotice } from '@/components/admin/AdminNotice';
import { AdminShell } from '@/components/admin/AdminShell';
import { RequestsTable } from '@/components/admin/RequestsTable';
import { requireAdminSession } from '@/lib/admin-auth';
import { isDatabaseConfigured } from '@/lib/db';
import { listServiceRequests } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage() {
  await requireAdminSession();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="Requests" subtitle="Live service requests will appear here after setup.">
        <AdminNotice title="DATABASE_URL is not configured">
          Configure the database and run migrations before using the request queue.
        </AdminNotice>
      </AdminShell>
    );
  }

  const requests = await listServiceRequests(200);

  return (
    <AdminShell
      title="Requests"
      subtitle="Triage customer requests, confirm availability, track quotes, and record PromptPay or cash status."
    >
      <RequestsTable requests={requests} />
    </AdminShell>
  );
}
