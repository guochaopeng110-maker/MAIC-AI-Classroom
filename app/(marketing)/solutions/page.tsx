'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTAButton } from '@/components/marketing/cta-button';

export default function SolutionsPage() {
  const { t } = useI18n();

  const painpoints = [
    t('solutionsPage.painpoint.item1'),
    t('solutionsPage.painpoint.item2'),
    t('solutionsPage.painpoint.item3'),
  ];

  const scenarios = [
    {
      title: '理工科实验课',
      desc: t('solutionsPage.cases.science'),
    },
    {
      title: '社科人文讨论课',
      desc: t('solutionsPage.cases.humanities'),
    },
    {
      title: '通识课翻转课堂',
      desc: t('solutionsPage.cases.general'),
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Heading */}
      <SectionHeading
        tag={t('solutionsPage.title')}
        title={t('solutionsPage.subtitle')}
      />

      {/* Painpoints vs Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('solutionsPage.painpoint.title')}
          </h3>
          <div className="space-y-4">
            {painpoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-red-500 mt-1 flex-shrink-0">✕</div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-violet-600 text-white space-y-6 shadow-xl shadow-violet-500/10"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <GraduationCap size={24} />
          </div>
          <h3 className="text-2xl font-bold">{t('solutionsPage.solution.title')}</h3>
          <p className="text-zinc-100 text-sm leading-relaxed">{t('solutionsPage.solution.desc')}</p>
        </motion.div>
      </div>

      {/* Scenarios */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('solutionsPage.cases.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">如何将平台落地在日常高校的多个教研活动中</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenarios.map((sc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">场景 {idx + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{sc.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{sc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <CTAButton href="/app" variant="primary">
          立即部署/体验高校方案
        </CTAButton>
      </div>
    </div>
  );
}
