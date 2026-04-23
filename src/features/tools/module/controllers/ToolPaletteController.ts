import { ToolPaletteService, type ToolPaletteDto } from '@/features/tools/application/ToolPaletteService';

export class ToolPaletteController {
  constructor(private readonly service: ToolPaletteService) {}

  async loadPalette(): Promise<ToolPaletteDto[]> {
    return this.service.loadPalette();
  }
}
