'use client';

import { Header, BackToTopButton } from '@/components/ui';
import {
  HeroSection,
  AnimatedPillarsSection,
  KpisSection,
  LogosSection,
  OurSolutionsSection,
  CtaSection,
  FooterSection,
} from '@/components/sections';
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
    // Désactiver la restauration automatique de la position de scroll
    // Pour que la page revienne toujours en haut au refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Vérifier si on a un hash dans l'URL (ex: depuis About ou Contact)
    const hash = window.location.hash;
    if (hash === '#our-solutions') {
      // Attendre que le DOM soit prêt, puis scroller vers la section
      const scrollToSection = () => {
        const section = document.getElementById('our-solutions');
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection('our-solutions');
          }, 100);
        }
      };
      
      // Essayer plusieurs fois pour s'assurer que le DOM est prêt
      scrollToSection();
      setTimeout(scrollToSection, 200);
      setTimeout(scrollToSection, 500);
    } else {
      // Pas de hash, forcer le scroll à 0
    const forceScrollToTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    
    // Forcer immédiatement
    forceScrollToTop();
    
    // Forcer après plusieurs délais pour gérer tous les cas
    const timeouts = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 10),
      setTimeout(forceScrollToTop, 50),
      setTimeout(forceScrollToTop, 100),
      setTimeout(forceScrollToTop, 200),
    ];
    
    // Écouter les événements de scroll pour forcer si nécessaire
    const handleScroll = () => {
      if (window.scrollY !== 0 && document.readyState === 'loading') {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
    }
  }, []);

  useEffect(() => {
    // Intercepter les clics sur les liens d'ancre pour un scroll smooth
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        // Gérer les liens avec hash depuis la même page
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
        // Gérer les liens avec hash depuis d'autres pages (ex: /#our-solutions)
        else if (href && href.startsWith('/#our-solutions')) {
          // Laisser Next.js gérer la navigation, le hash sera géré par le useEffect de chargement
          // Pas besoin de preventDefault ici
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
          logoHref="#home"
          links={[
            {
              label: 'Home',
              href: '#home',
              selected: activeSection === 'home',
            },
            {
              label: 'Our Solutions',
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
      </div>
      <AnimatedPillarsSection />
      <KpisSection />
      <div id="our-solutions">
        <OurSolutionsSection />
      </div>
      <CtaSection />
      <LogosSection />
      <FooterSection />
      <BackToTopButton />
    </main>
  );
}
