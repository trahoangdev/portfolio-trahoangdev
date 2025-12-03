'use client';

import type { RefCallback } from 'react';

import { EXPERIENCES } from '@/lib/constants';
import { ExperienceCard } from '@/components/work/ExperienceCard';

interface WorkSectionProps {
  activeSection: string;
  sectionRef: RefCallback<HTMLElement>;
}

export function WorkSection({ activeSection, sectionRef }: WorkSectionProps) {
  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div
          className="magnet-card border-dotted-thick border-border p-6 opacity-0 translate-y-3 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
          data-inview={activeSection === 'work' ? 'true' : undefined}
          style={{
            transitionDelay: activeSection === 'work' ? '80ms' : '0ms',
          }}
        >
          <h2 id="work-heading" className="text-3xl sm:text-4xl font-bold uppercase">
            Roadmap
          </h2>
          <div className="text-sm text-muted-foreground font-mono mt-2">
            2022 — 2025
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {EXPERIENCES.map((job, index) => (
            <ExperienceCard 
              key={index} 
              job={job} 
              index={index} 
              activeSection={activeSection} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
