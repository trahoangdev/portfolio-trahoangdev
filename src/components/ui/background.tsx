'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background transition-colors duration-500">
      {/* Mesh Gradient Blobs */}
      <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-primary/5 opacity-30 blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen dark:opacity-10" />
      <div className="absolute top-[10%] -right-[10%] h-[60%] w-[60%] rounded-full bg-purple-500/5 opacity-30 blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen dark:opacity-10" />
      <div className="absolute -bottom-[20%] left-[20%] h-[60%] w-[60%] rounded-full bg-blue-500/5 opacity-30 blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen dark:opacity-10" />

      {/* Noise Texture Overlay for texture - CSS generated */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
