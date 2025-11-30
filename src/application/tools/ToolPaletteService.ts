import { ToolRepository } from '@/domain/tools/ToolRepository';
import type { ToolGroupSnapshot } from '@/domain/tools/ToolCollection';

const DEFAULT_ORDER = ['frontend', 'backend', 'sql', 'app'];

export interface ToolPaletteDto extends ToolGroupSnapshot {}

/**
 * Manages tool palette display
 * Groups tools by category with customizable ordering
 */
export class ToolPaletteService {
  constructor(private readonly repository: ToolRepository) {}

  /**
   * Loads tool palette grouped by category
   * @param order - Optional array of category slugs to define display order
   * @returns Promise resolving to array of tool groups with category and items
   */
  async loadPalette(order: string[] = DEFAULT_ORDER): Promise<ToolPaletteDto[]> {
    const collection = await this.repository.findAll();
    return collection.groupByCategory(order);
  }
}
