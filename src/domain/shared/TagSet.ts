import { Tag } from './Tag';

export class TagSet {
  private readonly tags: Tag[];

  constructor(tags: Iterable<Tag | string>) {
    const uniqueMap = new Map<string, Tag>();

    for (const entry of tags) {
      const tag = entry instanceof Tag ? entry : new Tag({ label: entry });
      if (!uniqueMap.has(tag.getSlug())) {
        uniqueMap.set(tag.getSlug(), tag);
      }
    }

    this.tags = Array.from(uniqueMap.values());
  }

  isEmpty(): boolean {
    return this.tags.length === 0;
  }

  contains(value: string): boolean {
    const normalized = Tag.normalize(value);
    return this.tags.some((tag) => tag.getSlug() === normalized);
  }

  matchesAny(other: TagSet): boolean {
    if (other.isEmpty()) {
      return true;
    }

    return this.tags.some((tag) => other.contains(tag.getSlug()));
  }

  map<T>(project: (tag: Tag) => T): T[] {
    return this.tags.map(project);
  }

  toArray(): Tag[] {
    return [...this.tags];
  }
}
