import { Tag } from '@/domain/shared/Tag';

describe('Tag', () => {
  describe('constructor', () => {
    it('creates tag with label', () => {
      const tag = new Tag({ label: 'TypeScript' });
      
      expect(tag.getLabel()).toBe('TypeScript');
      expect(tag.getSlug()).toBe('typescript');
    });

    it('creates tag with custom slug', () => {
      const tag = new Tag({ label: 'Next.js', slug: 'nextjs' });
      
      expect(tag.getLabel()).toBe('Next.js');
      expect(tag.getSlug()).toBe('nextjs');
    });

    it('trims whitespace from label', () => {
      const tag = new Tag({ label: '  React  ' });
      
      expect(tag.getLabel()).toBe('React');
      expect(tag.getSlug()).toBe('react');
    });

    it('throws error for empty label', () => {
      expect(() => new Tag({ label: '' })).toThrow('Tag label must be a non-empty string.');
    });

    it('throws error for whitespace-only label', () => {
      expect(() => new Tag({ label: '   ' })).toThrow('Tag label must be a non-empty string.');
    });
  });

  describe('slugify', () => {
    it('converts to lowercase', () => {
      expect(Tag.slugify('TypeScript')).toBe('typescript');
    });

    it('replaces spaces with hyphens', () => {
      expect(Tag.slugify('Machine Learning')).toBe('machine-learning');
    });

    it('replaces special characters with hyphens', () => {
      expect(Tag.slugify('C++')).toBe('c-');
      expect(Tag.slugify('Node.js')).toBe('node-js');
    });

    it('handles multiple consecutive special characters', () => {
      expect(Tag.slugify('Test  --  Case')).toBe('test-case');
    });
  });

  describe('normalize', () => {
    it('converts to lowercase', () => {
      expect(Tag.normalize('TypeScript')).toBe('typescript');
    });

    it('trims whitespace', () => {
      expect(Tag.normalize('  React  ')).toBe('react');
    });
  });

  describe('equals', () => {
    it('returns true for matching slug', () => {
      const tag = new Tag({ label: 'TypeScript' });
      
      expect(tag.equals('typescript')).toBe(true);
      expect(tag.equals('TypeScript')).toBe(true);
      expect(tag.equals('TYPESCRIPT')).toBe(true);
    });

    it('returns false for non-matching slug', () => {
      const tag = new Tag({ label: 'TypeScript' });
      
      expect(tag.equals('javascript')).toBe(false);
    });
  });
});
