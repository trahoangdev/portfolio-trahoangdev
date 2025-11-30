'use client';

import { cn } from '@/lib/utils';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiDocker,
  SiFastapi,
  SiPostgresql,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';
import { IconType } from 'react-icons';

interface ProjectFilterBarProps {
  selectedLanguage: string | null;
  onSelectLanguage: (language: string | null) => void;
  availableLanguages: string[];
}

const ICON_MAP: Record<string, IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  TypeScript: SiTypescript,
  Python: SiPython,
  'Node.js': SiNodedotjs,
  Docker: SiDocker,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
};

export function ProjectFilterBar({
  selectedLanguage,
  onSelectLanguage,
  availableLanguages,
}: ProjectFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <button
        onClick={() => onSelectLanguage(null)}
        className={cn(
          'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border',
          selectedLanguage === null
            ? 'bg-foreground text-background border-foreground'
            : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
        )}
      >
        All
      </button>

      {availableLanguages.map((lang) => {
        const Icon = ICON_MAP[lang];
        if (!Icon) return null;

        return (
          <button
            key={lang}
            onClick={() =>
              onSelectLanguage(lang === selectedLanguage ? null : lang)
            }
            className={cn(
              'group relative p-3 rounded-full border transition-all duration-300',
              selectedLanguage === lang
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-transparent border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            )}
            title={lang}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-wider whitespace-nowrap bg-popover px-2 py-1 rounded shadow-lg pointer-events-none">
              {lang}
            </span>
          </button>
        );
      })}
    </div>
  );
}
