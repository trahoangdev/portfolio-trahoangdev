'use client';

import { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = useMemo(() => {
    const result: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
      return result;
    }

    // Always show first page
    result.push(1);

    if (currentPage > 3) {
      result.push('ellipsis-start');
    }

    // Pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    if (currentPage < totalPages - 2) {
      result.push('ellipsis-end');
    }

    // Always show last page
    result.push(totalPages);

    return result;
  }, [currentPage, totalPages]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  return (
    <nav
      role="navigation"
      aria-label="Project pagination"
      className="flex items-center justify-center gap-1.5 pt-4"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-sm transition-all duration-300',
          currentPage === 1
            ? 'cursor-not-allowed text-muted-foreground/30'
            : 'text-muted-foreground hover:border-foreground/40 hover:bg-muted/40 hover:text-foreground'
        )}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page) => {
        if (typeof page === 'string') {
          return (
            <span
              key={page}
              className="inline-flex h-9 w-9 items-center justify-center text-xs text-muted-foreground/50 select-none"
              aria-hidden
            >
              ···
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300',
              isActive
                ? 'border border-foreground/80 bg-foreground text-background'
                : 'border border-border/60 text-muted-foreground hover:border-foreground/40 hover:bg-muted/40 hover:text-foreground'
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-sm transition-all duration-300',
          currentPage === totalPages
            ? 'cursor-not-allowed text-muted-foreground/30'
            : 'text-muted-foreground hover:border-foreground/40 hover:bg-muted/40 hover:text-foreground'
        )}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
