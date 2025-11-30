import { FeaturedProjectService } from '@/application/projects/FeaturedProjectService';

export type FeaturedProjectListener = (ids: string[]) => void;

export class ProjectPreferenceController {
  constructor(private readonly service: FeaturedProjectService) {}

  listFeatured(): Promise<string[]> {
    return this.service.listFeatured();
  }

  toggleFeatured(projectId: string): Promise<string[]> {
    return this.service.toggleFeatured(projectId);
  }

  markFeatured(projectId: string): Promise<string[]> {
    return this.service.markFeatured(projectId);
  }

  unmarkFeatured(projectId: string): Promise<string[]> {
    return this.service.unmarkFeatured(projectId);
  }

  subscribe(listener: FeaturedProjectListener): () => void {
    return this.service.subscribe(listener);
  }
}
