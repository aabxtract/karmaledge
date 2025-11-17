import { cn } from '@/lib/utils';
import React from 'react';

type AuraConfig = {
  stop1: string;
  stop2: string;
  glowColor: string;
};

const AURA_CONFIG: Record<number, AuraConfig> = {
  1: { stop1: '#90CDF4', stop2: '#4299E1', glowColor: '#63B3ED' }, // soft blue
  2: { stop1: '#C4B5FD', stop2: '#8B5CF6', glowColor: '#A78BFA' }, // violet glow
  3: { stop1: '#6EE7B7', stop2: '#34D399', glowColor: '#34D399' }, // emerald
  4: { stop1: '#FCD34D', stop2: '#FBBF24', glowColor: '#FBBF24' }, // golden radiant
  5: { stop1: '#FFFFFF', stop2: '#E5E7EB', glowColor: '#FFFFFF' }, // white-light halo
};

export function KarmaAura({ level = 1, className }: { level: number; className?: string }) {
  const config = AURA_CONFIG[level] || AURA_CONFIG[1];
  const gradientId = `grad-${level}`;
  const filterId = `glow-${level}`;

  return (
    <div className={cn('relative w-full h-full flex items-center justify-center', className)}>
      <svg viewBox="0 0 200 200" className="absolute w-full h-full">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7`} result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor={config.stop1} />
            <stop offset="100%" stopColor={config.stop2} />
          </radialGradient>
        </defs>
      </svg>
      {/* Halo effect */}
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          boxShadow: `0 0 60px 20px ${config.glowColor}, 0 0 100px 40px ${config.glowColor} inset`,
          opacity: 0.3,
          animation: 'pulse 5s infinite ease-in-out',
        }}
      />
      {/* Main orb */}
      <div
        className="w-[80%] h-[80%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.stop1}, ${config.stop2})`,
          filter: `url(#${filterId})`,
        }}
      />
       <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
