"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animation d'entrée du titre
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      // Animation au hover
      const handleMouseEnter = () => {
        gsap.to(titleRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(titleRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      titleRef.current.addEventListener('mouseenter', handleMouseEnter);
      titleRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        titleRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        titleRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <h1 
      ref={titleRef}
      className="text-6xl font-bold cursor-pointer"
    >
      BlueConnectSolution
    </h1>
  );
}

