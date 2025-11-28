import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface LogosProps {
  // Espacement entre les logos
  gap?: number;
  // Padding horizontal
  paddingX?: number;
  // Comportement
  className?: string;
}

const Logos = React.forwardRef<HTMLDivElement, LogosProps>(
  ({ gap = 200, paddingX = 80, className, ...props }, ref) => {
    const logos = [
      '/logos/logo-1.png',
      '/logos/logo-2.png',
      '/logos/logo-3.png',
      '/logos/logo-4.png',
      '/logos/logo-5.png',
      '/logos/logo-6.png',
    ];

    // Dupliquer les logos pour créer une boucle infinie
    const duplicatedLogos = [...logos, ...logos];

    return (
      <div
        ref={ref}
        className={cn('flex items-center overflow-hidden w-full', className)}
        {...props}
      >
        <div
          className="flex items-center animate-scroll-infinite"
          style={{
            gap: `${gap}px`,
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="relative shrink-0"
              style={{ filter: 'grayscale(100%) brightness(0) invert(1)' }}
            >
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Logos.displayName = 'Logos';

export { Logos };
