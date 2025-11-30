import type { ProjectProfileProvider } from '@/application/projects/ports/ProjectProfileProvider';
import { ProjectProfile } from '@/domain/projects/ProjectProfile';

export class ResilientProjectProfileProvider implements ProjectProfileProvider {
  constructor(private readonly providers: ProjectProfileProvider[]) {
    if (providers.length === 0) {
      throw new Error('ResilientProjectProfileProvider requires at least one provider.');
    }
  }

  getProfile(): ProjectProfile {
    const failures: Error[] = [];

    for (const provider of this.providers) {
      try {
        return provider.getProfile();
      } catch (error) {
        if (error instanceof Error) {
          failures.push(error);
        }
      }
    }

    const combined = failures.map((failure) => failure.message).join(' ');
    throw new Error(`Project profile resolution failed. ${combined}`.trim());
  }
}
