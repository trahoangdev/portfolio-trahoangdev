import { TagSet } from '@/domain/shared/TagSet';
import { Tag } from '@/domain/shared/Tag';

describe('TagSet', () => {
  describe('constructor', () => {
    it('creates empty tag set', () => {
      const tagSet = new TagSet([]);
      
      expect(tagSet.isEmpty()).toBe(true);
      expect(tagSet.toArray()).toEqual([]);
    });

    it('creates tag set from strings', () => {
      const tagSet = new TagSet(['React', 'TypeScript']);
      
      expect(tagSet.isEmpty()).toBe(false);
      expect(tagSet.toArray()).toHaveLength(2);
    });

    it('creates tag set from Tag instances', () => {
      const tags = [
        new Tag({ label: 'React' }),
        new Tag({ label: 'TypeScript' }),
      ];
      const tagSet = new TagSet(tags);
      
      expect(tagSet.toArray()).toHaveLength(2);
    });

    it('removes duplicate tags', () => {
      const tagSet = new TagSet(['React', 'react', 'REACT']);
      
      expect(tagSet.toArray()).toHaveLength(1);
      expect(tagSet.contains('react')).toBe(true);
    });

    it('handles mixed Tag and string inputs', () => {
      const tagSet = new TagSet([
        new Tag({ label: 'React' }),
        'TypeScript',
      ]);
      
      expect(tagSet.toArray()).toHaveLength(2);
    });
  });

  describe('isEmpty', () => {
    it('returns true for empty set', () => {
      const tagSet = new TagSet([]);
      
      expect(tagSet.isEmpty()).toBe(true);
    });

    it('returns false for non-empty set', () => {
      const tagSet = new TagSet(['React']);
      
      expect(tagSet.isEmpty()).toBe(false);
    });
  });

  describe('contains', () => {
    it('returns true when tag exists', () => {
      const tagSet = new TagSet(['React', 'TypeScript']);
      
      expect(tagSet.contains('react')).toBe(true);
      expect(tagSet.contains('typescript')).toBe(true);
    });

    it('returns false when tag does not exist', () => {
      const tagSet = new TagSet(['React']);
      
      expect(tagSet.contains('vue')).toBe(false);
    });

    it('is case-insensitive', () => {
      const tagSet = new TagSet(['React']);
      
      expect(tagSet.contains('REACT')).toBe(true);
      expect(tagSet.contains('react')).toBe(true);
    });
  });

  describe('matchesAny', () => {
    it('returns true when empty set is provided', () => {
      const tagSet = new TagSet(['React']);
      const emptySet = new TagSet([]);
      
      expect(tagSet.matchesAny(emptySet)).toBe(true);
    });

    it('returns true when at least one tag matches', () => {
      const tagSet1 = new TagSet(['React', 'TypeScript']);
      const tagSet2 = new TagSet(['Vue', 'React']);
      
      expect(tagSet1.matchesAny(tagSet2)).toBe(true);
    });

    it('returns false when no tags match', () => {
      const tagSet1 = new TagSet(['React', 'TypeScript']);
      const tagSet2 = new TagSet(['Vue', 'Angular']);
      
      expect(tagSet1.matchesAny(tagSet2)).toBe(false);
    });
  });

  describe('map', () => {
    it('maps over tags', () => {
      const tagSet = new TagSet(['React', 'TypeScript']);
      const labels = tagSet.map((tag) => tag.getLabel());
      
      expect(labels).toEqual(['React', 'TypeScript']);
    });

    it('returns empty array for empty set', () => {
      const tagSet = new TagSet([]);
      const labels = tagSet.map((tag) => tag.getLabel());
      
      expect(labels).toEqual([]);
    });
  });

  describe('toArray', () => {
    it('returns array of tags', () => {
      const tagSet = new TagSet(['React', 'TypeScript']);
      const array = tagSet.toArray();
      
      expect(array).toHaveLength(2);
      expect(array[0]).toBeInstanceOf(Tag);
    });

    it('returns new array instance', () => {
      const tagSet = new TagSet(['React']);
      const array1 = tagSet.toArray();
      const array2 = tagSet.toArray();
      
      expect(array1).not.toBe(array2);
    });
  });
});
