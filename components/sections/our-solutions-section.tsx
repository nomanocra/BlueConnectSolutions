'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pillar, PillarTileDescription } from '@/components/ui';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function OurSolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillarRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const description1Ref = useRef<HTMLDivElement>(null);
  const description2Ref = useRef<HTMLDivElement>(null);
  const description3Ref = useRef<HTMLDivElement>(null);

  const solution1 = {
    number: '1',
    title: '1. Cyber-Security',
    description:
      'Enterprise-grade security solutions with real-time threat detection, automated response, and comprehensive compliance management.',
    iconVariant: 'security' as const,
    pillarLabel: 'Cyber Security',
  };

  const solution2 = {
    number: '2',
    title: '2. Edge Compute IoT',
    description:
      'Edge computing solutions for IoT deployments with low latency processing, real-time analytics, and seamless device management.',
    iconVariant: 'edge' as const,
    pillarLabel: 'Edge Compute IoT',
  };

  const solution3 = {
    number: '3',
    title: '3. Video Broadcasting',
    description:
      'High-performance video streaming and broadcasting solutions with ultra-low latency, multi-format support, and global CDN integration.',
    iconVariant: 'broadcast' as const,
    pillarLabel: 'Video Broadcasting',
  };

  useGSAP(
    () => {
      if (!contentRef.current) return;

      // Créer un ScrollTrigger pour "épingler" le conteneur (header + pillar + description)
      const pinTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'center 50%', // Commence quand le haut du conteneur arrive au centre du viewport
        end: '+=600%', // Reste épinglé pendant 100% de la hauteur du viewport
        pin: true, // Épingle le conteneur
        pinSpacing: true, // Ajoute de l'espace pour compenser le pin
      });

      // Animation de la première tuile de description (de la droite vers la gauche avec transparence)
      // L'animation se déclenche juste avant le pin
      if (description1Ref.current) {
        // Initialiser l'état initial (invisible et décalé vers la droite, scale normal)
        gsap.set(description1Ref.current, {
          opacity: 0,
          x: 100,
          scale: 1, // Scale normal au début
        });

        // Animer avec ScrollTrigger réversible - juste avant le pin
        gsap.to(description1Ref.current, {
          opacity: 1,
          x: 0,
          scale: 1, // Garde le scale normal pendant l'animation d'arrivée
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'center 90%', // Commence avant le pin (qui est à center 50%)
            end: 'center 60%', // Se termine quand le pin commence
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }

      // Calculer les valeurs du pin pour les animations
      const pinStart = pinTrigger.start;
      const pinEnd = pinTrigger.end;
      const pinDuration = pinEnd - pinStart;

      // Animation du Pillar : basée sur la même approche que animated-pillars-section
      if (pillarRef.current) {
        const pillarElement = pillarRef.current;
        const bodyElement = pillarElement.querySelector(
          '.pillar-body'
        ) as HTMLElement;
        if (!bodyElement) return;

        const structureElement = bodyElement.parentElement;
        if (!structureElement) return;

        // Trouver le losange du bas
        const allDivs = structureElement.querySelectorAll('div');
        const bottomLosange = allDivs[allDivs.length - 1] as HTMLElement;

        const LOSANGE_HEIGHT = 60;
        const WRAPPER_HEIGHT = 70;
        const targetHeight = 200; // Réduit de 30px (était 250)
        const targetStructureHeight = targetHeight + LOSANGE_HEIGHT;
        const targetTotalHeight =
          targetHeight + WRAPPER_HEIGHT + LOSANGE_HEIGHT;

        // Initialiser TOUT à 0 avec gsap.set pour garantir l'initialisation
        gsap.set(bodyElement, { height: 0 });
        gsap.set(structureElement, { height: LOSANGE_HEIGHT });
        gsap.set(pillarElement, { height: WRAPPER_HEIGHT + LOSANGE_HEIGHT });
        if (bottomLosange) {
          gsap.set(bottomLosange, { top: 0 });
        }

        const easeConfig = 'power2.out';

        // 1. Augmente quand la première tuile arrive (center 90% à center 50% - début du pin)
        gsap.to(bodyElement, {
          height: targetHeight,
          ease: easeConfig,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'center 90%',
            end: 'center 50%', // Se termine au début du pin
            scrub: 1,
          },
        });
        gsap.to(structureElement, {
          height: targetStructureHeight,
          ease: easeConfig,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'center 90%',
            end: 'center 50%',
            scrub: 1,
          },
        });
        gsap.to(pillarElement, {
          height: targetTotalHeight,
          ease: easeConfig,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'center 90%',
            end: 'center 50%',
            scrub: 1,
          },
        });
        if (bottomLosange) {
          gsap.to(bottomLosange, {
            top: targetHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'center 90%',
              end: 'center 50%',
              scrub: 1,
            },
          });
        }

        // 2. Redescend à 0 avant l'arrivée de la deuxième card
        gsap.fromTo(
          bodyElement,
          {
            height: targetHeight,
          },
          {
            height: 0,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.05}`, // Commence juste après le début du pin
              end: () => `${pinStart + pinDuration * 0.18}`, // Se termine avant l'arrivée de la deuxième (qui est à 0.2)
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          structureElement,
          {
            height: targetStructureHeight,
          },
          {
            height: LOSANGE_HEIGHT,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.05}`,
              end: () => `${pinStart + pinDuration * 0.18}`,
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          pillarElement,
          {
            height: targetTotalHeight,
          },
          {
            height: WRAPPER_HEIGHT + LOSANGE_HEIGHT,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.05}`,
              end: () => `${pinStart + pinDuration * 0.18}`,
              scrub: 1,
            },
          }
        );
        if (bottomLosange) {
          gsap.fromTo(
            bottomLosange,
            {
              top: targetHeight,
            },
            {
              top: 0,
              ease: easeConfig,
              scrollTrigger: {
                trigger: contentRef.current,
                start: () => `${pinStart + pinDuration * 0.05}`,
                end: () => `${pinStart + pinDuration * 0.18}`,
                scrub: 1,
              },
            }
          );
        }

        // 3. Remonte à height max quand la deuxième card arrive (20% à 40% du pin)
        gsap.fromTo(
          bodyElement,
          {
            height: 0,
          },
          {
            height: targetHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.2}`, // En même temps que la deuxième card
              end: () => `${pinStart + pinDuration * 0.4}`, // Se termine en même temps
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          structureElement,
          {
            height: LOSANGE_HEIGHT,
          },
          {
            height: targetStructureHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.2}`,
              end: () => `${pinStart + pinDuration * 0.4}`,
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          pillarElement,
          {
            height: WRAPPER_HEIGHT + LOSANGE_HEIGHT,
          },
          {
            height: targetTotalHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.2}`,
              end: () => `${pinStart + pinDuration * 0.4}`,
              scrub: 1,
            },
          }
        );
        if (bottomLosange) {
          gsap.fromTo(
            bottomLosange,
            {
              top: 0,
            },
            {
              top: targetHeight,
              ease: easeConfig,
              scrollTrigger: {
                trigger: contentRef.current,
                start: () => `${pinStart + pinDuration * 0.2}`,
                end: () => `${pinStart + pinDuration * 0.4}`,
                scrub: 1,
              },
            }
          );
        }

        // 4. Redescend à 0 avant l'arrivée de la troisième card
        gsap.fromTo(
          bodyElement,
          {
            height: targetHeight,
          },
          {
            height: 0,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.45}`, // Commence après la deuxième card
              end: () => `${pinStart + pinDuration * 0.58}`, // Se termine avant l'arrivée de la troisième (qui est à 0.6)
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          structureElement,
          {
            height: targetStructureHeight,
          },
          {
            height: LOSANGE_HEIGHT,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.45}`,
              end: () => `${pinStart + pinDuration * 0.58}`,
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          pillarElement,
          {
            height: targetTotalHeight,
          },
          {
            height: WRAPPER_HEIGHT + LOSANGE_HEIGHT,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.45}`,
              end: () => `${pinStart + pinDuration * 0.58}`,
              scrub: 1,
            },
          }
        );
        if (bottomLosange) {
          gsap.fromTo(
            bottomLosange,
            {
              top: targetHeight,
            },
            {
              top: 0,
              ease: easeConfig,
              scrollTrigger: {
                trigger: contentRef.current,
                start: () => `${pinStart + pinDuration * 0.45}`,
                end: () => `${pinStart + pinDuration * 0.58}`,
                scrub: 1,
              },
            }
          );
        }

        // 5. Remonte à height max quand la troisième card arrive (60% à 80% du pin)
        gsap.fromTo(
          bodyElement,
          {
            height: 0,
          },
          {
            height: targetHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.6}`, // En même temps que la troisième card
              end: () => `${pinStart + pinDuration * 0.9}`, // Se termine en même temps
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          structureElement,
          {
            height: LOSANGE_HEIGHT,
          },
          {
            height: targetStructureHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.6}`,
              end: () => `${pinStart + pinDuration * 0.9}`,
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          pillarElement,
          {
            height: WRAPPER_HEIGHT + LOSANGE_HEIGHT,
          },
          {
            height: targetTotalHeight,
            ease: easeConfig,
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.6}`,
              end: () => `${pinStart + pinDuration * 0.9}`,
              scrub: 1,
            },
          }
        );
        if (bottomLosange) {
          gsap.fromTo(
            bottomLosange,
            {
              top: 0,
            },
            {
              top: targetHeight,
              ease: easeConfig,
              scrollTrigger: {
                trigger: contentRef.current,
                start: () => `${pinStart + pinDuration * 0.6}`,
                end: () => `${pinStart + pinDuration * 0.9}`,
                scrub: 1,
              },
            }
          );
        }
      }

      // Animation du numéro au-dessus du Pillar avec transition d'opacité
      if (numberRef.current) {
        // Initialiser l'opacité à 1
        gsap.set(numberRef.current, { opacity: 1 });

        // Changer de "1" à "2" - commence avant l'animation de la carte (18% à 22% du pin)
        let wasForward1to2 = false;
        const tl1to2 = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.18}`,
            end: () => `${pinStart + pinDuration * 0.22}`,
            scrub: 1,
            onUpdate: (self) => {
              // Détecter la direction du scroll
              const isForward = self.direction === 1;
              wasForward1to2 = isForward;
            },
          },
        });
        tl1to2
          .to(numberRef.current, {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          })
          .call(() => {
            // Changer le texte exactement quand l'opacité est à 0
            if (numberRef.current) {
              numberRef.current.textContent = wasForward1to2 ? '2' : '1';
            }
          })
          .to(numberRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          });

        // Changer de "2" à "3" - commence avant l'animation de la carte (58% à 62% du pin)
        let wasForward2to3 = false;
        const tl2to3 = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.58}`,
            end: () => `${pinStart + pinDuration * 0.62}`,
            scrub: 1,
            onUpdate: (self) => {
              // Détecter la direction du scroll
              const isForward = self.direction === 1;
              wasForward2to3 = isForward;
            },
          },
        });
        tl2to3
          .to(numberRef.current, {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          })
          .call(() => {
            // Changer le texte exactement quand l'opacité est à 0
            if (numberRef.current) {
              numberRef.current.textContent = wasForward2to3 ? '3' : '2';
            }
          })
          .to(numberRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          });
      }

      // Animation du label du Pillar avec transition d'opacité
      if (pillarRef.current) {
        const labelElement = pillarRef.current.querySelector(
          'p'
        ) as HTMLParagraphElement;

        if (labelElement) {
          // Initialiser l'opacité à 1
          gsap.set(labelElement, { opacity: 1 });

          // Changer de "Cyber Security" à "Edge Compute IoT" - commence avant l'animation de la carte (18% à 22% du pin)
          let wasForwardLabel1to2 = false;
          const tlLabel1to2 = gsap.timeline({
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.18}`,
              end: () => `${pinStart + pinDuration * 0.22}`,
              scrub: 1,
              onUpdate: (self) => {
                // Détecter la direction du scroll
                const isForward = self.direction === 1;
                wasForwardLabel1to2 = isForward;
              },
            },
          });
          tlLabel1to2
            .to(labelElement, {
              opacity: 0,
              duration: 0.15,
              ease: 'power2.in',
            })
            .call(() => {
              // Changer le texte exactement quand l'opacité est à 0
              if (labelElement) {
                labelElement.textContent = wasForwardLabel1to2
                  ? solution2.pillarLabel
                  : solution1.pillarLabel;
              }
            })
            .to(labelElement, {
              opacity: 1,
              duration: 0.15,
              ease: 'power2.out',
            });

          // Changer de "Edge Compute IoT" à "Video Broadcasting" - commence avant l'animation de la carte (58% à 62% du pin)
          let wasForwardLabel2to3 = false;
          const tlLabel2to3 = gsap.timeline({
            scrollTrigger: {
              trigger: contentRef.current,
              start: () => `${pinStart + pinDuration * 0.58}`,
              end: () => `${pinStart + pinDuration * 0.62}`,
              scrub: 1,
              onUpdate: (self) => {
                // Détecter la direction du scroll
                const isForward = self.direction === 1;
                wasForwardLabel2to3 = isForward;
              },
            },
          });
          tlLabel2to3
            .to(labelElement, {
              opacity: 0,
              duration: 0.15,
              ease: 'power2.in',
            })
            .call(() => {
              // Changer le texte exactement quand l'opacité est à 0
              if (labelElement) {
                labelElement.textContent = wasForwardLabel2to3
                  ? solution3.pillarLabel
                  : solution2.pillarLabel;
              }
            })
            .to(labelElement, {
              opacity: 1,
              duration: 0.15,
              ease: 'power2.out',
            });
        }
      }

      // Animation de la deuxième tuile de description (Edge Compute IoT)
      // Apparaît par-dessus la première avec la même animation, juste après la première
      if (description2Ref.current) {
        // Initialiser l'état initial (invisible et décalé vers la droite)
        gsap.set(description2Ref.current, {
          opacity: 0,
          x: 100,
        });

        // Animer avec ScrollTrigger réversible - juste après la première carte
        // Utiliser des valeurs basées sur le scroll absolu pour éviter les problèmes avec le pin
        gsap.to(description2Ref.current, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.2}`, // 20% après le début du pin
            end: () => `${pinStart + pinDuration * 0.4}`, // 40% après le début du pin
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }

      // Animation de la première carte : se décale vers la gauche et se rétrécit quand la deuxième arrive
      // Part de sa position actuelle (x: 0 après son animation d'arrivée)
      if (description1Ref.current) {
        // Détecter si on est sur mobile
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const offsetX1 = isMobile ? -20 : -50; // Moins de décalage sur mobile
        const scale1 = isMobile ? 0.95 : 0.9; // Moins de rétrécissement sur mobile

        // S'assurer que la première carte est à sa position finale (x: 0) avant l'animation
        gsap.set(description1Ref.current, { x: 0, scale: 1 });

        gsap.to(description1Ref.current, {
          x: offsetX1, // Décalage vers la gauche depuis sa position actuelle
          scale: scale1, // Rétrécissement
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.2}`, // En même temps que la deuxième carte
            end: () => `${pinStart + pinDuration * 0.4}`, // Se termine en même temps
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }

      // Animation de la troisième tuile de description (Video Broadcasting)
      // Apparaît par-dessus les deux premières avec la même animation, après la deuxième
      if (description3Ref.current) {
        // Initialiser l'état initial (invisible et décalé vers la droite)
        gsap.set(description3Ref.current, {
          opacity: 0,
          x: 100,
        });

        // Animer avec ScrollTrigger réversible - après la deuxième carte
        gsap.to(description3Ref.current, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.6}`, // Commence quand la deuxième se termine (40%)
            end: () => `${pinStart + pinDuration * 0.9}`, // Se termine à 60% du pin
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }

      // Animation de la première carte : se décale encore plus vers la gauche et se rétrécit encore plus quand la troisième arrive
      // Part de sa position actuelle (x: -50, scale: 0.9) après le premier décalage
      if (description1Ref.current) {
        // Détecter si on est sur mobile
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const startX1 = isMobile ? -20 : -50;
        const startScale1 = isMobile ? 0.95 : 0.9;
        const endX1 = isMobile ? -35 : -100; // Moins de décalage sur mobile
        const endScale1 = isMobile ? 0.92 : 0.8; // Moins de rétrécissement sur mobile

        // S'assurer que la première carte part de sa position actuelle après le premier décalage
        gsap.set(description1Ref.current, { x: startX1, scale: startScale1 });

        gsap.to(description1Ref.current, {
          x: endX1, // Décalage encore plus vers la gauche (part de startX1)
          scale: endScale1, // Rétrécissement encore plus (part de startScale1)
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.6}`, // En même temps que la troisième carte
            end: () => `${pinStart + pinDuration * 0.9}`, // Se termine en même temps
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }

      // Animation de la deuxième carte : se décale vers la gauche et se rétrécit quand la troisième arrive
      if (description2Ref.current) {
        // Détecter si on est sur mobile
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const offsetX2 = isMobile ? -20 : -50; // Moins de décalage sur mobile
        const scale2 = isMobile ? 0.95 : 0.9; // Moins de rétrécissement sur mobile

        // S'assurer que la deuxième carte est à sa position finale avant l'animation
        gsap.set(description2Ref.current, { x: 0, scale: 1 });

        gsap.to(description2Ref.current, {
          x: offsetX2, // Décalage vers la gauche depuis sa position actuelle
          scale: scale2, // Rétrécissement
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: () => `${pinStart + pinDuration * 0.6}`, // En même temps que la troisième carte
            end: () => `${pinStart + pinDuration * 0.9}`, // Se termine en même temps
            scrub: 1, // Rend l'animation réversible et liée au scroll
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background-2 border-t border-b border-background-4"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[120px] items-start px-8 md:px-[80px] py-[120px] w-full">
          {/* Header + Content - Tout sera piné ensemble */}
          <div
            ref={contentRef}
            className="flex flex-col gap-8 md:gap-[120px] items-start w-full"
          >
            {/* Header */}
            <div className="flex flex-col gap-[10px] items-start w-full">
              <h2 className="text-title-2 md:text-title-tablet lg:text-title-2 font-bold text-foreground-main leading-[48px]">
                Our Tree Pilars
              </h2>
              <p className="text-text-m text-foreground-terciary w-full">
                Everything you need to build, secure, and scale your digital
                operations
              </p>
            </div>

            {/* Solution - Single Pillar */}
            <div className="flex gap-[120px] h-auto md:h-[396px] min-h-[calc(100vh-300px)] md:min-h-0 items-stretch w-full">
              {/* Left Side - Number and Pillar */}
              <div className="hidden md:flex flex-col gap-[20px] h-full items-center justify-end relative">
                {/* Number */}
                <div className="flex flex-col h-[56px] justify-center">
                  <span
                    ref={numberRef}
                    className="text-[40px] font-black text-white leading-[32px]"
                  >
                    {solution1.number}
                  </span>
                </div>

                {/* Pillar - fixé en bas avec position absolute */}
                <div
                  className="opacity-60 relative"
                  style={{ height: '380px', width: '160px' }}
                >
                  <div
                    className="absolute left-0 right-0"
                    style={{ bottom: '-50px' }}
                  >
                    <Pillar
                      ref={pillarRef}
                      label={solution1.pillarLabel}
                      height={0}
                    />
                  </div>
                </div>

                {/* Spacer */}
                <div className="h-[49px] w-[126px]" />
              </div>

              {/* Right Side - Description Cards using PillarTileDescription */}
              <div className="relative flex-1 h-full min-h-[calc(100vh-300px)] md:min-h-0 md:h-[396px]">
                {/* Première carte - Cyber Security */}
                <div ref={description1Ref} className="absolute inset-0 h-full">
                  <PillarTileDescription
                    title={solution1.title}
                    description={solution1.description}
                    iconVariant={solution1.iconVariant}
                    width="100%"
                    height={396}
                    className="h-full md:h-[396px]"
                  />
                </div>
                {/* Deuxième carte - Edge Compute IoT (par-dessus la première) */}
                <div ref={description2Ref} className="absolute inset-0 h-full">
                  <PillarTileDescription
                    title={solution2.title}
                    description={solution2.description}
                    iconVariant={solution2.iconVariant}
                    width="100%"
                    height={396}
                    className="h-full md:h-[396px]"
                  />
                </div>
                {/* Troisième carte - Video Broadcasting (par-dessus les deux premières) */}
                <div ref={description3Ref} className="absolute inset-0 h-full">
                  <PillarTileDescription
                    title={solution3.title}
                    description={solution3.description}
                    iconVariant={solution3.iconVariant}
                    width="100%"
                    height={396}
                    className="h-full md:h-[396px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
