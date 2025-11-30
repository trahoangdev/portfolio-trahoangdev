import { Project } from '@/domain/projects/Project';
import { ProjectCollection } from '@/domain/projects/ProjectCollection';
import { ProjectRepository } from '@/domain/projects/ProjectRepository';
import { PROJECT_DATA } from './projectData';

export class StaticProjectRepository implements ProjectRepository {
  async findAll(): Promise<ProjectCollection> {
    const projects = PROJECT_DATA.map(
      (record) =>
        new Project({
          id: record.id,
          title: record.title,
          summary: record.summary,
          date: record.date,
          categories: record.categories,
          languages: record.languages,
          link: record.link,
          image: record.image,
        })
    );

    return new ProjectCollection(projects);
  }
}
