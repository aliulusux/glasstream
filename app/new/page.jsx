'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import NewInner from './new-inner';

export default function NewPage() {
  return (
    <Suspense fallback={<div className="text-center text-white/60 p-10 animate-pulse">Loading this season...</div>}>
      <NewInner />
    </Suspense>
  );
}
