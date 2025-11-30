import type { ProjectPreferenceRepository } from '@/application/projects/ports/ProjectPreferenceRepository';

const STORAGE_KEY = 'portfolio:featured-projects';
const CHANNEL = 'project-preferences:featured';

export class LocalStorageProjectPreferenceRepository implements ProjectPreferenceRepository {
  async loadFeatured(): Promise<string[]> {
    if (typeof window === 'undefined') {
      return [];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter((value) => typeof value === 'string');
    } catch {
      return [];
    }
  }

  async saveFeatured(ids: string[]): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = JSON.stringify(ids);
    window.localStorage.setItem(STORAGE_KEY, payload);
    window.dispatchEvent(new CustomEvent(CHANNEL, { detail: [...ids] }));
  }

  addListener(listener: (ids: string[]) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handleCustom = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }
      const detail = event.detail;
      if (!Array.isArray(detail)) {
        return;
      }
      listener(detail.filter((value) => typeof value === 'string'));
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      if (event.newValue === null) {
        listener([]);
        return;
      }
      try {
        const parsed = JSON.parse(event.newValue);
        if (!Array.isArray(parsed)) {
          return;
        }
        listener(parsed.filter((value) => typeof value === 'string'));
      } catch {
        listener([]);
      }
    };

    window.addEventListener(CHANNEL, handleCustom as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(CHANNEL, handleCustom as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }
}
