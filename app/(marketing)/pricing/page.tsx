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
      features: ['AGPL-3.0 开源源码', '本地离线部署', '自配 LLM Provider API Key', '单用户本地数据库存储'],
      cta: '去 GitHub 部署',
      href: 'https://github.com/THU-MAIC/OpenMAIC',
      variant: 'secondary' as const,
    },
    {
      name: t('pricingPage.pro.name'),
      price: t('pricingPage.pro.price'),
      desc: t('pricingPage.pro.desc'),
      features: ['免配置在线即用', '充足的系统 LLM 额度', '云端课堂数据持久化', '高清课堂导出', '优先支持'],
      cta: '敬请期待',
      href: '/app',
      variant: 'primary' as const,
      popular: true,
    },
    {
      name: t('pricingPage.enterprise.name'),
      price: t('pricingPage.enterprise.price'),
      desc: t('pricingPage.enterprise.desc'),
      features: ['学校私有化服务器部署', '对接教务系统账号体系', '高并发与服务级 SLA 保证', '定制化智能体音色/界面', '专属客服技术支持'],
      cta: '联系我们',
      href: 'mailto:contact@tdu.edu.cn',
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
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border flex flex-col justify-between ${
              plan.popular
                ? 'border-violet-600 dark:border-violet-500 shadow-lg ring-1 ring-violet-600/30'
                : 'border-zinc-100 dark:border-zinc-800'
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                最受欢迎
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
                    <Check size={16} className="text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
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
