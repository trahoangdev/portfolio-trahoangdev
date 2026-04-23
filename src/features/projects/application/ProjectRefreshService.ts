import { ProjectCollection } from '@/features/projects/domain/ProjectCollection';
import { ProjectRepository } from '@/features/projects/domain/ProjectRepository';

export class ProjectRefreshService {
  constructor(private readonly repository: ProjectRepository) {}

  async refresh(): Promise<ProjectCollection> {
    return this.repository.findAll();
  }
}

