'use client';

import { Token, PillarIcon, Button } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function PillarsSection() {
  const t = useTranslations();

  const pillars = [
    {
      number: '1',
      title: t.pillars.pillar1.title,
      description: t.pillars.pillar1.description,
      iconVariant: 'security' as const,
    },
    {
      number: '2',
      title: t.pillars.pillar2.title,
      description: t.pillars.pillar2.description,
      iconVariant: 'broadcast' as const,
    },
    {
      number: '3',
      title: t.pillars.pillar3.title,
      description: t.pillars.pillar3.description,
      iconVariant: 'edge' as const,
    },
  ];

  return (
    <section className="w-full py-20 px-2 md:px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-12 items-center justify-center">
          {/* Token */}
          <Token label={t.pillars.token} />

          {/* Title */}
          <p className="text-text-m text-foreground-terciary text-center max-w-[800px]">
            {t.pillars.subtitle}
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 items-start p-8 rounded-lg bg-background-2 border border-background-4 hover:border-primary-t30 transition-colors"
              >
                {/* Number and Icon */}
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-t10 border border-primary-t30">
                    <span className="text-title-3 font-bold text-primary-3">
                      {pillar.number}
                    </span>
                  </div>
                  <PillarIcon iconVariant={pillar.iconVariant} size={56} />
                </div>

                {/* Title */}
                <h3 className="text-title-3 font-semibold text-foreground-main">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-text-s md:text-text-m text-foreground-secondary leading-relaxed">
                  {pillar.description}
                </p>

                {/* Learn More Button */}
                <Button
                  label={t.pillars.learnMore}
                  variant="ghost"
                  size="S"
                  rightIconVariant="arrow-right"
                  className="mt-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
