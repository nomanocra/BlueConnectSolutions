import React from 'react';
import { cn } from '@/lib/utils';

export interface TokenProps {
  // Contenu
  label: string;
  
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
      label,
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
          'bg-primary-t10 border border-primary-t30 border-solid h-10 relative rounded-[48px]',
          className
        )}
        {...props}
      >
        <div className="box-border flex gap-4 h-10 items-center justify-center overflow-clip px-4 py-3 relative rounded-[inherit]">
          {/* Flag */}
          <div className="flex h-1 items-start overflow-clip relative rounded-[36px] shrink-0 w-[37px]">
            <div
              className="basis-0 grow h-6 min-h-px min-w-px shrink-0"
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
          <div className="flex flex-col font-bold justify-center leading-normal opacity-80 relative shrink-0 text-text-l text-center whitespace-pre text-foreground-main">
            {label}
          </div>
        </div>
      </div>
    );
  }
);

Token.displayName = 'Token';

export { Token };

