import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconVariant } from './icon';

export interface PillarTileDescriptionProps {
  // Contenu
  title: string;
  description: string;
  iconVariant?: IconVariant;

  // Dimensions
  width?: number | string;
  height?: number | string;

  // Comportement
  className?: string;
}

const PillarTileDescription = React.forwardRef<
  HTMLDivElement,
  PillarTileDescriptionProps
>(
  (
    {
      title,
      description,
      iconVariant = 'security',
      width = 645,
      height = 440,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border border-background-5 rounded-[12px] relative overflow-hidden',
          'shadow-[0_4px_24px_rgba(0,0,0,0.15)]',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          background:
            'linear-gradient(to top left, rgba(4,6,10,1) 0%, rgba(6,10,15,1) 40%, rgba(10,14,20,1) 80%, rgba(15,20,28,1) 100%)',
        }}
        {...props}
      >
        {/* Overlay subtil pour plus de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-t10 pointer-events-none" />
        
        <div className="relative flex flex-col gap-[24px] h-full p-[32px] z-10">
          {/* Icon */}
          <div className="bg-primary-t20 flex items-center justify-center rounded-[8px] w-[48px] h-[48px] shrink-0">
            <Icon variant={iconVariant} size={32} className="text-primary-1" />
          </div>

          {/* Title */}
          <h3 className="text-title-3 font-semibold text-foreground-main leading-[32px]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-m text-foreground-terciary">{description}</p>
        </div>
      </div>
    );
  }
);

PillarTileDescription.displayName = 'PillarTileDescription';

export { PillarTileDescription };
