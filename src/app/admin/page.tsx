import Link from 'next/link';
import { AdminNotice } from '@/components/admin/AdminNotice';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdminSession } from '@/lib/admin-auth';
import { isDatabaseConfigured } from '@/lib/db';
import { formatBaht } from '@/lib/formatters';
import { listServiceRequests, listTechnicianApplications } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  await requireAdminSession();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="Dashboard" subtitle="Database setup is required before live operations can begin.">
        <AdminNotice title="DATABASE_URL is not configured">
          Add `DATABASE_URL` to the Hostinger/Dokploy environment, run `npm run db:migrate`, then reload this page.
        </AdminNotice>
      </AdminShell>
    );
  }

  const [requests, applications] = await Promise.all([
    listServiceRequests(200),
    listTechnicianApplications(100),
  ]);

  const openRequests = requests.filter((request) => !['completed', 'cancelled'].includes(request.status)).length;
  const awaitingPayment = requests.filter((request) => request.paymentStatus === 'pending_promptpay').length;
  const paidTotal = requests
    .filter((request) => ['paid_promptpay', 'paid_cash'].includes(request.paymentStatus))
    .reduce((total, request) => total + (request.quoteAmountBaht || 0), 0);
  const newApplications = applications.filter((application) => application.status === 'new').length;

  const cards = [
    { label: 'Open Requests', value: openRequests, href: '/admin/requests' },
    { label: 'Awaiting PromptPay', value: awaitingPayment, href: '/admin/requests' },
    { label: 'Collected', value: formatBaht(paidTotal), href: '/admin/requests' },
    { label: 'New Technicians', value: newApplications, href: '/admin/technicians' },
  ];

  return (
    <AdminShell
      title="Dashboard"
      subtitle="A focused control surface for triage, quotes, PromptPay/cash tracking, technician review, and automation health."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-border-line bg-surface p-5 transition-colors hover:border-gold"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { title: 'Request queue', desc: 'Review new jobs, set status, quote amount, technician, and payment state.', href: '/admin/requests' },
          { title: 'Technician screening', desc: 'Review new partner applications and track vetting notes.', href: '/admin/technicians' },
          { title: 'Automation health', desc: 'Check n8n delivery logs and retry failed events.', href: '/admin/settings' },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-lg border border-border-line bg-surface p-6 transition-colors hover:border-gold"
          >
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
