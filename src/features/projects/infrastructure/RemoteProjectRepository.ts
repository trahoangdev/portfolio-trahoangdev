import { Project } from '@/features/projects/domain/Project';
import { ProjectCollection } from '@/features/projects/domain/ProjectCollection';
import type { ProjectRepository } from '@/features/projects/domain/ProjectRepository';
import type { ProjectDataManager } from '@/features/projects/application/ProjectDataManager';
import type { ProjectProfileProvider } from '@/features/projects/application/ports/ProjectProfileProvider';

export class RemoteProjectRepository implements ProjectRepository {
  constructor(
    private readonly dataManager: ProjectDataManager,
    private readonly profileProvider: ProjectProfileProvider
  ) {}

  async findAll(): Promise<ProjectCollection> {
    const profile = this.profileProvider.getProfile();
    const records = await this.dataManager.loadAll(profile);

    const projects = records.map(
      (record) =>
        new Project({
          id: record.id,
          title: record.title,
          summary: record.summary,
          date: record.date,
          categories: record.categories,
          languages: record.languages.length > 0 ? record.languages : ['General'],
          link: record.link,
          image: record.image,
        })
    );

    return new ProjectCollection(projects);
  }
}
