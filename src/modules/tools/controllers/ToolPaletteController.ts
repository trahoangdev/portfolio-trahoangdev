import { ToolPaletteService, type ToolPaletteDto } from '@/application/tools/ToolPaletteService';

export class ToolPaletteController {
  constructor(private readonly service: ToolPaletteService) {}

  async loadPalette(): Promise<ToolPaletteDto[]> {
    return this.service.loadPalette();
  }
}
