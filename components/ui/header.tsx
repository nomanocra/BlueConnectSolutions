'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Link } from './link';
import { Button } from './button';

export interface HeaderProps {
  className?: string;
  logoHref?: string;
  // Liens de navigation (doivent être passés en paramètres, pas de valeur par défaut)
  links?: Array<{
    label: string;
    href: string;
    selected?: boolean;
  }>;
  // Call-to-Action (bouton séparé des liens de navigation)
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  // Props dépréciées (pour compatibilité)
  /** @deprecated Use ctaLabel instead */
  contactButtonLabel?: string;
  /** @deprecated Use ctaHref instead */
  contactButtonHref?: string;
  /** @deprecated Use onCtaClick instead */
  onContactClick?: () => void;
}

// Icône hamburger menu - mémorisé pour éviter les re-renders inutiles
const MenuIcon = React.memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200"
      aria-hidden="true"
    >
      {isOpen ? (
        // Icône X (fermer)
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        // Icône hamburger (3 lignes)
        <path
          d="M3 12H21M3 6H21M3 18H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
});

MenuIcon.displayName = 'MenuIcon';

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      logoHref = '/',
      links,
      ctaLabel,
      ctaHref,
      onCtaClick,
      // Props dépréciées pour compatibilité
      contactButtonLabel,
      contactButtonHref,
      onContactClick,
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    
    // Combiner ref externe et ref interne
    const combinedRef = useMemo(() => {
      return (ref || headerRef) as React.RefObject<HTMLElement>;
    }, [ref]);

    // Utiliser les nouvelles props ou les anciennes pour compatibilité - mémorisé
    const finalCtaLabel = useMemo(() => ctaLabel || contactButtonLabel, [ctaLabel, contactButtonLabel]);
    const finalCtaHref = useMemo(() => ctaHref || contactButtonHref, [ctaHref, contactButtonHref]);
    const finalOnCtaClick = useMemo(() => onCtaClick || onContactClick, [onCtaClick, onContactClick]);

    // Surveiller la largeur du composant Header
    useEffect(() => {
      const headerElement = combinedRef.current;
      if (!headerElement) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          const shouldBeMobile = width < 620;
          
          setIsMobileView(shouldBeMobile);
          
          // Fermer le menu mobile si on passe en desktop
          if (!shouldBeMobile) {
            setIsMobileMenuOpen(false);
          }
        }
      });

      resizeObserver.observe(headerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [combinedRef]);

    // Mémoriser les callbacks pour éviter les re-renders
    const toggleMobileMenu = useCallback(() => {
      setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
      setIsMobileMenuOpen(false);
    }, []);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'backdrop-blur-[5px] backdrop-filter bg-background-t80 border border-background-5 border-solid rounded-[24px] w-full relative box-border transition-all duration-300 ease-in-out overflow-hidden',
          className
        )}
        {...props}
      >
        <div className="flex flex-col">
          {/* Top bar avec Logo et Menu */}
          <div className="box-border flex items-center justify-between overflow-clip px-5 py-4 rounded-[inherit]">
          {/* Logo */}
          <NextLink href={logoHref} className="shrink-0">
            <Logo size={32} />
          </NextLink>

          {/* Desktop Navigation Links + CTA Button */}
          <nav className={cn('flex gap-8 items-center shrink-0', isMobileView && 'hidden')}>
            {/* Liens de navigation */}
            {links && links.length > 0 && (
              <>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    selected={link.selected}
                    className="shrink-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {/* Call-to-Action Button (séparé des liens) */}
            {finalCtaLabel && (
              <>
                {finalCtaHref ? (
                  <Button
                    label={finalCtaLabel}
                    variant="primary"
                    size="S"
                    rightIconVariant="arrow-right"
                    href={finalCtaHref}
                    className="shrink-0"
                  />
                ) : (
                  <Button
                    label={finalCtaLabel}
                    variant="primary"
                    size="S"
                    rightIconVariant="arrow-right"
                    onClick={finalOnCtaClick}
                    className="shrink-0"
                  />
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          {isMobileView && (
            <button
              onClick={toggleMobileMenu}
              className="shrink-0 text-foreground-main hover:text-foreground-secondary transition-colors p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          )}
        </div>

          {/* Mobile Menu - s'affiche dans le Header lui-même */}
          {isMobileView && (
            <div
              className={cn(
                'flex flex-col items-end gap-4 px-5 pb-4 transition-all duration-300 ease-in-out overflow-hidden',
                isMobileMenuOpen 
                  ? 'max-h-[500px] opacity-100 pointer-events-auto' 
                  : 'max-h-0 opacity-0 pb-0 pointer-events-none'
              )}
            >
              {/* Liens de navigation alignés à droite */}
              {links && links.length > 0 && (
                <>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      selected={link.selected}
                      className="shrink-0"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              {/* Call-to-Action Button à la fin */}
              {finalCtaLabel && (
                <>
                  {finalCtaHref ? (
                    <Button
                      label={finalCtaLabel}
                      variant="primary"
                      size="S"
                      rightIconVariant="arrow-right"
                      href={finalCtaHref}
                      className="shrink-0 w-full"
                      onClick={closeMobileMenu}
                    />
                  ) : (
                    <Button
                      label={finalCtaLabel}
                      variant="primary"
                      size="S"
                      rightIconVariant="arrow-right"
                      onClick={() => {
                        finalOnCtaClick?.();
                        closeMobileMenu();
                      }}
                      className="shrink-0 w-full"
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };

