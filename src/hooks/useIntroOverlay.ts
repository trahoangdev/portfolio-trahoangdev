import { useCallback, useEffect, useRef, useState } from 'react';

const EXIT_ANIMATION_MS = 600;

export interface IntroOverlayOptions {
  /**
   * Milliseconds before the overlay automatically dismisses itself.
   * Defaults to 4.2 seconds which balances readability with flow.
   */
  autoCloseDelayMs?: number;
  /**
   * Determines whether the overlay should respect the user's reduced-motion preference.
   */
  respectReducedMotion?: boolean;
  /**
   * Allows consumers to opt-out of showing the overlay on mount.
   */
  startVisible?: boolean;
}

export interface IntroOverlayState {
  /** True whilst the overlay should be animated in. */
  isVisible: boolean;
  /** Retains DOM mounting until exit animation completes. */
  shouldRender: boolean;
}

export interface IntroOverlayActions {
  /** Imperative dismiss, e.g. user skips the intro. */
  dismiss: () => void;
  /** Reshow the overlay, useful for demos or navigation. */
  reset: () => void;
}

export type IntroOverlayController = IntroOverlayState & IntroOverlayActions;

/**
 * Centralises lifecycle control for the landing intro overlay.
 * Keeps view concerns declarative and adheres to SRP.
 */
export function useIntroOverlay(options: IntroOverlayOptions = {}): IntroOverlayController {
  const {
    autoCloseDelayMs = 4200,
    respectReducedMotion = true,
    startVisible = true,
  } = options;

  const [isVisible, setIsVisible] = useState(startVisible);
  const [shouldRender, setShouldRender] = useState(startVisible);

  const exitTimeoutRef = useRef<number | null>(null);
  const autoCloseTimeoutRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (exitTimeoutRef.current !== null) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    if (autoCloseTimeoutRef.current !== null) {
      window.clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setShouldRender(true);
    setIsVisible(true);
  }, [clearTimers]);

  useEffect(() => {
    if (!shouldRender) {
      clearTimers();
      return;
    }

    if (!isVisible) {
      exitTimeoutRef.current = window.setTimeout(() => {
        setShouldRender(false);
      }, EXIT_ANIMATION_MS);
      return () => {
        if (exitTimeoutRef.current !== null) {
          window.clearTimeout(exitTimeoutRef.current);
          exitTimeoutRef.current = null;
        }
      };
    }

    let removePreferenceListener: (() => void) | undefined;

    if (respectReducedMotion && typeof window !== 'undefined') {
      const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      if (reduceMotionQuery.matches) {
        setShouldRender(true);
        setIsVisible(true);
      }

      const handlePreferenceChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          clearTimers();
          setShouldRender(true);
          setIsVisible(true);
        }
      };

      reduceMotionQuery.addEventListener('change', handlePreferenceChange);
      removePreferenceListener = () => reduceMotionQuery.removeEventListener('change', handlePreferenceChange);
    }

    autoCloseTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelayMs);

    return () => {
      if (autoCloseTimeoutRef.current !== null) {
        window.clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = null;
      }
      removePreferenceListener?.();
    };
  }, [autoCloseDelayMs, clearTimers, isVisible, respectReducedMotion, shouldRender]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    isVisible,
    shouldRender,
    dismiss,
    reset,
  };
}
