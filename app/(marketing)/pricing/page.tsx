'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTAButton } from '@/components/marketing/cta-button';

export default function PricingPage() {
  const { t } = useI18n();

  const plans = [
    {
      name: t('pricingPage.free.name'),
      price: t('pricingPage.free.price'),
      desc: t('pricingPage.free.desc'),
      features: [
        t('pricingPage.free.feat1'),
        t('pricingPage.free.feat2'),
        t('pricingPage.free.feat3'),
        t('pricingPage.free.feat4')
      ],
      cta: t('pricingPage.free.cta'),
      href: '/app',
      variant: 'secondary' as const,
    },
    {
      name: t('pricingPage.pro.name'),
      price: t('pricingPage.pro.price'),
      desc: t('pricingPage.pro.desc'),
      features: [
        t('pricingPage.pro.feat1'),
        t('pricingPage.pro.feat2'),
        t('pricingPage.pro.feat3'),
        t('pricingPage.pro.feat4'),
        t('pricingPage.pro.feat5')
      ],
      cta: t('pricingPage.pro.cta'),
      href: '/app',
      variant: 'primary' as const,
      popular: true,
    },
    {
      name: t('pricingPage.enterprise.name'),
      price: t('pricingPage.enterprise.price'),
      desc: t('pricingPage.enterprise.desc'),
      features: [
        t('pricingPage.enterprise.feat1'),
        t('pricingPage.enterprise.feat2'),
        t('pricingPage.enterprise.feat3'),
        t('pricingPage.enterprise.feat4'),
        t('pricingPage.enterprise.feat5')
      ],
      cta: t('pricingPage.enterprise.cta'),
      href: 'mailto:pengguochao@tduvr.com',
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        tag={t('marketing.nav.pricing')}
        title={t('pricingPage.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.1 }}
            className={`relative p-8 rounded-3xl glass-card glass-card-hover flex flex-col justify-between ${
              plan.popular
                ? 'border-violet-500/50 dark:border-violet-500/40 ring-1 ring-violet-500/20 shadow-xl shadow-violet-500/10 glow-border'
                : 'glow-border-hover'
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-gradient-shift text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md shadow-violet-500/20">
                {t('pricingPage.popular')}
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{plan.name}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{plan.desc}</p>
              </div>

              <div className="flex items-baseline text-zinc-900 dark:text-zinc-50">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
              </div>

              <ul className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Check size={16} className="text-violet-500 dark:text-violet-400 flex-shrink-0 mt-0.5 filter drop-shadow-[0_0_2px_rgba(139,92,246,0.5)]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <CTAButton href={plan.href} variant={plan.variant} className="w-full">
                {plan.cta}
              </CTAButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
