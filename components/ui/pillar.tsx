import React from 'react';
import { cn } from '@/lib/utils';

export interface PillarProps {
  // Label affiché en bas du pilier
  label?: string;

  // Taille
  width?: number | string;
  height?: number | string;

  // Comportement
  className?: string;
}

const Pillar = React.forwardRef<HTMLDivElement, PillarProps>(
  (
    { label = 'Label', width = 160, height = 406, className, ...props },
    ref
  ) => {
    // Width fixe selon Figma
    const fixedWidth = 160;
    const actualHeight = typeof height === 'number' ? height : 406;

    // Dimensions des éléments fixes (selon Figma)
    const shadowWidth = 86;
    const shadowHeight = 35;
    const squareTopHeight = 60;
    const squareBottomHeight = 60;
    const rectangleWidth = 146;

    // Position du shadow (centré au milieu du losange top)
    const shadowTop = squareTopHeight / 2 - shadowHeight / 2; // Centré verticalement sur le losange top
    const shadowCenterX = (fixedWidth - shadowWidth) / 2;

    // Position du losange top (fixé en top)
    const topSquareTop = 0;
    const squareCenterX = (fixedWidth - rectangleWidth) / 2;

    // Position du rectangle (commence au milieu du losange top et finit au milieu du losange bottom)
    const rectangleTop = squareTopHeight / 2; // Au milieu du losange top (30px)
    const centerX = (fixedWidth - rectangleWidth) / 2;

    // Position du losange bottom (décalé vers le haut pour laisser place au label)
    const labelHeight = 20; // Hauteur approximative du label
    const bottomSquareTop = actualHeight - squareBottomHeight - labelHeight - 4; // Position du losange bottom
    const rectangleBottom =
      actualHeight - bottomSquareTop - squareBottomHeight / 2; // Au milieu du losange bottom

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{ width: fixedWidth, height: actualHeight }}
        {...props}
      >
        {/* 1. Shadow - Positionné au-dessus du losange top, centré horizontalement */}
        <div
          className="absolute"
          style={{
            top: shadowTop,
            left: shadowCenterX,
            width: shadowWidth,
            height: shadowHeight,
            zIndex: 3,
          }}
        >
          <svg
            width={shadowWidth}
            height={shadowHeight}
            viewBox="0 0 86 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <filter
                id={`filter0_f_pillar_${label}`}
                x="0"
                y="0"
                width="85.5016"
                height="34.7329"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="5"
                  result="effect1_foregroundBlur"
                />
              </filter>
            </defs>
            <g opacity="0.3" filter={`url(#filter0_f_pillar_${label})`}>
              <ellipse
                cx={shadowWidth / 2}
                cy={shadowHeight / 2}
                rx={32.7508}
                ry={7.36646}
                fill="#1F4A85"
              />
            </g>
          </svg>
        </div>

        {/* 2. Losange top - Fixé en top, aligné avec le rectangle pour effet 3D */}
        <div
          className="absolute"
          style={{
            top: topSquareTop,
            left: squareCenterX,
            width: rectangleWidth,
            height: squareTopHeight,
            zIndex: 2,
          }}
        >
          <svg
            width={rectangleWidth}
            height={squareTopHeight}
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

        {/* 3. Rectangle au centre - Fixé entre top et bottom, s'étire en hauteur, aligné avec les losanges */}
        <div
          className="absolute"
          style={{
            top: rectangleTop,
            bottom: rectangleBottom,
            left: centerX,
            width: rectangleWidth,
            background:
              'linear-gradient(270deg, #3576C0 40.38%, #1F4A85 56.25%)',
            zIndex: 1,
          }}
        />

        {/* 4. Losange bottom - Décalé vers le haut pour laisser place au label */}
        <div
          className="absolute"
          style={{
            top: bottomSquareTop,
            left: squareCenterX,
            width: rectangleWidth,
            height: squareBottomHeight,
            zIndex: 0,
          }}
        >
          <svg
            width={rectangleWidth}
            height={squareBottomHeight}
            viewBox="0 0 146 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <linearGradient
                id={`paint0_linear_bottom_${label}`}
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
              fill={`url(#paint0_linear_bottom_${label})`}
            />
          </svg>
        </div>

        {/* Label en bas - à l'intérieur du composant */}
        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-text-s text-foreground-main opacity-50 text-center whitespace-nowrap font-medium">
          {label}
        </p>
      </div>
    );
  }
);

Pillar.displayName = 'Pillar';

export { Pillar };
