'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useLocale, type Locale } from '@/lib/i18n';

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

// Chevron icon
const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Close icon for modal
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const flags: Record<Locale, { flag: React.ReactNode; label: string }> = {
  en: { flag: <EnglishFlag />, label: 'English' },
  fr: { flag: <FrenchFlag />, label: 'Français' },
};

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'modal';
}

export const LanguageSwitcher = React.memo<LanguageSwitcherProps>(
  ({ className, variant = 'dropdown' }) => {
    const { locale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside (only for dropdown variant)
    useEffect(() => {
      if (variant !== 'dropdown') return;

      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [variant]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (variant === 'modal' && isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [variant, isOpen]);

    const handleSelect = (newLocale: Locale) => {
      setLocale(newLocale);
      setIsOpen(false);
    };

    const triggerButton = (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-lg',
          'hover:bg-white/10',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-3/20'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup={variant === 'dropdown' ? 'listbox' : 'dialog'}
      >
        <div className="w-5 h-3.5 overflow-hidden rounded-sm">
          {flags[locale].flag}
        </div>
        <ChevronDown isOpen={isOpen} />
      </button>
    );

    const languageOptions = (Object.keys(flags) as Locale[]).map((lang) => (
      <button
        key={lang}
        onClick={() => handleSelect(lang)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3',
          'text-left text-text-s',
          'transition-colors duration-150',
          locale === lang
            ? 'text-foreground-main bg-white/5'
            : 'text-foreground-secondary hover:text-foreground-main hover:bg-white/5'
        )}
        role="option"
        aria-selected={locale === lang}
      >
        <div className="w-5 h-3.5 overflow-hidden rounded-sm">
          {flags[lang].flag}
        </div>
        <span>{flags[lang].label}</span>
        {locale === lang && (
          <svg
            className="ml-auto w-4 h-4 text-primary-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    ));

    // Modal variant for mobile (uses Portal to render outside header)
    if (variant === 'modal') {
      const modalContent = isOpen && typeof document !== 'undefined' ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className={cn(
              'relative w-full max-w-md mx-4 mb-4 rounded-2xl',
              'border border-background-5',
              'animate-in slide-in-from-bottom duration-200'
            )}
            style={{
              background: 'linear-gradient(to top left, rgba(4,6,10,0.98) 0%, rgba(6,10,15,0.98) 40%, rgba(10,14,20,0.98) 80%, rgba(15,20,28,0.98) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Select language"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-background-5">
              <span className="text-text-m font-medium text-foreground-main">
                {locale === 'fr' ? 'Choisir la langue' : 'Select language'}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-foreground-secondary hover:text-foreground-main transition-colors"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Options */}
            <div className="py-2" role="listbox">
              {languageOptions}
            </div>
          </div>
        </div>,
        document.body
      ) : null;

      return (
        <div className={cn('relative', className)}>
          {triggerButton}
          {modalContent}
        </div>
      );
    }

    // Dropdown variant for desktop
    return (
      <div ref={dropdownRef} className={cn('relative', className)}>
        {triggerButton}

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className={cn(
              'absolute top-full right-0 mt-2 py-1',
              'min-w-[140px] rounded-lg',
              'border border-background-5',
              'shadow-lg',
              'z-50'
            )}
            style={{
              background: 'linear-gradient(to top left, rgba(4,6,10,0.98) 0%, rgba(6,10,15,0.98) 40%, rgba(10,14,20,0.98) 80%, rgba(15,20,28,0.98) 100%)',
              backdropFilter: 'blur(12px)',
            }}
            role="listbox"
          >
            {languageOptions}
          </div>
        )}
      </div>
    );
  }
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
