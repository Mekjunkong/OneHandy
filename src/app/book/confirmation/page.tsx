'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Button } from '@/components/ui/Button';
import { generateBookingRef } from '@/lib/utils';

export default function ConfirmationPage() {
  const [ref, setRef] = useState('');

  useEffect(() => {
    setRef(generateBookingRef());
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center py-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold bg-gold/10 mb-8"
          >
            <CheckCircle size={36} className="text-gold" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-3xl font-semibold text-ink mb-3">
              Booking confirmed!
            </h1>
            <p className="text-muted mb-6">
              Your booking reference is{' '}
              <span className="font-mono font-semibold text-ink">{ref}</span>
            </p>

            <div className="bg-surface border border-border-line rounded-lg p-6 text-left mb-8">
              <p className="text-sm text-ink leading-relaxed">
                You'll receive a{' '}
                <span className="font-semibold">WhatsApp message within 2 hours</span>{' '}
                to confirm your technician and exact arrival time. Please keep your phone available.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/66800000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg">
                  <MessageCircle size={16} className="mr-2" />
                  Message us now
                </Button>
              </a>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
