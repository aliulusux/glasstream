'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import PopularInner from './popular-inner';

export default function PopularPage() {
  return (
    <Suspense fallback={<div className="text-center text-white/60 p-10 animate-pulse">Loading popular anime...</div>}>
      <PopularInner />
    </Suspense>
  );
}
