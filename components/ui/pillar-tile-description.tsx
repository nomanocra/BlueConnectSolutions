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
          'border border-background-4 rounded-[12px] relative overflow-hidden',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          background:
            'radial-gradient(ellipse at 80% 92%, rgba(6,10,15,1) 53.526%, rgba(10,14,20,1) 100%)',
        }}
        {...props}
      >
        <div className="flex flex-col gap-[24px] h-full p-[32px]">
          {/* Icon */}
          <div className="bg-[rgba(91,149,213,0.2)] flex items-center justify-center rounded-[8px] w-[48px] h-[48px] shrink-0">
            <Icon variant={iconVariant} size={32} color="rgba(148, 185, 229, 1)" />
          </div>

          {/* Title */}
          <h3 className="text-title-3 font-semibold text-[#eaeff5] leading-[32px]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-m text-foreground-terciary leading-normal">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

PillarTileDescription.displayName = 'PillarTileDescription';

export { PillarTileDescription };

