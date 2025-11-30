import { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { ProjectProfileProvider } from '@/application/projects/ports/ProjectProfileProvider';

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
