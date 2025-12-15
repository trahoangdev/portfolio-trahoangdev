'use client';

import { cn } from '@/lib/utils';

interface SectionNavigationProps {
  activeSection: string;
  isVisible?: boolean;
}

export function SectionNavigation({ activeSection, isVisible = true }: SectionNavigationProps) {
  const sections = ['intro', 'featured', 'philosophy', 'service'];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={cn(
        'fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block',
        'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      )}
    >
      <div className="flex flex-col gap-4 p-4 border-dotted-thick border-border bg-background/90 backdrop-blur">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-8 border-dotted-thin transition-all duration-500 hover-lift ${activeSection === section
              ? 'bg-foreground border-foreground'
              : 'bg-transparent border-border hover:bg-muted'
              }`}
            aria-label={`Navigate to ${section}`}
          />
        ))}
      </div>
    </nav>
  );
}
