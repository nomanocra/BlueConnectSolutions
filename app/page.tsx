'use client';

import { Header } from '@/components/ui';
import { HeroSection } from '@/components/sections/hero-section';
import { KpisSection } from '@/components/sections/kpis-section';
import { LogosSection } from '@/components/sections/logos-section';
import { OurSolutionsSection } from '@/components/sections/our-solutions-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FooterSection } from '@/components/sections/footer-section';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si on est tout en haut (< 100px), toujours afficher le header
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
    <main className="min-h-screen">
      {/* Header fixé à 32px du haut, centré, max-width 1200px */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 z-50 transition-all ease-in-out ${
          isHeaderVisible
            ? 'top-8 opacity-100 duration-300'
            : '-top-20 opacity-0 duration-700'
        }`}
      >
        <Header
          logoHref="/"
          links={[
            { label: 'Home', href: '/', selected: true },
            { label: 'Our Solution', href: '/solution' },
            { label: 'About Us', href: '/about' },
          ]}
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </div>

      <HeroSection />
      <KpisSection />
      <LogosSection />
      <OurSolutionsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
