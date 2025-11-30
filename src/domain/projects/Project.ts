import { TagSet } from '../shared/TagSet';
import { Tag } from '../shared/Tag';

export interface ProjectProps {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly date: string;
  readonly categories: Array<Tag | string>;
  readonly languages: Array<Tag | string>;
  readonly link?: string;
  readonly image: string;
  readonly featured?: boolean;
  readonly demoImages?: string[];
}

export interface ProjectTagSnapshot {
  label: string;
  slug: string;
}

export interface ProjectSnapshot {
  id: string;
  title: string;
  summary: string;
  date: string;
  categories: ProjectTagSnapshot[];
  languages: ProjectTagSnapshot[];
  link?: string;
  image: string;
  featured: boolean;
  demoImages: string[];
}

export class Project {
  private readonly id: string;
  private readonly title: string;
  private readonly summary: string;
  private readonly date: string;
  private readonly categories: TagSet;
  private readonly languages: TagSet;
  private readonly link?: string;
  private readonly image: string;
  private readonly featured: boolean;
  private readonly demoImages: string[];

  constructor(props: ProjectProps) {
    this.id = props.id.trim();
    this.title = props.title.trim();
    this.summary = props.summary.trim();
    this.date = props.date.trim();
    this.categories = new TagSet(props.categories);
    this.languages = new TagSet(props.languages);
    this.link = props.link?.trim() ?? undefined;
    this.image = props.image.trim();
    this.featured = props.featured ?? false;
    this.demoImages = props.demoImages ?? [];

    this.ensureInvariants();
  }

  private ensureInvariants(): void {
    if (!this.id) {
      throw new Error('Project requires a stable identifier.');
    }

    if (!this.title) {
      throw new Error('Project requires a title.');
    }

    if (!this.summary) {
      throw new Error('Project requires a summary.');
    }

    if (!this.date) {
      throw new Error('Project requires a date string.');
    }

    if (!this.image) {
      throw new Error('Project requires an image path.');
    }
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getSummary(): string {
    return this.summary;
  }

  getDate(): string {
    return this.date;
  }

  getCategories(): TagSet {
    return this.categories;
  }

  getLanguages(): TagSet {
    return this.languages;
  }

  getLink(): string | undefined {
    return this.link;
  }

  getImage(): string {
    return this.image;
  }

  isFeatured(): boolean {
    return this.featured;
  }

  getDemoImages(): string[] {
    return this.demoImages;
  }

  createSnapshot(): ProjectSnapshot {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      date: this.date,
      categories: this.categories.map((tag) => ({
        label: tag.getLabel(),
        slug: tag.getSlug(),
      })),
      languages: this.languages.map((tag) => ({
        label: tag.getLabel(),
        slug: tag.getSlug(),
      })),
      link: this.link,
      image: this.image,
      featured: this.featured,
      demoImages: this.demoImages,
    };
  }
}
