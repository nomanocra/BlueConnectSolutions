import { Header, Button, Token, Pillar, PillarIcon } from '@/components/ui';
import { Icon } from '@/components/ui';

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

      {/* HeroSection */}
      <section className="w-full pt-20 pb-20">
        <div className="max-w-[1200px] mx-auto px-20">
          {/* TitlesHero */}
          <div className="flex flex-col gap-10 items-center justify-center pt-20 pb-0">
            {/* Token */}
            <Token label="100% French Occitan Solutions" />

            {/* Title */}
            <h1 className="text-title-1 font-bold text-center text-foreground-main max-w-[820px]">
              Driving the next <br /> wave of{' '}
              <span className="text-primary-3">Digital Transformation</span>
            </h1>

            {/* Description */}
            <p className="text-text-m text-foreground-terciary text-center max-w-[720px]">
              Blue Connect Solutions drives digital transformation through 3
              pillars: IoT, Cybersecurity, and Video Broadcasting — Empowered by
              AI and Made-in-France hardware. We bring together innovation,
              trust, and performance to shape a smarter and more secure digital
              world.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 items-center justify-center">
              <Button
                label="Contact Us"
                variant="primary"
                size="M"
                rightIconVariant="arrow-right"
              />
              <Button
                label="Explore Solutions"
                variant="ghost"
                size="M"
                rightIconVariant="arrow-down"
              />
            </div>
          </div>

          {/* AnimatedIllustration */}
          <div className="flex gap-10 items-start justify-center pb-10 pt-0 px-20">
            <div className="relative w-full h-[513px]">
              {/* Pillars */}

              <Pillar
                label="Edge Compute IoT"
                height={200}
                className="absolute bottom-[73px] left-[calc(50%+175.5px)] -translate-x-1/2"
              />

              <Pillar
                label="Cyber Security"
                height={125}
                className="absolute bottom-[73px] left-[calc(50%-175.5px)] -translate-x-1/2"
              />
              <Pillar
                label="Video Broadcasting"
                height={100}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              />

              {/* PillarIcons - positionnés au-dessus des Pillars */}
              <div className="absolute bottom-[310px] left-[calc(50%-175.5px)] -translate-x-1/2 opacity-10">
                <PillarIcon iconVariant="security" size={72} />
              </div>
              <div className="absolute bottom-[217px] left-1/2 -translate-x-1/2 opacity-10">
                <PillarIcon iconVariant="broadcast" size={72} />
              </div>
              <div className="absolute bottom-[371px] left-[calc(50%+175.5px)] -translate-x-1/2 opacity-10">
                <PillarIcon iconVariant="edge" size={72} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
