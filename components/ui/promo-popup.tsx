'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n';
import { Button } from './button';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PromoPopup = () => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[9998] flex items-center justify-center px-4',
        'transition-opacity duration-300',
        isClosing ? 'opacity-0' : 'opacity-100'
      )}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Popup */}
      <div
        className={cn(
          'relative w-full max-w-lg rounded-2xl overflow-hidden',
          'border border-background-5',
          'shadow-2xl shadow-primary-3/10',
          'transition-all duration-300',
          isClosing
            ? 'scale-95 translate-y-4'
            : 'scale-100 translate-y-0 animate-[slideUp_0.4s_ease-out]'
        )}
        style={{
          background: 'linear-gradient(to top left, rgba(4,6,10,0.98) 0%, rgba(6,10,15,0.98) 40%, rgba(10,14,20,0.98) 80%, rgba(15,20,28,0.98) 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent gradient top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-5 via-primary-3 to-primary-1" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-foreground-terciary hover:text-foreground-main hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="px-6 pt-6 pb-7 md:px-8 md:pt-8 md:pb-9">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-t10 border border-primary-t20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-3 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-2" />
            </span>
            <span className="text-text-xs font-semibold text-primary-1 uppercase tracking-wider">
              {t.promo.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-title-3 text-foreground-main mb-3">
            {t.promo.title}
          </h2>

          {/* Description */}
          <p className="text-text-m text-foreground-secondary leading-relaxed mb-6">
            {t.promo.description}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="https://www.smartconnectiot.com/smartboitier"
              label={t.promo.cta}
              variant="primary"
              size="M"
              rightIconVariant="arrow-up-right"
              {...{ target: '_blank', rel: 'noopener noreferrer' }}
            />
            <Button
              label={t.promo.dismiss}
              variant="ghost"
              size="M"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
