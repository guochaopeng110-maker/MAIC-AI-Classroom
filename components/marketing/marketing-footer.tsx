'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/hooks/use-i18n';

export function MarketingFooter() {
  const { t, locale } = useI18n();

  const isZh = locale?.startsWith('zh');
  const manualUrl = isZh ? '/user-manual-zh.md' : '/user-manual-en.md';

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <img
              src="/tdu-logo-horizontal.png"
              alt="TDu AI互动课堂"
              className="h-8 dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t('marketing.footer.desc')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              {t('marketing.footer.product')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400">
                  {t('marketing.nav.features')}
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400">
                  {t('marketing.nav.solutions')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400">
                  {t('marketing.nav.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              {t('marketing.footer.resources')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={manualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  {t('marketing.footer.userManual')}
                </a>
              </li>
              <li>
                <a
                  href="https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  {t('marketing.footer.paper')}
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Support */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              {t('marketing.footer.community')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:pengguochao@tduvr.com"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  pengguochao@tduvr.com
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/p8Pf2r3SaG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400">
                  {t('marketing.nav.about')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between text-zinc-500 dark:text-zinc-500 text-xs">
          <p>{t('marketing.footer.copyright')}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="cursor-default">
              {t('marketing.footer.license')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
