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

      {/* Noise Texture Overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />
    </div>
  );
}
