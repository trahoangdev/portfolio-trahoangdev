import { Project } from './Project';
import { TagSet } from '../shared/TagSet';

export interface ProjectFilterProps {
  readonly categories?: Iterable<string>;
  readonly languages?: Iterable<string>;
}

export class ProjectFilter {
  private readonly categories: TagSet;
  private readonly languages: TagSet;

  constructor(props: ProjectFilterProps = {}) {
    this.categories = new TagSet(props.categories ?? []);
    this.languages = new TagSet(props.languages ?? []);
  }

  getCategoryTags(): TagSet {
    return this.categories;
  }

  getLanguageTags(): TagSet {
    return this.languages;
  }

  isEmpty(): boolean {
    return this.categories.isEmpty() && this.languages.isEmpty();
  }

  matches(project: Project): boolean {
    const matchCategory = project.getCategories().matchesAny(this.categories);
    const matchLanguage = project.getLanguages().matchesAny(this.languages);
    return matchCategory && matchLanguage;
  }
}
