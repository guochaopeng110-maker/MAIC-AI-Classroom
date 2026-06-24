'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useTheme } from '@/lib/hooks/use-theme';
import { LanguageSwitcher } from '@/components/language-switcher';
import { CTAButton } from './cta-button';
import { cn } from '@/lib/utils';

export function MarketingNavbar() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/features', label: t('marketing.nav.features') },
    { href: '/solutions', label: t('marketing.nav.solutions') },
    { href: '/cases', label: t('marketing.nav.cases') },
    { href: '/pricing', label: t('marketing.nav.pricing') },
    { href: '/about', label: t('marketing.nav.about') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        scrolled
          ? 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl saturate-[1.2] shadow-sm shadow-violet-500/[0.02] border-zinc-200/50 dark:border-zinc-800/40 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/tdu-logo-horizontal.png"
            alt="TDu AI互动课堂"
            className="h-7 md:h-8 dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-all"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-semibold transition-colors relative py-1 hover:text-violet-600 dark:hover:text-violet-400',
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-zinc-600 dark:text-zinc-400'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBorder"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <CTAButton href="/app" variant="primary" className="px-5 py-2 text-sm">
            {t('marketing.nav.cta')}
          </CTAButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-3">
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 px-4 pt-2 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-base font-medium py-2 px-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all',
                      isActive
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-950/10'
                        : 'text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <CTAButton
                  href="/app"
                  variant="primary"
                  className="w-full py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('marketing.nav.cta')}
                </CTAButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
