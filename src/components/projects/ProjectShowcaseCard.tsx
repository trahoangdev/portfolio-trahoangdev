'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import type { ProjectSnapshot } from '@/domain/projects/Project';
import { TechIcon } from '@/components/ui/TechIcon';
import { cn } from '@/lib/utils';

interface ProjectShowcaseCardProps {
  project: ProjectSnapshot;
  index: number;
  isFeatured: boolean;
  onToggleFeatured: (projectId: string) => void;
}

export function ProjectShowcaseCard({
  project,
  index,
  isFeatured,
  onToggleFeatured,
}: ProjectShowcaseCardProps) {
  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFeatured(project.id);
  };

  const cardContent = (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/40',
        'transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-1 hover:border-border hover:bg-muted/40 hover:shadow-2xl'
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          priority={index < 4}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-background via-background/90 to-transparent p-4">
          {project.categories.map((category) => (
            <span
              key={category.slug}
              className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/80 backdrop-blur-sm"
            >
              {category.label}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isFeatured}
        aria-label={isFeatured ? 'Remove project from featured list' : 'Add project to featured list'}
        className={cn(
          'absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground transition-colors duration-300',
          isFeatured
            ? 'border-yellow-400 text-yellow-400'
            : 'hover:border-border hover:text-foreground'
        )}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={isFeatured ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.702.663.322.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.983 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.042 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <header className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:text-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.summary}</p>
        </header>

        <div className="flex flex-wrap gap-2">
          {project.languages.map((language) => (
            <span
              key={language.slug}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:border-border group-hover:text-foreground"
            >
              <TechIcon
                tech={language.label}
                size="1.1em"
                as="span"
                unstyled
                className="flex h-4 w-4 items-center justify-center rounded-full bg-background/80 p-1"
                iconClassName="h-4 w-4"
              />
              {language.label}
            </span>
          ))}
        </div>

        <footer className="mt-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>{project.date}</span>
          {project.link ? (
            <span className="inline-flex items-center gap-2 text-sm transition-transform duration-500 group-hover:translate-x-1">
              View project
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
            </span>
          ) : (
            <span className="text-sm uppercase tracking-wide">In progress</span>
          )}
        </footer>
      </div>
    </article>
  );

  if (!project.link) {
    return cardContent;
  }

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {cardContent}
    </Link>
  );
}
