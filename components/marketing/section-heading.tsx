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
          className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 rounded-full uppercase mb-3"
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-zinc-600 dark:text-zinc-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
