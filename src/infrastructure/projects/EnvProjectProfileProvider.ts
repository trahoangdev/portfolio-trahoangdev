import { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { ProjectProfileProvider } from '@/application/projects/ports/ProjectProfileProvider';

export class EnvProjectProfileProvider implements ProjectProfileProvider {
  private readonly githubUser: string | null;
  private readonly huggingFaceUser: string | null;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.githubUser = env.NEXT_PUBLIC_PROJECT_GITHUB_USER ?? env.PROJECT_GITHUB_USER ?? null;
    this.huggingFaceUser = env.NEXT_PUBLIC_PROJECT_HUGGINGFACE_USER ?? env.PROJECT_HUGGINGFACE_USER ?? null;
  }

  getProfile(): ProjectProfile {
    try {
      return new ProjectProfile({
        githubUser: this.githubUser,
        huggingFaceUser: this.huggingFaceUser,
      });
    } catch (error) {
      const message =
        'Project profile is not configured. Set NEXT_PUBLIC_PROJECT_GITHUB_USER and/or NEXT_PUBLIC_PROJECT_HUGGINGFACE_USER.';

      if (error instanceof Error) {
        error.message = `${message} ${error.message}`;
        throw error;
      }

      throw new Error(message);
    }
  }
}
