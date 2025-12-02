'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Kpi } from '@/components/ui';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const KPIS_DATA = [
  {
    value: '100%',
    label: 'Project Guarantee',
    description: 'High quality products and processes',
  },
  {
    value: '+20',
    label: 'Years of Experience',
    description: 'Lightning-fast response times',
  },
  {
    value: '24/7',
    label: 'Support & Monitoring',
    description: 'Real-time threat detection',
  },
  {
    value: '150+',
    label: 'Global Deployments',
    description: 'Worldwide infrastructure',
  },
] as const;

export function KpisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Sélectionner tous les conteneurs de KPI directement
      const kpiContainers = containerRef.current.children;

      // Créer une timeline pour animer les KPIs séquentiellement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 3,
        },
      });

      Array.from(kpiContainers).forEach((kpiElement, index) => {
        // Initialiser l'état initial (invisible et décalé vers le bas)
        gsap.set(kpiElement, {
          opacity: 0,
          y: 20,
        });

        // Ajouter l'animation à la timeline avec un délai progressif
        tl.to(
          kpiElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          index * 0.1
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={containerRef}
          className="flex flex-wrap justify-center items-start gap-4 md:gap-8 pb-[120px] pt-[80px] px-8 md:px-[107px]"
        >
          {KPIS_DATA.map((kpi) => (
            <div key={`${kpi.value}-${kpi.label}`} className="flex-shrink-0">
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
