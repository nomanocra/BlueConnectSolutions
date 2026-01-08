import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Icon, type IconVariant } from './icon';

export interface Solution {
  name: string;
  href: string;
  logo?: string;
  padding?: string;
}

export interface PillarTileDescriptionProps {
  // Contenu
  title: string;
  description: string;
  iconVariant?: IconVariant;
  solutions?: Solution[];
  solutionsLabel?: string;

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
      solutions,
      solutionsLabel = 'Solutions',
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
          minHeight: '100%',
          background:
            'linear-gradient(to top left, rgba(4,6,10,1) 0%, rgba(6,10,15,1) 40%, rgba(10,14,20,1) 80%, rgba(15,20,28,1) 100%)',
        }}
        {...props}
      >
        {/* Overlay subtil pour plus de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-t10 pointer-events-none" />

        <div className="relative flex flex-col gap-[20px] h-full p-[32px] z-10">
          {/* Icon */}
          <div className="bg-primary-t20 flex items-center justify-center rounded-[8px] w-[48px] h-[48px] shrink-0">
            <Icon variant={iconVariant} size={32} className="text-primary-1" />
          </div>

          {/* Title */}
          <h3 className="text-title-3 font-semibold text-foreground-main leading-[32px]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-s md:text-text-m text-foreground-terciary">{description}</p>

          {/* Solutions */}
          {solutions && solutions.length > 0 && (
            <div className="flex flex-col gap-3 mt-auto flex-1 min-h-0">
              <span className="text-text-xs text-foreground-terciary uppercase tracking-wider shrink-0">
                {solutionsLabel}
              </span>
              <div className="flex gap-3 flex-1">
                {solutions.map((solution, index) => (
                  <a
                    key={index}
                    href={solution.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex-1 min-w-[80px] rounded-[12px]',
                      solution.padding || 'p-3',
                      'flex items-center justify-center',
                      'border border-foreground-terciary/15',
                      'text-text-s text-foreground-secondary font-medium',
                      'hover:border-primary-1 hover:text-foreground-main',
                      'cursor-pointer overflow-hidden'
                    )}
                    style={{
                      background: 'linear-gradient(to top left, rgba(8,12,20,0.95) 0%, rgba(12,18,28,0.9) 40%, rgba(18,24,36,0.85) 80%, rgba(24,32,44,0.8) 100%)',
                      maxHeight: '100px',
                    }}
                  >
                    {solution.logo ? (
                      <Image
                        src={solution.logo}
                        alt={solution.name}
                        width={150}
                        height={60}
                        className="w-auto h-auto max-w-[90%] max-h-[80%] object-contain rounded-[8px]"
                      />
                    ) : (
                      solution.name
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PillarTileDescription.displayName = 'PillarTileDescription';

export { PillarTileDescription };
