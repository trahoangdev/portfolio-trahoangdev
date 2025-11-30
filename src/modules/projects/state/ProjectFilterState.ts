import type { ProjectFilterProps } from '@/domain/projects/ProjectFilter';
import { Tag } from '@/domain/shared/Tag';

export class ProjectFilterState {
  private readonly categories: Set<string>;
  private readonly languages: Set<string>;

  constructor(categories: Iterable<string> = [], languages: Iterable<string> = []) {
    this.categories = new Set(Array.from(categories, Tag.normalize));
    this.languages = new Set(Array.from(languages, Tag.normalize));
  }

  static empty(): ProjectFilterState {
    return new ProjectFilterState();
  }

  getCategorySlugs(): string[] {
    return Array.from(this.categories);
  }

  getLanguageSlugs(): string[] {
    return Array.from(this.languages);
  }

  toggleCategory(slug: string): ProjectFilterState {
    return this.toggle(slug, this.categories, (categories) => new ProjectFilterState(categories, this.languages));
  }

  toggleLanguage(slug: string): ProjectFilterState {
    return this.toggle(slug, this.languages, (languages) => new ProjectFilterState(this.categories, languages));
  }

  clear(): ProjectFilterState {
    return ProjectFilterState.empty();
  }

  toFilterProps(): ProjectFilterProps {
    return {
      categories: this.categories,
      languages: this.languages,
    };
  }

  private toggle(
    slug: string,
    collection: Set<string>,
    factory: (values: Iterable<string>) => ProjectFilterState
  ): ProjectFilterState {
    const normalized = Tag.normalize(slug);
    const next = new Set(collection);

    if (next.has(normalized)) {
      next.delete(normalized);
    } else {
      next.add(normalized);
    }

    return factory(next);
  }
}
