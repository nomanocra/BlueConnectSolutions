import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Contenu
  children: React.ReactNode;
  label?: string;

  // Variantes
  state?: 'default' | 'selected' | 'hover' | 'pressed';
  selected?: boolean;
  disabled?: boolean;

  // Comportement
  href: string;
  external?: boolean;
}

const LinkComponent = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      label,
      state,
      selected = false,
      disabled = false,
      className,
      href,
      external = false,
      ...props
    },
    ref
  ) => {
    const content = label || children;

    // Si disabled, on ignore tous les autres états et on affiche comme default avec opacity-30
    if (disabled) {
      const linkClasses = cn(
        'flex gap-2.5 items-center justify-center relative transition-colors cursor-not-allowed pointer-events-none',
        className
      );
      // Disabled ressemble à default (text-foreground-main opacity-60) mais avec opacity-30
      const textClasses = cn(
        'font-geist font-medium leading-normal relative shrink-0 text-text-l text-center whitespace-pre text-foreground-main opacity-30'
      );

      return (
        <span className={linkClasses} {...props}>
          <span className={textClasses}>{content}</span>
        </span>
      );
    }

    // Si selected, on ignore les états hover/pressed et on utilise l'état selected
    const isSelected = selected || state === 'selected';
    const effectiveState = isSelected ? 'selected' : state || 'default';

    const linkClasses = cn(
      'flex gap-2.5 items-center justify-center relative transition-colors',
      className
    );

    const textClasses = cn(
      'font-geist font-medium leading-normal relative shrink-0 text-text-l text-center whitespace-pre',
      getTextStateClasses(effectiveState, isSelected)
    );

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          <span className={textClasses}>{content}</span>
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={linkClasses} {...props}>
        <span className={textClasses}>{content}</span>
      </NextLink>
    );
  }
);

LinkComponent.displayName = 'Link';

// Fonction pour générer les classes de texte selon l'état
function getTextStateClasses(
  state: 'default' | 'selected' | 'hover' | 'pressed',
  isSelected: boolean
): string {
  // Si selected, toujours afficher l'état selected (pas de hover/active)
  if (isSelected) {
    return 'text-primary-2 [text-shadow:rgba(148,185,229,0.7)_0px_0px_20px]';
  }

  // Si pas selected, gérer les états hover et active via CSS
  // Par défaut : opacity-60, au hover : opacity-100, au active : text-primary-2
  switch (state) {
    case 'default':
      return 'text-foreground-main opacity-60 hover:text-foreground-main hover:opacity-100 active:text-primary-2 cursor-pointer';
    case 'hover':
      return 'text-foreground-main active:text-primary-2 cursor-pointer';
    case 'pressed':
      return 'text-primary-2 cursor-pointer';
    case 'selected':
      return 'text-primary-2 [text-shadow:rgba(148,185,229,0.7)_0px_0px_20px]';
    default:
      return 'text-foreground-main opacity-60 hover:text-foreground-main hover:opacity-100 active:text-primary-2 cursor-pointer';
  }
}

export { LinkComponent as Link };
