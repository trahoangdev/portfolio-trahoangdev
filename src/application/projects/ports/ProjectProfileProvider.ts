import { ProjectProfile } from '@/domain/projects/ProjectProfile';

export interface ProjectProfileProvider {
  getProfile(): ProjectProfile;
}

