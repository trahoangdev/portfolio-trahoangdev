import type { HttpClient, HttpRequestOptions } from '@/domain/shared/HttpClient';

export class FetchHttpClient implements HttpClient {
  async get<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
    const endpoint = this.createUrl(url, options.query);
    const response = await fetch(endpoint, {
      headers: options.headers,
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
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

