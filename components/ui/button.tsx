import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from './icons/arrow-right';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Contenu
  label?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showRightIcon?: boolean;
  showLeftIcon?: boolean;

  // Variantes
  state?: 'default' | 'hover' | 'pressed';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'M' | 'S' | 'XS';

  // Comportement
  href?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      leftIcon,
      rightIcon,
      showRightIcon = true,
      showLeftIcon = true,
      state = 'default',
      variant = 'primary',
      size = 'M',
      className,
      href,
      asChild = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Si href est fourni, on rend un lien
    if (href) {
      return (
        <a
          href={href}
          className={cn(getButtonClasses(state, variant, size), className)}
          {...(props as any)}
        >
          {renderButtonContent(
            label || children,
            leftIcon,
            rightIcon,
            showRightIcon,
            showLeftIcon,
            size
          )}
        </a>
      );
    }

    const buttonClasses = cn(
      getButtonClasses(state, variant, size),
      disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {renderButtonContent(
          label || children,
          leftIcon,
          rightIcon,
          showRightIcon,
          showLeftIcon,
          size
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Fonction pour générer les classes selon les variantes
function getButtonClasses(
  state: 'default' | 'hover' | 'pressed',
  variant: 'primary' | 'secondary' | 'ghost',
  size: 'M' | 'S' | 'XS'
): string {
  const baseClasses =
    'box-border flex items-center justify-center relative rounded-[6px] font-geist font-medium text-center whitespace-nowrap transition-colors cursor-pointer';

  // Classes de taille
  const sizeClasses = {
    M: 'h-12 px-4 py-[13px] gap-2 text-text-m',
    S: 'h-10 px-3 py-[13px] gap-1.5 text-text-m',
    XS: 'h-8 px-2 py-[13px] gap-1 text-text-s',
  };

  // Classes par variant avec états hover et active
  const variantClasses: Record<string, Record<string, string>> = {
    primary: {
      base: 'bg-primary-3 text-foreground-main',
      hover: 'hover:bg-primary-2',
      active: 'active:bg-primary-4',
    },
    secondary: {
      base: 'bg-foreground-main text-foreground-negatif',
      hover: 'hover:bg-primary-1',
      active: 'active:bg-primary-2',
    },
    ghost: {
      base: 'backdrop-blur-[1px] bg-[rgba(15,20,28,0.5)] border border-background-5 text-foreground-secondary',
      hover:
        'hover:bg-[rgba(15,20,28,0.7)] hover:border-[rgba(148,185,229,0.5)]',
      active:
        'active:bg-[rgba(15,20,28,0.8)] active:border-[rgba(148,185,229,0.8)] active:text-foreground-main',
    },
  };

  // Si state est défini programmatiquement, on peut forcer l'état
  const stateClasses: Record<string, Record<string, string>> = {
    primary: {
      hover: 'bg-primary-2',
      pressed: 'bg-primary-4',
    },
    secondary: {
      hover: 'bg-primary-1',
      pressed: 'bg-primary-2',
    },
    ghost: {
      hover: 'bg-[rgba(15,20,28,0.7)] border-[rgba(148,185,229,0.5)]',
      pressed:
        'bg-[rgba(15,20,28,0.8)] border-[rgba(148,185,229,0.8)] text-foreground-main',
    },
  };

  const variantConfig = variantClasses[variant] || variantClasses.primary;
  const forcedState = state !== 'default' ? stateClasses[variant]?.[state] : '';

  return cn(
    baseClasses,
    sizeClasses[size],
    variantConfig.base,
    variantConfig.hover,
    variantConfig.active,
    forcedState
  );
}

// Fonction pour rendre le contenu du bouton
function renderButtonContent(
  content: React.ReactNode,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  showRightIcon: boolean = true,
  showLeftIcon: boolean = true,
  size: 'M' | 'S' | 'XS' = 'M'
): React.ReactNode {
  const iconSize = {
    M: 24,
    S: 20,
    XS: 16,
  };

  const defaultRightIcon = <ArrowRightIcon size={iconSize[size]} />;

  return (
    <>
      {showLeftIcon && leftIcon && (
        <span className="relative shrink-0">{leftIcon}</span>
      )}
      <span className="flex flex-col justify-center leading-normal relative shrink-0">
        {typeof content === 'string' ? (
          <span className="leading-normal whitespace-pre">{content}</span>
        ) : (
          content
        )}
      </span>
      {showRightIcon && (rightIcon || defaultRightIcon) && (
        <span className="relative shrink-0">
          {rightIcon || defaultRightIcon}
        </span>
      )}
    </>
  );
}

export { Button };
