'use client';

import { useState, useEffect, useMemo } from 'react';
import { Logos } from '@/components/ui';

// Constantes pour les breakpoints
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

// Configuration des espacements par breakpoint
const SPACING_CONFIG = {
  mobile: { gap: 100, paddingX: 20 },
  tablet: { gap: 150, paddingX: 60 },
  desktop: { gap: 200, paddingX: 80 },
} as const;

// Hook pour calculer les espacements selon la largeur de l'écran
const useResponsiveSpacing = () => {
  // Toujours commencer avec les valeurs desktop pour éviter les erreurs d'hydratation
  // Les valeurs seront mises à jour après le montage côté client
  const [width, setWidth] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marquer comme monté et définir la largeur initiale
    setMounted(true);
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce pour éviter trop de re-renders
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted]);

  return useMemo(() => {
    // Si pas encore monté ou width null, utiliser les valeurs desktop (par défaut)
    if (!mounted || width === null) {
      return SPACING_CONFIG.desktop;
    }

    if (width < MOBILE_BREAKPOINT) {
      return SPACING_CONFIG.mobile;
    } else if (width < TABLET_BREAKPOINT) {
      return SPACING_CONFIG.tablet;
    }
    return SPACING_CONFIG.desktop;
  }, [width, mounted]);
};

export function LogosSection() {
  const spacing = useResponsiveSpacing();

  return (
    <section className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[40px] items-center justify-end px-0 py-[80px]">
          {/* Title */}
          <p className="text-text-s text-foreground-terciary text-center w-[278px]">
            Trusted by leading organizations worldwide
          </p>

          {/* Logos with opacity and fade gradients */}
          <div className="w-full opacity-50 relative">
            {/* Gradient fade à gauche */}
            <div
              className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(2, 3, 6, 1) 0%, rgba(2, 3, 6, 0) 100%)',
              }}
            />

            {/* Logos */}
            <Logos gap={spacing.gap} paddingX={spacing.paddingX} />

            {/* Gradient fade à droite */}
            <div
              className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgba(2, 3, 6, 1) 0%, rgba(2, 3, 6, 0) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
