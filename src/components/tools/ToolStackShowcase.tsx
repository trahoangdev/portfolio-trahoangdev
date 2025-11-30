'use client';

import { TechIcon } from '@/components/ui/TechIcon';
import type { ToolPaletteDto } from '@/application/tools/ToolPaletteService';

interface ToolStackShowcaseProps {
  groups: ToolPaletteDto[];
}

export function ToolStackShowcase({ groups }: ToolStackShowcaseProps) {
  return (
    <section
      id="tool-stack"
      className="space-y-8 rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur"
    >
      <header className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Tool Stack
        </span>
        <h2 className="text-2xl font-semibold uppercase tracking-[0.2em]">
          Matrix Arsenal
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Explore the core tools powering each build. Hover to reveal
          micro-notes and see how the stack flexes across frontend, backend,
          data, and daily drivers.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.category.slug}
            className="group relative overflow-hidden rounded-2xl border border-dashed border-border/80 bg-muted/30 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-solid hover:border-border hover:bg-muted/40 hover:shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent blur-3xl" />
            </div>

            <header className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold uppercase tracking-[0.3em]">
                {group.category.label}
              </h3>
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {group.items.length} tools
              </span>
            </header>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.items.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/60 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:bg-background/80 hover:shadow-lg"
                >
                  <TechIcon
                    tech={tool.techId}
                    size="1.75em"
                    className="rounded-xl bg-muted/60 p-2 transition duration-500 group-hover:rotate-3"
                    iconClassName="h-6 w-6"
                  />
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide">
                      {tool.name}
                    </div>
                    {tool.description ? (
                      <p className="text-xs text-muted-foreground">
                        {tool.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
