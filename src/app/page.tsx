'use client';

import { useEffect } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTheme } from '@/hooks/useTheme';
import { useIntroOverlay } from '@/hooks/useIntroOverlay';
import { SectionNavigation } from '@/components/navigation/SectionNavigation';
import { IntroOverlay } from '@/components/intro/IntroOverlay';
import { IntroSection } from '@/components/intro/IntroSection';
import { WorkSection } from '@/components/work/WorkSection';
import { ProjectSection } from '@/components/projects/ProjectSection';
import { ConnectSection } from '@/components/connect/ConnectSection';
import { HOME_NAV_EVENT } from '@/lib/constants/navigation';
import { trackThemeChanged } from '@/lib/analytics';

export default function Home() {
  const { isDark, toggleTheme, mounted } = useTheme();
  const { activeSection, registerSection } = useIntersectionObserver();
  const introOverlay = useIntroOverlay();
  const shouldShowNavigation = activeSection !== '' && activeSection !== 'intro';
  const mainTopPadding = shouldShowNavigation ? 'pt-28' : 'pt-10';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.dispatchEvent(
      new CustomEvent(HOME_NAV_EVENT, {
        detail: shouldShowNavigation,
      })
    );

    return undefined;
  }, [shouldShowNavigation]);

  if (!mounted) {
    return (
      <div className="min-h-screen text-foreground relative ">
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex flex-col gap-4 p-4 border-dotted-thick border-border bg-background">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-3 h-8 bg-transparent border-border" />
            ))}
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28">
          <div className="min-h-screen flex items-center opacity-0">
            <div className="grid lg:grid-cols-3 gap-8 w-full">
              <div className="lg:col-span-1 space-y-8">
                <div className="border-solid-animated border-border p-6">
                  <div className="space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground relative ">

      <SectionNavigation activeSection={activeSection} isVisible={shouldShowNavigation} />

      <main id="main-content" className={`max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 ${mainTopPadding}`}>
        <IntroSection sectionRef={registerSection('intro')} />

        <WorkSection activeSection={activeSection} sectionRef={registerSection('work')} />

        <ProjectSection activeSection={activeSection} sectionRef={registerSection('project')} />

        <ConnectSection activeSection={activeSection} sectionRef={registerSection('service')} />

        <footer className="py-12 sm:py-16 border-t-2 border-dotted border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">
                © 2025 trahoangdev. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">
                Built with 💖 and ☕
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  toggleTheme();
                  trackThemeChanged(isDark ? 'light' : 'dark');
                }}
                className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
