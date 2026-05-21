'use client';

import { useState } from 'react';
import { PinGate } from '@/components/ui/PinGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PinGate onSuccess={() => setUnlocked(true)} />;
  }

  return <>{children}</>;
}
