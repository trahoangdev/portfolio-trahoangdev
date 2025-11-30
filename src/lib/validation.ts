/**
 * Validation utilities for user input
 */

/**
 * Validates a GitHub username according to GitHub's rules
 * - Must be 1-39 characters
 * - Can only contain alphanumeric characters and hyphens
 * - Cannot start or end with a hyphen
 * - Cannot have consecutive hyphens
 *
 * @param username - The username to validate
 * @returns true if valid, false otherwise
 */
export function validateGitHubUsername(username: string): boolean {
  if (!username || typeof username !== 'string') {
    return false;
  }

  // GitHub username regex: 1-39 chars, alphanumeric and hyphens, no leading/trailing/consecutive hyphens
  const githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  return githubUsernameRegex.test(username);
}

/**
 * Validates a HuggingFace username
 * Similar rules to GitHub
 *
 * @param username - The username to validate
 * @returns true if valid, false otherwise
 */
export function validateHuggingFaceUsername(username: string): boolean {
  if (!username || typeof username !== 'string') {
    return false;
  }

  // HuggingFace allows alphanumeric, hyphens, and underscores
  const hfUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]){0,38}$/;
  return hfUsernameRegex.test(username);
}

/**
 * Sanitizes a string to prevent XSS attacks
 * Removes potentially dangerous characters
 *
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validates an email address
 *
 * @param email - The email to validate
 * @returns true if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL
 *
 * @param url - The URL to validate
 * @returns true if valid, false otherwise
 */
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
