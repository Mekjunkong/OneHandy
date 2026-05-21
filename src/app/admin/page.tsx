import Link from 'next/link';
import { mockJobs, mockPayments } from '@/lib/mock-data';
import { Briefcase, Users, CreditCard, TrendingUp } from 'lucide-react';

const totalRevenue = mockPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
const pendingJobs = mockJobs.filter((j) => j.status === 'pending').length;
const completedJobs = mockJobs.filter((j) => j.status === 'completed').length;

const stats = [
  { label: 'Total Bookings', value: mockJobs.length, icon: Briefcase, href: '/admin/jobs' },
  { label: 'Pending Jobs', value: pendingJobs, icon: TrendingUp, href: '/admin/jobs' },
  { label: 'Completed', value: completedJobs, icon: Briefcase, href: '/admin/jobs' },
  { label: 'Total Revenue', value: `฿${totalRevenue.toLocaleString()}`, icon: CreditCard, href: '/admin/payments' },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="bg-charcoal px-8 py-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">
              One<span className="text-gold">Handy</span> Admin
            </h1>
            <p className="text-white/40 text-xs mt-1">Dashboard overview</p>
          </div>
          <nav className="flex gap-6 text-sm text-white/50">
            <Link href="/admin/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <Link href="/admin/technicians" className="hover:text-white transition-colors">Technicians</Link>
            <Link href="/admin/payments" className="hover:text-white transition-colors">Payments</Link>
            <Link href="/" className="hover:text-white transition-colors text-white/30">← Site</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-surface border border-border-line rounded-lg p-5 hover:border-gold transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted">{stat.label}</p>
                  <Icon size={14} className="text-muted group-hover:text-gold transition-colors" />
                </div>
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Manage Jobs', desc: 'View and assign all active bookings', href: '/admin/jobs', icon: Briefcase },
            { title: 'Technicians', desc: 'Manage your technician roster', href: '/admin/technicians', icon: Users },
            { title: 'Payments', desc: 'Track revenue and payouts', href: '/admin/payments', icon: CreditCard },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 p-5 bg-surface border border-border-line rounded-lg hover:border-gold transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-cream border border-border-line flex items-center justify-center">
                  <Icon size={18} className="text-muted group-hover:text-gold transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
