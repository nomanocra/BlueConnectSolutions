'use client';

import { Header, BackToTopButton, PromoBanner, shouldShowPromoBanner } from '@/components/ui';
import {
  HeroSection,
  AnimatedPillarsSection,
  KpisSection,
  LogosSection,
  OurSolutionsSection,
  HardwareSection,
  CtaSection,
  FooterSection,
} from '@/components/sections';
import React, { useRef, useState } from 'react';
import { useTranslations } from '@/lib/i18n';
import {
  useBannerHeight,
  useScrollRestoration,
  useAnchorNavigation,
  useHeaderVisibility,
  useActiveSectionObserver,
} from './hooks';

export default function Home() {
  const t = useTranslations();
  const [showBanner, setShowBanner] = useState(false);

  // Vérifier localStorage après hydration pour éviter le mismatch SSR
  React.useEffect(() => {
    if (shouldShowPromoBanner()) {
      setShowBanner(true);
    }
  }, []);
  const [isScrolling, setIsScrolling] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const bannerHeight = useBannerHeight(showBanner, bannerRef);
  useScrollRestoration();
  const isHeaderVisible = useHeaderVisibility();
  const [activeSection, setActiveSection] = useActiveSectionObserver(isScrolling);

  const scrollToOurSolutions = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const section = document.getElementById('our-solutions');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useAnchorNavigation(scrollToOurSolutions, setActiveSection, setIsScrolling);

  return (
    <>
      {/* Banner — fixed en haut, toujours visible, z au-dessus du header */}
      {showBanner && (
        <div ref={bannerRef} className="fixed top-0 left-0 w-full z-[60]">
          <PromoBanner onClose={() => setShowBanner(false)} />
        </div>
      )}

      <main className="min-h-screen overflow-x-hidden" style={{ paddingTop: showBanner ? `${bannerHeight}px` : undefined }}>
        {/* Header fixed — positionné juste sous le banner */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-4 md:px-8 z-50 ${
            isHeaderVisible
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          style={{
            top: isHeaderVisible ? `${bannerHeight + 16}px` : '-5rem',
            transition: isHeaderVisible
              ? 'top 400ms ease-in-out, opacity 200ms ease-in-out 200ms, transform 0s'
              : 'top 800ms ease-in-out, opacity 400ms ease-in-out, transform 0s',
          }}
        >
          <Header
            logoHref="/"
            links={[
              {
                label: t.nav.home,
                href: '#home',
                selected: activeSection === 'home',
              },
              {
                label: t.nav.ourSolutions,
                href: '#our-solutions',
                selected: activeSection === 'our-solutions',
              },
              { label: t.nav.aboutUs, href: '/about', selected: false },
            ]}
            ctaLabel={t.nav.contactUs}
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
        <HardwareSection />
        <CtaSection />
        {/* <LogosSection /> */}
        <FooterSection />
        <BackToTopButton />
      </main>
    </>
  );
}
