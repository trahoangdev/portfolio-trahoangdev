import { Project } from '@/domain/projects/Project';
import { ProjectCollection } from '@/domain/projects/ProjectCollection';
import type { ProjectRepository } from '@/domain/projects/ProjectRepository';
import type { ProjectDataManager } from '@/application/projects/ProjectDataManager';
import type { ProjectProfileProvider } from '@/application/projects/ports/ProjectProfileProvider';

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
