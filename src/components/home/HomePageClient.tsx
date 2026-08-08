'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTheme } from '@/hooks/useTheme';
import { useIntroOverlay } from '@/hooks/useIntroOverlay';
import { SectionNavigation } from '@/components/navigation/SectionNavigation';
import { IntroOverlay } from '@/features/intro/components/IntroOverlay';
import { IntroSection } from '@/features/intro/components/IntroSection';
import { ConnectSection } from '@/components/connect/ConnectSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Philosophy } from '@/components/home/Philosophy';
import { LatestBlog } from '@/components/home/LatestBlog';
import type { BlogPostMetadata } from '@/features/blog/module/types';
import { HOME_NAV_EVENT } from '@/lib/constants/navigation';
import { trackThemeChanged } from '@/lib/analytics';

interface HomePageClientProps {
  latestPosts: BlogPostMetadata[];
}

export function HomePageClient({ latestPosts }: HomePageClientProps) {
  const { isDark, toggleTheme } = useTheme();
  const { activeSection, registerSection } = useIntersectionObserver();
  const introOverlay = useIntroOverlay({ autoCloseDelayMs: 10000 });
  const shouldShowNavigation = activeSection !== '' && activeSection !== 'intro';

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(HOME_NAV_EVENT, {
        detail: shouldShowNavigation,
      })
    );
  }, [shouldShowNavigation]);

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <SectionNavigation activeSection={activeSection} isVisible={shouldShowNavigation} />

      <IntroOverlay title="WELCOME MY FELLOW" controller={introOverlay} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 sm:pt-10">
        <IntroSection sectionRef={registerSection('intro')} />
        <FeaturedWork sectionRef={registerSection('featured')} />
        <Philosophy sectionRef={registerSection('philosophy')} />
        <LatestBlog sectionRef={registerSection('blog')} posts={latestPosts} />
        <ConnectSection activeSection={activeSection} sectionRef={registerSection('service')} />

        <footer className="py-12 sm:py-16 border-t-2 border-dotted border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">
                © {new Date().getFullYear()} <span className="font-bold text-foreground">TRAHOANGDEV</span>.
                <span className="hidden sm:inline"> ALL SYSTEMS NOMINAL.</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Built with <span className="font-medium text-foreground">Next.js 16</span>, <span className="font-medium text-foreground">TailwindCSS</span> &amp; <span className="font-medium text-foreground">TypeScript</span>.{' '}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  trackThemeChanged(isDark ? 'light' : 'dark');
                }}
                className="group grid size-11 place-items-center rounded-full border-dotted-thick border-border hover:bg-muted transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <svg
                  className="hidden size-4 text-muted-foreground group-hover:text-foreground dark:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <svg
                  className="size-4 text-muted-foreground group-hover:text-foreground dark:hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>

              <a
                href="mailto:trahoangdev@gmail.com"
                className="group grid size-11 place-items-center rounded-full border-dotted-thick border-border hover:bg-muted transition-colors duration-200 text-foreground"
                aria-label="Send email"
              >
                <svg className="size-4 text-muted-foreground group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
