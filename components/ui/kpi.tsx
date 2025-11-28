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

const Kpi = React.forwardRef<HTMLDivElement, KpiProps>(
  ({ value, label, description, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 items-center leading-normal text-center text-nowrap',
          className
        )}
        {...props}
      >
        {/* Value */}
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-title-2 text-primary-3">
          <p className="leading-[48px] text-nowrap whitespace-pre">{value}</p>
        </div>

        {/* Label */}
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-text-l text-foreground-main">
          <p className="leading-normal text-nowrap whitespace-pre">{label}</p>
        </div>

        {/* Description */}
        {description && (
          <div className="flex flex-col font-normal justify-center relative shrink-0 text-text-s text-foreground-secondary">
            <p className="leading-normal text-nowrap whitespace-pre">
              {description}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Kpi.displayName = 'Kpi';

export { Kpi };
