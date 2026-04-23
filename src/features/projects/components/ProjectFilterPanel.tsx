'use client';

import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  slug: string;
  count: number;
}

interface ProjectFilterPanelProps {
  categories: FilterOption[];
  languages: FilterOption[];
  activeCategories: string[];
  activeLanguages: string[];
  onCategoryToggle: (slug: string) => void;
  onLanguageToggle: (slug: string) => void;
  onReset: () => void;
}

export function ProjectFilterPanel({
  categories,
  languages,
  activeCategories,
  activeLanguages,
  onCategoryToggle,
  onLanguageToggle,
  onReset,
}: ProjectFilterPanelProps) {
  return (
    <aside className="space-y-6 rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold uppercase tracking-[0.2em]">Filter Matrix</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <FilterGroup
        title="Project Type"
        options={categories}
        active={activeCategories}
        onToggle={onCategoryToggle}
      />

      <FilterGroup
        title="Language & Stack"
        options={languages}
        active={activeLanguages}
        onToggle={onLanguageToggle}
      />
    </aside>
  );
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  active: string[];
  onToggle: (slug: string) => void;
}

function FilterGroup({ title, options, active, onToggle }: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = active.includes(option.slug);
          return (
            <button
              type="button"
              key={option.slug}
              onClick={() => onToggle(option.slug)}
              className={cn(
                'group rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300',
                'hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border/70 bg-muted/40 text-muted-foreground hover:border-border hover:text-foreground'
              )}
            >
              <span className="flex items-center gap-2">
                {option.label}
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[0.65rem] font-mono tracking-wider transition-colors duration-300',
                    isActive ? 'border-background text-background' : 'border-border text-muted-foreground'
                  )}
                >
                  {option.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
