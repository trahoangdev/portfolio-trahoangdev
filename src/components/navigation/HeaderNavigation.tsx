'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
//import { HOME_NAV_EVENT } from '@/lib/constants/navigation';
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
    label: 'Skills & Projects',
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
    href: '/blog',
    isActive: (pathname) => pathname === '/blog' || pathname.startsWith('/blog/'),
  },
  // {
  //   label: 'Resume',
  //   href: '/resume',
  //   isActive: (pathname) => pathname === '/resume',
  // },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();
  }, [isMobileMenuOpen]);

  const handleMobileMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
      return;
    }

    if (event.key !== 'Tab') return;

    const menuLinks = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    );
    const focusable = menuButtonRef.current
      ? [menuButtonRef.current, ...menuLinks]
      : menuLinks;
    const first = focusable[0];
    const last = focusable.at(-1);

    if (!first || !last) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

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

  const isHeaderVisible = !isHome || isVisible;

  const visibilityClasses = cn(
    'transition-interface duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    isHeaderVisible || isMobileMenuOpen
      ? 'translate-y-0 opacity-100'
      : '-translate-y-8 opacity-0 pointer-events-none'
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center print:hidden">
      <div
        className={cn(
          'relative z-50 mt-4 flex w-[95%] max-w-5xl items-center justify-between gap-6 rounded-full border border-border/60 bg-background/80 px-6 py-3 backdrop-blur shadow-lg transition-interface duration-500',
          visibilityClasses
        )}
      >
        <Link
          href="/"
          tabIndex={isHeaderVisible || isMobileMenuOpen ? undefined : -1}
          className="text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.5em] text-muted-foreground transition-colors hover:text-foreground z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          trahoangdev
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="flex max-lg:hidden items-center gap-6">
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
                tabIndex={isHeaderVisible ? undefined : -1}
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.2em] lg:tracking-[0.4em] transition-interface duration-300',
                  'hover:text-foreground hover:scale-110',
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
          ref={menuButtonRef}
          className="flex lg:hidden relative z-50 p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          tabIndex={isHeaderVisible || isMobileMenuOpen ? undefined : -1}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen ? (
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onKeyDown={handleMobileMenuKeyDown}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8 p-4">
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
                  'text-lg font-semibold uppercase tracking-[0.4em] transition-interface duration-300 transform',
                  'translate-y-0 opacity-100',
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
      ) : null}
    </header>
  );
}
