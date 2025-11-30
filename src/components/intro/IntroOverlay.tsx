'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  IntroDiagnosticsWindow,
  type WindowPhase,
} from '@/components/intro/IntroDiagnosticsWindow';
import type { IntroOverlayController } from '@/hooks/useIntroOverlay';
import { IntroDiagnosticsController } from '@/modules/intro/controllers/IntroDiagnosticsController';
import { BrowserUserDiagnosticsService } from '@/application/system/BrowserUserDiagnosticsService';
import { IpifyIpAddressProvider } from '@/infrastructure/system/IpifyIpAddressProvider';
import { NavigatorBrowserInspector } from '@/infrastructure/system/NavigatorBrowserInspector';
import { SystemClockAdapter } from '@/infrastructure/system/SystemClockAdapter';
import { UserDiagnostics } from '@/domain/system/UserDiagnostics';
import {
  INTRO_TYPE_SPEED_MS,
  INTRO_LINE_DELAY_MS,
  INTRO_WINDOW_OUTRO_MS,
  INTRO_HERO_DISPLAY_MS,
  INTRO_OVERLAY_FADE_MS,
} from '@/lib/constants';

type IntroPhase =
  | 'boot'
  | 'windowIntro'
  | 'typing'
  | 'windowOutro'
  | 'hero'
  | 'fadeOut';

interface IntroOverlayProps {
  title: string;
  subtitle?: string;
  description?: string;
  controller: IntroOverlayController;
}

export function IntroOverlay({ title, controller }: IntroOverlayProps) {
  const [phase, setPhase] = useState<IntroPhase>('boot');
  const [windowPhase, setWindowPhase] = useState<WindowPhase>('intro');
  const [diagnostics, setDiagnostics] = useState<UserDiagnostics | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [isOverlayOpaque, setOverlayOpaque] = useState(true);

  const controllerInstance = useMemo(() => {
    const service = new BrowserUserDiagnosticsService(
      new IpifyIpAddressProvider(),
      new NavigatorBrowserInspector(),
      new SystemClockAdapter()
    );

    return new IntroDiagnosticsController(service);
  }, []);

  useEffect(() => {
    if (!controller.shouldRender) {
      return;
    }

    let isMounted = true;

    controllerInstance
      .loadDiagnostics()
      .then((data) => {
        if (isMounted) {
          setDiagnostics(data);
          setTypedLines(data.toDisplayLines().map(() => ''));
        }
      })
      .catch(() => {
        if (isMounted) {
          const fallbackClock = new SystemClockAdapter();
          const fallbackDiagnostics = new UserDiagnostics({
            timestampLabel: fallbackClock.format(fallbackClock.now()),
            ipAddress: 'Unavailable',
            browser: 'Unknown',
            operatingSystem: 'Unknown',
          });

          setDiagnostics(fallbackDiagnostics);
          setTypedLines(fallbackDiagnostics.toDisplayLines().map(() => ''));
        }
      });

    const introTimeout = window.setTimeout(() => {
      if (isMounted) {
        setPhase('windowIntro');
      }
    }, 120);

    return () => {
      isMounted = false;
      window.clearTimeout(introTimeout);
    };
  }, [controller.shouldRender, controllerInstance]);

  const displayLines = useMemo(
    () => diagnostics?.toDisplayLines() ?? [],
    [diagnostics]
  );

  useEffect(() => {
    if (phase === 'windowIntro' && diagnostics) {
      const typingTimeout = window.setTimeout(() => {
        setPhase('typing');
        setWindowPhase('typing');
      }, 400);

      return () => {
        window.clearTimeout(typingTimeout);
      };
    }

    return undefined;
  }, [phase, diagnostics]);

  useEffect(() => {
    if (phase !== 'typing' || displayLines.length === 0) {
      return undefined;
    }

    let isCancelled = false;
    let timeoutId: number | undefined;
    const typedBuffer = displayLines.map(() => '');
    let lineIndex = 0;
    let charIndex = 0;

    setTypedLines(typedBuffer);
    setActiveLineIndex(0);

    const typeNext = () => {
      if (isCancelled) {
        return;
      }

      const currentLine = displayLines[lineIndex] ?? '';

      if (charIndex <= currentLine.length) {
        typedBuffer[lineIndex] = currentLine.slice(0, charIndex);
        setTypedLines([...typedBuffer]);
        charIndex += 1;
        timeoutId = window.setTimeout(typeNext, INTRO_TYPE_SPEED_MS);
        return;
      }

      if (lineIndex >= displayLines.length - 1) {
        timeoutId = window.setTimeout(() => {
          setPhase('windowOutro');
          setWindowPhase('outro');
        }, INTRO_LINE_DELAY_MS);
        return;
      }

      lineIndex += 1;
      charIndex = 0;
      setActiveLineIndex(lineIndex);
      timeoutId = window.setTimeout(typeNext, INTRO_LINE_DELAY_MS);
    };

    timeoutId = window.setTimeout(typeNext, INTRO_TYPE_SPEED_MS);

    return () => {
      isCancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [phase, displayLines]);

  useEffect(() => {
    if (phase === 'windowOutro') {
      const timeout = window.setTimeout(() => {
        setPhase('hero');
      }, INTRO_WINDOW_OUTRO_MS);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase === 'hero') {
      const timeout = window.setTimeout(() => {
        setPhase('fadeOut');
      }, INTRO_HERO_DISPLAY_MS);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase === 'fadeOut') {
      setOverlayOpaque(false);
      const timeout = window.setTimeout(() => {
        controller.dismiss();
      }, INTRO_OVERLAY_FADE_MS);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return undefined;
  }, [phase, controller]);

  const heroTitle = title.toUpperCase();

  if (!controller.shouldRender) {
    return null;
  }

  const overlayOpacityClass =
    controller.isVisible && isOverlayOpaque
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none';
  const showWindow =
    phase === 'windowIntro' || phase === 'typing' || phase === 'windowOutro';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${overlayOpacityClass}`}
      role="presentation"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0.95)_100%)]" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {showWindow ? (
          <IntroDiagnosticsWindow
            phase={windowPhase}
            targetLines={displayLines}
            typedLines={typedLines}
            activeLineIndex={activeLineIndex}
          />
        ) : null}

        {phase === 'hero' || phase === 'fadeOut' ? (
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-5xl font-black uppercase tracking-[0.4em]"
              style={{ animation: 'matrixFloat 2s ease-in-out infinite' }}
            >
              {heroTitle}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground/70">
              Entering the Matrix
            </span>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes matrixFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }
      `}</style>
    </div>
  );
}
