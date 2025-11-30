'use client';

import { useEffect, useMemo, useState, type RefCallback } from 'react';
import Link from 'next/link';

import type { ProjectSnapshot } from '@/domain/projects/Project';
import {
  createProjectControllers,
  createProjectPreferenceController,
} from '@/modules/projects/ProjectModule';
import { ProjectShowcase } from './ProjectShowcase';
import { ProjectFilterBar } from './ProjectFilterBar';
import { cn } from '@/lib/utils';

interface ProjectSectionProps {
  activeSection: string;
  sectionRef: RefCallback<HTMLElement>;
}

const SECTION_ID = 'project';
const FEATURE_COUNT = 5; // Increased for carousel

export function ProjectSection({
  activeSection,
  sectionRef,
}: ProjectSectionProps) {
  const [catalogProjects, setCatalogProjects] = useState<ProjectSnapshot[]>([]);
  const [featuredIds, setFeaturedIds] = useState<Set<string>>(new Set());
  const [featuredProjects, setFeaturedProjects] = useState<ProjectSnapshot[]>(
    []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { refresh: refreshController } = useMemo(
    () => createProjectControllers(),
    []
  );
  const preferenceController = useMemo(
    () => createProjectPreferenceController(),
    []
  );

  useEffect(() => {
    let isMounted = true;

    void refreshController.initialLoad().then((catalog) => {
      if (!isMounted) {
        return;
      }

      setCatalogProjects(catalog.projects);
    });

    return () => {
      isMounted = false;
    };
  }, [refreshController]);

  useEffect(() => {
    let isMounted = true;

    void preferenceController.listFeatured().then((ids) => {
      if (!isMounted) {
        return;
      }
      setFeaturedIds(new Set(ids));
    });

    const unsubscribe = preferenceController.subscribe((ids) => {
      if (!isMounted) {
        return;
      }
      setFeaturedIds(new Set(ids));
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [preferenceController]);

  useEffect(() => {
    // Use the 'featured' flag from the project itself if available, OR the local preference IDs
    const featured = catalogProjects.filter(
      (p) => p.featured || featuredIds.has(p.id)
    );
    setFeaturedProjects(featured.slice(0, FEATURE_COUNT));
  }, [catalogProjects, featuredIds]);

  const filteredProjects = useMemo(() => {
    if (!selectedLanguage) return catalogProjects;
    return catalogProjects.filter((p) =>
      p.languages.some(
        (l) =>
          l.label === selectedLanguage ||
          l.slug === selectedLanguage.toLowerCase()
      )
    );
  }, [catalogProjects, selectedLanguage]);

  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    catalogProjects.forEach((p) => {
      p.languages.forEach((l) => languages.add(l.label));
    });
    return Array.from(languages);
  }, [catalogProjects]);

  const isActiveSection = activeSection === SECTION_ID;

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
      data-inview={isActiveSection ? 'true' : undefined}
    >
      <div className="space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Project Hypergrid
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Enter the dedicated project space to explore full case studies,
              tag-driven filtering, and the entire stack powering each build.
            </p>
          </div>
          <Link
            href="/project"
            className="inline-flex items-center gap-3 border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
          >
            View All
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Showcase Carousel */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground/70 pl-1">
            Featured Showcase
          </h3>
          <ProjectShowcase projects={featuredProjects} />
        </div>

        {/* Filter & Grid */}
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
              Filter by Tech Stack
            </h3>
            <ProjectFilterBar
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              availableLanguages={availableLanguages}
            />
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <FeatureCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No projects found with this tech stack.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  project: ProjectSnapshot;
}

function FeatureCard({ project }: FeatureCardProps) {
  return (
    <article className="magnet-card flex h-full flex-col gap-4 border-pulse-animated border-border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
        <span>{project.date}</span>
        <span>{project.categories[0]?.label ?? 'Project'}</span>
      </div>
      <h3 className="text-lg font-semibold uppercase tracking-[0.3em]">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {project.summary}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 text-xs uppercase tracking-wide text-muted-foreground pt-4">
        {project.languages.slice(0, 3).map((language) => (
          <span
            key={language.slug}
            className="rounded-full border border-border px-3 py-1 hover:bg-muted transition-colors"
          >
            {language.label}
          </span>
        ))}
        {project.languages.length > 3 ? (
          <span className="rounded-full border border-border px-3 py-1">
            +{project.languages.length - 3}
          </span>
        ) : null}
      </div>
    </article>
  );
}
