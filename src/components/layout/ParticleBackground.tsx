'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

export function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.floor(Math.random() * 8 + 3);
      const animationDuration = Math.random() * 10 + 10;
      const animationDelay = Math.random() * 10;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const isPrimary = Math.random() > 0.5;

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
        },
        className: isPrimary ? 'bg-primary' : 'bg-accent',
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className={cn(
              'absolute rounded-full animate-[float_infinite_ease-in-out] opacity-70 blur-sm',
              p.className
            )}
            style={p.style}
          />
        ))}
      </div>
    </div>
  );
}
