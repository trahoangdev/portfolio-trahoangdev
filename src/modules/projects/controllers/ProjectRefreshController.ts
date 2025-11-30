import type { ProjectCatalogDto } from '@/application/projects/ProjectCatalogService';
import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';
import type { ProjectFilterState } from '@/modules/projects/state/ProjectFilterState';

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
