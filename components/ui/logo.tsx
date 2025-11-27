import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface LogoProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Taille
  size?: number | string;
  width?: number;
  height?: number;

  // Comportement
  className?: string;
  src?: string;
  alt?: string;
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  (
    {
      size = 32,
      width,
      height,
      className,
      src = '/logo.png', // Logo stocké localement dans public/
      alt = 'Logo',
      ...props
    },
    ref
  ) => {
    // Si size est fourni, l'utiliser pour width et height
    const logoWidth = width || size;
    const logoHeight = height || size;

    return (
      <div
        className={cn('relative', className)}
        style={{ width: logoWidth, height: logoHeight }}
      >
        <Image
          src={src}
          alt={alt}
          width={typeof logoWidth === 'number' ? logoWidth : 32}
          height={typeof logoHeight === 'number' ? logoHeight : 32}
          className="object-contain object-center w-full h-full"
          {...props}
        />
      </div>
    );
  }
);

Logo.displayName = 'Logo';

export { Logo };

