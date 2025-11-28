import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, IconVariant } from './icon';

export interface PillarIconProps {
  // Icône personnalisée ou variant d'icône
  icon?: React.ReactNode;
  iconVariant?: IconVariant;
  
  // Taille
  size?: number | string;
  
  // Comportement
  className?: string;
}

const PillarIcon = React.forwardRef<HTMLDivElement, PillarIconProps>(
  ({ icon, iconVariant = 'edge', size = 72, className, ...props }, ref) => {
    const iconSize = typeof size === 'number' ? Math.round(size * (40 / 72)) : 40; // L'icône fait 40px dans un conteneur de 72px

    return (
      <div
        ref={ref}
        className={cn(
          'box-border flex items-center justify-center overflow-clip rounded-full bg-gradient-to-b from-primary-1 to-primary-4 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-2',
          className
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        {icon ? (
          <div className="relative shrink-0" style={{ width: iconSize, height: iconSize }}>
            {icon}
          </div>
        ) : (
          <Icon variant={iconVariant} size={iconSize} className="text-foreground-main" />
        )}
      </div>
    );
  }
);

PillarIcon.displayName = 'PillarIcon';

export { PillarIcon };

