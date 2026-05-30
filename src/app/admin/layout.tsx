'use client';

import { useState } from 'react';
import { PinGate } from '@/components/ui/PinGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PinGate onSuccess={() => setUnlocked(true)} />;
  }

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-center text-xs text-amber-900">
        Phase 1 admin preview: data shown here is mock/sample data behind a local PIN gate, not production authentication or live customer/payment records.
      </div>
      {children}
    </>
  );
}
