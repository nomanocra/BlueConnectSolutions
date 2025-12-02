'use client';

import { Button, Token } from '@/components/ui';

export interface HeroSectionProps {
  onExploreSolutions?: () => void;
}

export function HeroSection({ onExploreSolutions }: HeroSectionProps = {}) {
  return (
    <section className="w-full relative">
      {/* Grille de fond */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 40px, 40px 100%',
        }}
      />

      {/* Wrapper avec gradient */}
      <div className="relative pt-20 px-2 md:px-20 pb-[80px] hero-gradient-animated">
        <div className="max-w-[1200px] mx-auto">
          {/* TitlesHero */}
          <div className="flex flex-col gap-10 items-center justify-center pb-5 pt-20 px-2 md:px-20">
            {/* Token */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              <Token label="100% French Occitan Solutions" />
            </div>

            {/* Title */}
            <h1
              className="text-title-2 md:text-title-tablet lg:text-title-1 font-bold text-center text-foreground-main max-w-[820px] animate-fade-in-up whitespace-pre-line"
              style={{ animationDelay: '50ms' }}
            >
              Driving the next{'\n'}wave of{' '}
              <span className="text-primary-3">Digital</span>{'\n'}
              <span className="text-primary-3">Transformation</span>
            </h1>

            {/* Description */}
            <p
              className="text-text-s md:text-text-m text-foreground-terciary text-center max-w-[720px] leading-[1.5] animate-fade-in-up"
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
                href="/contact"
              />
              <Button
                label="Explore Solutions"
                variant="ghost"
                size="M"
                rightIconVariant="arrow-down"
                onClick={onExploreSolutions}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
