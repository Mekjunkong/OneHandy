import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/requests', label: 'Requests' },
  { href: '/admin/technicians', label: 'Technicians' },
  { href: '/admin/settings', label: 'Settings' },
];

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <div className="border-b border-white/10 bg-charcoal px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/admin" className="font-display text-2xl font-semibold text-white">
              One<span className="text-gold">Handy</span> Admin
            </Link>
            <p className="mt-1 text-xs text-white/45">Live request operations for the Chiang Mai pilot</p>
          </div>
          <nav className="flex flex-wrap items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" className="text-sm text-white/35 transition-colors hover:text-white">
              Site
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{subtitle}</p>}
        </div>
        {children}
      </section>
    </main>
  );
}
