'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './icon';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Récupérer la hauteur de la première section (HeroSection)
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;

      const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollY = window.scrollY;

      // Afficher le bouton si on a dépassé la première section
      setIsVisible(scrollY > heroSectionBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Vérifier au montage
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-40',
        'w-12 h-12 rounded-full',
        'bg-primary-3 text-foreground-main',
        'flex items-center justify-center',
        'shadow-[0_4px_24px_rgba(0,0,0,0.15)]',
        'hover:bg-primary-2 hover:scale-110',
        'active:bg-primary-4',
        'transition-all duration-300 ease-in-out',
        // Animation : opacité et translation du bas vers le haut
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Retour en haut de la page"
    >
      <Icon variant="arrow-top" size={24} />
    </button>
  );
}

