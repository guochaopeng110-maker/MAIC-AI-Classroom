'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Brain, FileDown, MessageSquare, Terminal, RefreshCw, Cpu } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';

export default function FeaturesPage() {
  const { t } = useI18n();

  const features = [
    {
      icon: <Brain size={32} />,
      title: t('featuresPage.engine.title'),
      desc: t('featuresPage.engine.desc'),
    },
    {
      icon: <MessageSquare size={32} />,
      title: t('featuresPage.classroom.title'),
      desc: t('featuresPage.classroom.desc'),
    },
    {
      icon: <Cpu size={32} />,
      title: t('marketing.valueProps.interactions.title'),
      desc: t('featuresPage.interactives.desc'),
    },
    {
      icon: <Terminal size={32} />,
      title: t('featuresPage.pbl.title'),
      desc: t('featuresPage.pbl.desc'),
    },
    {
      icon: <RefreshCw size={32} />,
      title: t('featuresPage.integration.title'),
      desc: t('featuresPage.integration.desc'),
    },
    {
      icon: <FileDown size={32} />,
      title: t('marketing.valueProps.export.title'),
      desc: t('marketing.valueProps.export.desc'),
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        tag={t('featuresPage.title')}
        title={t('featuresPage.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl space-y-4 hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{feat.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
