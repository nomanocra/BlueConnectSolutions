'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';

// Drapeau français
const FrenchFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="2" fill="#F0F0F0"/>
    <rect width="6.67" height="14" fill="#002395"/>
    <rect x="13.33" width="6.67" height="14" fill="#ED2939"/>
  </svg>
);

// Drapeau anglais (UK)
const EnglishFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="2" fill="#012169"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="2.5"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5"/>
    <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="4"/>
    <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.5"/>
  </svg>
);

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = React.memo<LanguageSwitcherProps>(
  ({ className }) => {
    const { locale, setLocale } = useLocale();

    const toggleLocale = () => {
      setLocale(locale === 'en' ? 'fr' : 'en');
    };

    return (
      <button
        onClick={toggleLocale}
        className={cn(
          'flex items-center justify-center p-2 rounded-full',
          'hover:bg-white/10',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-3/20',
          className
        )}
        aria-label={`Switch to ${locale === 'en' ? 'French' : 'English'}`}
        title={locale === 'en' ? 'Passer en Français' : 'Switch to English'}
      >
        <div className="relative w-5 h-3.5 overflow-hidden rounded-sm">
          {locale === 'en' ? <EnglishFlag /> : <FrenchFlag />}
        </div>
      </button>
    );
  }
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
