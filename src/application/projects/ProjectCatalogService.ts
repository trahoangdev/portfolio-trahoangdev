import { ProjectFilter, type ProjectFilterProps } from '@/domain/projects/ProjectFilter';
import type { ProjectSnapshot } from '@/domain/projects/Project';
import type { ProjectFacet } from '@/domain/projects/ProjectCollection';
import { ProjectRefreshService } from './ProjectRefreshService';

export interface ProjectFacetDto {
  label: string;
  slug: string;
  count: number;
}

export interface ProjectCatalogDto {
  projects: ProjectSnapshot[];
  facets: {
    categories: ProjectFacetDto[];
    languages: ProjectFacetDto[];
  };
  activeFilter: {
    categories: string[];
    languages: string[];
  };
}

/**
 * Manages project catalog with filtering and faceting capabilities
 * Provides aggregated view of projects with category and language facets
 */
export class ProjectCatalogService {
  constructor(private readonly refreshService: ProjectRefreshService) {}

  /**
   * Loads project catalog with optional filters
   * @param filterProps - Optional filter properties for categories and languages
   * @returns Promise resolving to catalog DTO with projects, facets, and active filters
   */
  async loadCatalog(filterProps: ProjectFilterProps = {}): Promise<ProjectCatalogDto> {
    const collection = await this.refreshService.refresh();
    const filter = new ProjectFilter(filterProps);
    const filtered = collection.filter(filter);

    return {
      projects: filtered.toArray().map((project) => project.createSnapshot()),
      facets: {
        categories: this.mapFacet(collection.getCategoryFacets()),
        languages: this.mapFacet(collection.getLanguageFacets()),
      },
      activeFilter: {
        categories: filter.getCategoryTags().map((tag) => tag.getSlug()),
        languages: filter.getLanguageTags().map((tag) => tag.getSlug()),
      },
    };
  }

  private mapFacet(facets: ProjectFacet[]): ProjectFacetDto[] {
    return facets.map(({ tag, count }) => ({
      label: tag.getLabel(),
      slug: tag.getSlug(),
      count,
    }));
  }
}
