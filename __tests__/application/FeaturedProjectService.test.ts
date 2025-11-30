import { FeaturedProjectService } from '@/application/projects/FeaturedProjectService';
import type { ProjectPreferenceRepository } from '@/application/projects/ports/ProjectPreferenceRepository';

describe('FeaturedProjectService', () => {
  let service: FeaturedProjectService;
  let mockRepository: jest.Mocked<ProjectPreferenceRepository>;

  beforeEach(() => {
    mockRepository = {
      loadFeatured: jest.fn(),
      saveFeatured: jest.fn(),
      addListener: jest.fn(),
    };

    service = new FeaturedProjectService(mockRepository);
  });

  describe('listFeatured', () => {
    it('returns featured project IDs', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2', '3']);

      const ids = await service.listFeatured();

      expect(ids).toEqual(['1', '2', '3']);
    });

    it('normalizes IDs by trimming whitespace', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['  1  ', '2', '  3  ']);

      const ids = await service.listFeatured();

      expect(ids).toEqual(['1', '2', '3']);
    });

    it('removes duplicate IDs', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2', '1', '3']);

      const ids = await service.listFeatured();

      expect(ids).toEqual(['1', '2', '3']);
    });

    it('removes empty IDs', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '', '2', '   ']);

      const ids = await service.listFeatured();

      expect(ids).toEqual(['1', '2']);
    });
  });

  describe('markFeatured', () => {
    it('adds project ID to featured list', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2']);

      const ids = await service.markFeatured('3');

      expect(ids).toEqual(['1', '2', '3']);
      expect(mockRepository.saveFeatured).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('does not add duplicate ID', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2']);

      const ids = await service.markFeatured('2');

      expect(ids).toEqual(['1', '2']);
      expect(mockRepository.saveFeatured).not.toHaveBeenCalled();
    });
  });

  describe('unmarkFeatured', () => {
    it('removes project ID from featured list', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2', '3']);

      const ids = await service.unmarkFeatured('2');

      expect(ids).toEqual(['1', '3']);
      expect(mockRepository.saveFeatured).toHaveBeenCalledWith(['1', '3']);
    });

    it('does nothing if ID not in list', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2']);

      const ids = await service.unmarkFeatured('3');

      expect(ids).toEqual(['1', '2']);
      expect(mockRepository.saveFeatured).not.toHaveBeenCalled();
    });
  });

  describe('toggleFeatured', () => {
    it('adds ID if not featured', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2']);

      const ids = await service.toggleFeatured('3');

      expect(ids).toContain('3');
      expect(mockRepository.saveFeatured).toHaveBeenCalled();
    });

    it('removes ID if already featured', async () => {
      mockRepository.loadFeatured.mockResolvedValue(['1', '2', '3']);

      const ids = await service.toggleFeatured('2');

      expect(ids).not.toContain('2');
      expect(mockRepository.saveFeatured).toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    it('subscribes to repository changes', () => {
      const listener = jest.fn();
      const unsubscribe = jest.fn();
      mockRepository.addListener.mockReturnValue(unsubscribe);

      const result = service.subscribe(listener);

      expect(mockRepository.addListener).toHaveBeenCalled();
      expect(result).toBe(unsubscribe);
    });

    it('normalizes IDs in listener callback', () => {
      let repositoryListener: (ids: string[]) => void = () => {};
      mockRepository.addListener.mockImplementation((listener) => {
        repositoryListener = listener;
        return jest.fn();
      });

      const listener = jest.fn();
      service.subscribe(listener);

      // Trigger repository listener with unnormalized IDs
      repositoryListener(['  1  ', '2', '  3  ']);

      expect(listener).toHaveBeenCalledWith(['1', '2', '3']);
    });
  });
});
