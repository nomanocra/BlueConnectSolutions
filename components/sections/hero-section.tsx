'use client';

import { useRef, useState } from 'react';
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

      // Créer un ScrollTrigger pour "épingler" le conteneur au milieu de l'écran
      const pinTrigger = ScrollTrigger.create({
        trigger: illustrationRef.current,
        start: 'center center', // Commence quand le centre de la section arrive au centre du viewport
        end: '+=200%', // Reste épinglé pendant 200% de la hauteur du viewport
        pin: true, // Épingle le conteneur
        pinSpacing: true, // Ajoute de l'espace pour compenser le pin
      });

      // Animation de la hauteur des Pillars (de 0 à leur hauteur finale)
      const pillarHeights = [175, 150, 250];
      const pillarRefs = [pillar1Ref, pillar2Ref, pillar3Ref];

      // Utiliser requestAnimationFrame pour s'assurer que les éléments sont rendus
      requestAnimationFrame(() => {
        pillarRefs.forEach((pillarRef, index) => {
          const pillarElement = pillarRef.current;
          if (!pillarElement) return;

          const bodyElement = pillarElement.querySelector(
            '.pillar-body'
          ) as HTMLElement;
          if (!bodyElement) return;

          // Trouver la structure (conteneur avec position relative)
          const structureElement = bodyElement.parentElement;
          if (!structureElement) return;

          // Constantes du composant Pillar
          const LOSANGE_HEIGHT = 60;
          const WRAPPER_HEIGHT = 70;
          const targetHeight = pillarHeights[index];
          const targetTotalHeight =
            targetHeight + WRAPPER_HEIGHT + LOSANGE_HEIGHT;
          const targetStructureHeight = targetHeight + LOSANGE_HEIGHT;

          // Trouver le losange du bas (le dernier div dans la structure)
          const allDivs = structureElement.querySelectorAll('div');
          const bottomLosange = allDivs[allDivs.length - 1] as HTMLElement;

          // Initialiser TOUT à 0
          bodyElement.style.height = '0px';
          structureElement.style.height = `${LOSANGE_HEIGHT}px`; // Juste le losange du haut
          pillarElement.style.height = `${WRAPPER_HEIGHT + LOSANGE_HEIGHT}px`; // Wrapper + losange du haut

          // Initialiser le losange du bas : au début, la structure fait juste LOSANGE_HEIGHT, donc le losange est en bas (top = 0)
          if (bottomLosange) {
            bottomLosange.style.top = '0px';
          }

          // Animer toutes les propriétés ensemble
          gsap.to(bodyElement, {
            height: targetHeight,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 80%',
              end: () => pinTrigger.end,
              scrub: 3,
            },
          });

          gsap.to(structureElement, {
            height: targetStructureHeight,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 80%',
              end: () => pinTrigger.end,
              scrub: 3,
            },
          });

          gsap.to(pillarElement, {
            height: targetTotalHeight,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 80%',
              end: () => pinTrigger.end,
              scrub: 3,
            },
          });

          // Animer le losange du bas pour qu'il reste en bas de la structure
          if (bottomLosange) {
            gsap.to(bottomLosange, {
              top: targetStructureHeight - LOSANGE_HEIGHT, // Reste toujours en bas de la structure
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: illustrationRef.current,
                start: 'top 80%',
                end: () => pinTrigger.end,
                scrub: 3,
              },
            });
          }
        });
      });

      // Animation de l'opacité des PillarIcons (de 0 à 1)
      // L'opacité reste à 0 pendant le pin et arrive à 1 juste avant la fin du pin
      const icons = [icon1Ref, icon2Ref, icon3Ref];

      icons.forEach((iconRef) => {
        if (iconRef.current) {
          // Initialiser l'opacité à 0 dès le départ pour éviter le flash
          gsap.set(iconRef.current, { opacity: 0 });

          gsap.to(iconRef.current, {
            opacity: 1,
            ease: 'power2.inOut', // Courbe ease-in-out pour une animation plus naturelle
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: 'top 80%', // L'animation commence dès que les composants apparaissent à l'écran
              end: () => pinTrigger.end, // L'opacité arrive à 1 exactement à la fin du pin
              scrub: 3, // Effet d'inertie : 3 secondes de délai pour un effet smooth
            },
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
