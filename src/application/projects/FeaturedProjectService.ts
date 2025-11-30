import type { ProjectPreferenceRepository } from './ports/ProjectPreferenceRepository';

export class FeaturedProjectService {
  constructor(private readonly repository: ProjectPreferenceRepository) {}

  async listFeatured(): Promise<string[]> {
    const ids = await this.repository.loadFeatured();
    return this.normalize(ids);
  }

  async markFeatured(projectId: string): Promise<string[]> {
    const ids = await this.listFeatured();
    if (ids.includes(projectId)) {
      return ids;
    }
    const next = [...ids, projectId];
    await this.repository.saveFeatured(next);
    return next;
  }

  async unmarkFeatured(projectId: string): Promise<string[]> {
    const ids = await this.listFeatured();
    if (!ids.includes(projectId)) {
      return ids;
    }
    const next = ids.filter((id) => id !== projectId);
    await this.repository.saveFeatured(next);
    return next;
  }

  async toggleFeatured(projectId: string): Promise<string[]> {
    const ids = new Set(await this.listFeatured());
    if (ids.has(projectId)) {
      ids.delete(projectId);
    } else {
      ids.add(projectId);
    }
    const next = Array.from(ids);
    await this.repository.saveFeatured(next);
    return next;
  }

  subscribe(listener: (ids: string[]) => void): () => void {
    return this.repository.addListener((ids) => listener(this.normalize(ids)));
  }

  private normalize(ids: string[]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const id of ids) {
      const trimmed = id.trim();
      if (!trimmed || seen.has(trimmed)) {
        continue;
      }
      seen.add(trimmed);
      result.push(trimmed);
    }
    return result;
  }
}
