import type { HttpClient, HttpRequestOptions } from '@/domain/shared/HttpClient';

/**
 * HTTP client implementation using fetch API with retry logic
 * Automatically retries failed requests with exponential backoff
 */
export class FetchHttpClient implements HttpClient {
  private readonly maxRetries: number;

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries;
  }

  async get<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
    return this.fetchWithRetry<T>(url, options, this.maxRetries);
  }

  /**
   * Fetches data with automatic retry on rate limiting or network errors
   * @param url - The URL to fetch
   * @param options - Request options including headers and query params
   * @param retriesLeft - Number of retries remaining
   * @returns Promise resolving to the response data
   */
  private async fetchWithRetry<T>(
    url: string,
    options: HttpRequestOptions,
    retriesLeft: number
  ): Promise<T> {
    const endpoint = this.createUrl(url, options.query);

    try {
      const response = await fetch(endpoint, {
        headers: options.headers,
        next: { revalidate: 0 },
      });

      // Handle rate limiting with retry
      if (response.status === 429 && retriesLeft > 0) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : this.calculateBackoff(this.maxRetries - retriesLeft);

        await this.sleep(delay);
        return this.fetchWithRetry<T>(url, options, retriesLeft - 1);
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      // Retry on network errors
      if (retriesLeft > 0 && this.isRetryableError(error)) {
        const delay = this.calculateBackoff(this.maxRetries - retriesLeft);
        await this.sleep(delay);
        return this.fetchWithRetry<T>(url, options, retriesLeft - 1);
      }

      throw error;
    }
  }

  /**
   * Calculates exponential backoff delay
   * @param attempt - Current attempt number (0-indexed)
   * @returns Delay in milliseconds
   */
  private calculateBackoff(attempt: number): number {
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }

  /**
   * Checks if an error is retryable
   * @param error - The error to check
   * @returns True if the error should trigger a retry
   */
  private isRetryableError(error: unknown): boolean {
    if (error instanceof TypeError) {
      // Network errors (e.g., fetch failed)
      return true;
    }
    return false;
  }

  /**
   * Sleeps for the specified duration
   * @param ms - Duration in milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private createUrl(url: string, query: HttpRequestOptions['query']): string {
    if (!query || Object.keys(query).length === 0) {
      return url;
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      params.append(key, String(value));
    }

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
}

