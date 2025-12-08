'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { HOME_NAV_EVENT } from '@/lib/constants/navigation';
import { SCROLL_THRESHOLD, THROTTLE_MS } from '@/lib/constants/ui';
interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Project',
    href: '/project',
    isActive: (pathname) => pathname === '/project',
  },
  {
    label: 'Certificate',
    href: '/certificates',
    isActive: (pathname) => pathname.startsWith('/certificates'),
  },
  {
    label: 'Tool',
    href: '/project#tool-stack',
    isActive: () => false, // Hash link shouldn't be active based on pathname
  },
  {
    label: 'Service',
    href: '/#service',
    isActive: (pathname) => pathname === '/' || pathname.startsWith('/service'),
  },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > SCROLL_THRESHOLD);
      throttleRef.current = null;
    }, THROTTLE_MS);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [isHome, handleScroll]);

  const visibilityClasses = cn(
    'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    isVisible
      ? 'translate-y-0 opacity-100'
      : '-translate-y-8 opacity-0 pointer-events-none'
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between gap-6 border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur sm:px-8 lg:px-16',
          visibilityClasses
        )}
      >
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground transition-colors hover:text-foreground"
        >
          trahoangdev
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={`Navigate to ${item.label}`}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.4em] transition-all duration-300',
                  'hover:text-foreground hover:-translate-y-0.5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
