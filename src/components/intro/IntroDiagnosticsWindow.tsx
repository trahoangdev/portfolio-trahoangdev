'use client';

import { Fragment } from 'react';

import { TypewriterLine } from '@/components/intro/TypewriterLine';
import { cn } from '@/lib/utils';

export type WindowPhase = 'intro' | 'typing' | 'outro';

interface IntroDiagnosticsWindowProps {
  phase: WindowPhase;
  targetLines: string[];
  typedLines: string[];
  activeLineIndex: number;
}

export function IntroDiagnosticsWindow({
  phase,
  targetLines,
  typedLines,
  activeLineIndex,
}: IntroDiagnosticsWindowProps) {
  const visibility = phase === 'outro' ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <div
      className={cn(
        'pointer-events-none w-[min(90vw,420px)] min-h-[280px] rounded-xl border border-border/80 bg-background/95 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'overflow-hidden backdrop-blur-sm',
        visibility,
      )}
    >
      <header className="flex items-center justify-between border-b border-border/60 bg-muted/80 px-4 py-3">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Matrix Diagnostics
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-border">—</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-border">▢</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-border">✕</span>
        </div>
      </header>

      <div className="space-y-3 px-6 py-6">
        {targetLines.map((line, index) => (
          <Fragment key={line}>
            <TypewriterLine
              text={typedLines[index] ?? ''}
              isActive={activeLineIndex === index && phase === 'typing'}
              isComplete={index < activeLineIndex || (index === activeLineIndex && typedLines[index] === line)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
