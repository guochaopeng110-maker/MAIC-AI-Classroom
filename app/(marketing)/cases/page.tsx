'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTAButton } from '@/components/marketing/cta-button';

export default function CasesPage() {
  const { t } = useI18n();

  const cases = [
    {
      title: t('casesPage.list.case1.title'),
      desc: t('casesPage.list.case1.desc'),
      tag: t('casesPage.list.case1.tag'),
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: t('casesPage.list.case2.title'),
      desc: t('casesPage.list.case2.desc'),
      tag: t('casesPage.list.case2.tag'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('casesPage.list.case3.title'),
      desc: t('casesPage.list.case3.desc'),
      tag: t('casesPage.list.case3.tag'),
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        tag={t('marketing.nav.cases')}
        title={t('casesPage.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((cs, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-violet-500/20 transition-all shadow-sm hover:shadow-md"
          >
            {/* Visual Header */}
            <div className={`h-40 bg-gradient-to-br ${cs.color} p-6 flex flex-col justify-between text-white`}>
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max">
                {cs.tag}
              </span>
              <h4 className="text-xl font-bold line-clamp-2">{cs.title}</h4>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {cs.desc}
              </p>
              <div className="pt-4">
                <CTAButton href="/app" variant="secondary" className="w-full text-xs py-2">
                  开始生成类似课堂
                </CTAButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
