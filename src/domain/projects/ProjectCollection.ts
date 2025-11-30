import { Project } from './Project';
import { ProjectFilter } from './ProjectFilter';
import { Tag } from '../shared/Tag';

export interface ProjectFacet {
  tag: Tag;
  count: number;
}

export class ProjectCollection {
  private readonly items: Project[];

  constructor(projects: Iterable<Project>) {
    this.items = Array.from(projects);
  }

  toArray(): Project[] {
    return [...this.items];
  }

  filter(filter: ProjectFilter): ProjectCollection {
    if (filter.isEmpty()) {
      return new ProjectCollection(this.items);
    }

    const filtered = this.items.filter((project) => filter.matches(project));
    return new ProjectCollection(filtered);
  }

  getCategoryFacets(): ProjectFacet[] {
    return this.createFacet((project) => project.getCategories().toArray());
  }

  getLanguageFacets(): ProjectFacet[] {
    return this.createFacet((project) => project.getLanguages().toArray());
  }

  private createFacet(extractor: (project: Project) => Tag[]): ProjectFacet[] {
    const facetMap = new Map<string, ProjectFacet>();

    for (const project of this.items) {
      const tags = extractor(project);
      for (const tag of tags) {
        const key = tag.getSlug();
        const existing = facetMap.get(key);
        if (existing) {
          facetMap.set(key, { tag: existing.tag, count: existing.count + 1 });
        } else {
          facetMap.set(key, { tag, count: 1 });
        }
      }
    }

    return Array.from(facetMap.values()).sort((a, b) =>
      a.tag.getLabel().localeCompare(b.tag.getLabel())
    );
  }
}
