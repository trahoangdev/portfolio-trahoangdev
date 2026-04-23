import { ProjectProfile } from '@/features/projects/domain/ProjectProfile';
import type { ProjectProfileProvider } from '@/features/projects/application/ports/ProjectProfileProvider';

export interface StaticProjectProfileProps {
  githubUser?: string;
  huggingFaceUser?: string;
}

export class StaticProjectProfileProvider implements ProjectProfileProvider {
  constructor(private readonly props: StaticProjectProfileProps) {}

  getProfile(): ProjectProfile {
    return new ProjectProfile(this.props);
  }
}
