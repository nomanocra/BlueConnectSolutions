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
    const spacing = 20;

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

      // Dessiner les points en grille avec dégradé
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // Calculer la distance depuis le bas pour appliquer le dégradé vertical
          const distanceFromBottom = height - y;
          const normalizedDistance = Math.min(Math.max(distanceFromBottom / height, 0), 1);
          
          // Calculer la distance horizontale depuis le centre pour le dégradé radial
          const distanceFromCenter = Math.abs(x - centerX) / (width / 2);
          
          // Combiner les deux distances pour créer un dégradé radial
          const radialDistance = Math.sqrt(
            Math.pow(1 - normalizedDistance, 2) + Math.pow(distanceFromCenter, 2)
          );
          
          // Interpoler entre bleu clair et bleu foncé selon la position verticale
          const t = normalizedDistance; // 0 = haut (foncé), 1 = bas (clair)
          
          // Interpoler les couleurs RGB
          const r = Math.round(lightBlue.r * t + darkBlue.r * (1 - t));
          const g = Math.round(lightBlue.g * t + darkBlue.g * (1 - t));
          const b = Math.round(lightBlue.b * t + darkBlue.b * (1 - t));
          
          // Opacité élevée pour rendre les points bien visibles
          const opacity = 0.6 + (1 - Math.min(radialDistance, 1)) * 0.3;
          
          const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
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
      
      draw();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

