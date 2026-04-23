import type { ProjectPreferenceRepository } from './ports/ProjectPreferenceRepository';

/**
 * Manages featured project preferences
 * Provides operations to mark, unmark, and toggle featured status
 */
export class FeaturedProjectService {
  constructor(private readonly repository: ProjectPreferenceRepository) {}

  /**
   * Lists all featured project IDs
   * @returns Promise resolving to array of normalized project IDs
   */
  async listFeatured(): Promise<string[]> {
    const ids = await this.repository.loadFeatured();
    return this.normalize(ids);
  }

  /**
   * Marks a project as featured
   * @param projectId - ID of the project to mark as featured
   * @returns Promise resolving to updated array of featured project IDs
   */
  async markFeatured(projectId: string): Promise<string[]> {
    const ids = await this.listFeatured();
    if (ids.includes(projectId)) {
      return ids;
    }
    const next = [...ids, projectId];
    await this.repository.saveFeatured(next);
    return next;
  }

  /**
   * Removes featured status from a project
   * @param projectId - ID of the project to unmark
   * @returns Promise resolving to updated array of featured project IDs
   */
  async unmarkFeatured(projectId: string): Promise<string[]> {
    const ids = await this.listFeatured();
    if (!ids.includes(projectId)) {
      return ids;
    }
    const next = ids.filter((id) => id !== projectId);
    await this.repository.saveFeatured(next);
    return next;
  }

  /**
   * Toggles featured status of a project
   * @param projectId - ID of the project to toggle
   * @returns Promise resolving to updated array of featured project IDs
   */
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
