import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface LogosProps {
  // Espacement entre les logos
  gap?: number | string;
  
  // Padding horizontal
  paddingX?: number | string;
  
  // Comportement
  className?: string;
}

const Logos = React.forwardRef<HTMLDivElement, LogosProps>(
  ({ gap = 200, paddingX = 80, className, ...props }, ref) => {
    const logos = [
      {
        src: '/logos/logo-1.png',
        alt: 'IBM',
        width: 163.878,
        height: 61.223,
      },
      {
        src: '/logos/logo-2.png',
        alt: 'Oracle',
        width: 262,
        height: 34,
      },
      {
        src: '/logos/logo-3.png',
        alt: 'Stellantis',
        width: 305,
        height: 94,
      },
      {
        src: '/logos/logo-4.png',
        alt: 'Airbus',
        width: 205,
        height: 38,
      },
      {
        src: '/logos/logo-5.png',
        alt: 'Thales',
        width: 267.384,
        height: 31.863,
      },
      {
        src: '/logos/logo-6.png',
        alt: 'CNES',
        width: 90,
        height: 90,
      },
    ];

    return (
      <div
        ref={ref}
        className={cn('flex items-center overflow-hidden w-fit', className)}
        style={{
          gap: typeof gap === 'number' ? `${gap}px` : gap,
          paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
          paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
        }}
        {...props}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative shrink-0"
            style={{
              width: logo.width,
              height: logo.height,
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain object-center pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                filter: 'grayscale(100%)',
              }}
            />
          </div>
        ))}
      </div>
    );
  }
);

Logos.displayName = 'Logos';

export { Logos };

