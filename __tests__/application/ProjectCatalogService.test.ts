import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';
import { ProjectRefreshService } from '@/application/projects/ProjectRefreshService';
import { ProjectCollection } from '@/domain/projects/ProjectCollection';
import { Project } from '@/domain/projects/Project';

// Mock ProjectRefreshService
jest.mock('@/application/projects/ProjectRefreshService');

describe('ProjectCatalogService', () => {
  let service: ProjectCatalogService;
  let mockRefreshService: jest.Mocked<ProjectRefreshService>;
  let mockCollection: ProjectCollection;

  beforeEach(() => {
    // Create mock projects
    const projects = [
      new Project({
        id: '1',
        title: 'Project 1',
        summary: 'Summary 1',
        date: '2024-01-01',
        categories: ['Web'],
        languages: ['TypeScript'],
        image: '/test1.jpg',
        featured: true,
      }),
      new Project({
        id: '2',
        title: 'Project 2',
        summary: 'Summary 2',
        date: '2024-01-02',
        categories: ['Mobile'],
        languages: ['JavaScript'],
        image: '/test2.jpg',
      }),
    ];

    mockCollection = new ProjectCollection(projects);
    mockRefreshService = new ProjectRefreshService(null as any) as jest.Mocked<ProjectRefreshService>;
    mockRefreshService.refresh = jest.fn().mockResolvedValue(mockCollection);

    service = new ProjectCatalogService(mockRefreshService);
  });

  describe('loadCatalog', () => {
    it('loads catalog without filters', async () => {
      const catalog = await service.loadCatalog();

      expect(catalog.projects).toHaveLength(2);
      expect(catalog.projects[0].id).toBe('1');
      expect(catalog.projects[1].id).toBe('2');
    });

    it('returns facets for categories and languages', async () => {
      const catalog = await service.loadCatalog();

      expect(catalog.facets.categories).toHaveLength(2);
      expect(catalog.facets.languages).toHaveLength(2);
      
      expect(catalog.facets.categories).toContainEqual({
        label: 'Web',
        slug: 'web',
        count: 1,
      });
      
      expect(catalog.facets.languages).toContainEqual({
        label: 'TypeScript',
        slug: 'typescript',
        count: 1,
      });
    });

    it('filters projects by category', async () => {
      const catalog = await service.loadCatalog({
        categories: ['Web'],
      });

      expect(catalog.projects).toHaveLength(1);
      expect(catalog.projects[0].id).toBe('1');
      expect(catalog.activeFilter.categories).toEqual(['web']);
    });

    it('filters projects by language', async () => {
      const catalog = await service.loadCatalog({
        languages: ['JavaScript'],
      });

      expect(catalog.projects).toHaveLength(1);
      expect(catalog.projects[0].id).toBe('2');
      expect(catalog.activeFilter.languages).toEqual(['javascript']);
    });

    it('returns empty active filter when no filters applied', async () => {
      const catalog = await service.loadCatalog();

      expect(catalog.activeFilter.categories).toEqual([]);
      expect(catalog.activeFilter.languages).toEqual([]);
    });

    it('calls refresh service', async () => {
      await service.loadCatalog();

      expect(mockRefreshService.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
