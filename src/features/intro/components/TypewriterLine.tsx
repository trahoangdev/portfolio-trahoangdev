'use client';

import { cn } from '@/lib/utils';

interface TypewriterLineProps {
  text: string;
  isActive: boolean;
  isComplete: boolean;
}

export function TypewriterLine({ text, isActive, isComplete }: TypewriterLineProps) {
  return (
    <p
      className={cn(
        'font-mono text-sm text-left tracking-wide text-muted-foreground',
        isComplete && 'text-foreground',
      )}
    >
      {text}
      {isActive ? <span className="ml-1 inline-block animate-[blink_1s_steps(2,start)_infinite]">▌</span> : null}
      <style jsx>{`
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </p>
  );
}
