import React from 'react';
import { cn } from '@/lib/utils';

export interface KpiProps {
  // Contenu
  value: string | number;
  label: string;
  description?: string;

  // Comportement
  className?: string;
}

const KpiComponent = React.forwardRef<HTMLDivElement, KpiProps>(
  ({ value, label, description, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 items-center leading-normal text-center w-full',
          className
        )}
        {...props}
      >
        {/* Value */}
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-title-2 text-primary-3">
          <p className="leading-[48px] whitespace-normal md:text-nowrap md:whitespace-pre break-words">{value}</p>
        </div>

        {/* Label */}
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-text-l text-foreground-main">
          <p className="leading-normal whitespace-normal md:text-nowrap md:whitespace-pre break-words">{label}</p>
        </div>

        {/* Description */}
        {description && (
          <div className="flex flex-col font-normal justify-center relative shrink-0 text-text-s text-foreground-secondary">
            <p className="leading-normal whitespace-normal md:text-nowrap md:whitespace-pre break-words">
              {description}
            </p>
          </div>
        )}
      </div>
    );
  }
);

KpiComponent.displayName = 'Kpi';

// Mémoriser le composant pour éviter les re-renders inutiles
export const Kpi = React.memo(KpiComponent);

export { Kpi };
