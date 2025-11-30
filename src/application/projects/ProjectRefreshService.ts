import { ProjectCollection } from '@/domain/projects/ProjectCollection';
import { ProjectRepository } from '@/domain/projects/ProjectRepository';

export class ProjectRefreshService {
  constructor(private readonly repository: ProjectRepository) {}

  async refresh(): Promise<ProjectCollection> {
    return this.repository.findAll();
  }
}

