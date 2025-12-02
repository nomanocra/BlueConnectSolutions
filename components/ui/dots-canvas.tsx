'use client';

import { useEffect, useRef } from 'react';

export function DotsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Paramètres
    const dotSize = 1;
    const spacing = 15;
    const maskWidth = spacing * 10; // Largeur des masques (beaucoup plus long)
    const masksPerLine = 15; // Nombre de masques par ligne
    const animationDuration = 40000; // Durée d'un cycle complet (aller-retour) en ms
    let animationFrameId: number;
    let startTime = Date.now();

    // Cache pour les patterns de masques (générés une seule fois)
    let cachedMaskPatterns: Array<{
      masks: Array<{ position: number; width: number }>;
      direction: number;
    }> | null = null;
    let cachedPatternsWidth = 0;
    let cachedPatternsHeight = 0;

    // Fonction pour générer un nombre pseudo-aléatoire basé sur une seed
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Générer les patterns de masques pour chaque ligne (une seule fois)
    const generateMaskPatterns = (numLines: number, width: number) => {
      const patterns: Array<{
        masks: Array<{ position: number; width: number }>;
        direction: number;
      }> = [];

      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const seed = lineIndex * 12345; // Seed unique pour chaque ligne
        const isEvenLine = lineIndex % 2 === 0;
        const direction = isEvenLine ? 1 : -1; // 1 = droite, -1 = gauche

        // Générer des masques avec positions et largeurs aléatoires
        const masks: Array<{ position: number; width: number }> = [];

        for (let i = 0; i < masksPerLine; i++) {
          const randomValue = seededRandom(seed + i * 1000);
          const randomWidthFactor = seededRandom(seed + i * 2000);
          // Facteur aléatoire entre 0.5 et 3
          const widthFactor = 0.5 + randomWidthFactor * 2.5;
          const individualMaskWidth = maskWidth * widthFactor;

          // Position aléatoire sur une zone beaucoup plus large pour créer des cycles plus longs
          // Multiplier par 5 pour étendre le pattern sur une zone 5 fois plus large
          const patternWidth = (width + maskWidth * 3) * 5;
          const position = randomValue * patternWidth;

          masks.push({ position, width: individualMaskWidth });
        }

        // Trier les masques par position pour éviter les chevauchements
        masks.sort((a, b) => a.position - b.position);

        patterns.push({ masks, direction });
      }

      return patterns;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (!width || !height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Créer un dégradé radial pour la couleur des points
      // Plus intense en bas, moins intense en haut
      const centerX = width / 2;
      const centerY = height;

      // Couleurs du dégradé du design system (bleu clair à bleu foncé mais toujours visible)
      const lightBlue = { r: 148, g: 185, b: 229 }; // primary-1 - bleu clair
      const darkBlue = { r: 53, g: 118, b: 192 }; // primary-3 - bleu principal (pas trop foncé)

      // Couleur du background pour les masques
      const bgColor = { r: 2, g: 3, b: 6 }; // background-1

      // Dessiner les points en grille avec dégradé
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // Calculer la distance depuis le bas pour appliquer le dégradé vertical
          const distanceFromBottom = height - y;
          const normalizedDistance = Math.min(
            Math.max(distanceFromBottom / height, 0),
            1
          );

          // Calculer la distance horizontale depuis le centre pour le dégradé radial
          const distanceFromCenter = Math.abs(x - centerX) / (width / 2);

          // Combiner les deux distances pour créer un dégradé radial
          const radialDistance = Math.sqrt(
            Math.pow(1 - normalizedDistance, 2) +
              Math.pow(distanceFromCenter, 2)
          );

          // Interpoler entre bleu clair et bleu foncé selon la position verticale
          const t = normalizedDistance; // 0 = haut (foncé), 1 = bas (clair)

          // Interpoler les couleurs RGB
          const r = Math.round(lightBlue.r * t + darkBlue.r * (1 - t));
          const g = Math.round(lightBlue.g * t + darkBlue.g * (1 - t));
          const b = Math.round(lightBlue.b * t + darkBlue.b * (1 - t));

          // Opacité avec un peu de transparence pour un effet plus subtil
          const baseOpacity = 0.5 + (1 - Math.min(radialDistance, 1)) * 0.25;
          const opacity = baseOpacity * 0.7; // Réduire l'opacité globale de 30%

          const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Générer ou réutiliser les patterns de masques (cache)
      const numLines = Math.ceil((height + spacing) / spacing);
      if (
        !cachedMaskPatterns ||
        cachedPatternsWidth !== width ||
        cachedPatternsHeight !== height
      ) {
        cachedMaskPatterns = generateMaskPatterns(numLines, width);
        cachedPatternsWidth = width;
        cachedPatternsHeight = height;
      }
      const maskPatterns = cachedMaskPatterns;

      // Calculer l'offset animé avec effet yoyo (va-et-vient)
      // Utiliser Math.sin pour créer un mouvement de 0 à maxDistance puis retour à 0
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;
      // Math.sin va de -1 à 1, on le normalise de 0 à 1
      const yoyoProgress =
        (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      // Distance maximale : correspond à la largeur des patterns (5x la largeur de base)
      const maxDistance = (width + maskWidth * 3) * 5;
      const maskOffset = yoyoProgress * maxDistance;

      // Précalculer les valeurs constantes pour toutes les lignes
      const maxMaskWidth = maskWidth * 6; // Largeur maximale possible
      const cycleLength = width + maxMaskWidth * 2;
      const startX = -maxMaskWidth;
      const endX = width + maxMaskWidth;

      // Dessiner les masques noirs animés pour chaque ligne
      let lineIndex = 0;
      for (let y = 0; y < height + spacing; y += spacing) {
        if (lineIndex >= maskPatterns.length) break;

        const pattern = maskPatterns[lineIndex];

        // Dessiner chaque masque de cette ligne
        for (const mask of pattern.masks) {
          const individualMaskWidth = mask.width;

          // Calculer la position animée du masque avec effet yoyo
          let baseX: number;
          if (pattern.direction === 1) {
            // Déplacement vers la droite (puis retour)
            // Les lignes paires vont de gauche à droite puis reviennent
            baseX = mask.position + maskOffset;
          } else {
            // Déplacement vers la gauche (puis retour)
            // Les lignes impaires vont de droite à gauche puis reviennent
            // On inverse le mouvement en soustrayant maskOffset
            baseX = mask.position - maskOffset;
          }

          // Normaliser la position pour qu'elle reste dans une plage continue
          // On utilise un modulo mais on s'assure que les masques couvrent toujours la zone visible
          let normalizedX = baseX;

          // S'assurer que les masques couvrent toujours la zone visible (-maxMaskWidth à width + maxMaskWidth)
          while (normalizedX < -maxMaskWidth) {
            normalizedX += cycleLength;
          }
          while (normalizedX > width + maxMaskWidth) {
            normalizedX -= cycleLength;
          }

          // Calculer la position du premier masque dans la zone visible
          const firstMaskX =
            normalizedX -
            Math.floor((normalizedX - startX) / cycleLength) * cycleLength;

          // Créer un gradient linéaire pour l'effet de transparence sur les bords
          const fadeWidth = individualMaskWidth * 0.2; // 20% de la largeur pour le fondu
          const gradient = ctx.createLinearGradient(
            firstMaskX,
            0,
            firstMaskX + individualMaskWidth,
            0
          );

          // Gradient : transparent -> opaque -> transparent
          gradient.addColorStop(
            0,
            `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0)`
          );
          gradient.addColorStop(
            fadeWidth / individualMaskWidth,
            `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 1)`
          );
          gradient.addColorStop(
            1 - fadeWidth / individualMaskWidth,
            `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 1)`
          );
          gradient.addColorStop(
            1,
            `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0)`
          );

          ctx.fillStyle = gradient;

          // Dessiner tous les masques nécessaires pour couvrir la zone visible
          for (let x = firstMaskX; x < endX; x += cycleLength) {
            // Créer un nouveau gradient pour chaque position (car le gradient est relatif)
            const maskGradient = ctx.createLinearGradient(
              x,
              0,
              x + individualMaskWidth,
              0
            );
            maskGradient.addColorStop(
              0,
              `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0)`
            );
            maskGradient.addColorStop(
              fadeWidth / individualMaskWidth,
              `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 1)`
            );
            maskGradient.addColorStop(
              1 - fadeWidth / individualMaskWidth,
              `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 1)`
            );
            maskGradient.addColorStop(
              1,
              `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0)`
            );

            ctx.fillStyle = maskGradient;
            ctx.fillRect(x, y - dotSize, individualMaskWidth, dotSize * 2 + 1);
          }
        }

        lineIndex++;
      }
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Fonction pour ajuster la taille du canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Ajuster la taille réelle du canvas pour le devicePixelRatio
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Ajuster le contexte pour le devicePixelRatio
      ctx.scale(dpr, dpr);

      // Ajuster la taille CSS pour qu'elle corresponde à la taille réelle
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Invalider le cache des patterns pour les régénérer avec les nouvelles dimensions
      cachedMaskPatterns = null;
      cachedPatternsWidth = 0;
      cachedPatternsHeight = 0;

      draw();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Démarrer l'animation
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
