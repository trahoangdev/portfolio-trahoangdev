import { ToolRepository } from '@/domain/tools/ToolRepository';
import type { ToolGroupSnapshot } from '@/domain/tools/ToolCollection';

const DEFAULT_ORDER = ['frontend', 'backend', 'sql', 'app'];

export interface ToolPaletteDto extends ToolGroupSnapshot {}

export class ToolPaletteService {
  constructor(private readonly repository: ToolRepository) {}

  async loadPalette(order: string[] = DEFAULT_ORDER): Promise<ToolPaletteDto[]> {
    const collection = await this.repository.findAll();
    return collection.groupByCategory(order);
  }
}
