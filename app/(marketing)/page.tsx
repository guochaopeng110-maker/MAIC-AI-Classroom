'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Cpu, FileUp, Play, ArrowRight, Layers, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { CTAButton } from '@/components/marketing/cta-button';
import { FeatureCard } from '@/components/marketing/feature-card';
import { SectionHeading } from '@/components/marketing/section-heading';

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden pb-16 dot-grid-bg">
      {/* Decorative background glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-violet-500/10 dark:bg-violet-600/5 blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-[160px] pointer-events-none animate-pulse-slow [animation-delay:2s]" />
      <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[45%] rounded-full bg-purple-500/10 dark:bg-purple-600/5 blur-[140px] pointer-events-none animate-pulse-slow [animation-delay:4s]" />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-50/50 dark:bg-violet-950/20 rounded-full border border-violet-100 dark:border-violet-900/50 shadow-[0_0_15px_rgba(139,92,246,0.05)]">
              <Sparkles size={12} />
              {t('marketing.hero.badge')}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-[length:200%_auto] animate-gradient-shift">
                {t('marketing.hero.title')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t('marketing.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <CTAButton href="/app" variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">
                {t('marketing.hero.ctaStart')}
                <ArrowRight size={18} className="ml-2" />
              </CTAButton>
              <CTAButton href="/features" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
                {t('marketing.hero.ctaMore')}
              </CTAButton>
            </div>
          </motion.div>

          {/* Interactive Screen/App Demo Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="relative overflow-hidden rounded-xl aspect-video border border-zinc-200 dark:border-zinc-800 bg-zinc-900 flex items-center justify-center">
              <img
                src="/logos/logo.png"
                alt="Demo App Screenshot"
                className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 filter blur-[2px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-4 p-8 text-center max-w-lg">
                <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/30 cursor-pointer hover:scale-105 transition-all">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('marketing.hero.demoTitle')}</h3>
                <p className="text-sm text-zinc-300">{t('marketing.hero.demoDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-zinc-100 dark:border-zinc-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag={t('marketing.valueProps.title')}
            title={t('marketing.valueProps.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileUp size={24} />}
              title={t('marketing.valueProps.generator.title')}
              description={t('marketing.valueProps.generator.desc')}
              delay={0.1}
            />
            <FeatureCard
              icon={<Brain size={24} />}
              title={t('marketing.valueProps.agents.title')}
              description={t('marketing.valueProps.agents.desc')}
              delay={0.2}
            />
            <FeatureCard
              icon={<Cpu size={24} />}
              title={t('marketing.valueProps.interactions.title')}
              description={t('marketing.valueProps.interactions.desc')}
              delay={0.3}
            />
            <FeatureCard
              icon={<Layers size={24} />}
              title={t('marketing.valueProps.export.title')}
              description={t('marketing.valueProps.export.desc')}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How it Works / Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag={t('marketing.steps.title')}
            title={t('marketing.steps.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step lines connecting items */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 bg-[length:200%_auto] animate-gradient-shift -z-10 opacity-60" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-violet-500/30 glow-border">
                1
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t('marketing.steps.step1')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">{t('marketing.steps.step1Desc')}</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-violet-500/30 glow-border">
                2
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t('marketing.steps.step2')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">{t('marketing.steps.step2Desc')}</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-violet-500/30 animate-glow-pulse">
                3
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t('marketing.steps.step3')}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">{t('marketing.steps.step3Desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-violet-950 to-indigo-950 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl shadow-violet-500/15 border border-violet-500/20 glow-border"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('marketing.cta.title')}</h2>
              <p className="text-zinc-200 text-base md:text-lg">
                {t('marketing.cta.desc')}
              </p>
              <div className="pt-4">
                <CTAButton href="/app" variant="primary" className="bg-white hover:bg-zinc-100 text-zinc-950 px-8 py-4 shadow-lg shadow-black/20">
                  {t('marketing.cta.button')}
                  <ArrowUpRight size={18} className="ml-2 text-zinc-900" />
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
