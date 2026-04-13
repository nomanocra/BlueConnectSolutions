'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/lib/i18n';
import { Button } from './button';

const STORAGE_KEY = 'hidePromoBanner';

interface PromoBannerProps {
  onClose: () => void;
}

const ServerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
    <rect x="3" y="3" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="15" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="9" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="7" cy="6" r="1" fill="currentColor"/>
    <circle cx="10" cy="6" r="1" fill="currentColor"/>
    <circle cx="7" cy="12" r="1" fill="currentColor"/>
    <circle cx="10" cy="12" r="1" fill="currentColor"/>
    <circle cx="7" cy="18" r="1" fill="currentColor"/>
    <circle cx="10" cy="18" r="1" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function shouldShowPromoBanner(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(STORAGE_KEY) !== 'true';
}

export const PromoBanner = ({ onClose }: PromoBannerProps) => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showModal || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableEls = modal.querySelectorAll<HTMLElement>('button, a[href]');
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        return;
      }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const handleDontShowAgain = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onClose();
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-primary-5 via-primary-3 to-primary-5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3">
          {/* Desktop: one row / Mobile: text+close top, CTA bottom */}
          <div className="flex items-center gap-4">
            {/* Server icon */}
            <div className="text-white/80 hidden sm:block">
              <ServerIcon />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-text-s md:text-text-m text-white font-bold">
                {t.promo.title}
              </p>
              <p className="text-text-xs md:text-text-s text-white/70">
                {t.promo.description}
              </p>
            </div>

            {/* CTA button - desktop only */}
            <div className="shrink-0 hidden sm:block">
              <Button
                label={t.promo.cta}
                variant="outline"
                size="S"
                rightIconVariant="open-in-new"
                href="https://www.smartconnectiot.com/smartboitier"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowModal(true)}
              className="shrink-0 p-3 -m-1.5 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={t.promo.close}
            >
              <CloseIcon />
            </button>
          </div>

          {/* CTA button - mobile only, below text */}
          <div className="sm:hidden mt-2">
            <Button
              label={t.promo.cta}
              variant="outline"
              size="XS"
              rightIconVariant="open-in-new"
              href="https://www.smartconnectiot.com/smartboitier"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-modal-title"
            className="relative w-full max-w-sm rounded-2xl border border-background-5 p-6 shadow-2xl"
            style={{
              background: 'linear-gradient(to top left, rgba(4,6,10,0.98) 0%, rgba(6,10,15,0.98) 40%, rgba(10,14,20,0.98) 80%, rgba(15,20,28,0.98) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p id="promo-modal-title" className="text-text-m text-foreground-main font-medium mb-6 text-center">
              {t.promo.title}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 min-h-[44px] rounded-[6px] bg-primary-3 hover:bg-primary-2 text-foreground-main text-text-s font-medium transition-colors cursor-pointer"
              >
                {t.promo.close}
              </button>
              <button
                onClick={handleDontShowAgain}
                className="w-full py-2.5 px-4 min-h-[44px] rounded-[6px] border border-background-5 hover:bg-white/5 text-foreground-secondary hover:text-foreground-main text-text-s font-medium transition-colors cursor-pointer"
              >
                {t.promo.dontShowAgain}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
