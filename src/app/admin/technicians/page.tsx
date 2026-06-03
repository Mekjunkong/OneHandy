import { AdminNotice } from '@/components/admin/AdminNotice';
import { AdminShell } from '@/components/admin/AdminShell';
import { TechnicianApplicationsPanel } from '@/components/admin/TechnicianApplicationsPanel';
import { requireAdminSession } from '@/lib/admin-auth';
import { isDatabaseConfigured } from '@/lib/db';
import { listTechnicianApplications } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function AdminTechniciansPage() {
  await requireAdminSession();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="Technicians" subtitle="Technician applications will appear here after setup.">
        <AdminNotice title="DATABASE_URL is not configured">
          Configure the database and run migrations before reviewing technician applications.
        </AdminNotice>
      </AdminShell>
    );
  }

  const applications = await listTechnicianApplications(200);

  return (
    <AdminShell title="Technicians" subtitle="Review partner applications and keep vetting notes in one place.">
      <TechnicianApplicationsPanel applications={applications} />
    </AdminShell>
  );
}
