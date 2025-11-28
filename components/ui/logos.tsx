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

    return (
      <div
        ref={ref}
        className={cn('flex items-center w-fit overflow-hidden', className)}
        style={{
          gap: `${gap}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`,
        }}
        {...props}
      >
        {logos.map((logo, index) => (
          <div key={index} className="relative shrink-0" style={{ filter: 'grayscale(100%)' }}>
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
    );
  }
);

Logos.displayName = 'Logos';

export { Logos };

