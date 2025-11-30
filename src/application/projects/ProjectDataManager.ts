import type { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { ProjectDataSource, ExternalProjectRecord } from './ports/ProjectDataSource';

export class ProjectDataManager {
  constructor(private readonly sources: ProjectDataSource[]) {}

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
