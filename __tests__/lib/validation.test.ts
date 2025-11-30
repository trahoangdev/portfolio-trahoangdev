import {
  validateGitHubUsername,
  validateHuggingFaceUsername,
  sanitizeString,
  validateEmail,
  validateUrl,
} from '@/lib/validation';

describe('Validation Utilities', () => {
  describe('validateGitHubUsername', () => {
    it('accepts valid usernames', () => {
      expect(validateGitHubUsername('trahoangdev')).toBe(true);
      expect(validateGitHubUsername('user-name')).toBe(true);
      expect(validateGitHubUsername('user123')).toBe(true);
      expect(validateGitHubUsername('a')).toBe(true);
    });

    it('rejects invalid usernames', () => {
      expect(validateGitHubUsername('-invalid')).toBe(false);
      expect(validateGitHubUsername('invalid-')).toBe(false);
      expect(validateGitHubUsername('user--name')).toBe(false);
      expect(validateGitHubUsername('')).toBe(false);
      expect(validateGitHubUsername('a'.repeat(40))).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateGitHubUsername('user_name')).toBe(false); // No underscores in GitHub
      expect(validateGitHubUsername('user.name')).toBe(false); // No dots
      expect(validateGitHubUsername('user name')).toBe(false); // No spaces
    });

    it('handles non-string inputs', () => {
      expect(validateGitHubUsername(null as any)).toBe(false);
      expect(validateGitHubUsername(undefined as any)).toBe(false);
      expect(validateGitHubUsername(123 as any)).toBe(false);
    });
  });

  describe('validateHuggingFaceUsername', () => {
    it('accepts valid usernames', () => {
      expect(validateHuggingFaceUsername('trahoangdev')).toBe(true);
      expect(validateHuggingFaceUsername('user-name')).toBe(true);
      expect(validateHuggingFaceUsername('user_name')).toBe(true);
      expect(validateHuggingFaceUsername('user123')).toBe(true);
    });

    it('rejects invalid usernames', () => {
      expect(validateHuggingFaceUsername('-invalid')).toBe(false);
      expect(validateHuggingFaceUsername('')).toBe(false);
      expect(validateHuggingFaceUsername('a'.repeat(40))).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('removes dangerous characters', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeString('javascript:alert(1)')).toBe('alert(1)');
      expect(sanitizeString('<img onerror="alert(1)">')).toBe('img "alert(1)"');
    });

    it('preserves safe content', () => {
      expect(sanitizeString('Hello World')).toBe('Hello World');
      expect(sanitizeString('user@example.com')).toBe('user@example.com');
      expect(sanitizeString('123-456-7890')).toBe('123-456-7890');
    });

    it('handles edge cases', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString('   ')).toBe('');
      expect(sanitizeString(null as any)).toBe('');
      expect(sanitizeString(undefined as any)).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user @example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('accepts valid URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
      expect(validateUrl('https://example.com/path?query=value')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('example.com')).toBe(false); // Missing protocol
      expect(validateUrl('')).toBe(false);
    });
  });
});
