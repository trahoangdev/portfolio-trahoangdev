import type { ProjectProfile } from '@/domain/projects/ProjectProfile';

export interface ExternalProjectRecord {
  id: string;
  title: string;
  summary: string;
  date: string;
  updatedAt?: string;
  categories: string[];
  languages: string[];
  link?: string;
  image: string;
  featured?: boolean;
  demoImages?: string[];
}

export interface ProjectDataSource {
  fetchProjects(profile: ProjectProfile): Promise<ExternalProjectRecord[]>;
}
