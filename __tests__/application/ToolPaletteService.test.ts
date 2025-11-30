import { ToolPaletteService } from '@/application/tools/ToolPaletteService';
import type { ToolRepository } from '@/domain/tools/ToolRepository';
import { ToolCollection } from '@/domain/tools/ToolCollection';
import { Tool } from '@/domain/tools/Tool';

describe('ToolPaletteService', () => {
  let service: ToolPaletteService;
  let mockRepository: jest.Mocked<ToolRepository>;
  let mockCollection: ToolCollection;

  beforeEach(() => {
    // Create mock tools
    const tools = [
      new Tool({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
      }),
      new Tool({
        id: 'nodejs',
        name: 'Node.js',
        techId: 'nodejs',
        category: 'Backend',
      }),
      new Tool({
        id: 'typescript',
        name: 'TypeScript',
        techId: 'typescript',
        category: 'Frontend',
      }),
    ];

    mockCollection = new ToolCollection(tools);
    mockRepository = {
      findAll: jest.fn().mockResolvedValue(mockCollection),
    };

    service = new ToolPaletteService(mockRepository);
  });

  describe('loadPalette', () => {
    it('loads palette with default order', async () => {
      const palette = await service.loadPalette();

      expect(palette).toBeDefined();
      expect(Array.isArray(palette)).toBe(true);
    });

    it('loads palette with custom order', async () => {
      const customOrder = ['backend', 'frontend'];
      const palette = await service.loadPalette(customOrder);

      expect(palette).toBeDefined();
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('groups tools by category', async () => {
      const palette = await service.loadPalette(['frontend', 'backend']);

      const frontendGroup = palette.find(g => g.category.slug === 'frontend');
      const backendGroup = palette.find(g => g.category.slug === 'backend');

      expect(frontendGroup).toBeDefined();
      expect(backendGroup).toBeDefined();
      expect(frontendGroup?.items).toHaveLength(2);
      expect(backendGroup?.items).toHaveLength(1);
    });

    it('calls repository findAll', async () => {
      await service.loadPalette();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('returns empty array when no tools', async () => {
      const emptyCollection = new ToolCollection([]);
      mockRepository.findAll.mockResolvedValue(emptyCollection);

      const palette = await service.loadPalette();

      expect(palette).toEqual([]);
    });
  });
});
