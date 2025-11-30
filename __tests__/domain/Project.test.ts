import { Project } from '@/domain/projects/Project';

describe('Project', () => {
  const validProps = {
    id: 'project-1',
    title: 'Test Project',
    summary: 'A test project',
    date: '2024-01-01',
    categories: ['Web'],
    languages: ['TypeScript'],
    image: '/test.jpg',
  };

  describe('constructor', () => {
    it('creates project with required properties', () => {
      const project = new Project(validProps);
      
      expect(project.getId()).toBe('project-1');
      expect(project.getTitle()).toBe('Test Project');
      expect(project.getSummary()).toBe('A test project');
      expect(project.getDate()).toBe('2024-01-01');
      expect(project.getImage()).toBe('/test.jpg');
      expect(project.isFeatured()).toBe(false);
    });

    it('creates featured project', () => {
      const project = new Project({
        ...validProps,
        featured: true,
      });
      
      expect(project.isFeatured()).toBe(true);
    });

    it('creates project with link', () => {
      const project = new Project({
        ...validProps,
        link: 'https://example.com',
      });
      
      expect(project.getLink()).toBe('https://example.com');
    });

    it('creates project with demo images', () => {
      const project = new Project({
        ...validProps,
        demoImages: ['/demo1.jpg', '/demo2.jpg'],
      });
      
      expect(project.getDemoImages()).toEqual(['/demo1.jpg', '/demo2.jpg']);
    });

    it('trims whitespace from properties', () => {
      const project = new Project({
        ...validProps,
        id: '  project-1  ',
        title: '  Test Project  ',
        summary: '  A test project  ',
      });
      
      expect(project.getId()).toBe('project-1');
      expect(project.getTitle()).toBe('Test Project');
      expect(project.getSummary()).toBe('A test project');
    });

    it('throws error for empty id', () => {
      expect(() => new Project({
        ...validProps,
        id: '',
      })).toThrow('Project requires a stable identifier.');
    });

    it('throws error for empty title', () => {
      expect(() => new Project({
        ...validProps,
        title: '',
      })).toThrow('Project requires a title.');
    });

    it('throws error for empty summary', () => {
      expect(() => new Project({
        ...validProps,
        summary: '',
      })).toThrow('Project requires a summary.');
    });

    it('throws error for empty date', () => {
      expect(() => new Project({
        ...validProps,
        date: '',
      })).toThrow('Project requires a date string.');
    });

    it('throws error for empty image', () => {
      expect(() => new Project({
        ...validProps,
        image: '',
      })).toThrow('Project requires an image path.');
    });
  });

  describe('getCategories', () => {
    it('returns TagSet of categories', () => {
      const project = new Project({
        ...validProps,
        categories: ['Web', 'Mobile'],
      });
      
      const categories = project.getCategories();
      expect(categories.contains('web')).toBe(true);
      expect(categories.contains('mobile')).toBe(true);
    });
  });

  describe('getLanguages', () => {
    it('returns TagSet of languages', () => {
      const project = new Project({
        ...validProps,
        languages: ['TypeScript', 'JavaScript'],
      });
      
      const languages = project.getLanguages();
      expect(languages.contains('typescript')).toBe(true);
      expect(languages.contains('javascript')).toBe(true);
    });
  });

  describe('createSnapshot', () => {
    it('creates snapshot with all properties', () => {
      const project = new Project({
        ...validProps,
        featured: true,
        link: 'https://example.com',
        demoImages: ['/demo.jpg'],
      });
      
      const snapshot = project.createSnapshot();
      
      expect(snapshot).toEqual({
        id: 'project-1',
        title: 'Test Project',
        summary: 'A test project',
        date: '2024-01-01',
        categories: [{ label: 'Web', slug: 'web' }],
        languages: [{ label: 'TypeScript', slug: 'typescript' }],
        link: 'https://example.com',
        image: '/test.jpg',
        featured: true,
        demoImages: ['/demo.jpg'],
      });
    });

    it('creates snapshot without optional properties', () => {
      const project = new Project(validProps);
      const snapshot = project.createSnapshot();
      
      expect(snapshot.link).toBeUndefined();
      expect(snapshot.featured).toBe(false);
      expect(snapshot.demoImages).toEqual([]);
    });
  });
});
