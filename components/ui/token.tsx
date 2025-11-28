import React from 'react';
import { cn } from '@/lib/utils';

export interface TokenProps {
  // Contenu
  label?: string;
  
  // Variantes du drapeau
  flagColors?: {
    blue?: string;
    white?: string;
    red?: string;
  };
  
  // Comportement
  className?: string;
}

const Token = React.forwardRef<HTMLDivElement, TokenProps>(
  (
    {
      label = 'Label',
      flagColors = {
        blue: '#255da4', // primary-4
        white: '#eeeeee',
        red: '#f13848',
      },
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-primary-t10 border border-primary-t30 border-solid relative rounded-[48px]',
          className
        )}
        {...props}
      >
        <div className="box-border content-stretch flex gap-4 items-center justify-center overflow-clip px-3 py-1 relative rounded-[inherit]">
          {/* Flag */}
          <div className="content-stretch flex h-1 items-start overflow-clip relative rounded-[36px] shrink-0 w-[37px]">
            <div
              className="basis-0 bg-primary-4 grow h-6 min-h-px min-w-px shrink-0"
              style={{ backgroundColor: flagColors.blue }}
            />
            <div
              className="basis-0 grow h-6 min-h-px min-w-px shrink-0"
              style={{ backgroundColor: flagColors.white }}
            />
            <div
              className="basis-0 grow h-6 min-h-px min-w-px shrink-0"
              style={{ backgroundColor: flagColors.red }}
            />
          </div>
          
          {/* Label */}
          <div className="flex flex-col font-geist font-medium justify-center leading-none relative shrink-0 text-text-m text-foreground-terciary text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">{label}</p>
          </div>
        </div>
      </div>
    );
  }
);

Token.displayName = 'Token';

export { Token };

