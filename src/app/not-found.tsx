import Link from 'next/link';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-cream pt-16">
        <section className="px-6 py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="mb-6 h-px w-16 bg-gold" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              404
            </p>
            <h1 className="mb-5 font-display text-5xl font-light italic leading-tight text-ink md:text-6xl">
              Page not found
            </h1>
            <p className="mb-8 max-w-md text-sm leading-6 text-muted">
              This page has stepped away from the toolkit. Let&apos;s get you back to OneHandy.
            </p>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center bg-ink px-6 text-sm font-semibold tracking-wide text-cream transition-colors duration-150 hover:bg-charcoal"
            >
              Back home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
