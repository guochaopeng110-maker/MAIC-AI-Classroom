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
          className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl space-y-4"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
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
          transition={{ delay: 0.1 }}
          className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl space-y-4"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
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
              阅读学术论文 &rarr;
            </a>
          </p>
        </motion.div>
      </div>

      {/* Team (Placeholders) */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-10 h-10 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto">
            <Users size={20} />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">核心研发团队</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">由清华大学多智能体研究团队及开源社区贡献者联合开发</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: '李教授', role: '课题组负责人 / 学术指导' },
            { name: '王博士', role: '多智能体系统核心架构师' },
            { name: '张工', role: '平台全栈主开发' },
            { name: '社区贡献者', role: '开源生态建设者' },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 text-center space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/50 dark:border-zinc-800/50"
            >
              <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto text-xl font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{member.name}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partners / Academic support */}
      <div className="space-y-12 bg-zinc-50/30 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center gap-2 text-violet-600 dark:text-violet-400">
          <Award size={18} />
          <span className="text-sm font-semibold tracking-wider uppercase">学术支持与合作单位</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
          <span className="text-lg font-extrabold tracking-widest text-zinc-400 dark:text-zinc-600">清华大学</span>
          <span className="text-lg font-extrabold tracking-widest text-zinc-400 dark:text-zinc-600">智能技术与系统国家重点实验室</span>
          <span className="text-lg font-extrabold tracking-widest text-zinc-400 dark:text-zinc-600">JCST 编辑部</span>
        </div>
      </div>
    </div>
  );
}
