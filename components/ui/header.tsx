'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
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

// Constantes
const MOBILE_BREAKPOINT = 768;
const HEADER_BASE_CLASSES =
  'backdrop-blur-[5px] backdrop-filter bg-background-t80 border border-background-5 border-solid rounded-[24px] w-full relative box-border transition-all duration-300 ease-in-out overflow-hidden';

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
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
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

// Hook pour normaliser les props CTA (nouvelles et dépréciées)
const useNormalizedCta = (props: {
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  contactButtonLabel?: string;
  contactButtonHref?: string;
  onContactClick?: () => void;
}) => {
  return useMemo(
    () => ({
      label: props.ctaLabel || props.contactButtonLabel,
      href: props.ctaHref || props.contactButtonHref,
      onClick: props.onCtaClick || props.onContactClick,
    }),
    [
      props.ctaLabel,
      props.contactButtonLabel,
      props.ctaHref,
      props.contactButtonHref,
      props.onCtaClick,
      props.onContactClick,
    ]
  );
};

// Composant partagé pour le bouton CTA
const CtaButton = React.memo<{
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}>(({ label, href, onClick, className, fullWidth }) => {
  if (!label) return null;

  return href ? (
    <Button
      label={label}
      variant="primary"
      size="S"
      rightIconVariant="arrow-right"
      href={href}
      className={className}
      onClick={onClick}
    />
  ) : (
    <Button
      label={label}
      variant="primary"
      size="S"
      rightIconVariant="arrow-right"
      onClick={onClick}
      className={className}
    />
  );
});

CtaButton.displayName = 'CtaButton';

// Composant partagé pour les liens de navigation
const NavigationLinks = React.memo<{
  links: Array<{ label: string; href: string; selected?: boolean }>;
  onLinkClick?: () => void;
  className?: string;
}>(({ links, onLinkClick, className }) => {
  if (!links || links.length === 0) return null;

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          selected={link.selected}
          className={className}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
});

NavigationLinks.displayName = 'NavigationLinks';

// Composant Header Desktop
const HeaderDesktop = React.forwardRef<HTMLElement, HeaderProps>(
  (props, ref) => {
    const {
      logoHref,
      links,
      ctaLabel,
      ctaHref,
      onCtaClick,
      contactButtonLabel,
      contactButtonHref,
      onContactClick,
      className,
      ...domProps
    } = props;

    const cta = useNormalizedCta(props);

    return (
      <header
        ref={ref}
        className={cn(HEADER_BASE_CLASSES, className)}
        {...domProps}
      >
        <div className="box-border flex items-center justify-between overflow-clip px-5 py-4 rounded-[inherit]">
          <NextLink href={logoHref || '/'} className="shrink-0">
            <Logo size={32} />
          </NextLink>

          <nav className="flex gap-8 items-center shrink-0">
            <NavigationLinks links={links} className="shrink-0" />
            <CtaButton
              label={cta.label}
              href={cta.href}
              onClick={cta.onClick}
              className="shrink-0"
            />
          </nav>
        </div>
      </header>
    );
  }
);

HeaderDesktop.displayName = 'HeaderDesktop';

// Composant Header Mobile
const HeaderMobile = React.forwardRef<HTMLElement, HeaderProps>(
  (props, ref) => {
    const {
      logoHref,
      links,
      ctaLabel,
      ctaHref,
      onCtaClick,
      contactButtonLabel,
      contactButtonHref,
      onContactClick,
      className,
      ...domProps
    } = props;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const cta = useNormalizedCta(props);

    // Combiner ref externe et interne
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(headerRef.current);
        return () => ref(null);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current =
          headerRef.current;
        return () => {
          (ref as React.MutableRefObject<HTMLElement | null>).current = null;
        };
      }
    }, [ref]);

    const closeMobileMenu = useCallback(() => {
      setIsMobileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
      setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
      closeMobileMenu();
    }, [closeMobileMenu]);

    // Fermer le menu lors des clics sur les liens avec hash ou changements de hash
    useEffect(() => {
      if (!isMobileMenuOpen) return;

      const handleDocumentClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        // Vérifier si le lien est dans le menu mobile et a un hash
        if (link && headerRef.current?.contains(link)) {
          const href = link.getAttribute('href');
          // Détecter les liens avec hash (#home, #our-solutions, etc.)
          if (
            href &&
            (href === '#home' ||
              href === '#our-solutions' ||
              href.startsWith('#'))
          ) {
            // Fermer le menu immédiatement pour les liens avec hash
            // Utiliser setTimeout pour s'assurer que cela se produit après le preventDefault
            setTimeout(() => {
              closeMobileMenu();
            }, 0);
          }
        }
      };

      const handleHashChange = () => {
        setIsMobileMenuOpen(false);
      };

      // Utiliser capture phase pour intercepter avant le listener de la page
      // L'ordre d'exécution en phase de capture est inversé (du parent vers l'enfant)
      // Donc ce listener s'exécutera après celui de la page, mais on peut quand même fermer le menu
      document.addEventListener('click', handleDocumentClick, true);
      window.addEventListener('hashchange', handleHashChange);

      return () => {
        document.removeEventListener('click', handleDocumentClick, true);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, [isMobileMenuOpen, closeMobileMenu]);

    return (
      <header
        ref={headerRef}
        className={cn(HEADER_BASE_CLASSES, className)}
        {...domProps}
      >
        <div className="flex flex-col">
          {/* Top bar avec Logo et Menu */}
          <div className="box-border flex items-center justify-between overflow-clip px-5 py-4 rounded-[inherit]">
            <NextLink href={logoHref || '/'} className="shrink-0">
              <Logo size={32} />
            </NextLink>

            <button
              onClick={toggleMobileMenu}
              className="shrink-0 text-foreground-main hover:text-foreground-secondary transition-colors p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'flex flex-col items-end gap-4 px-5 pb-4 transition-all duration-300 ease-in-out overflow-hidden',
              isMobileMenuOpen
                ? 'max-h-[500px] opacity-100 pointer-events-auto'
                : 'max-h-0 opacity-0 pb-0 pointer-events-none'
            )}
          >
            <NavigationLinks
              links={links}
              onLinkClick={handleLinkClick}
              className="shrink-0"
            />
            <CtaButton
              label={cta.label}
              href={cta.href}
              onClick={() => {
                cta.onClick?.();
                closeMobileMenu();
              }}
              className="shrink-0 w-full"
            />
          </div>
        </div>
      </header>
    );
  }
);

HeaderMobile.displayName = 'HeaderMobile';

// Composant Header principal qui choisit entre Desktop et Mobile
const Header = React.forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);

  // Transférer la ref au bon composant selon la taille d'écran (avec debounce pour performance)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateRef = () => {
      // Clear le timeout précédent pour debounce
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
        const targetRef = isMobile ? mobileRef : desktopRef;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current =
            targetRef.current;
        }
      }, 100); // Debounce de 100ms
    };

    updateRef();
    window.addEventListener('resize', updateRef, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateRef);
    };
  }, [ref]);

  // Toujours rendre les deux composants et masquer/afficher avec CSS pour éviter le flash
  return (
    <div className="relative w-full">
      <HeaderDesktop
        ref={desktopRef}
        {...props}
        className={cn(props.className, 'hidden md:block')}
      />
      <HeaderMobile
        ref={mobileRef}
        {...props}
        className={cn(props.className, 'block md:hidden')}
      />
    </div>
  );
});

Header.displayName = 'Header';

export { Header, HeaderDesktop, HeaderMobile };
