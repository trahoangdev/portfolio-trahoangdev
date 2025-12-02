'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ProjectSnapshot } from '@/domain/projects/Project';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

interface ProjectShowcaseProps {
  projects: ProjectSnapshot[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex(index);
        setIsAutoplayActive(false);
        setTimeout(() => setIsAutoplayActive(true), 5000);
      }
    },
    [emblaApi]
  );

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      const next = (selectedIndex + 1) % projects.length;
      emblaApi.scrollTo(next);
      setSelectedIndex(next);
    }
  }, [emblaApi, selectedIndex, projects.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Autoplay effect
  useEffect(() => {
    if (!emblaApi || !isAutoplayActive) return;

    const autoplayInterval = setInterval(() => {
      scrollNext();
    }, 4000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, isAutoplayActive, scrollNext]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoplayActive(false);
  const handleMouseLeave = () => setIsAutoplayActive(true);

  if (projects.length === 0) return null;

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] min-w-0 px-4"
            >
              <ShowcaseCard
                project={project}
                isActive={index === selectedIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots - One per project */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'h-2 rounded-full transition-all duration-300 cursor-pointer',
                index === selectedIndex
                  ? 'bg-foreground w-6'
                  : 'bg-border hover:bg-muted-foreground w-2'
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === selectedIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ShowcaseCard({
  project,
  isActive,
}: {
  project: ProjectSnapshot;
  isActive: boolean;
}) {
  return (
    <Link href={project.link || '#'} target="_blank" className="block h-full">
      <article
        className={cn(
          'magnet-card relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-500',
          isActive
            ? 'scale-100 opacity-100 ring-2 ring-primary/20'
            : 'scale-95 opacity-70 hover:opacity-100'
        )}
      >
        {/* Image Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold uppercase tracking-wide line-clamp-1">
              {project.title}
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              {project.date}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.languages.slice(0, 3).map((lang) => (
              <span
                key={lang.slug}
                className="text-[10px] uppercase tracking-wider border border-border rounded px-2 py-1 text-muted-foreground"
              >
                {lang.label}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
