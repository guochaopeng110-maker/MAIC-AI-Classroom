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
      title: t('solutionsPage.cases.scienceTitle'),
      desc: t('solutionsPage.cases.science'),
    },
    {
      title: t('solutionsPage.cases.humanitiesTitle'),
      desc: t('solutionsPage.cases.humanities'),
    },
    {
      title: t('solutionsPage.cases.generalTitle'),
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
              <div key={idx} className="flex items-start gap-3 p-4 glass-card rounded-2xl border border-red-500/10 dark:border-red-500/5 hover:border-red-500/20 transition-all shadow-[0_0_15px_rgba(239,68,68,0.02)]">
                <div className="text-red-500 mt-0.5 flex-shrink-0">✕</div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600 text-white space-y-6 shadow-2xl shadow-violet-500/20 border border-violet-400/20 glow-border bg-[length:200%_auto] hover:animate-gradient-shift transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <GraduationCap size={24} />
          </div>
          <h3 className="text-2xl font-bold">{t('solutionsPage.solution.title')}</h3>
          <p className="text-zinc-100 text-sm leading-relaxed">{t('solutionsPage.solution.desc')}</p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-12 glass-card rounded-3xl p-8 md:p-12 space-y-10 glow-border">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('solutionsPage.stats.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {t('solutionsPage.stats.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: num * 0.05 }}
              className="p-6 glass-card glass-card-hover glow-border-hover rounded-2xl text-center space-y-2 shadow-inner shadow-violet-500/[0.02]"
            >
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 block">
                {t(`solutionsPage.stats.metric${num}.value`)}
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                {t(`solutionsPage.stats.metric${num}.label`)}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t(`solutionsPage.stats.metric${num}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('solutionsPage.cases.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {t('solutionsPage.cases.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenarios.map((sc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.1 }}
              className="p-6 glass-card glass-card-hover glow-border-hover rounded-2xl flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {t('solutionsPage.cases.scenarioLabel', { number: idx + 1 })}
                  </span>
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
          {t('solutionsPage.cta')}
        </CTAButton>
      </div>
    </div>
  );
}
