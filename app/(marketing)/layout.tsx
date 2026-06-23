'use client';

import React from 'react';
import { MarketingNavbar } from '@/components/marketing/marketing-navbar';
import { MarketingFooter } from '@/components/marketing/marketing-footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <MarketingNavbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
