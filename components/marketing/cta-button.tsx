'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

const MotionLink = motion(Link);

export function CTAButton({ href, children, variant = 'primary', className, onClick }: CTAButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <MotionLink
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md cursor-pointer',
        isPrimary
          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-violet-500/20'
          : 'bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 text-zinc-950 dark:text-white',
        className
      )}
    >
      {children}
    </MotionLink>
  );
}
