import { Tool } from '@/domain/tools/Tool';

describe('Tool', () => {
  describe('constructor', () => {
    it('creates tool with required properties', () => {
      const tool = new Tool({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
      });
      
      expect(tool.getName()).toBe('React');
      expect(tool.getTechId()).toBe('react');
      expect(tool.getCategory().getLabel()).toBe('Frontend');
    });

    it('creates tool with description', () => {
      const tool = new Tool({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
        description: 'A JavaScript library for building user interfaces',
      });
      
      const snapshot = tool.createSnapshot();
      expect(snapshot.description).toBe('A JavaScript library for building user interfaces');
    });

    it('trims whitespace from properties', () => {
      const tool = new Tool({
        id: '  react  ',
        name: '  React  ',
        techId: '  react  ',
        category: '  Frontend  ',
      });
      
      expect(tool.getName()).toBe('React');
      expect(tool.getTechId()).toBe('react');
    });

    it('throws error for empty id', () => {
      expect(() => new Tool({
        id: '',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
      })).toThrow('Tool requires a stable identifier.');
    });

    it('throws error for empty name', () => {
      expect(() => new Tool({
        id: 'react',
        name: '',
        techId: 'react',
        category: 'Frontend',
      })).toThrow('Tool requires a display name.');
    });

    it('throws error for empty techId', () => {
      expect(() => new Tool({
        id: 'react',
        name: 'React',
        techId: '',
        category: 'Frontend',
      })).toThrow('Tool requires a tech identifier.');
    });
  });

  describe('createSnapshot', () => {
    it('creates snapshot with all properties', () => {
      const tool = new Tool({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
        description: 'UI library',
      });
      
      const snapshot = tool.createSnapshot();
      
      expect(snapshot).toEqual({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: {
          label: 'Frontend',
          slug: 'frontend',
        },
        description: 'UI library',
      });
    });

    it('creates snapshot without description', () => {
      const tool = new Tool({
        id: 'react',
        name: 'React',
        techId: 'react',
        category: 'Frontend',
      });
      
      const snapshot = tool.createSnapshot();
      
      expect(snapshot.description).toBeUndefined();
    });
  });
});
