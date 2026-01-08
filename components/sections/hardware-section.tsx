'use client';

import Image from 'next/image';
import { Button, Token } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function HardwareSection() {
  const t = useTranslations();

  return (
    <section className="w-full py-20 md:py-32 px-8 md:px-20 bg-background-2 border-t border-b border-background-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <Token label={t.hardware.token} className="self-start" />
            <h2 className="text-title-2 md:text-title-tablet lg:text-title-2 font-bold text-foreground-main">
              {t.hardware.title}
            </h2>

            <p className="text-text-m text-foreground-secondary leading-relaxed">
              {t.hardware.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {t.hardware.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-[12px] border border-background-5"
                  style={{
                    background:
                      'linear-gradient(to top left, rgba(8,12,20,0.95) 0%, rgba(12,18,28,0.9) 40%, rgba(18,24,36,0.85) 80%, rgba(24,32,44,0.8) 100%)',
                  }}
                >
                  <div className="bg-primary-1 rounded-full w-[8px] h-[8px] shrink-0 mt-1.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-text-s font-semibold text-foreground-main">
                      {feature.label}
                    </span>
                    <span className="text-text-xs text-foreground-terciary">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={t.hardware.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start mt-2"
            >
              <Button
                label={t.hardware.cta}
                variant="ghost"
                size="M"
                rightIconVariant="arrow-right"
              />
            </a>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center order-1 lg:order-2">
            <Image
              src="/logos/kubb.png"
              alt={t.hardware.imageAlt}
              width={350}
              height={350}
              className="object-contain max-h-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
