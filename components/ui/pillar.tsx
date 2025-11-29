import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface PillarProps {
  label?: string;
  height?: number;
  className?: string;
  bodyClassName?: string; // Classe pour le body (utilisé pour l'animation GSAP)
  style?: React.CSSProperties;
}

// Variables fixes
const LOSANGE_HEIGHT = 60;
const WRAPPER_HEIGHT = 70;
const WRAPPER_WIDTH = 100;
const PILLAR_WIDTH = 160;
const RECTANGLE_WIDTH = 146;
const SHADOW_WIDTH = 86;
const SHADOW_HEIGHT = 35;

const Pillar = React.forwardRef<HTMLDivElement, PillarProps>(
  (
    {
      label = 'Label',
      height = 200,
      className,
      bodyClassName,
      style,
      ...props
    },
    ref
  ) => {
    // Générer des IDs uniques pour les SVG
    const shadowFilterId = useId();
    const bottomGradientId = useId();

    // Hauteur totale du composant = height + WrapperHeight + LosangeHeight
    const totalHeight = height + WRAPPER_HEIGHT + LOSANGE_HEIGHT;

    // Hauteur de la PillarStructure = height + LosangeHeight
    const structureHeight = height + LOSANGE_HEIGHT;

    // Position du shadow (centré au milieu du losange top)
    const shadowTop = LOSANGE_HEIGHT / 2 - SHADOW_HEIGHT / 2;
    const shadowLeft = (PILLAR_WIDTH - SHADOW_WIDTH) / 2;

    // Position des losanges et rectangle
    const losangeLeft = (PILLAR_WIDTH - RECTANGLE_WIDTH) / 2;
    const topLosangeTop = 0;
    const bottomLosangeTop = structureHeight - LOSANGE_HEIGHT;

    // Position du rectangle (du milieu du losange top au milieu du losange bottom)
    const rectangleTop = LOSANGE_HEIGHT / 2;
    const rectangleHeight = height; // Le rectangle a la même hauteur que le paramètre height

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        style={{ width: PILLAR_WIDTH, height: totalHeight, ...style }}
        {...props}
      >
        {/* PillarStructure - Contient tous les éléments en position absolute */}
        <div
          className="relative"
          style={{ width: PILLAR_WIDTH, height: structureHeight }}
        >
          {/* Shadow - align top */}
          <div
            className="absolute"
            style={{
              top: shadowTop,
              left: shadowLeft,
              width: SHADOW_WIDTH,
              height: SHADOW_HEIGHT,
              zIndex: 4,
            }}
          >
            <svg
              width={SHADOW_WIDTH}
              height={SHADOW_HEIGHT}
              viewBox="0 0 86 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <filter
                  id={shadowFilterId}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feGaussianBlur
                    stdDeviation="5"
                    result="effect1_foregroundBlur"
                  />
                </filter>
              </defs>
              <g filter={`url(#${shadowFilterId})`}>
                <ellipse
                  cx={SHADOW_WIDTH / 2}
                  cy={SHADOW_HEIGHT / 2}
                  rx={32.7508}
                  ry={7.36646}
                  fill="#1F4A85"
                  opacity="0.3"
                />
              </g>
            </svg>
          </div>

          {/* TopLosange - align top */}
          <div
            className="absolute"
            style={{
              top: topLosangeTop,
              left: losangeLeft,
              width: RECTANGLE_WIDTH,
              height: LOSANGE_HEIGHT,
              zIndex: 3,
            }}
          >
            <svg
              width={RECTANGLE_WIDTH}
              height={LOSANGE_HEIGHT}
              viewBox="0 0 146 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              <path
                d="M65.4709 1.83218C70.0106 0.062386 75.049 0.0558932 79.593 1.81461L142.827 26.2892C145.81 27.4435 145.81 31.6633 142.827 32.8175L79.593 57.2912C75.049 59.0499 70.0106 59.0444 65.4709 57.2746L2.72876 32.8136C-0.242748 31.6551 -0.242821 27.4506 2.72876 26.2921L65.4709 1.83218Z"
                fill="#5B95D5"
                stroke="#94B9E5"
              />
            </svg>
          </div>

          {/* Body - align bottom top (stretch entre top et bottom) */}
          <div
            className={cn('absolute pillar-body', bodyClassName)}
            style={{
              top: rectangleTop,
              left: losangeLeft,
              width: RECTANGLE_WIDTH,
              height: rectangleHeight,
              background:
                'linear-gradient(270deg, #3576C0 40.38%, #1F4A85 56.25%)',
              zIndex: 2,
            }}
          />

          {/* BottomLosange - align bottom */}
          <div
            className="absolute"
            style={{
              top: bottomLosangeTop,
              left: losangeLeft,
              width: RECTANGLE_WIDTH,
              height: LOSANGE_HEIGHT,
              zIndex: 1,
              filter: 'drop-shadow(0px -10px 32px rgba(91, 149, 213, 0.5))',
            }}
          >
            <svg
              width={RECTANGLE_WIDTH}
              height={LOSANGE_HEIGHT}
              viewBox="0 0 146 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient
                  id={bottomGradientId}
                  x1="152.646"
                  y1="29.5531"
                  x2="-7.01245"
                  y2="29.5531"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.403846" stopColor="#3576C0" />
                  <stop offset="0.5625" stopColor="#1F4A85" />
                </linearGradient>
              </defs>
              <path
                d="M65.2898 57.7403L2.5471 33.2799C-0.84903 31.956 -0.84903 27.1503 2.5471 25.8263L65.2898 1.366C69.9459 -0.44918 75.1128 -0.455484 79.7733 1.34832L143.008 25.8228C146.416 27.1419 146.416 31.9643 143.008 33.2835L79.7733 57.758C75.1128 59.5618 69.9459 59.5555 65.2898 57.7403Z"
                fill={`url(#${bottomGradientId})`}
              />
            </svg>
          </div>
        </div>

        {/* PillarLabelWrapper - flex avec contenu centré, pas de padding, hauteur et largeur fixe */}
        <div
          className="flex items-center justify-center"
          style={{
            width: WRAPPER_WIDTH,
            height: WRAPPER_HEIGHT,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* Label - prend toute la hauteur et largeur du wrapper */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-text-s text-center text-foreground-main font-medium opacity-50 leading-[20px] break-words">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

Pillar.displayName = 'Pillar';

export { Pillar };
