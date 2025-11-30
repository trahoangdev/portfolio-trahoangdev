import { ProjectDataManager } from '@/components/application/projects/ProjectDataManager';
import type { ProjectDataSource, ExternalProjectRecord } from '@/components/application/projects/ports/ProjectDataSource';
import { ProjectProfile } from '@/domain/projects/ProjectProfile';

describe('ProjectDataManager', () => {
  const profile = new ProjectProfile({ githubUser: 'demo-user' });

  it('merges data sources and sorts by updatedAt', async () => {
    const sources: ProjectDataSource[] = [
      new StubSource([
        createRecord('a', '2024-01-01T00:00:00Z'),
        createRecord('b', '2024-03-01T00:00:00Z'),
      ]),
      new StubSource([
        createRecord('c', '2024-02-01T00:00:00Z'),
      ]),
    ];

    const manager = new ProjectDataManager(sources);
    const records = await manager.loadAll(profile);

    expect(records.map((record) => record.id)).toEqual(['b', 'c', 'a']);
  });

  it('filters duplicate project ids', async () => {
    const sources: ProjectDataSource[] = [
      new StubSource([createRecord('a', '2024-01-01T00:00:00Z')]),
      new StubSource([createRecord('a', '2024-02-01T00:00:00Z')]),
    ];

    const manager = new ProjectDataManager(sources);
    const records = await manager.loadAll(profile);

    expect(records).toHaveLength(1);
    expect(records[0].id).toBe('a');
  });
});

class StubSource implements ProjectDataSource {
  constructor(private readonly records: ExternalProjectRecord[]) {}

  async fetchProjects(_profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    return this.records;
  }
}

function createRecord(id: string, updatedAt: string): ExternalProjectRecord {
  return {
    id,
    title: id,
    summary: 'Summary',
    date: updatedAt,
    updatedAt,
    categories: [],
    languages: [],
    image: '/placeholder.svg',
  };
}
