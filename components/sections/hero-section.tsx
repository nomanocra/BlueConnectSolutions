'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button, Token, Pillar, PillarIcon } from '@/components/ui';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export interface HeroSectionProps {
  onExploreSolutions?: () => void;
}

export function HeroSection({ onExploreSolutions }: HeroSectionProps = {}) {
  // Refs pour les éléments à animer
  const illustrationRef = useRef<HTMLDivElement>(null);
  const pillar1Ref = useRef<HTMLDivElement>(null);
  const pillar2Ref = useRef<HTMLDivElement>(null);
  const pillar3Ref = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!illustrationRef.current) return;

      // Créer un ScrollTrigger pour "épingler" le conteneur un peu en dessous du centre
      const pinTrigger = ScrollTrigger.create({
        trigger: illustrationRef.current,
        start: 'center 60%', // Commence quand le centre de la section arrive à 60% du viewport
        end: '+=100%', // Reste épinglé pendant 100% de la hauteur du viewport (durée réduite)
        pin: true, // Épingle le conteneur
        pinSpacing: true, // Ajoute de l'espace pour compenser le pin
      });

      // Configuration partagée pour toutes les animations
      const scrollTriggerConfig = {
        trigger: illustrationRef.current,
        start: 'top 80%',
        end: () => pinTrigger.end,
        scrub: 3,
      };

      const easeConfig = 'power2.inOut';

      // Constantes du composant Pillar
      const LOSANGE_HEIGHT = 60;
      const WRAPPER_HEIGHT = 70;

      // Animation de la hauteur des Pillars (de 0 à leur hauteur finale)
      const pillarHeights = [175, 150, 250];
      const pillarRefs = [pillar1Ref, pillar2Ref, pillar3Ref];

      pillarRefs.forEach((pillarRef, index) => {
        const pillarElement = pillarRef.current;
        if (!pillarElement) return;

        const bodyElement = pillarElement.querySelector(
          '.pillar-body'
        ) as HTMLElement;
        if (!bodyElement) return;

        const structureElement = bodyElement.parentElement;
        if (!structureElement) return;

        // Trouver le losange du bas (le dernier div dans la structure)
        const allDivs = structureElement.querySelectorAll('div');
        const bottomLosange = allDivs[allDivs.length - 1] as HTMLElement;

        const targetHeight = pillarHeights[index];
        const targetStructureHeight = targetHeight + LOSANGE_HEIGHT;
        const targetTotalHeight =
          targetHeight + WRAPPER_HEIGHT + LOSANGE_HEIGHT;

        // Initialiser TOUT à 0
        bodyElement.style.height = '0px';
        structureElement.style.height = `${LOSANGE_HEIGHT}px`;
        pillarElement.style.height = `${WRAPPER_HEIGHT + LOSANGE_HEIGHT}px`;
        pillarElement.style.opacity = '0';

        if (bottomLosange) {
          bottomLosange.style.top = '0px';
        }

        // Animer toutes les propriétés avec la même config
        gsap.to(bodyElement, {
          height: targetHeight,
          ease: easeConfig,
          scrollTrigger: scrollTriggerConfig,
        });

        gsap.to(structureElement, {
          height: targetStructureHeight,
          ease: easeConfig,
          scrollTrigger: scrollTriggerConfig,
        });

        gsap.to(pillarElement, {
          height: targetTotalHeight,
          opacity: 1,
          ease: easeConfig,
          scrollTrigger: scrollTriggerConfig,
        });

        if (bottomLosange) {
          gsap.to(bottomLosange, {
            top: targetHeight, // Simplifié : targetStructureHeight - LOSANGE_HEIGHT = targetHeight
            ease: easeConfig,
            scrollTrigger: scrollTriggerConfig,
          });
        }
      });

      // Animation de l'opacité des PillarIcons (de 0 à 1)
      const icons = [icon1Ref, icon2Ref, icon3Ref];

      icons.forEach((iconRef) => {
        if (iconRef.current) {
          gsap.set(iconRef.current, { opacity: 0 });
          gsap.to(iconRef.current, {
            opacity: 1,
            ease: easeConfig,
            scrollTrigger: scrollTriggerConfig,
          });
        }
      });
    },
    { scope: illustrationRef }
  );

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
                onClick={onExploreSolutions}
              />
            </div>
          </div>

          {/* AnimatedIllustration */}
          <div
            ref={illustrationRef}
            className="flex gap-10 items-start justify-center px-20 pb-20"
          >
            <div className="relative w-full h-[620px]">
              {/* Pillars */}

              <Pillar
                ref={pillar1Ref}
                label="Cyber Security"
                height={0}
                className="absolute bottom-[73px] left-[calc(50%-175.5px)] -translate-x-1/2"
              />
              <Pillar
                ref={pillar2Ref}
                label="Video Broadcasting"
                height={0}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              />
              <Pillar
                ref={pillar3Ref}
                label="Edge Compute IoT"
                height={0}
                className="absolute bottom-[73px] left-[calc(50%+175.5px)] -translate-x-1/2"
              />

              {/* PillarIcons - positionnés par rapport au bottom du conteneur */}

              <div
                ref={icon1Ref}
                className="absolute bottom-[425px] left-[calc(50%-175.5px)] -translate-x-1/2"
                style={{ opacity: 0 }}
              >
                <PillarIcon iconVariant="security" size={72} />
              </div>
              <div
                ref={icon2Ref}
                className="absolute bottom-[325px] left-1/2 -translate-x-1/2"
                style={{ opacity: 0 }}
              >
                <PillarIcon iconVariant="broadcast" size={72} />
              </div>
              <div
                ref={icon3Ref}
                className="absolute bottom-[500px] left-[calc(50%+175.5px)] -translate-x-1/2"
                style={{ opacity: 0 }}
              >
                <PillarIcon iconVariant="edge" size={72} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
