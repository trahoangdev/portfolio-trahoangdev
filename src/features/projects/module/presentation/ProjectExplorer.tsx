import { ToolPaletteService } from '@/features/tools/application/ToolPaletteService';
import { StaticToolRepository } from '@/features/tools/infrastructure/StaticToolRepository';
import { ToolStackShowcase } from '@/features/tools/components/ToolStackShowcase';
import { PersonalProjectsShowcase } from '@/features/projects/components/PersonalProjectsShowcase';
export async function ProjectExplorer() {
  const toolGroups = await new ToolPaletteService(
    new StaticToolRepository()
  ).loadPalette();

  return (
    <div className="space-y-12">
      <header className="space-y-4 rounded-2xl border border-border/60 bg-background/50 p-6 sm:p-8 backdrop-blur">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Matrix Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-[0.2em] break-words">
          Project Hypergrid
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-muted-foreground">
          Selected builds across frontend, backend, product engineering, and
          applied AI—paired with the tools used to ship them.
        </p>
      </header>

      <PersonalProjectsShowcase />

      <ToolStackShowcase groups={toolGroups} />
    </div>
  );
}
