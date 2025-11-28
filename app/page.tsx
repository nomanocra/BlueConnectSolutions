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
  const [activeSection, setActiveSection] = useState<'home' | 'our-solutions'>(
    'home'
  );
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToOurSolutions = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const section = document.getElementById('our-solutions');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Intercepter les clics sur les liens d'ancre pour un scroll smooth
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href === '#our-solutions') {
          e.preventDefault();
          e.stopPropagation();
          setActiveSection('our-solutions');
          setIsScrolling(true);
          scrollToOurSolutions();
          setTimeout(() => setIsScrolling(false), 1000);
        } else if (href === '#home') {
          e.preventDefault();
          e.stopPropagation();
          setActiveSection('home');
          setIsScrolling(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    // Utiliser la phase de capture pour intercepter avant les autres handlers
    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, []);

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

  useEffect(() => {
    // Observer pour détecter la section active
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Ne pas mettre à jour si on est en train de scroller via un clic
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'our-solutions') {
            setActiveSection('our-solutions');
          } else if (sectionId === 'hero') {
            setActiveSection('home');
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const heroSection = document.getElementById('hero');
    const ourSolutionsSection = document.getElementById('our-solutions');

    if (heroSection) observer.observe(heroSection);
    if (ourSolutionsSection) observer.observe(ourSolutionsSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
      if (ourSolutionsSection) observer.unobserve(ourSolutionsSection);
    };
  }, [isScrolling]);

  return (
    <main className="min-h-screen">
      {/* Header fixé à 32px du haut, centré, max-width 1200px */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 z-50 ${
          isHeaderVisible
            ? 'top-8 opacity-100 pointer-events-auto'
            : '-top-20 opacity-0 pointer-events-none'
        }`}
        style={{
          transition: isHeaderVisible
            ? 'top 400ms ease-in-out, opacity 200ms ease-in-out 200ms, transform 0s'
            : 'top 800ms ease-in-out, opacity 400ms ease-in-out, transform 0s',
        }}
      >
        <Header
          logoHref="#home"
          links={[
            {
              label: 'Home',
              href: '#home',
              selected: activeSection === 'home',
            },
            {
              label: 'Our Solution',
              href: '#our-solutions',
              selected: activeSection === 'our-solutions',
            },
            { label: 'About Us', href: '/about', selected: false },
          ]}
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </div>

      <div id="hero">
        <HeroSection onExploreSolutions={scrollToOurSolutions} />
        <KpisSection />
      </div>
      <div id="our-solutions">
        <OurSolutionsSection />
      </div>
      <LogosSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
