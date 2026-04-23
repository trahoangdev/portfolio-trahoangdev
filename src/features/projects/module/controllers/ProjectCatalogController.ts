import type { ProjectCatalogDto } from '@/features/projects/application/ProjectCatalogService';
import { ProjectCatalogService } from '@/features/projects/application/ProjectCatalogService';
import type { ProjectFilterState } from '@/features/projects/module/state/ProjectFilterState';

export class ProjectCatalogController {
  constructor(private readonly service: ProjectCatalogService) {}

  async applyFilter(filterState: ProjectFilterState): Promise<ProjectCatalogDto> {
    return this.service.loadCatalog(filterState.toFilterProps());
  }
}
