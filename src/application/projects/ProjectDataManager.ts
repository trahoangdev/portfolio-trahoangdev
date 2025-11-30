import type { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { ProjectDataSource, ExternalProjectRecord } from './ports/ProjectDataSource';

/**
 * Manages project data from multiple sources
 * Merges and deduplicates projects from different data sources
 */
export class ProjectDataManager {
  /**
   * Creates a new ProjectDataManager
   * @param sources - Array of project data sources to fetch from
   */
  constructor(private readonly sources: ProjectDataSource[]) {}

  /**
   * Loads all projects from configured sources
   * Merges results, removes duplicates, and sorts by update date
   * @param profile - User profile containing GitHub/HuggingFace usernames
   * @returns Promise resolving to array of external project records
   */
  async loadAll(profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    const results = await Promise.all(this.sources.map((source) => source.fetchProjects(profile)));
    const merged: ExternalProjectRecord[] = [];
    const seen = new Set<string>();

    for (const records of results) {
      for (const record of records) {
        if (seen.has(record.id)) {
          continue;
        }

        seen.add(record.id);
        merged.push(record);
      }
    }

    return merged.sort((left, right) => {
      const leftTime = safeParseDate(left.updatedAt);
      const rightTime = safeParseDate(right.updatedAt);

      if (leftTime !== rightTime) {
        return rightTime - leftTime;
      }

      return left.title.localeCompare(right.title);
    });
  }
}

function safeParseDate(value: string | undefined): number {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}
