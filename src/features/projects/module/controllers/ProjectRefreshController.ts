import type { ProjectCatalogDto } from '@/features/projects/application/ProjectCatalogService';
import { ProjectCatalogService } from '@/features/projects/application/ProjectCatalogService';
import type { ProjectFilterState } from '@/features/projects/module/state/ProjectFilterState';

export class ProjectRefreshController {
  constructor(private readonly catalogService: ProjectCatalogService) {}

  async initialLoad(): Promise<ProjectCatalogDto> {
    return this.catalogService.loadCatalog();
  }

  async refresh(filterState?: ProjectFilterState): Promise<ProjectCatalogDto> {
    if (filterState) {
      return this.catalogService.loadCatalog(filterState.toFilterProps());
    }

    return this.catalogService.loadCatalog();
  }
}
