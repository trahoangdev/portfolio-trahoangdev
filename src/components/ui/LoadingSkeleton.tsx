import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'circle';
}

export function LoadingSkeleton({ className, variant = 'default' }: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-muted/40';
  
  const variantClasses = {
    default: 'h-4 w-full rounded',
    card: 'h-64 w-full rounded-2xl',
    text: 'h-4 w-3/4 rounded',
    circle: 'h-12 w-12 rounded-full',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

interface LoadingGridProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function LoadingGrid({ count = 4, columns = 2, className }: LoadingGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridClasses[columns], className)}>
      {[...Array(count)].map((_, index) => (
        <LoadingSkeleton key={index} variant="card" />
      ))}
    </div>
  );
}

export function LoadingProjectCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-background/40 p-6">
      <LoadingSkeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2">
        <LoadingSkeleton className="h-6 w-16 rounded-full" />
        <LoadingSkeleton className="h-6 w-20 rounded-full" />
        <LoadingSkeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function LoadingHeader() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-10 w-1/2" />
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-4 w-2/3" />
    </div>
  );
}
