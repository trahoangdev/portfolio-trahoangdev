import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SectionId = string;

class SectionVisibilityObserver {
  private readonly observer: IntersectionObserver;
  private readonly elementBySection = new Map<SectionId, HTMLElement>();
  private readonly sectionByElement = new WeakMap<HTMLElement, SectionId>();

  constructor(
    private readonly handleEnter: (sectionId: SectionId) => void,
    options: IntersectionObserverInit
  ) {
    this.observer = new IntersectionObserver(this.handleEntries, options);
  }

  unregister(sectionId: SectionId) {
    const element = this.elementBySection.get(sectionId);
    if (!element) {
      return;
    }
    this.observer.unobserve(element);
    this.elementBySection.delete(sectionId);
    this.sectionByElement.delete(element);
  }

  register(sectionId: SectionId, element: HTMLElement | null) {
    const current = this.elementBySection.get(sectionId);
    if (current && current !== element) {
      this.observer.unobserve(current);
      this.elementBySection.delete(sectionId);
      this.sectionByElement.delete(current);
    }

    if (!element) {
      return;
    }

    this.elementBySection.set(sectionId, element);
    this.sectionByElement.set(element, sectionId);
    if (!element.dataset.inview) {
      element.dataset.inview = 'false';
    }
    this.observer.observe(element);

    if (this.isElementVisible(element)) {
      element.dataset.inview = 'true';
      this.handleEnter(sectionId);
    }
  }

  disconnect() {
    this.observer.disconnect();
    this.elementBySection.clear();
  }

  private handleEntries = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const element = entry.target as HTMLElement;
      const sectionId = this.sectionByElement.get(element) ?? element.id;
      element.dataset.inview = 'true';
      if (sectionId) {
        this.handleEnter(sectionId);
      }
    });
  };

  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (rect.bottom <= 0 || rect.top >= viewportHeight || rect.right <= 0 || rect.left >= viewportWidth) {
      return false;
    }
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
    const intersectionArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
    const elementArea = Math.max(rect.width * rect.height, 1);
    return intersectionArea / elementArea >= 0.2;
  }
}

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<SectionVisibilityObserver | null>(null);
  const sectionsRef = useRef<Map<SectionId, HTMLElement>>(new Map());

  const mergedOptions = useMemo<IntersectionObserverInit>(() => {
    return {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
      ...options,
    };
  }, [options]);

  useEffect(() => {
    const observer = new SectionVisibilityObserver(setActiveSection, mergedOptions);
    observerRef.current = observer;
    sectionsRef.current.forEach((element, id) => observer.register(id, element));

    return () => observer.disconnect();
  }, [mergedOptions]);

  const registerSection = useCallback(
    (sectionId: SectionId) =>
      (element: HTMLElement | null) => {
        const observer = observerRef.current;

        if (!element) {
          sectionsRef.current.delete(sectionId);
          observer?.unregister(sectionId);
          return;
        }

        sectionsRef.current.set(sectionId, element);
        if (!element.dataset.inview) {
          element.dataset.inview = 'false';
        }
        observer?.register(sectionId, element);
      },
    []
  );

  return { activeSection, registerSection };
}
