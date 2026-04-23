import { ProjectProfile } from '@/features/projects/domain/ProjectProfile';

export interface ProjectProfileProvider {
  getProfile(): ProjectProfile;
}

