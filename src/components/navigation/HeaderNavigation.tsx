'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
    label: 'Experience',
    href: '/experience',
    isActive: (pathname) => pathname === '/experience',
  },
  {
    label: 'Tools & Projects',
    href: '/project',
    isActive: (pathname) => pathname === '/project',
  },
  /*{
    label: 'Certificate',
    href: '/certificates',
    isActive: (pathname) => pathname.startsWith('/certificates'),
  },*/
  {
    label: 'Blog',
    href: 'https://devorbitblog.vercel.app/',
    isActive: () => false,
  },
  /*{
    label: 'Service',
    href: '/#service',
    isActive: (pathname) => pathname === '/' || pathname.startsWith('/service'),
  },*/
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle scroll visibility
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
    isVisible || isMobileMenuOpen
      ? 'translate-y-0 opacity-100'
      : '-translate-y-8 opacity-0 pointer-events-none'
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-6 border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur sm:px-8 lg:px-16 transition-all duration-500',
          visibilityClasses
        )}
      >
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.5em] text-muted-foreground transition-colors hover:text-foreground z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          trahoangdev
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            const isExternal = item.href.startsWith('http');
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={`Navigate to ${item.label}`}
                aria-current={active ? 'page' : undefined}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.2em] lg:tracking-[0.4em] transition-all duration-300',
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-all duration-500 md:hidden',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center gap-8 p-4">
          {NAV_ITEMS.map((item, index) => {
            const active = item.isActive(pathname);
            const isExternal = item.href.startsWith('http');
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'text-lg font-semibold uppercase tracking-[0.4em] transition-all duration-300 transform',
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                  'hover:text-primary hover:scale-110',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
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
