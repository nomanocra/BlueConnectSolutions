'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !tileRef.current) return;

      // Initialiser l'état initial (invisible et décalé vers la droite)
      gsap.set(tileRef.current, {
        opacity: 0,
        x: 100,
      });

      // Animer avec ScrollTrigger réversible
      gsap.to(tileRef.current, {
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 10%',
          scrub: 2, // Rend l'animation réversible et liée au scroll
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-background-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[80px] items-center justify-center p-[80px]">
          {/* Section Container with blue background and dot pattern */}
          <div
            ref={tileRef}
            className="flex flex-col gap-[48px] items-center max-w-[1200px] p-[80px] rounded-[24px] w-full relative overflow-hidden"
            style={
              {
                backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
                linear-gradient(314deg, #255da4 21.16%, #3576c0 77%)
              `,
                backgroundSize: '24px 24px, 100% 100%',
                backgroundPosition: '0 0, 0 0',
              } as React.CSSProperties
            }
          >
            {/* Title - single line, h-[110px] for proper spacing */}
            <div className="flex flex-col h-[110px] justify-center max-w-[600px] w-full">
              <h2 className="text-title-2 font-bold text-[#f8f8f8] text-center leading-[48px]">
                Ready to Transform Your Digital Infrastructure?
              </h2>
            </div>

            {/* Description - single line, h-[58.5px] for proper spacing */}
            <div className="flex flex-col h-[58.5px] justify-center max-w-[600px] w-full">
              <p className="text-[20px] font-normal text-[rgba(248,248,248,0.9)] text-center leading-[32.5px]">
                Join leading organizations worldwide who trust Blue Connect.
                Solutions to power their digital transformation journey.
              </p>
            </div>

            {/* Button - white background with dark text */}
            <Button
              label="Contact Us"
              variant="secondary"
              size="M"
              rightIconVariant="arrow-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
