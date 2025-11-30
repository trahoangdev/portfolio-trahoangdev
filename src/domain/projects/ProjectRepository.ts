import { ProjectCollection } from './ProjectCollection';

export interface ProjectRepository {
  findAll(): Promise<ProjectCollection>;
}
