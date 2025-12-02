'use client';

import { Header, BackToTopButton } from '@/components/ui';
import { AboutSection, FooterSection } from '@/components/sections';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Forcer le scroll à 0 au chargement de la page
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si on est tout en haut (< 300px), toujours afficher le header
      if (currentScrollY < 300) {
        setIsHeaderVisible(true);
      }
      // Si on scroll vers le bas et qu'on est au-delà de 100px
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      // Si on scroll vers le haut
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle pour optimiser les performances
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header fixé à 16px du haut, centré, max-width 1200px */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-4 md:px-8 z-50 ${
          isHeaderVisible
            ? 'top-4 md:top-8 opacity-100 pointer-events-auto'
            : '-top-20 opacity-0 pointer-events-none'
        }`}
        style={{
          transition: isHeaderVisible
            ? 'top 400ms ease-in-out, opacity 200ms ease-in-out 200ms, transform 0s'
            : 'top 800ms ease-in-out, opacity 400ms ease-in-out, transform 0s',
        }}
      >
        <Header
          logoHref="/"
          links={[
            {
              label: 'Home',
              href: '/',
              selected: false,
            },
            {
              label: 'Our Solutions',
              href: '/#our-solutions',
              selected: false,
            },
            { label: 'About Us', href: '/about', selected: true },
          ]}
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </div>

      {/* Contenu avec padding-top pour compenser le header fixe */}
      <div className="pt-32">
        <AboutSection />
      </div>

      <FooterSection />
      <BackToTopButton />
    </main>
  );
}

