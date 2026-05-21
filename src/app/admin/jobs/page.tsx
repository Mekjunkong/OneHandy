import Link from 'next/link';
import { JobsTable } from '@/components/admin/JobsTable';

export default function AdminJobsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="bg-charcoal px-8 py-5 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/40 hover:text-white text-sm transition-colors">Dashboard</Link>
            <span className="text-white/20">/</span>
            <span className="text-white text-sm font-medium">Jobs</span>
          </div>
          <nav className="flex gap-6 text-sm text-white/50">
            <Link href="/admin/technicians" className="hover:text-white transition-colors">Technicians</Link>
            <Link href="/admin/payments" className="hover:text-white transition-colors">Payments</Link>
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="font-display text-2xl font-semibold text-ink mb-8">Jobs</h1>
        <JobsTable />
      </div>
    </main>
  );
}
