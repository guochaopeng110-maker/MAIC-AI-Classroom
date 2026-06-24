'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ tag, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-950/20 rounded-full border border-violet-100 dark:border-violet-900/50 uppercase mb-3 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.2]"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-50">
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
