'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Kpi } from '@/components/ui';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function KpisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const kpi1Ref = useRef<HTMLDivElement>(null);
  const kpi2Ref = useRef<HTMLDivElement>(null);
  const kpi3Ref = useRef<HTMLDivElement>(null);
  const kpi4Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const kpiRefs = [kpi1Ref, kpi2Ref, kpi3Ref, kpi4Ref];

      // Créer une timeline pour animer les KPIs séquentiellement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 3, // Rend l'animation réversible et liée au scroll
        },
      });

      kpiRefs.forEach((kpiRef, index) => {
        const kpiElement = kpiRef.current;
        if (!kpiElement) return;

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
          index * 0.1 // Délai progressif entre chaque KPI
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center pb-[120px] pt-[80px] px-2 md:px-[107px] gap-8">
          {/* Premier wrapper avec les 2 premiers KPIs */}
          <div className="flex flex-wrap items-center justify-center gap-12 flex-1 min-w-[300px] sm:min-w-[400px]">
            <div ref={kpi1Ref}>
              <Kpi
                className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
                value="100%"
                label="Project Guarantee"
                description="High quality products and processes"
              />
            </div>
            <div ref={kpi2Ref}>
              <Kpi
                className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
                value="+20"
                label="Years of Experience"
                description="Lightning-fast response times"
              />
            </div>
          </div>

          {/* Deuxième wrapper avec les 2 derniers KPIs */}
          <div className="flex flex-wrap items-center justify-center gap-12 flex-1 min-w-[300px] sm:min-w-[400px]">
            <div ref={kpi3Ref}>
              <Kpi
                className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
                value="24/7"
                label="Support & Monitoring"
                description="Real-time threat detection"
              />
            </div>
            <div ref={kpi4Ref}>
              <Kpi
                className="flex flex-col gap-[8px] items-center text-center text-nowrap flex-1 min-w-[169px]"
                value="150+"
                label="Global Deployments"
                description="Worldwide infrastructure"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
