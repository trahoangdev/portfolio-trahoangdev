'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ProjectCatalogDto } from '@/application/projects/ProjectCatalogService';
import { ProjectFilterState } from '@/modules/projects/state/ProjectFilterState';
import { ProjectFilterPanel } from '@/components/projects/ProjectFilterPanel';
import { ProjectShowcaseCard } from '@/components/projects/ProjectShowcaseCard';
import {
  ToolPaletteService,
  type ToolPaletteDto,
} from '@/application/tools/ToolPaletteService';
import { StaticToolRepository } from '@/infrastructure/tools/StaticToolRepository';
import { ToolPaletteController } from '@/modules/tools/controllers/ToolPaletteController';
import { ToolStackShowcase } from '@/components/tools/ToolStackShowcase';
import {
  createProjectPreferenceController,
} from '@/modules/projects/ProjectModule';
import { getProjectCatalog } from '@/app/actions/project';

export function ProjectExplorer() {
  // projectController and refreshController removed in favor of Server Action
  const preferenceController = useMemo(
    () => createProjectPreferenceController(),
    []
  );
  const toolController = useMemo(
    () =>
      new ToolPaletteController(
        new ToolPaletteService(new StaticToolRepository())
      ),
    []
  );

  const [catalog, setCatalog] = useState<ProjectCatalogDto | null>(null);
  const [toolGroups, setToolGroups] = useState<ToolPaletteDto[]>([]);
  const [filterState, setFilterState] = useState<ProjectFilterState>(() =>
    ProjectFilterState.empty()
  );
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [featuredIds, setFeaturedIds] = useState<Set<string>>(new Set());
  const requestIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    void toolController.loadPalette().then((groups) => {
      if (isMounted) {
        setToolGroups(groups);
      }
    });

    setIsReady(false);
    setError(null);

    void getProjectCatalog()
      .then((data) => {
        if (isMounted) {
          setCatalog(data);
          setFilterState(ProjectFilterState.empty());
          setIsReady(true);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load projects.'
          );
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [toolController]);

  useEffect(() => {
    let isMounted = true;

    void preferenceController
      .listFeatured()
      .then((ids) => {
        if (isMounted) {
          setFeaturedIds(new Set(ids));
        }
      })
      .catch(() => { });

    const unsubscribe = preferenceController.subscribe((ids) => {
      if (isMounted) {
        setFeaturedIds(new Set(ids));
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [preferenceController]);

  const runFilter = useCallback(
    (state: ProjectFilterState) => {
      const requestId = ++requestIdRef.current;

      void getProjectCatalog(state.getCategorySlugs(), state.getLanguageSlugs())
        .then((data) => {
          if (requestId === requestIdRef.current) {
            setCatalog(data);
            setError(null);
          }
        })
        .catch((err: unknown) => {
          if (requestId === requestIdRef.current) {
            setError(
              err instanceof Error ? err.message : 'Failed to filter projects.'
            );
          }
        });
    },
    []
  );

  const handleCategoryToggle = useCallback(
    (slug: string) => {
      setFilterState((previous) => {
        const next = previous.toggleCategory(slug);
        runFilter(next);
        return next;
      });
    },
    [runFilter]
  );

  const handleLanguageToggle = useCallback(
    (slug: string) => {
      setFilterState((previous) => {
        const next = previous.toggleLanguage(slug);
        runFilter(next);
        return next;
      });
    },
    [runFilter]
  );

  const handleReset = useCallback(() => {
    const empty = ProjectFilterState.empty();
    setFilterState(empty);
    runFilter(empty);
  }, [runFilter]);

  const handleRefresh = useCallback(() => {
    const requestId = ++requestIdRef.current;
    setIsRefreshing(true);
    setError(null);

    void getProjectCatalog(filterState.getCategorySlugs(), filterState.getLanguageSlugs())
      .then((data) => {
        if (requestId === requestIdRef.current) {
          setCatalog(data);
        }
      })
      .catch((err: unknown) => {
        if (requestId === requestIdRef.current) {
          setError(
            err instanceof Error ? err.message : 'Failed to refresh projects.'
          );
        }
      })
      .finally(() => {
        if (requestId === requestIdRef.current) {
          setIsRefreshing(false);
        }
      });
  }, [filterState]);

  const handleToggleFeatured = useCallback(
    (projectId: string) => {
      void preferenceController
        .toggleFeatured(projectId)
        .then((ids) => {
          setFeaturedIds(new Set(ids));
          setError(null);
        })
        .catch((err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to update featured projects.';
          setError(message);
        });
    },
    [preferenceController]
  );

  if (!isReady && !catalog) {
    return (
      <div className="space-y-8">
        <div className="h-14 w-3/4 rounded-2xl bg-muted/40" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-64 rounded-2xl bg-muted/30" />
          ))}
        </div>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="space-y-8 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-12 text-center">
        <h2 className="text-lg font-semibold uppercase tracking-[0.3em]">
          Unable to load projects
        </h2>
        <p className="text-sm text-muted-foreground">
          {error ??
            'Please verify the configured GitHub or Hugging Face profile and try again.'}
        </p>
        <button
          type="button"
          onClick={handleRefresh}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  const activeCategories = filterState.getCategorySlugs();
  const activeLanguages = filterState.getLanguageSlugs();
  const projects = catalog.projects;

  return (
    <div className="space-y-12">
      <header className="space-y-4 rounded-2xl border border-border/60 bg-background/50 p-8 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Matrix Archive
          </span>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-300 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>{isRefreshing ? 'Refreshing' : 'Reload'}</span>
            <svg
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h5M4 9a9 9 0 0116.58-1M20 20v-5h-5M20 15a9 9 0 01-16.58 1"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-4xl font-bold uppercase tracking-[0.2em]">
          Project Hypergrid
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Filter by vibe, stack, and mission to discover each build in the
          matrix. Every project couples thoughtful design with high-signal
          engineering narratives.
        </p>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </header>

      <ToolStackShowcase groups={toolGroups} />

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ProjectFilterPanel
          categories={catalog.facets.categories}
          languages={catalog.facets.languages}
          activeCategories={activeCategories}
          activeLanguages={activeLanguages}
          onCategoryToggle={handleCategoryToggle}
          onLanguageToggle={handleLanguageToggle}
          onReset={handleReset}
        />

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {projects.length} projects
            </span>
            {activeCategories.length + activeLanguages.length > 0 ? (
              <span className="text-xs uppercase tracking-[0.3em] text-foreground">
                Active filters:{' '}
                {activeCategories.length + activeLanguages.length}
              </span>
            ) : (
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                All signals
              </span>
            )}
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-12 text-center text-sm text-muted-foreground">
              No projects match the current tags. Flip a different combination
              to reveal a new dimension.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  index={index}
                  isFeatured={featuredIds.has(project.id)}
                  onToggleFeatured={handleToggleFeatured}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
