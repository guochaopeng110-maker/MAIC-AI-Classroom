'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, Compass, Award } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <SectionHeading
        tag={t('marketing.nav.about')}
        title={t('aboutPage.subtitle')}
      />

      {/* Vision & Origin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="p-8 glass-card glass-card-hover glow-border-hover rounded-3xl space-y-4"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100/50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner shadow-violet-500/10">
            <Compass size={24} />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('aboutPage.vision.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t('aboutPage.vision.desc')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          className="p-8 glass-card glass-card-hover glow-border-hover rounded-3xl space-y-4"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100/50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner shadow-violet-500/10">
            <BookOpen size={24} />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('aboutPage.academic.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {t('aboutPage.academic.desc')}
            <br />
            <a
              href="https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:underline mt-2 inline-block font-semibold"
            >
              {t('aboutPage.academic.readPaper')}
            </a>
          </p>
        </motion.div>
      </div>

      {/* Team (Placeholders) */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-10 h-10 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto shadow-inner shadow-violet-500/10">
            <Users size={20} />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{t('aboutPage.team.title')}</h3>
          {t('aboutPage.team.desc') && (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{t('aboutPage.team.desc')}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: t('aboutPage.team.member1.name'), role: t('aboutPage.team.member1.role') },
            { name: t('aboutPage.team.member2.name'), role: t('aboutPage.team.member2.role') },
            { name: t('aboutPage.team.member3.name'), role: t('aboutPage.team.member3.role') },
            { name: t('aboutPage.team.member4.name'), role: t('aboutPage.team.member4.role') },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.05 }}
              className="p-6 text-center space-y-3 glass-card glass-card-hover glow-border-hover rounded-2xl transition-all duration-300 shadow-sm group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 p-[2px] mx-auto shadow-md shadow-violet-500/10 transition-transform duration-500 group-hover:rotate-180">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center text-violet-600 dark:text-violet-400 text-xl font-bold transition-colors">
                  {member.name.charAt(0)}
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{member.name}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
