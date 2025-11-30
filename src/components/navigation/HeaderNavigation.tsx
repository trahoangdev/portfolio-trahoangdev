'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { HOME_NAV_EVENT } from '@/lib/constants/navigation';
interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Project',
    href: '/project',
    isActive: (pathname) => pathname.startsWith('/project'),
  },
  {
    label: 'Tool',
    href: '/project#tool-stack',
    isActive: (pathname) => pathname.startsWith('/project'),
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

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show navbar if scrolled down more than 100px
      setIsVisible(scrollY > 100);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

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

        <nav className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.4em] transition-all duration-300',
                  'hover:text-foreground hover:-translate-y-0.5',
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
