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
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md cursor-pointer',
        isPrimary
          ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] text-white shadow-violet-500/20 hover:animate-gradient-shift hover:shadow-lg hover:shadow-violet-600/30'
          : 'bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-950 dark:text-white',
        className
      )}
    >
      {children}
    </MotionLink>
  );
}
