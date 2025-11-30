import type { ProjectCatalogDto } from '@/application/projects/ProjectCatalogService';
import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';
import type { ProjectFilterState } from '@/modules/projects/state/ProjectFilterState';

export class ProjectCatalogController {
  constructor(private readonly service: ProjectCatalogService) {}

  async applyFilter(filterState: ProjectFilterState): Promise<ProjectCatalogDto> {
    return this.service.loadCatalog(filterState.toFilterProps());
  }
}
