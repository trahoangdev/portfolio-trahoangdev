import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SectionId = string;

class SectionVisibilityObserver {
  private readonly observer: IntersectionObserver;
  private readonly elementBySection = new Map<SectionId, HTMLElement>();
  private readonly sectionByElement = new WeakMap<HTMLElement, SectionId>();
  private readonly activeSections = new Set<SectionId>();

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
    this.activeSections.delete(sectionId);
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

    // Don't call handleEnter here to avoid infinite loops
    // IntersectionObserver will automatically trigger handleEntries when element becomes visible
    // This prevents state updates during render phase
  }

  disconnect() {
    this.observer.disconnect();
    this.elementBySection.clear();
    this.activeSections.clear();
  }

  private handleEntries = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      const sectionId = this.sectionByElement.get(element) ?? element.id;
      
      if (!sectionId) {
        return;
      }
      
      if (entry.isIntersecting) {
        // Only update if not already marked as visible to prevent unnecessary updates
        if (element.dataset.inview !== 'true') {
          element.dataset.inview = 'true';
        }
        // Only call handleEnter if section is not already active to prevent infinite loops
        if (!this.activeSections.has(sectionId)) {
          this.activeSections.add(sectionId);
          this.handleEnter(sectionId);
        }
      } else {
        // Do NOT reset data-inview to 'false' — keep sections visible once animated in
        // to prevent flash/re-animation when scrolling back
        this.activeSections.delete(sectionId);
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
    
    // Register all existing sections
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

        // Prevent re-registering the same element to avoid infinite loops
        const existingElement = sectionsRef.current.get(sectionId);
        if (existingElement === element) {
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
