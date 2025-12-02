'use client';

import { useState, useEffect } from 'react';
import { Logos } from '@/components/ui';

export function LogosSection() {
  const [gap, setGap] = useState(200);
  const [paddingX, setPaddingX] = useState(80);

  useEffect(() => {
    const updateSpacing = () => {
      if (window.innerWidth < 768) {
        // Mobile : beaucoup plus rapprochés
        setGap(100);
        setPaddingX(20);
      } else if (window.innerWidth < 1024) {
        // Tablet : un peu moins qu'en desktop
        setGap(150);
        setPaddingX(60);
      } else {
        // Desktop : valeurs par défaut
        setGap(200);
        setPaddingX(80);
      }
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

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
            <Logos gap={gap} paddingX={paddingX} />

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
