import { useEffect, useRef, useState } from 'react';

export function useBannerHeight(showBanner: boolean, bannerRef: React.RefObject<HTMLDivElement | null>) {
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    if (!showBanner || !bannerRef.current) {
      setBannerHeight(0);
      return;
    }
    const el = bannerRef.current;
    setBannerHeight(el.offsetHeight);
    const observer = new ResizeObserver(() => setBannerHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [showBanner, bannerRef]);

  return bannerHeight;
}

export function useScrollRestoration() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    let userHasScrolled = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let isInitializing = true;

    const handleUserScroll = () => {
      userHasScrolled = true;
      isInitializing = false;
    };

    const scrollToOurSolutionsSection = () => {
      if (userHasScrolled) return;
      const section = document.getElementById('our-solutions');
      if (section) {
        requestAnimationFrame(() => {
          if (!userHasScrolled) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    };

    const tryScrollHelper = (callback: () => void) => {
      const tryScroll = () => {
        if (document.readyState === 'complete' && !userHasScrolled) {
          callback();
        } else if (isInitializing) {
          setTimeout(tryScroll, 100);
        }
      };
      return tryScroll;
    };

    const scrollToSection = sessionStorage.getItem('scrollToSection');
    if (scrollToSection === 'our-solutions') {
      sessionStorage.removeItem('scrollToSection');
      const tryScroll = tryScrollHelper(scrollToOurSolutionsSection);
      setTimeout(tryScroll, 300);
      return;
    }

    const hash = window.location.hash;
    if (hash === '#our-solutions') {
      const tryScroll = tryScrollHelper(scrollToOurSolutionsSection);
      setTimeout(tryScroll, 300);
      return;
    }

    const forceScrollToTop = () => {
      if (!userHasScrolled && isInitializing && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleUserScroll, { passive: true, once: true });

    if (document.readyState === 'complete') {
      requestAnimationFrame(forceScrollToTop);
    } else {
      window.addEventListener('load', () => {
        if (!userHasScrolled) {
          requestAnimationFrame(forceScrollToTop);
        }
        isInitializing = false;
      }, { once: true });
    }

    scrollTimeout = setTimeout(() => {
      isInitializing = false;
    }, 500);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleUserScroll);
    };
  }, []);
}

export function useAnchorNavigation(
  scrollToOurSolutions: (e?: React.MouseEvent) => void,
  setActiveSection: (section: 'home' | 'our-solutions') => void,
  setIsScrolling: (scrolling: boolean) => void
) {
  useEffect(() => {
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

    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, [scrollToOurSolutions, setActiveSection, setIsScrolling]);
}

export function useHeaderVisibility(): boolean {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY < 300) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

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
  }, []);

  return isHeaderVisible;
}

export function useActiveSectionObserver(isScrolling: boolean): ['home' | 'our-solutions', (section: 'home' | 'our-solutions') => void] {
  const [activeSection, setActiveSection] = useState<'home' | 'our-solutions'>('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const heroSection = document.getElementById('hero');
    const ourSolutionsSection = document.getElementById('our-solutions');

    if (heroSection) observer.observe(heroSection);
    if (ourSolutionsSection) observer.observe(ourSolutionsSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
      if (ourSolutionsSection) observer.unobserve(ourSolutionsSection);
    };
  }, [isScrolling]);

  return [activeSection, setActiveSection];
}
