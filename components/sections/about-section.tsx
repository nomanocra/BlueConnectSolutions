'use client';

import Image from 'next/image';
import { Token } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function AboutSection() {
  const t = useTranslations();

  return (
    <section className="w-full pt-8 md:pt-20 pb-40 px-8 md:px-20 bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8">
            <Token label={t.about.token} className="self-start" />
            <h2 className="text-title-2 md:text-title-tablet lg:text-title-2 font-bold text-foreground-main">
              {t.about.title}
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-text-l text-foreground-secondary leading-relaxed">
                {t.about.description1}
              </p>

              <p className="text-text-m text-foreground-terciary leading-relaxed">
                {t.about.description2}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/aboutus.png"
              alt={t.about.imageAlt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
