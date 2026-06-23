'use client';

import React from 'react';
import { AccessCodeGuard } from '@/components/access-code-guard';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AccessCodeGuard>
      {children}
    </AccessCodeGuard>
  );
}
