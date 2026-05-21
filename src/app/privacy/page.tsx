import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-cream pt-16">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold">
              Privacy
            </span>
            <h1 className="mb-4 font-display text-4xl font-semibold text-ink md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm leading-6 text-muted">Coming soon.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
