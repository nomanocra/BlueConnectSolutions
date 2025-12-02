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

// Hook pour détecter si on est sur mobile
const useIsMobile = () => {
  // Vérifier immédiatement si on est côté client pour éviter le flash
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier immédiatement au montage
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Composant Header Desktop
const HeaderDesktop = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      logoHref = '/',
      links,
      ctaLabel,
      ctaHref,
      onCtaClick,
      contactButtonLabel,
      contactButtonHref,
      onContactClick,
      ...props
    },
    ref
  ) => {
    const headerRef = useRef<HTMLElement>(null);
    const combinedRef = useMemo(() => {
      return (ref || headerRef) as React.RefObject<HTMLElement>;
    }, [ref]);

    const finalCtaLabel = useMemo(() => ctaLabel || contactButtonLabel, [ctaLabel, contactButtonLabel]);
    const finalCtaHref = useMemo(() => ctaHref || contactButtonHref, [ctaHref, contactButtonHref]);
    const finalOnCtaClick = useMemo(() => onCtaClick || onContactClick, [onCtaClick, onContactClick]);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'backdrop-blur-[5px] backdrop-filter bg-background-t80 border border-background-5 border-solid rounded-[24px] w-full relative box-border transition-all duration-300 ease-in-out overflow-hidden',
          className
        )}
        {...props}
      >
        <div className="box-border flex items-center justify-between overflow-clip px-5 py-4 rounded-[inherit]">
          {/* Logo */}
          <NextLink href={logoHref} className="shrink-0">
            <Logo size={32} />
          </NextLink>

          {/* Desktop Navigation Links + CTA Button */}
          <nav className="flex gap-8 items-center shrink-0">
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
        </div>
      </header>
    );
  }
);

HeaderDesktop.displayName = 'HeaderDesktop';

// Composant Header Mobile
const HeaderMobile = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      logoHref = '/',
      links,
      ctaLabel,
      ctaHref,
      onCtaClick,
      contactButtonLabel,
      contactButtonHref,
      onContactClick,
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const combinedRef = useMemo(() => {
      return (ref || headerRef) as React.RefObject<HTMLElement>;
    }, [ref]);

    const finalCtaLabel = useMemo(() => ctaLabel || contactButtonLabel, [ctaLabel, contactButtonLabel]);
    const finalCtaHref = useMemo(() => ctaHref || contactButtonHref, [ctaHref, contactButtonHref]);
    const finalOnCtaClick = useMemo(() => onCtaClick || onContactClick, [onCtaClick, onContactClick]);

    const toggleMobileMenu = useCallback(() => {
      setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
      setIsMobileMenuOpen(false);
    }, []);

    // Fermer le menu lors des clics sur les liens ou changements de route
    useEffect(() => {
      if (!isMobileMenuOpen) return;

      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        
        // Vérifier si le lien est dans le menu mobile
        if (link && combinedRef.current?.contains(link)) {
          const href = link.getAttribute('href');
          
          // Si c'est un lien avec hash (reste sur la même page), fermer le menu immédiatement
          if (href && (href.startsWith('#') || href.includes('#'))) {
            setIsMobileMenuOpen(false);
          } else {
            // Pour les autres liens, fermer aussi le menu
            setIsMobileMenuOpen(false);
          }
        }
      };

      const handleHashChange = () => {
        setIsMobileMenuOpen(false);
      };

      // Utiliser capture phase pour intercepter avant NextLink
      document.addEventListener('click', handleLinkClick, true);
      window.addEventListener('hashchange', handleHashChange);
      
      return () => {
        document.removeEventListener('click', handleLinkClick, true);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, [isMobileMenuOpen, combinedRef]);

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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="shrink-0 text-foreground-main hover:text-foreground-secondary transition-colors p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>

          {/* Mobile Menu - s'affiche dans le Header lui-même */}
          <div
            className={cn(
              'flex flex-col items-end gap-4 px-5 pb-4 transition-all duration-300 ease-in-out overflow-hidden',
              isMobileMenuOpen 
                ? 'max-h-[500px] opacity-100 pointer-events-auto' 
                : 'max-h-0 opacity-0 pb-0 pointer-events-none'
            )}
            onClick={(e) => {
              // Si on clique sur un lien ou un bouton dans le menu, fermer le menu
              const target = e.target as HTMLElement;
              const link = target.closest('a');
              const button = target.closest('button');
              if (link || button) {
                closeMobileMenu();
              }
            }}
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
                    onClick={(e) => {
                      // Fermer le menu immédiatement pour tous les liens, surtout ceux avec hash
                      closeMobileMenu();
                    }}
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
        </div>
      </header>
    );
  }
);

HeaderMobile.displayName = 'HeaderMobile';

// Composant Header principal qui choisit entre Desktop et Mobile
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (props, ref) => {
    const desktopRef = useRef<HTMLElement>(null);
    const mobileRef = useRef<HTMLElement>(null);

    // Transférer la ref au bon composant selon la taille d'écran
    useEffect(() => {
      const updateRef = () => {
        const isMobile = window.innerWidth < 768;
        const targetRef = isMobile ? mobileRef : desktopRef;
        
        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = targetRef.current;
        }
      };

      updateRef();
      window.addEventListener('resize', updateRef);
      return () => window.removeEventListener('resize', updateRef);
    }, [ref]);

    // Toujours rendre les deux composants et masquer/afficher avec CSS pour éviter le flash
    // Les deux headers sont positionnés de manière absolue l'un sur l'autre
    return (
      <div className="relative w-full">
        <HeaderDesktop ref={desktopRef} {...props} className={cn(props.className, 'hidden md:block')} />
        <HeaderMobile ref={mobileRef} {...props} className={cn(props.className, 'block md:hidden')} />
      </div>
    );
  }
);

Header.displayName = 'Header';

export { Header, HeaderDesktop, HeaderMobile };
