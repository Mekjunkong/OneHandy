import { notFound } from 'next/navigation';
import { AdminNotice } from '@/components/admin/AdminNotice';
import { AdminShell } from '@/components/admin/AdminShell';
import { RequestDetailForm } from '@/components/admin/RequestDetailForm';
import { requireAdminSession } from '@/lib/admin-auth';
import { isDatabaseConfigured } from '@/lib/db';
import { getServiceRequest, listServiceRequestEvents } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRequestDetailPage({ params }: PageProps) {
  await requireAdminSession();

  const { id } = await params;

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="Request detail">
        <AdminNotice title="DATABASE_URL is not configured">
          Configure the database and run migrations before using the request detail view.
        </AdminNotice>
      </AdminShell>
    );
  }

  const [request, events] = await Promise.all([
    getServiceRequest(id),
    listServiceRequestEvents(id),
  ]);

  if (!request) notFound();

  return (
    <AdminShell title={request.id} subtitle="Review customer details, update triage status, and record payment progress.">
      <RequestDetailForm request={request} events={events} />
    </AdminShell>
  );
}
