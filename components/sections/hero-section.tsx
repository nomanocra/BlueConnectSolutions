import { Button, Token, Pillar, PillarIcon } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="w-full relative">
      {/* Grille de fond avec animation */}
      <div
        className="absolute inset-0 animate-grid-fade-in"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 40px, 40px 100%',
        }}
      />

      {/* Wrapper avec gradient - contient TitlesHero et AnimatedIllustration */}
      <div
        className="relative pt-20 px-20"
        style={{
          background:
            'radial-gradient(12% 45% at 17.38% 5.06%, rgba(53, 118, 192, 0.10) 0%, rgba(53, 118, 192, 0.00) 100%), radial-gradient(20.08% 49.14% at 71.2% 32%, rgba(53, 118, 192, 0.10) 0%, rgba(53, 118, 192, 0.00) 100%),radial-gradient(62% 36.91% at 50% 32%, rgba(2, 3, 6, 0.00) 45.19%, #020306 84.62%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* TitlesHero */}
          <div className="flex flex-col gap-10 items-center justify-center pb-5 pt-20 px-20">
            {/* Token */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              <Token label="100% French Occitan Solutions" />
            </div>

            {/* Title */}
            <h1
              className="text-title-1 font-bold text-center text-foreground-main max-w-[820px] animate-fade-in-up"
              style={{ animationDelay: '50ms' }}
            >
              Driving the next <br /> wave of{' '}
              <span className="text-primary-3">Digital Transformation</span>
            </h1>

            {/* Description */}
            <p
              className="text-text-m text-foreground-terciary text-center max-w-[720px] leading-[1.5] animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Blue Connect Solutions drives digital transformation through 3
              pillars: IoT, Cybersecurity, and Video Broadcasting — Empowered by
              AI and Made-in-France hardware. We bring together innovation,
              trust, and performance to shape a smarter and more secure digital
              world.
            </p>

            {/* Buttons */}
            <div
              className="flex gap-4 items-center justify-center animate-fade-in-up"
              style={{ animationDelay: '150ms' }}
            >
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
          <div className="flex gap-10 items-start justify-center px-20 pb-20">
            <div className="relative w-full h-[620px]">
              {/* Pillars */}

              <Pillar
                label="Cyber Security"
                height={175}
                className="absolute bottom-[73px] left-[calc(50%-175.5px)] -translate-x-1/2"
              />
              <Pillar
                label="Video Broadcasting"
                height={150}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              />
              <Pillar
                label="Edge Compute IoT"
                height={250}
                className="absolute bottom-[73px] left-[calc(50%+175.5px)] -translate-x-1/2"
              />

              {/* PillarIcons - positionnés par rapport au bottom du conteneur */}

              <div className="absolute bottom-[425px] left-[calc(50%-175.5px)] -translate-x-1/2 ">
                <PillarIcon iconVariant="security" size={72} />
              </div>
              <div className="absolute bottom-[325px] left-1/2 -translate-x-1/2">
                <PillarIcon iconVariant="broadcast" size={72} />
              </div>
              <div className="absolute bottom-[500px] left-[calc(50%+175.5px)] -translate-x-1/2 ">
                <PillarIcon iconVariant="edge" size={72} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
