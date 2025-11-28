import { Header } from '@/components/ui';
import { HeroSection } from '@/components/sections/hero-section';
import { KpisSection } from '@/components/sections/kpis-section';
import { LogosSection } from '@/components/sections/logos-section';
import { PillarsSection } from '@/components/sections/pillars-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FooterSection } from '@/components/sections/footer-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header fixé à 32px du haut, centré, max-width 1200px */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 z-50">
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
      <PillarsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
