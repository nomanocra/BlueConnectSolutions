'use client';

import { useRef, useState, useEffect } from 'react';
import { Kpi } from '@/components/ui';
import { useTranslations } from '@/lib/i18n';

export function KpisSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const kpisData = [
    {
      value: t.kpis.kpi1.value,
      label: t.kpis.kpi1.label,
      description: t.kpis.kpi1.description,
    },
    {
      value: t.kpis.kpi2.value,
      label: t.kpis.kpi2.label,
      description: t.kpis.kpi2.description,
    },
    {
      value: t.kpis.kpi3.value,
      label: t.kpis.kpi3.label,
      description: t.kpis.kpi3.description,
    },
    {
      value: t.kpis.kpi4.value,
      label: t.kpis.kpi4.label,
      description: t.kpis.kpi4.description,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8 pb-[120px] pt-[80px] px-8 md:px-[107px]">
          {kpisData.map((kpi, index) => (
            <div
              key={`${kpi.value}-${kpi.label}`}
              className={`flex-shrink-0 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Kpi
                className="flex flex-col gap-[8px] items-center text-center"
                value={kpi.value}
                label={kpi.label}
                description={kpi.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
