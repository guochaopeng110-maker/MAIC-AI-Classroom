'use client';

import React from 'react';
import { motion } from 'motion/react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-6 glass-card glass-card-hover glow-border-hover rounded-2xl transition-all duration-300 flex flex-col items-start"
    >
      <div className="p-3 bg-violet-100/50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl mb-4 shadow-inner shadow-violet-500/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
