import { Tool, type ToolSnapshot } from './Tool';

export interface ToolGroupSnapshot {
  category: {
    label: string;
    slug: string;
  };
  items: ToolSnapshot[];
}

export class ToolCollection {
  private readonly tools: Tool[];

  constructor(tools: Iterable<Tool>) {
    this.tools = Array.from(tools);
  }

  groupByCategory(order: string[] = []): ToolGroupSnapshot[] {
    const orderIndex = new Map(order.map((slug, index) => [slug, index]));
    const grouped = new Map<string, { category: ToolGroupSnapshot['category']; items: ToolSnapshot[] }>();

    for (const tool of this.tools) {
      const snapshot = tool.createSnapshot();
      const slug = snapshot.category.slug;

      if (!grouped.has(slug)) {
        grouped.set(slug, {
          category: snapshot.category,
          items: [],
        });
      }

      grouped.get(slug)?.items.push(snapshot);
    }

    const result = Array.from(grouped.values()).map((group) => ({
      category: group.category,
      items: group.items.sort((a, b) => a.name.localeCompare(b.name)),
    }));

    return result.sort((a, b) => {
      const aIndex = orderIndex.get(a.category.slug) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = orderIndex.get(b.category.slug) ?? Number.MAX_SAFE_INTEGER;

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      return a.category.label.localeCompare(b.category.label);
    });
  }
}
